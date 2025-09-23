import { get } from '@vercel/edge-config'

// Type definitions for Edge Config data
export interface EdgeConfigData {
  // Feature flags
  'maintenance-mode': boolean
  'ai-feature-enabled': boolean
  'new-pricing-enabled': boolean
  'contact-form-enabled': boolean

  // Dynamic content
  'featured-services': string[]
  'hero-variant': 'default' | 'ai-focused' | 'results-focused'
  'testimonial-rotation': string[]
  'special-offer-banner': {
    enabled: boolean
    message: string
    link?: string
  }

  // Business settings
  'contact-response-time': string
  'current-availability': 'available' | 'booking-fast' | 'waitlist'
  'emergency-message': {
    enabled: boolean
    message: string
    type: 'info' | 'warning' | 'success'
  }
}

// Utility function to get Edge Config value with fallback
export async function getEdgeConfig<K extends keyof EdgeConfigData>(
  key: K,
  fallback: EdgeConfigData[K]
): Promise<EdgeConfigData[K]> {
  try {
    const value = await get<EdgeConfigData[K]>(key)
    return value ?? fallback
  } catch (error) {
    console.warn(`Edge Config error for key "${key}":`, error)
    return fallback
  }
}

// Specific helper functions for common use cases
export async function isFeatureEnabled(
  feature: keyof Pick<
    EdgeConfigData,
    | 'maintenance-mode'
    | 'ai-feature-enabled'
    | 'new-pricing-enabled'
    | 'contact-form-enabled'
  >
): Promise<boolean> {
  return getEdgeConfig(feature, false)
}

export async function getHeroVariant(): Promise<
  EdgeConfigData['hero-variant']
> {
  return getEdgeConfig('hero-variant', 'default')
}

export async function getFeaturedServices(): Promise<string[]> {
  return getEdgeConfig('featured-services', [
    'AI Product Development',
    'Revenue-First Design Systems',
    'Profit-Optimized Interfaces',
  ])
}

export async function getCurrentAvailability(): Promise<
  EdgeConfigData['current-availability']
> {
  return getEdgeConfig('current-availability', 'available')
}

export async function getSpecialOfferBanner() {
  return getEdgeConfig('special-offer-banner', {
    enabled: false,
    message: '',
  })
}

export async function getEmergencyMessage() {
  return getEdgeConfig('emergency-message', {
    enabled: false,
    message: '',
    type: 'info' as const,
  })
}

// Batch function to get multiple configs at once
export async function getBatchConfig<K extends keyof EdgeConfigData>(
  keys: K[]
): Promise<Partial<Pick<EdgeConfigData, K>>> {
  const results: Partial<Pick<EdgeConfigData, K>> = {}

  await Promise.all(
    keys.map(async key => {
      try {
        const value = await get<EdgeConfigData[K]>(key)
        if (value !== undefined) {
          results[key] = value
        }
      } catch (error) {
        console.warn(`Edge Config batch error for key "${key}":`, error)
      }
    })
  )

  return results
}
