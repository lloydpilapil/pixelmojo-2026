/**
 * IP Geolocation Service
 * Uses ipapi.co free tier (1,000 requests/day)
 * No API key required for basic usage
 */

export interface GeolocationData {
  ip: string
  country: string | null
  country_code: string | null
  region: string | null
  city: string | null
  timezone: string | null
  latitude: number | null
  longitude: number | null
}

/**
 * Get geolocation data from IP address
 * @param ip - IP address to lookup (optional, uses requester's IP if not provided)
 * @returns Geolocation data or null if lookup fails
 */
export async function getGeolocation(
  ip?: string
): Promise<GeolocationData | null> {
  try {
    // Use ipapi.co - free tier, no API key required
    const url = ip ? `https://ipapi.co/${ip}/json/` : 'https://ipapi.co/json/'

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PixelMojo/1.0',
      },
      // Cache for 1 hour to avoid hitting rate limits
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error('Geolocation API error:', response.status)
      return null
    }

    const data = await response.json()

    // Check if we hit rate limit
    if (data.error) {
      console.error('Geolocation API error:', data.reason)
      return null
    }

    return {
      ip: data.ip || ip || 'unknown',
      country: data.country_name || null,
      country_code: data.country_code || null,
      region: data.region || null,
      city: data.city || null,
      timezone: data.timezone || null,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
    }
  } catch (error) {
    console.error('Failed to fetch geolocation:', error)
    return null
  }
}

/**
 * Get client IP address from Next.js request headers
 * @param headers - Request headers from Next.js
 * @returns IP address or null
 */
export function getClientIP(headers: Headers): string | null {
  // Check common headers for IP address (in order of preference)
  const ipHeaders = [
    'x-real-ip', // Nginx
    'x-forwarded-for', // Standard proxy header
    'cf-connecting-ip', // Cloudflare
    'x-client-ip', // Alternative
    'x-cluster-client-ip', // Rackspace LB
    'forwarded', // RFC 7239
  ]

  for (const header of ipHeaders) {
    const value = headers.get(header)
    if (value) {
      // x-forwarded-for can be a comma-separated list, take the first one
      const ip = value.split(',')[0].trim()
      if (ip) return ip
    }
  }

  return null
}

/**
 * Check if IP is from Philippines
 * @param countryCode - ISO country code
 * @returns true if Philippines
 */
export function isPhilippines(countryCode: string | null): boolean {
  return countryCode?.toLowerCase() === 'ph'
}

/**
 * Get flag emoji from country code
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Flag emoji or empty string
 */
export function getCountryFlag(countryCode: string | null): string {
  if (!countryCode || countryCode.length !== 2) return ''

  // Convert country code to regional indicator symbols
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))

  return String.fromCodePoint(...codePoints)
}

/**
 * Format location display string
 * @param data - Geolocation data
 * @returns Formatted location string (e.g., "Manila, Philippines 🇵🇭")
 */
export function formatLocation(data: GeolocationData | null): string {
  if (!data) return 'Unknown'

  const parts: string[] = []
  if (data.city) parts.push(data.city)
  if (data.country) parts.push(data.country)

  const location = parts.join(', ')
  const flag = getCountryFlag(data.country_code)

  return flag ? `${location} ${flag}` : location
}
