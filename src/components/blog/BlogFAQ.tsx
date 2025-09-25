'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface FAQItem {
  id: string
  question: string
  answer: string
}

interface BlogFAQProps {
  title?: string
  faqs: FAQItem[]
  className?: string
}

export function BlogFAQ({
  title = 'Frequently Asked Questions',
  faqs,
  className,
}: BlogFAQProps) {
  const [openItem, setOpenItem] = useState<string | null>(null)

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <div data-blog-layout='narrow' className={cn('my-12', className)}>
      {/* Title Section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-2' style={{ margin: 0 }}>
          {title}
        </h2>
        <p
          className='text-muted-foreground'
          style={{ margin: 0, marginTop: '0.5rem' }}
        >
          Common questions about this topic, answered.
        </p>
      </div>

      {/* FAQ Items */}
      <div className='space-y-3'>
        {faqs.map(faq => {
          const isOpen = openItem === faq.id

          return (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={isOpen}
              onToggle={() => setOpenItem(isOpen ? null : faq.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

// Individual FAQ Item with smooth animations
function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<string>('0px')

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px')
    }
  }, [isOpen])

  return (
    <div className='border border-border rounded-lg overflow-hidden bg-card transition-all duration-300 ease-out hover:shadow-sm'>
      {/* Question Button */}
      <button
        onClick={onToggle}
        className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200'
      >
        <span className='font-medium text-base pr-4'>{faq.question}</span>
        <svg
          className={cn(
            'w-5 h-5 text-muted-foreground transition-transform duration-300 ease-out',
            isOpen && 'rotate-180'
          )}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {/* Answer Content with smooth height animation */}
      <div
        style={{
          height,
          overflow: 'hidden',
          transition: 'height 300ms ease-out',
        }}
      >
        <div ref={contentRef} className='px-6 pb-4'>
          <div
            className={cn(
              'text-muted-foreground transition-opacity duration-200',
              isOpen ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              transitionDelay: isOpen ? '150ms' : '0ms',
            }}
          >
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogFAQ
