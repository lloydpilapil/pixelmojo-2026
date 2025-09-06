'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { LinkButton } from '@/components/ui/button'

// Simple chevron down SVG component
const ChevronDown = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    fill='none' 
    stroke='currentColor' 
    viewBox='0 0 24 24'
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
  </svg>
)

export interface DropdownItem {
  label: string
  href: string
  description?: string
  image?: string
  icon?: string
  price?: string
  badge?: string | null
}

export interface MegaMenuConfig {
  intro?: {
    title: string
    description: string
    socialProof?: string
    ctaText?: string
    ctaHref?: string
  }
}

interface NavigationDropdownProps {
  label: string
  items: DropdownItem[]
  isMobile?: boolean
  megaMenu?: MegaMenuConfig
  fullWidth?: boolean
}

export function NavigationDropdown({ label, items, isMobile = false, megaMenu, fullWidth = false }: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (!isMobile) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobile])

  if (isMobile) {
    // Mobile version - accordion style
    return (
      <div className='w-full'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center justify-between w-full text-base font-medium hover:text-primary transition-colors duration-200 py-1'
        >
          {label}
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='pl-4 py-3 space-y-4'>
            
            {/* Quick Service Links - Simple and scannable */}
            <div>
              <div className='space-y-1'>
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='flex items-center gap-3 py-2 px-2 rounded-md hover:bg-muted transition-colors group'
                    onClick={() => setIsOpen(false)}
                  >
                    <img 
                      src={item.image || '/placeholder.svg'} 
                      alt={item.label}
                      className='w-6 h-6 rounded object-cover bg-muted flex-shrink-0'
                    />
                    <div className='flex-grow'>
                      <div className='font-medium text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-2'>
                        {item.label}
                        {item.badge && (
                          <span className='bg-primary text-white text-xs px-1.5 py-0.5 rounded font-medium'>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <svg className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </Link>
                ))}
                
                {/* View All Services Link */}
                {megaMenu?.intro?.ctaText && megaMenu?.intro?.ctaHref && (
                  <div className='pt-2 mt-2 border-t border-border'>
                    <Link
                      href={megaMenu.intro.ctaHref}
                      className='flex items-center gap-3 py-2 px-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors group'
                      onClick={() => setIsOpen(false)}
                    >
                      <div className='w-6 h-6 rounded bg-primary/20 flex items-center justify-center flex-shrink-0'>
                        <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                      </div>
                      <div className='flex-grow'>
                        <div className='font-semibold text-sm text-primary'>
                          {megaMenu.intro.ctaText}
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop version - for full-width mega menu, return just the button
  if (fullWidth && megaMenu) {
    return (
      <button
        className='flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors'
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <ChevronDown 
          className={`h-3 w-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
    )
  }

  // Desktop version - regular dropdown
  return (
    <div 
      ref={dropdownRef}
      className='relative'
    >
      <button
        className='flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors'
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <ChevronDown 
          className={`h-3 w-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Desktop Dropdown - Simple only */}
      <div
        className={`absolute top-full left-0 mt-2 w-64 rounded-lg border border-border bg-card z-50 transition-all duration-200 
          ${isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
      >
        <div className='py-2'>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='block px-4 py-2 hover:bg-muted transition-colors'
              onClick={() => setIsOpen(false)}
            >
              <div className='font-medium text-sm text-foreground'>{item.label}</div>
              {item.description && (
                <div className='text-xs text-muted-foreground mt-0.5'>
                  {item.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Full-width mega menu panel component
export function MegaMenuPanel({ 
  items, 
  megaMenu, 
  isOpen, 
  onClose 
}: { 
  items: DropdownItem[]
  megaMenu: MegaMenuConfig
  isOpen: boolean
  onClose: () => void 
}) {
  return (
    <div
      className={`w-full bg-card border-t border-b border-border transition-all duration-300 overflow-hidden ${
        isOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0'
      }`}
    >
      <div className='container mx-auto px-4 py-6 md:py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8'>
          {/* Intro Section */}
          <div className='lg:col-span-1 lg:pr-6 lg:border-r lg:border-border'>
            <div className='hidden lg:block mb-4 aspect-[3/2]'>
              <img 
                src='/placeholder.svg' 
                alt='Our Services'
                className='w-full h-full rounded-lg object-cover bg-muted'
              />
            </div>
            <div className='text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground'>
              {megaMenu.intro?.title || 'Our Services'}
            </div>
            <p className='text-sm text-muted-foreground leading-relaxed mb-4'>
              {megaMenu.intro?.description || 'Comprehensive digital solutions to elevate your brand and drive growth.'}
            </p>
            {megaMenu.intro?.socialProof && (
              <div className='text-xs text-muted-foreground mb-4 font-medium'>
                ✨ {megaMenu.intro.socialProof}
              </div>
            )}
            {megaMenu.intro?.ctaText && megaMenu.intro?.ctaHref && (
              <LinkButton
                href={megaMenu.intro.ctaHref}
                variant='default'
                shape='pill'
                size='lg'
                className='w-full md:w-auto'
                onClick={onClose}
              >
                {megaMenu.intro.ctaText}
              </LinkButton>
            )}
          </div>

          {/* Services Grid */}
          <div className='lg:col-span-3'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className='p-4 rounded-lg hover:bg-muted transition-all duration-200 group relative overflow-hidden'
                  onClick={onClose}
                >
                  {/* Badge */}
                  {item.badge && (
                    <div className='absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded font-medium'>
                      {item.badge}
                    </div>
                  )}
                  
                  <div className='flex items-start gap-3 md:gap-4'>
                    <div className='flex-shrink-0'>
                      <img 
                        src={item.image || '/placeholder.svg'} 
                        alt={item.label}
                        className='w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover bg-muted'
                      />
                    </div>
                    <div className='flex-grow min-w-0'>
                      <div className='font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors mb-1'>
                        {item.label}
                      </div>
                      {item.description && (
                        <p className='text-xs md:text-sm text-muted-foreground line-clamp-2 mb-2'>
                          {item.description}
                        </p>
                      )}
                      
                      {/* Price */}
                      {item.price && (
                        <div className='text-xs text-primary font-semibold mb-2'>
                          {item.price}
                        </div>
                      )}
                      
                      {/* CTA */}
                      <div className='flex items-center text-primary text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
                        Learn More
                        <svg className='w-3 h-3 md:w-4 md:h-4 ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}