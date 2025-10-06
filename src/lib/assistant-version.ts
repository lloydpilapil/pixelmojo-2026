/**
 * PixelMojo AI Assistant Version
 *
 * Version History:
 * - 1.0.0 (2025-10-06) - Initial release
 *   - AI-native service positioning
 *   - Comprehensive pricing transparency (18 packages across 6 services)
 *   - Service knowledge base with deliverables
 *   - Lead capture and qualification
 *   - Rate limiting and session management
 */

export const ASSISTANT_VERSION = '1.0.0'
export const ASSISTANT_NAME = 'PixelMojo Assistant'
export const ASSISTANT_MODEL = 'gpt-4o-mini'
export const ASSISTANT_RELEASE_DATE = '2025-10-06'

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
