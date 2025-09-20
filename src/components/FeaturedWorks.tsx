'use client'

import React, { useState, useEffect } from 'react'
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

interface WorkItem {
  title: string
  description: string
  year: string
  category: string
  slug: string
  coverImage?: string
  technologies?: string[]
  featured?: boolean
  demoUrl?: string
  isNew?: boolean // For projects less than 3 months old
}

interface FeaturedWorksProps {
  title?: string
  subtitle?: string
  works?: WorkItem[]
}

interface PortfolioStripProps {
  work: WorkItem
  index: number
  className?: string
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
    href: '/services/web-app-design',
    icon: Monitor,
    color: 'primary',
  },
  Branding: {
    href: '/services/brand-identity',
    icon: Palette,
    color: 'secondary',
  },
  'E-commerce': {
    href: '/services/brand-activation-growth',
    icon: ShoppingBag,
    color: 'accent',
  },
  Healthcare: {
    href: '/services/ui-ux-design-solutions',
    icon: Heart,
    color: 'cta',
  },
}

// Loading Skeleton Component
const PortfolioStripSkeleton: React.FC = () => (
  <div className='h-full flex flex-col md:flex-row animate-pulse'>
    {/* Image skeleton */}
    <div className='aspect-[3/2] w-full md:w-[360px] rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5' />

    {/* Content skeleton */}
    <div className='flex-1 p-5 md:p-6 space-y-4'>
      <div className='space-y-1.5'>
        <div className='flex items-start justify-between gap-4'>
          <div className='h-5 w-2/3 rounded-lg bg-muted' />
          <div className='h-5 w-16 rounded-full bg-muted/60' />
        </div>
        <div className='space-y-2'>
          <div className='h-[14px] w-full rounded bg-muted/70' />
          <div className='h-[14px] w-5/6 rounded bg-muted/70' />
          <div className='h-[14px] w-4/6 rounded bg-muted/70' />
        </div>
      </div>
      <div className='flex flex-wrap gap-2'>
        <div className='w-16 h-6 rounded-full bg-muted/50' />
        <div className='w-20 h-6 rounded-full bg-muted/50' />
        <div className='w-20 h-6 rounded-full bg-muted/50' />
      </div>
      <div className='h-5 w-24 rounded bg-muted' />
    </div>
  </div>
)

// Compact Portfolio Card Component
const PortfolioCard: React.FC<PortfolioStripProps> = ({
  work,
  index,
  className = '',
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
        <div className='h-full flex flex-col md:flex-row transition-all duration-500'>
          {/* Cover Image */}
          <div className='relative aspect-[3/2] w-full md:w-[360px] flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5'>
            {/* Loading shimmer */}
            {!imageLoaded && (
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer' />
            )}

            {work.coverImage ? (
              <>
                <Image
                  src={work.coverImage}
                  alt={work.title}
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
  works = [
    {
      title: 'Real Estate Bear',
      description:
        'Unified web and mobile funnels that help real estate teams onboard agents faster and convert warmer leads.',
      year: '2024',
      category: 'Web & Mobile',
      slug: '/works/real-estate-bear',
      coverImage: '/placeholder.svg',
      technologies: ['React', 'Next.js', 'React Native', 'TypeScript'],
      featured: true,
      isNew: true,
    },
    {
      title: 'Funnel Zen Branding',
      description:
        'Positioned a growth-stage SaaS with a cohesive brand system that signals maturity and boosts demo requests.',
      year: '2023',
      category: 'Branding',
      slug: '/works/funnel-zen-branding',
      coverImage: '/placeholder.svg',
      technologies: ['Brand Strategy', 'Logo Design', 'Visual Identity'],
    },
    {
      title: 'Beemine Store',
      description:
        'CRO-focused Shopify refresh aligning storytelling with subscription offers to lift average order value.',
      year: '2023',
      category: 'E-commerce',
      slug: '/works/beemine-store',
      coverImage: '/placeholder.svg',
      technologies: ['Shopify', 'UI/UX', 'Brand Design', 'Conversion'],
    },
    {
      title: 'Cigna Stress Management App',
      description:
        'Accessible stress management journey that keeps patients engaged while clinicians monitor progress in real time.',
      year: '2020',
      category: 'Healthcare',
      slug: '/works/cigna-stress-management-app',
      coverImage: '/placeholder.svg',
      technologies: ['Mobile Design', 'Healthcare UX', 'Accessibility'],
      featured: true,
    },
  ],
}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setLoading(false), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className='py-16 md:py-20 lg:py-24 overflow-hidden'>
      <div className='container mx-auto px-4'>
        {/* Enhanced Header with animation */}
        <div className='text-center mb-12 md:mb-16 lg:mb-20'>
          <h2 className='mb-6 animate-fade-in'>{title}</h2>
          <p
            className='text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed animate-fade-in'
            style={{ animationDelay: '100ms' }}
          >
            {subtitle}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className='grid grid-cols-1 gap-6 md:gap-7 lg:gap-8 max-w-6xl mx-auto'>
          {loading
            ? // Show skeletons while loading
              Array.from({ length: 4 }).map((_, i) => (
                <PortfolioStripSkeleton key={i} />
              ))
            : works.map((work, index) => (
                <PortfolioCard key={work.slug} work={work} index={index} />
              ))}
        </div>

        {/* Enhanced View All Works CTA */}
        <div className='text-center mt-16 md:mt-20'>
          <LinkButtonWithArrow
            href='/works'
            variant='default'
            size='lg'
            className='group relative overflow-hidden'
            arrowIcon='arrow'
          >
            <span className='relative z-10'>View All Works</span>
          </LinkButtonWithArrow>
        </div>
      </div>
    </section>
  )
}

export default FeaturedWorks
export { PortfolioCard, PortfolioStripSkeleton }
