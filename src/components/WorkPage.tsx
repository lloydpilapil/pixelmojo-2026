import type { Metadata } from 'next'
import Image from 'next/image'
import { LinkButton } from './ui/button'
import { Tag } from './ui/tag'
import { ExternalLink } from 'lucide-react'
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
  return (
    <div className='container mx-auto px-4 py-16 max-w-7xl'>
      {/* Hero Section */}
      <div className='text-center mb-16'>
        <div className='inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm'>
          <span>{work.category}</span>
          <span>•</span>
          <span>{work.year}</span>
        </div>
        <h1 className='mb-6'>{work.title}</h1>
        <p className='lead mb-8'>{work.description}</p>

        {/* Technologies */}
        {work.technologies && work.technologies.length > 0 && (
          <div className='flex flex-wrap items-center justify-center gap-2 mb-8'>
            {work.technologies.map((tech, index) => (
              <Tag key={index} variant='primary' size='sm'>
                {tech}
              </Tag>
            ))}
          </div>
        )}

        {/* Demo Link */}
        {work.demoUrl && (
          <div className='mb-8'>
            <LinkButton
              href={work.demoUrl}
              variant='outline'
              size='default'
              className='group'
            >
              View Live Project
              <ExternalLink className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </LinkButton>
          </div>
        )}
      </div>

      {/* Cover Image */}
      {work.coverImage && (
        <div className='mb-16'>
          <div className='relative aspect-[16/9] rounded-lg overflow-hidden'>
            <Image
              src={work.coverImage}
              alt={generateAltText(work, 'main')}
              fill
              className='object-cover'
              priority
            />
          </div>
        </div>
      )}

      {/* Project Content */}
      <div className='mb-20'>
        {work.slug === '/projects/design-swiss-knife' ? (
          <div className='space-y-20'>
            {/* Project Overview */}
            <section className='mb-20'>
              <div className='text-center mb-12'>
                <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                  Project Overview
                </h2>
                <div className='w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8'></div>
              </div>

              <div className='grid lg:grid-cols-3 gap-12 items-start'>
                <div className='lg:col-span-2 space-y-6'>
                  <p className='text-xl leading-relaxed text-muted-foreground'>
                    Design Swiss Knife is a comprehensive automation tool built
                    to solve the time-consuming challenge of creating and
                    testing ad creatives at scale.
                  </p>
                  <p className='text-lg leading-relaxed'>
                    It empowers designers and marketers to transform a single
                    design template into hundreds of unique variations in
                    minutes. By integrating powerful AI for content generation
                    and a sophisticated engine for design quality analysis, the
                    plugin streamlines the entire creative workflow—from initial
                    concept to A/B test-ready assets.
                  </p>
                  <p className='text-lg leading-relaxed font-medium text-primary'>
                    The core mission is to enable rapid creative iteration while
                    upholding brand and quality standards through intelligent
                    automation.
                  </p>
                </div>

                <div className='bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50 rounded-2xl p-8'>
                  <div className='flex items-center gap-4 mb-6'>
                    <div className='w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center'>
                      <span className='text-2xl'>⚡</span>
                    </div>
                    <div>
                      <div className='text-2xl font-bold text-primary'>
                        100x
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Faster Production
                      </div>
                    </div>
                  </div>
                  <h3 className='text-xl font-bold mb-3 text-primary'>
                    Core Mission
                  </h3>
                  <p className='text-muted-foreground'>
                    Enable rapid creative iteration while maintaining brand
                    consistency through intelligent automation.
                  </p>
                </div>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <div className='text-center mb-16'>
                <h2 className='text-4xl md:text-5xl font-bold mb-6'>
                  Key Features
                </h2>
                <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
                  Powerful tools designed to transform your creative workflow
                </p>
              </div>

              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                <div className='group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-3xl p-8 border border-blue-200/50 hover:border-blue-300/70 transition-all duration-300 hover:scale-105'>
                  <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full transform translate-x-8 -translate-y-8'></div>
                  <div className='relative'>
                    <div className='w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6'>
                      <span className='text-3xl'>🚀</span>
                    </div>
                    <h3 className='text-xl font-bold mb-4 text-blue-900 dark:text-blue-100'>
                      Mass Creative Generation
                    </h3>
                    <p className='text-blue-700 dark:text-blue-200 leading-relaxed'>
                      Produce up to 100 unique ad variations from one master
                      template, automatically replacing text content with new
                      headlines and descriptions.
                    </p>
                  </div>
                </div>

                <div className='group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-3xl p-8 border border-purple-200/50 hover:border-purple-300/70 transition-all duration-300 hover:scale-105'>
                  <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full transform translate-x-8 -translate-y-8'></div>
                  <div className='relative'>
                    <div className='w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6'>
                      <span className='text-3xl'>✍️</span>
                    </div>
                    <h3 className='text-xl font-bold mb-4 text-purple-900 dark:text-purple-100'>
                      AI Content Enhancement
                    </h3>
                    <p className='text-purple-700 dark:text-purple-200 leading-relaxed'>
                      Integrated with OpenAI (GPT-3.5) and Mistral AI to
                      generate context-aware copy, saving hours on copywriting.
                    </p>
                  </div>
                </div>

                <div className='group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-3xl p-8 border border-green-200/50 hover:border-green-300/70 transition-all duration-300 hover:scale-105'>
                  <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full transform translate-x-8 -translate-y-8'></div>
                  <div className='relative'>
                    <div className='w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6'>
                      <span className='text-3xl'>📊</span>
                    </div>
                    <h3 className='text-xl font-bold mb-4 text-green-900 dark:text-green-100'>
                      Automated Design Analysis
                    </h3>
                    <p className='text-green-700 dark:text-green-200 leading-relaxed'>
                      Get an instant quality score (0-100) for each design based
                      on typography consistency, color contrast, element
                      spacing, and CTA visibility.
                    </p>
                  </div>
                </div>

                <div className='group relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-3xl p-8 border border-orange-200/50 hover:border-orange-300/70 transition-all duration-300 hover:scale-105'>
                  <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full transform translate-x-8 -translate-y-8'></div>
                  <div className='relative'>
                    <div className='w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6'>
                      <span className='text-3xl'>🔬</span>
                    </div>
                    <h3 className='text-xl font-bold mb-4 text-orange-900 dark:text-orange-100'>
                      A/B Testing Support
                    </h3>
                    <p className='text-orange-700 dark:text-orange-200 leading-relaxed'>
                      Directly compare design variants with detailed metrics and
                      performance predictions to make data-informed decisions.
                    </p>
                  </div>
                </div>

                <div className='group relative overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-3xl p-8 border border-cyan-200/50 hover:border-cyan-300/70 transition-all duration-300 hover:scale-105'>
                  <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full transform translate-x-8 -translate-y-8'></div>
                  <div className='relative'>
                    <div className='w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6'>
                      <span className='text-3xl'>🧠</span>
                    </div>
                    <h3 className='text-xl font-bold mb-4 text-cyan-900 dark:text-cyan-100'>
                      Smart Text Classification
                    </h3>
                    <p className='text-cyan-700 dark:text-cyan-200 leading-relaxed'>
                      The plugin intelligently identifies and categorizes text
                      layers as headlines or descriptions based on size and
                      length.
                    </p>
                  </div>
                </div>

                <div className='group relative overflow-hidden bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-3xl p-8 border border-violet-200/50 hover:border-violet-300/70 transition-all duration-300 hover:scale-105'>
                  <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full transform translate-x-8 -translate-y-8'></div>
                  <div className='relative'>
                    <div className='w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-6'>
                      <span className='text-3xl'>⚙️</span>
                    </div>
                    <h3 className='text-xl font-bold mb-4 text-violet-900 dark:text-violet-100'>
                      Streamlined Workflow
                    </h3>
                    <p className='text-violet-700 dark:text-violet-200 leading-relaxed'>
                      Features real-time progress tracking, automatic font
                      loading, graceful error handling, and automated grid
                      layouts.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Value Proposition */}
            <section className='relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-3xl'></div>
              <div className='relative p-12 md:p-16'>
                <div className='text-center mb-16'>
                  <h2 className='text-4xl md:text-5xl font-bold mb-6'>
                    The Value Proposition
                  </h2>
                  <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
                    Transforming workflows for designers and marketers alike
                  </p>
                </div>

                <div className='grid lg:grid-cols-2 gap-12'>
                  <div className='relative group'>
                    <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-300'></div>
                    <div className='relative bg-card/80 backdrop-blur-sm border border-primary/20 rounded-3xl p-10'>
                      <div className='flex items-center gap-4 mb-8'>
                        <div className='w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center'>
                          <span className='text-3xl'>🎨</span>
                        </div>
                        <h3 className='text-3xl font-bold text-primary'>
                          For Designers
                        </h3>
                      </div>

                      <div className='space-y-6'>
                        <div className='flex items-start gap-4'>
                          <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                            <span className='text-primary font-bold text-sm'>
                              10x
                            </span>
                          </div>
                          <div>
                            <h4 className='font-bold mb-2'>
                              Faster Production
                            </h4>
                            <p className='text-muted-foreground'>
                              Drastically reduce time spent on manual
                              adaptations, generating 100 variations in the time
                              it takes to create a few.
                            </p>
                          </div>
                        </div>

                        <div className='flex items-start gap-4'>
                          <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                            <span className='text-primary'>📈</span>
                          </div>
                          <div>
                            <h4 className='font-bold mb-2'>
                              Data-Driven Design
                            </h4>
                            <p className='text-muted-foreground'>
                              Move beyond subjective feedback with automated
                              scoring providing objective design quality
                              metrics.
                            </p>
                          </div>
                        </div>

                        <div className='flex items-start gap-4'>
                          <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                            <span className='text-primary'>🎯</span>
                          </div>
                          <div>
                            <h4 className='font-bold mb-2'>
                              Effortless A/B Testing
                            </h4>
                            <p className='text-muted-foreground'>
                              Prepare dozens of variants with detailed
                              comparison reports, proving which designs work
                              best.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='relative group'>
                    <div className='absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-300'></div>
                    <div className='relative bg-card/80 backdrop-blur-sm border border-accent/20 rounded-3xl p-10'>
                      <div className='flex items-center gap-4 mb-8'>
                        <div className='w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center'>
                          <span className='text-3xl'>📊</span>
                        </div>
                        <h3 className='text-3xl font-bold text-accent'>
                          For Marketers
                        </h3>
                      </div>

                      <div className='space-y-6'>
                        <div className='flex items-start gap-4'>
                          <div className='w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                            <span className='text-accent'>🚀</span>
                          </div>
                          <div>
                            <h4 className='font-bold mb-2'>
                              Unprecedented Campaign Scale
                            </h4>
                            <p className='text-muted-foreground'>
                              Turn a single creative concept into a full-scale
                              campaign with hundreds of tested variations.
                            </p>
                          </div>
                        </div>

                        <div className='flex items-start gap-4'>
                          <div className='w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                            <span className='text-accent'>🤖</span>
                          </div>
                          <div>
                            <h4 className='font-bold mb-2'>
                              AI-Powered Copywriting
                            </h4>
                            <p className='text-muted-foreground'>
                              Instantly generate contextual headlines and
                              descriptions tailored to your campaign goals.
                            </p>
                          </div>
                        </div>

                        <div className='flex items-start gap-4'>
                          <div className='w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                            <span className='text-accent'>📈</span>
                          </div>
                          <div>
                            <h4 className='font-bold mb-2'>
                              Predictive Performance Insights
                            </h4>
                            <p className='text-muted-foreground'>
                              Use design metrics as leading indicators for ad
                              performance, optimizing before going live.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technology Stack */}
            <section>
              <div className='text-center mb-16'>
                <h2 className='text-4xl md:text-5xl font-bold mb-6'>
                  Technology Stack
                </h2>
                <p className='text-xl text-muted-foreground max-w-4xl mx-auto'>
                  A modern tech stack chosen to leverage the Figma Plugin API
                  efficiently while ensuring a clean, maintainable, and
                  type-safe codebase.
                </p>
              </div>

              <div className='grid md:grid-cols-3 gap-8'>
                <div className='bg-card border border-border/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group'>
                  <div className='w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                    <span className='text-3xl'>🎨</span>
                  </div>
                  <h3 className='text-2xl font-bold mb-6 text-blue-600'>
                    Frontend
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                      <span>HTML5 / CSS3</span>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                      <span>TypeScript</span>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                      <span>Material Design 3</span>
                    </div>
                  </div>
                </div>

                <div className='bg-card border border-border/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group'>
                  <div className='w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                    <span className='text-3xl'>⚙️</span>
                  </div>
                  <h3 className='text-2xl font-bold mb-6 text-green-600'>
                    Backend & Core
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/20'>
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                      <span>Figma Plugin API</span>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/20'>
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                      <span>OpenAI Integration</span>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/20'>
                      <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                      <span>Mistral AI Integration</span>
                    </div>
                  </div>
                </div>

                <div className='bg-card border border-border/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group'>
                  <div className='w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                    <span className='text-3xl'>🛠️</span>
                  </div>
                  <h3 className='text-2xl font-bold mb-6 text-purple-600'>
                    Development
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20'>
                      <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                      <span>NPM Package Manager</span>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20'>
                      <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                      <span>ESLint + Figma Plugins</span>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20'>
                      <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                      <span>TypeScript Compiler</span>
                    </div>
                  </div>
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
      <ProjectNavigation currentSlug={work.slug} />
    </div>
  )
}
