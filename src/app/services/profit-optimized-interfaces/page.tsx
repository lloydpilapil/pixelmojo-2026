import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import ServiceNavigation from '@/components/ServiceNavigation'
import { LinkButton } from '@/components/ui/button'
import {
  ServiceCardGrid,
  ServiceHero,
  ServiceSplitSection,
  ServiceStatList,
  ServiceTimeline,
} from '@/components/services/ServiceSections'
import { getServiceTheme } from '@/utils/serviceThemes'

const service = {
  title: 'Profit-Optimized Interfaces',
  description:
    'Interfaces that maximize revenue per user. AI-powered experiences that convert, upsell, and retain.',
  pricing: 'Projects from $12K',
}

export const metadata: Metadata = {
  title: 'Profit-Optimized Interfaces | Pixelmojo',
  description:
    'Interfaces that maximize revenue per user. AI-powered experiences that convert, upsell, and retain.',
  openGraph: {
    title: 'Profit-Optimized Interfaces | Pixelmojo',
    description:
      'Interfaces that maximize revenue per user. AI-powered experiences that convert, upsell, and retain.',
    type: 'website',
  },
}

const heroStats = [
  {
    value: '2.7x',
    label: 'Average ARPU lift',
    detail:
      'Measured across activation, upsell, and retention flows within 90 days.',
  },
  {
    value: '40%',
    label: 'Drop in friction points',
    detail:
      'Journey analytics show fewer blockers, support tickets, and abandonment signals.',
  },
  {
    value: '3 weeks',
    label: 'Experiment velocity',
    detail:
      'New interface iterations ship on a rolling cadence with built-in telemetry.',
  },
]

const instrumentationHighlights = [
  {
    eyebrow: 'Telemetry',
    title: 'Revenue instrumentation everywhere',
    bullets: [
      'Event definitions aligned to finance and product KPIs with clear owners.',
      'Real-time dashboards surfacing ARR, LTV, and churn signals per interface.',
      'Proactive alerting when conversion or retention metrics drift outside thresholds.',
    ],
  },
  {
    eyebrow: 'Personalisation',
    title: 'Adaptive experiences in production',
    bullets: [
      'Segmentation logic that adapts copy, pricing, and UI states to user intent.',
      'Experiment frameworks that blend AI and rules-based logic for safe rollout.',
      'A/B/n testing and feature flagging that routes winners into production automatically.',
    ],
  },
  {
    eyebrow: 'Enablement',
    title: 'Ops visibility for every team',
    bullets: [
      'Experiment briefs and impact summaries delivered to executives weekly.',
      'Living documentation so engineering, design, and GTM teams stay on the same page.',
      'Feedback channels that capture customer insight right where the work happens.',
    ],
  },
]

const optimizationTimeline = [
  {
    title: 'Baseline + benchmarks',
    duration: 'Weeks 1-2',
    description:
      'We map the customer journey, instrument the gaps, and align on the revenue metrics that matter. Benchmarks from your vertical and buyer mix set the targets.',
  },
  {
    title: 'Designing the profit plays',
    duration: 'Weeks 3-5',
    description:
      'Interface redesigns, pricing strategies, and personalization logic are prototyped, validated, and approved with live customer input.',
  },
  {
    title: 'Launch + learn',
    duration: 'Weeks 6-8',
    description:
      'We deploy the experience in controlled cohorts, monitor performance, and automate rollout once revenue KPIs are hit.',
  },
  {
    title: 'Scale + iterate',
    duration: 'Ongoing',
    description:
      'Weekly optimization loops keep the experience fresh. Insights feed back into product, marketing, and support roadmaps.',
  },
]

const deliverableCards = [
  {
    title: 'Revenue dashboard suite',
    description:
      'Unified view of ARR, retention, expansion, and support signals tied to interface decisions.',
  },
  {
    title: 'Dynamic interface library',
    description:
      'Components, states, and content variants ready to launch across web and mobile.',
  },
  {
    title: 'Optimization operating system',
    description:
      'Process playbooks, automated reports, and cross-team rituals that keep profit the centre metric.',
  },
]

