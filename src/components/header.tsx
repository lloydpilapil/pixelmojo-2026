'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'
import { LinkButton } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { getFeaturedWorks } from '@/data/works'
import { getServiceTheme, getServiceTitleFromSlug } from '@/utils/serviceThemes'
import { allPosts } from '.contentlayer/generated'
import { useSearch } from '@/hooks/useSearch'
import { getCategoryLabel } from '@/lib/search-index'

// Utility function to truncate long titles for mega menu
const truncateTitle = (title: string, maxLength = 40) => {
  if (title.length <= maxLength) return title

  // Try to break at word boundary
  const truncated = title.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  return lastSpace > 20
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...'
}

// Generate works dropdown from featured works
const getFeaturedWorksNav = () => {
  const featuredWorks = getFeaturedWorks()
  return [
    { label: 'All Projects', href: '/projects' },
    ...featuredWorks.map(work => ({
      label: work.title,
      href: work.slug,
    })),
  ]
}

// Generate blog dropdown from recent posts
const getFeaturedBlogsNav = () => {
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return [
    { label: 'All Posts', href: '/blogs' },
    ...sortedPosts.slice(0, 4).map(post => ({
      label: truncateTitle(post.title),
      href: post.url || `/blogs/${post.slug || post._raw.flattenedPath}`,
      fullTitle: post.title, // For hover tooltip
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
      label: 'Projects',
      href: '/projects',
      children: getFeaturedWorksNav(),
    },
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    {
      label: 'Blogs',
      href: '/blogs',
      children: getFeaturedBlogsNav(),
    },
  ],
  ctaButton: {
    label: 'Get in Touch!',
    href: '/contact-us',
  },
}

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isWorksOpen, setIsWorksOpen] = useState(false)
  const [isBlogOpen, setIsBlogOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isMobileWorksOpen, setIsMobileWorksOpen] = useState(false)
  const [isMobileBlogOpen, setIsMobileBlogOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { query, setQuery, results, isSearching } = useSearch()

  // Helper function to check if nav item is active
  const isActiveNav = (href: string, hasChildren?: boolean, label?: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    if (hasChildren && label === 'Services' && pathname.startsWith('/services'))
      return true
    if (hasChildren && label === 'Projects' && pathname.startsWith('/projects'))
      return true
    if (hasChildren && label === 'Blogs' && pathname.startsWith('/blogs'))
      return true
    return false
  }

  const servicesNav = navigationConfig.mainNav.find(
    item => item.label === 'Services'
  )
  const servicesItems = servicesNav?.children || []

  const worksNav = navigationConfig.mainNav.find(
    item => item.label === 'Projects'
  )
  const worksItems = worksNav?.children || []

  const blogNav = navigationConfig.mainNav.find(item => item.label === 'Blogs')
  const blogItems = blogNav?.children || []

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
        setIsMobileBlogOpen(false)
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

  // Handle keyboard shortcuts for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K or CTRL+K to toggle search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(prev => !prev)
        setIsServicesOpen(false)
        setIsWorksOpen(false)
        setIsBlogOpen(false)
      }
      // ESC to close search
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
        setQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, setQuery])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        isSearchOpen &&
        !target.closest('[data-search-panel]') &&
        !target.closest('[data-search-button]')
      ) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen])

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
                  // Dropdown items (Services/Projects)
                  <div key={item.label} className='relative'>
                    <button
                      onClick={() => {
                        if (item.label === 'Services') {
                          setIsServicesOpen(!isServicesOpen)
                          setIsWorksOpen(false)
                          setIsBlogOpen(false)
                          setIsSearchOpen(false)
                        } else if (item.label === 'Projects') {
                          setIsWorksOpen(!isWorksOpen)
                          setIsServicesOpen(false)
                          setIsBlogOpen(false)
                          setIsSearchOpen(false)
                        } else if (item.label === 'Blogs') {
                          setIsBlogOpen(!isBlogOpen)
                          setIsServicesOpen(false)
                          setIsWorksOpen(false)
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
                          (item.label === 'Projects' && isWorksOpen) ||
                          (item.label === 'Blogs' && isBlogOpen)
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
                data-search-button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen)
                  setIsServicesOpen(false)
                  setIsWorksOpen(false)
                  setIsBlogOpen(false)
                }}
                className={`p-2 transition-colors duration-200 rounded-full ${
                  theme
                    ? 'hover:bg-[var(--header-search-hover)] focus-visible:bg-[var(--header-search-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--header-text)] focus-visible:ring-offset-transparent'
                    : 'hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary text-foreground'
                }`}
                style={theme ? { color: theme.textColor } : {}}
                aria-label='Search'
              >
                <Search className='w-5 h-5' />
              </button>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle serviceTheme={theme} />

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
                  backgroundColor: theme?.textColor || 'var(--foreground)',
                }}
              />
              <span
                className={`absolute left-0 top-2.5 w-full h-0.5 transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? 'opacity-0 scale-0'
                    : 'opacity-100 scale-100'
                }`}
                style={{
                  backgroundColor: theme?.textColor || 'var(--foreground)',
                }}
              />
              <span
                className={`absolute left-0 w-full h-0.5 transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'top-2.5 -rotate-45' : 'top-5'
                }`}
                style={{
                  backgroundColor: theme?.textColor || 'var(--foreground)',
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

      {/* Desktop Projects Mega Menu Panel */}
      <div
        className={`hidden lg:block w-full border-t border-b overflow-hidden transition-all duration-300 ease-in-out ${
          isWorksOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
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

      {/* Desktop Blog Mega Menu Panel */}
      <div
        className={`hidden lg:block w-full border-t border-b overflow-hidden transition-all duration-300 ease-in-out ${
          isBlogOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          borderColor: theme?.isDark
            ? 'rgba(255, 255, 255, 0.2)'
            : 'var(--border)',
        }}
      >
        <div className='container mx-auto px-4 py-3'>
          <div className='flex flex-wrap gap-2 lg:gap-3 xl:gap-6 2xl:gap-8 justify-center'>
            {blogItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsBlogOpen(false)}
                className='text-[11px] lg:text-xs xl:text-sm transition-colors duration-200 whitespace-nowrap px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded hover:text-primary'
                style={{
                  color: theme?.mutedTextColor || 'var(--muted-foreground)',
                }}
                title={
                  'fullTitle' in item
                    ? (item as { fullTitle?: string }).fullTitle
                    : item.label
                } // Show full title on hover
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Search Mega Menu Panel */}
      <div
        data-search-panel
        className={`hidden lg:block w-full border-t border-b overflow-hidden transition-all duration-300 ease-in-out ${
          isSearchOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          borderColor: theme?.isDark
            ? 'rgba(255, 255, 255, 0.2)'
            : 'var(--border)',
        }}
      >
        <div className='container mx-auto px-4 py-4'>
          <div className='max-w-3xl mx-auto'>
            {/* Search Input */}
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Search blog posts, projects, services...'
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
                className='w-full px-4 py-2.5 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all'
                style={{
                  borderColor: theme?.isDark
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'var(--border)',
                  color: theme?.textColor || 'var(--foreground)',
                }}
              />
            </div>

            {/* Search Results */}
            {isSearching && (
              <div>
                <div className='max-h-[320px] overflow-y-auto'>
                  {results.length > 0 ? (
                    <div className='space-y-1'>
                      {results.map(item => (
                        <Link
                          key={item.id}
                          href={item.url}
                          onClick={() => {
                            setIsSearchOpen(false)
                            setQuery('')
                          }}
                          className='group flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all hover:scale-[1.02]'
                          style={{
                            backgroundColor: theme?.isDark
                              ? 'rgba(255, 255, 255, 0.05)'
                              : 'rgba(0, 0, 0, 0.03)',
                          }}
                        >
                          <div className='flex-1 min-w-0'>
                            <div
                              className='font-medium text-sm truncate'
                              style={{
                                color: theme?.textColor || 'var(--foreground)',
                              }}
                            >
                              {item.title}
                            </div>
                            <div
                              className='text-xs truncate mt-0.5'
                              style={{
                                color:
                                  theme?.mutedTextColor ||
                                  'var(--muted-foreground)',
                              }}
                            >
                              {item.description}
                            </div>
                          </div>
                          <div className='flex items-center gap-2 flex-shrink-0'>
                            <span
                              className='text-xs px-2 py-1 rounded-full'
                              style={{
                                backgroundColor: theme?.isDark
                                  ? 'rgba(255, 255, 255, 0.1)'
                                  : 'rgba(0, 0, 0, 0.05)',
                                color:
                                  theme?.mutedTextColor ||
                                  'var(--muted-foreground)',
                              }}
                            >
                              {getCategoryLabel(item.category)}
                            </span>
                            <ArrowRight
                              className='w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0'
                              style={{
                                color: theme?.textColor || 'var(--primary)',
                              }}
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div
                      className='text-center py-8 text-sm'
                      style={{
                        color:
                          theme?.mutedTextColor || 'var(--muted-foreground)',
                      }}
                    >
                      No results found for "{query}"
                    </div>
                  )}
                </div>

                {/* See All Results Link */}
                {results.length > 0 && (
                  <div
                    className='mt-3 pt-3 border-t'
                    style={{
                      borderColor: theme?.isDark
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Link
                      href={`/search?q=${encodeURIComponent(query)}`}
                      onClick={() => {
                        setIsSearchOpen(false)
                      }}
                      className='flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-[1.02]'
                      style={{
                        backgroundColor: theme?.isDark
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.03)',
                        color: theme?.textColor || 'var(--primary)',
                      }}
                    >
                      See all results for "{query}"
                      <ArrowRight className='w-4 h-4' />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!isSearching && (
              <div
                className='text-center py-6 text-sm'
                style={{
                  color: theme?.mutedTextColor || 'var(--muted-foreground)',
                }}
              >
                Start typing to search across all content...
              </div>
            )}
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
          backgroundColor: theme?.bg || 'var(--background)',
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
              setIsMobileBlogOpen(false)
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
              setIsMobileBlogOpen(false)
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
                    // Dropdown items (Services/Projects)
                    <div>
                      <button
                        onClick={() => {
                          if (item.label === 'Services') {
                            setIsMobileServicesOpen(!isMobileServicesOpen)
                            setIsMobileWorksOpen(false)
                            setIsMobileBlogOpen(false)
                          } else if (item.label === 'Projects') {
                            setIsMobileWorksOpen(!isMobileWorksOpen)
                            setIsMobileServicesOpen(false)
                            setIsMobileBlogOpen(false)
                          } else if (item.label === 'Blogs') {
                            setIsMobileBlogOpen(!isMobileBlogOpen)
                            setIsMobileServicesOpen(false)
                            setIsMobileWorksOpen(false)
                          }
                        }}
                        className={`w-full flex items-center justify-between text-lg font-medium transition-colors duration-200 py-4 px-4 rounded-lg hover:bg-muted/50 touch-manipulation relative ${
                          isActiveNav(item.href, true, item.label)
                            ? 'text-primary bg-primary/5 border-l-4 border-primary'
                            : 'hover:text-primary'
                        }`}
                        style={{
                          minHeight: '44px',
                          color: theme?.textColor || 'var(--foreground)',
                        }}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            (item.label === 'Services' &&
                              isMobileServicesOpen) ||
                            (item.label === 'Projects' && isMobileWorksOpen) ||
                            (item.label === 'Blogs' && isMobileBlogOpen)
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
                          (item.label === 'Projects' && isMobileWorksOpen) ||
                          (item.label === 'Blogs' && isMobileBlogOpen)
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
                                  setIsMobileBlogOpen(false)
                                }}
                                className='block text-base hover:text-primary transition-colors duration-200 py-2 px-3 rounded hover:bg-muted/30'
                                style={{
                                  color:
                                    theme?.mutedTextColor ||
                                    'var(--muted-foreground)',
                                }}
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
                        setIsMobileWorksOpen(false)
                        setIsMobileBlogOpen(false)
                      }}
                      className={`block text-lg font-medium transition-colors duration-200 py-4 px-4 rounded-lg hover:bg-muted/50 touch-manipulation ${
                        isActiveNav(item.href)
                          ? 'text-primary bg-primary/5 border-l-4 border-primary'
                          : 'hover:text-primary'
                      }`}
                      style={{
                        minHeight: '44px',
                        color: theme?.textColor || 'var(--foreground)',
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <div className='px-4 space-y-4'>
              <LinkButton
                href={navigationConfig.ctaButton.href}
                variant='default'
                size='lg'
                shape='pill'
                className='w-full min-h-[44px]'
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsMobileServicesOpen(false)
                  setIsMobileWorksOpen(false)
                  setIsMobileBlogOpen(false)
                }}
              >
                {navigationConfig.ctaButton.label}
              </LinkButton>

              {/* Mobile Theme Toggle */}
              <div className='flex items-center justify-center'>
                <div className='flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30'>
                  <span
                    className='text-sm font-medium'
                    style={{
                      color: theme?.textColor || 'var(--foreground)',
                    }}
                  >
                    Theme
                  </span>
                  <ThemeToggle serviceTheme={theme} />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
