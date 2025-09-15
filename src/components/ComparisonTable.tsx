'use client'

import React, { useState } from 'react'
import { CheckCircle, XCircle, ChevronDown } from 'lucide-react'

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

  const CheckIcon = ({
    isHighlighted = false,
  }: {
    isHighlighted?: boolean
  }) => (
    <div
      className={`flex justify-center ${isHighlighted ? 'animate-pulse' : ''}`}
    >
      <CheckCircle
        className={`w-6 h-6 ${isHighlighted ? 'text-primary' : 'text-secondary'} drop-shadow-sm`}
      />
    </div>
  )

  const XIcon = () => (
    <div className='flex justify-center'>
      <XCircle className='w-6 h-6 text-muted opacity-60' />
    </div>
  )

  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <ChevronDown
      className={`w-5 h-5 text-muted transition-all duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
    />
  )

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        {/* Enhanced Header */}
        <div className='text-center mb-20'>
          <div className='inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-6 uppercase tracking-wider'>
            {eyebrow}
          </div>
          <h2 className='mb-6'>{title}</h2>
          <p className='text-muted max-w-3xl mx-auto text-lg leading-relaxed'>
            Compare how PixelMojo stands out from traditional alternatives with
            our comprehensive approach to digital excellence.
          </p>
        </div>

        {/* Desktop Table - Redesigned */}
        <div className='hidden lg:block'>
          <div className='max-w-7xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border border-border'>
            {/* Header */}
            <div className='bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border'>
              <div className='grid grid-cols-6 gap-4 p-6'>
                <div className='font-semibold text-lg'>Solution</div>
                <div className='text-center font-semibold'>Speed</div>
                <div className='text-center font-semibold'>Flexibility</div>
                <div className='text-center font-semibold'>Quality</div>
                <div className='text-center font-semibold'>Scalability</div>
                <div className='text-center font-semibold'>Affordability</div>
              </div>
            </div>

            {/* Rows */}
            <div className='divide-y divide-border'>
              {providers.map((provider, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-6 gap-4 p-6 transition-all duration-300 hover:bg-muted/20 group ${
                    provider.isHighlighted
                      ? 'bg-gradient-to-r from-primary/5 to-secondary/5 border-l-4 border-l-primary shadow-lg'
                      : ''
                  }`}
                >
                  <div className='space-y-2'>
                    <div
                      className={`font-bold text-lg ${provider.isHighlighted ? 'text-primary' : ''}`}
                    >
                      {provider.name}
                      {provider.isHighlighted && (
                        <span className='ml-2 inline-block px-2 py-1 bg-primary text-white text-xs rounded-full'>
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className='text-muted text-sm leading-relaxed'>
                      {provider.description}
                    </p>
                  </div>
                  <div className='flex items-center'>
                    {provider.speed ? (
                      <CheckIcon isHighlighted={provider.isHighlighted} />
                    ) : (
                      <XIcon />
                    )}
                  </div>
                  <div className='flex items-center'>
                    {provider.flexibility ? (
                      <CheckIcon isHighlighted={provider.isHighlighted} />
                    ) : (
                      <XIcon />
                    )}
                  </div>
                  <div className='flex items-center'>
                    {provider.quality ? (
                      <CheckIcon isHighlighted={provider.isHighlighted} />
                    ) : (
                      <XIcon />
                    )}
                  </div>
                  <div className='flex items-center'>
                    {provider.scalability ? (
                      <CheckIcon isHighlighted={provider.isHighlighted} />
                    ) : (
                      <XIcon />
                    )}
                  </div>
                  <div className='flex items-center'>
                    {provider.affordability ? (
                      <CheckIcon isHighlighted={provider.isHighlighted} />
                    ) : (
                      <XIcon />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className='lg:hidden space-y-6'>
          {providers.map((provider, index) => {
            const isOpen = openRowIndex === index
            return (
              <div
                key={index}
                className={`bg-card rounded-2xl shadow-lg overflow-hidden border transition-all duration-300 ${
                  provider.isHighlighted
                    ? 'border-primary shadow-primary/10'
                    : 'border-border hover:shadow-xl'
                }`}
              >
                <button
                  onClick={() => toggleRow(index)}
                  className={`w-full p-6 flex justify-between items-start text-left transition-all duration-300 ${
                    provider.isHighlighted
                      ? 'bg-gradient-to-r from-primary/5 to-secondary/5'
                      : 'hover:bg-muted/20'
                  }`}
                >
                  <div className='flex-1 pr-4'>
                    <div
                      className={`font-bold text-lg mb-2 flex items-center ${provider.isHighlighted ? 'text-primary' : ''}`}
                    >
                      {provider.name}
                      {provider.isHighlighted && (
                        <span className='ml-2 px-2 py-1 bg-primary text-white text-xs rounded-full'>
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className='text-muted text-sm leading-relaxed'>
                      {provider.description}
                    </p>
                  </div>
                  <ChevronIcon isOpen={isOpen} />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='p-6 pt-0 space-y-4 border-t border-border/50'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='flex items-center justify-between p-3 bg-muted/20 rounded-lg'>
                        <span className='font-medium text-sm'>Speed</span>
                        {provider.speed ? (
                          <CheckIcon isHighlighted={provider.isHighlighted} />
                        ) : (
                          <XIcon />
                        )}
                      </div>
                      <div className='flex items-center justify-between p-3 bg-muted/20 rounded-lg'>
                        <span className='font-medium text-sm'>Flexibility</span>
                        {provider.flexibility ? (
                          <CheckIcon isHighlighted={provider.isHighlighted} />
                        ) : (
                          <XIcon />
                        )}
                      </div>
                      <div className='flex items-center justify-between p-3 bg-muted/20 rounded-lg'>
                        <span className='font-medium text-sm'>Quality</span>
                        {provider.quality ? (
                          <CheckIcon isHighlighted={provider.isHighlighted} />
                        ) : (
                          <XIcon />
                        )}
                      </div>
                      <div className='flex items-center justify-between p-3 bg-muted/20 rounded-lg'>
                        <span className='font-medium text-sm'>Scalability</span>
                        {provider.scalability ? (
                          <CheckIcon isHighlighted={provider.isHighlighted} />
                        ) : (
                          <XIcon />
                        )}
                      </div>
                    </div>
                    <div className='flex items-center justify-between p-3 bg-muted/20 rounded-lg'>
                      <span className='font-medium text-sm'>Affordability</span>
                      {provider.affordability ? (
                        <CheckIcon isHighlighted={provider.isHighlighted} />
                      ) : (
                        <XIcon />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ComparisonTable
