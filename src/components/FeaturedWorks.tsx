'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { LinkButtonWithArrow } from '@/components/ui/button'

interface WorkItem {
  title: string
  description: string
  year: string
  category: string
  slug: string
  coverImage?: string
  technologies?: string[]
  featured?: boolean
}

interface FeaturedWorksProps {
  title?: string
  works?: WorkItem[]
}

// Reusable Portfolio Card Component
interface PortfolioCardProps {
  work: WorkItem
  className?: string
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  work,
  className = '',
}) => {
  return (
    <Link href={work.slug} className={`group block h-full ${className}`}>
      <div className='h-full bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-2'>
        {/* Cover Image */}
        <div className='relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5'>
          {work.coverImage ? (
            <>
              <Image
                src={work.coverImage}
                alt={work.title}
                fill
                className='object-cover transition-all duration-700 group-hover:scale-110'
              />
              {/* Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

              {/* Featured Badge */}
              {work.featured && (
                <div className='absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full'>
                  Featured
                </div>
              )}

              {/* Category Badge */}
              <div className='absolute top-4 right-4 px-3 py-1 bg-black/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20'>
                {work.category}
              </div>
            </>
          ) : (
            <>
              {/* Placeholder Image */}
              <Image
                src='/placeholder.svg'
                alt={work.title}
                fill
                className='object-cover'
              />

              {/* Category Badge for placeholder */}
              <div className='absolute top-4 right-4 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full'>
                {work.category}
              </div>
            </>
          )}

          {/* Hover Overlay Content */}
          <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
            <div className='flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-primary font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
              <span>View Project</span>
              <ArrowRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 space-y-4'>
          {/* Header */}
          <div className='space-y-2'>
            <div className='flex items-start justify-between gap-4'>
              <h3 className='font-bold text-lg leading-tight group-hover:text-primary transition-colors duration-300'>
                {work.title}
              </h3>
              <div className='flex items-center gap-1 text-muted text-sm font-medium flex-shrink-0'>
                <Calendar className='w-3 h-3' />
                <span>{work.year}</span>
              </div>
            </div>

            <p className='text-muted leading-relaxed'>{work.description}</p>
          </div>

          {/* Technologies/Tags */}
          {work.technologies && work.technologies.length > 0 && (
            <div className='flex items-center gap-2 flex-wrap'>
              <Tag className='w-3 h-3 text-muted' />
              {work.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className='px-2 py-1 bg-muted/30 text-muted text-xs rounded-md'
                >
                  {tech}
                </span>
              ))}
              {work.technologies.length > 3 && (
                <span className='text-muted text-xs'>
                  +{work.technologies.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className='flex items-center gap-2 text-primary font-medium pt-2 group-hover:gap-3 transition-all duration-300'>
            <span>View Project</span>
            <ArrowRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' />
          </div>
        </div>
      </div>
    </Link>
  )
}

const FeaturedWorks = ({
  title = 'Featured Works',
  works = [
    {
      title: 'Real Estate Bear',
      description:
        'A comprehensive digital transformation combining modern web design with intuitive mobile app interfaces for real estate professionals.',
      year: '2024',
      category: 'Web & Mobile',
      slug: '/works/real-estate-bear',
      coverImage: '',
      technologies: ['React', 'Next.js', 'React Native', 'TypeScript'],
      featured: true,
    },
    {
      title: 'Funnel Zen Branding',
      description:
        'Complete brand identity redesign featuring modern logo design, visual systems, and strategic positioning for growth.',
      year: '2023',
      category: 'Branding',
      slug: '/works/funnel-zen-branding',
      coverImage: '',
      technologies: ['Brand Strategy', 'Logo Design', 'Visual Identity'],
    },
    {
      title: 'Beemine Store',
      description:
        'E-commerce platform design with custom landing page development, comprehensive branding, and conversion optimization.',
      year: '2023',
      category: 'E-commerce',
      slug: '/works/beemine-store',
      coverImage: '',
      technologies: ['Shopify', 'UI/UX', 'Brand Design', 'Conversion'],
    },
    {
      title: 'Cigna Stress Management App',
      description:
        'Healthcare mobile application focused on stress management with user-centered design and accessibility standards.',
      year: '2020',
      category: 'Healthcare',
      slug: '/works/cigna-stress-management-app',
      coverImage: '',
      technologies: ['Mobile Design', 'Healthcare UX', 'Accessibility'],
      featured: true,
    },
  ],
}: FeaturedWorksProps) => {
  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        {/* Enhanced Header */}
        <div className='text-center mb-20'>
          <h2 className='mb-6'>{title}</h2>
          <p className='text-muted max-w-3xl mx-auto text-lg leading-relaxed'>
            Explore our portfolio of successful projects that have driven
            measurable results for clients across various industries.
          </p>
        </div>

        {/* Portfolio Grid - Enhanced Layout */}
        <div className='grid md:grid-cols-2 gap-8 max-w-7xl mx-auto'>
          {works.map((work, index) => (
            <PortfolioCard
              key={work.slug}
              work={work}
              className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
            />
          ))}
        </div>

        {/* View All Works CTA */}
        <div className='text-center mt-16'>
          <LinkButtonWithArrow
            href='/works'
            variant='default'
            size='lg'
            arrowIcon='arrow'
          >
            View All Works
          </LinkButtonWithArrow>
        </div>
      </div>
    </section>
  )
}

export default FeaturedWorks
export { PortfolioCard }
