/**
 * PixelMojo AI Assistant Version
 *
 * Version History:
 * - 1.4.0 (2025-10-11) - Page-Aware Intro Messages & Consultative UX
 *   - Replaced menu-driven greetings with consultative, page-aware intros
 *   - Removed services list from greeting for cleaner UX
 *   - Implemented calibrated questions based on page context
 *   - Homepage: Focus on biggest challenge
 *   - About: Ask what made them curious
 *   - Services: Ask about problem to solve
 *   - Portfolio: Ask which project caught their eye
 *   - Blog: Offer to explore topic further
 *   - Pricing: Ask about project type
 *   - Contact: Ask about urgency driver
 *   - Exit intent: Simple, direct question
 *   - Enhanced conversation intelligence with 8 negotiation patterns
 *   - Urgency and budget alignment detection (+10 bonus points each)
 *   - LLM optimization: max_tokens 800, presence_penalty 0.3, frequency_penalty 0.2
 *
 * - 1.3.0 (2025-10-10) - Enhanced Lead Intelligence & Analytics
 *   - Advanced lead scoring (0-100 scale with weighted criteria)
 *   - Email notifications for qualified leads (60+) and high-value alerts (80+)
 *   - Beautiful HTML email templates with lead details
 *   - Analytics dashboard integration for conversion tracking
 *   - Improved lead qualification with budget, timeline, and project type weighting
 *   - Admin dashboard with real-time lead performance metrics
 *
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

export const ASSISTANT_VERSION = '1.4.0'
export const ASSISTANT_NAME = 'PixelMojo Assistant'
export const ASSISTANT_MODEL = 'gpt-4o-mini'
export const ASSISTANT_RELEASE_DATE = '2025-10-11'

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