export default function ProfitOptimizedInterfaces() {
  const theme = getServiceTheme(service.title)

  const buttonStyle: CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    color: theme.textColor,
    border: `1px solid ${theme.textColor}`,
  }

  return (
    <div
      className='min-h-screen'
      style={{
        backgroundColor: theme.bg,
        color: theme.textColor,
      }}
    >
      <div className='container mx-auto px-4 py-16'>
        <div className='space-y-16 md:space-y-24'>
          <ServiceHero
            theme={theme}
            eyebrow='Retention • Expansion • Loyalty'
            title='Interfaces engineered to grow revenue per customer'
            description={`We combine behavioural data, experimentation, and high-performing design systems so every experience earns its keep.`}
            layout='split'
            image={{
              src: '/placeholder.svg',
              alt: 'Interface optimization dashboards',
            }}
          >
            <div className='flex flex-wrap gap-4'>
              <LinkButton
                href='/contact-us'
                size='lg'
                className='group'
                style={buttonStyle}
              >
                Design my profit interface
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
            </div>
          </ServiceHero>

          <ServiceStatList theme={theme} items={heroStats} />

          <ServiceSplitSection
            theme={theme}
            eyebrow='Full-funnel insight'
            title='Your revenue telemetry stays live'
            description={`From first visit to renewal, every interaction gets mapped, measured, and improved. Teams finally share the same conversion truth.`}
            bullets={[
              'Journey analytics stitched together from product, support, and billing platforms.',
              'AI segment detection that spots hidden monetisation opportunities early.',
              'Churn indicators trigger proactive outreach with pre-built enablement content.',
            ]}
            image={{
              src: '/placeholder.svg',
              alt: 'Revenue telemetry aligned across teams',
            }}
          />

          <div className='space-y-8'>
            <div className='max-w-3xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                The levers we pull to lift profit fast
              </h2>
              <p
                className='mt-4 text-base md:text-lg'
                style={{ color: theme.mutedTextColor }}
              >
                Data, design, and marketing work together, not in silos, to keep
                users converting and expanding.
              </p>
            </div>
            <ServiceCardGrid theme={theme} items={instrumentationHighlights} />
          </div>

          <div className='space-y-8'>
            <div className='max-w-3xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                Optimization program built for compounding gains
              </h2>
              <p
                className='mt-4 text-base md:text-lg'
                style={{ color: theme.mutedTextColor }}
              >
                We move beyond one-off redesigns. The work keeps paying for
                itself through structured iteration.
              </p>
            </div>
            <ServiceTimeline theme={theme} items={optimizationTimeline} />
          </div>

          <ServiceSplitSection
            theme={theme}
            eyebrow='Team integration'
            title='We operate as your optimization squad'
            description={`Standing meetings, async updates, and shared documentation mean your product, design, and revenue teams always know the next best move.`}
            bullets={[
              'Joint backlog grooming keeps the roadmap aligned with the biggest revenue levers.',
              'UX research, data science, and product marketing reviews happen in one rhythm.',
              'Internal teams receive enablement so they can continue the program autonomously.',
            ]}
            reverse
            image={{
              src: '/placeholder.svg',
              alt: 'Cross-functional squad collaborating on optimization backlog',
            }}
          />

          <div className='space-y-6'>
            <div className='max-w-2xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                What you take back to the business
              </h2>
            </div>
            <ServiceCardGrid theme={theme} items={deliverableCards} compact />
          </div>

          <section
            className='rounded-3xl border p-10 text-center'
            style={{ borderColor: theme.border }}
          >
            <h2
              className='text-3xl font-semibold md:text-4xl'
              style={{ color: theme.textColor }}
            >
              Ready to turn your interface into a profit center?
            </h2>
            <p
              className='mx-auto mt-4 max-w-2xl text-base md:text-lg'
              style={{ color: theme.mutedTextColor }}
            >
              We will audit your current experience, pinpoint the revenue leaks,
              and co-build the roadmap that turns every user interaction into
              measurable ROI.
            </p>
            <div className='mt-8 flex justify-center'>
              <LinkButton
                href='/contact-us'
                size='lg'
                className='group'
                style={buttonStyle}
              >
                Start the interface audit
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
            </div>
          </section>
        </div>

        <ServiceNavigation
          currentService='profit-optimized-interfaces'
          theme={theme}
        />
      </div>
    </div>
  )
}
