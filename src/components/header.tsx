'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { LinkButton } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { getFeaturedWorks } from '@/data/works'
import { getServiceTheme, getServiceTitleFromSlug } from '@/utils/serviceThemes'

// Generate works dropdown from featured works
const getFeaturedWorksNav = () => {
  const featuredWorks = getFeaturedWorks()
  return [
    { label: 'All Projects', href: '/works' },
    ...featuredWorks.map(work => ({
      label: work.title,
      href: work.slug,
    })),
  ]
}

const navigationConfig = {
  mainNav: [
    { label: 'Home', href: '/' },
    {
      label: 'Services',
      href: '/services',
      children: [
        { label: 'Overview', href: '/services' },
        {
          label: 'AI Product Development',
          href: '/services/ai-product-development',
        },
        {
          label: 'Revenue-First Design',
          href: '/services/revenue-first-design',
        },
        {
          label: 'AI-Powered Growth',
          href: '/services/ai-powered-growth',
        },
        {
          label: 'Profit-Optimized Interfaces',
          href: '/services/profit-optimized-interfaces',
        },
        { label: 'Conversion Assets', href: '/services/conversion-assets' },
        {
          label: 'Full-Stack AI Implementation',
          href: '/services/full-stack-ai',
        },
      ],
    },
    {
      label: 'Works',
      href: '/works',
      children: getFeaturedWorksNav(),
    },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ],
  ctaButton: {
    label: 'Get in Touch!',
    href: '/contact-us',
  },
}

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isWorksOpen, setIsWorksOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isMobileWorksOpen, setIsMobileWorksOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Helper function to check if nav item is active
  const isActiveNav = (href: string, hasChildren?: boolean, label?: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    if (hasChildren && label === 'Services' && pathname.startsWith('/services'))
      return true
    if (hasChildren && label === 'Works' && pathname.startsWith('/works'))
      return true
    return false
  }

  const servicesNav = navigationConfig.mainNav.find(
    item => item.label === 'Services'
  )
  const servicesItems = servicesNav?.children || []

  const worksNav = navigationConfig.mainNav.find(item => item.label === 'Works')
  const worksItems = worksNav?.children || []

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close mobile menu when clicking outside or on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        setIsMobileServicesOpen(false)
        setIsMobileWorksOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  // Handle scroll detection for button variant change
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if we're on a service page and get the theme
  const isServicePage =
    pathname.startsWith('/services/') && pathname !== '/services'
  let theme = null

  if (isServicePage) {
    const serviceSlug = pathname.split('/services/')[1]?.split('/')[0]
    if (serviceSlug) {
      const serviceTitle = getServiceTitleFromSlug(serviceSlug)
      theme = getServiceTheme(serviceTitle)
    }
  }

  // Define CSS variables for the header when theme is present
  const headerStyle = theme
    ? {
        '--header-bg': theme.bg,
        '--header-text': theme.textColor,
        '--header-muted-text': theme.mutedTextColor,
        '--header-border': theme.isDark
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.2)',
        '--header-search-hover': theme.isDark
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)',
        backgroundColor: 'var(--header-bg)',
      }
    : {
        backgroundColor: 'var(--background)',
      }

  return (
    <header className='sticky top-0 z-40' style={headerStyle}>
      <div className='container mx-auto px-4'>
        <nav className='flex h-16 items-center justify-between relative'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center hover:opacity-80 transition-opacity z-50'
          >
            <Image
              src={
                theme?.primary === '#FDC304'
                  ? '/pixelmojo-branding-yellow-bg.svg'
                  : '/pixelmojo-branding.svg'
              }
              alt='PixelMojo'
              width={140}
              height={32}
              className='h-8 w-auto transition-all duration-300'
              style={{
                filter:
                  theme?.isDark && theme?.primary !== '#FDC304'
                    ? 'brightness(0) invert(1)'
                    : 'none',
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center justify-center flex-1'>
            <div className='flex items-center gap-12'>
              {navigationConfig.mainNav.map(item =>
                item.children ? (
                  // Dropdown items (Services/Works)
                  <div key={item.label} className='relative'>
                    <button
                      onClick={() => {
                        if (item.label === 'Services') {
                          setIsServicesOpen(!isServicesOpen)
                          setIsWorksOpen(false)
                          setIsSearchOpen(false)
                        } else if (item.label === 'Works') {
                          setIsWorksOpen(!isWorksOpen)
                          setIsServicesOpen(false)
                          setIsSearchOpen(false)
                        }
                      }}
                      className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 relative`}
                      style={{
                        color: isActiveNav(item.href, true, item.label)
                          ? theme?.textColor || 'var(--primary)'
                          : theme?.textColor || 'var(--foreground)',
                      }}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          (item.label === 'Services' && isServicesOpen) ||
                          (item.label === 'Works' && isWorksOpen)
                            ? 'rotate-180'
                            : ''
                        }`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </button>
                    {isActiveNav(item.href, true, item.label) && (
                      <div
                        className='absolute -bottom-1 left-0 right-0 h-0.5 rounded-full'
                        style={{
                          backgroundColor: theme?.textColor || 'var(--primary)',
                        }}
                      />
                    )}
                  </div>
                ) : (
                  // Regular nav items
                  <div key={item.label} className='relative'>
                    <Link
                      href={item.href}
                      className='text-sm font-medium transition-colors duration-200 relative'
                      style={{
                        color: isActiveNav(item.href)
                          ? theme?.textColor || 'var(--primary)'
                          : theme?.textColor || 'var(--foreground)',
                      }}
                    >
                      {item.label}
                    </Link>
                    {isActiveNav(item.href) && (
                      <div
                        className='absolute -bottom-1 left-0 right-0 h-0.5 rounded-full'
                        style={{
                          backgroundColor: theme?.textColor || 'var(--primary)',
                        }}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Search Icon */}
          <div className='hidden lg:flex items-center gap-4'>
            <div className='relative'>
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen)
                  setIsServicesOpen(false)
                  setIsWorksOpen(false)
                }}
                className={`p-2 transition-colors duration-200 rounded-full ${
                  theme
                    ? 'hover:bg-[var(--header-search-hover)] focus-visible:bg-[var(--header-search-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--header-text)] focus-visible:ring-offset-transparent'
                    : 'hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary text-foreground'
                }`}
                aria-label='Search'
              >
                <Search className='w-5 h-5' />
              </button>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Desktop CTA with dynamic variant */}
            <div>
              <LinkButton
                href={navigationConfig.ctaButton.href}
                variant={isScrolled ? 'default' : 'outline'}
                size='default'
                shape='pill'
                className='transition-all duration-300'
                style={
                  theme
                    ? {
                        backgroundColor: isScrolled
                          ? theme.textColor
                          : 'transparent',
                        color: isScrolled ? theme.bg : theme.textColor,
                        borderColor: theme.textColor,
                      }
                    : {}
                }
              >
                {navigationConfig.ctaButton.label}
              </LinkButton>
            </div>
          </div>

          {/* Mobile Hamburger Button - Fixed visibility */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='lg:hidden relative z-50 p-3 -mr-3 touch-manipulation'
            style={{ minHeight: '44px', minWidth: '44px' }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className='relative w-6 h-5'>
              <span
                className={`absolute left-0 w-full h-0.5 transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'top-2.5 rotate-45' : 'top-0'
                }`}
                style={{
                  backgroundColor: theme?.textColor || '#374151',
                }}
              />
              <span
                className={`absolute left-0 top-2.5 w-full h-0.5 transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? 'opacity-0 scale-0'
                    : 'opacity-100 scale-100'
                }`}
                style={{
                  backgroundColor: theme?.textColor || '#374151',
                }}
              />
              <span
                className={`absolute left-0 w-full h-0.5 transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'top-2.5 -rotate-45' : 'top-5'
                }`}
                style={{
                  backgroundColor: theme?.textColor || '#374151',
                }}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Desktop Services Mega Menu Panel */}
      <div
        className={`hidden lg:block w-full border-t border-b overflow-hidden transition-all duration-300 ease-in-out ${
          isServicesOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          backgroundColor: theme?.bg || 'var(--card)',
          borderColor: theme?.isDark
            ? 'rgba(255, 255, 255, 0.2)'
            : 'var(--border)',
        }}
      >
        <div className='container mx-auto px-4 py-3'>
          <div className='flex flex-wrap gap-2 lg:gap-3 xl:gap-6 2xl:gap-8 justify-center'>
            {servicesItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsServicesOpen(false)}
                className='text-[11px] lg:text-xs xl:text-sm transition-colors duration-200 whitespace-nowrap px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded'
                style={{
                  color: theme?.mutedTextColor || 'var(--muted-foreground)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Works Mega Menu Panel */}
      <div
        className={`hidden lg:block w-full border-t border-b overflow-hidden transition-all duration-300 ease-in-out ${
          isWorksOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          backgroundColor: theme?.bg || 'var(--card)',
          borderColor: theme?.isDark
            ? 'rgba(255, 255, 255, 0.2)'
            : 'var(--border)',
        }}
      >
        <div className='container mx-auto px-4 py-3'>
          <div className='flex flex-wrap gap-2 lg:gap-3 xl:gap-6 2xl:gap-8 justify-center'>
            {worksItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsWorksOpen(false)}
                className='text-[11px] lg:text-xs xl:text-sm transition-colors duration-200 whitespace-nowrap px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded'
                style={{
                  color: theme?.mutedTextColor || 'var(--muted-foreground)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Search Mega Menu Panel */}
      <div
        className={`hidden lg:block w-full border-t border-b overflow-hidden transition-all duration-300 ease-in-out ${
          isSearchOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          backgroundColor: theme?.bg || 'var(--card)',
          borderColor: theme?.isDark
            ? 'rgba(255, 255, 255, 0.2)'
            : 'var(--border)',
        }}
      >
        <div className='container mx-auto px-4 py-6'>
          <div className='max-w-2xl mx-auto text-center'>
            <div className='flex items-center gap-3 mb-4'>
              <Search
                className='w-6 h-6'
                style={{
                  color: theme?.mutedTextColor || 'var(--muted-foreground)',
                }}
              />
              <input
                type='text'
                placeholder='Search coming soon...'
                disabled
                className='flex-1 px-4 py-3 rounded-lg border cursor-not-allowed'
                style={{
                  backgroundColor: theme?.isDark
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.05)',
                  borderColor: theme?.isDark
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'var(--border)',
                  color: theme?.mutedTextColor || 'var(--muted-foreground)',
                }}
              />
            </div>
            <p
              className='text-sm'
              style={{
                color: theme?.mutedTextColor || 'var(--muted-foreground)',
              }}
            >
              We're building an amazing search experience. Stay tuned!
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden='true'
      />

      {/* Mobile Menu Panel - With themed background */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: theme?.bg || '#FBF8F2',
        }}
      >
        {/* Mobile Menu Header */}
        <div
          className='flex items-center justify-between h-16 px-4 border-b'
          style={{
            borderColor: theme?.isDark
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <Link
            href='/'
            onClick={() => {
              setIsMobileMenuOpen(false)
              setIsMobileServicesOpen(false)
              setIsMobileWorksOpen(false)
            }}
            className='hover:opacity-80 transition-opacity'
          >
            <Image
              src={
                theme?.primary === '#FDC304'
                  ? '/pixelmojo-branding-yellow-bg.svg'
                  : '/pixelmojo-branding.svg'
              }
              alt='PixelMojo'
              width={120}
              height={28}
              className='h-7 w-auto transition-all duration-300'
              style={{
                filter:
                  theme?.isDark && theme?.primary !== '#FDC304'
                    ? 'brightness(0) invert(1)'
                    : 'none',
              }}
            />
          </Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false)
              setIsMobileServicesOpen(false)
              setIsMobileWorksOpen(false)
            }}
            className='p-3 -mr-3 transition-colors touch-manipulation'
            style={{
              minHeight: '44px',
              minWidth: '44px',
              color: theme?.textColor || '#6B7280',
            }}
            aria-label='Close menu'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className='h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain'>
          <nav className='p-6'>
            {/* Main Navigation with Integrated Services Dropdown */}
            <ul className='space-y-2 mb-8'>
              {navigationConfig.mainNav.map(item => (
                <li key={item.label}>
                  {item.children ? (
                    // Dropdown items (Services/Works)
                    <div>
                      <button
                        onClick={() => {
                          if (item.label === 'Services') {
                            setIsMobileServicesOpen(!isMobileServicesOpen)
                            setIsMobileWorksOpen(false)
                          } else if (item.label === 'Works') {
                            setIsMobileWorksOpen(!isMobileWorksOpen)
                            setIsMobileServicesOpen(false)
                          }
                        }}
                        className={`w-full flex items-center justify-between text-lg font-medium transition-colors duration-200 py-4 px-4 rounded-lg hover:bg-muted/50 touch-manipulation relative ${
                          isActiveNav(item.href, true, item.label)
                            ? 'text-primary bg-primary/5 border-l-4 border-primary'
                            : 'text-foreground hover:text-primary'
                        }`}
                        style={{ minHeight: '44px' }}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            (item.label === 'Services' &&
                              isMobileServicesOpen) ||
                            (item.label === 'Works' && isMobileWorksOpen)
                              ? 'rotate-180'
                              : ''
                          }`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 9l-7 7-7-7'
                          />
                        </svg>
                      </button>

                      {/* Dropdown content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          (item.label === 'Services' && isMobileServicesOpen) ||
                          (item.label === 'Works' && isMobileWorksOpen)
                            ? 'max-h-96'
                            : 'max-h-0'
                        }`}
                      >
                        <ul className='ml-4 mt-2 space-y-1 border-l-2 border-border pl-4'>
                          {item.children.map(subItem => (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  setIsMobileServicesOpen(false)
                                  setIsMobileWorksOpen(false)
                                }}
                                className='block text-base text-muted-foreground hover:text-primary transition-colors duration-200 py-2 px-3 rounded hover:bg-muted/30'
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    // Regular menu items
                    <Link
                      href={item.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        setIsMobileServicesOpen(false)
                      }}
                      className={`block text-lg font-medium transition-colors duration-200 py-4 px-4 rounded-lg hover:bg-muted/50 touch-manipulation ${
                        isActiveNav(item.href)
                          ? 'text-primary bg-primary/5 border-l-4 border-primary'
                          : 'text-foreground hover:text-primary'
                      }`}
                      style={{ minHeight: '44px' }}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <div className='px-4'>
              <LinkButton
                href={navigationConfig.ctaButton.href}
                variant='default'
                size='lg'
                shape='pill'
                className='w-full min-h-[44px]'
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsMobileServicesOpen(false)
                }}
              >
                {navigationConfig.ctaButton.label}
              </LinkButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
