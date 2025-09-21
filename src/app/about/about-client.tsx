'use client'

import ScrollVideoSection from '@/components/ScrollVideoSection'
import { LinkButton } from '@/components/ui/button'

const processSteps = [
  {
    title: 'Revenue Opportunity Mapping',
    description:
      'Identify immediate profit opportunities, map revenue-critical user flows, and define metrics that directly impact your bottom line.',
    deliverables:
      'Revenue flow analysis, competitive profit audit, ROI projection models.',
    timeframe: '1–2 weeks',
    outcome:
      'Clear revenue targets, prioritized profit opportunities, and executive-approved investment thesis.',
  },
  {
    title: 'Build Profit-Optimized Product',
    description:
      'Architect and develop complete AI systems optimized for revenue generation, customer retention, and automated upselling.',
    deliverables:
      'Production-ready AI product, conversion-optimized interfaces, revenue automation systems.',
    timeframe: '6–10 weeks',
    outcome:
      'Launch-ready product with integrated payment flows, customer onboarding, and revenue tracking.',
  },
  {
    title: 'Deploy & Scale Revenue',
    description:
      'Launch with paying customers secured, activate growth engines, and optimize for compound revenue growth.',
    deliverables:
      'Customer acquisition system, growth automation, profit optimization dashboard.',
    timeframe: '2–4 weeks',
    outcome:
      'Live product generating revenue with self-optimizing growth systems and executive profit reporting.',
  },
]

