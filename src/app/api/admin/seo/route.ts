import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { rateLimiters } from '@/lib/rate-limit'
import { requireAuth } from '@/lib/auth-helpers'

// Query parameter validation
const seoQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(365).default(30),
})

/**
 * SEO Monitoring Dashboard API
 * GET /api/admin/seo
 *
 * Returns comprehensive SEO metrics and rankings
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const identifier =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'anonymous'

    const { success } = await rateLimiters.admin.check(10, identifier)

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

    // Validate query parameters
    const searchParams = request.nextUrl.searchParams
    const validationResult = seoQuerySchema.safeParse({
      days: searchParams.get('days'),
    })

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid query parameters',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const { days } = validationResult.data
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Fetch all SEO metrics
    const [
      keywordStats,
      topKeywords,
      topPages,
      recentQueries,
      rankingTrends,
      alerts,
    ] = await Promise.all([
      getKeywordStats(startDate),
      getTopKeywords(startDate, 10),
      getTopPages(startDate, 10),
      getRecentQueries(startDate, 20),
      getRankingTrends(startDate),
      getRecentAlerts(10),
    ])

    return NextResponse.json({
      period: {
        days,
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString(),
      },
      keywordStats,
      topKeywords,
      topPages,
      recentQueries,
      rankingTrends,
      alerts,
    })
  } catch (error) {
    console.error('[SEO API] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch SEO data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * Get overall keyword statistics
 * Now properly aggregates daily data within the date range
 */
async function getKeywordStats(startDate: Date) {
  const endDate = new Date()

  // Get all rankings within the date range
  const { data: allRankings } = await supabase
    .from('keyword_rankings')
    .select(
      `
      keyword_id,
      date,
      position,
      clicks,
      impressions,
      target_keywords (keyword, priority)
    `
    )
    .gte('date', startDate.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0])
    .eq('country', 'total')
    .eq('device', 'total')
    .order('date', { ascending: false })

  if (!allRankings || allRankings.length === 0) {
    return {
      totalKeywords: 0,
      avgPosition: 0,
      topPositions: 0,
      totalClicks: 0,
      totalImpressions: 0,
      avgCTR: 0,
    }
  }

  // Group by keyword_id and get the latest entry for each keyword
  const keywordMap = new Map()
  allRankings.forEach(ranking => {
    if (!keywordMap.has(ranking.keyword_id)) {
      // Since ordered by date DESC, first entry is the latest
      keywordMap.set(ranking.keyword_id, {
        latestPosition: ranking.position,
        totalClicks: 0,
        totalImpressions: 0,
      })
    }
  })

  // Now sum up all clicks and impressions across the date range for each keyword
  allRankings.forEach(ranking => {
    const keywordData = keywordMap.get(ranking.keyword_id)
    if (keywordData) {
      keywordData.totalClicks += ranking.clicks
      keywordData.totalImpressions += ranking.impressions
    }
  })

  const keywordDataArray = Array.from(keywordMap.values())

  const totalKeywords = keywordDataArray.length
  const avgPosition =
    totalKeywords > 0
      ? keywordDataArray.reduce((sum, r) => sum + r.latestPosition, 0) /
        totalKeywords
      : 0
  const topPositions = keywordDataArray.filter(
    r => r.latestPosition <= 10
  ).length
  const totalClicks = keywordDataArray.reduce(
    (sum, r) => sum + r.totalClicks,
    0
  )
  const totalImpressions = keywordDataArray.reduce(
    (sum, r) => sum + r.totalImpressions,
    0
  )

  return {
    totalKeywords,
    avgPosition,
    topPositions,
    totalClicks,
    totalImpressions,
    avgCTR: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
  }
}

/**
 * Get top performing keywords
 * Aggregates clicks/impressions across date range, uses latest position
 */
async function getTopKeywords(startDate: Date, limit: number) {
  const endDate = new Date()

  const { data: allRankings } = await supabase
    .from('keyword_rankings')
    .select(
      `
      keyword_id,
      date,
      position,
      clicks,
      impressions,
      ctr,
      target_keywords (keyword, priority)
    `
    )
    .gte('date', startDate.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0])
    .eq('country', 'total')
    .eq('device', 'total')
    .order('date', { ascending: false })

  if (!allRankings || allRankings.length === 0) return []

  // Group by keyword_id and aggregate
  const keywordMap = new Map()
  allRankings.forEach(ranking => {
    if (!keywordMap.has(ranking.keyword_id)) {
      keywordMap.set(ranking.keyword_id, {
        position: ranking.position, // Latest position (first in DESC order)
        clicks: 0,
        impressions: 0,
        target_keywords: ranking.target_keywords,
      })
    }

    const keywordData = keywordMap.get(ranking.keyword_id)
    keywordData.clicks += ranking.clicks
    keywordData.impressions += ranking.impressions
  })

  // Convert to array and calculate CTR
  const keywords = Array.from(keywordMap.values()).map(k => ({
    position: k.position,
    clicks: k.clicks,
    impressions: k.impressions,
    ctr: k.impressions > 0 ? k.clicks / k.impressions : 0,
    target_keywords: k.target_keywords,
  }))

  // Sort by total clicks and limit
  return keywords.sort((a, b) => b.clicks - a.clicks).slice(0, limit)
}

