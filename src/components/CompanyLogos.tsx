'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { LenisFadeIn } from '@/components/animations/LenisReveal'

interface CompanyLogosProps {
  title?: string
  logos?: Array<{
    name: string
    light: string
    dark: string
    height?: number
  }>
}

const CompanyLogos = ({
  title = 'Helping Fortune 500 and startups grow smarter, faster, and stronger',
  logos = [
    {
      name: 'Egis',
      light: '/egis-vector-logo-light.svg',
      dark: '/egis-vector-logo-dark.svg',
      height: 40,
    },
    {
      name: 'Got Volunteers',
      light: '/got-volunteers-min-light.png',
      dark: '/got-volunteers-min-dark.png',
      height: 40,
    },
    {
      name: 'Parsons Corporation',
      light: '/parsons-corporation-vector-logo-2022-light.svg',
      dark: '/parsons-corporation-vector-logo-2022-dark.svg',
      height: 40,
    },
    {
      name: 'Enterprise Logistics',
      light: '/road-runner-logistics-light.svg',
      dark: '/road-runner-logistics-dark.svg',
      height: 40,
    },
    {
      name: 'Salesforce',
      light: '/Salesforce-light.svg',
      dark: '/Salesforce-dark.svg',
      height: 40,
    },
    {
      name: 'Vlocity',
      light: '/vlocity-logo-light.svg',
      dark: '/vlocity-logo-dark.svg',
      height: 40,
    },
  ],
}: CompanyLogosProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    // Get current theme from document
    const currentTheme = document.documentElement.getAttribute('data-theme') as
      | 'light'
      | 'dark'
    setTheme(currentTheme || 'dark')

    // Listen for theme changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute(
            'data-theme'
          ) as 'light' | 'dark'
          setTheme(newTheme || 'dark')
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className='py-20 overflow-hidden'>
      <div className='container mx-auto px-4'>
        <LenisFadeIn>
          <h2 className='text-center mb-6 !text-xl md:!text-2xl lg:!text-3xl'>
            {title}
          </h2>
          <p className='text-center text-muted-foreground max-w-3xl mx-auto mb-32 text-lg leading-relaxed'>
            Trusted by industry leaders across sectors, from Fortune 500
            enterprises to innovative startups driving digital transformation.
          </p>
        </LenisFadeIn>

        <LenisFadeIn delay={200}>
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
                      src={theme === 'dark' ? logo.dark : logo.light}
                      alt={logo.name}
                      width={0}
                      height={logo.height || 40}
                      className='object-contain w-auto'
                      quality={100}
                      unoptimized={(theme === 'dark'
                        ? logo.dark
                        : logo.light
                      ).includes('.png')}
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
                      src={theme === 'dark' ? logo.dark : logo.light}
                      alt={logo.name}
                      width={0}
                      height={logo.height || 40}
                      className='object-contain w-auto'
                      quality={100}
                      unoptimized={(theme === 'dark'
                        ? logo.dark
                        : logo.light
                      ).includes('.png')}
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
        </LenisFadeIn>
      </div>
    </section>
  )
}

export default CompanyLogos
