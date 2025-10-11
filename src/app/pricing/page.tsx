'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Hero from '@/components/Hero'
import { LinkButton } from '@/components/ui/button'
import { Check, X, ChevronDown, Zap, Target, TrendingUp } from 'lucide-react'
import {
  LenisFadeIn,
  LenisStaggered,
} from '@/components/animations/LenisReveal'

export default function PricingPage() {
  const searchParams = useSearchParams()
  const persona = searchParams.get('persona') // 'startup', 'saas', or null
  const [openComparison, setOpenComparison] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Personalized messaging based on persona
  const getPersonaMessage = () => {
    if (persona === 'startup') {
      return 'Pricing designed for Philippine startups who need to prove ROI fast without breaking the bank.'
    }
    if (persona === 'saas') {
      return 'Performance-based pricing for B2B/SaaS companies ready to scale conversion rates.'
    }
    return 'Most agencies charge $8K-15K/month regardless of results. We prove ourselves in 60 days, then partner with you on performance-based subscriptions for continuous growth.'
  }

  const getEyebrow = () => {
    if (persona === 'startup') return 'For Startup Founders'
    if (persona === 'saas') return 'For B2B/SaaS Companies'
    return 'Pricing Model'
  }

  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      {/* Hero Section */}
      <Hero
        title={
          <>
            Stop paying for promises.{' '}
            <span className='text-growth'>Start paying for performance.</span>
          </>
        }
        description={getPersonaMessage()}
        ctaText='Book Discovery Call'
        ctaHref='/contact-us'
        secondaryCta={{
          text: 'See How It Works',
          href: '#journey',
          variant: 'outline',
        }}
        eyebrow={getEyebrow()}
      />

      {/* Problem/Solution Empathy Cards */}
      <LenisFadeIn delay={200}>
        <section className='max-w-6xl mx-auto mb-32 overflow-hidden border border-border bg-gradient-to-r from-background via-background to-background dark:from-[#0f0a12] dark:via-[#050b16] dark:to-[#030712]'>
          <div className='grid gap-0 md:grid-cols-2'>
            <div className='p-10 md:p-12 border-b md:border-b-0 md:border-r border-border/40 bg-muted/10 text-foreground dark:bg-white/5 dark:text-white'>
              <header className='mb-6'>
                <span className='inline-flex items-center px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white bg-destructive'>
                  Traditional Agency Model
                </span>
              </header>
              <h3 className='font-heading text-lg uppercase tracking-[0.25em] mb-6'>
                The Problem With Retainers
              </h3>
              <ul className='space-y-4 text-sm md:text-base text-muted-foreground dark:text-white/80'>
                <li className='flex gap-3'>
                  <X className='h-5 w-5 text-destructive mt-0.5 flex-shrink-0' />
                  <span>6-12 month commitments before proving value</span>
                </li>
                <li className='flex gap-3'>
                  <X className='h-5 w-5 text-destructive mt-0.5 flex-shrink-0' />
                  <span>$8K-15K/month regardless of results delivered</span>
                </li>
                <li className='flex gap-3'>
                  <X className='h-5 w-5 text-destructive mt-0.5 flex-shrink-0' />
                  <span>
                    2-3 month onboarding cycles before seeing progress
                  </span>
                </li>
                <li className='flex gap-3'>
                  <X className='h-5 w-5 text-destructive mt-0.5 flex-shrink-0' />
                  <span>Creative "process" over measurable outcomes</span>
                </li>
              </ul>
            </div>
            <div className='p-10 md:p-12 bg-primary/5 text-foreground dark:bg-white/10 dark:text-white'>
              <header className='mb-6'>
                <span className='inline-flex items-center px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-background bg-primary dark:text-[#0b1120] dark:bg-[#38bdf8]'>
                  Our 2-Step Model
                </span>
              </header>
              <h3 className='font-heading text-lg uppercase tracking-[0.25em] mb-6 text-primary dark:text-[#38bdf8]'>
                Performance-Based Pricing
              </h3>
              <ul className='space-y-4 text-sm md:text-base text-foreground dark:text-white'>
                <li className='flex gap-4'>
                  <span className='flex h-8 w-8 items-center justify-center bg-primary/15 text-primary font-semibold dark:bg-[#38bdf8]/20 dark:text-[#38bdf8]'>
                    1
                  </span>
                  <span>
                    <strong>60-day proof of value:</strong> See results before
                    long-term commitment
                  </span>
                </li>
                <li className='flex gap-4'>
                  <span className='flex h-8 w-8 items-center justify-center bg-primary/15 text-primary font-semibold dark:bg-[#38bdf8]/20 dark:text-[#38bdf8]'>
                    2
                  </span>
                  <span>
                    <strong>Then scale with subscription:</strong>{' '}
                    Month-to-month flexibility with performance bonuses
                  </span>
                </li>
                <li className='flex gap-4'>
                  <span className='flex h-8 w-8 items-center justify-center bg-primary/15 text-primary font-semibold dark:bg-[#38bdf8]/20 dark:text-[#38bdf8]'>
                    3
                  </span>
                  <span>
                    <strong>We profit when you profit:</strong> Quarterly
                    bonuses align our success with yours
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <footer className='border-t border-border/50 bg-muted/20 px-10 py-4 md:px-12 text-xs uppercase tracking-[0.3em] text-muted-foreground text-center dark:bg-black/50 dark:text-white/70'>
            Result: Prove ROI in 60 days → Scale with performance-based
            subscriptions
          </footer>
        </section>
      </LenisFadeIn>

      {/* The Journey: Sprint → Subscription */}
      <section id='journey' className='mb-32'>
        <LenisFadeIn delay={300}>
          <div className='text-center mb-16'>
            <div className='inline-block px-4 py-2 bg-primary/10 border border-primary/30 mb-4'>
              <span className='text-xs font-semibold uppercase tracking-wider text-primary'>
                The Journey
              </span>
            </div>
            <h2 className='mb-6 max-w-5xl mx-auto leading-tight !text-4xl md:!text-5xl lg:!text-6xl'>
              How It Works: Sprint → Subscribe
            </h2>
            <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed'>
              Step 1: Prove value in 60 days. Step 2: Scale with ongoing
              optimization (optional).
            </p>
          </div>
        </LenisFadeIn>

        <div className='max-w-5xl mx-auto mb-16'>
          <div className='relative'>
            {/* Connecting line */}
            <div className='hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-growth to-secondary -translate-y-1/2' />

            <div className='relative grid md:grid-cols-2 gap-12 md:gap-8'>
              {/* Step 1: Sprint */}
              <LenisFadeIn delay={400}>
                <div className='relative bg-card border-2 border-primary p-8 shadow-xl'>
                  <div className='absolute -top-4 left-8 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-2'>
                    <Zap className='h-3 w-3' />
                    Step 1: Start Here
                  </div>
                  <h3 className='text-2xl font-bold mb-3 text-foreground flex items-center gap-2'>
                    <span className='flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground font-bold rounded-full'>
                      1
                    </span>
                    60-Day Conversion Sprint
                  </h3>
                  <p className='text-sm text-muted-foreground mb-6'>
                    Required. Prove value before you commit long-term.
                  </p>

                  <div className='space-y-4 mb-6'>
                    <div className='flex items-baseline gap-3'>
                      <span className='text-3xl font-bold text-foreground'>
                        ₱180,000
                      </span>
                      <span className='text-sm text-muted-foreground'>
                        PH Startups (~$3,200 USD)
                      </span>
                    </div>
                    <div className='flex items-baseline gap-3'>
                      <span className='text-3xl font-bold text-foreground'>
                        $4,500
                      </span>
                      <span className='text-sm text-muted-foreground'>
                        Global/US Clients
                      </span>
                    </div>
                  </div>

                  <div className='bg-muted/30 p-4 mb-6 border-l-4 border-primary'>
                    <p className='text-xs font-semibold text-primary mb-2 uppercase tracking-wider'>
                      What You Get
                    </p>
                    <ul className='space-y-2 text-sm text-foreground'>
                      <li className='flex gap-2'>
                        <Check className='h-4 w-4 text-primary mt-0.5 flex-shrink-0' />
                        <span>Analytics audit + conversion baseline</span>
                      </li>
                      <li className='flex gap-2'>
                        <Check className='h-4 w-4 text-primary mt-0.5 flex-shrink-0' />
                        <span>AI-optimized landing page/funnel</span>
                      </li>
                      <li className='flex gap-2'>
                        <Check className='h-4 w-4 text-primary mt-0.5 flex-shrink-0' />
                        <span>3-5 A/B tests with real traffic</span>
                      </li>
                      <li className='flex gap-2'>
                        <Check className='h-4 w-4 text-primary mt-0.5 flex-shrink-0' />
                        <span>60-day performance report</span>
                      </li>
                    </ul>
                  </div>

                  <div className='p-3 bg-growth/10 border border-growth/30'>
                    <p className='text-sm font-semibold text-growth'>
                      ✓ 70% of clients see 15-40% conversion lift
                    </p>
                  </div>
                </div>
              </LenisFadeIn>

              {/* Step 2: Subscription */}
              <LenisFadeIn delay={500}>
                <div className='relative bg-card border-2 border-growth p-8 shadow-xl'>
                  <div className='absolute -top-4 left-8 bg-growth text-white px-4 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-2'>
                    <TrendingUp className='h-3 w-3' />
                    Step 2: Scale (Optional)
                  </div>
                  <h3 className='text-2xl font-bold mb-3 text-foreground flex items-center gap-2'>
                    <span className='flex h-10 w-10 items-center justify-center bg-growth text-white font-bold rounded-full'>
                      2
                    </span>
                    AI Growth Subscription
                  </h3>
                  <p className='text-sm text-muted-foreground mb-6'>
                    For Sprint graduates who want continuous growth.
                  </p>

                  <div className='space-y-3 mb-6'>
                    <div className='p-3 border border-border bg-background/50'>
                      <div className='flex items-baseline gap-2 mb-1'>
                        <span className='text-2xl font-bold text-foreground'>
                          $2,000
                        </span>
                        <span className='text-sm text-muted-foreground'>
                          /month
                        </span>
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        Starter (PH: ₱70K/mo)
                      </p>
                    </div>

                    <div className='p-3 border-2 border-growth bg-growth/5'>
                      <div className='flex items-baseline gap-2 mb-1'>
                        <span className='text-2xl font-bold text-foreground'>
                          $3,500
                        </span>
                        <span className='text-sm text-muted-foreground'>
                          /month
                        </span>
                      </div>
                      <p className='text-xs text-growth font-semibold'>
                        Growth (PH: ₱120K/mo) • Most Popular
                      </p>
                    </div>

                    <div className='p-3 border border-border bg-background/50'>
                      <div className='flex items-baseline gap-2 mb-1'>
                        <span className='text-2xl font-bold text-foreground'>
                          $10K-$25K
                        </span>
                        <span className='text-sm text-muted-foreground'>
                          /month
                        </span>
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        Elite (PH: ₱350K-₱850K/mo)
                      </p>
                    </div>
                  </div>

                  <div className='bg-muted/30 p-4 mb-6 border-l-4 border-growth'>
                    <p className='text-xs font-semibold text-growth mb-2 uppercase tracking-wider'>
                      Key Benefits
                    </p>
                    <ul className='space-y-2 text-sm text-foreground'>
                      <li className='flex gap-2'>
                        <Check className='h-4 w-4 text-growth mt-0.5 flex-shrink-0' />
                        <span>Month-to-month (cancel anytime)</span>
                      </li>
                      <li className='flex gap-2'>
                        <Check className='h-4 w-4 text-growth mt-0.5 flex-shrink-0' />
                        <span>Continuous optimization</span>
                      </li>
                      <li className='flex gap-2'>
                        <Check className='h-4 w-4 text-growth mt-0.5 flex-shrink-0' />
                        <span>Performance bonuses included</span>
                      </li>
                      <li className='flex gap-2'>
                        <Check className='h-4 w-4 text-growth mt-0.5 flex-shrink-0' />
                        <span>Live analytics dashboard</span>
                      </li>
                    </ul>
                  </div>

                  <div className='p-3 bg-primary/10 border border-primary/30'>
                    <p className='text-sm font-semibold text-primary'>
                      ✓ 70% of Sprint clients move to subscription
                    </p>
                  </div>
                </div>
              </LenisFadeIn>
            </div>
          </div>
        </div>

        <LenisFadeIn delay={600}>
          <div className='text-center max-w-3xl mx-auto'>
            <div className='p-6 bg-gradient-to-r from-primary/10 via-growth/10 to-secondary/10 border border-border'>
              <p className='text-lg font-semibold text-foreground mb-2'>
                Start with Sprint → See results → Then decide if subscription
                makes sense
              </p>
              <p className='text-sm text-muted-foreground'>
                No pressure, no long-term commitment. Just measurable results in
                60 days.
              </p>
            </div>
          </div>
        </LenisFadeIn>
      </section>

      {/* Subscription Tier Details */}
      <section className='mb-32'>
        <LenisFadeIn delay={200}>
          <div className='text-center mb-16'>
            <div className='inline-block px-4 py-2 bg-growth/10 border border-growth/30 mb-4'>
              <span className='text-xs font-semibold uppercase tracking-wider text-growth'>
                AI Growth Subscription
              </span>
            </div>
            <h2 className='mb-6 max-w-5xl mx-auto leading-tight !text-4xl md:!text-5xl lg:!text-6xl'>
              Subscription Tiers
            </h2>
            <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed'>
              Choose the tier that matches your growth stage. All include
              performance bonuses.
            </p>
          </div>
        </LenisFadeIn>

        <LenisStaggered delay={300} staggerDelay={150}>
          <div className='grid gap-8 md:grid-cols-3 max-w-7xl mx-auto'>
            {/* Starter Tier */}
            <div className='relative border-2 border-border p-8 bg-card/70 hover:border-primary transition-all'>
              <div className='mb-6'>
                <h3 className='text-xl font-bold mb-2 text-foreground'>
                  Starter
                </h3>
                <p className='text-sm text-muted-foreground'>
                  AI Sprint Subscription
                </p>
              </div>

              <div className='mb-6'>
                <div className='flex items-baseline gap-2 mb-2'>
                  <span className='text-4xl font-bold text-foreground'>
                    $2,000
                  </span>
                  <span className='text-muted-foreground'>/month</span>
                </div>
                <p className='text-sm text-muted-foreground'>
                  PH Startups: ₱70,000/month
                </p>
              </div>

              <ul className='space-y-3 mb-8'>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                  <span>1 monthly conversion sprint</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                  <span>Always-on analytics dashboard</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                  <span>Up to 3 A/B tests per month</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                  <span>Quarterly strategy call</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                  <span>Cancel anytime (30-day notice)</span>
                </li>
              </ul>

              <LinkButton
                href='/contact-us'
                variant='outline'
                className='w-full'
              >
                Get Started →
              </LinkButton>
            </div>

            {/* Growth Tier */}
            <div className='relative border-2 border-growth p-8 bg-growth/5 shadow-xl scale-105'>
              <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-growth text-white px-4 py-1 text-xs font-bold uppercase tracking-wider'>
                Most Popular
              </div>

              <div className='mb-6'>
                <h3 className='text-xl font-bold mb-2 text-foreground'>
                  Growth
                </h3>
                <p className='text-sm text-muted-foreground'>
                  AI Optimization Partner
                </p>
              </div>

              <div className='mb-6'>
                <div className='flex items-baseline gap-2 mb-2'>
                  <span className='text-4xl font-bold text-foreground'>
                    $3,500
                  </span>
                  <span className='text-muted-foreground'>/month</span>
                </div>
                <p className='text-sm text-muted-foreground'>
                  PH: ₱120,000/month
                </p>
              </div>

              <p className='text-xs font-semibold text-growth mb-4 uppercase tracking-wider'>
                Everything in Starter, PLUS:
              </p>

              <ul className='space-y-3 mb-8'>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-growth mt-0.5 flex-shrink-0' />
                  <span>Brand system maintenance</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-growth mt-0.5 flex-shrink-0' />
                  <span>Funnel + campaign management</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-growth mt-0.5 flex-shrink-0' />
                  <span>Dedicated AI/UX manager</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-growth mt-0.5 flex-shrink-0' />
                  <span>Priority support (72hr turnaround)</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-growth mt-0.5 flex-shrink-0' />
                  <span>Higher performance bonuses</span>
                </li>
              </ul>

              <LinkButton
                href='/contact-us'
                variant='default'
                className='w-full'
              >
                Get Started →
              </LinkButton>
            </div>

            {/* Elite Tier */}
            <div className='relative border-2 border-secondary p-8 bg-card/70 hover:border-secondary transition-all'>
              <div className='mb-6'>
                <h3 className='text-xl font-bold mb-2 text-foreground'>
                  Elite
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Full-Stack AI Productization
                </p>
              </div>

              <div className='mb-6'>
                <div className='flex items-baseline gap-2 mb-2'>
                  <span className='text-3xl font-bold text-foreground'>
                    $10K-$25K
                  </span>
                  <span className='text-muted-foreground'>/month</span>
                </div>
                <p className='text-sm text-muted-foreground'>
                  PH: ₱350K-₱850K/month
                </p>
              </div>

              <p className='text-xs font-semibold text-secondary mb-4 uppercase tracking-wider'>
                For high-growth startups:
              </p>

              <ul className='space-y-3 mb-8'>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-secondary mt-0.5 flex-shrink-0' />
                  <span>Unlimited design/dev sprints</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-secondary mt-0.5 flex-shrink-0' />
                  <span>Growth consulting + engineering</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-secondary mt-0.5 flex-shrink-0' />
                  <span>Executive reporting</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-secondary mt-0.5 flex-shrink-0' />
                  <span>Live codebase integration</span>
                </li>
                <li className='flex gap-3 items-start text-sm'>
                  <Check className='h-5 w-5 text-secondary mt-0.5 flex-shrink-0' />
                  <span>Custom performance targets</span>
                </li>
              </ul>

              <LinkButton
                href='/contact-us'
                variant='outline'
                className='w-full'
              >
                Request Quote →
              </LinkButton>
            </div>
          </div>
        </LenisStaggered>

        {/* Performance Bonuses - Applies to All Tiers */}
        <LenisFadeIn delay={600}>
          <div className='max-w-4xl mx-auto mt-16 p-8 border-2 border-growth/30 bg-growth/5'>
            <div className='text-center mb-8'>
              <h3 className='text-2xl font-bold mb-3 text-foreground'>
                Performance Bonuses{' '}
                <span className='text-growth'>(Included in All Tiers)</span>
              </h3>
              <p className='text-sm text-muted-foreground'>
                Paid quarterly when we exceed conversion targets. We profit when
                you profit.
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-6'>
              <div className='p-6 bg-background border border-border'>
                <div className='text-center mb-3'>
                  <div className='text-3xl font-bold text-growth mb-2'>
                    15-25%
                  </div>
                  <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                    Conversion Lift
                  </p>
                </div>
                <div className='text-center pt-4 border-t border-border'>
                  <div className='text-xl font-bold text-foreground mb-1'>
                    +$1,000
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    per month (₱30K PH)
                  </p>
                </div>
              </div>

              <div className='p-6 bg-growth/10 border-2 border-growth'>
                <div className='text-center mb-3'>
                  <div className='text-3xl font-bold text-growth mb-2'>
                    25-40%
                  </div>
                  <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                    Conversion Lift
                  </p>
                </div>
                <div className='text-center pt-4 border-t border-growth/30'>
                  <div className='text-xl font-bold text-foreground mb-1'>
                    +$2,500
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    per month (₱75K PH)
                  </p>
                </div>
              </div>

              <div className='p-6 bg-background border border-border'>
                <div className='text-center mb-3'>
                  <div className='text-3xl font-bold text-growth mb-2'>
                    40%+
                  </div>
                  <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                    Conversion Lift
                  </p>
                </div>
                <div className='text-center pt-4 border-t border-border'>
                  <div className='text-xl font-bold text-foreground mb-1'>
                    +$5,000
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    per month (₱150K PH)
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-8 text-center'>
              <p className='text-sm text-muted-foreground'>
                <strong className='text-foreground'>
                  No results? No bonus.
                </strong>{' '}
                That's alignment.
              </p>
            </div>
          </div>
        </LenisFadeIn>
      </section>

      {/* Comparison Table */}
      <section className='mb-32'>
        <LenisFadeIn delay={200}>
          <div className='text-center mb-16'>
            <h2 className='mb-6 max-w-5xl mx-auto leading-tight !text-4xl md:!text-5xl lg:!text-6xl'>
              How We're Different
            </h2>
            <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed'>
              Traditional agencies vs PixelMojo's performance-based model
            </p>
          </div>
        </LenisFadeIn>

        {/* Desktop Table - Hidden on mobile */}
        <div className='hidden md:block max-w-6xl mx-auto overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='border-b-2 border-border'>
                <th className='text-left p-4 font-heading text-sm uppercase tracking-wider text-foreground'>
                  Feature
                </th>
                <th className='text-center p-4 font-heading text-sm uppercase tracking-wider text-destructive'>
                  Traditional Agencies
                </th>
                <th className='text-center p-4 font-heading text-sm uppercase tracking-wider text-primary bg-primary/5'>
                  PixelMojo
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-border'>
                <td className='p-4 text-sm font-semibold text-foreground'>
                  Commitment
                </td>
                <td className='p-4 text-center text-sm text-muted-foreground'>
                  6-12 months
                </td>
                <td className='p-4 text-center text-sm font-semibold text-primary bg-primary/5'>
                  60 days (Sprint) → Month-to-month
                </td>
              </tr>
              <tr className='border-b border-border'>
                <td className='p-4 text-sm font-semibold text-foreground'>
                  Time to Results
                </td>
                <td className='p-4 text-center text-sm text-muted-foreground'>
                  2-3 months
                </td>
                <td className='p-4 text-center text-sm font-semibold text-primary bg-primary/5'>
                  14 days (first sprint)
                </td>
              </tr>
              <tr className='border-b border-border'>
                <td className='p-4 text-sm font-semibold text-foreground'>
                  Monthly Cost
                </td>
                <td className='p-4 text-center text-sm text-muted-foreground'>
                  $8K-$15K
                </td>
                <td className='p-4 text-center text-sm font-semibold text-primary bg-primary/5'>
                  $2K-$3.5K (after Sprint)
                </td>
              </tr>
              <tr className='border-b border-border'>
                <td className='p-4 text-sm font-semibold text-foreground'>
                  Performance Incentive
                </td>
                <td className='p-4 text-center'>
                  <X className='h-5 w-5 text-destructive mx-auto' />
                </td>
                <td className='p-4 text-center bg-primary/5'>
                  <Check className='h-5 w-5 text-primary mx-auto' />
                </td>
              </tr>
              <tr className='border-b border-border'>
                <td className='p-4 text-sm font-semibold text-foreground'>
                  Speed
                </td>
                <td className='p-4 text-center text-sm text-muted-foreground'>
                  4-8 weeks/project
                </td>
                <td className='p-4 text-center text-sm font-semibold text-primary bg-primary/5'>
                  2-week sprints
                </td>
              </tr>
              <tr>
                <td className='p-4 text-sm font-semibold text-foreground'>
                  Risk
                </td>
                <td className='p-4 text-center text-sm text-muted-foreground'>
                  Pay regardless of results
                </td>
                <td className='p-4 text-center text-sm font-semibold text-primary bg-primary/5'>
                  Prove value first (Sprint)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Accordion - Visible on mobile only */}
        <div className='md:hidden max-w-2xl mx-auto space-y-3'>
          {[
            {
              feature: 'Commitment',
              traditional: '6-12 months',
              pixelmojo: '60 days (Sprint) → Month-to-month',
              icon: null,
            },
            {
              feature: 'Time to Results',
              traditional: '2-3 months',
              pixelmojo: '14 days (first sprint)',
              icon: null,
            },
            {
              feature: 'Monthly Cost',
              traditional: '$8K-$15K',
              pixelmojo: '$2K-$3.5K (after Sprint)',
              icon: null,
            },
            {
              feature: 'Performance Incentive',
              traditional: 'no',
              pixelmojo: 'yes',
              icon: true,
            },
            {
              feature: 'Speed',
              traditional: '4-8 weeks/project',
              pixelmojo: '2-week sprints',
              icon: null,
            },
            {
              feature: 'Risk',
              traditional: 'Pay regardless of results',
              pixelmojo: 'Prove value first (Sprint)',
              icon: null,
            },
          ].map((item, index) => (
            <div key={index} className='border border-border bg-card/70'>
              <button
                onClick={() =>
                  setOpenComparison(openComparison === index ? null : index)
                }
                className='w-full p-4 flex items-center justify-between text-left'
              >
                <span className='text-sm font-semibold text-foreground'>
                  {item.feature}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ease-in-out ${
                    openComparison === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openComparison === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className='px-4 pb-4 space-y-4 border-t border-border'>
                  <div className='pt-4'>
                    <p className='text-xs uppercase tracking-wider text-destructive mb-2 font-semibold'>
                      Traditional Agencies
                    </p>
                    {item.icon === true ? (
                      <X className='h-5 w-5 text-destructive' />
                    ) : item.icon === false ? (
                      <Check className='h-5 w-5 text-primary' />
                    ) : (
                      <p className='text-sm text-muted-foreground'>
                        {item.traditional}
                      </p>
                    )}
                  </div>

                  <div className='p-3 bg-primary/5 border-l-2 border-primary'>
                    <p className='text-xs uppercase tracking-wider text-primary mb-2 font-semibold'>
                      PixelMojo
                    </p>
                    {item.icon === true ? (
                      <Check className='h-5 w-5 text-primary' />
                    ) : (
                      <p className='text-sm font-semibold text-foreground'>
                        {item.pixelmojo}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className='mb-32'>
        <LenisFadeIn delay={200}>
          <div className='text-center mb-16'>
            <h2 className='mb-6 max-w-5xl mx-auto leading-tight !text-4xl md:!text-5xl lg:!text-6xl'>
              Frequently Asked Questions
            </h2>
          </div>
        </LenisFadeIn>

        <div className='max-w-4xl mx-auto space-y-4'>
          <LenisStaggered delay={300} staggerDelay={100}>
            {[
              {
                question:
                  'Why pick subscription vs. retainer vs. one-time project?',
                answer:
                  'RETAINER (Traditional): 6-12 month commitment, $8K-15K/month regardless of results. Best for large enterprises.\n\nONE-TIME PROJECT: Fixed scope, fixed price, no ongoing relationship. Best for single deliverable (logo, website).\n\nSPRINT + SUBSCRIPTION (Us): Prove value in 60 days, then scale with monthly subscription ($2K-$3.5K). Performance bonuses align our success with yours. Best for startups/scale-ups who need continuous growth.',
              },
              {
                question: 'Why is the Sprint cheaper than your subscription?',
                answer:
                  "It's not—it's our way of proving ourselves before you commit long-term. Most Sprint clients (70%) convert to subscriptions because the results speak for themselves. The Sprint is designed to de-risk the decision.",
              },
              {
                question: "What if you don't deliver results?",
                answer:
                  "We measure everything. If we don't hit conversion targets, we provide a detailed analysis of why and what needs to change (often it's product-market fit, not design). You'll know exactly what to fix. No results? No performance bonus.",
              },
              {
                question: 'How is this different from typical agencies?',
                answer:
                  'Three ways: (1) Speed - AI-native workflows move 3-5x faster. (2) Measurement - Data-driven, not creative intuition. (3) Alignment - Performance bonuses mean we profit when you profit.',
              },
              {
                question:
                  'Why the price difference between PH and global clients?',
                answer:
                  'We price based on local market purchasing power. Philippine startups get the same quality work at rates that make sense for the local market.',
              },
              {
                question: 'Can I cancel the subscription anytime?',
                answer:
                  "Yes! After completing the 60-day Sprint, subscriptions are month-to-month with 30-day cancellation notice. No long-term lock-ins. If results don't match projections, we'll work with you to understand why.",
              },
              {
                question: 'Can I negotiate the pricing?',
                answer:
                  "For funded startups (YC/Antler/500 Startups portfolio), we're open to discussion. For bootstrapped founders, we can structure payment plans.",
              },
            ].map((faq, index) => (
              <div key={index} className='border border-border bg-card/70'>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className='w-full p-6 flex items-center justify-between text-left hover:bg-muted/30 transition-colors'
                >
                  <h3 className='text-lg font-bold text-foreground pr-4'>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ease-in-out flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index
                      ? 'max-h-[600px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='px-6 pb-6 pt-2'>
                    <p className='text-base text-muted-foreground leading-relaxed whitespace-pre-line'>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </LenisStaggered>
        </div>
      </section>

      {/* Why This Model Works */}
      <LenisFadeIn delay={200}>
        <section className='mb-32 max-w-5xl mx-auto'>
          <div className='grid md:grid-cols-4 gap-6'>
            <div className='p-6 border border-border bg-card/70 text-center'>
              <Target className='h-10 w-10 text-primary mx-auto mb-4' />
              <h3 className='text-sm font-bold uppercase tracking-wider text-foreground mb-2'>
                Month-to-Month Value
              </h3>
              <p className='text-sm text-muted-foreground'>
                No long lock-ins. Cancel anytime after Sprint.
              </p>
            </div>

            <div className='p-6 border border-border bg-card/70 text-center'>
              <TrendingUp className='h-10 w-10 text-growth mx-auto mb-4' />
              <h3 className='text-sm font-bold uppercase tracking-wider text-foreground mb-2'>
                Continuous Growth
              </h3>
              <p className='text-sm text-muted-foreground'>
                Your site evolves weekly, not yearly.
              </p>
            </div>

            <div className='p-6 border border-border bg-card/70 text-center'>
              <Check className='h-10 w-10 text-secondary mx-auto mb-4' />
              <h3 className='text-sm font-bold uppercase tracking-wider text-foreground mb-2'>
                Full Transparency
              </h3>
              <p className='text-sm text-muted-foreground'>
                Live metrics dashboard. No black box.
              </p>
            </div>

            <div className='p-6 border border-border bg-card/70 text-center'>
              <Zap className='h-10 w-10 text-primary mx-auto mb-4' />
              <h3 className='text-sm font-bold uppercase tracking-wider text-foreground mb-2'>
                AI-Native Speed
              </h3>
              <p className='text-sm text-muted-foreground'>
                Fast outputs, always personalized.
              </p>
            </div>
          </div>
        </section>
      </LenisFadeIn>

      {/* Final CTA */}
      <LenisFadeIn delay={200}>
        <section className='max-w-4xl mx-auto text-center border-2 border-primary p-12 bg-primary/5'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6 text-foreground'>
            Ready to Sprint?
          </h2>
          <p className='text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto'>
            Start with a 60-day Sprint. Prove ROI. Then decide if ongoing
            optimization makes sense.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <LinkButton
              href='/contact-us'
              variant='default'
              size='lg'
              shape='pill'
            >
              Book Discovery Call
            </LinkButton>
            <LinkButton
              href='/projects'
              variant='outline'
              size='lg'
              shape='pill'
            >
              View Case Studies
            </LinkButton>
          </div>
          <p className='text-sm text-muted-foreground mt-8'>
            Special pricing for YC/Antler/500 Startups portfolio companies
          </p>
        </section>
      </LenisFadeIn>
    </div>
  )
}
