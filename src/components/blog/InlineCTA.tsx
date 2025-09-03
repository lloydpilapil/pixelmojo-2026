import React from 'react'
// import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface InlineCTAProps {
  title: string
  description: string
  primaryButton: {
    text: string
    href?: string
    onClick?: () => void
  }
  secondaryButton?: {
    text: string
    href?: string
    onClick?: () => void
  }
  variant?: 'default' | 'gradient' | 'minimal'
  className?: string
}

export function InlineCTA({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = 'default',
  className,
}: InlineCTAProps) {
  const baseStyles = 'my-8 rounded-xl overflow-hidden'

  const variantStyles = {
    default: 'bg-muted/50 border border-border p-8',
    gradient:
      'bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 p-8',
    minimal: 'bg-card border border-border p-6',
  }

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)}>
      <div className='text-center max-w-2xl mx-auto'>

        {/* Content */}
        <h3
          className={cn('mb-4', variant === 'minimal' ? 'text-lg' : 'text-xl')}
        >
          {title}
        </h3>

        <p
          className={cn(
            'text-muted-foreground mb-6',
            variant === 'minimal' ? 'text-small' : 'text-base'
          )}
        >
          {description}
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          {primaryButton.href ? (
            <a
              href={primaryButton.href}
              className='inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:scale-105 active:scale-95 h-10 px-8 rounded-full'
            >
              {primaryButton.text}
            </a>
          ) : (
            <button
              onClick={primaryButton.onClick}
              className='inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:scale-105 active:scale-95 h-10 px-8 rounded-full'
            >
              {primaryButton.text}
            </button>
          )}

          {secondaryButton && (
            <>
              {secondaryButton.href ? (
                <a
                  href={secondaryButton.href}
                  className='inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95 h-10 px-8 rounded-full'
                >
                  {secondaryButton.text}
                </a>
              ) : (
                <button
                  onClick={secondaryButton.onClick}
                  className='inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95 h-10 px-8 rounded-full'
                >
                  {secondaryButton.text}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default InlineCTA
