'use client'

import ScrollVideoSection from '@/components/ScrollVideoSection'

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
          One partner from strategy to scale, no vendor chaos.
        </h1>
        <p className='lead max-w-3xl mx-auto mb-8'>
          We unite design, development, and AI expertise under one roof. The
          result? Complete product ecosystems that deliver measurable ROI from
          launch, not fragmented solutions that never ship.
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
          Strategy to scale, all under one roof
        </h2>
        <div className='mx-auto max-w-6xl space-y-6 text-left md:text-center'>
          <p className='text-muted text-lg leading-relaxed'>
            After 20+ years shipping products for enterprises and startups, I
            built Pixelmojo to solve the vendor chaos problem. Instead of
            juggling designers, developers, and AI consultants who don't talk to
            each other, you get one unified team that owns the entire journey
            from concept to customer.
          </p>
          <div className='grid gap-6 md:gap-8'>
            {/* Featured large card */}
            <div className='relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-8 text-center'>
              <h3 className='text-2xl font-heading text-primary mb-3'>
                Complete products that actually ship
              </h3>
              <p className='text-lg leading-relaxed text-muted max-w-2xl mx-auto'>
                Unified teams that deliver working products with real users and
                measurable results, not endless strategy decks.
              </p>
            </div>

            {/* Two column cards */}
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='group relative rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1'>
                <p className='text-sm font-semibold uppercase tracking-[0.12em] text-[#3CC29E] mb-2'>
                  No vendor chaos, one partner
                </p>
                <p className='text-base leading-relaxed text-muted'>
                  Strategy, design, development, and AI under one roof. No
                  juggling multiple teams that don't talk to each other.
                </p>
              </div>

              <div className='group relative rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1'>
                <p className='text-sm font-semibold uppercase tracking-[0.12em] text-[#F48024] mb-2'>
                  Products that ship and scale
                </p>
                <p className='text-base leading-relaxed text-muted'>
                  Complete ecosystems from concept to customer, built to grow
                  with your business and adapt to market changes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <h2 className='mt-12 mb-4 text-3xl font-heading'>Our Mission</h2>
        <div className='mx-auto max-w-6xl space-y-4 text-left md:text-center'>
          <p className='text-muted text-lg leading-relaxed'>
            End the vendor chaos. Unite strategy, design, and development under
            one partnership that owns the entire journey from concept to
            customer success.
          </p>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-primary mb-3'>
                Unified product strategy
              </p>
              <p className='text-sm leading-relaxed text-muted'>
                Strategy, design, and development working in sync to deliver
                complete products that solve real user problems.
              </p>
            </div>

            <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-[#3CC29E] mb-3'>
                Products that actually ship
              </p>
              <p className='text-sm leading-relaxed text-muted'>
                Working products with real users, not endless discovery phases
                or strategy decks that never see implementation.
              </p>
            </div>

            <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-[#F48024] mb-3'>
                Partnership accountability
              </p>
              <p className='text-sm leading-relaxed text-muted'>
                One team accountable for your success. No finger-pointing
                between vendors when deadlines slip or features break.
              </p>
            </div>

            <div className='rounded-2xl border border-border/60 bg-card/70 p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-primary mb-3'>
                Complete ecosystem delivery
              </p>
              <p className='text-sm leading-relaxed text-muted'>
                Strategy, design systems, working code, and launch support.
                Everything you need to go from concept to customer success.
              </p>
            </div>
          </div>
        </div>

        {/* Proven Results Section */}
        <div className='mt-16 max-w-6xl mx-auto'>
          <h2
            className='text-center font-heading text-3xl md:text-4xl'
            style={{ marginBottom: '3rem' }}
          >
            Proven Results That Generate Immediate ROI
          </h2>

          <div className='space-y-8'>
            {/* Recent Confidential Projects */}
            <div className='rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card/90 to-[#3CC29E]/10 p-6 md:p-8 shadow-md'>
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
              <div className='flex items-center justify-center gap-2 text-sm text-[#3CC29E] font-medium'>
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
                <div className='text-3xl font-heading text-[#3CC29E] mb-2'>
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
                <div className='text-3xl font-heading text-[#F48024] mb-2'>
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
                <div className='text-3xl font-heading text-[#3CC29E] mb-2'>
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
                <div className='text-3xl font-heading text-[#F48024] mb-2'>
                  Enterprise
                </div>
                <p className='text-sm font-medium mb-2'>Scale & Adoption</p>
                <p className='text-xs text-muted-foreground'>
                  Design systems across product teams
                </p>
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
            <div className='flex items-center justify-center gap-2 text-sm text-[#3CC29E] font-medium mb-8'>
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
            {/* AI & Intelligence Stack */}
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
                  <span className='text-sm font-medium'>Claude Opus 4.1</span>
                  <span className='text-xs text-muted-foreground'>
                    Strategic Analysis
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>GPT-5</span>
                  <span className='text-xs text-muted-foreground'>
                    Product Intelligence
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>Claude Code</span>
                  <span className='text-xs text-muted-foreground'>
                    Development Acceleration
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
                  <span className='text-sm font-medium'>LangChain</span>
                  <span className='text-xs text-muted-foreground'>
                    AI Workflow Orchestration
                  </span>
                </div>
              </div>
            </div>

            {/* Development Stack */}
            <div className='space-y-6'>
              <div className='text-center'>
                <h3 className='font-heading text-xl mb-3'>Development Stack</h3>
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
                  <span className='text-sm font-medium'>Cursor</span>
                  <span className='text-xs text-muted-foreground'>
                    AI-Enhanced Development
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>JetBrains IDEs</span>
                  <span className='text-xs text-muted-foreground'>
                    Professional Tooling
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

            {/* Design & Integration Stack */}
            <div className='space-y-6'>
              <div className='text-center'>
                <h3 className='font-heading text-xl mb-3'>
                  Design & Integration Stack
                </h3>
                <p className='text-muted text-sm mb-6'>
                  AI-powered design systems and integrations
                </p>
              </div>
              <div className='space-y-3'>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>Storybook</span>
                  <span className='text-xs text-muted-foreground'>
                    Component Documentation
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>Chromatic</span>
                  <span className='text-xs text-muted-foreground'>
                    Visual Testing & Review
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>
                    MCP (Model Context Protocol)
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    AI Tool Integration
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>Custom MCPs</span>
                  <span className='text-xs text-muted-foreground'>
                    Client-Specific AI Tools
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40'>
                  <span className='text-sm font-medium'>GitHub Copilot</span>
                  <span className='text-xs text-muted-foreground'>
                    Code Intelligence
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
