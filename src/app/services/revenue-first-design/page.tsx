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
  title: 'Revenue-First Design Systems',
  description:
    'Build a brand that commands attention. We forge visual strategies for tech startups and SaaS businesses that capture attention, build trust, and drive growth through powerful brand identity.',
  pricing: 'Starts at $9K',
}

export const metadata: Metadata = {
  title:
    'Revenue-First Design Systems | Build Brands That Command Attention | Pixelmojo',
  description:
    'Build a brand that commands attention. Visual strategies that capture attention, build trust, and drive growth through powerful brand identity.',
  openGraph: {
    title:
      'Revenue-First Design Systems | Build Brands That Command Attention | Pixelmojo',
    description:
      'Build a brand that commands attention. Visual strategies that capture attention, build trust, and drive growth through powerful brand identity.',
    type: 'website',
  },
}

const heroStats = [
  {
    value: '45 days',
    label: 'System live in product',
    detail:
      'Figma tokens synced to production components with governance in place.',
  },
  {
    value: '3x',
    label: 'Faster asset creation',
    detail:
      'Automated brand kit updates eliminate handoffs between designers and GTM teams.',
  },
  {
    value: '25%',
    label: 'Average conversion lift',
    detail:
      'Measured across pricing pages, demos, and high-intent funnels after launch.',
  },
]

const systemLayers = [
  {
    eyebrow: 'Identity Core',
    title: 'Narrative that travels everywhere',
    bullets: [
      'Messaging architecture tied to each ICP and funnel stage.',
      'Signature visual language with prompt libraries and usage guardrails.',
      'Voice & tone frameworks so AI tools stay on-brand by default.',
    ],
  },
  {
    eyebrow: 'Product Experience',
    title: 'Design language mapped to outcomes',
    bullets: [
      'Component decisions driven by activation, retention, and expansion metrics.',
      'Accessibility baked into tokens, patterns, and content templates.',
      'Usage analytics connected back to component adoption for continuous optimization.',
    ],
  },
  {
    eyebrow: 'Revenue Enablement',
    title: 'Assets that close deals faster',
    bullets: [
      'Interactive demo environments and deck systems aligned to buyer journeys.',
      'Sales enablement hub with motion templates, proof points, and ROI calculators.',
      'Lifecycle content kits for marketing automation and customer success workflows.',
    ],
  },
  {
    eyebrow: 'Operations & Governance',
    title: 'A system teams can trust',
    bullets: [
      'Design ops rituals that keep Figma, code, and documentation in sync automatically.',
      'Contribution models and review gates so updates ship without bottlenecks.',
      'Change logs and rollout playbooks for cross-team visibility.',
    ],
  },
]

const automationTimeline = [
  {
    title: 'Signal scan',
    duration: 'Weeks 1-2',
    description:
      'We audit every touchpoint, from pitch decks to support docs, to find conversion gaps and visual drift. Stakeholder interviews align the system to revenue targets.',
  },
  {
    title: 'System blueprint',
    duration: 'Weeks 3-4',
    description:
      'Experience maps, narrative frameworks, and component hierarchy form the playbook. Prompt libraries and asset recipes are defined for automation tools.',
  },
  {
    title: 'Build + activation',
    duration: 'Weeks 5-7',
    description:
      'Design tokens, coded components, and asset templates ship together. GTM teams start using the system immediately with guided sprints and demos.',
  },
  {
    title: 'Scale + governance',
    duration: 'Weeks 8-9',
    description:
      'Automation hooks keep product, brand, and marketing in sync. Rollout plans, contribution pathways, and measurement dashboards lock in long-term adoption.',
  },
]

const rolloutHighlights = [
  {
    title: 'Activation dashboard',
    description:
      'Live analytics connect component usage, landing-page tests, and revenue KPIs.',
  },
  {
    title: 'GTM enablement suite',
    description:
      'Sales decks, video scripts, and case study modules generated straight from the system.',
  },
  {
    title: 'Brand command center',
    description:
      'Centralised documentation, AI prompts, and change logs that scale with your team.',
  },
]

