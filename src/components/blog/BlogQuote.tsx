import React from 'react'
import { cn } from '@/lib/utils'

interface BlogQuoteProps {
  quote: string
  author?: string
  title?: string
  company?: string
  avatar?: string
  variant?: 'default' | 'highlight' | 'testimonial'
  className?: string
}

export function BlogQuote({
  quote,
  author: _author,
  title: _title,
  company: _company,
  avatar: _avatar,
  variant: _variant = 'default',
  className,
}: BlogQuoteProps) {
  return (
    <div data-blog-layout='narrow' className={cn('my-8', className)}>
      {/* Quote Text - Bigger, Bold, Left Aligned, No Italics */}
      <blockquote className='text-2xl font-bold text-foreground leading-relaxed text-left not-italic'>
        "{quote}"
      </blockquote>
    </div>
  )
}

export default BlogQuote
