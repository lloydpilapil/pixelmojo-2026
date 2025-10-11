import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { rateLimiters } from '@/lib/rate-limit'
import { requireAuth } from '@/lib/auth-helpers'

/**
 * Keyword Research API
 * GET /api/admin/seo/keyword-research?seed=ai+design
 *
 * Returns keyword suggestions based on:
 * 1. Google Autocomplete API (free)
 * 2. Your existing GSC data (related queries)
 * 3. Estimated difficulty based on your current rankings
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

    // Verify admin authorization
    const auth = await requireAuth()
    if (!auth.authorized) {
      return auth.response
    }

    const searchParams = request.nextUrl.searchParams
    const seed = searchParams.get('seed')

    if (!seed || seed.trim().length === 0) {
      return NextResponse.json(
        { error: 'Seed keyword is required' },
        { status: 400 }
      )
    }

    // 1. Get Google Autocomplete suggestions (free, no API key needed)
    const autocompleteSuggestions = await getGoogleAutocompleteSuggestions(seed)

    // 2. Get related queries from your existing GSC data
    const relatedFromGSC = await getRelatedQueriesFromGSC(seed)

    // 3. Get your current rankings for context
    const yourRankings = await getYourRankingsForKeywords([
      seed,
      ...autocompleteSuggestions,
    ])

    // 4. Combine and enrich data
    const keywords = await enrichKeywordData(
      seed,
      autocompleteSuggestions,
      relatedFromGSC,
      yourRankings
    )

    return NextResponse.json({
      seed,
      totalResults: keywords.length,
      keywords,
    })
  } catch (error) {
    console.error('[Keyword Research API] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch keyword suggestions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * Get keyword suggestions from Google Autocomplete (100% free)
 * Uses the same API that powers Google's search bar suggestions
 */
async function getGoogleAutocompleteSuggestions(
  seed: string
): Promise<string[]> {
  try {
    // Google Autocomplete API is public and doesn't require auth
    const response = await fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(seed)}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      }
    )

    if (!response.ok) {
      console.error('[Keyword Research] Google Autocomplete failed')
      return []
    }

    const data = await response.json()
    // Response format: [search_term, [suggestions]]
    return data[1] || []
  } catch (error) {
    console.error('[Keyword Research] Autocomplete error:', error)
    return []
  }
}

/**
 * Find related queries from your existing GSC data
 */
async function getRelatedQueriesFromGSC(seed: string): Promise<
  Array<{
    query: string
    impressions: number
    clicks: number
    position: number
    ctr: number
  }>
> {
  // Get all queries that contain the seed term or are semantically related
  const { data } = await supabase
    .from('search_queries')
    .select('query, impressions, clicks, position, ctr')
    .or(`query.ilike.%${seed}%,query.ilike.%${seed.split(' ')[0]}%`)
    .order('impressions', { ascending: false })
    .limit(50)

  if (!data) return []

  // Aggregate by query (sum impressions/clicks across dates)
  const queryMap = new Map<
    string,
    { impressions: number; clicks: number; position: number; ctr: number }
  >()

  data.forEach(row => {
    if (!queryMap.has(row.query)) {
      queryMap.set(row.query, {
        impressions: 0,
        clicks: 0,
        position: row.position,
        ctr: 0,
      })
    }
    const q = queryMap.get(row.query)!
    q.impressions += row.impressions
    q.clicks += row.clicks
  })

  return Array.from(queryMap.entries()).map(([query, stats]) => ({
    query,
    ...stats,
    ctr: stats.impressions > 0 ? stats.clicks / stats.impressions : 0,
  }))
}

/**
 * Check if you already rank for these keywords
 */
async function getYourRankingsForKeywords(
  keywords: string[]
): Promise<
  Map<string, { position: number; clicks: number; impressions: number }>
> {
  const { data } = await supabase
    .from('search_queries')
    .select('query, position, clicks, impressions')
    .in('query', keywords)
    .order('query')

  const rankingsMap = new Map<
    string,
    { position: number; clicks: number; impressions: number }
  >()

  if (!data) return rankingsMap

  // Get most recent ranking for each keyword
  data.forEach(row => {
    if (!rankingsMap.has(row.query)) {
      rankingsMap.set(row.query, {
        position: row.position,
        clicks: row.clicks,
        impressions: row.impressions,
      })
    }
  })

  return rankingsMap
}

/**
 * Enrich keyword data with difficulty scores and opportunities
 */
async function enrichKeywordData(
  seed: string,
  autocompleteSuggestions: string[],
  gscRelated: Array<{
    query: string
    impressions: number
    clicks: number
    position: number
    ctr: number
  }>,
  yourRankings: Map<
    string,
    { position: number; clicks: number; impressions: number }
  >
) {
  // Combine all keywords
  const allKeywords = new Set([
    seed,
    ...autocompleteSuggestions,
    ...gscRelated.map(q => q.query),
  ])

  const keywords = Array.from(allKeywords).map(keyword => {
    const gscData = gscRelated.find(q => q.query === keyword)
    const ranking = yourRankings.get(keyword)

    // Estimate difficulty based on your current ranking
    // If you rank well (top 20), keyword is easier for you
    const difficulty = ranking
      ? ranking.position <= 10
        ? 'Easy'
        : ranking.position <= 20
          ? 'Medium'
          : 'Hard'
      : 'Unknown'

    // Calculate opportunity score (0-100)
    let opportunityScore = 0
    if (gscData) {
      // High impressions + low position = high opportunity
      const impressionScore = Math.min(gscData.impressions / 100, 50) // max 50 points
      const positionScore =
        gscData.position > 10 ? Math.min((20 - gscData.position) * 5, 30) : 0 // max 30 points
      const ctrScore = gscData.ctr < 0.05 ? 20 : 0 // Low CTR = opportunity
      opportunityScore = Math.round(impressionScore + positionScore + ctrScore)
    }

    return {
      keyword,
      source: autocompleteSuggestions.includes(keyword)
        ? 'autocomplete'
        : gscData
          ? 'gsc'
          : 'seed',
      currentRanking: ranking?.position || null,
      impressions: gscData?.impressions || 0,
      clicks: gscData?.clicks || 0,
      ctr: gscData?.ctr || 0,
      difficulty,
      opportunityScore,
      // Estimate search volume based on your impressions
      // If you rank at position 10 with 100 impressions, true volume is ~10x
      estimatedVolume: ranking
        ? Math.round(
            ((gscData?.impressions || 0) / (1 / ranking.position)) * 10
          )
        : null,
    }
  })

  // Sort by opportunity score (highest first)
  return keywords
    .filter(k => k.keyword !== seed) // Remove seed itself
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 50) // Return top 50
}
