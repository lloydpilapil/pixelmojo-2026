'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BlogCTAProps {
  title?: string
  description?: string
  buttonText?: string
  className?: string
  variant?: 'newsletter' | 'contact' | 'custom'
}

export function BlogCTA({ 
  title = "Stay Updated", 
  description = "Get the latest insights and tips delivered to your inbox.",
  buttonText = "Subscribe",
  className,
  variant = 'newsletter'
}: BlogCTAProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
    setEmail('')
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  if (isSubmitted) {
    return (
      <div className={cn('bg-primary/5 border border-primary/20 rounded-lg p-6', className)}>
        <div className='text-center'>
          <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-6 h-6 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
          </div>
          <h4 className='font-semibold mb-2'>Thank you!</h4>
          <p className='text-small text-muted-foreground'>You'll hear from us soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('bg-muted/50 border border-border rounded-lg overflow-hidden w-full', className)}>
      {/* Full Width Image Placeholder - 3:2 Aspect Ratio */}
      <div className='w-full aspect-[3/2] border-b border-border overflow-hidden'>
        <img
          src="/placeholder.svg"
          alt="Newsletter placeholder"
          className='w-full h-full object-cover'
        />
      </div>
      
      <div className='p-6'>
        <div className='text-center mb-6'>
          <h4 className='font-semibold mb-3'>{title}</h4>
          <p className='text-small text-muted-foreground'>{description}</p>
        </div>

      {variant === 'newsletter' && (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm'
            />
          </div>
          <Button
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
            variant='default'
            shape='pill'
            className='w-full'
          >
            {buttonText}
          </Button>
        </form>
      )}

        {variant === 'contact' && (
          <div className='text-center'>
            <Button
              variant='default'
              shape='pill'
              className='w-full'
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogCTA