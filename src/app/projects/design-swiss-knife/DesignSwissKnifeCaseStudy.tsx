'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  Gauge,
  Layers3,
  Radar,
  Sparkles,
  TimerReset,
  Workflow,
  Zap,
} from 'lucide-react'
import { LinkButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
}

function Reveal({ children, className, delay = 0, style }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      className={cn(
        'opacity-0 translate-y-6 transition-all duration-700 ease-out',
        isVisible && 'opacity-100 translate-y-0',
        className
      )}
    >
      {children}
    </div>
  )
}

interface NumberCounterProps {
  label: string
  value: number
  suffix?: string
  delay?: number
}

function NumberCounter({
  label,
  value,
  suffix = '',
  delay = 0,
}: NumberCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    let frame: number
    const duration = 1600
    const start = performance.now() + delay

    const animate = (timestamp: number) => {
      if (timestamp < start) {
        frame = requestAnimationFrame(animate)
        return
      }
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(eased * value))
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [value, hasAnimated, delay])

  return (
    <div
      ref={ref}
      className='rounded-3xl border border-border/50 bg-card/70 p-6 shadow-lg backdrop-blur-md'
    >
      <div className='text-4xl font-semibold text-foreground md:text-5xl'>
        {displayValue}
        {suffix}
      </div>
      <p className='mt-2 text-sm uppercase tracking-[0.25em] text-muted-foreground'>
        {label}
      </p>
    </div>
  )
}

const featureCards = [
  {
    title: 'Mass Generation',
    icon: Layers3,
    description:
      'Upload once, generate hundreds. Our AI handles the heavy lifting.',
    details: [
      'Batch-create up to 100 ad variants from a single Figma template',
      'Smart text mapping preserves hierarchy across frames',
      'Auto-preview grid for instant side-by-side comparison',
    ],
    accent: 'var(--primary)',
  },
  {
    title: 'AI Enhancement',
    icon: Sparkles,
    description:
      'GPT-5 writes contextual headlines and descriptions for each variant.',
    details: [
      'Campaign-aware copywriting tuned to your brief or prompts',
      'Fallback to Mistral AI if OpenAI hits rate limits',
      'Instant tone controls to match brand voice every time',
    ],
    accent: 'var(--cta)',
  },
  {
    title: 'Quality Analytics',
    icon: Gauge,
    description:
      'Every design gets scored for contrast, typography, and visual hierarchy.',
    details: [
      'Automated typography, contrast, and spacing checks per frame',
      'CTA visibility grading with actionable recommendations',
      'Performance prediction scoring before assets go live',
    ],
    accent: 'var(--accent)',
  },
]

const processSteps = [
  {
    title: 'Select your template',
    description:
      'Choose any Figma frame. We map text layers, load fonts, and prep analytics instantly.',
    icon: Workflow,
  },
  {
    title: 'Click generate & let AI work',
    description:
      'AI expands your copy, duplicates layouts, and organizes variants with responsive grids.',
    icon: Brain,
  },
  {
    title: 'Review 100 scored variations',
    description:
      'Every variant comes with quality scores, notes, and ready-to-export assets for A/B testing.',
    icon: Radar,
  },
]

const techBadges = [
  { label: 'TypeScript', color: '#2F74C0' },
  { label: 'Figma Plugin API', color: '#0FB8A2' },
  { label: 'OpenAI GPT-5', color: '#FF4D8D' },
  { label: 'shadcn/ui', color: '#7C3AED' },
]

const heroMetrics = [
  { label: '100x Faster', icon: Zap, iconClass: 'text-accent' },
  { label: 'AI-Powered', icon: Sparkles, iconClass: 'text-primary' },
  { label: 'Quality Scored', icon: Gauge, iconClass: 'text-purple' },
]

export default function DesignSwissKnifeCaseStudy() {
  return (
    <div className='relative overflow-hidden bg-background text-foreground'>
      <style jsx global>{`
        @keyframes floating {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-16px) scale(1.02);
          }
        }
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>

      <section
        className='relative overflow-hidden'
        id='hero'
        style={{
          background:
            'linear-gradient(130deg, color-mix(in srgb, var(--primary) 32%, transparent) 0%, color-mix(in srgb, var(--purple) 34%, transparent) 45%, color-mix(in srgb, var(--cta) 28%, transparent) 100%)',
        }}
      >
        <div
          className='absolute inset-0 opacity-70'
          style={{
            background:
              'linear-gradient(120deg, color-mix(in srgb, var(--primary) 32%, transparent), color-mix(in srgb, var(--purple) 40%, transparent), color-mix(in srgb, var(--accent) 28%, transparent))',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 16s ease-in-out infinite',
          }}
        />
        <div
          className='absolute -left-32 -top-48 h-96 w-96 rounded-full blur-3xl'
          style={{
            background: 'color-mix(in srgb, var(--cta) 38%, transparent)',
          }}
        />
        <div
          className='absolute -right-12 bottom-0 h-80 w-80 rounded-full blur-3xl'
          style={{
            background: 'color-mix(in srgb, var(--primary) 32%, transparent)',
          }}
        />

        <div className='relative container mx-auto flex max-w-6xl flex-col items-center gap-16 px-4 py-24 lg:flex-row lg:py-32'>
          <Reveal className='max-w-xl space-y-6 text-center lg:text-left'>
            <span className='inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-1 text-xs uppercase tracking-[0.4em] text-muted-foreground backdrop-blur'>
              <BadgeCheck className='h-3 w-3 text-primary' />
              PixelMojo AI Product
            </span>
            <h1 className='font-heading text-4xl leading-tight text-foreground md:text-6xl'>
              Design Swiss Knife - AI-Powered Figma Plugin
            </h1>
            <p className='text-lg text-muted-foreground md:text-xl'>
              Turn 1 design into 100 variations while you grab coffee. Generate
              100 ad variations in 2 minutes, not 2 days.
            </p>

            <div className='flex flex-wrap items-center justify-center gap-3 lg:justify-start'>
              {heroMetrics.map(metric => (
                <span
                  key={metric.label}
                  className='inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur'
                >
                  <metric.icon className={cn('h-4 w-4', metric.iconClass)} />
                  {metric.label}
                </span>
              ))}
            </div>

            <div className='flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center lg:justify-start'>
              <LinkButton
                href='#beta-access'
                size='lg'
                className='group border-none bg-cta text-cta-foreground shadow-lg transition-transform duration-200 hover:scale-105'
              >
                Try in Figma (Beta)
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
              <LinkButton
                href='#demo'
                variant='outline'
                size='lg'
                className='group border-border/60 bg-transparent text-foreground transition-transform duration-200 hover:scale-105'
              >
                Watch 2-min Demo
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
            </div>
          </Reveal>

          <Reveal delay={150} className='relative w-full max-w-lg'>
            <div className='relative rounded-[32px] border border-border/60 bg-card/80 p-6 shadow-2xl backdrop-blur-xl'>
              <div
                className='absolute inset-0 -z-10 rounded-[32px] blur-2xl'
                style={{
                  background:
                    'linear-gradient(140deg, color-mix(in srgb, var(--cta) 36%, transparent), color-mix(in srgb, var(--primary) 28%, transparent))',
                }}
              />
              <div className='relative overflow-hidden rounded-3xl border border-border/60 bg-card'>
                <Image
                  src='/design-swiss-knife-hero.svg'
                  alt='Design Swiss Knife plugin hero illustration showing ad variations'
                  width={900}
                  height={600}
                  className='h-full w-full object-cover'
                  priority
                />
              </div>
              <div
                className='absolute -right-6 -top-6 hidden h-24 w-24 rounded-3xl border border-border/40 bg-accent text-accent-foreground shadow-xl md:flex md:flex-col md:items-center md:justify-center'
                style={{ animation: 'floating 10s ease-in-out infinite' }}
              >
                <span className='text-2xl font-bold'>100</span>
                <span className='text-xs font-semibold uppercase tracking-wide'>
                  Variants
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id='demo'
        className='container mx-auto max-w-5xl px-4 py-20 md:py-24'
      >
        <div className='grid gap-10 md:grid-cols-2'>
          <Reveal
            className='rounded-3xl border border-border/60 p-8 shadow-xl'
            style={{
              background:
                'linear-gradient(140deg, color-mix(in srgb, var(--cta) 26%, var(--card) 74%), color-mix(in srgb, var(--purple) 18%, var(--card) 82%))',
            }}
          >
            <h2 className='text-2xl font-semibold text-foreground md:text-3xl'>
              The Creative Production Nightmare
            </h2>
            <p className='mt-4 text-muted-foreground'>
              Scaling campaigns with manual design workflows burns weeks.
              Designers duplicate frames one by one, copywriters paste text into
              endless layers, and quality checks slip through the cracks.
            </p>
            <ul className='mt-6 space-y-4 text-muted-foreground'>
              {[
                {
                  label: 'Manual variations that drain creative energy',
                  icon: TimerReset,
                },
                {
                  label:
                    'Time wasted syncing copy between design and marketing',
                  icon: Brain,
                },
                {
                  label: 'Inconsistent quality that tanks paid performance',
                  icon: Gauge,
                },
              ].map(item => (
                <li key={item.label} className='flex items-start gap-3'>
                  <span className='mt-1 rounded-full bg-card/60 p-2 text-cta'>
                    <item.icon className='h-4 w-4' />
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={150}
            className='rounded-3xl border border-border/60 p-8 shadow-xl'
            style={{
              background:
                'linear-gradient(140deg, color-mix(in srgb, var(--primary) 25%, var(--card) 75%), color-mix(in srgb, var(--accent) 18%, var(--card) 82%))',
            }}
          >
            <h2 className='text-2xl font-semibold text-foreground md:text-3xl'>
              Your Creative Superpower
            </h2>
            <p className='mt-4 text-muted-foreground'>
              Design Swiss Knife automates the boring parts so your team stays
              in flow. Imagine a single click that delivers launch-ready
              variations, complete with AI copy and design intelligence.
            </p>
            <div className='mt-6 grid gap-6 rounded-2xl border border-border/50 bg-card/70 p-6'>
              <div className='flex items-center gap-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-card/70 text-cta'>
                  😵‍💫
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-foreground'>
                    Before
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    One designer buried under duplicate frames and revision
                    loops.
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-card/70 text-primary'>
                  😎
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-foreground'>
                    After
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Relaxed team reviewing 100 scored variations with time to
                    strategize.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className='bg-card/60 py-20 md:py-24'>
        <div className='container mx-auto max-w-6xl px-4'>
          <Reveal className='text-center'>
            <h2 className='text-3xl font-semibold text-foreground md:text-4xl'>
              Features built for creative velocity
            </h2>
            <p className='mt-4 text-lg text-muted-foreground'>
              Interactive cards show you how Design Swiss Knife blends
              automation, AI, and analytics.
            </p>
          </Reveal>

          <div className='mt-12 grid gap-8 md:grid-cols-3'>
            {featureCards.map((card, index) => (
              <Reveal
                key={card.title}
                delay={index * 120}
                className='group [perspective:1200px]'
              >
                <div className='relative min-h-[340px] overflow-hidden rounded-3xl border border-border/60 bg-card shadow-lg transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'>
                  <div className='absolute inset-0 flex h-full flex-col gap-4 rounded-3xl bg-card p-8 [backface-visibility:hidden]'>
                    <div
                      className='flex h-12 w-12 items-center justify-center rounded-2xl'
                      style={{
                        background: `color-mix(in srgb, ${card.accent} 20%, transparent)`,
                        color: card.accent,
                      }}
                    >
                      <card.icon className='h-6 w-6' />
                    </div>
                    <h3 className='text-xl font-semibold text-foreground'>
                      {card.title}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      {card.description}
                    </p>
                    <div className='mt-auto h-2' />
                  </div>
                  <div
                    className='absolute inset-0 flex h-full flex-col gap-3 rounded-3xl p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]'
                    style={{
                      background: `color-mix(in srgb, ${card.accent} 22%, var(--card) 78%)`,
                    }}
                  >
                    <h3 className='text-lg font-semibold text-foreground/80'>
                      What you get
                    </h3>
                    <ul className='space-y-3 text-sm text-muted-foreground'>
                      {card.details.map(detail => (
                        <li key={detail} className='flex items-start gap-2'>
                          <span
                            className='mt-1 h-2 w-2 rounded-full'
                            style={{ backgroundColor: card.accent }}
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className='mt-auto h-2' />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className='container mx-auto max-w-6xl px-4 py-20 md:py-24'>
        <Reveal className='text-center'>
          <h2 className='text-3xl font-semibold text-foreground md:text-4xl'>
            How it works
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Three quick steps to spin up AI-powered creative systems.
          </p>
        </Reveal>
        <div className='mt-12 grid gap-8 md:grid-cols-3'>
          {processSteps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 120}
              className='relative rounded-3xl border border-border/60 bg-card/70 p-8 shadow-lg'
            >
              <div className='absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-xl'>
                {index + 1}
              </div>
              <div className='mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-card/70 text-primary'>
                <step.icon className='h-6 w-6' />
              </div>
              <h3 className='mt-6 text-xl font-semibold text-foreground'>
                {step.title}
              </h3>
              <p className='mt-3 text-sm text-muted-foreground'>
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className='bg-card/70 py-20 md:py-24'>
        <div className='container mx-auto max-w-5xl px-4 text-center'>
          <Reveal>
            <h2 className='text-3xl font-semibold text-foreground md:text-4xl'>
              Built with the tools modern teams trust
            </h2>
            <p className='mt-4 text-lg text-muted-foreground'>
              A playful tech stack that blends developer rigor with designer
              delight.
            </p>
          </Reveal>
          <div className='mt-12 flex flex-wrap items-center justify-center gap-4'>
            {techBadges.map((badge, index) => {
              const surface = `color-mix(in srgb, ${badge.color} 24%, var(--card) 76%)`
              const halo = `${badge.color}33`
              return (
                <Reveal
                  key={badge.label}
                  delay={index * 120}
                  className='relative inline-flex items-center overflow-hidden rounded-full px-6 py-3 text-sm font-medium shadow-lg backdrop-blur'
                  style={{
                    color: badge.color ?? 'var(--foreground)',
                  }}
                >
                  <span className='relative inline-flex items-center gap-2'>
                    <span
                      className='absolute inset-0 -z-20 rounded-full'
                      style={{
                        background: halo,
                        filter: 'blur(16px)',
                      }}
                    />
                    <span
                      className='absolute inset-0 -z-10 rounded-full border'
                      style={{
                        background: surface,
                        borderColor: `${badge.color}66`,
                      }}
                    />
                    <span className='relative'>{badge.label}</span>
                  </span>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className='container mx-auto max-w-6xl px-4 py-20 md:py-24'>
        <Reveal className='text-center'>
          <h2 className='text-3xl font-semibold text-foreground md:text-4xl'>
            Results in weeks, not quarters
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Creative ops leaders use Design Swiss Knife to unlock speed and
            consistency immediately.
          </p>
        </Reveal>
        <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <NumberCounter label='Faster production' value={10} suffix='x' />
          <NumberCounter label='Variations per session' value={100} />
          <NumberCounter label='Time saved' value={85} suffix='%' delay={180} />
          <NumberCounter
            label='Designers in pilot'
            value={500}
            suffix='+'
            delay={240}
          />
        </div>
      </section>

      <section
        id='beta-access'
        className='bg-accent py-16 text-accent-foreground'
      >
        <div className='container mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:text-left'>
          <Reveal className='space-y-2'>
            <span className='text-sm font-semibold uppercase tracking-[0.4em]'>
              Pilot Program
            </span>
            <h2 className='text-2xl font-bold md:text-3xl'>
              🚧 Currently in Pilot - Join Early Access
            </h2>
            <p className='text-base text-accent-foreground/80'>
              Be among the first to automate your creative pipeline. We onboard
              a handful of teams each month.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <LinkButton
              href='mailto:hello@pixelmojo.com?subject=Design%20Swiss%20Knife%20Beta'
              size='lg'
              className='group border-none bg-cta text-cta-foreground shadow-lg transition-transform duration-200 hover:scale-105'
            >
              Request Early Access
              <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </LinkButton>
          </Reveal>
        </div>
      </section>

      <section
        id='documentation'
        className='container mx-auto max-w-5xl px-4 py-20 md:py-24'
      >
        <Reveal className='text-center md:text-left'>
          <h2 className='text-3xl font-semibold text-foreground md:text-4xl'>
            Documentation that keeps teams aligned
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Explore setup guides, AI workflow playbooks, and publishing notes
            crafted for both designers and developers.
          </p>
        </Reveal>
        <div className='mt-10 grid gap-6 md:grid-cols-3'>
          {[
            {
              title: 'Quickstart Guide',
              description:
                'Spin up the plugin locally in under five minutes with TypeScript-ready tooling.',
              href: 'https://github.com/pixelmojo/design-swiss-knife#readme',
            },
            {
              title: 'AI Enhancement Playbook',
              description:
                'Understand prompt best practices, fallback logic, and campaign-specific tuning.',
              href: 'https://github.com/pixelmojo/design-swiss-knife/blob/main/README_AI_ENHANCED.md',
            },
            {
              title: 'Publishing Checklist',
              description:
                'Follow Figma’s submission requirements with automated linting and QA steps.',
              href: 'https://github.com/pixelmojo/design-swiss-knife/blob/main/PUBLISHING_GUIDE.md',
            },
          ].map((resource, index) => (
            <Reveal
              key={resource.title}
              delay={index * 120}
              className='rounded-3xl border border-border/60 bg-card/70 p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl md:text-left'
            >
              <h3 className='text-xl font-semibold text-foreground'>
                {resource.title}
              </h3>
              <p className='mt-3 text-sm text-muted-foreground'>
                {resource.description}
              </p>
              <Link
                href={resource.href}
                className='mt-6 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-cta'
                target='_blank'
                rel='noopener noreferrer'
              >
                Open documentation
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className='container mx-auto max-w-5xl px-4 py-20 md:py-24'>
        <Reveal
          className='rounded-3xl border border-border/60 p-10 text-center shadow-xl md:text-left'
          style={{
            background:
              'linear-gradient(140deg, color-mix(in srgb, var(--purple) 20%, var(--card) 80%), color-mix(in srgb, var(--cta) 16%, var(--card) 84%))',
          }}
        >
          <div className='flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between'>
            <div className='space-y-3'>
              <h2 className='text-3xl font-semibold text-foreground md:text-4xl'>
                Ready to supercharge creative production?
              </h2>
              <p className='text-lg text-muted-foreground'>
                Install Design Swiss Knife and turn your Figma workflows into
                revenue-generating machines.
              </p>
            </div>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <LinkButton
                href='#beta-access'
                size='lg'
                className='group border-none bg-cta text-cta-foreground shadow-lg transition-transform duration-200 hover:scale-105'
              >
                Install Plugin
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
              <LinkButton
                href='/projects/design-swiss-knife#documentation'
                variant='outline'
                size='lg'
                className='border-border/60 text-foreground transition-transform duration-200 hover:scale-105'
              >
                View Documentation
              </LinkButton>
              <Link
                href='https://github.com/pixelmojo/design-swiss-knife'
                className='flex items-center justify-center text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground'
                target='_blank'
                rel='noopener noreferrer'
              >
                GitHub Repository
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
