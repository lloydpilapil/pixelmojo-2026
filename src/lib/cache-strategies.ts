// Comprehensive caching strategies for different content types

export interface CacheStrategy {
  maxAge: number // Cache TTL in seconds
  staleWhileRevalidate: number // SWR window in seconds
  tags: string[] // Cache tags for invalidation
  vary?: string[] // Vary headers
  immutable?: boolean // Whether content is immutable
}

// Content-specific cache strategies
export const CacheStrategies = {
  // Static assets (JS, CSS, fonts) - Long cache with immutable flag
  STATIC_ASSETS: {
    maxAge: 31536000, // 1 year
    staleWhileRevalidate: 0, // No SWR for immutable content
    tags: ['static-assets'],
    immutable: true,
  } as CacheStrategy,

  // Images - Long cache with reasonable SWR
  IMAGES: {
    maxAge: 31536000, // 1 year
    staleWhileRevalidate: 86400, // 1 day
    tags: ['images'],
    vary: ['Accept'],
  } as CacheStrategy,

  // Blog posts - Medium cache for updated content
  BLOG_POSTS: {
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 86400, // 1 day
    tags: ['blog-content', 'blog-posts'],
    vary: ['Accept-Encoding'],
  } as CacheStrategy,

  // Blog listing - Shorter cache for frequently updated lists
  BLOG_LISTING: {
    maxAge: 1800, // 30 minutes
    staleWhileRevalidate: 3600, // 1 hour
    tags: ['blog-content', 'blog-listing'],
    vary: ['Accept-Encoding'],
  } as CacheStrategy,

  // Static pages (about, services) - Daily updates
  STATIC_PAGES: {
    maxAge: 86400, // 1 day
    staleWhileRevalidate: 604800, // 1 week
    tags: ['static-pages'],
    vary: ['Accept-Encoding'],
  } as CacheStrategy,

  // Dynamic pages (contact) - Short cache
  DYNAMIC_PAGES: {
    maxAge: 1800, // 30 minutes
    staleWhileRevalidate: 3600, // 1 hour
    tags: ['dynamic-pages'],
    vary: ['Accept-Encoding'],
  } as CacheStrategy,

  // API responses - Very short cache
  API_RESPONSES: {
    maxAge: 300, // 5 minutes
    staleWhileRevalidate: 600, // 10 minutes
    tags: ['api-routes'],
    vary: ['Accept', 'Authorization'],
  } as CacheStrategy,

  // Edge Config responses - Medium cache
  EDGE_CONFIG: {
    maxAge: 900, // 15 minutes
    staleWhileRevalidate: 1800, // 30 minutes
    tags: ['edge-config'],
    vary: ['Accept-Encoding'],
  } as CacheStrategy,

  // User-specific content - Very short cache
  USER_CONTENT: {
    maxAge: 60, // 1 minute
    staleWhileRevalidate: 300, // 5 minutes
    tags: ['user-content'],
    vary: ['Authorization', 'Cookie'],
  } as CacheStrategy,

  // Real-time content - No cache
  REALTIME: {
    maxAge: 0,
    staleWhileRevalidate: 0,
    tags: ['realtime'],
    vary: ['Accept-Encoding'],
  } as CacheStrategy,
} as const

// Cache strategy by content type
export const ContentTypeCaching = {
  // Web pages
  'text/html': CacheStrategies.STATIC_PAGES,

  // API responses
  'application/json': CacheStrategies.API_RESPONSES,

  // Images
  'image/jpeg': CacheStrategies.IMAGES,
  'image/png': CacheStrategies.IMAGES,
  'image/webp': CacheStrategies.IMAGES,
  'image/avif': CacheStrategies.IMAGES,
  'image/svg+xml': CacheStrategies.IMAGES,

  // Static assets
  'application/javascript': CacheStrategies.STATIC_ASSETS,
  'text/css': CacheStrategies.STATIC_ASSETS,
  'font/woff': CacheStrategies.STATIC_ASSETS,
  'font/woff2': CacheStrategies.STATIC_ASSETS,
} as const

