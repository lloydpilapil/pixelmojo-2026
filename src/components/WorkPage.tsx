import type { Metadata } from 'next'
import Image from 'next/image'
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
  const isMojoAI = work.slug === '/projects/mojo-ai'
  const isLogisticsSystem =
    work.slug === '/projects/logistics-track-trace-system'

  const painPoints = [
    {
      title: 'Repetitive Manual Work',
      description:
        'Adapting a single design into dozens, or even hundreds, of variations for A/B testing or diverse channels is a tedious, time-consuming nightmare. Copy-pasting, resizing, and tweaking text drains hours that could be spent on high-level creative strategy.',
    },
    {
      title: 'The Content Gap',
      description:
        'Sourcing unique headlines and descriptions for every variation is a constant struggle. Brainstorming new copy for every ad can slow down even the most efficient teams.',
    },
    {
      title: 'Subjective Design Decisions',
      description:
        'Without objective data, understanding why one ad performs better than another can feel like guesswork, making true optimization difficult.',
    },
  ]

  const solutionFeatures = [
    {
      title: 'Mass Creative Generation, Instantly',
      pain: 'The endless manual repetition of creating ad variations.',
      solution:
        'From a single Figma template, Mojo AI can generate up to 100 unique ad variations in minutes, not hours or days. It intelligently identifies design elements and automates the creation process, freeing you from tedious, repetitive tasks.',
    },
    {
      title: 'AI-Powered Content Creation',
      pain: 'The struggle to generate diverse and effective copy for every ad variant.',
      solution:
        "Integrated with advanced AI models like OpenAI (GPT-3.5) and Mistral AI, Mojo AI can automatically generate contextual headlines and descriptions tailored to your campaign needs. Say goodbye to writer's block and hello to a limitless stream of compelling copy.",
    },
    {
      title: 'Data-Driven Design Insights',
      pain: 'Subjective design choices and uncertainty about what makes a design perform.',
      solution:
        'Mojo AI includes an automated design quality scoring system. It analyzes typography, color contrast, spacing, and CTA visibility, providing an objective score for each variation. This means you can identify high-quality designs and make informed decisions for A/B testing with confidence.',
    },
  ]

  const keyFeatures = [
    {
      icon: '⚡',
      title: 'Rapid Generation',
      description: 'Produce up to 100 ad variations from one template.',
    },
    {
      icon: '🧠',
      title: 'Smart AI Content',
      description:
        'Generate headlines & descriptions with OpenAI & Mistral AI.',
    },
    {
      icon: '✅',
      title: 'Design Quality Score',
      description:
        'Automated analysis for typography, contrast, spacing, and more.',
    },
    {
      icon: '↔️',
      title: 'A/B Test Ready',
      description:
        'Tools for comparing design variants and predicting performance.',
    },
    {
      icon: '🔍',
      title: 'Intelligent Text Detection',
      description: 'Automatically classifies headlines vs. descriptions.',
    },
    {
      icon: '⚙️',
      title: 'Real-time Progress',
      description: 'Transparent generation process with live updates.',
    },
  ]

  return (
    <div>
      {/* Hero Section - 100% Width */}
      <div className='w-full px-4 py-20 lg:py-32'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Content - Left Side */}
          <div>
            {/* Project Metadata */}
            <div className='flex flex-wrap gap-4 mb-6'>
              <span className='text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full'>
                {work.category}
              </span>
              <span className='text-sm font-medium text-muted-foreground'>
                {work.year}
              </span>
              {work.isNew && (
                <span className='text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full'>
                  New
                </span>
              )}
            </div>

            <h1 className='leading-tight mb-6 lg:mb-8'>{work.title}</h1>
            {isMojoAI && (
              <h2 className='text-2xl lg:text-3xl font-semibold text-primary mb-6'>
                Your Creative Copilot for Figma
              </h2>
            )}
            <p className='text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-10'>
              {work.description}
            </p>

            {/* Technologies */}
            {work.technologies && work.technologies.length > 0 && (
              <div className='mb-8'>
                <p className='text-sm font-semibold text-foreground mb-3'>
                  Technologies:
                </p>
                <div className='flex flex-wrap gap-2'>
                  {work.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className='text-sm text-muted-foreground bg-muted px-3 py-1 rounded-lg'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Demo Link */}
            {work.demoUrl && (
              <div className='flex pt-4'>
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

          {/* Cover Image - Right Side */}
          {work.coverImage && (
            <div className='relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden'>
              <HeroVisual
                src={work.coverImage}
                alt={generateAltText(work, 'main')}
                priority
                animation='reveal'
                className='w-full h-full [&>div]:w-full [&>div]:h-full [&>div>img]:w-full [&>div>img]:h-full [&>div>img]:object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent' />
            </div>
          )}
        </div>
      </div>

      {/* Project Content - Normal Container */}
      <div className='container mx-auto px-4 py-0 lg:py-0 max-w-7xl'>
        <div className='mb-24 lg:mb-32'>
          {isLogisticsSystem ? (
            <div className='space-y-24 lg:space-y-32'>
              {/* The Problem Section */}
              <section className='space-y-16 lg:space-y-20'>
                <div className='text-center'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6 text-destructive'>
                    The Problem
                  </h2>
                  <p className='mx-auto max-w-4xl text-lg lg:text-xl text-muted-foreground leading-relaxed'>
                    Our client was drowning in operational inefficiencies. Their
                    logistics operations were hampered by disconnected tools and
                    manual processes that couldn't scale with their growing
                    business.
                  </p>
                </div>

                <div className='grid gap-8 md:grid-cols-3'>
                  <div className='bg-destructive/5 border border-destructive/20 rounded-2xl p-8 space-y-4'>
                    <h3 className='text-xl font-bold text-destructive'>
                      Fragmented Operations
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      Manual tools and spreadsheets slowed down shipment
                      visibility and created errors.
                    </p>
                  </div>
                  <div className='bg-destructive/5 border border-destructive/20 rounded-2xl p-8 space-y-4'>
                    <h3 className='text-xl font-bold text-destructive'>
                      Limited Transparency
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      Clients had no direct way to see real-time shipment
                      status.
                    </p>
                  </div>
                  <div className='bg-destructive/5 border border-destructive/20 rounded-2xl p-8 space-y-4'>
                    <h3 className='text-xl font-bold text-destructive'>
                      Low Productivity
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      Ops teams spent hours reconciling updates and answering
                      repetitive inquiries.
                    </p>
                  </div>
                </div>
              </section>

              {/* The Solution Section */}
              <section className='space-y-16 lg:space-y-20'>
                <div className='text-center'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6 text-primary'>
                    The Solution
                  </h2>
                  <p className='mx-auto max-w-4xl text-lg lg:text-xl text-muted-foreground leading-relaxed'>
                    We designed and built a comprehensive Track & Trace system
                    that transformed their operations from chaos to clarity.
                  </p>
                </div>

                <div className='space-y-12'>
                  <div className='bg-primary/5 border border-primary/20 rounded-2xl p-8 lg:p-12'>
                    <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
                      <div className='space-y-6'>
                        <h4 className='text-2xl font-bold text-primary'>
                          Unified Dashboard
                        </h4>
                        <p className='text-lg text-muted-foreground leading-relaxed'>
                          A role-based platform (Admin, Master, Client)
                          consolidating all shipment data in one place. Each
                          role gets exactly what they need, when they need it.
                        </p>
                      </div>
                      <div className='aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border'>
                        <Image
                          src='/placeholder.svg'
                          alt='Unified Dashboard Interface'
                          width={800}
                          height={600}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='bg-primary/5 border border-primary/20 rounded-2xl p-8 lg:p-12'>
                    <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
                      <div className='order-2 lg:order-1 aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border'>
                        <Image
                          src='/placeholder.svg'
                          alt='Real-Time Tracking Visualization'
                          width={800}
                          height={600}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='order-1 lg:order-2 space-y-6'>
                        <h4 className='text-2xl font-bold text-primary'>
                          Real-Time Tracking
                        </h4>
                        <p className='text-lg text-muted-foreground leading-relaxed'>
                          Visualized milestones and alerts from booking to
                          delivery. Every stakeholder can see exactly where
                          shipments are in real-time.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='bg-primary/5 border border-primary/20 rounded-2xl p-8 lg:p-12'>
                    <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
                      <div className='space-y-6'>
                        <h4 className='text-2xl font-bold text-primary'>
                          Client Self-Service
                        </h4>
                        <p className='text-lg text-muted-foreground leading-relaxed'>
                          Shipment lookup without going through support. Clients
                          can track their shipments independently, reducing
                          support tickets by 60%.
                        </p>
                      </div>
                      <div className='aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border'>
                        <Image
                          src='/placeholder.svg'
                          alt='Client Self-Service Portal'
                          width={800}
                          height={600}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Our Process Section */}
              <section className='space-y-16 lg:space-y-20'>
                <div className='text-center'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6 text-accent'>
                    Our Process – AI-Powered Delivery
                  </h2>
                  <p className='mx-auto max-w-4xl text-lg lg:text-xl text-muted-foreground leading-relaxed'>
                    At PixelMojo, we applied our AI-native design methodology to
                    deliver unprecedented speed and quality.
                  </p>
                </div>

                <div className='grid gap-8 md:grid-cols-3'>
                  <div className='bg-accent/5 border border-accent/20 rounded-2xl p-8 space-y-4'>
                    <div className='text-3xl mb-2'>🚀</div>
                    <h3 className='text-xl font-bold text-accent'>
                      Vibe Coding Sessions
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      Fast ideation loops blending AI-assisted prototyping with
                      human UX expertise.
                    </p>
                  </div>
                  <div className='bg-accent/5 border border-accent/20 rounded-2xl p-8 space-y-4'>
                    <div className='text-3xl mb-2'>🤖</div>
                    <h3 className='text-xl font-bold text-accent'>
                      AI-Powered Workflow
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      Automated design documentation, user flow testing, and
                      system prompts validation.
                    </p>
                  </div>
                  <div className='bg-accent/5 border border-accent/20 rounded-2xl p-8 space-y-4'>
                    <div className='text-3xl mb-2'>⚡</div>
                    <h3 className='text-xl font-bold text-accent'>
                      Accelerated Build
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      Delivered 3 months earlier than expected by eliminating
                      redundant cycles.
                    </p>
                  </div>
                </div>
              </section>

              {/* The Impact Section */}
              <section className='space-y-16 lg:space-y-20'>
                <div className='text-center'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                    The Impact
                  </h2>
                  <p className='mx-auto max-w-4xl text-lg lg:text-xl text-muted-foreground leading-relaxed'>
                    Real, measurable results that transformed our client's
                    business operations.
                  </p>
                </div>

                <div className='grid gap-8 md:grid-cols-3'>
                  <div className='text-center space-y-4'>
                    <div className='text-5xl font-bold text-primary'>70%</div>
                    <h3 className='text-xl font-bold'>Productivity Boost</h3>
                    <p className='text-muted-foreground'>
                      Ops workload cut significantly; updates now take minutes
                      instead of hours.
                    </p>
                  </div>
                  <div className='text-center space-y-4'>
                    <div className='text-5xl font-bold text-primary'>60%</div>
                    <h3 className='text-xl font-bold'>Reduced Escalations</h3>
                    <p className='text-muted-foreground'>
                      Real-time transparency improved customer satisfaction
                      dramatically.
                    </p>
                  </div>
                  <div className='text-center space-y-4'>
                    <div className='text-5xl font-bold text-primary'>3mo</div>
                    <h3 className='text-xl font-bold'>Faster Delivery</h3>
                    <p className='text-muted-foreground'>
                      Early launch allowed our client to realize ROI ahead of
                      schedule.
                    </p>
                  </div>
                </div>
              </section>

              {/* Dashboard Features Section */}
              <section className='space-y-16 lg:space-y-20'>
                <div className='text-center'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6'>
                    Simulated Dashboard Features
                  </h2>
                  <p className='mx-auto max-w-4xl text-lg lg:text-xl text-muted-foreground leading-relaxed'>
                    A modern, AI-driven interface designed for maximum
                    efficiency and clarity.
                  </p>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                  <div className='bg-card border border-border rounded-xl p-6 space-y-3'>
                    <div className='flex items-center gap-3'>
                      <span className='text-2xl'>📦</span>
                      <h3 className='text-lg font-semibold'>
                        Dynamic Shipment Cards
                      </h3>
                    </div>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      Real-time counts of "In Transit," "Delivered," "Delayed"
                      with instant updates.
                    </p>
                  </div>
                  <div className='bg-card border border-border rounded-xl p-6 space-y-3'>
                    <div className='flex items-center gap-3'>
                      <span className='text-2xl'>📈</span>
                      <h3 className='text-lg font-semibold'>
                        Progress Timeline
                      </h3>
                    </div>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      Milestones update automatically as shipments move through
                      the system.
                    </p>
                  </div>
                  <div className='bg-card border border-border rounded-xl p-6 space-y-3'>
                    <div className='flex items-center gap-3'>
                      <span className='text-2xl'>🚨</span>
                      <h3 className='text-lg font-semibold'>Alerts Feed</h3>
                    </div>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      AI-flagged anomalies like customs holds or delays
                      instantly surface.
                    </p>
                  </div>
                  <div className='bg-card border border-border rounded-xl p-6 space-y-3'>
                    <div className='flex items-center gap-3'>
                      <span className='text-2xl'>🔍</span>
                      <h3 className='text-lg font-semibold'>
                        Client Quick Lookup
                      </h3>
                    </div>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      Track any shipment instantly by entering a tracking ID.
                    </p>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className='space-y-12 lg:space-y-16'>
                <div className='text-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 lg:p-16 border border-primary/30'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6 text-primary'>
                    Ready to Transform Your Operations?
                  </h2>
                  <div className='space-y-8 max-w-4xl mx-auto'>
                    <p className='text-lg lg:text-xl text-muted-foreground leading-relaxed'>
                      See how our AI-native approach can deliver your solution
                      months ahead of schedule while cutting operational
                      overhead by up to 70%.
                    </p>

                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                      <LinkButton
                        href='/contact'
                        variant='default'
                        size='lg'
                        className='px-8 py-4 text-lg font-semibold'
                      >
                        Get Your Free Consultation
                      </LinkButton>
                      <LinkButton
                        href='/services'
                        variant='outline'
                        size='lg'
                        className='px-8 py-4 text-lg font-semibold'
                      >
                        Learn About Our Process
                      </LinkButton>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : isMojoAI ? (
            <div className='space-y-24 lg:space-y-32'>
              {/* The Challenge Section */}
              <section className='space-y-16 lg:space-y-20'>
                <div className='text-center'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6 text-destructive'>
                    The Challenge: The Creative Bottleneck is Real
                  </h2>
                  <p className='mx-auto max-w-4xl text-lg lg:text-xl text-muted-foreground leading-relaxed'>
                    In today's fast-paced digital landscape, designers and
                    marketers are constantly under pressure to produce more,
                    faster. The demand for a steady stream of fresh, impactful
                    ad creatives, social media content, and campaign assets has
                    never been higher.
                  </p>
                  <p className='mx-auto max-w-2xl text-xl font-semibold text-foreground mt-8'>
                    But here's the painful truth:
                  </p>
                </div>

                <div className='grid gap-8 md:grid-cols-3'>
                  {painPoints.map((point, index) => (
                    <div
                      key={index}
                      className='bg-destructive/5 border border-destructive/20 rounded-2xl p-8 space-y-4'
                    >
                      <h3 className='text-xl font-bold text-destructive'>
                        {point.title}
                      </h3>
                      <p className='text-muted-foreground leading-relaxed'>
                        {point.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className='text-center'>
                  <p className='mx-auto max-w-4xl text-lg text-muted-foreground leading-relaxed'>
                    This bottleneck doesn't just slow down production; it{' '}
                    <strong>stifles creativity</strong>,{' '}
                    <strong>limits testing</strong>, and ultimately{' '}
                    <strong>impacts campaign performance</strong>.
                  </p>
                </div>
              </section>

              {/* Solution Section */}
              <section className='space-y-16 lg:space-y-20'>
                <div className='text-center'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6 text-primary'>
                    Our Solution: Introducing Mojo AI - Intelligent Creative
                    Production
                  </h2>
                  <p className='mx-auto max-w-4xl text-lg lg:text-xl text-muted-foreground leading-relaxed'>
                    We built Mojo AI to fundamentally transform how designers
                    and marketers scale their creative output. Our mission is to
                    empower you to do more, faster, and smarter, by automating
                    the mundane and augmenting your creative genius with
                    artificial intelligence.
                  </p>
                </div>

                <div className='space-y-16'>
                  <h3 className='text-3xl font-bold text-center text-foreground'>
                    How Mojo AI Solves Your Pain Points:
                  </h3>

                  <div className='space-y-12'>
                    {solutionFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className='bg-primary/5 border border-primary/20 rounded-2xl p-8 lg:p-12'
                      >
                        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
                          {/* Image */}
                          <div className='w-full'>
                            <div className='aspect-[3/2] rounded-xl overflow-hidden bg-muted border border-border'>
                              <Image
                                src='/placeholder.svg'
                                alt={`${feature.title} - Mojo AI feature illustration`}
                                width={1200}
                                height={800}
                                className='w-full h-full object-cover'
                              />
                            </div>
                          </div>

                          {/* Content */}
                          <div className='space-y-6'>
                            <div>
                              <h4 className='text-2xl font-bold text-primary mb-4'>
                                {feature.title}
                              </h4>
                              <div className='space-y-3'>
                                <p className='text-sm font-semibold text-destructive/80'>
                                  <strong>Pain Solved:</strong> {feature.pain}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className='text-lg text-muted-foreground leading-relaxed'>
                                <strong className='text-primary'>
                                  Our Approach:
                                </strong>{' '}
                                {feature.solution}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Pilot Project Section */}
              <section className='space-y-12 lg:space-y-16'>
                <div className='text-center bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl p-12 lg:p-16 border border-primary/20'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6 text-primary'>
                    Pilot Project: Join Us on This Journey!
                  </h2>
                  <div className='space-y-8 max-w-4xl mx-auto'>
                    <p className='text-lg lg:text-xl text-muted-foreground leading-relaxed'>
                      Mojo AI is currently a <strong>pilot project</strong>,
                      representing our vision for the future of creative
                      production. We're refining its capabilities and actively
                      seeking designers and marketers who are passionate about
                      innovation to join us.
                    </p>
                    <p className='text-xl font-semibold text-accent'>
                      Your feedback is invaluable as we shape Mojo AI into the
                      ultimate creative copilot.
                    </p>

                    {/* CTA Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
                      <LinkButton
                        href='#'
                        variant='default'
                        size='lg'
                        className='px-8 py-4 text-lg font-semibold'
                      >
                        Join the Pilot Program
                      </LinkButton>
                      <LinkButton
                        href='#'
                        variant='outline'
                        size='lg'
                        className='px-8 py-4 text-lg font-semibold'
                      >
                        Get Early Access
                      </LinkButton>
                    </div>

                    <p className='text-sm text-muted-foreground mt-4'>
                      Limited spots available for our pilot program
                    </p>
                  </div>
                </div>
              </section>

              {/* Key Features Section */}
              <section className='space-y-12 lg:space-y-16'>
                <div className='text-center'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-4 text-foreground'>
                    Key Features at a Glance
                  </h2>
                </div>

                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                  {keyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className='bg-card border border-border rounded-xl p-6 space-y-3 hover:border-primary/50 transition-colors'
                    >
                      <div className='flex items-center gap-3'>
                        <span className='text-2xl'>{feature.icon}</span>
                        <h3 className='text-lg font-semibold text-foreground'>
                          {feature.title}
                        </h3>
                      </div>
                      <p className='text-muted-foreground text-sm leading-relaxed'>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className='space-y-12 lg:space-y-16'>
                <div className='text-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 lg:p-16 border border-primary/30'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6 text-primary'>
                    Interested in Mojo AI?
                  </h2>
                  <div className='space-y-8 max-w-4xl mx-auto'>
                    <p className='text-lg lg:text-xl text-muted-foreground leading-relaxed'>
                      We're gathering interest from early adopters who want to
                      influence the development of this powerful tool. If you're
                      a designer or marketer eager to streamline your creative
                      workflow and leverage the power of AI, we want to hear
                      from you!
                    </p>

                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                      <LinkButton
                        href='#'
                        variant='default'
                        size='lg'
                        className='px-8 py-4 text-lg font-semibold'
                      >
                        Express Your Interest
                      </LinkButton>
                      <LinkButton
                        href='#'
                        variant='outline'
                        size='lg'
                        className='px-8 py-4 text-lg font-semibold'
                      >
                        Join Waitlist
                      </LinkButton>
                    </div>

                    <p className='text-sm text-muted-foreground'>
                      Connect with us via Google Form, Typeform, or simple email
                      submission
                    </p>
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
                  This is a reusable component structure. Project details will
                  be populated here.
                </p>
              </div>
            </div>
          )}

          {/* Project Navigation */}
          <div className='pt-16 lg:pt-24'>
            <ProjectNavigation currentSlug={work.slug} />
          </div>
        </div>
      </div>
    </div>
  )
}
