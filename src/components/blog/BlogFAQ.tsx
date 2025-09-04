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

function FAQAccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className='border border-border rounded-lg overflow-hidden'>
      <button
        onClick={onToggle}
        className='w-full px-6 py-4 text-left bg-card hover:bg-muted/50 transition-colors flex items-center justify-between group'
      >
        <h3
          className='font-medium group-hover:text-primary transition-colors pr-4'
          style={{ fontSize: '1.125rem' }}
        >
          {faq.question}
        </h3>
        <svg
          className={cn(
            'w-5 h-5 text-muted-foreground transition-transform duration-200',
            isOpen ? 'transform rotate-180' : ''
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

      <div
        className={cn(
          'px-6 bg-card transition-all duration-200 ease-in-out overflow-hidden',
          isOpen ? 'pb-4 opacity-100' : 'pb-0 opacity-0 max-h-0'
        )}
      >
        <div className='prose prose-sm max-w-none text-muted-foreground'>
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

export function BlogFAQ({
  title = 'Frequently Asked Questions',
  faqs,
  className,
}: BlogFAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const expandAll = () => {
    setOpenItems(new Set(faqs.map(faq => faq.id)))
  }

  const collapseAll = () => {
    setOpenItems(new Set())
  }

  const allExpanded = openItems.size === faqs.length

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section className={cn('py-12 border-t border-border', className)}>
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='mb-0'>{title}</h2>
          <button
            onClick={allExpanded ? collapseAll : expandAll}
            className='text-sm text-primary hover:text-primary/80 transition-colors'
            aria-label={
              allExpanded ? 'Collapse all questions' : 'Expand all questions'
            }
          >
            {allExpanded ? 'Collapse all' : 'Expand all'}
          </button>
        </div>
        <p className='text-muted-foreground'>
          Common questions about this topic, answered.
        </p>
      </div>

      <div className='space-y-4'>
        {faqs.map(faq => (
          <FAQAccordionItem
            key={faq.id}
            faq={faq}
            isOpen={openItems.has(faq.id)}
            onToggle={() => toggleItem(faq.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default BlogFAQ
