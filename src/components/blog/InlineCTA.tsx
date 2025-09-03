import React from 'react'
import { Button, LinkButton } from '@/components/ui/button'
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
  className
}: InlineCTAProps) {
  const baseStyles = 'my-12 rounded-xl overflow-hidden'
  
  const variantStyles = {
    default: 'bg-muted/50 border border-border p-8',
    gradient: 'bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 p-8',
    minimal: 'bg-card border border-border p-6'
  }

  const PrimaryButtonComponent = primaryButton.href ? LinkButton : Button
  const SecondaryButtonComponent = secondaryButton?.href ? LinkButton : Button

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)}>
      <div className='text-center max-w-2xl mx-auto'>
        {/* Icon for gradient variant */}
        {variant === 'gradient' && (
          <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
            <svg className='w-6 h-6 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
            </svg>
          </div>
        )}

        {/* Content */}
        <h3 className={cn(
          'mb-4',
          variant === 'minimal' ? 'text-lg' : 'text-xl'
        )}>
          {title}
        </h3>
        
        <p className={cn(
          'text-muted-foreground mb-6',
          variant === 'minimal' ? 'text-small' : 'text-base'
        )}>
          {description}
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <PrimaryButtonComponent
            {...(primaryButton.href ? { href: primaryButton.href } : { onClick: primaryButton.onClick })}
            variant='default'
            shape='pill'
            size={variant === 'minimal' ? 'default' : 'lg'}
          >
            {primaryButton.text}
          </PrimaryButtonComponent>
          
          {secondaryButton && (
            <SecondaryButtonComponent
              {...(secondaryButton.href ? { href: secondaryButton.href } : { onClick: secondaryButton.onClick })}
              variant='outline'
              shape='pill'
              size={variant === 'minimal' ? 'default' : 'lg'}
            >
              {secondaryButton.text}
            </SecondaryButtonComponent>
          )}
        </div>
      </div>
    </div>
  )
}

export default InlineCTA