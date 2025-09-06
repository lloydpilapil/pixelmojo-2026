'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { LinkButton } from '@/components/ui/button'
import { navigationConfig } from '@/lib/navigation'

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  
  const servicesNav = navigationConfig.mainNav.find(item => item.label === 'Services')
  const servicesItems = servicesNav?.children || []

  return (
    <header className='sticky top-0 z-40 bg-card/95 backdrop-blur-md'>
      <div className='container mx-auto px-4'>
        <nav className='flex h-16 items-center justify-between'>
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
              {navigationConfig.mainNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className='text-sm font-medium text-foreground/80 hover:text-[#55AE44] transition-colors duration-200'
                >
                  {item.label}
                </Link>
              ))}
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
    </header>
  )
}