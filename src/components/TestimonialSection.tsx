'use client'

import React, { useRef, useState, useEffect } from 'react'
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
  const [transitionDirection, setTransitionDirection] = useState<
    'next' | 'prev' | null
  >(null)
  const transitionTimeoutRef = useRef<number | null>(null)
  const fadeDuration = 800 // Extended for staggered transitions

  // Refs for animations
  const sectionRef = useRef<HTMLElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)

  // Progressive reveal animation
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('testimonial-reveal')
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px',
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Parallax effect for background blobs
  useEffect(() => {
    const handleScroll = () => {
      if (!blob1Ref.current || !blob2Ref.current) return

      const scrolled = window.scrollY
      const rate1 = scrolled * -0.1 // Slow upward movement
      const rate2 = scrolled * -0.15 // Slightly faster movement

      blob1Ref.current.style.transform = `translate(-50%, -50%) translateY(${rate1}px)`
      blob2Ref.current.style.transform = `translate(50%, 50%) translateY(${rate2}px)`
    }

    // Use Lenis scroll events if available
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.on('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

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

  const startTransition = (
    targetIndex: number,
    direction?: 'next' | 'prev'
  ) => {
    if (!hasMultiple || targetIndex === currentIndex) return

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current)
    }

    // Set transition direction for enhanced animations
    setTransitionDirection(direction || null)
    setPrevIndex(currentIndex)
    setCurrentIndex(targetIndex)

    transitionTimeoutRef.current = window.setTimeout(() => {
      setPrevIndex(null)
      setTransitionDirection(null)
    }, fadeDuration)
  }

  const nextTestimonial = () => {
    startTransition((currentIndex + 1) % testimonialCount, 'next')
  }

  const prevTestimonial = () => {
    startTransition(
      (currentIndex - 1 + testimonialCount) % testimonialCount,
      'prev'
    )
  }

  const visibleIndices =
    prevIndex === null ? [currentIndex] : [prevIndex, currentIndex]

  return (
    <section
      ref={sectionRef}
      className='testimonial-section py-20'
      data-transition-direction={transitionDirection}
    >
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          {/* Special Card with Enhanced Background */}
          <div className='testimonial-card relative overflow-hidden rounded-3xl bg-card/90 backdrop-blur-sm border border-border/30 shadow-xl p-12 lg:p-16'>
            {/* Decorative Elements with Parallax */}
            <div
              ref={blob1Ref}
              aria-hidden='true'
              className='absolute top-0 left-0 w-44 h-44 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl'
              style={{ transform: 'translate(-50%, -50%)' }}
            />
            <div
              ref={blob2Ref}
              aria-hidden='true'
              className='absolute bottom-0 right-0 w-44 h-44 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl'
              style={{ transform: 'translate(50%, 50%)' }}
            />

            {/* Content */}
            <div className='testimonial-content relative z-10'>
              {visibleIndices.map(index => {
                const testimonial =
                  testimonials[Math.min(index, testimonialCount - 1)]
                const isActive = index === currentIndex

                // Determine transition classes based on direction and state
                const getTransitionClasses = () => {
                  const baseClasses = 'testimonial-content-wrapper w-full'

                  if (isActive) {
                    return `${baseClasses} relative opacity-100 translate-x-0`
                  } else {
                    const exitDirection =
                      transitionDirection === 'next'
                        ? '-translate-x-8'
                        : transitionDirection === 'prev'
                          ? 'translate-x-8'
                          : 'translate-y-3'
                    return `${baseClasses} absolute inset-0 opacity-0 ${exitDirection} pointer-events-none`
                  }
                }

                return (
                  <div
                    key={`testimonial-${index}`}
                    className={getTransitionClasses()}
                    data-transition-direction={transitionDirection}
                    style={
                      {
                        '--transition-direction':
                          transitionDirection === 'next'
                            ? '1'
                            : transitionDirection === 'prev'
                              ? '-1'
                              : '0',
                      } as React.CSSProperties
                    }
                  >
                    {/* Headline */}
                    {testimonial.headline && (
                      <div className='testimonial-headline text-center mb-8'>
                        <span className='inline-block text-primary font-semibold text-sm uppercase tracking-wider'>
                          {testimonial.headline}
                        </span>
                      </div>
                    )}

                    {/* Quote - Large and Centered */}
                    <blockquote className='testimonial-quote text-center mb-10 lg:mb-12'>
                      <p className='text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed text-foreground'>
                        "{testimonial.quote}"
                      </p>
                    </blockquote>

                    {/* Minimal Author Section */}
                    <div className='testimonial-author flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:text-left'>
                      {/* Author Image */}
                      {testimonial.authorImage && (
                        <div className='relative w-16 h-16 shrink-0 rounded-full overflow-hidden shadow-lg'>
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
                      <div className='max-w-sm text-center sm:text-left'>
                        <div className='font-semibold text-foreground'>
                          {testimonial.authorName}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {testimonial.authorTitle}
                        </div>
                        {testimonial.authorCompany && (
                          <div className='mt-1 flex items-center justify-center gap-2 sm:justify-start'>
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
