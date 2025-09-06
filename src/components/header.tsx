'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { LinkButton } from '@/components/ui/button'
import { MegaMenu, MegaMenuPanel } from './mega-menu'
import { navigationConfig } from '@/lib/navigation'

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  
  const servicesNav = navigationConfig.mainNav.find(item => item.label === 'Services')
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

  return (
    <>
      <header className='sticky top-0 z-50 bg-card/95 backdrop-blur-md'>
        <div className='container mx-auto px-4'>
          <nav className='flex h-16 items-center justify-between'>
            {/* Logo */}
            <Link 
              href='/' 
              className='flex items-center hover:opacity-80 transition-opacity'
              onClick={() => setIsMobileMenuOpen(false)}
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
              <div className='flex items-center gap-8'>
                {navigationConfig.mainNav.map((item) => (
                  item.children ? (
                    <MegaMenu
                      key={item.label}
                      label={item.label}
                      items={item.children}
                      isOpen={isServicesOpen}
                      onToggle={() => setIsServicesOpen(!isServicesOpen)}
                    />
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className='text-sm font-medium text-foreground/80 hover:text-[#55AE44] transition-colors duration-200'
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className='hidden lg:block'>
              <LinkButton 
                href={navigationConfig.ctaButton.href} 
                variant='default' 
                size='default' 
                shape='pill'
              >
                {navigationConfig.ctaButton.label}
              </LinkButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='block lg:hidden relative z-60 p-2 -mr-2'
              aria-label='Toggle menu'
              aria-expanded={isMobileMenuOpen}
            >
              <div className='relative w-6 h-5'>
                <span 
                  className={`absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'
                  }`} 
                />
                <span 
                  className={`absolute left-0 top-2 w-full h-0.5 bg-foreground transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`} 
                />
                <span 
                  className={`absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                  }`} 
                />
              </div>
            </button>
          </nav>
        </div>

        {/* Desktop Mega Menu Panel */}
        <div className='hidden lg:block'>
          <MegaMenuPanel
            items={servicesItems}
            isOpen={isServicesOpen}
            onClose={() => setIsServicesOpen(false)}
          />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div 
        className={`lg:hidden fixed inset-0 z-50 bg-background transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className='flex items-center justify-between h-16 px-4 border-b border-border'>
          <Link 
            href='/' 
            onClick={() => setIsMobileMenuOpen(false)}
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
            onClick={() => setIsMobileMenuOpen(false)}
            className='p-2 -mr-2 text-foreground/60 hover:text-foreground transition-colors'
            aria-label='Close menu'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className='h-[calc(100%-4rem)] overflow-y-auto'>
          <nav className='p-4'>
            <ul className='space-y-1'>
              {navigationConfig.mainNav.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className='flex items-center justify-between w-full px-3 py-3 text-base font-medium text-foreground/80 hover:text-[#55AE44] hover:bg-muted/50 rounded-lg transition-all duration-200'
                      >
                        <span>{item.label}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isMobileServicesOpen ? 'rotate-180' : ''
                          }`}
                          fill='none' 
                          stroke='currentColor' 
                          viewBox='0 0 24 24'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                        </svg>
                      </button>
                      
                      <div className={`mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                        isMobileServicesOpen ? 'max-h-96' : 'max-h-0'
                      }`}>
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className='block px-3 py-2 pl-8 text-sm text-foreground/60 hover:text-[#55AE44] hover:bg-muted/30 rounded-lg transition-all duration-200'
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className='block px-3 py-3 text-base font-medium text-foreground/80 hover:text-[#55AE44] hover:bg-muted/50 rounded-lg transition-all duration-200'
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <div className='mt-8 px-3'>
              <LinkButton 
                href={navigationConfig.ctaButton.href} 
                variant='default' 
                size='lg' 
                shape='pill' 
                className='w-full'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {navigationConfig.ctaButton.label}
              </LinkButton>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}