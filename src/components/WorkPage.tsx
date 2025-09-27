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
    <div className='container mx-auto px-4 py-20 lg:py-32 max-w-7xl'>
      {/* Hero Section */}
      <div className='relative mb-24 lg:mb-32 w-screen -translate-x-1/2 px-4 sm:px-8 lg:px-16 xl:px-24 left-1/2'>
        <div className='mx-auto w-full max-w-[90rem] space-y-12 lg:space-y-16 text-center'>
          <h1 className='mx-auto leading-tight mb-8 lg:mb-12'>{work.title}</h1>
          {isMojoAI && (
            <h2 className='text-2xl lg:text-3xl font-semibold text-primary mb-6 lg:mb-8'>
              Your Creative Copilot for Figma
            </h2>
          )}
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
        {isMojoAI ? (
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
                  faster. The demand for a steady stream of fresh, impactful ad
                  creatives, social media content, and campaign assets has never
                  been higher.
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
                  We built Mojo AI to fundamentally transform how designers and
                  marketers scale their creative output. Our mission is to
                  empower you to do more, faster, and smarter, by automating the
                  mundane and augmenting your creative genius with artificial
                  intelligence.
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
                    influence the development of this powerful tool. If you're a
                    designer or marketer eager to streamline your creative
                    workflow and leverage the power of AI, we want to hear from
                    you!
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
