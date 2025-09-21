'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BlogCTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  className?: string
}

export function BlogCTA({
  title = 'Ready to Ship Your AI Product?',
  description = 'Stop building features nobody wants. Start shipping products people pay for.',
  buttonText = 'Get Started',
  buttonHref = '/contact',
  className,
}: BlogCTAProps) {
  return (
    <div
      className={cn(
        'bg-card/70 border border-border/60 rounded-2xl overflow-hidden w-full',
        className
      )}
    >
      {/* Full Width Image - 3:2 Aspect Ratio */}
      <div className='w-full aspect-[3/2] border-b border-border/60 overflow-hidden'>
        <img
          src='/why-your-design-image.webp'
          srcSet='/why-your-design-image.webp 1x, /why-your-design-image@2x.webp 2x'
          alt='AI Product Development'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='p-6'>
        <div className='text-center mb-6'>
          <h4 className='font-semibold mb-3'>{title}</h4>
          <p className='text-small text-muted-foreground'>{description}</p>
        </div>

        <div className='text-center'>
          <Button asChild variant='default' shape='pill' className='w-full'>
            <a href={buttonHref}>{buttonText}</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BlogCTA
