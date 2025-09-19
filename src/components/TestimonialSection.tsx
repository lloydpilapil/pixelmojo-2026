'use client'

import React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

interface TestimonialProps {
  headline?: string
  quote: string
  authorName: string
  authorTitle: string
  authorCompany?: string
  authorImage?: string
  companyLogo?: string
}

interface TestimonialSectionProps {
  testimonials?: TestimonialProps[]
  autoRotate?: boolean
  rotateInterval?: number
}

const DEFAULT_TESTIMONIALS: TestimonialProps[] = [
  {
    headline: 'Approved by a Salesforce leader',
    quote:
      'Lloyd brings design leadership and product strategy that result in scalable, user-centric SaaS solutions trusted by enterprise teams.',
    authorName: 'Frank Wang',
    authorTitle: 'Principal Research Engineer, Salesforce AI research',
    authorCompany: 'Salesforce',
    authorImage: '/frank-wang.webp',
    companyLogo: '/Salesforce.svg',
  },
  {
    headline: 'Trusted by go-to-market teams',
    quote:
      'The Pixelmojo team translated complex enablement requirements into a clean system our sales org actually enjoys using.',
    authorName: 'Priya Patel',
    authorTitle: 'Director of Revenue Enablement',
    authorCompany: 'Amplitude',
  },
  {
    headline: 'Design that scales',
    quote:
      'Their sprint cadence kept engineering moving while maintaining a premium brand experience across every customer touchpoint.',
    authorName: 'Miguel Hernández',
    authorTitle: 'Head of Product Design',
    authorCompany: 'Figma',
  },
  {
    headline: 'Outcomes over outputs',
    quote:
      'From the first strategy session to launch, we felt the impact on activation and retention. They care about metrics as much as craft.',
    authorName: 'Sara Kim',
    authorTitle: 'VP of Product Marketing',
    authorCompany: 'Notion',
  },
]

const TestimonialSection = ({
  testimonials = DEFAULT_TESTIMONIALS,
  autoRotate = true,
  rotateInterval = 6000,
}: TestimonialSectionProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const testimonialCount = testimonials.length

  React.useEffect(() => {
    if (!autoRotate || testimonialCount <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonialCount)
    }, rotateInterval)

    return () => window.clearInterval(timer)
  }, [autoRotate, rotateInterval, testimonialCount])

  React.useEffect(() => {
    if (activeIndex >= testimonialCount) {
      setActiveIndex(0)
    }
  }, [activeIndex, testimonialCount])

  if (testimonialCount === 0) {
    return null
  }

  const activeTestimonial = testimonials[activeIndex]

  const handlePrevious = () => {
    setActiveIndex(prev => (prev - 1 + testimonialCount) % testimonialCount)
  }

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % testimonialCount)
  }

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='relative overflow-hidden rounded-3xl bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-primary/10 p-10 lg:p-16'>
            <div
              aria-hidden='true'
              className='absolute -top-32 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl'
            />
            <div
              aria-hidden='true'
              className='absolute -bottom-32 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-3xl'
            />

            <div className='relative z-10'>
              {activeTestimonial.headline && (
                <div className='mb-8 text-center'>
                  <span className='inline-block text-sm font-semibold uppercase tracking-widest text-primary'>
                    {activeTestimonial.headline}
                  </span>
                </div>
              )}

              <blockquote className='mb-12 text-center'>
                <p className='text-2xl font-light leading-relaxed text-slate-800 dark:text-slate-100 lg:text-3xl xl:text-4xl'>
                  "{activeTestimonial.quote}"
                </p>
              </blockquote>

              <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
                {activeTestimonial.authorImage ? (
                  <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20 shadow-lg dark:ring-slate-600/50'>
                    <Image
                      src={activeTestimonial.authorImage}
                      alt={activeTestimonial.authorName}
                      fill
                      sizes='64px'
                      className='object-cover'
                    />
                  </div>
                ) : (
                  <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary'>
                    {activeTestimonial.authorName.charAt(0)}
                  </div>
                )}

                <div className='text-center sm:text-left'>
                  <div className='font-semibold text-slate-800 dark:text-slate-100'>
                    {activeTestimonial.authorName}
                  </div>
                  <div className='text-sm text-slate-600 dark:text-slate-300'>
                    {activeTestimonial.authorTitle}
                  </div>
                  {activeTestimonial.authorCompany && (
                    <div className='mt-1 flex items-center justify-center gap-2 sm:justify-start'>
                      {activeTestimonial.companyLogo && (
                        <Image
                          src={activeTestimonial.companyLogo}
                          alt={activeTestimonial.authorCompany}
                          width={16}
                          height={16}
                          className='opacity-60'
                        />
                      )}
                      <span className='text-sm text-slate-600 dark:text-slate-300'>
                        {activeTestimonial.authorCompany}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className='mt-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                <div className='-mx-2 flex gap-3 overflow-x-auto px-2 pb-2 sm:pb-0 lg:max-w-3xl'>
                  {testimonials.map((testimonial, index) => {
                    const isActive = index === activeIndex

                    return (
                      <button
                        key={`${testimonial.authorName}-${index}`}
                        type='button'
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                          'group relative flex min-w-[220px] flex-1 items-center gap-3 rounded-2xl border bg-white/60 px-4 py-3 text-left transition-all dark:bg-slate-900/40',
                          'hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                          isActive
                            ? 'border-primary/60 shadow-lg shadow-primary/10 dark:border-primary/40'
                            : 'border-white/40 dark:border-slate-700/60'
                        )}
                        aria-pressed={isActive}
                      >
                        {testimonial.authorImage ? (
                          <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-primary/20 dark:ring-slate-700/60'>
                            <Image
                              src={testimonial.authorImage}
                              alt={testimonial.authorName}
                              fill
                              sizes='48px'
                              className='object-cover'
                            />
                          </div>
                        ) : (
                          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary'>
                            {testimonial.authorName.charAt(0)}
                          </div>
                        )}
                        <div className='flex min-w-0 flex-col'>
                          <span className='text-sm font-semibold text-slate-800 dark:text-slate-100'>
                            {testimonial.authorName}
                          </span>
                          <span className='text-xs text-slate-500 dark:text-slate-400'>
                            {testimonial.authorTitle}
                          </span>
                          <span className='mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400'>
                            {testimonial.quote}
                          </span>
                        </div>
                        {isActive && (
                          <span
                            className='absolute inset-0 -z-10 rounded-2xl bg-primary/5 transition group-hover:bg-primary/10'
                            aria-hidden='true'
                          />
                        )}
                      </button>
                    )
                  })}
                </div>

                <div className='flex items-center gap-3 self-end lg:self-auto'>
                  <button
                    type='button'
                    onClick={handlePrevious}
                    className='flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/70 text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300'
                    aria-label='Previous testimonial'
                  >
                    <ChevronLeft className='h-5 w-5' />
                  </button>
                  <button
                    type='button'
                    onClick={handleNext}
                    className='flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/70 text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300'
                    aria-label='Next testimonial'
                  >
                    <ChevronRight className='h-5 w-5' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
