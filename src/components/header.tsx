'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { LinkButton } from '@/components/ui/button'
import { navigationConfig } from '@/lib/navigation'
import MegaMenu from './mega-menu'

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  
  const servicesNav = navigationConfig.mainNav.find(item => item.label === 'Services')
  const servicesItems = servicesNav?.children || []

  return (
    <header className='sticky top-0 z-40 bg-card/95 backdrop-blur-md'>
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
          <div className='flex items-center justify-center flex-1'>
            <div className='flex items-center gap-8'>
              {navigationConfig.mainNav.map((item) => 
                item.children ? (
                  <MegaMenu
                    key={item.label}
                    trigger={item.label}
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
              )}
            </div>
          </div>

          {/* Desktop CTA */}
          <div>
            <LinkButton 
              href={navigationConfig.ctaButton.href} 
              variant='default' 
              size='default' 
              shape='pill'
            >
              {navigationConfig.ctaButton.label}
            </LinkButton>
          </div>
        </nav>
      </div>

      {/* Mega Menu Panel - Pushes content down */}
      <div className={`w-full bg-background border-t border-b border-border overflow-hidden transition-all duration-300 ease-in-out ${
        isServicesOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-8 justify-center">
            {servicesItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsServicesOpen(false)}
                className="text-sm text-foreground/80 hover:text-[#55AE44] transition-colors duration-200 whitespace-nowrap px-4 py-2 rounded hover:bg-muted/50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}