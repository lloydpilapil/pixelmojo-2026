'use client'

import React, { useState } from 'react'

interface ComparisonProvider {
  name: string
  description: string
  speed: boolean
  flexibility: boolean
  quality: boolean
  scalability: boolean
  affordability: boolean
  isHighlighted?: boolean
}

interface ComparisonTableProps {
  eyebrow?: string
  title?: string
  providers?: ComparisonProvider[]
}

const ComparisonTable = ({
  eyebrow = "PIXELMOJO DELIVERS WHAT OTHERS CAN'T",
  title = 'Speed, quality, and accountability, no trade-offs.',
  providers = [
    {
      name: 'PixelMojo',
      description:
        'Blends speed, flexibility, quality, scalability, and cost-effectiveness to elevate your digital presence.',
      speed: true,
      flexibility: true,
      quality: true,
      scalability: true,
      affordability: true,
      isHighlighted: true,
    },
    {
      name: 'In-house team',
      description:
        'Limited expertise and scalability make in-house teams unsuitable for diverse, complex creative projects.',
      speed: false,
      flexibility: false,
      quality: true,
      scalability: true,
      affordability: false,
    },
    {
      name: 'Creative agencies',
      description:
        'Agencies deliver quality but are often expensive, slow, and inflexible for dynamic business needs.',
      speed: false,
      flexibility: false,
      quality: true,
      scalability: true,
      affordability: false,
    },
    {
      name: 'Freelancers',
      description:
        'Affordable but inconsistent, freelancers struggle with reliability, coordination, and scaling projects effectively.',
      speed: false,
      flexibility: false,
      quality: true,
      scalability: true,
      affordability: true,
    },
    {
      name: 'Self-service tools',
      description:
        'Great for repetitive tasks but lack the capacity for comprehensive, end-to-end creative solutions.',
      speed: false,
      flexibility: false,
      quality: true,
      scalability: true,
      affordability: false,
    },
  ],
}: ComparisonTableProps) => {
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(0)

  const toggleRow = (index: number) => {
    setOpenRowIndex(openRowIndex === index ? null : index)
  }

  const CheckIcon = () => (
    <svg
      className='w-6 h-6 text-secondary'
      viewBox='0 0 24 24'
      fill='currentColor'
    >
      <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
    </svg>
  )

  const XIcon = () => (
    <svg
      className='w-6 h-6 text-accent'
      viewBox='0 0 24 24'
      fill='currentColor'
    >
      <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
    </svg>
  )

  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
      className={`w-6 h-6 text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      viewBox='0 0 24 24'
      fill='currentColor'
    >
      <path d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z' />
    </svg>
  )

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <div className='text-primary font-medium mb-4'>{eyebrow}</div>
          <h2>{title}</h2>
        </div>

        {/* Desktop Table */}
        <div className='hidden md:block overflow-x-auto'>
          <table className='w-full max-w-6xl mx-auto card overflow-hidden'>
            <thead>
              <tr className='bg-muted/30'>
                <th className='p-6 text-left font-semibold'></th>
                <th className='p-4 text-center font-semibold'>Speed</th>
                <th className='p-4 text-center font-semibold'>Flexibility</th>
                <th className='p-4 text-center font-semibold'>Quality</th>
                <th className='p-4 text-center font-semibold'>Scalability</th>
                <th className='p-4 text-center font-semibold'>Affordability</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider, index) => (
                <tr
                  key={index}
                  className={`border-t border-border hover:bg-muted/20 transition-colors duration-200 ${
                    provider.isHighlighted
                      ? 'bg-primary/5 border-l-4 border-l-primary'
                      : ''
                  }`}
                >
                  <td className='p-6'>
                    <div className='font-semibold mb-2'>{provider.name}</div>
                    <p className='text-muted text-small'>
                      {provider.description}
                    </p>
                  </td>
                  <td className='p-4 text-center'>
                    {provider.speed ? <CheckIcon /> : <XIcon />}
                  </td>
                  <td className='p-4 text-center'>
                    {provider.flexibility ? <CheckIcon /> : <XIcon />}
                  </td>
                  <td className='p-4 text-center'>
                    {provider.quality ? <CheckIcon /> : <XIcon />}
                  </td>
                  <td className='p-4 text-center'>
                    {provider.scalability ? <CheckIcon /> : <XIcon />}
                  </td>
                  <td className='p-4 text-center'>
                    {provider.affordability ? <CheckIcon /> : <XIcon />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Accordion */}
        <div className='md:hidden space-y-4'>
          {providers.map((provider, index) => {
            const isOpen = openRowIndex === index
            return (
              <div
                key={index}
                className={`card overflow-hidden ${
                  provider.isHighlighted ? 'border-2 border-primary' : ''
                }`}
              >
                <button
                  onClick={() => toggleRow(index)}
                  className={`w-full p-6 flex justify-between items-center text-left transition-colors duration-200 ${
                    provider.isHighlighted ? 'bg-primary/5' : 'bg-muted/30'
                  } ${isOpen ? 'bg-muted/50' : ''}`}
                >
                  <div>
                    <div className='font-semibold mb-2'>{provider.name}</div>
                    <p className='text-muted text-small'>
                      {provider.description}
                    </p>
                  </div>
                  <ChevronIcon isOpen={isOpen} />
                </button>

                {isOpen && (
                  <div className='p-6 space-y-4'>
                    <div className='flex justify-between items-center'>
                      <span className='font-medium'>Speed</span>
                      {provider.speed ? <CheckIcon /> : <XIcon />}
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='font-medium'>Flexibility</span>
                      {provider.flexibility ? <CheckIcon /> : <XIcon />}
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='font-medium'>Quality</span>
                      {provider.quality ? <CheckIcon /> : <XIcon />}
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='font-medium'>Scalability</span>
                      {provider.scalability ? <CheckIcon /> : <XIcon />}
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='font-medium'>Affordability</span>
                      {provider.affordability ? <CheckIcon /> : <XIcon />}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ComparisonTable
