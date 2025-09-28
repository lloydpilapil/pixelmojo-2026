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
  title: 'Full-Stack AI Implementation',
  description:
    'Production AI that generates ROI in weeks. Complete ecosystems from infrastructure to interface.',
  pricing: 'Programs from $18K',
}

const pageTitle =
  'Full-Stack AI Implementation | Production AI That Generates ROI'
const pageDescription =
  'Production AI that generates ROI in weeks. Complete ecosystems from infrastructure to interface.'
const pageUrl = 'https://pixelmojo.com/services/full-stack-ai'
const pageImage = '/pixelmojo-services-full-stack-ai-02.webp'
const brandedTitle = `${pageTitle} | Pixelmojo`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: brandedTitle,
    description: pageDescription,
    url: pageUrl,
    images: [
      {
        url: pageImage,
        width: 1200,
        height: 630,
        alt: brandedTitle,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: brandedTitle,
    description: pageDescription,
    images: [pageImage],
  },
}

const heroStats = [
  {
    value: '6 weeks',
    label: 'Production milestone',
    detail:
      'First feature in the hands of users with monitoring and guardrails live.',
  },
  {
    value: '4x',
    label: 'Deployment velocity',
    detail:
      'Model updates, integrations, and UI improvements shipping every sprint.',
  },
  {
    value: '99.5%',
    label: 'Reliability targets',
    detail:
      'Observability, testing, and rollback plans keep uptime and safety intact.',
  },
]

const stackBlueprint = [
  {
    eyebrow: 'Data Spine',
    title: 'Pipelines you can trust',
    bullets: [
      'Ingestion, cleaning, and governance layers tailored to your compliance needs.',
      'Feature stores and vector databases that support retrieval-augmented workflows.',
      'Quality scoring and drift detection with automated remediation paths.',
    ],
  },
  {
    eyebrow: 'Model Layer',
    title: 'Balanced between bespoke and off-the-shelf',
    bullets: [
      'Strategy for when to fine-tune, prompt engineer, or orchestrate multiple models.',
      'Evaluation harness with human-in-the-loop review where it matters most.',
      'Cost and latency monitoring to protect gross margin and customer experience.',
    ],
  },
  {
    eyebrow: 'Interface & Workflow',
    title: 'Experiences that feel native to your product',
    bullets: [
      'Copilots, dashboards, and automations embedded into existing journeys.',
      'Role-based permissions and audit trails that satisfy IT and security.',
      'Feedback capture wired straight into backlog refinement and model retraining.',
    ],
  },
]

const deliveryTimeline = [
  {
    title: 'Architecture decisions',
    duration: 'Weeks 1-2',
    description:
      'We partner with your leads to choose cloud, data, and orchestration patterns that respect existing investments and regulatory boundaries.',
  },
  {
    title: 'Pilot build',
    duration: 'Weeks 3-6',
    description:
      'Cross-functional pods deliver the end-to-end workflow: data pipelines, model logic, and user-facing surfaces working together with telemetry.',
  },
  {
    title: 'Hardening + scale',
    duration: 'Weeks 7-9',
    description:
      'Load testing, security reviews, and compliance checks precede wider rollout. Automation handles deployment, rollback, and monitoring.',
  },
  {
    title: 'Enable + handoff',
    duration: 'Weeks 10-12',
    description:
      'Training, documentation, and ownership plans empower internal teams to operate, iterate, and extend the solution safely.',
  },
]

const podHighlights = [
  {
    title: 'Product + Strategy',
    description:
      'Translates business goals into outcome-driven roadmaps and sprint cadences.',
  },
  {
    title: 'Applied AI Engineering',
    description:
      'Designs, builds, and evaluates the models, integrations, and automations.',
  },
  {
    title: 'Experience + Change',
    description:
      'Crafts the UI, training, and communications that drive adoption.',
  },
]

