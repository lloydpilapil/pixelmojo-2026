'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import ChatWindow from './ChatWindow'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)

  // Initialize session when component mounts
  useEffect(() => {
    initializeSession()
  }, [])

  const initializeSession = async () => {
    try {
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
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen
            ? 'bg-muted hover:bg-muted/80'
            : 'bg-primary hover:bg-primary/90'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className='w-6 h-6 text-primary-foreground' />
        ) : (
          <MessageCircle className='w-6 h-6 text-primary-foreground' />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && sessionId && (
        <div className='fixed bottom-24 right-6 z-50 w-full max-w-md h-[600px] animate-in slide-in-from-bottom-5 duration-300'>
          <ChatWindow sessionId={sessionId} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  )
}
