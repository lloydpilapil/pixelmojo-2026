'use client'

import { useEffect, useState } from 'react'
import { trackExperiment } from '@/lib/ab-testing'

/**
 * Client-side hook to get A/B test variant
 * Reads from cookie set by middleware
 *
 * @example
 * const variant = useExperiment('pricing_page_layout')
 * return variant === 'variant_a' ? <NewLayout /> : <OldLayout />
 */
export function useExperiment(experimentId: string): string | null {
  const [variant, setVariant] = useState<string | null>(null)
  const [tracked, setTracked] = useState(false)

  useEffect(() => {
    // Read variant from cookie
    const cookies = document.cookie.split(';')
    const variantCookie = cookies.find(c =>
      c.trim().startsWith(`ab_${experimentId}=`)
    )

    if (variantCookie) {
      const value = variantCookie.split('=')[1]
      setVariant(value)

      // Track exposure once
      if (!tracked && value) {
        trackExperiment(experimentId, value)
        setTracked(true)
      }
    }
  }, [experimentId, tracked])

  return variant
}

/**
 * Hook with default variant fallback
 * Returns 'control' if no variant is assigned
 *
 * @example
 * const variant = useExperimentWithDefault('hero_cta_text', 'control')
 * const buttonText = variant === 'variant_a' ? 'Start Free Trial' : 'Get Started'
 */
export function useExperimentWithDefault(
  experimentId: string,
  defaultVariant: string = 'control'
): string {
  const variant = useExperiment(experimentId)
  return variant || defaultVariant
}

/**
 * Hook that returns boolean for simple A/B tests
 * True = variant, False = control
 *
 * @example
 * const showNewDesign = useExperimentBoolean('new_design_test')
 * return showNewDesign ? <NewDesign /> : <OldDesign />
 */
export function useExperimentBoolean(experimentId: string): boolean {
  const variant = useExperiment(experimentId)
  return variant !== null && variant !== 'control'
}
