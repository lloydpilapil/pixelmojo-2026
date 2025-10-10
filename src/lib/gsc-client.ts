/**
 * Google Search Console API Client
 * Provides typed methods for interacting with GSC data via MCP or direct API
 */

import { google } from 'googleapis'

export interface GSCQuery {
  startDate: string
  endDate: string
  dimensions?: ('query' | 'page' | 'country' | 'device' | 'searchAppearance')[]
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
   * Get keyword rankings for specific queries
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
   * Get top performing pages
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
   * Get top search queries
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
 */
export function getDateRange(days: number): {
  startDate: string
  endDate: string
} {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  return {
    startDate: formatGSCDate(startDate),
    endDate: formatGSCDate(endDate),
  }
}
