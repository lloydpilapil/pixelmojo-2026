'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar,
  Eye,
  Monitor,
  Palette,
  ShoppingBag,
  Heart,
  Sparkles,
} from 'lucide-react'
import { LinkButtonWithArrow } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'
import { cn } from '@/lib/utils'
import { WorkItem, getFeaturedWorks, generateAltText } from '@/data/works'
import {
  LenisFadeIn,
  LenisStaggered,
} from '@/components/animations/LenisReveal'

interface FeaturedWorksProps {
  title?: string
  subtitle?: string
  works?: WorkItem[]
}

interface PortfolioStripProps {
  work: WorkItem
  index: number
  className?: string
  layout?: 'alternating' | 'grid'
}

// Category configuration
const categoryConfig: Record<
  string,
  {
    href: string
    icon: React.ComponentType<{ className?: string }>
    color: string
  }
> = {
  'Web & Mobile': {
    href: '/services/profit-optimized-interfaces',
    icon: Monitor,
    color: 'primary',
  },
  Branding: {
    href: '/services/revenue-first-design',
    icon: Palette,
    color: 'secondary',
  },
  'E-commerce': {
    href: '/services/ai-powered-growth',
    icon: ShoppingBag,
    color: 'accent',
  },
  Healthcare: {
    href: '/services/ai-product-development',
    icon: Heart,
    color: 'cta',
  },
}

// Compact Portfolio Card Component
const PortfolioCard: React.FC<PortfolioStripProps> = ({
  work,
  index,
  className = '',
  layout = 'alternating',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const config = categoryConfig[work.category] || {
    href: '/services',
    icon: Sparkles,
    color: 'primary',
  }
  const CategoryIcon = config.icon

  return (
    <article
      className={cn('group opacity-0 animate-fade-in h-full', className)}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <Link
        href={work.slug}
        className='block h-full'
        aria-label={`View ${work.title} case study`}
      >
        <div
          className={`h-full flex flex-col ${
            layout === 'grid'
              ? 'md:flex-col'
              : index % 2 === 0
                ? 'md:flex-row'
                : 'md:flex-row-reverse'
          } transition-all duration-500`}
        >
          {/* Cover Image */}
          <div
            className={`relative aspect-[3/2] w-full ${layout === 'grid' ? 'md:w-full' : 'md:w-[360px]'} flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5`}
          >
            {/* Loading shimmer */}
            {!imageLoaded && (
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer' />
            )}

            {work.thumbnailImage || work.coverImage ? (
              <>
                <Image
                  src={work.thumbnailImage || work.coverImage || ''}
                  alt={generateAltText(work, 'thumbnail')}
                  fill
                  className={cn(
                    'object-cover transition-all duration-700',
                    'group-hover:scale-105',
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  )}
                  onLoad={() => setImageLoaded(true)}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 320px'
                  priority={work.featured}
                />

                {/* Overlay on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                {/* Category Badge */}
                <div className='absolute top-3 right-3 px-3 py-1 bg-black/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20'>
                  {work.category}
                </div>

                {/* View indicator on hover */}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
                  <div className='bg-white/95 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-500'>
                    <Eye className='w-5 h-5 text-primary' />
                  </div>
                </div>
              </>
            ) : (
              <div className='w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center'>
                <CategoryIcon className='w-12 h-12 text-primary/20' />
              </div>
            )}
          </div>

          {/* Content */}
          <div className='flex-1 p-5 md:p-6 flex flex-col gap-3 justify-start'>
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

              <p className='text-muted leading-relaxed line-clamp-2 md:line-clamp-3'>
                {work.description}
              </p>
            </div>

            {/* Technologies/Tags */}
            {work.technologies && work.technologies.length > 0 && (
              <div className='flex items-center gap-2 flex-wrap'>
                {work.technologies.slice(0, 3).map((tech, techIndex) => (
                  <Tag key={techIndex} variant='muted' size='sm'>
                    {tech}
                  </Tag>
                ))}
                {work.technologies.length > 3 && (
                  <span className='text-muted text-xs'>
                    +{work.technologies.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

// Main FeaturedWorks Component
const FeaturedWorks: React.FC<FeaturedWorksProps> = ({
  title = 'Featured Works',
  subtitle = 'Explore our portfolio of successful projects that have driven measurable results for clients across various industries.',
  works = getFeaturedWorks(),
}) => {
  return (
    <section className='py-16 md:py-20 lg:py-24 overflow-hidden'>
      <div className='container mx-auto px-4'>
        {/* Enhanced Header with animation */}
        <LenisFadeIn className='text-center mb-12 md:mb-16 lg:mb-20'>
          <h2 className='mb-6'>{title}</h2>
          <p className='text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed'>
            {subtitle}
          </p>
        </LenisFadeIn>

        {/* Portfolio Grid */}
        <LenisStaggered
          staggerDelay={200}
          className='grid grid-cols-1 gap-6 md:gap-7 lg:gap-8 max-w-6xl mx-auto'
        >
          {works.map((work, index) => (
            <PortfolioCard key={work.slug} work={work} index={index} />
          ))}
        </LenisStaggered>

        {/* Enhanced View All Works CTA */}
        <LenisFadeIn delay={400} className='text-center mt-16 md:mt-20'>
          <LinkButtonWithArrow
            href='/works'
            variant='default'
            size='lg'
            className='group relative overflow-hidden'
            arrowIcon='arrow'
          >
            <span className='relative z-10'>View All Works</span>
          </LinkButtonWithArrow>
        </LenisFadeIn>
      </div>
    </section>
  )
}

export default FeaturedWorks
export { PortfolioCard }
