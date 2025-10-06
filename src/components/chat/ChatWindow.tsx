'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Send,
  Loader2,
  X,
  DollarSign,
  Briefcase,
  Calendar,
  Tag,
} from 'lucide-react'
import Image from 'next/image'
import Message from './Message'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatWindowProps {
  sessionId: string
  onClose: () => void
  exitIntentTriggered?: boolean
  proactiveTriggered?: boolean
}

export default function ChatWindow({
  sessionId,
  onClose,
  exitIntentTriggered = false,
  proactiveTriggered = false,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Store initial trigger values to avoid reloading messages when they change
  const initialTriggersRef = useRef({ proactiveTriggered, exitIntentTriggered })

  // Track component lifecycle
  useEffect(() => {
    console.log('[ChatWindow] Component mounted with sessionId:', sessionId)
    return () => {
      console.log('[ChatWindow] Component unmounting')
    }
  }, [])

  const quickReplies = [
    {
      icon: DollarSign,
      text: 'Need a quote',
      value: 'I need a quote for my project. Can you share the contact form?',
    },
    {
      icon: Briefcase,
      text: 'See portfolio',
      value: 'I want to see your portfolio and recent projects',
    },
    {
      icon: Calendar,
      text: 'Book a call',
      value:
        'I want to book a 30-minute discovery call. Can you share the Calendly link?',
    },
    { icon: Tag, text: 'Pricing info', value: 'Tell me about your pricing' },
  ]

  // Get page-specific proactive message based on current URL
  const getProactiveMessage = () => {
    const path = window.location.pathname

    if (path.includes('/pricing') || path.includes('/contact')) {
      return "👋 Questions about our packages or pricing? I'm here to help!"
    }
    if (path.includes('/projects') || path.includes('/portfolio')) {
      return '👋 Looking for design help? I can point you to relevant examples from our portfolio!'
    }
    if (path.includes('/services')) {
      return '👋 Interested in our services? I can help you find the perfect solution for your needs!'
    }
    if (path.includes('/blog')) {
      return "👋 Have questions about AI-native design? I'm here to help!"
    }

    // Default proactive message
    return '👋 Looking for design help? I can point you to relevant examples and answer any questions!'
  }

  // Load existing messages when session starts
  useEffect(() => {
    console.log(
      '[ChatWindow] loadMessages effect triggered, sessionId:',
      sessionId
    )
    if (sessionId) {
      loadMessages()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = async () => {
    try {
      console.log('[ChatWindow] Loading messages for session:', sessionId)
      const response = await fetch(`/api/chat/messages?sessionId=${sessionId}`)
      const data = await response.json()
      console.log(
        '[ChatWindow] Loaded messages:',
        data.messages?.length || 0,
        'messages'
      )
      if (data.messages && data.messages.length > 0) {
        setMessages(
          data.messages.map((msg: { role: string; content: string }) => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
          }))
        )
        // Hide quick replies if there are existing messages (conversation already started)
        setShowQuickReplies(false)
      } else {
        // No existing messages, show greeting (use initial trigger values)
        let greetingMessage = ''

        if (initialTriggersRef.current.proactiveTriggered) {
          // Proactive engagement with page-specific message
          greetingMessage = `${getProactiveMessage()}\n\nI can help you with:\n\n• AI Product Development – Ship production-ready MVPs\n• Revenue-First Design Systems – Brand assets that drive conversions\n• AI-Powered Growth Engines – Automated revenue streams\n• Profit-Optimized Interfaces – Real-time personalization\n• Conversion Asset Systems – Content that drives action\n• Full-Stack AI Implementation – Revenue-generating features\n\nWhat are you interested in?`
        } else if (initialTriggersRef.current.exitIntentTriggered) {
          // Exit intent message
          greetingMessage =
            'Wait! Before you go, can I help answer any questions?\n\nI can help you with:\n\n• AI Product Development – Ship production-ready MVPs\n• Revenue-First Design Systems – Brand assets that drive conversions\n• AI-Powered Growth Engines – Automated revenue streams\n• Profit-Optimized Interfaces – Real-time personalization\n• Conversion Asset Systems – Content that drives action\n• Full-Stack AI Implementation – Revenue-generating features\n\nWhat would you like to know?'
        } else {
          // Default greeting
          greetingMessage =
            "Hi! Welcome to PixelMojo. I can help you with:\n\n• AI Product Development – Ship production-ready MVPs\n• Revenue-First Design Systems – Brand assets that drive conversions\n• AI-Powered Growth Engines – Automated revenue streams\n• Profit-Optimized Interfaces – Real-time personalization\n• Conversion Asset Systems – Content that drives action\n• Full-Stack AI Implementation – Revenue-generating features\n\nWe're AI-native from day one. What are you looking to build?"
        }

        setMessages([
          {
            role: 'assistant',
            content: greetingMessage,
          },
        ])
        // Show quick replies for new conversations
        setShowQuickReplies(true)
      }
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleQuickReply = (value: string) => {
    setInput(value)
    setShowQuickReplies(false)
    // Trigger send after a brief delay to show the text in input
    setTimeout(() => {
      handleSend(value)
    }, 100)
  }

  const handleSend = async (quickReplyMessage?: string) => {
    const messageToSend = quickReplyMessage || input.trim()
    if (!messageToSend || isLoading || isLimitReached) return

    const userMessage = messageToSend
    setInput('')
    setIsLoading(true)
    setShowQuickReplies(false)

    // Add user message to UI immediately
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
          messages: messages,
        }),
      })

      if (!response.ok) {
        // If session not found (404), clear localStorage and ask user to refresh
        if (response.status === 404) {
          const data = await response.json()
          if (data.error === 'Session not found') {
            console.error('Session expired, clearing localStorage')
            // Clear the expired session ID so refresh creates new session
            localStorage.removeItem('pixelmojo_chat_session_id')
            setMessages(prev => [
              ...prev,
              {
                role: 'assistant',
                content:
                  "I'm sorry, our conversation session has expired. Please refresh the page to continue chatting.",
              },
            ])
            setIsLimitReached(true) // Disable sending new messages until refresh
            return
          }
        }
        console.error('API returned error status:', response.status)
        throw new Error('Failed to send message')
      }

      const data = await response.json()

      // Handle rate limiting errors
      if (response.status === 429) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.message },
        ])

        // If message limit reached, disable input permanently
        if (data.error === 'message_limit_reached') {
          setIsLimitReached(true)
        }
        return
      }

      // Add AI response to UI
      if (data.response) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.response },
        ])
      } else {
        console.error('No response in data:', data)
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Prevent scroll events from propagating to page
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className='flex flex-col h-full bg-card border border-border rounded-lg shadow-2xl overflow-hidden'
      onWheel={handleWheel}
    >
      {/* Header */}
      <div className='bg-primary text-primary-foreground p-3 md:p-4 border-b border-primary/20 flex-shrink-0'>
        <div className='flex items-center justify-between gap-2 md:gap-3'>
          <div className='flex items-center gap-2 md:gap-3'>
            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 bg-white'>
              <Image
                src='/icon-v2.jpg'
                alt='PixelMojo'
                width={40}
                height={40}
                className='w-full h-full object-cover'
              />
            </div>
            <div>
              <h3 className='font-semibold text-sm md:text-base'>
                PixelMojo Assistant
              </h3>
              <p className='text-xs text-primary-foreground/80'>
                Here to help with your design needs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='md:hidden p-1 hover:bg-primary-foreground/10 rounded-full transition-colors'
            aria-label='Close chat'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Messages with custom scrollbar */}
      <div
        className='flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 min-h-0'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background-color: rgba(155, 155, 155, 0.5);
            border-radius: 20px;
            border: transparent;
          }
          div::-webkit-scrollbar-thumb:hover {
            background-color: rgba(155, 155, 155, 0.7);
          }
        `}</style>

        {messages.map((message, index) => (
          <Message key={index} role={message.role} content={message.content} />
        ))}

        {/* Quick Reply Buttons */}
        {showQuickReplies && messages.length === 1 && !isLoading && (
          <div className='flex flex-wrap gap-2 mt-3'>
            {quickReplies.map((reply, index) => {
              const Icon = reply.icon
              return (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply.value)}
                  className='flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full transition-all hover:scale-105 active:scale-95'
                >
                  <Icon className='w-3.5 h-3.5 md:w-4 md:h-4' />
                  {reply.text}
                </button>
              )
            })}
          </div>
        )}

        {isLoading && (
          <div className='flex items-center gap-2 text-muted-foreground text-sm'>
            <Loader2 className='w-4 h-4 animate-spin' />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className='p-4 border-t border-border flex-shrink-0 bg-card'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              isLimitReached ? 'Message limit reached' : 'Type your message...'
            }
            disabled={isLoading || isLimitReached}
            className='flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all'
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim() || isLimitReached}
            className='px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95'
            aria-label='Send message'
          >
            <Send className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>
  )
}
