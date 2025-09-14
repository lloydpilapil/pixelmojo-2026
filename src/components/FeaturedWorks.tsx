'use client'

import React from 'react'
import Link from 'next/link'

interface WorkItem {
  title: string
  description: string
  year: string
  slug: string
  coverImage?: string
}

interface FeaturedWorksProps {
  title?: string
  works?: WorkItem[]
}

const FeaturedWorks = ({
  title = 'Featured Works',
  works = [
    {
      title: 'Real Estate Bear',
      description: 'Custom Landing Page & Mobile App Design',
      year: '2024',
      slug: '/works/real-estate-bear',
      coverImage: '',
    },
    {
      title: 'Funnel Zen Branding',
      description: 'Branding & Logo Design',
      year: '2023',
      slug: '/works/funnel-zen-branding',
      coverImage: '',
    },
    {
      title: 'Beemine Store',
      description: 'Custom Landing Page, Branding & Logo Design',
      year: '2023',
      slug: '/works/beemine-store',
      coverImage: '',
    },
    {
      title: 'Cigna Stress Management App',
      description: 'Mobile App Design',
      year: '2020',
      slug: '/works/cigna-stress-management-app',
      coverImage: '',
    },
  ],
}: FeaturedWorksProps) => {
  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='text-center mb-16'>{title}</h2>

        <div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          {works.map((work, index) => (
            <Link
              key={index}
              href={work.slug}
              className='card group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
            >
              {/* Cover Image Placeholder */}
              <div className='aspect-video bg-muted/50 flex items-center justify-center mb-6 group-hover:bg-muted/70 transition-colors duration-300'>
                {work.coverImage ? (
                  <img
                    src={work.coverImage}
                    alt={work.title}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='text-center'>
                    <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                      <svg
                        className='w-8 h-8 text-primary'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                    <p className='text-muted text-small'>
                      Cover visual representing Pixelmojo projects
                    </p>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className='p-6'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='group-hover:text-primary transition-colors duration-300'>
                    {work.title}
                  </h3>
                  <span className='text-muted text-small'>{work.year}</span>
                </div>

                <p className='text-muted mb-4'>{work.description}</p>

                <div className='flex items-center gap-2 text-primary text-small font-medium'>
                  <span>Go to next section</span>
                  <svg
                    className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedWorks
