'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ServiceNavigationProps {
  currentService: string
  theme?: {
    bg: string
    textColor: string
    mutedTextColor: string
    isDark: boolean
  }
}

const services = [
  {
    slug: 'ai-product-development',
    title: 'AI Product Development',
  },
  {
    slug: 'revenue-first-design',
    title: 'Revenue-First Design Systems',
  },
  {
    slug: 'ai-powered-growth',
    title: 'AI-Powered Growth Engines',
  },
  {
    slug: 'profit-optimized-interfaces',
    title: 'Profit-Optimized Interfaces',
  },
  {
    slug: 'conversion-assets',
    title: 'Conversion Asset Systems',
  },
  {
    slug: 'full-stack-ai',
    title: 'Full-Stack AI Implementation',
  },
]

export default function ServiceNavigation({
  currentService,
  theme,
}: ServiceNavigationProps) {
  const currentIndex = services.findIndex(s => s.slug === currentService)
  const prevService =
    currentIndex > 0
      ? services[currentIndex - 1]
      : services[services.length - 1]
  const nextService =
    currentIndex < services.length - 1
      ? services[currentIndex + 1]
      : services[0]

  const borderColor = theme?.isDark
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'

  const hoverBorderColor = theme?.isDark
    ? 'rgba(255, 255, 255, 0.3)'
    : 'rgba(0, 0, 0, 0.3)'

  return (
    <div
      className='mt-32 pt-16'
      style={{ borderTop: `1px solid ${borderColor}` }}
    >
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-start gap-8'>
          {/* Previous */}
          <Link
            href={`/services/${prevService.slug}`}
            className='group flex-1 text-left'
          >
            <div
              className='flex items-center gap-2 mb-2 text-sm transition-colors'
              style={{ color: theme?.mutedTextColor }}
            >
              <ArrowLeft className='w-4 h-4' />
              <span>Previous Service</span>
            </div>
            <h3
              className='text-lg md:text-xl font-medium transition-colors group-hover:opacity-80'
              style={{ color: theme?.textColor }}
            >
              {prevService.title}
            </h3>
          </Link>

          {/* Center - All Services */}
          <Link
            href='/services'
            className='px-4 py-2 text-sm transition-all rounded'
            style={{
              color: theme?.mutedTextColor,
              border: `1px solid ${borderColor}`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = theme?.textColor || ''
              e.currentTarget.style.borderColor = hoverBorderColor
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = theme?.mutedTextColor || ''
              e.currentTarget.style.borderColor = borderColor
            }}
          >
            All Services
          </Link>

          {/* Next */}
          <Link
            href={`/services/${nextService.slug}`}
            className='group flex-1 text-right'
          >
            <div
              className='flex items-center justify-end gap-2 mb-2 text-sm transition-colors'
              style={{ color: theme?.mutedTextColor }}
            >
              <span>Next Service</span>
              <ArrowRight className='w-4 h-4' />
            </div>
            <h3
              className='text-lg md:text-xl font-medium transition-colors group-hover:opacity-80'
              style={{ color: theme?.textColor }}
            >
              {nextService.title}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  )
}