/**
 * Get top performing pages
 * Aggregates clicks/impressions across date range, uses latest position
 */
async function getTopPages(startDate: Date, limit: number) {
  const endDate = new Date()

  console.log(
    `[SEO API] Querying pages from ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`
  )

  const { data: allPages, error } = await supabase
    .from('page_performance')
    .select('url, date, clicks, impressions, ctr, position')
    .gte('date', startDate.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0])
    .eq('country', 'total')
    .eq('device', 'total')
    .order('date', { ascending: false })

  console.log(
    `[SEO API] Found ${allPages?.length || 0} page records`,
    error ? `Error: ${JSON.stringify(error)}` : ''
  )

  if (error) {
    console.error('[SEO API] Supabase error fetching pages:', error)
  }

  if (!allPages || allPages.length === 0) {
    console.log('[SEO API] No pages found in database for this date range')
    return []
  }

  // Group by URL and aggregate
  const pageMap = new Map()
  allPages.forEach(page => {
    if (!pageMap.has(page.url)) {
      pageMap.set(page.url, {
        url: page.url,
        position: page.position, // Latest position
        clicks: 0,
        impressions: 0,
      })
    }

    const pageData = pageMap.get(page.url)
    pageData.clicks += page.clicks
    pageData.impressions += page.impressions
  })

  // Convert to array and calculate CTR
  const pages = Array.from(pageMap.values()).map(p => ({
    url: p.url,
    clicks: p.clicks,
    impressions: p.impressions,
    ctr: p.impressions > 0 ? p.clicks / p.impressions : 0,
    position: p.position,
  }))

  // Sort by total clicks and limit
  return pages.sort((a, b) => b.clicks - a.clicks).slice(0, limit)
}

/**
 * Get recent search queries
 * Aggregates clicks/impressions across date range, uses latest position
 */
async function getRecentQueries(startDate: Date, limit: number) {
  const endDate = new Date()

  console.log(
    `[SEO API] Querying queries from ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`
  )

  const { data: allQueries, error } = await supabase
    .from('search_queries')
    .select('query, date, clicks, impressions, ctr, position')
    .gte('date', startDate.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0])
    .eq('country', 'total')
    .eq('device', 'total')
    .order('date', { ascending: false })

  console.log(
    `[SEO API] Found ${allQueries?.length || 0} query records`,
    error ? `Error: ${error.message}` : ''
  )

  if (!allQueries || allQueries.length === 0) return []

  // Group by query and aggregate
  const queryMap = new Map()
  allQueries.forEach(query => {
    if (!queryMap.has(query.query)) {
      queryMap.set(query.query, {
        query: query.query,
        position: query.position, // Latest position
        clicks: 0,
        impressions: 0,
      })
    }

    const queryData = queryMap.get(query.query)
    queryData.clicks += query.clicks
    queryData.impressions += query.impressions
  })

  // Convert to array and calculate CTR
  const queries = Array.from(queryMap.values()).map(q => ({
    query: q.query,
    clicks: q.clicks,
    impressions: q.impressions,
    ctr: q.impressions > 0 ? q.clicks / q.impressions : 0,
    position: q.position,
  }))

  // Sort by total impressions and limit
  return queries.sort((a, b) => b.impressions - a.impressions).slice(0, limit)
}

/**
 * Get ranking trends over time
 */
async function getRankingTrends(startDate: Date) {
  const { data } = await supabase
    .from('keyword_rankings')
    .select(
      `
      date,
      position,
      clicks,
      impressions,
      target_keywords (keyword, priority)
    `
    )
    .gte('date', startDate.toISOString().split('T')[0])
    .eq('country', 'total')
    .eq('device', 'total')
    .order('date', { ascending: true })

  if (!data) return []

  // Group by date
  const trendsByDate: Record<
    string,
    {
      date: string
      avgPosition: number
      totalClicks: number
      totalImpressions: number
      count: number
    }
  > = {}

  data.forEach(row => {
    if (!trendsByDate[row.date]) {
      trendsByDate[row.date] = {
        date: row.date,
        avgPosition: 0,
        totalClicks: 0,
        totalImpressions: 0,
        count: 0,
      }
    }

    trendsByDate[row.date].avgPosition += row.position
    trendsByDate[row.date].totalClicks += row.clicks
    trendsByDate[row.date].totalImpressions += row.impressions
    trendsByDate[row.date].count++
  })

  // Calculate averages
  Object.keys(trendsByDate).forEach(date => {
    const trend = trendsByDate[date]
    trend.avgPosition = trend.avgPosition / trend.count
  })

  return Object.values(trendsByDate)
}

/**
 * Get recent SEO alerts
 */
async function getRecentAlerts(limit: number) {
  const { data } = await supabase
    .from('seo_alerts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  return data || []
}
