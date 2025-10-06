'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import ChatWindow from './ChatWindow'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Initialize session when component mounts
  useEffect(() => {
    initializeSession()
  }, [])

  // Show chat button after scrolling past hero section
  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling ~100vh (hero section height)
      const scrolled = window.scrollY > window.innerHeight * 0.8
      setIsVisible(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        setSessionId(existingSessionId)
        return
      }

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
    } catch (error) {
      console.error('Failed to initialize chat session:', error)
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
      {/* Chat Button - Only visible after scrolling past hero */}
      {isVisible && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-in fade-in slide-in-from-bottom-5 ${
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
        </button>
      )}

      {/* Chat Window */}
      {isOpen && sessionId && (
        <div className='fixed inset-x-0 bottom-0 md:inset-auto md:bottom-20 md:right-4 z-50 mx-auto w-full md:max-w-md h-[calc(100vh-80px)] md:h-[600px] md:max-h-[80vh] animate-in slide-in-from-bottom-5 duration-300'>
          <ChatWindow sessionId={sessionId} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  )
}
