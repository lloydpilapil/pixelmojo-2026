import type { Metadata } from 'next'
import HeroVisual from '@/components/HeroVisual'
import ServicesGrid from './ServicesGrid'

export const metadata: Metadata = {
  title: 'AI Products That Generate ROI From Day One | Pixelmojo',
  description:
    'Complete product ecosystems that profit immediately. We design, develop, and deploy AI-powered solutions that generate measurable revenue from launch.',
  alternates: {
    canonical: 'https://pixelmojo.com/services',
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
      <section className='max-w-6xl mx-auto mb-20 mt-16 overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-background via-background to-background dark:from-[#0f0a12] dark:via-[#050b16] dark:to-[#030712]'>
        <div className='grid gap-0 md:grid-cols-2'>
          <div className='p-10 md:p-12 border-b md:border-b-0 md:border-r border-border/40 bg-muted/10 text-foreground dark:bg-white/5 dark:text-white'>
            <header className='mb-6'>
              <span className='inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.35em] text-white bg-[#f43f5e]'>
                The Problem
              </span>
            </header>
            <h3 className='font-heading text-lg uppercase tracking-[0.25em] mb-6'>
              If this sounds familiar
            </h3>
            <ul className='space-y-4 text-sm md:text-base text-muted-foreground dark:text-white/80'>
              <li className='flex gap-3'>
                <span className='mt-2 h-1.5 w-1.5 rounded-full bg-[#f43f5e]' />
                <span>
                  Roadmaps stall before they ever reach paying customers.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='mt-2 h-1.5 w-1.5 rounded-full bg-[#f43f5e]' />
                <span>
                  Growth teams juggle disconnected tools and stale insight.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='mt-2 h-1.5 w-1.5 rounded-full bg-[#f43f5e]' />
                <span>
                  Leadership keeps asking how every sprint maps to revenue.
                </span>
              </li>
            </ul>
          </div>
          <div className='p-10 md:p-12 bg-primary/5 text-foreground dark:bg-white/10 dark:text-white'>
            <header className='mb-6'>
              <span className='inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.35em] text-background bg-primary dark:text-[#0b1120] dark:bg-[#38bdf8]'>
                Our Solution
              </span>
            </header>
            <h3 className='font-heading text-lg uppercase tracking-[0.25em] mb-6 text-primary dark:text-[#38bdf8]'>
              AI-native moves we run on every engagement
            </h3>
            <ul className='space-y-4 text-sm md:text-base text-foreground dark:text-white'>
              <li className='flex gap-4'>
                <span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold dark:bg-[#38bdf8]/20 dark:text-[#38bdf8]'>
                  1
                </span>
                <span>
                  <strong>Validate faster:</strong> dual-LLM sprint partners
                  pressure-test ideas before engineering commits.
                </span>
              </li>
              <li className='flex gap-4'>
                <span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold dark:bg-[#38bdf8]/20 dark:text-[#38bdf8]'>
                  2
                </span>
                <span>
                  <strong>Stay reality-checked:</strong> automated research ops
                  pull live customer and market signals each week.
                </span>
              </li>
              <li className='flex gap-4'>
                <span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold dark:bg-[#38bdf8]/20 dark:text-[#38bdf8]'>
                  3
                </span>
                <span>
                  <strong>Prove the revenue:</strong> telemetry is wired into
                  every prototype from day one so leadership sees impact.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <footer className='border-t border-border/50 bg-muted/20 px-10 py-4 md:px-12 text-xs uppercase tracking-[0.3em] text-muted-foreground text-center dark:bg-black/50 dark:text-white/70'>
          Result: production-ready launches in 90 days with revenue telemetry
          live from day one.
        </footer>
      </section>

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
