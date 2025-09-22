'use client'

import React from 'react'
import Image from 'next/image'
import { LinkButtonWithArrow } from '@/components/ui/button'
import { getServiceTheme } from '@/utils/serviceThemes'

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
  title = 'Build AI Products That Actually Ship',
  services = [
    {
      title: 'AI Product Development',
      description:
        'Ship complete AI products in 90 days flat. We architect, design, and deploy production-ready systems that generate revenue at launch, not someday.',
      icon: '/ui_ux_design_solutions_services_thumb.svg',
      href: '/services/ai-product-development',
      gradient: '',
      outcome: 'Launch with paying customers and predictable growth metrics.',
      startingAt: 'From $15K',
      featured: true,
    },
    {
      title: 'Revenue-First Design Systems',
      description:
        'Design systems built to convert, not just look pretty. Every component optimized for activation, retention, and expansion.',
      icon: '/branding_services_thumb.svg',
      href: '/services/revenue-first-design',
      gradient: '',
      outcome: 'Deploy brand assets that directly impact conversion rates.',
      startingAt: 'Starts at $9K',
    },
    {
      title: 'AI-Powered Growth Engines',
      description:
        'Automate growth that drives real pipeline. From lead scoring to lifecycle campaigns that convert.',
      icon: '/digital_marketing_services_thumb.svg',
      href: '/services/ai-powered-growth',
      gradient: '',
      outcome:
        'Turn on revenue streams that compound without manual intervention.',
      startingAt: 'Retainers from $6K/mo',
    },
    {
      title: 'Profit-Optimized Interfaces',
      description:
        'Interfaces that maximize revenue per user. AI-powered experiences that convert, upsell, and retain.',
      icon: '/web_app_design_services_thumb.svg',
      href: '/services/profit-optimized-interfaces',
      gradient: '',
      outcome: 'Ship interfaces that increase ARPU measurably within 30 days.',
      startingAt: 'Project scopes from $22K',
    },
    {
      title: 'Conversion Asset Systems',
      description:
        'Visuals that close deals, not win awards. From pitch decks to product experiences that drive expansion.',
      icon: '/graphic_visual_design_services_thumb.svg',
      href: '/services/conversion-assets',
      gradient: '',
      outcome:
        'Deploy assets with proven impact on close rates and deal velocity.',
      startingAt: 'Bundles from $4K',
    },
    {
      title: 'Full-Stack AI Implementation',
      description:
        'Production AI that generates ROI in weeks. Complete ecosystems from infrastructure to interface.',
      icon: '/creative_contents_services_thumb.svg',
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
        <div className='mb-16 text-center'>
          <h2 className='mb-6'>{title}</h2>
          <p className='text-muted mx-auto max-w-3xl text-lg leading-relaxed'>
            Complete product ecosystems that ship in weeks and scale
            immediately. No fragmented vendors, no endless discovery.{' '}
            <span className='text-primary font-medium'>
              Design, develop, deploy, scale.
            </span>
          </p>
        </div>

        {/* Services Grid */}
        <div className='mx-auto mb-12 grid max-w-6xl gap-8 md:grid-cols-2 xl:grid-cols-3 items-stretch'>
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
                    <div className='absolute -top-2 -right-2 bg-growth text-growth-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg'>
                      Featured
                    </div>
                  )}
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={48}
                    height={48}
                    className='mb-3 h-12 w-12 transition-transform duration-300 group-hover:scale-105'
                  />
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
                    variant='link'
                    arrowIcon='arrow'
                    className='mt-6 self-start'
                    style={{ color: 'var(--card-text)' }}
                    aria-label={`Learn more about ${service.title} services`}
                  >
                    Learn More
                  </LinkButtonWithArrow>
                </div>
              </div>
            )
          })}
        </div>

        {/* Services Overview CTA */}
        <div className='text-center'>
          <LinkButtonWithArrow
            href='/services'
            variant='default'
            size='lg'
            arrowIcon='arrow'
          >
            View All Services
          </LinkButtonWithArrow>
        </div>
      </div>
    </section>
  )
}

export default ServicesPreview