// Route-specific cache strategies
export const RouteSpecificCaching = {
  // Homepage - Medium cache with frequent updates
  '/': {
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 86400, // 1 day
    tags: ['homepage', 'featured-content'],
  } as CacheStrategy,

  // Blog routes
  '/blogs': CacheStrategies.BLOG_LISTING,
  '/blogs/[slug]': CacheStrategies.BLOG_POSTS,
  '/blogs/page/[page]': CacheStrategies.BLOG_LISTING,

  // Static pages
  '/about': CacheStrategies.STATIC_PAGES,
  '/services': CacheStrategies.STATIC_PAGES,
  '/works': CacheStrategies.STATIC_PAGES,

  // Dynamic pages
  '/contact-us': CacheStrategies.DYNAMIC_PAGES,

  // API routes
  '/api/revalidate': CacheStrategies.REALTIME,
  '/api/edge-config': CacheStrategies.EDGE_CONFIG,
} as const

// Cache invalidation patterns
export const InvalidationPatterns = {
  // When blog content changes
  BLOG_UPDATE: {
    tags: ['blog-content', 'blog-posts', 'blog-listing', 'featured-content'],
    paths: ['/', '/blogs'],
  },

  // When static pages change
  STATIC_UPDATE: {
    tags: ['static-pages'],
    paths: ['/about', '/services', '/works'],
  },

  // When images are updated
  IMAGE_UPDATE: {
    tags: ['images'],
    paths: ['/'], // Homepage might show updated images
  },

  // When site configuration changes
  CONFIG_UPDATE: {
    tags: ['edge-config', 'static-pages', 'dynamic-pages'],
    paths: ['/'],
  },

  // Emergency full site invalidation
  EMERGENCY: {
    tags: [
      'static-assets',
      'images',
      'blog-content',
      'static-pages',
      'dynamic-pages',
    ],
    paths: ['/', '/blogs', '/about', '/services', '/works', '/contact-us'],
  },
} as const

// Utility functions for cache management
export class CacheManager {
  // Get cache strategy for a specific route
  static getRouteStrategy(pathname: string): CacheStrategy {
    // Check for exact matches first
    if (pathname in RouteSpecificCaching) {
      return RouteSpecificCaching[pathname as keyof typeof RouteSpecificCaching]
    }

    // Check for pattern matches
    if (pathname.startsWith('/blogs/') && pathname !== '/blogs') {
      return CacheStrategies.BLOG_POSTS
    }

    if (pathname.startsWith('/blogs/page/')) {
      return CacheStrategies.BLOG_LISTING
    }

    if (pathname.startsWith('/services/')) {
      return CacheStrategies.STATIC_PAGES
    }

    if (pathname.startsWith('/works/')) {
      return CacheStrategies.STATIC_PAGES
    }

    if (pathname.startsWith('/api/')) {
      return CacheStrategies.API_RESPONSES
    }

    // Default to dynamic pages strategy
    return CacheStrategies.DYNAMIC_PAGES
  }

  // Generate cache control header
  static generateCacheControl(strategy: CacheStrategy): string {
    const directives = ['public']

    directives.push(`max-age=${strategy.maxAge}`)

    if (strategy.staleWhileRevalidate > 0) {
      directives.push(`stale-while-revalidate=${strategy.staleWhileRevalidate}`)
    }

    if (strategy.immutable) {
      directives.push('immutable')
    }

    return directives.join(', ')
  }

  // Generate cache tags header
  static generateCacheTags(
    strategy: CacheStrategy,
    customTags: string[] = []
  ): string {
    return [...strategy.tags, ...customTags].join(',')
  }

  // Generate vary header
  static generateVaryHeader(
    strategy: CacheStrategy,
    customVary: string[] = []
  ): string {
    const varyHeaders = [...(strategy.vary || []), ...customVary]
    return varyHeaders.length > 0 ? varyHeaders.join(', ') : 'Accept-Encoding'
  }
}

// Performance monitoring for cache effectiveness
export class CacheMetrics {
  private static metrics: Map<string, { hits: number; misses: number }> =
    new Map()

  static recordHit(cacheKey: string): void {
    const current = this.metrics.get(cacheKey) || { hits: 0, misses: 0 }
    current.hits++
    this.metrics.set(cacheKey, current)
  }

  static recordMiss(cacheKey: string): void {
    const current = this.metrics.get(cacheKey) || { hits: 0, misses: 0 }
    current.misses++
    this.metrics.set(cacheKey, current)
  }

  static getMetrics(): Record<
    string,
    { hits: number; misses: number; hitRatio: number }
  > {
    const result: Record<
      string,
      { hits: number; misses: number; hitRatio: number }
    > = {}

    for (const [key, value] of this.metrics.entries()) {
      const total = value.hits + value.misses
      result[key] = {
        ...value,
        hitRatio: total > 0 ? value.hits / total : 0,
      }
    }

    return result
  }

  static resetMetrics(): void {
    this.metrics.clear()
  }
}
