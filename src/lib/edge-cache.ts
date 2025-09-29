import { NextRequest, NextResponse } from 'next/server'

import { SITE_URL } from './site-config'

// Cache configuration for different types of API responses
export const CacheConfig = {
  // Static data that rarely changes
  STATIC: {
    maxAge: 86400, // 24 hours
    staleWhileRevalidate: 604800, // 1 week
    tags: ['static-data'],
  },
  // Dynamic data that changes frequently
  DYNAMIC: {
    maxAge: 300, // 5 minutes
    staleWhileRevalidate: 600, // 10 minutes
    tags: ['dynamic-data'],
  },
  // Blog content
  BLOG: {
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 86400, // 24 hours
    tags: ['blog-content'],
  },
  // User-specific data
  USER: {
    maxAge: 60, // 1 minute
    staleWhileRevalidate: 300, // 5 minutes
    tags: ['user-data'],
  },
  // Real-time data
  REALTIME: {
    maxAge: 0, // No cache
    staleWhileRevalidate: 0,
    tags: ['realtime'],
  },
} as const

type CacheType = keyof typeof CacheConfig

// Utility function to create cached API responses
export function createCachedResponse<T>(
  data: T,
  cacheType: CacheType = 'DYNAMIC',
  customTags?: string[]
): NextResponse<T> {
  const config = CacheConfig[cacheType]
  const tags = [...config.tags, ...(customTags || [])]

  const response = NextResponse.json(data)

  // Set cache headers
  response.headers.set(
    'Cache-Control',
    `public, max-age=${config.maxAge}, stale-while-revalidate=${config.staleWhileRevalidate}`
  )

  // Set cache tags for selective invalidation
  response.headers.set('X-Cache-Tags', tags.join(','))

  // Add edge cache headers for Vercel Pro
  response.headers.set('X-Edge-Cache', 'MISS')
  response.headers.set('Vary', 'Accept-Encoding')

  return response
}

// Middleware to handle caching based on request patterns
export function withEdgeCache(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    // Add cache-related headers to the request
    const url = new URL(request.url)
    const cacheKey = `${request.method}:${url.pathname}:${url.search}`

    // Check if this is a cacheable request
    const isCacheable = request.method === 'GET' || request.method === 'HEAD'

    if (!isCacheable) {
      return handler(request)
    }

    try {
      const response = await handler(request)

      // Add cache debugging headers
      response.headers.set('X-Cache-Key', cacheKey)
      response.headers.set('X-Cache-Date', new Date().toISOString())

      return response
    } catch {
      // Don't cache error responses
      const errorResponse = NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
      errorResponse.headers.set(
        'Cache-Control',
        'no-cache, no-store, must-revalidate'
      )
      return errorResponse
    }
  }
}

// Cache invalidation utilities
export class CacheInvalidator {
  private static baseUrl = SITE_URL
  private static token = process.env.REVALIDATE_TOKEN || ''

  // Invalidate cache by tags
  static async invalidateByTags(tags: string[]): Promise<void> {
    for (const tag of tags) {
      try {
        await fetch(`${this.baseUrl}/api/revalidate`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'tag',
            slug: tag,
          }),
        })
      } catch (error) {
        console.error(`Failed to invalidate cache for tag: ${tag}`, error)
      }
    }
  }

  // Invalidate specific paths
  static async invalidatePaths(paths: string[]): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/api/revalidate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'content',
          paths,
        }),
      })
    } catch (error) {
      console.error('Failed to invalidate cache for paths:', paths, error)
    }
  }

  // Invalidate blog-related caches
  static async invalidateBlog(): Promise<void> {
    await this.invalidateByTags(['blog-content'])
  }

  // Invalidate static page caches
  static async invalidateStaticPages(): Promise<void> {
    await this.invalidateByTags(['static-pages'])
  }
}

// Edge-specific caching utilities for Vercel Pro
export class EdgeCacheUtils {
  // Set edge-specific cache headers
  static setEdgeHeaders(
    response: NextResponse,
    options: {
      maxAge?: number
      staleWhileRevalidate?: number
      tags?: string[]
      vary?: string[]
    } = {}
  ): void {
    const {
      maxAge = 300,
      staleWhileRevalidate = 600,
      tags = [],
      vary = ['Accept-Encoding'],
    } = options

    response.headers.set(
      'Cache-Control',
      `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`
    )

    if (tags.length > 0) {
      response.headers.set('X-Cache-Tags', tags.join(','))
    }

    if (vary.length > 0) {
      response.headers.set('Vary', vary.join(', '))
    }

    // Vercel-specific headers
    response.headers.set('X-Edge-Cache', 'MISS')
    response.headers.set('X-Cache-Status', 'DYNAMIC')
  }

  // Create a cached response with edge optimization
  static createEdgeResponse<T>(
    data: T,
    options: {
      cacheType?: CacheType
      customTags?: string[]
      vary?: string[]
    } = {}
  ): NextResponse<T> {
    const {
      cacheType = 'DYNAMIC',
      customTags = [],
      vary = ['Accept-Encoding'],
    } = options
    const config = CacheConfig[cacheType]

    const response = NextResponse.json(data)

    this.setEdgeHeaders(response, {
      maxAge: config.maxAge,
      staleWhileRevalidate: config.staleWhileRevalidate,
      tags: [...config.tags, ...customTags],
      vary,
    })

    return response
  }
}

// Example usage in API routes:
/*
// /api/blog/posts/route.ts
export async function GET(request: NextRequest) {
  const posts = await getBlogPosts()

  return createCachedResponse(posts, 'BLOG', ['posts-list'])
}

// /api/user/profile/route.ts
export const GET = withEdgeCache(async (request: NextRequest) => {
  const profile = await getUserProfile()

  return EdgeCacheUtils.createEdgeResponse(profile, {
    cacheType: 'USER',
    customTags: ['user-profile'],
    vary: ['Authorization', 'Accept-Encoding']
  })
})
*/
