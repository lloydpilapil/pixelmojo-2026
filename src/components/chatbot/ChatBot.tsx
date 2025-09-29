'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Pixelmojo's AI assistant. I'm currently being enhanced and will be available soon to help you with questions about our services, projects, and AI product development. Stay tuned! 🚀",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])

  useEffect(() => {
    const handleScroll = () => {
      // Get hero section height (typically the first section after header)
      // Assuming hero is about 100vh or checking if scrolled past 80% of viewport height
      const heroHeight = window.innerHeight * 0.8
      const scrollPosition = window.scrollY

      // Show chatbot after scrolling past hero section
      if (scrollPosition > heroHeight) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        // Also close the chat window if it was open when scrolling back up
        if (isOpen) {
          setIsOpen(false)
        }
      }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)

    // Check initial scroll position
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    }

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Thanks for your message! Our AI assistant is coming soon. For immediate assistance, please contact us at founders@pixelmojo.io or use our contact form.',
      sender: 'bot',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage, botMessage])
    setMessage('')
  }

  return (
    <>
      {/* Chat Toggle Button - Only visible after scrolling past hero */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/20 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-primary hover:bg-primary/90'
        } ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className='w-6 h-6 text-white mx-auto' />
        ) : (
          <MessageCircle className='w-6 h-6 text-white mx-auto' />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-primary rounded-t-lg'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
              <Bot className='w-5 h-5 text-white' />
            </div>
            <div>
              <h3 className='font-semibold text-white text-sm'>Pixelmojo AI</h3>
              <p className='text-white/80 text-xs'>Coming Soon</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className='text-white/80 hover:text-white transition-colors'
            aria-label='Close chat'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Messages */}
        <div className='h-80 overflow-y-auto p-4 space-y-4'>
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-2 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Bot className='w-4 h-4 text-primary' />
                </div>
              )}
              <div
                className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-br-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'
                }`}
              >
                {msg.text}
                <div
                  className={`text-xs mt-1 opacity-60 ${
                    msg.sender === 'user' ? 'text-white/60' : 'text-gray-500'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              {msg.sender === 'user' && (
                <div className='w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0'>
                  <User className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSendMessage}
          className='p-4 border-t border-gray-200 dark:border-gray-700'
        >
          <div className='flex gap-2'>
            <input
              type='text'
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder='Type your message...'
              className='flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-800 dark:text-white text-sm'
              disabled
            />
            <button
              type='submit'
              disabled
              className='px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed'
              aria-label='Send message'
            >
              <Send className='w-4 h-4' />
            </button>
          </div>
          <p className='text-xs text-gray-500 dark:text-gray-400 mt-2 text-center'>
            AI Assistant launching soon! Contact us for immediate help.
          </p>
        </form>
      </div>
    </>
  )
}
