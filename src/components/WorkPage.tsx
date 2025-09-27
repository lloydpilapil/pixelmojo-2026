import type { Metadata } from 'next'
import { LinkButton } from './ui/button'
import HeroVisual from './HeroVisual'
import { WorkItem, generateAltText } from '@/data/works'
import ProjectNavigation from './ProjectNavigation'

interface WorkPageProps {
  work: WorkItem
}

export function generateWorkMetadata(work: WorkItem): Metadata {
  return {
    title: `${work.title} | Pixelmojo`,
    description: work.description,
    openGraph: {
      title: `${work.title} | Pixelmojo`,
      description: work.description,
      type: 'website',
    },
  }
}

export default function WorkPage({ work }: WorkPageProps) {
  const isDesignSwissKnife = work.slug === '/projects/design-swiss-knife'

  const designSwissKnifeStats = [
    {
      label: 'Variations Produced',
      value: '100+',
      detail:
        'Batch-generate on-brand ads from a single template without manual layer shuffling.',
    },
    {
      label: 'Production Speed',
      value: '10x faster',
      detail:
        'Compress days of repetitive layout work into one guided workflow designers can trust.',
    },
    {
      label: 'Quality Score Uplift',
      value: '+22%',
      detail:
        'Automated scoring lifts baseline compliance across typography, contrast, and CTA visibility.',
    },
  ]

  const designSwissKnifeWorkflow = [
    {
      stage: 'Phase 01',
      title: 'Template intelligence',
      description:
        'The plugin inspects base frames, maps content layers, and locks brand tokens before automation kicks in.',
    },
    {
      stage: 'Phase 02',
      title: 'AI content orchestration',
      description:
        'Context-aware prompts generate multiple headline and body combinations while respecting tone, length, and compliance.',
    },
    {
      stage: 'Phase 03',
      title: 'Batch render & review',
      description:
        'Variations export into a review grid with live scoring, quick overrides, and handoff-ready assets for marketers.',
    },
  ]

  const designSwissKnifeCapabilities = [
    {
      icon: '🚀',
      title: 'Adaptive Layout Engine',
      description:
        'Spin up families of ads from one master frame while the layout engine preserves brand grids, spacing, and typography without manual nudging.',
    },
    {
      icon: '✍️',
      title: 'Guided Copy Intelligence',
      description:
        'Purpose-built prompts keep tone, compliance, and length on brief while OpenAI plus Mistral fallback generate ready-to-test messaging.',
    },
    {
      icon: '📊',
      title: 'Visual Quality Radar',
      description:
        'Automated scoring surfaces typography, contrast, and CTA visibility risks instantly so designers can correct before export.',
    },
    {
      icon: '🧪',
      title: 'Experiment Command Center',
      description:
        'Side-by-side variant previews, performance projections, and quick filters keep experimentation organized for growth teams.',
    },
    {
      icon: '🧠',
      title: 'Semantic Layer Mapping',
      description:
        'Intelligent layer parsing understands hierarchy, tagging headlines, subheads, and CTAs so content swaps land exactly where expected.',
    },
    {
      icon: '📦',
      title: 'Review-Ready Delivery',
      description:
        'Progress tracking, font management, and grid exports roll into cleaner handoffs so teams can launch without extra prep.',
    },
  ]

  return (
    <div className='container mx-auto px-4 py-20 lg:py-32 max-w-7xl'>
      {/* Hero Section */}
      <div className='relative mb-24 lg:mb-32 w-screen -translate-x-1/2 px-4 sm:px-8 lg:px-16 xl:px-24 left-1/2'>
        <div className='mx-auto w-full max-w-[90rem] space-y-12 lg:space-y-16 text-center'>
          <h1 className='mx-auto leading-tight mb-8 lg:mb-12'>{work.title}</h1>
          <p className='mx-auto max-w-4xl text-lg lg:text-xl text-muted-foreground mb-10 lg:mb-14'>
            {work.description}
          </p>

          {/* Demo Link */}
          {work.demoUrl && (
            <div className='flex justify-center pt-4 lg:pt-8'>
              <LinkButton
                href={work.demoUrl}
                variant='default'
                size='default'
                className='group'
              >
                View Live Project
              </LinkButton>
            </div>
          )}
        </div>
      </div>

      {isDesignSwissKnife && (
        <section className='mb-16'>
          <div className='grid gap-10 text-center sm:grid-cols-3'>
            {designSwissKnifeStats.map(stat => (
              <div key={stat.label} className='space-y-2'>
                <p className='text-sm font-semibold uppercase tracking-wide text-primary/80'>
                  {stat.label}
                </p>
                <div className='text-3xl font-bold text-foreground'>
                  {stat.value}
                </div>
                <p className='text-sm text-muted-foreground'>{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cover Image */}
      {work.coverImage && (
        <div className='mb-24 lg:mb-32'>
          <HeroVisual
            src={work.coverImage}
            alt={generateAltText(work, 'main')}
            priority
            animation='reveal'
            variant='full'
            className='left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden rounded-3xl [&>div]:w-full [&>div]:h-full [&>div>img]:w-full [&>div>img]:h-full [&>div>img]:object-cover'
          />
        </div>
      )}

      {/* Project Content */}
      <div className='mb-24 lg:mb-32'>
        {isDesignSwissKnife ? (
          <div className='space-y-24 lg:space-y-32'>
            {/* Project Overview */}
            <section className='space-y-16 lg:space-y-20'>
              <div className='text-center'>
                <h2 className='text-4xl md:text-5xl font-bold mb-4 text-primary'>
                  Project Overview
                </h2>
                <p className='mx-auto max-w-3xl text-base text-muted-foreground md:text-lg'>
                  Why the Design Swiss Knife exists and the impact it unlocks
                  for in-house designers and marketing teams.
                </p>
              </div>

              <div className='grid items-start gap-12 lg:grid-cols-3'>
                <div className='lg:col-span-2 space-y-6 text-left'>
                  <p className='text-xl leading-relaxed text-muted-foreground'>
                    This is a comprehensive AI-enhanced mass creative production
                    Figma plugin designed for designers and marketers to rapidly
                    generate ad variations and analyze design quality.
                  </p>
                  <p className='text-lg leading-relaxed text-foreground'>
                    <strong>Primary Purpose:</strong> Automate the creation of
                    multiple ad variations from a single template by replacing
                    text content with different headlines and descriptions.
                  </p>
                  <p className='text-lg leading-relaxed font-medium text-primary'>
                    The plugin bridges design and marketing workflows, enabling
                    rapid creative iteration while maintaining quality standards
                    through automated analysis.
                  </p>
                </div>

                <div className='space-y-4 lg:border-l lg:border-border/50 lg:pl-8'>
                  <div className='flex items-center gap-4'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10'>
                      <span className='text-2xl'>⚡</span>
                    </div>
                    <div>
                      <div className='text-2xl font-bold text-primary'>10x</div>
                      <div className='text-sm text-muted-foreground'>
                        Faster production
                      </div>
                    </div>
                  </div>
                  <h3 className='text-xl font-bold text-primary'>
                    Core mission
                  </h3>
                  <p className='text-sm leading-relaxed text-muted-foreground'>
                    Enable rapid creative iteration while maintaining brand
                    consistency through intelligent automation and guided QA.
                  </p>
                  <ul className='space-y-3 text-sm text-muted-foreground'>
                    <li className='flex items-start gap-3'>
                      <span className='mt-1 h-2 w-2 rounded-full bg-primary'></span>
                      <span>
                        Automated design scoring ensures every variation is
                        launch-ready.
                      </span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='mt-1 h-2 w-2 rounded-full bg-primary'></span>
                      <span>
                        Smart text classification preserves layout hierarchy
                        automatically.
                      </span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='mt-1 h-2 w-2 rounded-full bg-primary'></span>
                      <span>
                        Batch exports route seamlessly into performance
                        marketing pipelines.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Production Workflow */}
            <section className='space-y-12 lg:space-y-16'>
              <div className='text-center'>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary/70'>
                  Flow in three beats
                </p>
                <h2 className='text-3xl font-bold md:text-4xl'>
                  Creative operations we automated
                </h2>
                <p className='mt-4 text-base text-muted-foreground md:text-lg'>
                  Each phase keeps designers in control while the plugin scales
                  production, review, and handoff.
                </p>
              </div>
              <div className='grid gap-8 md:grid-cols-3'>
                {designSwissKnifeWorkflow.map(phase => (
                  <div key={phase.stage} className='space-y-3 text-left'>
                    <span className='text-xs font-semibold uppercase tracking-[0.18em] text-primary/70'>
                      {phase.stage}
                    </span>
                    <h3 className='text-xl font-semibold text-foreground'>
                      {phase.title}
                    </h3>
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Signature Capabilities */}
            <section className='space-y-12 lg:space-y-16'>
              <div className='text-center'>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary/70'>
                  Signature capabilities
                </p>
                <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                  Where automation still feels handcrafted
                </h2>
                <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
                  Each module keeps creative control intact while the plugin
                  handles the repetitive operations.
                </p>
              </div>

              <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left'>
                {designSwissKnifeCapabilities.map(capability => (
                  <div key={capability.title} className='space-y-3'>
                    <span className='text-3xl'>{capability.icon}</span>
                    <h3 className='text-xl font-semibold text-foreground'>
                      {capability.title}
                    </h3>
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {capability.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Value Proposition */}
            <section className='space-y-16 lg:space-y-20'>
              <div className='text-center'>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary/70'>
                  Why teams keep it in rotation
                </p>
                <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                  The Value Proposition
                </h2>
                <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
                  Creative and revenue teams finally share one automated
                  workspace for campaign-ready output.
                </p>
              </div>

              <div className='grid gap-12 lg:grid-cols-2 text-left'>
                <div className='space-y-6'>
                  <div className='flex items-center gap-3'>
                    <span className='text-3xl'>🎨</span>
                    <h3 className='text-3xl font-bold text-primary'>
                      For Designers
                    </h3>
                  </div>
                  <p className='text-base text-muted-foreground'>
                    Keeps craft decisions front-and-center while automation
                    clears the production backlog.
                  </p>
                  <ul className='space-y-4 text-muted-foreground'>
                    <li>
                      <h4 className='font-semibold text-foreground'>
                        Production sprint ready
                      </h4>
                      <p className='text-sm'>
                        Batch 80+ variants in a single session with brand tokens
                        already locked, so designers stay focused on concepting.
                      </p>
                    </li>
                    <li>
                      <h4 className='font-semibold text-foreground'>
                        Live quality radar
                      </h4>
                      <p className='text-sm'>
                        Scorecards flag typography, contrast, and CTA placement
                        issues before anything leaves Figma.
                      </p>
                    </li>
                    <li>
                      <h4 className='font-semibold text-foreground'>
                        Precision overrides
                      </h4>
                      <p className='text-sm'>
                        Smart defaults do the heavy lifting, but every layer
                        stays editable when designers want to fine-tune.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className='space-y-6'>
                  <div className='flex items-center gap-3'>
                    <span className='text-3xl'>📊</span>
                    <h3 className='text-3xl font-bold text-accent'>
                      For Marketers
                    </h3>
                  </div>
                  <p className='text-base text-muted-foreground'>
                    Campaign ops see what is launch-ready, what needs edits, and
                    why—with zero spreadsheet wrangling.
                  </p>
                  <ul className='space-y-4 text-muted-foreground'>
                    <li>
                      <h4 className='font-semibold text-foreground'>
                        Always-on campaign inventory
                      </h4>
                      <p className='text-sm'>
                        One template becomes a library of approved variants,
                        ready for every channel within minutes.
                      </p>
                    </li>
                    <li>
                      <h4 className='font-semibold text-foreground'>
                        AI copy co-pilot
                      </h4>
                      <p className='text-sm'>
                        Structured prompts keep positioning consistent while new
                        offers, CTAs, and compliance notes stay on message.
                      </p>
                    </li>
                    <li>
                      <h4 className='font-semibold text-foreground'>
                        Evidence-first optimization
                      </h4>
                      <p className='text-sm'>
                        Metrics roll up into performance-ready summaries so
                        growth teams decide based on predicted lift, not
                        guesswork.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Technology Stack */}
            <section className='space-y-16 lg:space-y-20'>
              <div className='text-center'>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary/70'>
                  Under the hood
                </p>
                <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                  Technology Stack
                </h2>
                <p className='text-xl text-muted-foreground max-w-4xl mx-auto'>
                  Modern tooling tuned for the Figma plugin runtime so creative,
                  data, and delivery stay in sync.
                </p>
              </div>

              <div className='grid gap-10 lg:grid-cols-3 text-left'>
                <div className='space-y-6'>
                  <div className='flex items-center gap-3'>
                    <span className='text-3xl'>🎨</span>
                    <h3 className='text-2xl font-bold text-blue-600'>
                      Frontend
                    </h3>
                  </div>
                  <ul className='space-y-3 text-sm text-muted-foreground'>
                    <li>
                      HTML5/CSS3 foundation layered with Material 3 tokens.
                    </li>
                    <li>
                      Vanilla TypeScript drives lightweight plugin UI logic.
                    </li>
                    <li>
                      Material Design components tuned to the Figma canvas.
                    </li>
                  </ul>
                </div>

                <div className='space-y-6'>
                  <div className='flex items-center gap-3'>
                    <span className='text-3xl'>⚙️</span>
                    <h3 className='text-2xl font-bold text-green-600'>
                      Backend & Core
                    </h3>
                  </div>
                  <ul className='space-y-3 text-sm text-muted-foreground'>
                    <li>TypeScript compiled to performant plugin bundles.</li>
                    <li>
                      Figma Plugin API orchestrates frames, layers, and assets.
                    </li>
                    <li>OpenAI GPT-3.5 powers the copy intelligence layer.</li>
                    <li>Mistral fallback keeps prompt generation resilient.</li>
                  </ul>
                </div>

                <div className='space-y-6'>
                  <div className='flex items-center gap-3'>
                    <span className='text-3xl'>🛠️</span>
                    <h3 className='text-2xl font-bold text-purple-600'>
                      Development Tools
                    </h3>
                  </div>
                  <ul className='space-y-3 text-sm text-muted-foreground'>
                    <li>
                      ESLint + @figma/eslint-plugin-figma-plugins enforce
                      discipline.
                    </li>
                    <li>
                      Strict TypeScript configuration catches regressions early.
                    </li>
                    <li>NPM workspace keeps plugin dependencies tidy.</li>
                    <li>
                      @figma/plugin-typings provide typed access to canvas APIs.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        ) : (
          // Default placeholder for other projects
          <div className='text-center'>
            <div className='p-12 rounded-lg border-2 border-dashed border-gray-300'>
              <h2 className='text-2xl font-bold mb-4 text-muted'>
                Project Content Coming Soon
              </h2>
              <p className='text-muted'>
                This is a reusable component structure. Project details will be
                populated here.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Project Navigation */}
      <div className='pt-16 lg:pt-24'>
        <ProjectNavigation currentSlug={work.slug} />
      </div>
    </div>
  )
}
