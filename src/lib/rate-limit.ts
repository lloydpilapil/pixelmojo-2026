import { LRUCache } from 'lru-cache'

export interface RateLimitOptions {
  /**
   * Maximum number of unique tokens (IPs) to track
   * @default 500
   */
  uniqueTokenPerInterval?: number
  /**
   * Time window in milliseconds
   * @default 60000 (1 minute)
   */
  interval?: number
}

export interface RateLimiter {
  /**
   * Check if a token is within rate limit
   * @param token - Unique identifier (usually IP address)
   * @param limit - Maximum requests allowed in interval
   * @returns Promise resolving to success status
   */
  check: (
    limit: number,
    token: string
  ) => Promise<{ success: boolean; remaining: number }>
}

/**
 * Create a rate limiter using LRU cache
 * @param options - Rate limit configuration
 * @returns Rate limiter instance
 *
 * @example
 * ```typescript
 * const limiter = rateLimit({
 *   interval: 60 * 1000, // 1 minute
 *   uniqueTokenPerInterval: 500,
 * })
 *
 * // In your API route:
 * const identifier = request.ip ?? 'anonymous'
 * const { success } = await limiter.check(identifier, 5) // 5 requests per minute
 *
 * if (!success) {
 *   return NextResponse.json(
 *     { error: 'Rate limit exceeded' },
 *     { status: 429 }
 *   )
 * }
 * ```
 */
export function rateLimit(options?: RateLimitOptions): RateLimiter {
  const tokenCache = new LRUCache<string, number[]>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (limit: number, token: string) =>
      new Promise<{ success: boolean; remaining: number }>(resolve => {
        const tokenCount = tokenCache.get(token) || [0]

        if (tokenCount[0] === 0) {
          // First request from this token
          tokenCache.set(token, [1])
          resolve({ success: true, remaining: limit - 1 })
        } else if (tokenCount[0] < limit) {
          // Within limit
          tokenCount[0] += 1
          tokenCache.set(token, tokenCount)
          resolve({ success: true, remaining: limit - tokenCount[0] })
        } else {
          // Exceeded limit
          resolve({ success: false, remaining: 0 })
        }
      }),
  }
}

/**
 * Pre-configured rate limiters for common use cases
 */
export const rateLimiters = {
  /**
   * For public API endpoints
   * 20 requests per minute
   */
  public: rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 500,
  }),

  /**
   * For authentication endpoints
   * 5 requests per 15 minutes
   */
  auth: rateLimit({
    interval: 15 * 60 * 1000,
    uniqueTokenPerInterval: 500,
  }),

  /**
   * For contact forms
   * 3 requests per hour
   */
  contact: rateLimit({
    interval: 60 * 60 * 1000,
    uniqueTokenPerInterval: 500,
  }),

  /**
   * For newsletter signups
   * 2 requests per day
   */
  newsletter: rateLimit({
    interval: 24 * 60 * 60 * 1000,
    uniqueTokenPerInterval: 500,
  }),

  /**
   * For admin analytics endpoints
   * 10 requests per minute
   */
  admin: rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 100,
  }),
}