export default function RevenueFirstDesign() {
  const theme = getServiceTheme(service.title)

  const buttonStyle: CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
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
            eyebrow='Aligned brand + product + growth'
            title='Design systems built to convert, not just impress.'
            description={`Every component, message, and motion is engineered to push revenue, retention, and expansion metrics forward.`}
            subtitle='Brand identity, design system, and governance program tuned to revenue outcomes.'
            price={service.pricing}
            layout='split'
            image={{
              src: '/pixelmojo-services-revenue-first-design-01.webp',
              alt: 'Design leads arranging revenue-first design system components',
            }}
          >
            <div className='flex flex-wrap gap-4'>
              <LinkButton
                href='/contact-us'
                size='lg'
                className='group'
                style={buttonStyle}
              >
                Plan your system
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
            </div>
          </ServiceHero>

          <ServiceStatList theme={theme} items={heroStats} />

          <ServiceSplitSection
            theme={theme}
            eyebrow='Revenue-first identity'
            title='Strategy, storytelling, and systems tied together'
            description={`We align brand expression with product realities and go-to-market velocity. The result: a design language proven to impact pipeline, adoption, and retention.`}
            bullets={[
              'Quantitative heuristics guide every component choice so experimentation teams know the expected lift.',
              'Finance, product, and marketing scorecards share the same metrics for a unified narrative.',
              'AI prompt libraries mirror your voice so copy, visuals, and video stay consistent at speed.',
            ]}
            image={{
              src: '/pixelmojo-services-revenue-first-design-02.webp',
              alt: 'Brand and product stakeholders aligning shared performance metrics',
            }}
          />

          <div className='space-y-8'>
            <div className='max-w-3xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                The layers of a revenue-first design system
              </h2>
              <p
                className='mt-4 text-base md:text-lg'
                style={{ color: theme.mutedTextColor }}
              >
                From executive story to on-page UI, everything is orchestrated
                so every stakeholder can contribute without breaking the brand.
              </p>
            </div>
            <ServiceCardGrid theme={theme} items={systemLayers} columns={2} />
          </div>

          <ServiceSplitSection
            theme={theme}
            eyebrow='Rollout without rework'
            title='Change management that sticks'
            description={`We choreograph communication, training, and feedback loops so the system feels empowering, not restrictive, for every team touching it.`}
            bullets={[
              'Executive briefings connect investment to ARR and brand equity goals.',
              'Team-specific playbooks give product, marketing, and success the assets they need on day one.',
              'Async office hours, Loom libraries, and change logs keep adoption high long-term.',
            ]}
            reverse
            tone='muted'
            image={{
              src: '/pixelmojo-services-revenue-first-design-03.webp',
              alt: 'Team planning the rollout sequence for a design system playbook',
            }}
          />

          <div className='space-y-8'>
            <div className='max-w-3xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                Automation keeps everything synched
              </h2>
              <p
                className='mt-4 text-base md:text-lg'
                style={{ color: theme.mutedTextColor }}
              >
                Agents, scripts, and workflows run behind the scenes so humans
                focus on high-value creativity instead of manual updates.
              </p>
            </div>
            <ServiceTimeline theme={theme} items={automationTimeline} />
          </div>

          <div className='space-y-6'>
            <div className='max-w-2xl'>
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                What launches with your system
              </h2>
            </div>
            <ServiceCardGrid
              theme={theme}
              items={rolloutHighlights}
              compact
              columns={3}
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
              Make every touchpoint feel aligned and profitable
            </h2>
            <p
              className='mx-auto mt-4 max-w-2xl text-base md:text-lg'
              style={{ color: theme.mutedTextColor }}
            >
              We will assess your current system, identify the revenue gaps, and
              design a plan that has every team shipping on-brand,
              high-converting experiences in weeks.
            </p>
            <div className='mt-8 flex justify-center'>
              <LinkButton
                href='/contact-us'
                size='lg'
                className='group'
                style={buttonStyle}
              >
                Schedule the system audit
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
            </div>
          </section>
        </div>

        <ServiceNavigation
          currentService='revenue-first-design'
          theme={theme}
        />
      </div>
    </div>
  )
}
