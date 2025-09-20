'use client'

import React from 'react'
import Image from 'next/image'
import { LinkButtonWithArrow } from '@/components/ui/button'

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
  title = 'Our Services',
  services = [
    {
      title: 'Growth-Focused Product Sprint',
      description:
        'Align strategy, UX, and AI to prototype, validate, and launch revenue-ready flows within six weeks.',
      icon: '/ui_ux_design_solutions_services_thumb.svg',
      href: '/services/ui-ux-design-solutions',
      gradient: 'from-blue-500/20 to-purple-500/30',
      outcome:
        'Fast-track activation and onboarding for SaaS teams in 6 weeks.',
      startingAt: 'From $15K',
      featured: true,
    },
    {
      title: 'Brand Identity',
      description:
        'Craft positioning, visual systems, and messaging frameworks that keep brands unmistakable to scale.',
      icon: '/branding_services_thumb.svg',
      href: '/services/brand-identity',
      gradient: 'from-purple-500/10 to-pink-500/10',
      outcome: 'Define brand voice and launch-ready assets in 4 weeks.',
      startingAt: 'Starts at $9K',
    },
    {
      title: 'Brand Activation & Growth',
      description:
        'Run lifecycle campaigns with GTM toolkits and analytics so qualified deals stay warm throughout pipeline.',
      icon: '/digital_marketing_services_thumb.svg',
      href: '/services/brand-activation-growth',
      gradient: 'from-green-500/10 to-teal-500/10',
      outcome: 'Accelerate qualified pipeline with ROI dashboards in 90 days.',
      startingAt: 'Retainers from $6K/mo',
    },
    {
      title: 'Web & App Design',
      description:
        'Design responsive systems and motion-rich interfaces with accessibility and performance built-in.',
      icon: '/web_app_design_services_thumb.svg',
      href: '/services/web-app-design',
      gradient: 'from-orange-500/10 to-red-500/10',
      outcome:
        'Launch conversion-optimized marketing sites or apps in 10–12 weeks.',
      startingAt: 'Project scopes from $22K',
    },
    {
      title: 'Graphic & Visuals',
      description:
        'Deliver campaign visuals, sales collateral, and pitch decks as reusable, on-brand kits for growth.',
      icon: '/graphic_visual_design_services_thumb.svg',
      href: '/services/graphic-visuals',
      gradient: 'from-pink-500/10 to-rose-500/10',
      outcome: 'Campaign-ready drops produced in 10 business days.',
      startingAt: 'Bundles from $4K',
    },
    {
      title: 'Development Solutions',
      description:
        'Provide full-stack product and web engineering with QA automation and analytics embedded from sprint one.',
      icon: '/creative_contents_services_thumb.svg',
      href: '/services/development-solutions',
      gradient: 'from-indigo-500/10 to-blue-500/10',
      outcome: 'Ship stable releases every two weeks with embedded squads.',
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
            Choose the partnership model that meets you where you are—from rapid
            sprints to embedded teams, each backed by outcomes we track and
            optimize with you.{' '}
            <span className='text-primary font-medium'>
              Global expertise, optimized efficiency.
            </span>
          </p>
        </div>

        {/* Services Grid */}
        <div className='mx-auto mb-12 grid max-w-6xl gap-8 md:grid-cols-2 xl:grid-cols-3 items-stretch'>
          {services.map(service => (
            <div key={service.title} className='group h-full'>
              <div
                className={`h-full rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative ${
                  service.featured
                    ? 'border-primary/50 bg-gradient-to-br from-primary/5 via-card to-secondary/5 hover:border-primary/70 hover:shadow-primary/20'
                    : 'border-border bg-card hover:border-primary/40 hover:shadow-primary/10'
                }`}
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
                  className='mb-6 h-12 w-12 transition-transform duration-300 group-hover:scale-105'
                />
                <div className='space-y-3'>
                  <h3 className='text-lg font-semibold transition-colors duration-300 group-hover:text-primary'>
                    {service.title}
                  </h3>
                  <p className='text-muted leading-relaxed h-[6rem]'>
                    {service.description}
                  </p>
                </div>
                <div className='mt-6 flex flex-col gap-3 border-t border-border/70 pt-5'>
                  <div className='text-sm font-medium text-muted-foreground'>
                    {service.outcome}
                  </div>
                  {service.startingAt && (
                    <span
                      className='text-sm font-semibold'
                      style={{ color: '#3CC29E' }}
                    >
                      {service.startingAt}
                    </span>
                  )}
                </div>
                <LinkButtonWithArrow
                  href={service.href}
                  variant='link'
                  arrowIcon='arrow'
                  className='mt-6'
                >
                  Learn more
                </LinkButtonWithArrow>
              </div>
            </div>
          ))}
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
