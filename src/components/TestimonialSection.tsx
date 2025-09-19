'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
}

const TestimonialSection = ({
  testimonials = [
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
    // Add your other testimonials here
    {
      headline: 'A+ for Service & Execution',
      quote:
        'Lloyd and the Pixelmojo team perfectly understood my website and graphic design needs. They communicated throughout the process and delivered a simple, catchy, and easily editable site. Highly recommend!',
      authorName: 'Mira Reverente',
      authorTitle: 'Founder & Chief Operating Officer',
      authorCompany: 'Got Volunteers?',
      authorImage: '/mira.webp',
      companyLogo: '/got-volunteers-min.png',
    },
    {
      headline: 'A+ for Collaboration & Creativity',
      quote:
        'Lloyd excels in creating innovative, attractive visual presentations, from dashboards to progress reports, while consistently supporting the team and client presentations.',
      authorName: 'Richard Bridge',
      authorTitle: 'Project Controls Manager',
      authorCompany: 'Parsons',
      authorImage: '/richard_bridge-min.jpg',
      companyLogo: '/parsons-corporation-vector-logo-2022.svg',
    },
    {
      headline: 'User-Driven Brand Design',
      quote:
        'I’ve worked with Lloyd for nearly 10 years, and his user-centered design consistently delivers outstanding results, exceeding expectations.',
      authorName: 'Ahmed Alsayeh',
      authorTitle: 'Creative Director',
      authorImage: '/ahmed_photo-min.jpg',
    },
  ],
}: TestimonialSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonialCount = testimonials.length
  const hasMultiple = testimonialCount > 1
  const [isFading, setIsFading] = useState(false)
  const fadeTimeoutRef = useRef<number | null>(null)
  const revealTimeoutRef = useRef<number | null>(null)
  const fadeDuration = 220

  React.useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current)
      }
      if (revealTimeoutRef.current) {
        window.clearTimeout(revealTimeoutRef.current)
      }
    }
  }, [])

  if (testimonialCount === 0) {
    return null
  }

  const scheduleFadeReset = () => {
    if (revealTimeoutRef.current) {
      window.clearTimeout(revealTimeoutRef.current)
    }

    revealTimeoutRef.current = window.setTimeout(() => {
      setIsFading(false)
    }, 20)
  }

  const startTransition = (targetIndex: number) => {
    if (!hasMultiple || targetIndex === currentIndex) return

    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current)
    }
    if (revealTimeoutRef.current) {
      window.clearTimeout(revealTimeoutRef.current)
    }

    setIsFading(true)
    fadeTimeoutRef.current = window.setTimeout(() => {
      setCurrentIndex(targetIndex)
      scheduleFadeReset()
    }, fadeDuration)
  }

  const nextTestimonial = () => {
    startTransition((currentIndex + 1) % testimonialCount)
  }

  const prevTestimonial = () => {
    startTransition((currentIndex - 1 + testimonialCount) % testimonialCount)
  }

  const currentTestimonial =
    testimonials[Math.min(currentIndex, testimonialCount - 1)]
  const contentTransitionClasses = isFading
    ? 'opacity-0 translate-y-3'
    : 'opacity-100 translate-y-0'

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          {/* Special Card with Enhanced Background */}
          <div className='relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-primary/10 p-12 lg:p-16'>
            {/* Decorative Elements */}
            <div
              aria-hidden='true'
              className='absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl'
            />
            <div
              aria-hidden='true'
              className='absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl'
            />

            {/* Navigation Arrows */}
            {hasMultiple && (
              <>
                <button
                  type='button'
                  onClick={prevTestimonial}
                  className='absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-colors hover:bg-white dark:bg-slate-700/80 dark:hover:bg-slate-600'
                  aria-label='Previous testimonial'
                >
                  <ChevronLeft className='h-5 w-5 text-slate-600 dark:text-slate-300' />
                </button>

                <button
                  type='button'
                  onClick={nextTestimonial}
                  className='absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-colors hover:bg-white dark:bg-slate-700/80 dark:hover:bg-slate-600'
                  aria-label='Next testimonial'
                >
                  <ChevronRight className='h-5 w-5 text-slate-600 dark:text-slate-300' />
                </button>
              </>
            )}

            {/* Content */}
            <div
              className={`relative z-10 transition-all duration-300 ease-out ${contentTransitionClasses}`}
            >
              {/* Headline */}
              {currentTestimonial.headline && (
                <div className='text-center mb-8'>
                  <span className='inline-block text-primary font-semibold text-sm uppercase tracking-wider'>
                    {currentTestimonial.headline}
                  </span>
                </div>
              )}

              {/* Quote - Large and Centered */}
              <blockquote className='text-center mb-10 lg:mb-12'>
                <p className='text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed text-slate-800 dark:text-slate-100'>
                  "{currentTestimonial.quote}"
                </p>
              </blockquote>

              {/* Minimal Author Section */}
              <div className='flex items-center justify-center gap-4'>
                {/* Author Image */}
                {currentTestimonial.authorImage && (
                  <div className='relative w-16 h-16 shrink-0 rounded-full overflow-hidden ring-2 ring-primary/20 dark:ring-slate-600/50 shadow-lg'>
                    <Image
                      src={currentTestimonial.authorImage}
                      alt={currentTestimonial.authorName}
                      fill
                      sizes='64px'
                      className='object-cover'
                    />
                  </div>
                )}

                {/* Author Details - Simple Text */}
                <div className='text-left max-w-sm'>
                  <div className='font-semibold text-slate-800 dark:text-slate-100'>
                    {currentTestimonial.authorName}
                  </div>
                  <div className='text-sm text-slate-600 dark:text-slate-300'>
                    {currentTestimonial.authorTitle}
                  </div>
                  {currentTestimonial.authorCompany && (
                    <div className='flex items-center gap-2 mt-1'>
                      {currentTestimonial.companyLogo && (
                        <Image
                          src={currentTestimonial.companyLogo}
                          alt={currentTestimonial.authorCompany}
                          width={16}
                          height={16}
                          className='opacity-60'
                        />
                      )}
                      <span className='text-sm text-slate-600 dark:text-slate-300'>
                        {currentTestimonial.authorCompany}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Minimal Dots Indicator */}
              {hasMultiple && (
                <div className='mt-8 flex justify-center gap-2'>
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      type='button'
                      onClick={() => startTransition(index)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentIndex
                          ? 'bg-primary'
                          : 'bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                      aria-pressed={index === currentIndex}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
