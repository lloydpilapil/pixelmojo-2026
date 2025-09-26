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
        <p className='lead max-w-3xl mx-auto mb-12'>
          No fragmented vendors. No endless discovery. We design, develop, and
          deploy complete ecosystems that ship in weeks and scale immediately.
        </p>
      </div>

      {/* Hero Visual Section - Moved before empathy cards */}
      <HeroVisual
        src='/pixelmojo-service-hero-image.webp'
        alt='Pixelmojo AI product development services - complete ecosystems that generate revenue from day one'
        priority
        animation='reveal'
        variant='contained'
        caption='Complete AI product ecosystems built to generate measurable revenue from day one'
      />

      {/* Empathy Cards - After visual for better flow */}
      <div className='max-w-5xl mx-auto mb-20 mt-16'>
        <div className='grid gap-8 lg:grid-cols-2 text-left'>
          {/* Problem Card - Subtle warning treatment */}
          <div className='rounded-2xl border border-destructive/20 bg-destructive/10 p-8 space-y-4'>
            <header className='flex items-center gap-2 mb-2'>
              <span
                className='px-2 py-1 text-xs font-semibold uppercase tracking-[0.3em] rounded-full'
                style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
              >
                The Problem
              </span>
            </header>
            <h3 className='text-sm font-semibold uppercase tracking-wide text-destructive/80'>
              If this sounds familiar
            </h3>
            <ul className='space-y-2 text-sm md:text-base text-muted-foreground'>
              <li>Roadmaps stall before they reach paying customers.</li>
              <li>
                Growth teams juggle disconnected tools and stale insights.
              </li>
              <li>Execs demand proof each sprint ties directly to revenue.</li>
            </ul>
          </div>

          {/* Solution Card - Positive emphasis */}
          <div className='rounded-2xl border border-primary/30 bg-primary/10 p-8 space-y-5'>
            <header className='flex items-center gap-2 mb-2'>
              <span
                className='px-2 py-1 text-xs font-semibold uppercase tracking-[0.3em] rounded-full'
                style={{ backgroundColor: '#0ea5e9', color: '#0b1120' }}
              >
                Our Solution
              </span>
            </header>
            <h3
              className='text-sm font-semibold uppercase tracking-wide'
              style={{ color: '#0ea5e9' }}
            >
              AI-native moves we run on every engagement
            </h3>
            <ul className='space-y-3 text-sm md:text-base text-foreground/90'>
              <li className='flex gap-3'>
                <span className='text-primary font-semibold'>1.</span>
                <span>
                  <strong>Validate faster:</strong> dual-LLM sprint partners
                  pressure-test ideas before engineering commits.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-primary font-semibold'>2.</span>
                <span>
                  <strong>Stay reality-checked:</strong> automated research ops
                  pull live customer and market signals each week.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-primary font-semibold'>3.</span>
                <span>
                  <strong>Prove the revenue:</strong> telemetry is wired into
                  every prototype from day one so leadership sees impact.
                </span>
              </li>
            </ul>
            <p className='text-xs uppercase tracking-wide text-primary/80'>
              Result: production-ready launches in 90 days with revenue signals
              on launch day.
            </p>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className='text-center mb-20'>
        <h2 className='mb-6 max-w-5xl mx-auto leading-tight !text-4xl md:!text-5xl lg:!text-6xl'>
          Build products people actually want to pay for.
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
