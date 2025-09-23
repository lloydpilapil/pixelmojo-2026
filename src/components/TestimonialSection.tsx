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
    },
    {
      headline: 'A+ for Collaboration & Creativity',
      quote:
        'Lloyd excels in creating innovative, attractive visual presentations, from dashboards to progress reports, while consistently supporting the team and client presentations.',
      authorName: 'Richard Bridge',
      authorTitle: 'Project Controls Manager',
      authorCompany: 'Parsons',
      authorImage: '/richard_bridge-min.jpg',
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
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const transitionTimeoutRef = useRef<number | null>(null)
  const fadeDuration = 320

  React.useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  if (testimonialCount === 0) {
    return null
  }

  const startTransition = (targetIndex: number) => {
    if (!hasMultiple || targetIndex === currentIndex) return

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current)
    }

    setPrevIndex(currentIndex)
    setCurrentIndex(targetIndex)
    transitionTimeoutRef.current = window.setTimeout(() => {
      setPrevIndex(null)
    }, fadeDuration)
  }

  const nextTestimonial = () => {
    startTransition((currentIndex + 1) % testimonialCount)
  }

  const prevTestimonial = () => {
    startTransition((currentIndex - 1 + testimonialCount) % testimonialCount)
  }

  const visibleIndices =
    prevIndex === null ? [currentIndex] : [prevIndex, currentIndex]

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          {/* Special Card with Enhanced Background */}
          <div className='relative overflow-hidden rounded-3xl bg-card/90 backdrop-blur-sm border border-border/30 shadow-xl p-12 lg:p-16'>
            {/* Decorative Elements */}
            <div
              aria-hidden='true'
              className='absolute -top-32 -left-32 w-44 h-44 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl'
            />
            <div
              aria-hidden='true'
              className='absolute -bottom-32 -right-32 w-44 h-44 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl'
            />

            {/* Content */}
            <div className='relative z-10'>
              {visibleIndices.map(index => {
                const testimonial =
                  testimonials[Math.min(index, testimonialCount - 1)]
                const isActive = index === currentIndex

                return (
                  <div
                    key={`testimonial-${index}`}
                    className={`transition-all duration-300 ease-out ${
                      isActive
                        ? 'relative w-full opacity-100 translate-y-0'
                        : 'absolute inset-0 w-full opacity-0 translate-y-3 pointer-events-none'
                    }`}
                  >
                    {/* Headline */}
                    {testimonial.headline && (
                      <div className='text-center mb-8'>
                        <span className='inline-block text-primary font-semibold text-sm uppercase tracking-wider'>
                          {testimonial.headline}
                        </span>
                      </div>
                    )}

                    {/* Quote - Large and Centered */}
                    <blockquote className='text-center mb-10 lg:mb-12'>
                      <p className='text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed text-foreground'>
                        "{testimonial.quote}"
                      </p>
                    </blockquote>

                    {/* Minimal Author Section */}
                    <div className='flex items-center justify-center gap-4'>
                      {/* Author Image */}
                      {testimonial.authorImage && (
                        <div className='relative w-16 h-16 shrink-0 rounded-full overflow-hidden ring-2 ring-primary/20 shadow-lg'>
                          <Image
                            src={testimonial.authorImage}
                            alt={testimonial.authorName}
                            fill
                            sizes='64px'
                            className='object-cover'
                          />
                        </div>
                      )}

                      {/* Author Details - Simple Text */}
                      <div className='text-left max-w-sm'>
                        <div className='font-semibold text-foreground'>
                          {testimonial.authorName}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {testimonial.authorTitle}
                        </div>
                        {testimonial.authorCompany && (
                          <div className='flex items-center gap-2 mt-1'>
                            {testimonial.companyLogo && (
                              <Image
                                src={testimonial.companyLogo}
                                alt={testimonial.authorCompany}
                                width={16}
                                height={16}
                                className='opacity-60'
                              />
                            )}
                            <span className='text-sm text-muted-foreground'>
                              {testimonial.authorCompany}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Minimal Navigation */}
              {hasMultiple && (
                <div className='mt-12 flex items-center justify-center gap-8'>
                  <button
                    type='button'
                    onClick={prevTestimonial}
                    className='flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors'
                    aria-label='Previous testimonial'
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </button>

                  <div className='flex items-center gap-2'>
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        type='button'
                        onClick={() => startTransition(index)}
                        className='p-1'
                        aria-label={`Go to testimonial ${index + 1}`}
                        aria-pressed={index === currentIndex}
                      >
                        <span
                          className={`block h-2 w-2 rounded-full border transition-all ${
                            index === currentIndex
                              ? 'bg-primary border-primary'
                              : 'bg-transparent border-foreground/50 hover:border-foreground hover:bg-foreground/20'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <button
                    type='button'
                    onClick={nextTestimonial}
                    className='flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors'
                    aria-label='Next testimonial'
                  >
                    <ChevronRight className='h-4 w-4' />
                  </button>
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
