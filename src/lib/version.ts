/**
 * Version Configuration
 * Update this file when releasing new features
 */

export const VERSION = {
  // Semantic versioning: MAJOR.MINOR.PATCH
  major: 1,
  minor: 3,
  patch: 0,

  // Get formatted version string
  get full() {
    return `v${this.major}.${this.minor}.${this.patch}`
  },

  // Release name (optional)
  name: 'Conversions',

  // Release date
  date: '2025-10-06',

  // Build environment
  environment: process.env.NODE_ENV || 'development',
} as const

// Get just the version number
export function getVersion(): string {
  return VERSION.full
}

// Get version with release name
export function getVersionWithName(): string {
  return `${VERSION.full}${VERSION.name ? ` (${VERSION.name})` : ''}`
}

// Get full version info
export function getVersionInfo() {
  return {
    version: VERSION.full,
    name: VERSION.name,
    date: VERSION.date,
    environment: VERSION.environment,
  }
}

/**
 * Version History
 *
 * v1.3.0 (Conversions) - 2025-10-06
 * - AI-powered chatbot with OpenAI integration
 * - Admin dashboard for chat conversations
 * - Lead qualification and tracking system
 * - Exit intent and proactive engagement triggers
 * - Session persistence with localStorage
 * - Rate limiting and message count tracking
 *
 * v1.2.0 (Search) - 2025-01-04
 * - Added client-side search with Fuse.js
 * - Search modal with keyboard shortcuts (⌘K)
 * - Index blogs, projects, services, and pages
 * - Fuzzy search with 20 result limit
 *
 * v1.1.0 (Monitoring) - 2025-10-03
 * - Integrated Sentry error monitoring
 * - Enhanced error tracking and performance monitoring
 *
 * v1.0.0 (Launch) - 2025
 * - Initial website launch
 * - Blog system with Contentlayer
 * - Project portfolio
 * - Service pages
 */
