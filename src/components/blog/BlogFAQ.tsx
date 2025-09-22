'use client'

import React, { useState } from 'react'
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
            <div
              key={faq.id}
              className='border border-border rounded-lg overflow-hidden bg-card transition-all duration-200'
            >
              {/* Question Button */}
              <button
                onClick={() => setOpenItem(isOpen ? null : faq.id)}
                className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors'
              >
                <span className='font-medium text-base pr-4'>
                  {faq.question}
                </span>
                <svg
                  className={cn(
                    'w-5 h-5 text-muted-foreground transition-transform duration-200',
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

              {/* Answer Content */}
              {isOpen && (
                <div className='px-6 pb-4'>
                  <div className='text-muted-foreground'>{faq.answer}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BlogFAQ
