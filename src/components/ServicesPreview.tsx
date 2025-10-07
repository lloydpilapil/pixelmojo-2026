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
        'Design and build AI-powered products from validation to launch using modern tools and frameworks.',
      icon: '/pixelmojo-services-ai-product-development-thumb.webp',
      href: '/services/ai-product-development',
      gradient: '',
      outcome: 'Ship production-ready AI products in 90 days.',
      startingAt: 'From $4,995',
      featured: true,
    },
    {
      title: 'Revenue-First Design Systems',
      description:
        'Brand identity and design systems that help startups look professional and build trust with customers.',
      icon: '/pixelmojo-services-revenue-first-design-thumb.webp',
      href: '/services/revenue-first-design',
      gradient: '',
      outcome: 'Complete brand system ready in weeks.',
      startingAt: 'Starts at $1,995',
    },
    {
      title: 'AI-Powered Growth Engines',
      description:
        'Content marketing and growth campaigns to help startups generate leads and build consistent pipeline.',
      icon: '/pixelmojo-services-ai-powered-growth-thumb.webp',
      href: '/services/ai-powered-growth',
      gradient: '',
      outcome: 'Generate qualified leads and build pipeline.',
      startingAt: 'Retainers from $2,995/mo',
    },
    {
      title: 'Profit-Optimized Interfaces',
      description:
        'Product UI/UX designed to maximize user engagement, conversion, and retention.',
      icon: '/pixelmojo-services-profit-optimized-interfaces-thumb.webp',
      href: '/services/profit-optimized-interfaces',
      gradient: '',
      outcome: 'Beautiful, functional product interfaces.',
      startingAt: 'Projects from $2,995',
    },
    {
      title: 'Conversion Asset Systems',
      description:
        'Landing pages and marketing assets designed to convert visitors into customers.',
      icon: '/pixelmojo-services-conversion-assets-thumb.webp',
      href: '/services/conversion-assets',
      gradient: '',
      outcome: 'Professional landing pages that convert.',
      startingAt: 'Projects from $1,995',
    },
    {
      title: 'Full-Stack AI Implementation',
      description:
        'Add AI features to existing products or get dedicated AI engineers for ongoing development.',
      icon: '/pixelmojo-services-footer-image-thumb.webp',
      href: '/services/full-stack-ai',
      gradient: '',
      outcome: 'AI features integrated and deployed.',
      startingAt: 'Programs from $5,995',
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
