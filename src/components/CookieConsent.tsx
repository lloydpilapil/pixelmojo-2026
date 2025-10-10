'use client'

import { useEffect, useState } from 'react'
import CookieConsentLib from 'react-cookie-consent'
import Link from 'next/link'

/**
 * GDPR/CCPA Compliant Cookie Consent Banner
 *
 * Features:
 * - Appears on first visit
 * - Remembers user choice (localStorage)
 * - Links to Privacy Policy
 * - Controls GTM, Clarity, and Vercel Analytics
 * - Implements Google Consent Mode v2
 */
export default function CookieConsent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent SSR issues
  if (!mounted) return null

  const handleAccept = () => {
    localStorage.setItem('pixelmojo_cookie_consent', 'true')

    // Update Google Consent Mode
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })
    }

    // Reload to initialize GTM and analytics
    window.location.reload()
  }

  const handleDecline = () => {
    localStorage.setItem('pixelmojo_cookie_consent', 'false')
  }

  return (
    <CookieConsentLib
      location='bottom'
      buttonText='Accept All Cookies'
      declineButtonText='Decline Optional'
      enableDeclineButton
      cookieName='pixelmojo_cookie_consent'
      style={{
        background: 'rgba(17, 24, 39, 0.98)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '20px',
        alignItems: 'center',
        fontSize: '14px',
        zIndex: 9999,
      }}
      buttonStyle={{
        background: 'var(--primary)',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        padding: '10px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px',
        fontWeight: '500',
        padding: '10px 24px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        cursor: 'pointer',
        marginRight: '12px',
        transition: 'all 0.2s',
      }}
      expires={365} // Cookie expires after 1 year
      onAccept={handleAccept}
      onDecline={handleDecline}
    >
      <div className='flex flex-col md:flex-row items-start md:items-center gap-3'>
        <div className='flex-1'>
          <p className='text-white/90 mb-1'>
            <strong>We value your privacy</strong>
          </p>
          <p className='text-white/70 text-sm'>
            We use cookies to enhance your browsing experience, analyze site
            traffic, and personalize content. By clicking "Accept All Cookies",
            you consent to our use of cookies.{' '}
            <Link
              href='/privacy-policy'
              className='text-[var(--secondary)] hover:underline'
            >
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </CookieConsentLib>
  )
}
