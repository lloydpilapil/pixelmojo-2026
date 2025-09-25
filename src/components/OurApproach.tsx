'use client'

import React from 'react'
import {
  LenisFadeIn,
  LenisStaggered,
} from '@/components/animations/LenisReveal'

interface ApproachStep {
  number: string
  week: string
  title: string
  description: string
  outcome: string
  badgeClass: string
  outcomeBorderClass: string
  outcomeHoverClass: string
  outcomeTextClass: string
}

interface OurApproachProps {
  title?: string
  steps?: ApproachStep[]
}

const OurApproach = ({
  title = 'Our Approach',
  steps = [
    {
      number: '01',
      week: 'Week 1',
      title: 'Launch With a Revenue Roadmap',
      description:
        'Skip the endless discovery decks. We map the fastest path to paying customers so every sprint ladders to revenue with momentum.',
      outcome:
        'Profit roadmap that focuses build priorities around the clearest path to paying customers.',
      badgeClass: 'bg-primary text-white',
      outcomeBorderClass: 'border-primary/20',
      outcomeHoverClass: 'group-hover:bg-primary/5',
      outcomeTextClass: 'text-primary',
    },
    {
      number: '02',
      week: 'Weeks 2-4',
      title: 'Prototype the Experience Customers Pay For',
      description:
        'Design and test the core flow that validates your riskiest assumptions with actual users in real buying contexts and moments.',
      outcome:
        'Working prototype validated with target users and buying signals.',
      badgeClass: 'bg-secondary text-white',
      outcomeBorderClass: 'border-secondary/20',
      outcomeHoverClass: 'group-hover:bg-secondary/5',
      outcomeTextClass: 'text-secondary',
    },
    {
      number: '03',
      week: 'Weeks 5-10',
      title: 'Ship Features to Market Feedback',
      description:
        'Build production-ready slices, release quickly, and capture live revenue signals that guide iteration and smart sales prioritization decisions.',
      outcome: 'Live product producing real usage and monetization data.',
      badgeClass: 'bg-cta text-white',
      outcomeBorderClass: 'border-cta/20',
      outcomeHoverClass: 'group-hover:bg-cta/5',
      outcomeTextClass: 'text-cta',
    },
    {
      number: '04',
      week: 'Week 11+',
      title: 'Scale the Winners, Trim the Waste',
      description:
        'Double down on what proves profitable and sunset what does not, powered by continuous deployment, analytics, and measurable ROI discipline.',
      outcome:
        'Self-funding growth engine that scales with ROI and market demand.',
      badgeClass: 'bg-accent text-white',
      outcomeBorderClass: 'border-accent/20',
      outcomeHoverClass: 'group-hover:bg-accent/5',
      outcomeTextClass: 'text-accent',
    },
  ],
}: OurApproachProps) => {
  return (
    <section className='py-16 md:py-20'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <LenisFadeIn className='text-center mb-12 md:mb-16'>
          <h2 className='mb-6'>{title}</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed'>
            How we typically ship revenue-ready MVPs in 90-120 days. Every phase
            is built to validate and drive traction with real customers.
          </p>
        </LenisFadeIn>

        {/* Cards - 2x2 grid on desktop, single column on mobile */}
        <LenisStaggered
          staggerDelay={150}
          className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto'
        >
          {steps.map((step, index) => (
            <div key={index} className='group relative h-full'>
              {/* Card */}
              <div className='card relative flex h-full flex-col p-6 md:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg'>
                {/* Number badge - with higher z-index to stay on top */}
                <div
                  className={`absolute -top-3 -left-3 flex h-12 w-12 items-center justify-center rounded-full font-bold text-lg shadow-lg md:h-14 md:w-14 md:text-xl ${step.badgeClass}`}
                >
                  {step.number}
                </div>

                {/* Week indicator - top right inside card */}
                <div className='absolute top-6 right-6 md:top-8 md:right-8 text-sm font-medium text-primary'>
                  {step.week}
                </div>

                {/* Content */}
                <div className='mt-2 flex-1'>
                  <div className='mb-4 pr-16'>
                    <h3 className='text-lg md:text-xl font-semibold'>
                      {step.title}
                    </h3>
                  </div>
                  <p className='text-muted-foreground text-sm md:text-base leading-relaxed'>
                    {step.description}
                  </p>
                </div>

                {/* Outcome callout */}
                <div
                  className={`mt-6 rounded-xl border bg-card p-5 transition-colors duration-300 ${step.outcomeBorderClass} ${step.outcomeHoverClass}`}
                >
                  <div
                    className={`mb-2 text-sm font-semibold uppercase tracking-wide ${step.outcomeTextClass}`}
                  >
                    Key Outcome
                  </div>
                  <p className='text-sm md:text-base leading-relaxed text-muted-foreground'>
                    {step.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </LenisStaggered>
      </div>
    </section>
  )
}

export default OurApproach
