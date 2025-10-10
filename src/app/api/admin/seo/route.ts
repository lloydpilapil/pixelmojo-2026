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
 */
async function getKeywordStats(startDate: Date) {
  // Get latest rankings for all tracked keywords
  const { data: latestRankings } = await supabase
    .from('keyword_rankings')
    .select(
      `
      keyword_id,
      position,
      clicks,
      impressions,
      target_keywords (keyword, priority)
    `
    )
    .gte('created_at', startDate.toISOString())
    .eq('country', 'total')
    .eq('device', 'total')
    .order('date', { ascending: false })

  if (!latestRankings) {
    return {
      totalKeywords: 0,
      avgPosition: 0,
      topPositions: 0,
      totalClicks: 0,
      totalImpressions: 0,
    }
  }

  // Group by keyword_id and get the latest entry for each
  const keywordMap = new Map()
  latestRankings.forEach(ranking => {
    if (!keywordMap.has(ranking.keyword_id)) {
      keywordMap.set(ranking.keyword_id, ranking)
    }
  })

  const latestKeywordRankings = Array.from(keywordMap.values())

  const totalKeywords = latestKeywordRankings.length
  const avgPosition =
    latestKeywordRankings.reduce((sum, r) => sum + r.position, 0) /
    totalKeywords
  const topPositions = latestKeywordRankings.filter(
    r => r.position <= 10
  ).length
  const totalClicks = latestKeywordRankings.reduce(
    (sum, r) => sum + r.clicks,
    0
  )
  const totalImpressions = latestKeywordRankings.reduce(
    (sum, r) => sum + r.impressions,
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
 */
async function getTopKeywords(startDate: Date, limit: number) {
  const { data } = await supabase
    .from('keyword_rankings')
    .select(
      `
      position,
      clicks,
      impressions,
      ctr,
      target_keywords (keyword, priority)
    `
    )
    .gte('created_at', startDate.toISOString())
    .eq('country', 'total')
    .eq('device', 'total')
    .order('clicks', { ascending: false })
    .limit(limit)

  return data || []
}

/**
 * Get top performing pages
 */
async function getTopPages(startDate: Date, limit: number) {
  const { data } = await supabase
    .from('page_performance')
    .select('url, clicks, impressions, ctr, position')
    .gte('created_at', startDate.toISOString())
    .eq('country', 'total')
    .eq('device', 'total')
    .order('clicks', { ascending: false })
    .limit(limit)

  return data || []
}

/**
 * Get recent search queries
 */
async function getRecentQueries(startDate: Date, limit: number) {
  const { data } = await supabase
    .from('search_queries')
    .select('query, clicks, impressions, ctr, position')
    .gte('created_at', startDate.toISOString())
    .eq('country', 'total')
    .eq('device', 'total')
    .order('impressions', { ascending: false })
    .limit(limit)

  return data || []
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
