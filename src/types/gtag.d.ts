/**
 * Google Tag Manager / Google Analytics gtag types
 */

interface GtagConsentParams {
  analytics_storage: 'granted' | 'denied'
  ad_storage: 'granted' | 'denied'
  ad_user_data: 'granted' | 'denied'
  ad_personalization: 'granted' | 'denied'
  wait_for_update?: number
}

interface Window {
  dataLayer: unknown[]
  gtag?: (
    command: 'consent' | 'js' | 'config' | 'event',
    action: 'default' | 'update' | Date | string,
    params?: GtagConsentParams | Record<string, unknown>
  ) => void
}
