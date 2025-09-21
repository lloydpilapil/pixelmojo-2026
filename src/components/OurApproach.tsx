'use client'

import React, { useState } from 'react'

interface ApproachStep {
  number: string
  week: string
  title: string
  description: string
  hoverText: string
  hoverColor: string
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
      title: 'Revenue Strategy, Not Research Reports',
      description:
        'Skip the 6-month discovery. We identify your fastest path to paying customers and build backwards from there.',
      hoverText: 'Walk away with a profit roadmap, not another strategy deck.',
      hoverColor: 'bg-primary',
    },
    {
      number: '02',
      week: 'Weeks 2-4',
      title: "Build What Sells, Not What's Safe",
      description:
        'Design and prototype the core experience that validates your riskiest assumptions with real users.',
      hoverText: 'Working prototype that users actually want to pay for.',
      hoverColor: 'bg-secondary',
    },
    {
      number: '03',
      week: 'Weeks 5-10',
      title: 'Ship to Market, Not to Meetings',
      description:
        'Develop and deploy production-ready features while gathering real customer feedback and revenue signals.',
      hoverText: 'Live product generating initial revenue and validation data.',
      hoverColor: 'bg-cta',
    },
    {
      number: '04',
      week: 'Week 11+',
      title: "Scale What Works, Kill What Doesn't",
      description:
        "Use revenue data to double down on what's profitable and cut what isn't. Continuous deployment, continuous profit.",
      hoverText: 'Self-funding growth engine that scales based on actual ROI.',
      hoverColor: 'bg-accent',
    },
  ],
}: OurApproachProps) => {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section className='py-16 md:py-20'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='mb-6'>{title}</h2>
          <p className='text-muted max-w-2xl mx-auto text-lg leading-relaxed'>
            How we ship products that sell in 90 days. No endless discovery, no
            strategy theater - just working products that generate revenue.
          </p>
        </div>

        {/* Cards - 2x2 grid on desktop, single column on mobile */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto'>
          {steps.map((step, index) => (
            <div
              key={index}
              className='group relative'
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
            >
              {/* Card */}
              <div className='card relative p-6 md:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg min-h-[200px] md:min-h-[240px]'>
                {/* Number badge - with higher z-index to stay on top */}
                <div
                  className={`absolute -top-3 -left-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full ${step.hoverColor} text-white font-bold text-lg md:text-xl shadow-lg z-20`}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className='mt-2'>
                  <div className='mb-4 pr-4'>
                    <div className='text-sm font-medium text-primary mb-1'>
                      {step.week}
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold'>
                      {step.title}
                    </h3>
                  </div>
                  <p className='text-muted text-sm md:text-base leading-relaxed'>
                    {step.description}
                  </p>
                </div>

                {/* Hover/Active overlay - simpler approach */}
                <div
                  className={`absolute inset-0 rounded-lg ${step.hoverColor} p-6 md:p-8 flex items-center justify-center transition-opacity duration-300 ${
                    activeCard === index
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className='text-white text-center'>
                    <h4 className='text-lg md:text-xl font-bold mb-3'>
                      Key Outcome
                    </h4>
                    <p className='text-sm md:text-base leading-relaxed'>
                      {step.hoverText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connecting line - only on desktop, between items in same row */}
              {index % 2 === 0 && index < steps.length - 1 && (
                <div className='hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 w-8'>
                  <div className='h-px bg-gradient-to-r from-primary/30 to-transparent' />
                </div>
              )}

              {/* Vertical connector on mobile between cards */}
              {index < steps.length - 1 && (
                <div className='md:hidden absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-6 w-px bg-gradient-to-b from-primary/30 to-transparent' />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurApproach
