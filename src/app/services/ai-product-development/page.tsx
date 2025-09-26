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
  title: 'AI Product Development',
  description:
    'Transform your digital product into a growth engine. Stop losing customers to poor user experience—we create intuitive AI-powered interfaces that keep users engaged and drive conversions.',
  pricing: 'From $15K',
}

export const metadata: Metadata = {
  title:
    'AI Product Development | Transform Digital Products Into Growth Engines | Pixelmojo',
  description:
    'Transform your digital product into a growth engine. AI-powered interfaces that drive engagement, conversions, and lasting customer relationships.',
  openGraph: {
    title:
      'AI Product Development | Transform Digital Products Into Growth Engines | Pixelmojo',
    description:
      'Transform your digital product into a growth engine. AI-powered interfaces that drive engagement, conversions, and lasting customer relationships.',
    type: 'website',
  },
}

const heroStats = [
  {
    value: '90 days',
    label: 'Launch window',
    detail: 'Idea to paying users with revenue telemetry wired in.',
  },
  {
    value: '4x',
    label: 'Faster validation',
    detail: 'Dual-LLM research loops compress discovery to weeks, not months.',
  },
  {
    value: '12+',
    label: 'Automations shipped',
    detail: 'Average integrations per MVP covering ops, data, and enablement.',
  },
]

const buildStackCards = [
  {
    eyebrow: 'Foundation',
    title: 'AI core ready for production',
    bullets: [
      'Model orchestration across Claude, GPT-4o, and Bedrock with guardrails in place.',
      'Evaluation harness plus red-team prompts to de-risk launch-day issues.',
      'Latency budgets and cost envelopes set before engineering sprints begin.',
    ],
  },
  {
    eyebrow: 'Experience Layer',
    title: 'Interfaces tuned for monetization',
    bullets: [
      'Activation flows driven by battle-tested design system tokens.',
      'Personalization surfaces mapped to the segments that drive ARR.',
      'Cross-team service blueprints so success, sales, and product see the same story.',
    ],
  },
  {
    eyebrow: 'Growth & Ops',
    title: 'Telemetry that proves ROI',
    bullets: [
      'Revenue dashboards in Mixpanel/dbt ready before beta users arrive.',
      'Anomaly alerts piped into Slack to prevent silent churn moments.',
      'Feedback automations pushing customer evidence into Jira and Notion instantly.',
    ],
  },
]

const deliveryTimeline = [
  {
    title: 'Signals sprint',
    duration: 'Weeks 1-2',
    description:
      'We mine customer telemetry, stakeholder goals, and market whitespace to build a revenue-ranked backlog. Pricing hooks and adoption targets are agreed before we open Figma.',
  },
  {
    title: 'Validation lab',
    duration: 'Weeks 3-4',
    description:
      'Interactive prototypes powered by AI copilots move into user sessions. Every test loops data into your analytics stack so decisions rest on real behaviour, not opinion.',
  },
  {
    title: 'Build + integrate',
    duration: 'Weeks 5-9',
    description:
      'Engineering, data, and design ship the production slice together. Infrastructure, governance, and automation are documented so your team can scale without us.',
  },
  {
    title: 'Revenue launch',
    duration: 'Weeks 10-12',
    description:
      'Pilot cohorts activate with success enablement and experiment roadmaps ready. Growth automations kick in and dashboards show leadership the revenue signal on day one.',
  },
]

const deliverableCards = [
  {
    title: 'Launch-ready product stack',
    bullets: [
      'MVP shipped with auth, data pipelines, analytics, and observability configured.',
      'Operational runbooks so internal teams can iterate without losing velocity.',
    ],
  },
  {
    title: 'Evidence library',
    bullets: [
      'User research recordings, transcripts, and summary briefs tied to roadmap decisions.',
      'Experiment results visualised for board updates and investor conversations.',
    ],
  },
  {
    title: 'Scale roadmap',
    bullets: [
      'Prioritized backlog mapping next four quarters of feature releases.',
      'Hiring, automation, and partner recommendations aligned to revenue targets.',
    ],
  },
]

export default function AIProductDevelopment() {
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
            eyebrow='Build • Launch • Scale'
            title='Ship AI products that prove revenue in quarter one.'
            description={`Our sprint pods pair senior product strategists with automation engineers so you validate, build, and monetize in the same 90-day window.`}
            layout='split'
            image={{
              src: '/pixelmojo-services-ai-product-development.webp',
              alt: 'AI product development collaboration visual',
            }}
          >
            <div className='flex flex-wrap gap-4'>
              <LinkButton
                href='/contact-us'
                size='lg'
                className='group'
                style={buttonStyle}
              >
                Start your project
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
              <LinkButton
                href='/services/revenue-first-design'
                variant='ghost'
                size='lg'
                className='underline-offset-4 hover:underline'
                style={{ color: theme.textColor }}
              >
                Explore design systems
              </LinkButton>
            </div>
          </ServiceHero>

          <ServiceStatList theme={theme} items={heroStats} />

          <ServiceSplitSection
            theme={theme}
            eyebrow='Validation without the drag'
            title='Proof before code hits main'
            description={`Discovery, ops, and experimentation run concurrently so there is never a "wait for research" gap. Every loop is measured against the revenue targets your board already cares about.`}
            bullets={[
              'Dual-LLM design partners pressure-test flows before engineering estimates are locked.',
              'Weekly telemetry syncs translate live customer behaviour into sprint-ready stories.',
              'Revenue instrumentation ships inside prototypes so leadership sees ARR impact instantly.',
            ]}
            image={{
              src: '/placeholder.svg',
              alt: 'Validation workflows mapped with AI support',
            }}
          />

          <div className='space-y-8'>
            <div className='max-w-3xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                Systems we build in the first month
              </h2>
              <p
                className='mt-4 text-base md:text-lg'
                style={{ color: theme.mutedTextColor }}
              >
                Your product leaves the lab with the infrastructure, design
                language, and growth telemetry required to scale, not just a
                shiny prototype.
              </p>
            </div>
            <ServiceCardGrid theme={theme} items={buildStackCards} />
          </div>

          <div className='space-y-8'>
            <div className='max-w-3xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                Delivery rhythm that keeps momentum high
              </h2>
              <p
                className='mt-4 text-base md:text-lg'
                style={{ color: theme.mutedTextColor }}
              >
                Each phase lands tangible assets, approvals, and learnings your
                team can reuse.
              </p>
            </div>
            <ServiceTimeline theme={theme} items={deliveryTimeline} />
          </div>

          <ServiceSplitSection
            theme={theme}
            eyebrow='Embedded team'
            title='Pods that drop into your roadmap without friction'
            description={`We plug into the rituals your team already runs, introduce only the ceremonies that reduce risk, and leave with a repeatable operating system.`}
            bullets={[
              'Product strategy lead aligns exec expectations and keeps decisions moving.',
              'AI enablement engineer pairs with your developers to harden integrations and data.',
              'Growth analyst converts real usage signals into backlog priorities every single week.',
            ]}
            reverse
            image={{
              src: '/placeholder.svg',
              alt: 'Embedded product pod collaborating with client team',
            }}
          />

          <div className='space-y-8'>
            <div className='max-w-3xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                What you walk away with
              </h2>
              <p
                className='mt-4 text-base md:text-lg'
                style={{ color: theme.mutedTextColor }}
              >
                Documentation, assets, and growth plans that help internal teams
                keep scaling long after launch.
              </p>
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
              Ready to launch a product that pays for itself?
            </h2>
            <p
              className='mx-auto mt-4 max-w-2xl text-base md:text-lg'
              style={{ color: theme.mutedTextColor }}
            >
              Schedule a working session and we will map the first 12 weeks,
              identify the critical automations, and align on the metrics that
              matter to your leadership team.
            </p>
            <div className='mt-8 flex justify-center'>
              <LinkButton
                href='/contact-us'
                size='lg'
                className='group'
                style={buttonStyle}
              >
                Book the roadmap sprint
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
            </div>
          </section>
        </div>

        <ServiceNavigation
          currentService='ai-product-development'
          theme={theme}
        />
      </div>
    </div>
  )
}
