'use client'

import React from 'react'

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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='w-12 h-12'
        >
          <path
            d='m18.628 14.673-1.83-1.07a.75.75 0 0 0-.378-.103H7.58a.74.74 0 0 0-.378.103l-1.831 1.07c-.697.409-1.114 1.092-1.114 1.827s.417 1.418 1.114 1.827l5.222 3.052c.427.248.916.372 1.406.372s.98-.125 1.409-.373l5.22-3.051c.697-.409 1.114-1.092 1.114-1.827s-.417-1.418-1.114-1.827'
            fill='#fdbd22'
          />
          <path
            d='m18.628 10.173-1.83-1.07A.75.75 0 0 0 16.42 9H7.58a.74.74 0 0 0-.378.103l-1.831 1.07c-.697.409-1.114 1.092-1.114 1.827s.417 1.418 1.114 1.827l5.222 3.052c.427.248.916.372 1.406.372s.98-.124 1.409-.373l5.221-3.051c.697-.409 1.114-1.092 1.114-1.827s-.417-1.418-1.114-1.827Z'
            fill='#5ecf7a'
          />
          <path
            d='m18.628 5.673-5.222-3.052a2.85 2.85 0 0 0-2.815 0l-5.22 3.051c-.697.409-1.114 1.092-1.114 1.827s.417 1.418 1.114 1.827l5.223 3.053c.418.242.905.37 1.406.37s.987-.128 1.409-.372l5.22-3.051c.697-.409 1.114-1.092 1.114-1.827s-.417-1.418-1.114-1.827Z'
            fill='#3595f9'
          />
        </svg>
      ),
    },
    {
      number: '2',
      title: 'Strategy & Planning',
      description:
        'We develop a clear, actionable roadmap that unifies your digital efforts and sets measurable goals for success.',
      hoverText:
        'Eliminate guesswork with a focused plan that prioritizes high-impact actions for measurable results.',
      hoverColor: 'bg-gray',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='w-12 h-12'
        >
          <path
            d='M14.725 7.861a2.253 2.253 0 0 0-3.182 0l-8.485 8.485c-.425.425-.659.99-.659 1.591s.234 1.167.659 1.591l1.414 1.414c.425.425.99.659 1.591.659s1.166-.234 1.591-.659l8.486-8.485a2.255 2.255 0 0 0 0-3.182z'
            fill='#364165'
          />
          <path
            d='M16.14 12.456a2.253 2.253 0 0 0-.001-3.181L14.724 7.86a2.253 2.253 0 0 0-3.182 0L9.537 9.865l4.596 4.596 2.006-2.006ZM14.944 3.148v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 1.5 0m5.908 5.908h-2a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5m-1.177-3.67a.75.75 0 1 0-1.061-1.061L17.199 5.74a.75.75 0 0 0 1.06 1.061z'
            fill='#fdbd22'
          />
        </svg>
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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='w-12 h-12'
        >
          <path
            d='M19.5 14.25h-6.26c-.205 0-.4.084-.542.231l-5.74 6a.75.75 0 0 0 .542 1.268h12c1.241 0 2.25-1.01 2.25-2.25v-3c0-1.24-1.009-2.25-2.25-2.25Z'
            fill='#e73841'
          />
          <path
            d='m18.95 7.17-2.115-2.115a2.21 2.21 0 0 0-1.581-.667c-.606 0-1.174.232-1.604.662l-5.18 5.18a.75.75 0 0 0-.22.53v8.48a.75.75 0 0 0 1.28.53l9.42-9.42c.43-.43.665-.999.662-1.604a2.2 2.2 0 0 0-.662-1.577Z'
            fill='#fdbd22'
          />
          <rect
            width='7.5'
            height='19.5'
            x='2.25'
            y='2.25'
            rx='2.25'
            fill='#3595f9'
          />
          <circle cx='6' cy='18' r='1' fill='#a5c5e5' />
        </svg>
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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='w-12 h-12'
        >
          <path
            d='M20.074 8.445l-4.452-.647-1.991-4.035A1.81 1.81 0 0 0 12 2.75a1.81 1.81 0 0 0-1.631 1.013L8.378 7.798l-4.453.647c-.689.1-1.251.574-1.467 1.237s-.039 1.377.46 1.864l3.222 3.141-.761 4.435c-.118.688.16 1.369.724 1.778.319.231.691.35 1.067.35a1.82 1.82 0 0 0 .847-.211L12 18.945l3.982 2.094a1.81 1.81 0 0 0 2.639-1.917l-.761-4.435 3.222-3.141c.499-.487.676-1.201.46-1.864s-.777-1.137-1.468-1.237'
            fill='#fdbd22'
          />
        </svg>
      ),
    },
  ],
}: OurApproachProps) => {
  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='text-center mb-16'>{title}</h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
          {steps.map((step, index) => (
            <div
              key={index}
              className='card p-8 group cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2'
            >
              {/* Default Content */}
              <div className='transition-opacity duration-300 group-hover:opacity-0'>
                <div className='mb-6'>{step.icon}</div>
                <h3 className='mb-3'>
                  {step.number}. {step.title}
                </h3>
                <p className='text-muted text-small'>{step.description}</p>
              </div>

              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 ${step.hoverColor} text-white flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                <p className='text-center font-medium'>{step.hoverText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurApproach
