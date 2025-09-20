'use client'

import React, { useState } from 'react'

interface ApproachStep {
  number: string
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
      title: 'Discover & Understand',
      description:
        'We start by deeply understanding your business, audience, and goals to identify key opportunities for growth.',
      hoverText:
        'Gain a crystal-clear roadmap, aligning every digital dollar to tangible business growth.',
      hoverColor: 'bg-primary',
    },
    {
      number: '02',
      title: 'Strategy & Planning',
      description:
        'We develop a clear, actionable roadmap that unifies your digital efforts and sets measurable goals for success.',
      hoverText:
        'Eliminate guesswork with a focused plan that prioritizes high-impact actions for results.',
      hoverColor: 'bg-secondary',
    },
    {
      number: '03',
      title: 'Design & Build',
      description:
        'Our team designs and develops intuitive, scalable solutions that create a seamless experience for your users.',
      hoverText:
        'Create seamless user experiences that boost adoption and are built to scale as you grow.',
      hoverColor: 'bg-cta',
    },
    {
      number: '04',
      title: 'Launch & Grow',
      description:
        'After launch, we continuously monitor performance, using data-driven insights to refine and enhance your digital ecosystem.',
      hoverText:
        'Turn data into profit. We continuously optimize your digital ecosystem for maximum ROI.',
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
            Our proven methodology transforms your ideas into impactful digital
            solutions through strategic planning, expert execution, and
            continuous optimization.
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
              <div className='relative bg-card border border-border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg min-h-[200px] md:min-h-[240px]'>
                {/* Number badge - with higher z-index to stay on top */}
                <div
                  className={`absolute -top-3 -left-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full ${step.hoverColor} text-white font-bold text-lg md:text-xl shadow-lg z-20`}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className='mt-2'>
                  <h3 className='text-lg md:text-xl font-semibold mb-4 pr-4'>
                    {step.title}
                  </h3>
                  <p className='text-muted text-sm md:text-base leading-relaxed'>
                    {step.description}
                  </p>
                </div>

                {/* Hover/Active overlay - simpler approach */}
                <div
                  className={`absolute inset-0 rounded-2xl ${step.hoverColor} p-6 md:p-8 flex items-center justify-center transition-opacity duration-300 ${
                    activeCard === index
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className='text-white text-center'>
                    <h4 className='text-lg md:text-xl font-bold mb-3'>
                      Key Benefit
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
