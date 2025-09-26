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
          <div className='rounded-xl border border-destructive/20 bg-destructive/5 p-8 space-y-4'>
            <div className='flex items-center gap-2 mb-3'>
              <span
                className='px-2 py-1 text-xs font-medium rounded-full'
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                }}
              >
                The Problem
              </span>
            </div>
            <h3 className='text-sm font-semibold uppercase tracking-wide text-destructive/80'>
              If This Sounds Familiar
            </h3>
            <p className='text-sm md:text-base leading-relaxed text-muted-foreground'>
              Roadmaps stall, growth teams fight disconnected tools, and execs
              demand proof that every sprint ties to revenue. Pixelmojo replaces
              guesswork with a unified build, launch, and scale motion.
            </p>
          </div>

          {/* Solution Card - Positive emphasis */}
          <div className='rounded-xl border-2 border-primary/30 bg-primary/5 p-8 space-y-4'>
            <div className='flex items-center gap-2 mb-3'>
              <span className='px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary'>
                Our Solution
              </span>
            </div>
            <h3 className='text-sm font-semibold uppercase tracking-wide text-primary'>
              AI-Native Moves We Deploy
            </h3>
            <ol className='list-decimal pl-5 space-y-2 text-sm md:text-base text-foreground/90'>
              <li>
                Dual-LLM sprint partners to validate ideas before code ships.
              </li>
              <li>
                Automated research ops pulling live customer and market signals.
              </li>
              <li>
                Revenue telemetry wired into every prototype from day one.
              </li>
            </ol>
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