const operationsHighlights = [
  {
    title: 'Runbook + observability',
    description:
      'Dashboards, alerts, and on-call workflows to keep systems healthy 24/7.',
  },
  {
    title: 'Compliance toolkit',
    description:
      'Traceability, audit trails, and policy docs aligned to your industry requirements.',
  },
  {
    title: 'Scale roadmap',
    description:
      'Multi-quarter plan covering feature expansion, team needs, and investment cases.',
  },
]

export default function FullStackAIImplementation() {
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
            eyebrow='Data • Intelligence • Experience'
            title='Your AI platform, deployed end to end'
            description={`We bring the strategists, engineers, and designers that build production-grade AI without the usual integration hangovers.`}
            subtitle='Product and engineering enablement covering data pipelines, models, and shipped experiences.'
            price={service.pricing}
            layout='split'
            image={{
              src: '/pixelmojo-services-full-stack-ai.webp',
              alt: 'End-to-end AI architecture diagram spanning data to interface layers',
            }}
          >
            <div className='flex flex-wrap gap-4'>
              <LinkButton
                href='/contact-us'
                size='lg'
                className='group'
                style={buttonStyle}
              >
                Scope my AI program
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
            </div>
          </ServiceHero>

          <ServiceStatList theme={theme} items={heroStats} />

          <ServiceSplitSection
            theme={theme}
            eyebrow='Blueprint first'
            title='Architecture aligned to outcomes'
            description={`Before we ship a line of code, we model how intelligence flows through your organization, from data sourcing to user impact.`}
            bullets={[
              'Capability mapping shows which teams own, operate, and benefit from each component.',
              'Total cost of ownership forecasted with options to flex up or down over time.',
              'Risk register covering compliance, security, and data exposure scenarios.',
            ]}
            image={{
              src: '/pixelmojo-services-full-stack-ai-02.webp',
              alt: 'Blueprint detailing AI platform capabilities and ownership',
            }}
          />

          <div className='space-y-8'>
            <div className='max-w-3xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                Stack we deliver as part of every engagement
              </h2>
              <p
                className='mt-4 text-base md:text-lg'
                style={{ color: theme.mutedTextColor }}
              >
                Data, models, and experiences launch together so value is
                obvious to stakeholders.
              </p>
            </div>
            <ServiceCardGrid theme={theme} items={stackBlueprint} />
          </div>

          <ServiceSplitSection
            theme={theme}
            eyebrow='Pods that ship'
            title='Cross-functional squads embedded with you'
            description={`We slot into your cadence, augment existing teams, and leave you with the capability to keep shipping after we roll off.`}
            bullets={[
              'Daily stand-ups with your product and engineering leads to keep priorities tight.',
              'Shared documentation, architecture diagrams, and decision logs for transparency.',
              'Pairing sessions transfer knowledge to internal engineers and analysts.',
            ]}
            reverse
            image={{
              src: '/pixelmojo-services-full-stack-ai-03.webp',
              alt: 'Implementation pod coordinating AI build with client stakeholders',
            }}
          />

          <div className='space-y-8'>
            <div className='max-w-3xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                Implementation runway with zero guesswork
              </h2>
            </div>
            <ServiceTimeline theme={theme} items={deliveryTimeline} />
          </div>

          <div className='space-y-6'>
            <div className='max-w-2xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                Embedded capability when we are done
              </h2>
            </div>
            <ServiceCardGrid theme={theme} items={podHighlights} compact />
            <ServiceCardGrid
              theme={theme}
              items={operationsHighlights}
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
              Ready to operationalise AI across your stack?
            </h2>
            <p
              className='mx-auto mt-4 max-w-2xl text-base md:text-lg'
              style={{ color: theme.mutedTextColor }}
            >
              We will review your roadmap, identify the highest-impact
              workflows, and co-design a delivery plan that proves ROI before
              the quarter closes.
            </p>
            <div className='mt-8 flex justify-center'>
              <LinkButton
                href='/contact-us'
                size='lg'
                className='group'
                style={buttonStyle}
              >
                Book the architecture workshop
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
            </div>
          </section>
        </div>

        <ServiceNavigation currentService='full-stack-ai' theme={theme} />
      </div>
    </div>
  )
}
