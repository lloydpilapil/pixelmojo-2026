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
  title: 'AI-Powered Growth Engines',
  description:
    'Go beyond design. Activate your brand for real growth. Turn your investment into your most powerful engine for leads, sales, and lasting market presence through strategic, data-driven activation.',
  pricing: 'Retainers from $6K/mo',
}

export const metadata: Metadata = {
  title:
    'AI-Powered Growth Engines | Activate Your Brand for Real Growth | Pixelmojo',
  description:
    'Go beyond design. Activate your brand for real growth through strategic content, multi-channel engagement, and data-driven performance optimization.',
  openGraph: {
    title:
      'AI-Powered Growth Engines | Activate Your Brand for Real Growth | Pixelmojo',
    description:
      'Go beyond design. Activate your brand for real growth through strategic content, multi-channel engagement, and data-driven performance optimization.',
    type: 'website',
  },
}

const heroStats = [
  {
    value: '30 days',
    label: 'Full-funnel lift visible',
    detail:
      'Acquisition, nurture, and sales enablement dashboards wired to revenue KPIs.',
  },
  {
    value: '40%',
    label: 'Average pipeline acceleration',
    detail:
      'Lead scoring and routing automations surface the hottest opportunities instantly.',
  },
  {
    value: '65%',
    label: 'More content shipped',
    detail:
      'AI-assisted production keeps every channel fresh without scaling headcount.',
  },
]

const engineCards = [
  {
    eyebrow: 'Acquisition',
    title: 'Demand engines that never sleep',
    bullets: [
      'SEO, paid, and outbound plays orchestrated from a single experimentation backlog.',
      'Channel-specific content tuned by AI to stay on message and deliver consistent velocity.',
      'Account intent monitoring so reps get context before prospects ever hit reply.',
    ],
  },
  {
    eyebrow: 'Lifecycle',
    title: 'Nurture journeys that progress deals',
    bullets: [
      'Segmented nurture streams blending email, in-app, and community touchpoints.',
      'Milestone-based playbooks triggered by product usage and sales stages.',
      'Self-serve education hubs and AI chat assistance to reduce support drag.',
    ],
  },
  {
    eyebrow: 'Revenue Ops',
    title: 'Data and process that stay aligned',
    bullets: [
      'Unified dashboards combining CRM, product analytics, and marketing attribution.',
      'Automation governance to keep enrichment, scoring, and routing accurate.',
      'RevOps health checks that prevent broken handoffs between teams.',
    ],
  },
  {
    eyebrow: 'Advocacy',
    title: 'Communities that compound reach',
    bullets: [
      'Advocate identification and enablement layered into lifecycle journeys.',
      'Customer storytelling sprints that turn wins into content within days.',
      'Partner and reseller motions orchestrated alongside direct acquisition.',
    ],
  },
]

const experimentTimeline = [
  {
    title: 'Signal sync',
    duration: 'Weekly',
    description:
      'We unify marketing, product, and revenue data to spot opportunities earlier. Hypotheses are scored against impact and confidence, keeping everyone focused on needle-moving tests.',
  },
  {
    title: 'Sprint deployment',
    duration: 'Bi-weekly',
    description:
      'Creative, copy, landing pages, and sales assets ship as bundles. Automations ensure experiments launch simultaneously across every relevant channel.',
  },
  {
    title: 'Evidence review',
    duration: 'Monthly',
    description:
      'Performance dashboards surface wins, learnings, and blockers. We double down on the plays that convert and retire what slows down pipeline.',
  },
]

const measurementHighlights = [
  {
    title: 'Revenue command center',
    description:
      'Shared dashboards for marketing, sales, and success with live projections.',
  },
  {
    title: 'Experiment library',
    description:
      'Archive of tests, learnings, and assets so teams avoid repeating work.',
  },
  {
    title: 'Growth ops runbook',
    description:
      'Process documentation covering triggers, ownership, and escalation paths.',
  },
]

export default function AIPoweredGrowth() {
  const theme = getServiceTheme(service.title)

  const buttonStyle: CSSProperties = {
    backgroundColor: theme.isDark
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.08)',
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
            eyebrow='Acquisition • Activation • Expansion'
            title='Growth engines wired directly to revenue operations'
            description={`We blend strategy, creative, and automation so your pipeline, content, and customer motions compound instead of competing.`}
            layout='split'
            image={{
              src: '/pixelmojo-services-ai-powered-growth.webp',
              alt: 'Growth automation dashboards and workflows',
            }}
          >
            <div className='flex flex-wrap gap-4'>
              <LinkButton
                href='/contact-us'
                size='lg'
                className='group'
                style={buttonStyle}
              >
                Build my growth engine
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
            </div>
          </ServiceHero>

          <ServiceStatList theme={theme} items={heroStats} />

          <ServiceSplitSection
            theme={theme}
            eyebrow='Always-on signals'
            title='The growth spine that stays aligned'
            description={`Marketing, sales, product, and success all see the same truth. We wire every touchpoint to shared dashboards so decisions get smarter over time.`}
            bullets={[
              'Unified contact graph merges product usage, campaign history, and account intent.',
              'AI scoring models prioritize accounts and leads that match your highest-value customers.',
              'Alerting, routing, and playbooks keep teams executing within minutes, not days.',
            ]}
            image={{
              src: '/placeholder.svg',
              alt: 'Unified growth data across teams',
            }}
          />

          <div className='space-y-8'>
            <div className='max-w-3xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                Growth engines we deploy together
              </h2>
              <p
                className='mt-4 text-base md:text-lg'
                style={{ color: theme.mutedTextColor }}
              >
                Every play is documented, automated, and measured. Your team
                knows exactly how each channel contributes to revenue.
              </p>
            </div>
            <ServiceCardGrid theme={theme} items={engineCards} columns={2} />
          </div>

          <div className='space-y-8'>
            <div className='max-w-3xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                Experiment cycle that never loses momentum
              </h2>
              <p
                className='mt-4 text-base md:text-lg'
                style={{ color: theme.mutedTextColor }}
              >
                We run structured sprints with clear ownership so wins scale
                quickly and learnings stick.
              </p>
            </div>
            <ServiceTimeline theme={theme} items={experimentTimeline} />
          </div>

          <ServiceSplitSection
            theme={theme}
            eyebrow='Creative + automation pairing'
            title='Content production that keeps channels fed'
            description={`Writers, designers, editors, and AI copilots work from the same source of truth. That means more campaigns live, more often.`}
            bullets={[
              'Prompt libraries produce channel-ready copy, motion graphics, and social cuts.',
              'Editorial calendar synced to revenue goals with pre-approved story angles.',
              'Feedback loops push performance insights back into creative briefs instantly.',
            ]}
            reverse
            image={{
              src: '/pixelmojo-services-ai-powered-growth.webp',
              alt: 'Content production workflows with automation',
            }}
          />

          <div className='space-y-6'>
            <div className='max-w-2xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                Visibility that keeps leadership confident
              </h2>
            </div>
            <ServiceCardGrid
              theme={theme}
              items={measurementHighlights}
              compact
            />
          </div>

          <section
            className='rounded-3xl border p-10 text-center'
            style={{ borderColor: theme.border }}
          >
            <h2
              className='text-3xl font-semibold md:text-4xl'
              style={{ color: theme.textColor }}
            >
              Let's architect a growth engine around your revenue goals
            </h2>
            <p
              className='mx-auto mt-4 max-w-2xl text-base md:text-lg'
              style={{ color: theme.mutedTextColor }}
            >
              We will audit your pipeline, surface quick wins, and plot the
              automation backlog that keeps marketing, sales, and success rowing
              in sync.
            </p>
            <div className='mt-8 flex justify-center'>
              <LinkButton
                href='/contact-us'
                size='lg'
                className='group'
                style={buttonStyle}
              >
                Book a growth working session
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
            </div>
          </section>
        </div>

        <ServiceNavigation currentService='ai-powered-growth' theme={theme} />
      </div>
    </div>
  )
}
