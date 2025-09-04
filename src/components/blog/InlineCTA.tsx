import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface InlineCTAProps {
  title: string
  description: string
  subtitle?: string
  primaryButton: {
    text: string
    onClick?: () => void
  }
  variant?: 'default' | 'image' | 'gradient' | 'minimal'
  backgroundImage?: string
  className?: string
  alignment?: 'left' | 'center' | 'right'
}

export function InlineCTA({
  title,
  description,
  subtitle,
  primaryButton,
  variant = 'image',
  backgroundImage = '/placeholder.svg',
  className,
  alignment = 'left',
}: InlineCTAProps) {
  const baseStyles = 'my-8 rounded-2xl overflow-hidden relative'

  const variantStyles = {
    default: 'bg-muted/50 border border-border',
    image: 'min-h-[400px] md:min-h-[500px] relative',
    gradient:
      'bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border border-primary/20',
    minimal: 'bg-card border border-border',
  }

  const alignmentStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  const contentPadding = variant === 'minimal' ? 'p-6' : 'p-8 md:p-12 lg:p-16'

  if (variant === 'image') {
    return (
      <div className={cn(baseStyles, variantStyles[variant], className)}>
        {/* Background Image */}
        <div className='absolute inset-0 z-0'>
          <img
            src={backgroundImage}
            alt=''
            className='w-full h-full object-cover'
          />
          {/* Gradient Overlay for better text readability */}
          <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent' />
          {/* Additional dark overlay for better contrast */}
          <div className='absolute inset-0 bg-black/40' />
        </div>

        {/* Content */}
        <div
          className={cn(
            'relative z-10 h-full min-h-[400px] md:min-h-[500px] flex flex-col justify-center',
            contentPadding
          )}
        >
          <div
            className={cn(
              'max-w-3xl',
              alignment === 'center'
                ? 'mx-auto'
                : alignment === 'right'
                  ? 'ml-auto'
                  : ''
            )}
          >
            {/* Title */}
            <h2 className='text-white font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight'>
              {title}
            </h2>

            {/* Subtitle (for stats like "82% of teams...") */}
            {subtitle && (
              <p className='text-white/90 text-lg md:text-xl lg:text-2xl font-medium mb-8 leading-relaxed'>
                {subtitle}
              </p>
            )}

            {/* Description */}
            <p className='text-white/80 text-base md:text-lg lg:text-xl mb-10 leading-relaxed max-w-2xl'>
              {description}
            </p>

            {/* Button */}
            <Button
              onClick={primaryButton.onClick}
              variant='default'
              size='lg'
              className='rounded-full text-white'
            >
              {primaryButton.text}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Default non-image variants
  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        contentPadding,
        className
      )}
    >
      <div
        className={cn(
          'max-w-2xl',
          alignmentStyles[alignment],
          alignment === 'center' ? 'mx-auto' : ''
        )}
      >
        {/* Title */}
        <h3
          className={cn(
            'mb-4 font-bold',
            variant === 'minimal' ? 'text-xl' : 'text-2xl md:text-3xl'
          )}
          style={{
            fontFamily: 'var(--font-heading)',
            color: '#ffffff !important',
          }}
        >
          {title}
        </h3>

        {/* Subtitle if provided */}
        {subtitle && (
          <p
            className='text-lg mb-4'
            style={{
              fontFamily: 'var(--font-sans)',
              color: '#ffffff !important',
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Description */}
        <p
          className={cn(
            'mb-6',
            variant === 'minimal' ? 'text-sm' : 'text-base md:text-lg'
          )}
          style={{
            fontFamily: 'var(--font-sans)',
            color: '#ffffff !important',
          }}
        >
          {description}
        </p>

        {/* Button */}
        <div
          className={cn(
            'flex',
            alignment === 'center'
              ? 'justify-center'
              : alignment === 'right'
                ? 'justify-end'
                : 'justify-start'
          )}
        >
          <Button
            onClick={primaryButton.onClick}
            variant='default'
            size='lg'
            className='rounded-full'
          >
            {primaryButton.text}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Example usage variations
export function InlineCTAExamples() {
  return (
    <div className='space-y-8'>
      {/* Image Background Version (like your reference) */}
      <InlineCTA
        variant='image'
        title='The creative partner of the future'
        subtitle="82% of in-house teams can't keep up with creative requests. 100% have found relief with Superside."
        description='With AI-powered workflows, certified creatives and 5x faster turnaround times, your enterprise teams can be next.'
        primaryButton={{
          text: "Let's chat",
          onClick: () => console.log('CTA clicked'),
        }}
        backgroundImage='/placeholder.svg'
        alignment='left'
      />

      {/* Default Version */}
      <InlineCTA
        variant='default'
        title='Ready to transform your workflow?'
        description='Join thousands of teams already using our platform to accelerate their creative output.'
        primaryButton={{
          text: 'Get Started',
          onClick: () => console.log('CTA clicked'),
        }}
        alignment='center'
      />

      {/* Gradient Version */}
      <InlineCTA
        variant='gradient'
        title='Unlock Premium Features'
        subtitle='Take your projects to the next level'
        description='Get access to advanced tools, priority support, and unlimited possibilities.'
        primaryButton={{
          text: 'Upgrade Now',
          onClick: () => console.log('CTA clicked'),
        }}
        alignment='center'
      />

      {/* Minimal Version */}
      <InlineCTA
        variant='minimal'
        title='Need help?'
        description='Our support team is here to assist you 24/7.'
        primaryButton={{
          text: 'Contact Support',
          onClick: () => console.log('CTA clicked'),
        }}
        alignment='left'
      />
    </div>
  )
}

export default InlineCTA