export default function AboutClient() {
  return (
    <div className='container mx-auto px-4 py-16 pb-32 animate-fade-in'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='mb-6 font-heading max-w-7xl mx-auto'>
          We build AI products that generate profits, not presentations.
        </h1>
        <p className='lead max-w-3xl mx-auto mb-8'>
          Complete product ecosystems that deliver measurable ROI from launch.
          No fragmented vendors, no endless discovery, no someday promises.
        </p>
      </div>

      {/* Scroll-Animated Video Section */}
      <ScrollVideoSection
        videoId='1098766945'
        coverImage='/cover-about.webp'
        caption='Showreel: See how Pixelmojo fuses strategy, UX, and engineering to unlock measurable growth for product teams.'
      />

      {/* Value Proposition Section */}
      <div className='text-center mb-20'>
        <h2 className='mb-6 max-w-4xl mx-auto leading-snug !text-4xl md:!text-5xl lg:!text-6xl'>
          From zero to profitable AI product in 90 days
        </h2>
        <div className='mx-auto max-w-4xl space-y-6 text-left md:text-center'>
          <p className='text-muted text-lg leading-relaxed'>
            After 20+ years building profitable products for enterprises and
            startups, I built Pixelmojo to eliminate the gap between AI concepts
            and revenue reality. We architect, build, and deploy complete
            ecosystems that generate ROI from launch day.
          </p>
          <div className='grid gap-6 md:gap-8'>
            {/* Featured large card */}
            <div className='relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-8 text-center'>
              <h3 className='text-2xl font-heading text-primary mb-3'>
                90-day profitable launches
              </h3>
              <p className='text-lg leading-relaxed text-muted max-w-2xl mx-auto'>
                Ship complete AI products with paying customers from day one,
                not prototypes that need more funding.
              </p>
            </div>

            {/* Two column cards */}
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='group relative rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1'>
                <p className='text-sm font-semibold uppercase tracking-[0.12em] text-[#3CC29E] mb-2'>
                  Complete ecosystems that compound
                </p>
                <p className='text-base leading-relaxed text-muted'>
                  Every component optimized for revenue generation, upselling,
                  and retention from the first user interaction.
                </p>
              </div>

              <div className='group relative rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1'>
                <p className='text-sm font-semibold uppercase tracking-[0.12em] text-[#F48024] mb-2'>
                  Self-optimizing profit engines
                </p>
                <p className='text-base leading-relaxed text-muted'>
                  AI-powered systems that automatically improve conversion
                  rates, reduce churn, and identify expansion opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
        <h2 className='mt-12 mb-4 text-3xl font-heading'>Our Mission</h2>
        <div className='mx-auto max-w-4xl space-y-4 text-left md:text-center'>
          <p className='text-muted text-lg leading-relaxed'>
            Every product we build must generate more revenue than it costs to
            create. We transform AI concepts into profit-generating realities
            that pay for themselves.
          </p>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-primary mb-3'>
                Revenue-first architecture
              </p>
              <p className='text-sm leading-relaxed text-muted'>
                Every interface, workflow, and feature designed to maximize
                customer lifetime value and minimize churn.
              </p>
            </div>

            <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-[#3CC29E] mb-3'>
                Profit optimization loops
              </p>
              <p className='text-sm leading-relaxed text-muted'>
                AI systems that continuously identify and capitalize on revenue
                opportunities while reducing operational costs.
              </p>
            </div>

            <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-[#F48024] mb-3'>
                Self-funding growth engines
              </p>
              <p className='text-sm leading-relaxed text-muted'>
                Products that generate enough revenue to fund their own
                development, scaling, and market expansion.
              </p>
            </div>

            <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-primary mb-3'>
                Immediate ROI delivery
              </p>
              <p className='text-sm leading-relaxed text-muted'>
                Launch with paying customers secured, revenue streams activated,
                and growth metrics trending upward from day one.
              </p>
            </div>
          </div>
        </div>
        <div className='mt-12 max-w-5xl mx-auto'>
          <div className='gradient-surface relative overflow-hidden rounded-2xl border border-white/15 p-8 text-center shadow-lg shadow-primary/15 md:p-12'>
            <div className='relative z-10 space-y-5'>
              <h3 className='font-heading text-2xl text-white md:text-3xl'>
                What Pixelmojo Means
              </h3>
              <p className='mx-auto max-w-4xl text-lg leading-relaxed text-white/90'>
                Every{' '}
                <span className='font-extrabold text-[#3CC29E]'>pixel</span> we
                design and every bit of{' '}
                <span className='font-extrabold text-[#F48024]'>mojo</span>—that
                spark of insight—has one job: generate profits from day one. The
                intersecting forms in our logo represent the fusion of AI,
                design, and revenue optimization working in perfect sync to
                create products that pay for themselves.
              </p>
            </div>
          </div>
        </div>

        {/* Proven Results Section */}
        <div className='mt-16 max-w-5xl mx-auto'>
          <h2
            className='text-center font-heading text-3xl md:text-4xl'
            style={{ marginBottom: '3rem' }}
          >
            Proven Results That Generate Immediate ROI
          </h2>

          <div className='space-y-8'>
            {/* Recent Confidential Projects */}
            <div className='rounded-2xl border border-border/60 bg-card/70 p-6 md:p-8'>
              <h3 className='font-heading text-xl mb-4 text-primary'>
                Recent Confidential Projects
              </h3>
              <p className='text-muted leading-relaxed mb-4'>
                Recent confidential projects include launching an AI startup's
                complete brand ecosystem, building a custom logistics tracking
                system, and developing a real estate earnings tracking system
                with predictive profit analytics for a well-known local real
                estate company - all delivered on time and driving immediate
                business value.
              </p>
              <div className='flex items-center gap-2 text-sm text-primary font-medium'>
                <svg
                  className='w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                Protected by NDAs - serious clients, serious results
              </div>
            </div>

            {/* Measurable Impact Grid */}
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-center'>
                <div className='text-3xl font-heading text-primary mb-2'>
                  40+
                </div>
                <p className='text-sm font-medium mb-2'>
                  Successful Transformations
                </p>
                <p className='text-xs text-muted-foreground'>
                  Complete product ecosystems delivered
                </p>
              </div>

              <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-center'>
                <div className='text-3xl font-heading text-primary mb-2'>
                  20+ Years
                </div>
                <p className='text-sm font-medium mb-2'>
                  Deep Product Expertise
                </p>
                <p className='text-xs text-muted-foreground'>
                  Building profitable digital products
                </p>
              </div>

              <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-center'>
                <div className='text-3xl font-heading text-primary mb-2'>
                  90 Days
                </div>
                <p className='text-sm font-medium mb-2'>
                  Average Time to Profit
                </p>
                <p className='text-xs text-muted-foreground'>
                  From concept to revenue generation
                </p>
              </div>

              <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-center'>
                <div className='text-3xl font-heading text-primary mb-2'>
                  3x
                </div>
                <p className='text-sm font-medium mb-2'>
                  Conversion Improvements
                </p>
                <p className='text-xs text-muted-foreground'>
                  Through AI-enhanced interfaces
                </p>
              </div>

              <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-center'>
                <div className='text-3xl font-heading text-primary mb-2'>
                  100%
                </div>
                <p className='text-sm font-medium mb-2'>
                  Profit-First Approach
                </p>
                <p className='text-xs text-muted-foreground'>
                  Every product designed to pay for itself
                </p>
              </div>

              <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-center'>
                <div className='text-3xl font-heading text-primary mb-2'>
                  Enterprise
                </div>
                <p className='text-sm font-medium mb-2'>Scale & Adoption</p>
                <p className='text-xs text-muted-foreground'>
                  Design systems across product teams
                </p>
              </div>
            </div>

            {/* Key Differentiator */}
            <div className='rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-center'>
              <h3 className='font-heading text-xl mb-4'>
                Why Our Results Matter
              </h3>
              <p className='text-muted max-w-3xl mx-auto mb-6'>
                While others build prototypes that need more funding, we
                architect complete ecosystems that generate revenue from launch
                day. Every project is designed to pay for itself within 90 days,
                not someday.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <LinkButton
                  href='/contact-us'
                  size='lg'
                  variant='default'
                  shape='pill'
                >
                  Start Your 90-Day Profit Journey
                </LinkButton>
                <LinkButton
                  href='/services'
                  size='lg'
                  variant='outline'
                  shape='pill'
                >
                  View Our Process
                </LinkButton>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className='mt-24 max-w-6xl mx-auto px-4 md:px-0'>
          <h2
            className='text-center font-heading text-3xl md:text-4xl'
            style={{ marginBottom: '4rem' }}
          >
            How We Turn Concepts Into Profitable Products
          </h2>

          <div className='grid gap-6 md:grid-cols-3 md:gap-8'>
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className='group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card/60 p-6 text-left shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-primary md:p-8'
              >
                <span className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#3CC29E] font-heading text-base font-semibold text-white'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className='mt-4 text-xl font-heading'>{step.title}</h3>
                <p className='mt-4 text-muted leading-relaxed'>
                  {step.description}
                </p>
                <dl className='mt-6 space-y-4 text-sm text-muted-foreground'>
                  <div>
                    <dt className='font-medium text-foreground'>
                      Deliverables
                    </dt>
                    <dd className='mt-1 leading-relaxed'>
                      {step.deliverables}
                    </dd>
                  </div>
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <dt className='font-medium text-foreground'>Timeframe</dt>
                      <dd className='mt-1 leading-relaxed'>{step.timeframe}</dd>
                    </div>
                    <div className='relative inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-primary md:uppercase md:tracking-[0.18em]'>
                      <span className='h-2 w-2 rounded-full bg-primary' />
                      <span>Phase {index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <dt className='font-medium text-foreground'>Outcome</dt>
                    <dd className='mt-1 leading-relaxed'>{step.outcome}</dd>
                  </div>
                </dl>
                <span className='pointer-events-none absolute inset-x-6 bottom-5 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </article>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className='mt-24 max-w-6xl mx-auto px-4 md:px-0'>
          <h2
            className='text-center font-heading text-3xl md:text-4xl'
            style={{ marginBottom: '2rem' }}
          >
            Powered By Profit-Generating Technology
          </h2>

          <div className='text-center mb-12'>
            <p className='text-muted max-w-3xl mx-auto mb-6'>
              We don't chase trends, we use battle-tested technology that
              generates measurable profits. Each tool in our stack is selected
              for its ability to create, optimize, and scale revenue streams.
            </p>
            <div className='flex items-center justify-center gap-2 text-sm text-primary font-medium mb-8'>
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
              Proven to generate profits from day one
            </div>
          </div>

          <div className='grid gap-8 md:grid-cols-3 mb-12'>
            {/* AI & Automation Stack */}
            <div className='space-y-6'>
              <div className='text-center'>
                <h3 className='font-heading text-xl mb-3'>
                  AI & Intelligence Stack
                </h3>
                <p className='text-muted text-sm mb-6'>
                  Revenue-optimizing AI that learns and adapts
                </p>
              </div>
              <div className='space-y-3'>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>OpenAI GPT-4o</span>
                  <span className='text-xs text-muted-foreground'>
                    Product Intelligence
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>Claude Sonnet</span>
                  <span className='text-xs text-muted-foreground'>
                    Strategic Analysis
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>
                    Custom AI Pipelines
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    Growth Optimization
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>
                    Predictive Analytics
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    Revenue Forecasting
                  </span>
                </div>
              </div>
            </div>

            {/* Development Stack */}
            <div className='space-y-6'>
              <div className='text-center'>
                <h3 className='font-heading text-xl mb-3'>
                  Revenue-Optimized Development
                </h3>
                <p className='text-muted text-sm mb-6'>
                  Lightning-fast, conversion-focused interfaces
                </p>
              </div>
              <div className='space-y-3'>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>
                    React 19 + Next.js 15
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    Ultra-fast UIs
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>
                    TypeScript + Tailwind
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    Scalable Systems
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>Supabase</span>
                  <span className='text-xs text-muted-foreground'>
                    Real-time Data
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>Vercel Edge</span>
                  <span className='text-xs text-muted-foreground'>
                    Global Performance
                  </span>
                </div>
              </div>
            </div>

            {/* Growth Infrastructure */}
            <div className='space-y-6'>
              <div className='text-center'>
                <h3 className='font-heading text-xl mb-3'>
                  Growth Engine Infrastructure
                </h3>
                <p className='text-muted text-sm mb-6'>
                  Self-optimizing revenue systems
                </p>
              </div>
              <div className='space-y-3'>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>Custom Analytics</span>
                  <span className='text-xs text-muted-foreground'>
                    Revenue Attribution
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>
                    A/B Testing Engine
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    Conversion Optimization
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>
                    Payment Integration
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    Instant Monetization
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>Growth Dashboards</span>
                  <span className='text-xs text-muted-foreground'>
                    Executive Reporting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
