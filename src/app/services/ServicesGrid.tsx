'use client'

import Image from 'next/image'
import { LinkButtonWithArrow } from '@/components/ui/button'
import { getServiceTheme } from '@/utils/serviceThemes'

export default function ServicesGrid() {
  const services = [
    {
      title: 'AI Product Development',
      description:
        'Ship complete AI products in 90 days flat. Production-ready systems that generate revenue at launch, not someday.',
      features: [
        'Full product architecture & AI integration',
        'Revenue-validated user flows',
        'Launch with paying customers',
        'Built-in growth metrics',
      ],
      icon: '/pixelmojo-services-ai-product-development-thumb.webp',
      href: '/services/ai-product-development',
    },
    {
      title: 'Revenue-First Design Systems',
      description:
        'Design systems built to convert, not just look pretty. Every component optimized for activation, retention, and expansion.',
      features: [
        'Conversion-tested components',
        'AI-enhanced interactions',
        'Direct impact on revenue metrics',
        'Ship-ready from sprint one',
      ],
      icon: '/pixelmojo-services-revenue-first-design-thumb.webp',
      href: '/services/revenue-first-design',
    },
    {
      title: 'AI-Powered Growth Engines',
      description:
        'Automate growth that drives real pipeline. From lead scoring to lifecycle campaigns that convert.',
      features: [
        'Intelligent lead qualification',
        'Self-optimizing campaigns',
        'Revenue attribution built-in',
        'ROI visible in weeks',
      ],
      icon: '/pixelmojo-services-ai-powered-growth-thumb.webp',
      href: '/services/ai-powered-growth',
    },
    {
      title: 'Profit-Optimized Interfaces',
      description:
        'Interfaces that maximize revenue per user. AI-powered experiences that convert, upsell, and retain.',
      features: [
        'Revenue-per-user optimization',
        'Smart upsell timing',
        'Churn prediction & prevention',
        'Measurable ARPU lift',
      ],
      icon: '/pixelmojo-services-profit-optimized-interfaces-thumb.webp',
      href: '/services/profit-optimized-interfaces',
    },
    {
      title: 'Conversion Asset Systems',
      description:
        'Visuals that close deals, not win awards. From pitch decks to product experiences that drive expansion.',
      features: [
        'Battle-tested pitch templates',
        'Revenue-focused visual systems',
        'Conversion-validated designs',
        'Trackable impact on close rates',
      ],
      icon: '/pixelmojo-services-conversion-assets-thumb.webp',
      href: '/services/conversion-assets',
    },
    {
      title: 'Full-Stack AI Implementation',
      description:
        'Production AI that generates ROI in weeks. Complete ecosystems from infrastructure to interface.',
      features: [
        'Ship production features weekly',
        'End-to-end deployment',
        'Revenue-focused roadmaps',
        'Self-funding growth cycles',
      ],
      icon: '/pixelmojo-services-footer-image-thumb.webp',
      href: '/services/full-stack-ai',
    },
  ]

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20'>
      {services.map((service, index) => {
        const theme = getServiceTheme(service.title)
        const cardStyle = {
          '--card-bg': theme.bg,
          '--card-border': theme.border,
          '--card-hover-border': theme.hoverBorder,
          '--card-text': theme.textColor,
          '--card-muted-text': theme.mutedTextColor,
          '--card-icon-bg': theme.iconBg,
          '--card-dot': theme.dot,
          backgroundColor: theme.bg,
          borderColor: theme.border,
          color: theme.textColor,
        }
        return (
          <div key={index} className='group h-full'>
            <div
              className='h-full flex flex-col p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[var(--card-hover-border)] focus-within:border-[var(--card-hover-border)] border'
              style={cardStyle}
            >
              {/* Icon */}
              <div className='w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 transition-all duration-300 group-hover:scale-110'>
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={320}
                  height={180}
                  className='w-full h-full object-contain'
                />
              </div>

              {/* Content wrapper with flex-1 */}
              <div className='flex-1 flex flex-col'>
                {/* Content */}
                <div className='space-y-4 mb-6'>
                  <h3
                    className='transition-colors duration-300'
                    style={{ color: 'var(--card-text)' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className='leading-relaxed'
                    style={{ color: 'var(--card-muted-text)' }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className='space-y-3 mb-6'>
                  {service.features.map((feature, idx) => (
                    <div key={idx} className='flex items-start gap-3'>
                      <div
                        className='flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5'
                        style={{ backgroundColor: 'var(--card-icon-bg)' }}
                      >
                        <div
                          className='w-2 h-2 rounded-full'
                          style={{ backgroundColor: 'var(--card-dot)' }}
                        />
                      </div>
                      <span
                        className='text-sm'
                        style={{ color: 'var(--card-text)' }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA - full width button */}
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
    </div>
  )
}
