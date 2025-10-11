/**
 * Google Search Console API Client
 * Provides typed methods for interacting with GSC data via MCP or direct API
 */

import { google } from 'googleapis'

export interface GSCQuery {
  startDate: string
  endDate: string
  dimensions?: (
    | 'query'
    | 'page'
    | 'country'
    | 'device'
    | 'date'
    | 'searchAppearance'
  )[]
  dimensionFilterGroups?: any[]
  rowLimit?: number
  startRow?: number
}

export interface GSCRow {
  keys?: string[]
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export interface GSCResponse {
  rows?: GSCRow[]
  responseAggregationType?: string
}

/**
 * Google Search Console client for fetching search analytics data
 */
export class GSCClient {
  private siteUrl: string
  private auth: any

  constructor(siteUrl: string) {
    this.siteUrl = siteUrl

    // Initialize auth from environment variables
    if (
      process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL &&
      process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY
    ) {
      this.auth = new google.auth.JWT({
        email: process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL,
        key: process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY.replace(
          /\\n/g,
          '\n'
        ),
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      })
    }
  }

  /**
   * Query search analytics data from GSC
   */
  async querySearchAnalytics(query: GSCQuery): Promise<GSCResponse> {
    if (!this.auth) {
      throw new Error('GSC authentication not configured')
    }

    const webmasters = google.webmasters({
      version: 'v3',
      auth: this.auth,
    })

    const response = await webmasters.searchanalytics.query({
      siteUrl: this.siteUrl,
      requestBody: query,
    })

    return response.data as GSCResponse
  }

  /**
   * Get keyword rankings for specific queries (aggregated across date range)
   * @deprecated Use getKeywordRankingsByDate for daily data
   */
  async getKeywordRankings(
    keywords: string[],
    startDate: string,
    endDate: string
  ): Promise<Map<string, GSCRow>> {
    const response = await this.querySearchAnalytics({
      startDate,
      endDate,
      dimensions: ['query'],
      dimensionFilterGroups: [
        {
          filters: keywords.map(keyword => ({
            dimension: 'query',
            operator: 'equals',
            expression: keyword,
          })),
        },
      ],
      rowLimit: 1000,
    })

    const rankingsMap = new Map<string, GSCRow>()

    if (response.rows) {
      response.rows.forEach(row => {
        if (row.keys && row.keys[0]) {
          rankingsMap.set(row.keys[0], row)
        }
      })
    }

    return rankingsMap
  }

  /**
   * Get keyword rankings with daily breakdown
   * Returns a map of keyword -> array of daily data points
   */
  async getKeywordRankingsByDate(
    keywords: string[],
    startDate: string,
    endDate: string
  ): Promise<Map<string, Array<GSCRow & { date: string }>>> {
    const response = await this.querySearchAnalytics({
      startDate,
      endDate,
      dimensions: ['query', 'date'],
      dimensionFilterGroups: [
        {
          filters: keywords.map(keyword => ({
            dimension: 'query',
            operator: 'equals',
            expression: keyword,
          })),
        },
      ],
      rowLimit: 25000, // Higher limit for daily data
    })

    const rankingsMap = new Map<string, Array<GSCRow & { date: string }>>()

    if (response.rows) {
      response.rows.forEach(row => {
        if (row.keys && row.keys[0] && row.keys[1]) {
          const keyword = row.keys[0]
          const date = row.keys[1]

          if (!rankingsMap.has(keyword)) {
            rankingsMap.set(keyword, [])
          }

          rankingsMap.get(keyword)!.push({
            ...row,
            date,
          })
        }
      })
    }

    return rankingsMap
  }

  /**
   * Get top performing pages (aggregated)
   * @deprecated Use getTopPagesByDate for daily data
   */
  async getTopPages(
    startDate: string,
    endDate: string,
    limit: number = 100
  ): Promise<GSCRow[]> {
    const response = await this.querySearchAnalytics({
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: limit,
    })

    return response.rows || []
  }

  /**
   * Get top performing pages with daily breakdown
   */
  async getTopPagesByDate(
    startDate: string,
    endDate: string,
    limit: number = 100
  ): Promise<Array<GSCRow & { date: string }>> {
    const response = await this.querySearchAnalytics({
      startDate,
      endDate,
      dimensions: ['page', 'date'],
      rowLimit: Math.min(25000, limit * 50), // GSC max is 25000
    })

    if (!response.rows) return []

    return response.rows
      .filter(row => row.keys && row.keys[0] && row.keys[1])
      .map(row => ({
        ...row,
        date: row.keys![1],
      }))
  }

  /**
   * Get top search queries (aggregated)
   * @deprecated Use getTopQueriesByDate for daily data
   */
  async getTopQueries(
    startDate: string,
    endDate: string,
    limit: number = 100
  ): Promise<GSCRow[]> {
    const response = await this.querySearchAnalytics({
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: limit,
    })

    return response.rows || []
  }

  /**
   * Get top search queries with daily breakdown
   */
  async getTopQueriesByDate(
    startDate: string,
    endDate: string,
    limit: number = 1000
  ): Promise<Array<GSCRow & { date: string }>> {
    const response = await this.querySearchAnalytics({
      startDate,
      endDate,
      dimensions: ['query', 'date'],
      rowLimit: Math.min(25000, limit * 10), // GSC max is 25000
    })

    if (!response.rows) return []

    return response.rows
      .filter(row => row.keys && row.keys[0] && row.keys[1])
      .map(row => ({
        ...row,
        date: row.keys![1],
      }))
  }

  /**
   * Get performance by device type
   */
  async getDevicePerformance(
    startDate: string,
    endDate: string
  ): Promise<Map<string, GSCRow>> {
    const response = await this.querySearchAnalytics({
      startDate,
      endDate,
      dimensions: ['device'],
    })

    const deviceMap = new Map<string, GSCRow>()

    if (response.rows) {
      response.rows.forEach(row => {
        if (row.keys && row.keys[0]) {
          deviceMap.set(row.keys[0], row)
        }
      })
    }

    return deviceMap
  }

  /**
   * Get performance by country
   */
  async getCountryPerformance(
    startDate: string,
    endDate: string,
    limit: number = 50
  ): Promise<GSCRow[]> {
    const response = await this.querySearchAnalytics({
      startDate,
      endDate,
      dimensions: ['country'],
      rowLimit: limit,
    })

    return response.rows || []
  }
}

/**
 * Helper function to format dates for GSC API (YYYY-MM-DD)
 */
export function formatGSCDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * Helper function to get date range
 * Note: GSC data has a 2-3 day delay, so we use data from 3 days ago as the end date
 */
export function getDateRange(days: number): {
  startDate: string
  endDate: string
} {
  // Use data from 3 days ago as the most recent available
  const endDate = new Date()
  endDate.setDate(endDate.getDate() - 3)

  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - days)

  return {
    startDate: formatGSCDate(startDate),
    endDate: formatGSCDate(endDate),
  }
}
