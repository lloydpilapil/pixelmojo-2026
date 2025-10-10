/**
 * A/B Testing Utilities using Vercel Edge Config
 *
 * How it works:
 * 1. Edge Config stores experiment configurations
 * 2. Middleware assigns users to variants
 * 3. Cookie persists variant assignment
 * 4. Client components read variant from cookie
 */

import { cookies } from 'next/headers'

export interface Experiment {
  id: string
  name: string
  enabled: boolean
  variants: {
    id: string
    name: string
    weight: number // 0-100, should sum to 100
  }[]
}

/**
 * Get user's assigned variant for an experiment
 * Server Components only
 */
export async function getVariant(experimentId: string): Promise<string | null> {
  const cookieStore = await cookies()
  const variantCookie = cookieStore.get(`ab_${experimentId}`)
  return variantCookie?.value || null
}

/**
 * Assign user to a variant based on weights
 * Used by middleware
 */
export function assignVariant(experiment: Experiment): string {
  const random = Math.random() * 100
  let cumulative = 0

  for (const variant of experiment.variants) {
    cumulative += variant.weight
    if (random <= cumulative) {
      return variant.id
    }
  }

  // Fallback to first variant if weights don't add up
  return experiment.variants[0]?.id || 'control'
}

/**
 * Hash function for consistent user assignment
 * Uses user ID or IP address for consistent bucketing
 */
export function hashUser(userId: string, experimentId: string): number {
  let hash = 0
  const str = `${userId}-${experimentId}`

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }

  return Math.abs(hash) % 100
}

/**
 * Assign variant based on consistent hashing
 * Ensures same user always gets same variant
 */
export function assignVariantConsistent(
  experiment: Experiment,
  userId: string
): string {
  const hash = hashUser(userId, experiment.id)
  let cumulative = 0

  for (const variant of experiment.variants) {
    cumulative += variant.weight
    if (hash < cumulative) {
      return variant.id
    }
  }

  return experiment.variants[0]?.id || 'control'
}

/**
 * Track experiment exposure
 * Send to your analytics (GA4, Vercel Analytics, etc.)
 */
export function trackExperiment(experimentId: string, variant: string) {
  if (typeof window === 'undefined') return

  // Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', 'experiment_exposure', {
      experiment_id: experimentId,
      variant_id: variant,
    })
  }

  // Send to Vercel Analytics
  if (window.va) {
    window.va('event', {
      name: 'experiment_exposure',
      data: {
        experiment_id: experimentId,
        variant_id: variant,
      },
    })
  }
}

/**
 * Example experiment configurations
 * In production, these come from Edge Config
 */
export const EXPERIMENTS: Record<string, Experiment> = {
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
  contact_form_fields: {
    id: 'contact_form_fields',
    name: 'Contact Form Field Count',
    enabled: false, // Disabled experiment
    variants: [
      { id: 'control', name: '5 Fields', weight: 50 },
      { id: 'variant_a', name: '3 Fields (Minimal)', weight: 50 },
    ],
  },
}
