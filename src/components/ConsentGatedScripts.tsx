'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'

/**
 * Consent-Gated Analytics Scripts
 *
 * Only loads GTM (with Clarity) and Vercel Analytics if user has consented.
 * Implements Google Consent Mode v2 for GDPR compliance.
 */
export default function ConsentGatedScripts() {
  const [hasConsent, setHasConsent] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user has previously consented
    const consent = localStorage.getItem('pixelmojo_cookie_consent')
    if (consent === 'true') {
      setHasConsent(true)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {hasConsent && (
        <>
          {/* Google Tag Manager - Only loads if consent is granted */}
          <Script
            id='gtm-script'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-5679MLR7');
              `,
            }}
          />

          {/* Vercel Analytics - Only loads if consent is granted */}
          <Analytics />
        </>
      )}
    </>
  )
}
