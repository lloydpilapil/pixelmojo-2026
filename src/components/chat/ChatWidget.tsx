'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import ChatWindow from './ChatWindow'
import {
  getCurrentContext,
  getTriggerRules,
  detectExitIntent,
  markAsVisited,
  markAsEngaged,
  type ChatContext,
} from '@/lib/chat-context'

/**
 * ChatWidget v2.0 - Progressive Disclosure Pattern
 *
 * Version History:
 * - v2.0 (2025-10-09): Progressive disclosure, time-based visibility, context-aware timing
 * - v1.0 (Previous): Scroll-based visibility
 *
 * Features:
 * - Time-based visibility (no scroll required)
 * - Mobile-first approach (immediate visibility on mobile)
 * - Context-aware timing (faster on high-intent pages)
 * - Progressive disclosure (icon → badge → tooltip)
 * - Pulsing badge notifications
 */
const CHAT_WIDGET_VERSION = '2.0.0'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false)
  const [proactiveTriggered, setProactiveTriggered] = useState(false)
  const [chatContext, setChatContext] = useState<ChatContext | null>(null)

  // Initialize context and session when component mounts
  useEffect(() => {
    // Log version in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[ChatWidget v${CHAT_WIDGET_VERSION}] Initialized`)
    }

    // Get page context
    const context = getCurrentContext()
    setChatContext(context)

    // Mark as visited
    markAsVisited()

    // Initialize session
    initializeSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Track time on page and update context
  useEffect(() => {
    if (!chatContext) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000)

      // Update context with new time
      setChatContext(prev => (prev ? { ...prev, timeOnPage: seconds } : prev))
    }, 1000)

    return () => clearInterval(interval)
  }, [chatContext === null])

  // Track session ID changes
  useEffect(() => {
    if (sessionId) {
    }
  }, [sessionId])

  // Time-based visibility with progressive disclosure
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    // Get current context to determine if high-intent page
    const context = chatContext || getCurrentContext()
    const triggerRules = getTriggerRules(context.pageType)
    const isHighIntent = triggerRules.highIntent || false

    // Mobile: Show immediately (harder to scroll, needs immediate access)
    if (isMobile) {
      setIsVisible(true)
      // Show badge after 3 seconds on mobile
      const badgeTimer = setTimeout(() => setShowBadge(true), 3000)
      return () => clearTimeout(badgeTimer)
    }

    // Desktop high-intent pages (pricing, contact, services): Show after 1 second
    if (isHighIntent) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setShowBadge(true) // Show badge immediately on high-intent
      }, 1000)
      return () => clearTimeout(timer)
    }

    // Desktop low-intent pages (blog, about, home): Show after 2 seconds
    const visibilityTimer = setTimeout(() => setIsVisible(true), 2000)

    // Show pulsing badge after 5 seconds to draw attention
    const badgeTimer = setTimeout(() => setShowBadge(true), 5000)

    return () => {
      clearTimeout(visibilityTimer)
      clearTimeout(badgeTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Run once on mount

  // Context-aware exit intent detection
  useEffect(() => {
    if (!chatContext) return

    const triggerRules = getTriggerRules(chatContext.pageType)

    // Only enable exit intent on certain pages
    if (!triggerRules.enableExitIntent) return

    // Check if exit intent was already shown
    const exitIntentShown = localStorage.getItem('pixelmojo_exit_intent_shown')
    if (exitIntentShown === 'true') return

    // Check if already manually opened chat
    if (isOpen) return

    const cleanup = detectExitIntent(() => {
      setExitIntentTriggered(true)
      setIsOpen(true)
      markAsEngaged()
      localStorage.setItem('pixelmojo_exit_intent_shown', 'true')
    })

    return cleanup
  }, [chatContext, isOpen])

  // Context-aware proactive engagement
  useEffect(() => {
    if (!chatContext) return

    // Check if proactive engagement was already shown
    const proactiveShown = localStorage.getItem('pixelmojo_proactive_shown')
    if (proactiveShown === 'true' || isOpen) return

    // Check if user previously engaged (return visitors)
    if (chatContext.previouslyEngaged) {
      // Don't auto-trigger for return visitors who already engaged
      return
    }

    // Get page-specific trigger rules
    const triggerRules = getTriggerRules(chatContext.pageType)
    const delayMs = triggerRules.delaySeconds * 1000 // Wait for page-specific delay then show proactive message
    const timer = setTimeout(() => {
      if (!isOpen) {
        setProactiveTriggered(true)
        setIsOpen(true)
        markAsEngaged()
        localStorage.setItem('pixelmojo_proactive_shown', 'true')
      }
    }, delayMs)

    return () => clearTimeout(timer)
  }, [chatContext, isOpen])

  // Lock body scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const initializeSession = async () => {
    try {
      // Check if we have an existing session in localStorage
      const existingSessionId = localStorage.getItem(
        'pixelmojo_chat_session_id'
      )

      if (existingSessionId) {
        // Use existing session
        console.log(
          '[ChatWidget] Found existing session in localStorage:',
          existingSessionId
        )
        setSessionId(existingSessionId)
        return
      }

      // Use localStorage as a lock to prevent race conditions from React Strict Mode
      const initLock = localStorage.getItem('pixelmojo_session_initializing')
      if (initLock) {
        const lockTime = parseInt(initLock)
        // If lock is less than 5 seconds old, another initialization is in progress
        if (Date.now() - lockTime < 5000) {
          console.log(
            '[ChatWidget] Session initialization already in progress (locked), waiting...'
          )
          // Wait a bit and check again for the session ID
          setTimeout(() => {
            const sessionId = localStorage.getItem('pixelmojo_chat_session_id')
            if (sessionId) {
              console.log(
                '[ChatWidget] Session created by another process:',
                sessionId
              )
              setSessionId(sessionId)
            }
          }, 100)
          return
        }
      }

      // Set lock
      localStorage.setItem(
        'pixelmojo_session_initializing',
        Date.now().toString()
      )

      // Create new session if none exists
      const response = await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitor_id: getVisitorId(),
          session_metadata: {
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            url: window.location.href,
          },
        }),
      })

      const data = await response.json()
      setSessionId(data.sessionId)

      // Save session ID to localStorage for persistence
      localStorage.setItem('pixelmojo_chat_session_id', data.sessionId)

      // Remove lock
      localStorage.removeItem('pixelmojo_session_initializing')
    } catch (error) {
      console.error('Failed to initialize chat session:', error)
      // Remove lock on error
      localStorage.removeItem('pixelmojo_session_initializing')
    }
  }

  const getVisitorId = () => {
    // Simple visitor ID based on localStorage
    let visitorId = localStorage.getItem('pixelmojo_visitor_id')
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('pixelmojo_visitor_id', visitorId)
    }
    return visitorId
  }

  return (
    <>
      {/* Chat Button - Time-based visibility with progressive disclosure */}
      {isVisible && (
        <div className='fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 group'>
          <button
            onClick={() => {
              setIsOpen(!isOpen)
              setShowBadge(false) // Hide badge when clicked
            }}
            className={`relative p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-in fade-in slide-in-from-bottom-5 ${
              isOpen
                ? 'bg-muted hover:bg-muted/80'
                : 'bg-primary hover:bg-primary/90'
            }`}
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
          >
            {isOpen ? (
              <X className='w-5 h-5 md:w-6 md:h-6 text-primary-foreground' />
            ) : (
              <MessageCircle className='w-5 h-5 md:w-6 md:h-6 text-primary-foreground' />
            )}

            {/* Pulsing badge notification */}
            {!isOpen && showBadge && (
              <>
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-[#FDC304] rounded-full animate-pulse' />
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-[#FDC304] rounded-full animate-ping' />
              </>
            )}
          </button>

          {/* Tooltip hint - shows on hover */}
          {!isOpen && showBadge && (
            <div className='absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none'>
              <p className='text-sm font-medium text-gray-900 dark:text-white'>
                Need help? 👋
              </p>
              <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-white dark:border-l-gray-800' />
            </div>
          )}
        </div>
      )}

      {/* Chat Window */}
      {isOpen && sessionId && chatContext && (
        <div className='fixed inset-x-0 bottom-0 md:inset-auto md:bottom-20 md:right-4 z-50 mx-auto w-full md:max-w-md h-[calc(100vh-80px)] md:h-[600px] md:max-h-[80vh] animate-in slide-in-from-bottom-5 duration-300'>
          <ChatWindow
            sessionId={sessionId}
            onClose={() => setIsOpen(false)}
            exitIntentTriggered={exitIntentTriggered}
            proactiveTriggered={proactiveTriggered}
            chatContext={chatContext}
          />
        </div>
      )}
    </>
  )
}
