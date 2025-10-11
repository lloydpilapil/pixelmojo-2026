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
      console.error('[SEO Sync] Authentication failed')
      return auth.response
    }

    const body = await request.json().catch(() => ({}))
    const days = body.days || 30 // Default to last 30 days

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
    console.error(
      '[SEO Sync] Error stack:',
      error instanceof Error ? error.stack : 'No stack trace'
    )
    return NextResponse.json(
      {
        error: 'Failed to sync SEO data',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

/**
 * Sync keyword rankings for tracked keywords with daily breakdown
 */
async function syncKeywordRankings(
  gscClient: GSCClient,
  startDate: string,
  endDate: string
) {
  // Get all active target keywords
  const { data: targetKeywords, error: selectError } = await supabase
    .from('target_keywords')
    .select('id, keyword')
    .eq('is_active', true)

  if (selectError) {
    console.error('[SEO Sync] Error fetching target keywords:', selectError)
    throw new Error(`Failed to fetch target keywords: ${selectError.message}`)
  }

  if (!targetKeywords || targetKeywords.length === 0) {
    console.log('[SEO Sync] No active target keywords found')
    return
  }

  const keywords = targetKeywords.map(k => k.keyword)
  console.log(
    `[SEO Sync] Fetching rankings for ${keywords.length} keywords from ${startDate} to ${endDate}`
  )

  // Fetch daily rankings data
  const rankingsByKeyword = await gscClient.getKeywordRankingsByDate(
    keywords,
    startDate,
    endDate
  )

  console.log(
    `[SEO Sync] Retrieved data for ${rankingsByKeyword.size} keywords`
  )

  // Prepare batch upsert data
  const rankingsToUpsert = []

  for (const [keyword, dailyData] of rankingsByKeyword.entries()) {
    const targetKeyword = targetKeywords.find(k => k.keyword === keyword)
    if (!targetKeyword) continue

    for (const dayData of dailyData) {
      rankingsToUpsert.push({
        keyword_id: targetKeyword.id,
        date: dayData.date,
        position: dayData.position,
        impressions: dayData.impressions,
        clicks: dayData.clicks,
        ctr: dayData.ctr,
        country: 'total',
        device: 'total',
      })
    }
  }

  if (rankingsToUpsert.length > 0) {
    console.log(
      `[SEO Sync] Upserting ${rankingsToUpsert.length} ranking records`
    )

    // Batch upsert in chunks of 1000 to avoid payload size limits
    const chunkSize = 1000
    for (let i = 0; i < rankingsToUpsert.length; i += chunkSize) {
      const chunk = rankingsToUpsert.slice(i, i + chunkSize)

      const { error: upsertError } = await supabase
        .from('keyword_rankings')
        .upsert(chunk, {
          onConflict: 'keyword_id,date,country,device',
        })

      if (upsertError) {
        console.error(
          `[SEO Sync] Error upserting ranking chunk ${i / chunkSize + 1}:`,
          upsertError
        )
        throw new Error(`Failed to upsert rankings: ${upsertError.message}`)
      }
    }

    console.log('[SEO Sync] Successfully upserted all keyword rankings')
  } else {
    console.log('[SEO Sync] No ranking data to upsert')
  }
}

/**
 * Sync page performance data with daily breakdown
 */
async function syncPagePerformance(
  gscClient: GSCClient,
  startDate: string,
  endDate: string
) {
  console.log(
    `[SEO Sync] Fetching page performance from ${startDate} to ${endDate}`
  )

  const pages = await gscClient.getTopPagesByDate(startDate, endDate, 100)

  console.log(`[SEO Sync] Retrieved ${pages.length} page performance records`)

  if (pages.length === 0) {
    console.log('[SEO Sync] No page performance data to upsert')
    return
  }

  // Prepare batch upsert data
  const pagesToUpsert = pages
    .filter(page => page.keys && page.keys[0])
    .map(page => ({
      url: page.keys![0],
      date: page.date,
      impressions: page.impressions,
      clicks: page.clicks,
      ctr: page.ctr,
      position: page.position,
      country: 'total',
      device: 'total',
    }))

  // Batch upsert in chunks of 1000
  const chunkSize = 1000
  for (let i = 0; i < pagesToUpsert.length; i += chunkSize) {
    const chunk = pagesToUpsert.slice(i, i + chunkSize)

    const { error: upsertError } = await supabase
      .from('page_performance')
      .upsert(chunk, {
        onConflict: 'url,date,country,device',
      })

    if (upsertError) {
      console.error(
        `[SEO Sync] Error upserting page performance chunk ${i / chunkSize + 1}:`,
        upsertError
      )
      throw new Error(
        `Failed to upsert page performance: ${upsertError.message}`
      )
    }
  }

  console.log('[SEO Sync] Successfully upserted all page performance data')
}

/**
 * Sync search queries with daily breakdown
 */
async function syncSearchQueries(
  gscClient: GSCClient,
  startDate: string,
  endDate: string
) {
  console.log(
    `[SEO Sync] Fetching search queries from ${startDate} to ${endDate}`
  )

  const queries = await gscClient.getTopQueriesByDate(startDate, endDate, 1000)

  console.log(`[SEO Sync] Retrieved ${queries.length} search query records`)

  if (queries.length === 0) {
    console.log('[SEO Sync] No search query data to upsert')
    return
  }

  // Prepare batch upsert data
  const queriesToUpsert = queries
    .filter(query => query.keys && query.keys[0])
    .map(query => ({
      query: query.keys![0],
      date: query.date,
      impressions: query.impressions,
      clicks: query.clicks,
      ctr: query.ctr,
      position: query.position,
      country: 'total',
      device: 'total',
    }))

  // Batch upsert in chunks of 1000
  const chunkSize = 1000
  for (let i = 0; i < queriesToUpsert.length; i += chunkSize) {
    const chunk = queriesToUpsert.slice(i, i + chunkSize)

    const { error: upsertError } = await supabase
      .from('search_queries')
      .upsert(chunk, {
        onConflict: 'query,date,country,device',
      })

    if (upsertError) {
      console.error(
        `[SEO Sync] Error upserting search queries chunk ${i / chunkSize + 1}:`,
        upsertError
      )
      throw new Error(`Failed to upsert search queries: ${upsertError.message}`)
    }
  }

  console.log('[SEO Sync] Successfully upserted all search queries')
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
