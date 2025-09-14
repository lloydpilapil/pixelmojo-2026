'use client'

import React from 'react'
import Image from 'next/image'

interface CompanyLogosProps {
  title?: string
  logos?: Array<{
    name: string
    src: string
    height?: number
  }>
}

const CompanyLogos = ({
  title = 'Helping Fortune 500 and startups grow smarter, faster, and stronger',
  logos = [
    { name: 'Egis', src: '/egis-vector-logo.svg', height: 40 },
    { name: 'Got Volunteers', src: '/got-volunteers-min.png', height: 40 },
    {
      name: 'Parsons Corporation',
      src: '/parsons-corporation-vector-logo-2022.svg',
      height: 40,
    },
    {
      name: 'Road Runner Logistics',
      src: '/road-runner-logistics.svg',
      height: 40,
    },
    { name: 'Salesforce', src: '/Salesforce.svg', height: 40 },
    { name: 'Vlocity', src: '/vlocity-logo.svg', height: 40 },
  ],
}: CompanyLogosProps) => {
  return (
    <section className='py-20 overflow-hidden'>
      <div className='container mx-auto px-4'>
        <h2 className='text-center mb-32'>{title}</h2>

        <div className='relative w-full pt-16'>
          {/* Left fade */}
          <div className='absolute left-0 top-16 z-10 w-20 h-full bg-gradient-to-r from-background to-transparent pointer-events-none'></div>

          {/* Right fade */}
          <div className='absolute right-0 top-16 z-10 w-20 h-full bg-gradient-to-l from-background to-transparent pointer-events-none'></div>

          <div className='flex animate-scroll'>
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className='flex-shrink-0 mx-8 w-40 h-20 flex items-center justify-center overflow-hidden'
              >
                <div className='w-full h-full flex items-center justify-center'>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={0}
                    height={logo.height || 40}
                    className='object-contain w-auto'
                    quality={100}
                    unoptimized={logo.src.includes('.png')}
                    style={{
                      height: `${logo.height || 40}px`,
                      imageRendering: 'crisp-edges',
                    }}
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless scroll */}
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className='flex-shrink-0 mx-8 w-40 h-20 flex items-center justify-center overflow-hidden'
              >
                <div className='w-full h-full flex items-center justify-center'>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={0}
                    height={logo.height || 40}
                    className='object-contain w-auto'
                    quality={100}
                    unoptimized={logo.src.includes('.png')}
                    style={{
                      height: `${logo.height || 40}px`,
                      imageRendering: 'crisp-edges',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyLogos
