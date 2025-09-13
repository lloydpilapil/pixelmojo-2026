import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import ScrollVideoSection from '@/components/ScrollVideoSection'
import Services from '@/components/Services'
import BlogCTA from '@/components/BlogCTA'

const servicesData = [
  {
    icon: (
      <svg
        className='w-8 h-8 text-primary'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z'
        />
      </svg>
    ),
    title: 'Web Design & Development',
    description:
      'Creating responsive, high-converting websites that elevate your brand and drive business growth through strategic design.',
  },
  {
    icon: (
      <svg
        className='w-8 h-8 text-primary'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        />
      </svg>
    ),
    title: 'Brand Identity & Strategy',
    description:
      'Developing compelling brand identities and strategic positioning that resonates with your target audience and drives recognition.',
  },
  {
    icon: (
      <svg
        className='w-8 h-8 text-primary'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
        />
      </svg>
    ),
    title: 'Digital Marketing & SEO',
    description:
      'Comprehensive digital marketing strategies including SEO, content marketing, and performance optimization for measurable ROI.',
  },
]

export const metadata: Metadata = {
  title: 'PixelMojo | Design for Impact, Build for ROI',
  description:
    'We design digital experiences that drive measurable results. Transform your brand with strategic design and development.',
  openGraph: {
    title: 'PixelMojo | Design for Impact, Build for ROI',
    description: 'We design digital experiences that drive measurable results.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      <Hero
        title={
          <>
            WE <span className='text-accent'>DESIGN</span> FOR{' '}
            <span className='text-cta'>IMPACT</span>
            <span className='text-cta'>,</span> WE BUILD FOR{' '}
            <span
              className='text-growth underline decoration-growth underline-offset-4'
              style={{ textDecorationThickness: '10px' }}
            >
              ROI
            </span>
          </>
        }
        description='AI is transformative, but only when deployed strategically. We cut through the hype to identify and capture real business value. We integrate AI with clear purpose, build platforms, and deliver measurable ROI.'
        ctaText='See How We Drive Growth'
        ctaHref='/contact-us'
      />

      {/* Scroll-Animated Video Section */}
      <ScrollVideoSection videoId='1095336702' />

      <Services
        title='What We Do'
        description='Comprehensive digital solutions designed to elevate your brand and drive measurable business growth'
        services={servicesData}
      />

      <BlogCTA />
    </div>
  )
}
