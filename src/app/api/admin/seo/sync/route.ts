import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { GSCClient, getDateRange } from '@/lib/gsc-client'
import { rateLimiters } from '@/lib/rate-limit'
import { requireAuth } from '@/lib/auth-helpers'

/**
 * Sync SEO data from Google Search Console
 * POST /api/admin/seo/sync
 *
 * Fetches latest GSC data and stores in Supabase
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'anonymous'

    const { success } = await rateLimiters.admin.check(5, identifier)

    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Verify admin authorization via session
    const auth = await requireAuth()
    if (!auth.authorized) {
      return auth.response
    }

    const body = await request.json()
    const days = body.days || 7 // Default to last 7 days

    const siteUrl =
      process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY_URL ||
      'https://www.pixelmojo.io'
    const gscClient = new GSCClient(siteUrl)

    const { startDate, endDate } = getDateRange(days)

    // 1. Sync tracked keyword rankings
    await syncKeywordRankings(gscClient, startDate, endDate)

    // 2. Sync top pages
    await syncPagePerformance(gscClient, startDate, endDate)

    // 3. Sync search queries
    await syncSearchQueries(gscClient, startDate, endDate)

    // 4. Detect and create alerts
    await detectSEOAlerts(startDate, endDate)

    return NextResponse.json({
      success: true,
      message: `Synced SEO data for ${days} days`,
      dateRange: { startDate, endDate },
    })
  } catch (error) {
    console.error('[SEO Sync] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to sync SEO data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * Sync keyword rankings for tracked keywords
 */
async function syncKeywordRankings(
  gscClient: GSCClient,
  startDate: string,
  endDate: string
) {
  // Get all active target keywords
  const { data: targetKeywords } = await supabase
    .from('target_keywords')
    .select('id, keyword')
    .eq('is_active', true)

  if (!targetKeywords || targetKeywords.length === 0) {
    return
  }

  const keywords = targetKeywords.map(k => k.keyword)
  const rankings = await gscClient.getKeywordRankings(
    keywords,
    startDate,
    endDate
  )

  // Store rankings
  for (const [keyword, data] of rankings.entries()) {
    const targetKeyword = targetKeywords.find(k => k.keyword === keyword)
    if (!targetKeyword) continue

    await supabase.from('keyword_rankings').upsert(
      {
        keyword_id: targetKeyword.id,
        date: endDate,
        position: data.position,
        impressions: data.impressions,
        clicks: data.clicks,
        ctr: data.ctr,
        country: 'total',
        device: 'total',
      },
      {
        onConflict: 'keyword_id,date,country,device',
      }
    )
  }
}

/**
 * Sync page performance data
 */
async function syncPagePerformance(
  gscClient: GSCClient,
  startDate: string,
  endDate: string
) {
  const pages = await gscClient.getTopPages(startDate, endDate, 100)

  for (const page of pages) {
    if (!page.keys || !page.keys[0]) continue

    await supabase.from('page_performance').upsert(
      {
        url: page.keys[0],
        date: endDate,
        impressions: page.impressions,
        clicks: page.clicks,
        ctr: page.ctr,
        position: page.position,
        country: 'total',
        device: 'total',
      },
      {
        onConflict: 'url,date,country,device',
      }
    )
  }
}

/**
 * Sync search queries
 */
async function syncSearchQueries(
  gscClient: GSCClient,
  startDate: string,
  endDate: string
) {
  const queries = await gscClient.getTopQueries(startDate, endDate, 1000)

  for (const query of queries) {
    if (!query.keys || !query.keys[0]) continue

    await supabase.from('search_queries').upsert(
      {
        query: query.keys[0],
        date: endDate,
        impressions: query.impressions,
        clicks: query.clicks,
        ctr: query.ctr,
        position: query.position,
        country: 'total',
        device: 'total',
      },
      {
        onConflict: 'query,date,country,device',
      }
    )
  }
}

/**
 * Detect SEO alerts based on data changes
 */
async function detectSEOAlerts(startDate: string, endDate: string) {
  // Get yesterday's data for comparison
  const yesterday = new Date(endDate)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  // Check for significant ranking drops
  const { data: keywords } = await supabase
    .from('target_keywords')
    .select('id, keyword, priority')
    .eq('is_active', true)

  if (!keywords) return

  for (const keyword of keywords) {
    const { data: todayRanking } = await supabase
      .from('keyword_rankings')
      .select('position')
      .eq('keyword_id', keyword.id)
      .eq('date', endDate)
      .eq('country', 'total')
      .eq('device', 'total')
      .single()

    const { data: yesterdayRanking } = await supabase
      .from('keyword_rankings')
      .select('position')
      .eq('keyword_id', keyword.id)
      .eq('date', yesterdayStr)
      .eq('country', 'total')
      .eq('device', 'total')
      .single()

    if (todayRanking && yesterdayRanking) {
      const drop = todayRanking.position - yesterdayRanking.position

      // Alert if position dropped by more than 5
      if (drop > 5) {
        await supabase.from('seo_alerts').insert({
          type: 'ranking_drop',
          severity: keyword.priority === 'critical' ? 'critical' : 'warning',
          title: `Ranking drop for "${keyword.keyword}"`,
          description: `Position changed from ${yesterdayRanking.position.toFixed(1)} to ${todayRanking.position.toFixed(1)} (-${drop.toFixed(1)})`,
          metadata: {
            keyword_id: keyword.id,
            keyword: keyword.keyword,
            previous_position: yesterdayRanking.position,
            current_position: todayRanking.position,
          },
        })
      }

      // Alert if position improved significantly
      if (drop < -5) {
        await supabase.from('seo_alerts').insert({
          type: 'ranking_gain',
          severity: 'info',
          title: `Ranking gain for "${keyword.keyword}"`,
          description: `Position improved from ${yesterdayRanking.position.toFixed(1)} to ${todayRanking.position.toFixed(1)} (+${Math.abs(drop).toFixed(1)})`,
          metadata: {
            keyword_id: keyword.id,
            keyword: keyword.keyword,
            previous_position: yesterdayRanking.position,
            current_position: todayRanking.position,
          },
        })
      }
    }
  }
}
