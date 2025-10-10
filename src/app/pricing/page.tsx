'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Hero from '@/components/Hero'
import { LinkButton } from '@/components/ui/button'
import { Check, X, ChevronDown } from 'lucide-react'
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
    return 'Most agencies charge $8K-15K/month regardless of results. We prove ourselves in 60 days, then grow with you through performance-based pricing.'
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
          href: '#sprint-model',
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
                  <span className='mt-2 h-1.5 w-1.5 bg-destructive' />
                  <span>6-12 month commitments before proving value</span>
                </li>
                <li className='flex gap-3'>
                  <span className='mt-2 h-1.5 w-1.5 bg-destructive' />
                  <span>$8K-15K/month regardless of results delivered</span>
                </li>
                <li className='flex gap-3'>
                  <span className='mt-2 h-1.5 w-1.5 bg-destructive' />
                  <span>
                    2-3 month onboarding cycles before seeing progress
                  </span>
                </li>
                <li className='flex gap-3'>
                  <span className='mt-2 h-1.5 w-1.5 bg-destructive' />
                  <span>Creative "process" over measurable outcomes</span>
                </li>
              </ul>
            </div>
            <div className='p-10 md:p-12 bg-primary/5 text-foreground dark:bg-white/10 dark:text-white'>
              <header className='mb-6'>
                <span className='inline-flex items-center px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-background bg-primary dark:text-[#0b1120] dark:bg-[#38bdf8]'>
                  Our Sprint Model
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
                    <strong>Base + performance bonuses:</strong> We profit when
                    you profit
                  </span>
                </li>
                <li className='flex gap-4'>
                  <span className='flex h-8 w-8 items-center justify-center bg-primary/15 text-primary font-semibold dark:bg-[#38bdf8]/20 dark:text-[#38bdf8]'>
                    3
                  </span>
                  <span>
                    <strong>Ship in 2-week sprints:</strong> AI-native speed,
                    not creative delays
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <footer className='border-t border-border/50 bg-muted/20 px-10 py-4 md:px-12 text-xs uppercase tracking-[0.3em] text-muted-foreground text-center dark:bg-black/50 dark:text-white/70'>
            Result: Prove ROI in 60 days, scale with performance-based retainers
          </footer>
        </section>
      </LenisFadeIn>

      {/* Sprint Pricing Tiers */}
      <section id='sprint-model' className='mb-32'>
        <LenisFadeIn delay={300}>
          <div className='text-center mb-16'>
            <h2 className='mb-6 max-w-5xl mx-auto leading-tight !text-4xl md:!text-5xl lg:!text-6xl'>
              60-Day Conversion Sprint
            </h2>
            <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed'>
              Prove value fast. No 6-month retainers. Just measurable results in
              60 days.
            </p>
          </div>
        </LenisFadeIn>

        <LenisStaggered delay={400} staggerDelay={150}>
          <div className='grid gap-8 md:grid-cols-2 max-w-6xl mx-auto'>
            {/* Philippine Market Pricing */}
            <div
              className={`relative border-2 p-10 bg-card/70 backdrop-blur-sm transition-all ${
                persona === 'startup'
                  ? 'border-growth shadow-lg shadow-growth/20'
                  : 'border-border hover:border-secondary'
              }`}
            >
              {persona === 'startup' && (
                <div className='absolute -top-3 right-8 bg-growth text-white px-4 py-1 text-xs font-semibold uppercase tracking-wider'>
                  Recommended for You
                </div>
              )}
              <div className='absolute -top-3 left-8 bg-background px-4 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Philippine Startups
              </div>

              <div className='mb-6'>
                <div className='flex items-baseline gap-2'>
                  <span className='text-5xl font-bold text-foreground'>
                    ₱180,000
                  </span>
                </div>
                <p className='text-sm text-muted-foreground mt-2'>
                  ~$3,200 USD | One-time, 60-day engagement
                </p>
              </div>

              <div className='mb-8'>
                <p className='text-base text-foreground font-medium mb-4'>
                  Perfect for seed-funded PH startups needing conversion
                  optimization
                </p>
              </div>

              <ul className='space-y-3 mb-8'>
                <li className='flex gap-3 items-start'>
                  <Check className='h-5 w-5 text-growth mt-0.5 flex-shrink-0' />
                  <span className='text-sm text-foreground'>
                    Analytics audit & conversion baseline setup
                  </span>
                </li>
                <li className='flex gap-3 items-start'>
                  <Check className='h-5 w-5 text-growth mt-0.5 flex-shrink-0' />
                  <span className='text-sm text-foreground'>
                    AI-optimized landing page/funnel (1-2 pages)
                  </span>
                </li>
                <li className='flex gap-3 items-start'>
                  <Check className='h-5 w-5 text-growth mt-0.5 flex-shrink-0' />
                  <span className='text-sm text-foreground'>
                    A/B test framework + 30-day iteration cycle
                  </span>
                </li>
                <li className='flex gap-3 items-start'>
                  <Check className='h-5 w-5 text-growth mt-0.5 flex-shrink-0' />
                  <span className='text-sm text-foreground'>
                    Performance report + growth roadmap
                  </span>
                </li>
              </ul>

              <div className='pt-6 border-t border-border'>
                <p className='text-sm font-medium text-muted-foreground mb-1'>
                  Payment Terms
                </p>
                <p className='text-sm text-foreground'>
                  50% upfront, 50% at day 30
                </p>
              </div>

              <LinkButton
                href='/contact-us'
                variant='outline'
                className='w-full mt-6'
              >
                Get Started →
              </LinkButton>
            </div>

            {/* Global Market Pricing */}
            <div
              className={`relative border-2 p-10 bg-primary/5 backdrop-blur-sm transition-all ${
                persona === 'saas'
                  ? 'border-primary shadow-lg shadow-primary/20'
                  : 'border-primary'
              }`}
            >
              {persona === 'saas' && (
                <div className='absolute -top-3 right-8 bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold uppercase tracking-wider'>
                  Recommended for You
                </div>
              )}
              <div className='absolute -top-3 left-8 bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold uppercase tracking-wider'>
                Global/US Clients
              </div>

              <div className='mb-6'>
                <div className='flex items-baseline gap-2'>
                  <span className='text-5xl font-bold text-foreground'>
                    $4,500
                  </span>
                </div>
                <p className='text-sm text-muted-foreground mt-2'>
                  USD | One-time, 60-day engagement
                </p>
              </div>

              <div className='mb-8'>
                <p className='text-base text-foreground font-medium mb-4'>
                  Perfect for B2B/SaaS companies needing fast, measurable
                  conversion wins
                </p>
              </div>

              <ul className='space-y-3 mb-8'>
                <li className='flex gap-3 items-start'>
                  <Check className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                  <span className='text-sm text-foreground'>
                    Analytics audit & conversion baseline setup
                  </span>
                </li>
                <li className='flex gap-3 items-start'>
                  <Check className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                  <span className='text-sm text-foreground'>
                    AI-optimized landing page/funnel (1-2 pages)
                  </span>
                </li>
                <li className='flex gap-3 items-start'>
                  <Check className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                  <span className='text-sm text-foreground'>
                    A/B test framework + 30-day iteration cycle
                  </span>
                </li>
                <li className='flex gap-3 items-start'>
                  <Check className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                  <span className='text-sm text-foreground'>
                    Performance report + growth roadmap
                  </span>
                </li>
              </ul>

              <div className='pt-6 border-t border-border'>
                <p className='text-sm font-medium text-muted-foreground mb-1'>
                  Payment Terms
                </p>
                <p className='text-sm text-foreground'>
                  50% upfront, 50% at day 30
                </p>
              </div>

              <LinkButton
                href='/contact-us'
                variant='default'
                className='w-full mt-6'
              >
                Get Started →
              </LinkButton>
            </div>
          </div>
        </LenisStaggered>

        <LenisFadeIn delay={600}>
          <div className='mt-12 text-center max-w-3xl mx-auto'>
            <p className='text-base text-muted-foreground'>
              <strong className='text-foreground'>Our Promise:</strong> Most
              clients see 15-40% conversion lift in 60 days. If we can't move
              the needle, we'll tell you exactly why and how to fix it.
            </p>
          </div>
        </LenisFadeIn>
      </section>

      {/* Growth Retainer (Post-Sprint) */}
      <section className='mb-32'>
        <LenisFadeIn delay={200}>
          <div className='text-center mb-16'>
            <div className='inline-block px-4 py-2 bg-growth/10 border border-growth/30 mb-4'>
              <span className='text-xs font-semibold uppercase tracking-wider text-growth'>
                For Sprint Graduates
              </span>
            </div>
            <h2 className='mb-6 max-w-5xl mx-auto leading-tight !text-4xl md:!text-5xl lg:!text-6xl'>
              Growth Retainer (Post-Sprint)
            </h2>
            <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed'>
              After proving value in the Sprint, scale with performance-based
              monthly retainers.
            </p>
          </div>
        </LenisFadeIn>

        <div className='max-w-5xl mx-auto'>
          <LenisStaggered delay={300} staggerDelay={100}>
            <div className='border-2 border-border p-10 bg-card/70'>
              <div className='grid md:grid-cols-2 gap-10 mb-8'>
                <div>
                  <h3 className='text-2xl font-bold mb-4 text-foreground'>
                    Base Retainer
                  </h3>
                  <div className='mb-4'>
                    <div className='flex items-baseline gap-3 mb-2'>
                      <span className='text-4xl font-bold text-foreground'>
                        $3,500
                      </span>
                      <span className='text-muted-foreground'>/month</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      PH Startups: ₱120,000/month
                    </p>
                  </div>
                  <ul className='space-y-2 text-sm text-foreground'>
                    <li className='flex gap-2 items-start'>
                      <Check className='h-4 w-4 text-primary mt-0.5' />
                      <span>Monthly design/dev sprints</span>
                    </li>
                    <li className='flex gap-2 items-start'>
                      <Check className='h-4 w-4 text-primary mt-0.5' />
                      <span>Ongoing A/B testing & optimization</span>
                    </li>
                    <li className='flex gap-2 items-start'>
                      <Check className='h-4 w-4 text-primary mt-0.5' />
                      <span>Campaign management</span>
                    </li>
                    <li className='flex gap-2 items-start'>
                      <Check className='h-4 w-4 text-primary mt-0.5' />
                      <span>Quarterly strategy sessions</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-2xl font-bold mb-4 text-growth'>
                    Performance Bonuses
                  </h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Paid quarterly based on conversion lift
                  </p>
                  <div className='space-y-3'>
                    <div className='p-4 border border-border bg-background/50'>
                      <div className='flex justify-between items-center mb-1'>
                        <span className='text-sm font-semibold text-foreground'>
                          15-25% lift
                        </span>
                        <span className='text-lg font-bold text-growth'>
                          +$1,000/mo
                        </span>
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        PH: +₱30K/month
                      </p>
                    </div>
                    <div className='p-4 border border-border bg-background/50'>
                      <div className='flex justify-between items-center mb-1'>
                        <span className='text-sm font-semibold text-foreground'>
                          25-40% lift
                        </span>
                        <span className='text-lg font-bold text-growth'>
                          +$2,500/mo
                        </span>
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        PH: +₱75K/month
                      </p>
                    </div>
                    <div className='p-4 border border-border bg-background/50'>
                      <div className='flex justify-between items-center mb-1'>
                        <span className='text-sm font-semibold text-foreground'>
                          40%+ lift
                        </span>
                        <span className='text-lg font-bold text-growth'>
                          +$5,000/mo
                        </span>
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        PH: +₱150K/month
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='pt-8 border-t border-border'>
                <p className='text-center text-base text-muted-foreground'>
                  <strong className='text-foreground'>Why This Works:</strong>{' '}
                  We only make real profit when you grow. You get a committed
                  partner, not just a vendor billing hours.
                </p>
              </div>
            </div>
          </LenisStaggered>

          <LenisFadeIn delay={500}>
            <div className='mt-8 text-center'>
              <p className='text-sm text-muted-foreground mb-4'>
                ~70% of successful Sprints convert to Growth Retainers
              </p>
              <LinkButton href='/contact-us' variant='default'>
                Start with a Sprint →
              </LinkButton>
            </div>
          </LenisFadeIn>
        </div>
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
                  Pricing
                </td>
                <td className='p-4 text-center text-sm text-muted-foreground'>
                  $8K-15K/month fixed
                </td>
                <td className='p-4 text-center text-sm font-semibold text-primary bg-primary/5'>
                  $4.5K Sprint → $3.5K base + bonuses
                </td>
              </tr>
              <tr className='border-b border-border'>
                <td className='p-4 text-sm font-semibold text-foreground'>
                  Timeline to Results
                </td>
                <td className='p-4 text-center text-sm text-muted-foreground'>
                  3-6 months
                </td>
                <td className='p-4 text-center text-sm font-semibold text-primary bg-primary/5'>
                  60 days
                </td>
              </tr>
              <tr className='border-b border-border'>
                <td className='p-4 text-sm font-semibold text-foreground'>
                  AI-Native Workflows
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
                  Performance-Based Pricing
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
                  Startup Focus
                </td>
                <td className='p-4 text-center text-sm text-muted-foreground'>
                  Enterprise/Brand focus
                </td>
                <td className='p-4 text-center text-sm font-semibold text-primary bg-primary/5'>
                  Built for startups
                </td>
              </tr>
              <tr>
                <td className='p-4 text-sm font-semibold text-foreground'>
                  Speed
                </td>
                <td className='p-4 text-center text-sm text-muted-foreground'>
                  2-3 month cycles
                </td>
                <td className='p-4 text-center text-sm font-semibold text-primary bg-primary/5'>
                  2-3 week sprints
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Accordion - Visible on mobile only */}
        <div className='md:hidden max-w-2xl mx-auto space-y-3'>
          {[
            {
              feature: 'Pricing',
              traditional: '$8K-15K/month fixed',
              pixelmojo: '$4.5K Sprint → $3.5K base + bonuses',
              icon: null,
            },
            {
              feature: 'Timeline to Results',
              traditional: '3-6 months',
              pixelmojo: '60 days',
              icon: null,
            },
            {
              feature: 'AI-Native Workflows',
              traditional: 'no',
              pixelmojo: 'yes',
              icon: true,
            },
            {
              feature: 'Performance-Based Pricing',
              traditional: 'no',
              pixelmojo: 'yes',
              icon: true,
            },
            {
              feature: 'Startup Focus',
              traditional: 'Enterprise/Brand focus',
              pixelmojo: 'Built for startups',
              icon: null,
            },
            {
              feature: 'Speed',
              traditional: '2-3 month cycles',
              pixelmojo: '2-3 week sprints',
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
                question: 'Why is the Sprint cheaper than your retainer?',
                answer:
                  "It's not—it's our way of proving ourselves before you commit long-term. Most Sprint clients convert to retainers because the results speak for themselves.",
              },
              {
                question: "What if you don't deliver results?",
                answer:
                  "We measure everything. If we don't hit conversion targets, we provide a detailed analysis of why and what needs to change (often it's product-market fit, not design). You'll know exactly what to fix.",
              },
              {
                question: 'How is this different from typical agencies?',
                answer:
                  'Three ways: (1) Speed - We use AI-native workflows to move 3-5x faster. (2) Measurement - Every decision is data-driven, not creative intuition. (3) Alignment - Performance bonuses mean we profit when you profit.',
              },
              {
                question:
                  'Why the price difference between PH and global clients?',
                answer:
                  'We price based on local market purchasing power. Philippine startups get the same quality work at rates that make sense for the local market.',
              },
              {
                question: 'Can I negotiate the pricing?',
                answer:
                  "For funded startups with compelling use cases, we're open to discussion. For bootstrapped founders, we can structure payment plans.",
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
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='px-6 pb-6 pt-2'>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </LenisStaggered>
        </div>
      </section>

      {/* Case Studies Teaser */}
      <section className='mb-32'>
        <LenisFadeIn delay={200}>
          <div className='text-center mb-12'>
            <h2 className='mb-6 max-w-5xl mx-auto leading-tight !text-4xl md:!text-5xl lg:!text-6xl'>
              Real Results, Real Clients
            </h2>
          </div>
        </LenisFadeIn>

        <div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          <LenisFadeIn delay={300}>
            <div className='border-2 border-border p-8 bg-card/70 hover:border-primary transition-all'>
              <div className='mb-4'>
                <span className='inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary'>
                  Logistics Platform
                </span>
              </div>
              <h3 className='text-2xl font-bold mb-3 text-foreground'>
                Track & Trace System
              </h3>
              <p className='text-base text-muted-foreground mb-4 leading-relaxed'>
                Enterprise logistics platform needed conversion-optimized web
                presence with real-time tracking UI.
              </p>
              <div className='space-y-2 mb-6'>
                <div className='flex justify-between items-center py-2 border-b border-border/50'>
                  <span className='text-sm font-medium text-muted-foreground'>
                    Investment
                  </span>
                  <span className='text-sm font-bold text-foreground'>
                    ₱600,000
                  </span>
                </div>
                <div className='flex justify-between items-center py-2 border-b border-border/50'>
                  <span className='text-sm font-medium text-muted-foreground'>
                    Timeline
                  </span>
                  <span className='text-sm font-bold text-foreground'>
                    6 months
                  </span>
                </div>
                <div className='flex justify-between items-center py-2'>
                  <span className='text-sm font-medium text-muted-foreground'>
                    Results
                  </span>
                  <span className='text-sm font-bold text-growth'>
                    [Under NDA]
                  </span>
                </div>
              </div>
            </div>
          </LenisFadeIn>

          <LenisFadeIn delay={400}>
            <div className='border-2 border-border p-8 bg-card/70 hover:border-secondary transition-all'>
              <div className='mb-4'>
                <span className='inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/10 text-secondary'>
                  Healthcare AI Startup
                </span>
              </div>
              <h3 className='text-2xl font-bold mb-3 text-foreground'>
                Brand & Web Launch
              </h3>
              <p className='text-base text-muted-foreground mb-4 leading-relaxed'>
                Startup needed professional web presence fast to support seed
                fundraising conversations.
              </p>
              <div className='space-y-2 mb-6'>
                <div className='flex justify-between items-center py-2 border-b border-border/50'>
                  <span className='text-sm font-medium text-muted-foreground'>
                    Investment
                  </span>
                  <span className='text-sm font-bold text-foreground'>
                    $2,500
                  </span>
                </div>
                <div className='flex justify-between items-center py-2 border-b border-border/50'>
                  <span className='text-sm font-medium text-muted-foreground'>
                    Timeline
                  </span>
                  <span className='text-sm font-bold text-foreground'>
                    3 weeks
                  </span>
                </div>
                <div className='flex justify-between items-center py-2'>
                  <span className='text-sm font-medium text-muted-foreground'>
                    Results
                  </span>
                  <span className='text-sm font-bold text-growth'>
                    Enabled fundraising
                  </span>
                </div>
              </div>
            </div>
          </LenisFadeIn>
        </div>

        <LenisFadeIn delay={500}>
          <div className='text-center mt-8'>
            <p className='text-sm text-muted-foreground'>
              More detailed case studies available during discovery call
            </p>
          </div>
        </LenisFadeIn>
      </section>

      {/* Final CTA */}
      <LenisFadeIn delay={200}>
        <section className='max-w-4xl mx-auto text-center border-2 border-primary p-12 bg-primary/5'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6 text-foreground'>
            Ready to Sprint?
          </h2>
          <p className='text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto'>
            We're a 16-month-old startup building for startups. We GET the
            pressure of proving ROI fast.
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
            <LinkButton href='/about' variant='outline' size='lg' shape='pill'>
              Learn Our Process
            </LinkButton>
          </div>
          <p className='text-sm text-muted-foreground mt-8'>
            Special pricing available for YC/Antler/500 Startups portfolio
            companies
          </p>
        </section>
      </LenisFadeIn>
    </div>
  )
}
