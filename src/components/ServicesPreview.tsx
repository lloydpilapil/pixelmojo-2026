'use client'

import React from 'react'
import Image from 'next/image'
import { LinkButtonWithArrow } from '@/components/ui/button'
import { getServiceTheme } from '@/utils/serviceThemes'
import {
  LenisFadeIn,
  LenisStaggered,
} from '@/components/animations/LenisReveal'

interface ServiceItem {
  title: string
  description: string
  icon: string
  href: string
  gradient: string
  outcome: string
  startingAt?: string
  featured?: boolean
}

interface ServicesPreviewProps {
  title?: string
  services?: ServiceItem[]
}

const ServicesPreview = ({
  title = 'AI-Native Services That Deliver Results',
  services = [
    {
      title: 'AI Product Development',
      description:
        'What others call "UI/UX Design" — we call AI Product Development. Claude Sonnet + GPT-4o co-pilot every sprint so the system learns from each interaction and self-optimizes.',
      icon: '/pixelmojo-services-ai-product-development-thumb.webp',
      href: '/services/ai-product-development',
      gradient: '',
      outcome: 'LangChain telemetry bakes growth metrics in before launch.',
      startingAt: 'From $15K',
      featured: true,
    },
    {
      title: 'Revenue-First Design Systems',
      description:
        'Traditional "Brand Identity" becomes Revenue-First Design Systems — Figma token bots, Midjourney assets, and performance data working in sync.',
      icon: '/pixelmojo-services-revenue-first-design-thumb.webp',
      href: '/services/revenue-first-design',
      gradient: '',
      outcome: 'Deploy brand assets that trigger measurable conversion lift.',
      startingAt: 'Starts at $9K',
    },
    {
      title: 'AI-Powered Growth Engines',
      description:
        'Beyond "Marketing" — AI-Powered Growth Engines with GPT-4o copy orchestration, HubSpot scoring, and Pinecone intent data for maximum ROI.',
      icon: '/pixelmojo-services-ai-powered-growth-thumb.webp',
      href: '/services/ai-powered-growth',
      gradient: '',
      outcome:
        'Turn on revenue streams that compound without manual intervention.',
      startingAt: 'Retainers from $6K/mo',
    },
    {
      title: 'Profit-Optimized Interfaces',
      description:
        'Web & App Design evolved into Profit-Optimized Interfaces — predictive personalization and experimentation that adapt in real-time to maximize revenue per user.',
      icon: '/pixelmojo-services-profit-optimized-interfaces-thumb.webp',
      href: '/services/profit-optimized-interfaces',
      gradient: '',
      outcome: 'Ship interfaces that increase ARPU measurably within 30 days.',
      startingAt: 'Project scopes from $22K',
    },
    {
      title: 'Conversion Asset Systems',
      description:
        'Graphics & Visuals become Conversion Asset Systems — Jasper, Gamma, and Synthesia pipelines turning behavioral science into assets that drive action.',
      icon: '/pixelmojo-services-conversion-assets-thumb.webp',
      href: '/services/conversion-assets',
      gradient: '',
      outcome:
        'Deploy assets with proven impact on close rates and deal velocity.',
      startingAt: 'Bundles from $4K',
    },
    {
      title: 'Full-Stack AI Implementation',
      description:
        'Development Solutions transformed into Full-Stack AI Implementation — Bedrock, LangChain, and Dagster orchestration with intelligence baked in from day one.',
      icon: '/pixelmojo-services-footer-image-thumb.webp',
      href: '/services/full-stack-ai',
      gradient: '',
      outcome: 'Release revenue-generating features that pay for themselves.',
      startingAt: 'Embedded teams from $12K/mo',
    },
  ],
}: ServicesPreviewProps) => {
  if (!services || services.length === 0) {
    return null
  }

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <LenisFadeIn className='mb-16 text-center'>
          <h2 className='mb-6'>{title}</h2>
          <p className='text-muted mx-auto max-w-3xl text-lg leading-relaxed'>
            We didn't rebrand traditional services — we rebuilt them as
            AI-native systems. Every offering starts with intelligence, learns
            from data, and optimizes automatically.{' '}
            <span className='text-primary font-medium'>
              Smarter systems. Better outcomes.
            </span>
          </p>
        </LenisFadeIn>

        {/* Services Grid */}
        <LenisStaggered
          staggerDelay={150}
          className='mx-auto mb-12 grid max-w-6xl gap-8 md:grid-cols-2 xl:grid-cols-3 items-stretch'
        >
          {services.map(service => {
            const theme = getServiceTheme(service.title)
            const cardStyle = {
              '--card-bg': theme.bg,
              '--card-border': theme.border,
              '--card-hover-border': theme.hoverBorder,
              '--card-text': theme.textColor,
              '--card-muted-text': theme.mutedTextColor,
              '--card-divider': theme.isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
              backgroundColor: theme.bg,
              borderColor: theme.border,
              color: theme.textColor,
              borderRadius: '0px',
            }
            return (
              <div key={service.title} className='group h-full'>
                <div
                  className='h-full flex flex-col border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--card-hover-border)] focus-within:border-[var(--card-hover-border)] relative'
                  style={cardStyle}
                >
                  {service.featured && (
                    <div className='absolute -top-2 -right-2 bg-cta text-cta-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg'>
                      Featured
                    </div>
                  )}
                  <div className='mb-4 w-full aspect-[16/9] rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105'>
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={320}
                      height={180}
                      className='w-full h-full object-contain'
                      sizes='320px'
                    />
                  </div>
                  <div className='flex-1 flex flex-col'>
                    <div className='space-y-3'>
                      <h3
                        className='text-lg font-semibold transition-colors duration-300'
                        style={{ color: 'var(--card-text)' }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className='leading-relaxed min-h-[6rem]'
                        style={{ color: 'var(--card-muted-text)' }}
                      >
                        {service.description}
                      </p>
                    </div>
                    <div
                      className='mt-6 flex flex-col gap-3 pt-5'
                      style={{
                        borderTop: '1px solid var(--card-divider)',
                      }}
                    >
                      <div
                        className='text-sm font-medium'
                        style={{ color: 'var(--card-muted-text)' }}
                      >
                        {service.outcome}
                      </div>
                      {service.startingAt && (
                        <span
                          className='text-sm font-semibold'
                          style={{ color: 'var(--card-text)' }}
                        >
                          {service.startingAt}
                        </span>
                      )}
                    </div>
                  </div>
                  <LinkButtonWithArrow
                    href={service.href}
                    variant='outline'
                    arrowIcon='arrow'
                    className='mt-6 w-full'
                    style={{
                      borderColor: 'var(--card-text)',
                      color: 'var(--card-text)',
                      backgroundColor: 'transparent',
                    }}
                    aria-label={`Learn more about ${service.title} services`}
                  >
                    Learn More
                  </LinkButtonWithArrow>
                </div>
              </div>
            )
          })}
        </LenisStaggered>

        {/* Services Overview CTA */}
        <LenisFadeIn delay={400} className='text-center'>
          <LinkButtonWithArrow
            href='/services'
            variant='default'
            size='lg'
            arrowIcon='arrow'
          >
            View All Services
          </LinkButtonWithArrow>
        </LenisFadeIn>
      </div>
    </section>
  )
}

export default ServicesPreview
