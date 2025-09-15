'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ApproachStep {
  number: string
  title: string
  description: string
  hoverText: string
  icon: React.ReactNode
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
      number: '1',
      title: 'Discover & Understand',
      description:
        'We start by deeply understanding your business, audience, and goals to identify key opportunities for growth.',
      hoverText:
        'Gain a crystal-clear roadmap, aligning every digital dollar to tangible business growth.',
      hoverColor: 'bg-primary',
      icon: (
        <Image
          src='/layer.svg'
          alt='Discover & Understand'
          width={48}
          height={48}
          className='w-12 h-12'
        />
      ),
    },
    {
      number: '2',
      title: 'Strategy & Planning',
      description:
        'We develop a clear, actionable roadmap that unifies your digital efforts and sets measurable goals for success.',
      hoverText:
        'Eliminate guesswork with a focused plan that prioritizes high-impact actions for results.',
      hoverColor: 'bg-secondary',
      icon: (
        <Image
          src='/magic-wand.svg'
          alt='Strategy & Planning'
          width={48}
          height={48}
          className='w-12 h-12'
        />
      ),
    },
    {
      number: '3',
      title: 'Design & Build',
      description:
        'Our team designs and develops intuitive, scalable solutions that create a seamless experience for your users.',
      hoverText:
        'Create seamless user experiences that boost adoption and are built to scale as you grow.',
      hoverColor: 'bg-cta',
      icon: (
        <Image
          src='/color-palette.svg'
          alt='Design & Build'
          width={48}
          height={48}
          className='w-12 h-12'
        />
      ),
    },
    {
      number: '4',
      title: 'Launch & Grow',
      description:
        'After launch, we continuously monitor performance, using data-driven insights to refine and enhance your digital ecosystem.',
      hoverText:
        'Turn data into profit. We continuously optimize your digital ecosystem for maximum ROI.',
      hoverColor: 'bg-accent',
      icon: (
        <Image
          src='/star.svg'
          alt='Launch & Grow'
          width={48}
          height={48}
          className='w-12 h-12'
        />
      ),
    },
  ],
}: OurApproachProps) => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        {/* Header with proper spacing */}
        <div className='text-center mb-20'>
          <h2 className='mb-6'>{title}</h2>
          <p className='text-muted max-w-2xl mx-auto text-lg leading-relaxed'>
            Our proven methodology transforms your ideas into impactful digital
            solutions through strategic planning, expert execution, and
            continuous optimization.
          </p>
        </div>

        {/* Cards container with proper spacing */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
          {steps.map((step, index) => (
            <div
              key={index}
              className='relative h-[400px] [perspective:1000px] cursor-pointer'
              onClick={() => toggleFlip(index)}
              onMouseEnter={() =>
                setFlippedCards(prev => new Set(prev).add(index))
              }
              onMouseLeave={() =>
                setFlippedCards(prev => {
                  const next = new Set(prev)
                  next.delete(index)
                  return next
                })
              }
            >
              <div
                className={`absolute inset-0 w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                  flippedCards.has(index) ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front */}
                <div className='absolute inset-0 [backface-visibility:hidden] bg-card border border-border rounded-2xl p-8 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300'>
                  {/* Step Number Badge - positioned relative to card, not floating above */}
                  <div className='absolute top-4 right-4'>
                    <div
                      className={`w-10 h-10 rounded-full ${step.hoverColor} text-white text-lg font-bold flex items-center justify-center shadow-lg`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className='mb-6 mt-4'>{step.icon}</div>

                  {/* Content */}
                  <div className='flex-1'>
                    <h3 className='mb-4 text-lg font-semibold'>{step.title}</h3>
                    <p className='text-muted text-sm leading-relaxed'>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Back */}
                <div
                  className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] ${step.hoverColor} rounded-2xl p-8 shadow-lg`}
                >
                  <div className='flex flex-col justify-center h-full text-white text-center'>
                    <div className='mb-6'>
                      <div className='w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center'>
                        <span className='text-2xl'>✨</span>
                      </div>
                      <h4 className='text-xl font-bold mb-4'>Key Benefit</h4>
                      <p className='text-lg leading-relaxed'>
                        {step.hoverText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting line to next card */}
              {index < steps.length - 1 && (
                <div className='hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10'>
                  <div className='w-8 h-px bg-gradient-to-r from-primary to-transparent opacity-30' />
                  <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full opacity-30' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurApproach
