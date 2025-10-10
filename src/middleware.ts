import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { get } from '@vercel/edge-config'
import { assignVariantConsistent, type Experiment } from './lib/ab-testing'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  try {
    // Get experiments from Edge Config
    // Falls back to hardcoded experiments if Edge Config is not set up
    const experiments = await getExperiments()

    // Process each enabled experiment
    for (const experiment of Object.values(experiments)) {
      if (!experiment.enabled) continue

      const cookieName = `ab_${experiment.id}`
      const existingVariant = request.cookies.get(cookieName)

      // If user already has a variant, skip
      if (existingVariant) continue

      // Get user identifier (IP address as fallback)
      const userId = getUserId(request)

      // Assign variant using consistent hashing
      const variant = assignVariantConsistent(experiment, userId)

      // Set cookie (30 days expiry)
      response.cookies.set(cookieName, variant, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
        sameSite: 'lax',
      })
    }
  } catch (err) {
    // Fail silently - A/B testing shouldn't break the site
    console.error('[A/B Testing] Middleware error:', err)
  }

  return response
}

/**
 * Get experiments from Edge Config or fallback to hardcoded
 */
async function getExperiments(): Promise<Record<string, Experiment>> {
  try {
    // Try to get from Edge Config first
    const experiments = await get<Record<string, Experiment>>('experiments')
    if (experiments) return experiments
  } catch {
    // Edge Config not set up or error occurred - use fallback
  }

  // Fallback to hardcoded experiments
  return {
    pricing_page_layout: {
      id: 'pricing_page_layout',
      name: 'Pricing Page Layout Test',
      enabled: true,
      variants: [
        { id: 'control', name: 'Original Layout', weight: 50 },
        { id: 'variant_a', name: 'Simplified Layout', weight: 50 },
      ],
    },
    hero_cta_text: {
      id: 'hero_cta_text',
      name: 'Hero CTA Button Text',
      enabled: true,
      variants: [
        { id: 'control', name: 'Get Started', weight: 33 },
        { id: 'variant_a', name: 'Start Free Trial', weight: 33 },
        { id: 'variant_b', name: 'Book a Demo', weight: 34 },
      ],
    },
  }
}

/**
 * Get user identifier for consistent bucketing
 * Priority: Session ID > IP Address > Random fallback
 */
function getUserId(request: NextRequest): string {
  // Try session cookie first (if you have auth)
  const sessionId = request.cookies.get('session_id')?.value
  if (sessionId) return sessionId

  // Use IP address from headers as fallback
  const ip =
    request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
  if (ip) return ip

  // Final fallback: random ID (not ideal for consistency)
  return Math.random().toString(36).substring(7)
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
