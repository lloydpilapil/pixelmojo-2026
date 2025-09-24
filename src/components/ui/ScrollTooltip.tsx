'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ScrollTooltipProps {
  children: React.ReactNode
  content: string
  scrollThreshold?: number
  autoDismissDelay?: number
  storageKey?: string
}

export function ScrollTooltip({
  children,
  content,
  scrollThreshold = 200,
  autoDismissDelay = 5000,
  storageKey = 'theme-tooltip-seen',
}: ScrollTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const dismissTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasShownRef = useRef(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      // Check if already shown this session or if user has seen it before
      if (hasShownRef.current) return

      const hasSeenTooltip = localStorage.getItem(storageKey)
      if (hasSeenTooltip) {
        hasShownRef.current = true
        return
      }

      // Show tooltip when user scrolls past threshold
      if (window.scrollY > scrollThreshold && !isVisible) {
        updatePosition()
        setIsVisible(true)
        hasShownRef.current = true

        // Mark as seen in localStorage
        localStorage.setItem(storageKey, 'true')

        // Auto dismiss after delay
        if (autoDismissDelay > 0) {
          dismissTimeoutRef.current = setTimeout(() => {
            setIsVisible(false)
          }, autoDismissDelay)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      setMounted(false)
      window.removeEventListener('scroll', handleScroll)
      if (dismissTimeoutRef.current) {
        clearTimeout(dismissTimeoutRef.current)
      }
    }
  }, [scrollThreshold, autoDismissDelay, storageKey, isVisible])

  const updatePosition = () => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const tooltipOffset = 8

    // Position below the trigger element
    const top = rect.bottom + tooltipOffset
    const left = rect.left + rect.width / 2

    setCoords({ top, left })
  }

  const handleDismiss = () => {
    setIsVisible(false)
    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current)
    }
  }

  // Check if on desktop (>= 768px)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  if (!isDesktop) {
    return <div ref={triggerRef}>{children}</div>
  }

  return (
    <>
      <div ref={triggerRef} onClick={handleDismiss} className='inline-flex'>
        {children}
      </div>
      {mounted &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              transform: `translateX(-50%) ${isVisible ? 'translateY(0)' : 'translateY(-10px)'}`,
              opacity: isVisible ? 1 : 0,
              transition:
                'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
              zIndex: 9999,
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
            className='px-4 py-2 text-sm font-medium rounded-md bg-growth text-white shadow-lg'
            role='tooltip'
            onClick={handleDismiss}
          >
            {content}
            <div className='absolute w-2 h-2 bg-growth transform rotate-45 top-[-4px] left-1/2 -translate-x-1/2' />
          </div>,
          document.body
        )}
    </>
  )
}
