'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface ConsentContextType {
  hasConsent: boolean
  setConsent: (consent: boolean) => void
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

export function ConsentProvider({ children }: { children: React.ReactNode }) {
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

  const setConsent = (consent: boolean) => {
    setHasConsent(consent)
    localStorage.setItem('pixelmojo_cookie_consent', consent.toString())

    // Update Google Consent Mode
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: consent ? 'granted' : 'denied',
        ad_storage: consent ? 'granted' : 'denied',
        ad_user_data: consent ? 'granted' : 'denied',
        ad_personalization: consent ? 'granted' : 'denied',
      })
    }
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ConsentContext.Provider value={{ hasConsent, setConsent }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const context = useContext(ConsentContext)
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider')
  }
  return context
}
