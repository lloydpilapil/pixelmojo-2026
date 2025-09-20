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
        'Align product, design, and AI around your north-star journey; prototype, test, and instrument flows that unblock adoption within one quarter.',
      icon: '/ui_ux_design_solutions_services_thumb.svg',
      href: '/services/ui-ux-design-solutions',
      gradient: 'from-blue-500/20 to-purple-500/30',
      outcome:
        'Ship validated activation journeys with dashboards that show what to scale next.',
      startingAt: 'From $15K',
      featured: true,
    },
    {
      title: 'Brand Identity',
      description:
        'Translate positioning into a design system your teams can actually ship with—voice, visuals, and governance rooted in customer truth.',
      icon: '/branding_services_thumb.svg',
      href: '/services/brand-identity',
      gradient: 'from-purple-500/10 to-pink-500/10',
      outcome: 'Hand off a brand kit wired for experimentation, not shelfware.',
      startingAt: 'Starts at $9K',
    },
    {
      title: 'Brand Activation & Growth',
      description:
        'Pair lifecycle narrative, AI-assisted nurture, and revenue analytics so every campaign ladders back to the roadmap.',
      icon: '/digital_marketing_services_thumb.svg',
      href: '/services/brand-activation-growth',
      gradient: 'from-green-500/10 to-teal-500/10',
      outcome:
        'Keep qualified pipeline warm with insight loops leadership can defend.',
      startingAt: 'Retainers from $6K/mo',
    },
    {
      title: 'Web & App Design',
      description:
        'Build responsive product surfaces tied to real user journeys, with AI cues, accessibility, and performance tuned before dev picks it up.',
      icon: '/web_app_design_services_thumb.svg',
      href: '/services/web-app-design',
      gradient: 'from-orange-500/10 to-red-500/10',
      outcome:
        'Launch feature-rich experiences that drive conversion and capture learning signals.',
      startingAt: 'Project scopes from $22K',
    },
    {
      title: 'Graphic & Visuals',
      description:
        'Deliver on-demand storytelling assets that plug into your experiments—from investor decks to in-app nudges—always on-brand.',
      icon: '/graphic_visual_design_services_thumb.svg',
      href: '/services/graphic-visuals',
      gradient: 'from-pink-500/10 to-rose-500/10',
      outcome:
        'Deploy campaign visuals in days, complete with metrics to prove what lands.',
      startingAt: 'Bundles from $4K',
    },
    {
      title: 'Development Solutions',
      description:
        'Embed full-stack engineering squads who code against your design system, automate QA testing, and surface evidence every sprint.',
      icon: '/creative_contents_services_thumb.svg',
      href: '/services/development-solutions',
      gradient: 'from-indigo-500/10 to-blue-500/10',
      outcome:
        'Release AI-enabled features on a predictable cadence without compromising reliability.',
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
            We turn your AI ambitions into launch-ready experiences with design
            systems, rapid experiments, and the proof your leadership needs to
            keep funding momentum.{' '}
            <span className='text-primary font-medium'>
              Evidence over hype, every sprint.
            </span>
          </p>
        </div>

        {/* Services Grid */}
        <div className='mx-auto mb-12 grid max-w-6xl gap-8 md:grid-cols-2 xl:grid-cols-3 items-stretch'>
          {services.map(service => (
            <div key={service.title} className='group h-full'>
              <div
                className={`h-full flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative ${
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
                  className='mb-3 h-12 w-12 transition-transform duration-300 group-hover:scale-105'
                />
                <div className='flex-1 flex flex-col'>
                  <div className='space-y-3'>
                    <h3 className='text-lg font-semibold transition-colors duration-300 group-hover:text-primary'>
                      {service.title}
                    </h3>
                    <p className='text-muted leading-relaxed min-h-[6rem]'>
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
                </div>
                <LinkButtonWithArrow
                  href={service.href}
                  variant='link'
                  arrowIcon='arrow'
                  className='mt-6 self-start'
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
