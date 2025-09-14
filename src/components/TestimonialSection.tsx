'use client'

import React from 'react'

interface TestimonialProps {
  headline?: string
  quote: string
  authorName: string
  authorTitle: string
  authorCompany?: string
  authorImage?: string
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
    authorImage: '',
  },
}: TestimonialSectionProps) => {
  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          {testimonial.headline && (
            <div className='mb-8'>
              <span className='text-primary font-medium'>
                {testimonial.headline}
              </span>
            </div>
          )}

          <blockquote className='mb-12'>
            <p className='text-large italic mb-8'>"{testimonial.quote}"</p>
          </blockquote>

          <div className='flex items-center justify-center gap-4'>
            {testimonial.authorImage ? (
              <img
                src={testimonial.authorImage}
                alt={testimonial.authorName}
                className='w-12 h-12 rounded-full object-cover'
              />
            ) : (
              <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                <span className='text-primary font-semibold'>
                  {testimonial.authorName
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </span>
              </div>
            )}

            <div className='text-left'>
              <div className='font-semibold'>{testimonial.authorName}</div>
              <div className='text-muted text-small'>
                {testimonial.authorTitle}
                {testimonial.authorCompany && `, ${testimonial.authorCompany}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
