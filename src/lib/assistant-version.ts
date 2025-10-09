/**
 * PixelMojo AI Assistant Version
 *
 * Version History:
 * - 1.2.0 (2025-10-09) - Context-Aware Chat Triggers & IP Geolocation
 *   - Phase 1: Context-aware proactive chat triggers
 *   - Page-specific trigger timing (contact=5s, pricing=15s, home=30s, etc.)
 *   - Context-aware greetings per page type (home, services, portfolio, blog, etc.)
 *   - Service/project/blog topic extraction from URLs
 *   - Exit intent detection (page-specific)
 *   - Return visitor detection (no auto-trigger if previously engaged)
 *   - Time-on-page tracking
 *   - Page context passed to AI (pageType, serviceName, projectName, blogTopic)
 *   - IP-based geolocation tracking (country, city, region, timezone)
 *   - Graceful fallback when geolocation unavailable
 *   - Admin location display with flags (e.g., "Manila, Philippines 🇵🇭")
 *
 * - 1.1.0 (2025-10-07) - Consultative Approach Update
 *   - Added high-level strategic guidance vs detailed execution
 *   - Curiosity gap technique (show value, not complete implementation)
 *   - Auto-redirect "how to" questions to Calendly/contact form
 *   - IP protection (doesn't give away full strategies)
 *   - Lead qualification through booking redirects
 *
 * - 1.0.0 (2025-10-07) - Major release with Dan Ariely + Chris Voss principles
 *   - Dan Ariely's 3-tier pricing psychology (Starter/Growth/Scale)
 *   - Chris Voss's "Never Split the Difference" negotiation framework
 *   - Tactical empathy, calibrated questions, and accusation audit
 *   - Loss aversion framing and "That's right" moments
 *   - Markdown formatting support (bold, italic, code, links)
 *   - Dynamic pricing from services-knowledge.json (single source of truth)
 *   - Philippine startup discount automation (15-20% off)
 *   - Comprehensive service knowledge with value framing
 *   - Lead capture and qualification
 *   - Rate limiting and session management
 */

export const ASSISTANT_VERSION = '1.2.0'
export const ASSISTANT_NAME = 'PixelMojo Assistant'
export const ASSISTANT_MODEL = 'gpt-4o-mini'
export const ASSISTANT_RELEASE_DATE = '2025-10-09'

export interface AssistantInfo {
  version: string
  name: string
  model: string
  releaseDate: string
}

export function getAssistantInfo(): AssistantInfo {
  return {
    version: ASSISTANT_VERSION,
    name: ASSISTANT_NAME,
    model: ASSISTANT_MODEL,
    releaseDate: ASSISTANT_RELEASE_DATE,
  }
}

export function getAssistantDisplayName(): string {
  return `${ASSISTANT_NAME} v${ASSISTANT_VERSION}`
}
