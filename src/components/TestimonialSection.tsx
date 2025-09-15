'use client'

import React from 'react'
import Image from 'next/image'

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
  testimonial?: TestimonialProps
}

const TestimonialSection = ({
  testimonial = {
    headline: 'Approved by a Salesforce leader',
    quote:
      'Lloyd brings design leadership and product strategy that result in scalable, user-centric SaaS solutions trusted by enterprise teams.',
    authorName: 'Frank Wang',
    authorTitle: 'Principal Research Engineer, Salesforce AI research',
    authorCompany: 'Salesforce',
    authorImage: '/frank-wang.webp',
    companyLogo: '/Salesforce.svg',
  },
}: TestimonialSectionProps) => {
  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Special Card with Enhanced Background */}
          <div className='relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-primary/10 p-12 lg:p-16'>
            {/* Decorative Elements */}
            <div className='absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl' />
            <div className='absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl' />

            {/* Content */}
            <div className='relative z-10'>
              {/* Headline */}
              {testimonial.headline && (
                <div className='text-center mb-8'>
                  <span className='inline-block text-primary font-semibold text-sm uppercase tracking-wider'>
                    {testimonial.headline}
                  </span>
                </div>
              )}

              {/* Quote - Large and Centered */}
              <blockquote className='text-center mb-12'>
                <p className='text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed text-slate-800 dark:text-slate-100'>
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Minimal Author Section */}
              <div className='flex items-center justify-center gap-4'>
                {/* Author Image */}
                {testimonial.authorImage && (
                  <div className='relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20 dark:ring-slate-600/50 shadow-lg'>
                    <Image
                      src={testimonial.authorImage}
                      alt={testimonial.authorName}
                      fill
                      className='object-cover'
                    />
                  </div>
                )}

                {/* Author Details - Simple Text */}
                <div className='text-left'>
                  <div className='font-semibold text-slate-800 dark:text-slate-100'>
                    {testimonial.authorName}
                  </div>
                  <div className='text-sm text-slate-600 dark:text-slate-300'>
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
                      <span className='text-sm text-slate-600 dark:text-slate-300'>
                        {testimonial.authorCompany}
                      </span>
                    </div>
                  )}
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
