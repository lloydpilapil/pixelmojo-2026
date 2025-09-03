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
  author,
  title,
  company,
  avatar,
  variant = 'default',
  className
}: BlogQuoteProps) {
  const baseStyles = 'my-8 rounded-lg overflow-hidden'
  
  const variantStyles = {
    default: 'bg-muted border-l-4 border-l-primary p-6',
    highlight: 'bg-primary/5 border border-primary/20 p-6',
    testimonial: 'bg-card border border-border p-8'
  }

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)}>
      {/* Quote Icon for highlight and testimonial variants */}
      {(variant === 'highlight' || variant === 'testimonial') && (
        <div className='flex justify-center mb-4'>
          <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'>
            <svg className='w-4 h-4 text-primary' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z' />
            </svg>
          </div>
        </div>
      )}

      {/* Quote Text */}
      <blockquote className={cn(
        'text-foreground leading-relaxed',
        variant === 'default' && 'italic',
        variant === 'highlight' && 'text-lg font-medium',
        variant === 'testimonial' && 'text-lg text-center'
      )}>
        "{quote}"
      </blockquote>

      {/* Author Information */}
      {(author || title || company) && (
        <footer className={cn(
          'mt-4 pt-4',
          variant === 'testimonial' && 'border-t border-border flex items-center justify-center gap-4'
        )}>
          {variant === 'testimonial' && avatar && (
            <div className='w-10 h-10 bg-muted rounded-full overflow-hidden flex-shrink-0'>
              <img
                src={avatar}
                alt={author || 'Author'}
                className='w-full h-full object-cover'
              />
            </div>
          )}
          
          <div className={variant === 'testimonial' ? 'text-center' : ''}>
            {author && (
              <cite className='not-italic font-semibold text-foreground'>
                — {author}
              </cite>
            )}
            {(title || company) && (
              <p className='text-small text-muted-foreground mt-1'>
                {title}
                {title && company && ', '}
                {company}
              </p>
            )}
          </div>
        </footer>
      )}
    </div>
  )
}

export default BlogQuote