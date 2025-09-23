import type { ComponentProps, ReactNode } from 'react'

import { LinkButton } from '@/components/ui/button'

type LinkButtonVariant = ComponentProps<typeof LinkButton>['variant']

interface HeroProofPoint {
  label: string
  value: string
}

interface HeroSecondaryCta {
  text: string
  href: string
  variant?: LinkButtonVariant
}

interface HeroProps {
  title: ReactNode
  description: string
  ctaText: string
  ctaHref: string
  className?: string
  secondaryCta?: HeroSecondaryCta
  proofPoints?: HeroProofPoint[]
}

export default function Hero({
  title,
  description,
  ctaText,
  ctaHref,
  className = '',
  secondaryCta,
  proofPoints = [],
}: HeroProps) {
  return (
    <section className={`text-center mb-40 mt-16 md:mt-24 ${className}`}>
      <div className='text-center'>
        <h1 className='hero-title max-w-6xl mx-auto mb-10 md:mb-12'>{title}</h1>
      </div>
      <p className='lead max-w-3xl mx-auto mb-10 md:mb-12'>{description}</p>
      <div className='flex flex-col sm:flex-row gap-4 justify-center mt-12'>
        <LinkButton href={ctaHref} variant='default' shape='pill' size='lg'>
          {ctaText}
        </LinkButton>
        {secondaryCta && (
          <LinkButton
            href={secondaryCta.href}
            variant={secondaryCta.variant ?? 'outline'}
            shape='pill'
            size='lg'
          >
            {secondaryCta.text}
          </LinkButton>
        )}
      </div>
      {proofPoints.length > 0 && (
        <dl className='mt-14 grid gap-6 text-left sm:grid-cols-3 max-w-5xl mx-auto'>
          {proofPoints.map(point => (
            <div
              key={`${point.label}-${point.value}`}
              className='rounded-2xl bg-card/70 px-6 py-5 shadow-sm border border-border/60 backdrop-blur-sm'
            >
              <dd className='text-2xl font-semibold text-foreground'>
                {point.value}
              </dd>
              <dt className='mt-2 text-sm uppercase tracking-wide text-muted-foreground'>
                {point.label}
              </dt>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}
