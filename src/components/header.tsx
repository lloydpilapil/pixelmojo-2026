'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { LinkButton } from '@/components/ui/button'

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
          href: '/services/ui-ux-design-solutions',
        },
        { label: 'Revenue-First Design', href: '/services/brand-identity' },
        {
          label: 'AI-Powered Growth',
          href: '/services/brand-activation-growth',
        },
        {
          label: 'Profit-Optimized Interfaces',
          href: '/services/web-app-design',
        },
        { label: 'Conversion Assets', href: '/services/graphic-visuals' },
        {
          label: 'Full-Stack AI Implementation',
          href: '/services/development-solutions',
        },
      ],
    },
    { label: 'Works', href: '/works' },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Helper function to check if nav item is active
  const isActiveNav = (href: string, hasChildren?: boolean) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    if (hasChildren && pathname.startsWith('/services')) return true
    return false
  }

  const servicesNav = navigationConfig.mainNav.find(
    item => item.label === 'Services'
  )
  const servicesItems = servicesNav?.children || []

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

  return (
    <header className='sticky top-0 z-40 bg-[#FBF8F2]'>
      <div className='container mx-auto px-4'>
        <nav className='flex h-16 items-center justify-between relative'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center hover:opacity-80 transition-opacity z-50'
          >
            <Image
              src='/pixelmojo-branding.svg'
              alt='PixelMojo'
              width={140}
              height={32}
              className='h-8 w-auto'
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center justify-center flex-1'>
            <div className='flex items-center gap-12'>
              {navigationConfig.mainNav.map(item =>
                item.children ? (
                  // Services with dropdown - integrated directly here
                  <div key={item.label} className='relative'>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 relative ${
                        isActiveNav(item.href, true)
                          ? 'text-primary'
                          : 'text-gray-800 hover:text-[#55AE44]'
                      }`}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
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
                    {isActiveNav(item.href, true) && (
                      <div className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full' />
                    )}
                  </div>
                ) : (
                  // Regular nav items
                  <div key={item.label} className='relative'>
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors duration-200 relative ${
                        isActiveNav(item.href)
                          ? 'text-primary'
                          : 'text-gray-800 hover:text-[#55AE44]'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {isActiveNav(item.href) && (
                      <div className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full' />
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Desktop CTA with dynamic variant */}
          <div className='hidden lg:block'>
            <LinkButton
              href={navigationConfig.ctaButton.href}
              variant={isScrolled ? 'default' : 'outline'}
              size='default'
              shape='pill'
              className='transition-all duration-300'
            >
              {navigationConfig.ctaButton.label}
            </LinkButton>
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
                className={`absolute left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'top-2.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 w-full h-0.5 bg-gray-800 transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? 'opacity-0 scale-0'
                    : 'opacity-100 scale-100'
                }`}
              />
              <span
                className={`absolute left-0 w-full h-0.5 bg-gray-800 transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'top-2.5 -rotate-45' : 'top-5'
                }`}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Desktop Mega Menu Panel - Pushes content down */}
      <div
        className={`hidden lg:block w-full bg-[#EEF7EB] border-t border-b border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          isServicesOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='container mx-auto px-4 py-3'>
          {/* Responsive sizing: tighter on small screens, spacious on large screens */}
          <div className='flex flex-wrap gap-2 lg:gap-3 xl:gap-6 2xl:gap-8 justify-center'>
            {servicesItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsServicesOpen(false)}
                className='text-[11px] lg:text-xs xl:text-sm text-gray-700 hover:text-[#2F6B24] transition-colors duration-200 whitespace-nowrap px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded'
              >
                {item.label}
              </Link>
            ))}
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

      {/* Mobile Menu Panel - With #FBF8F2 background */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-[#FBF8F2] transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className='flex items-center justify-between h-16 px-4 border-b border-gray-200'>
          <Link
            href='/'
            onClick={() => {
              setIsMobileMenuOpen(false)
              setIsMobileServicesOpen(false)
            }}
            className='hover:opacity-80 transition-opacity'
          >
            <Image
              src='/pixelmojo-branding.svg'
              alt='PixelMojo'
              width={120}
              height={28}
              className='h-7 w-auto'
            />
          </Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false)
              setIsMobileServicesOpen(false)
            }}
            className='p-3 -mr-3 text-gray-600 hover:text-gray-800 transition-colors touch-manipulation'
            style={{ minHeight: '44px', minWidth: '44px' }}
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
                    // Services with dropdown
                    <div>
                      <button
                        onClick={() =>
                          setIsMobileServicesOpen(!isMobileServicesOpen)
                        }
                        className={`w-full flex items-center justify-between text-lg font-medium transition-colors duration-200 py-4 px-4 rounded-lg hover:bg-gray-100/50 touch-manipulation relative ${
                          isActiveNav(item.href, true)
                            ? 'text-primary bg-primary/5 border-l-4 border-primary'
                            : 'text-gray-800 hover:text-[#55AE44]'
                        }`}
                        style={{ minHeight: '44px' }}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
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

                      {/* Services Dropdown */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isMobileServicesOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <ul className='ml-4 mt-2 space-y-1 border-l-2 border-gray-200 pl-4'>
                          {item.children.map(subItem => (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  setIsMobileServicesOpen(false)
                                }}
                                className='block text-base text-gray-600 hover:text-[#55AE44] transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-100/30'
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
                      className={`block text-lg font-medium transition-colors duration-200 py-4 px-4 rounded-lg hover:bg-gray-100/50 touch-manipulation ${
                        isActiveNav(item.href)
                          ? 'text-primary bg-primary/5 border-l-4 border-primary'
                          : 'text-gray-800 hover:text-[#55AE44]'
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
