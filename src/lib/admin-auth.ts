/**
 * Admin Authentication Utility
 *
 * TODO: Replace with proper session-based authentication
 * Currently uses Basic Auth for simplicity
 */

// WARNING: This is client-side code - the password is NOT secure
// For production, implement server-side session authentication
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'change-me'

/**
 * Get Authorization header for admin API requests
 */
export function getAdminAuthHeader(): string {
  return `Basic ${btoa(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`)}`
}
