import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { GSCClient, getDateRange } from '@/lib/gsc-client'

/**
 * Automated SEO Data Sync Cron Job
 * Runs daily to sync GSC data
 *
 * Vercel Cron Configuration (in vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/seo-sync",
 *     "schedule": "0 2 * * *"
 *   }]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    // Verify this request is from Vercel Cron
    const authHeader = request.headers.get('authorization')

    // Vercel Cron sends a Bearer token
    if (process.env.CRON_SECRET) {
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    console.log('[Cron] Starting automated SEO sync...')

    const siteUrl =
      process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY_URL ||
      'https://www.pixelmojo.io'
    const gscClient = new GSCClient(siteUrl)

    // Sync last 3 days to catch any updates
    const { startDate, endDate } = getDateRange(3)

    console.log(`[Cron] Syncing SEO data from ${startDate} to ${endDate}`)

    // 1. Sync tracked keyword rankings
    await syncKeywordRankings(gscClient, startDate, endDate)

    // 2. Sync top pages
    await syncPagePerformance(gscClient, startDate, endDate)

    // 3. Sync search queries
    await syncSearchQueries(gscClient, startDate, endDate)

    // 4. Detect and create alerts
    await detectSEOAlerts(startDate, endDate)

    console.log('[Cron] SEO sync completed successfully')

    return NextResponse.json({
      success: true,
      message: 'SEO data synced successfully',
      timestamp: new Date().toISOString(),
      dateRange: { startDate, endDate },
    })
  } catch (error) {
    console.error('[Cron] SEO sync error:', error)
    return NextResponse.json(
      {
        error: 'Failed to sync SEO data',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
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
  const { data: targetKeywords } = await supabase
    .from('target_keywords')
    .select('id, keyword')
    .eq('is_active', true)

  if (!targetKeywords || targetKeywords.length === 0) {
    console.log('[Cron] No target keywords found')
    return
  }

  const keywords = targetKeywords.map(k => k.keyword)
  const rankings = await gscClient.getKeywordRankings(
    keywords,
    startDate,
    endDate
  )

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

  console.log(`[Cron] Synced ${rankings.size} keyword rankings`)
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

  console.log(`[Cron] Synced ${pages.length} pages`)
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

  console.log(`[Cron] Synced ${queries.length} search queries`)
}

/**
 * Detect SEO alerts based on data changes
 */
async function detectSEOAlerts(startDate: string, endDate: string) {
  const yesterday = new Date(endDate)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

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

  console.log('[Cron] Alerts detection completed')
}
