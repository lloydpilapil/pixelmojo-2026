/**
 * PixelMojo AI Assistant Version
 *
 * Version History:
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

export const ASSISTANT_VERSION = '1.0.0'
export const ASSISTANT_NAME = 'PixelMojo Assistant'
export const ASSISTANT_MODEL = 'gpt-4o-mini'
export const ASSISTANT_RELEASE_DATE = '2025-10-07'

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
