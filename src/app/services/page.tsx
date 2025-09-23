import type { Metadata } from 'next'
import HeroVisual from '@/components/HeroVisual'
import ServicesGrid from './ServicesGrid'

export const metadata: Metadata = {
  title: 'AI Products That Generate ROI From Day One | Pixelmojo',
  description:
    'Complete product ecosystems that profit immediately. We design, develop, and deploy AI-powered solutions that generate measurable revenue from launch.',
  openGraph: {
    title: 'AI Products That Generate ROI From Day One | Pixelmojo',
    description:
      'Complete product ecosystems that profit immediately. We design, develop, and deploy AI-powered solutions that generate measurable revenue from launch.',
    type: 'website',
  },
}

export default function Services() {
  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='mb-6 font-heading max-w-6xl mx-auto'>
          Complete AI products built to generate revenue, fast.
        </h1>
        <p className='lead max-w-3xl mx-auto mb-8'>
          No fragmented vendors. No endless discovery. We design, develop, and
          deploy complete ecosystems that ship in weeks and scale immediately.
        </p>
      </div>

      {/* Hero Visual Section */}
      <HeroVisual
        src='/pixelmojo-service-hero-image.webp'
        alt='Pixelmojo AI product development services - complete ecosystems that generate revenue from day one'
        priority
        animation='reveal'
        variant='contained'
        caption='Complete AI product ecosystems built to generate measurable revenue from day one'
      />

      {/* Value Proposition Section */}
      <div className='text-center mb-20'>
        <h2 className='mb-6 max-w-5xl mx-auto leading-tight !text-4xl md:!text-5xl lg:!text-6xl'>
          Stop building features nobody wants. Start shipping products people
          pay for.
        </h2>
        <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed'>
          Every service engineered for measurable ROI. From AI development to
          growth automation, we deliver complete solutions that validate with
          real revenue. Built to scale, optimized to profit, designed to
          dominate.
        </p>
      </div>

      {/* Services Grid */}
      <ServicesGrid />
    </div>
  )
}
