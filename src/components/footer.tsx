'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LinkButton } from '@/components/ui/button'
import { Mail, MapPin, ArrowRight, Send, ChevronDown } from 'lucide-react'
import {
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa6'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const quickLinks = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Works', href: '/works' },
    { label: 'Blog', href: '/blog' },
  ]

  const services = [
    {
      label: 'Growth-Focused Product Sprint',
      href: '/services/ui-ux-design-solutions',
    },
    { label: 'Brand Identity', href: '/services/brand-identity' },
    {
      label: 'Brand Activation & Growth',
      href: '/services/brand-activation-growth',
    },
    { label: 'Web & App Design', href: '/services/web-app-design' },
    { label: 'Graphic & Visuals', href: '/services/graphic-visuals' },
    { label: 'Development Solutions', href: '/services/development-solutions' },
  ]

  const socialLinks = [
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    { icon: FaXTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
  ]

  // Responsive Accordion Wrapper Component
  const ResponsiveSection = ({
    title,
    sectionKey,
    children,
    className = '',
  }: {
    title: string
    sectionKey: string
    children: React.ReactNode
    className?: string
  }) => {
    const isOpen = openSections.includes(sectionKey)

    return (
      <div className={className}>
        {/* Mobile Accordion Header - Hidden on lg and up */}
        <button
          onClick={() => toggleSection(sectionKey)}
          className='lg:hidden w-full py-4 flex items-center justify-between text-left transition-colors hover:bg-white/5 border-b border-white/10'
          aria-expanded={isOpen}
          aria-controls={`section-${sectionKey}`}
        >
          <span className='text-white font-montserrat font-semibold text-fluid-base'>
            {title}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-white/60 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Desktop Header - Hidden on mobile, visible on lg and up */}
        <h3 className='hidden lg:block text-white font-montserrat font-semibold mb-4 text-fluid-base'>
          {title}
        </h3>

        {/* Content - Always visible on desktop, accordion on mobile */}
        <div
          id={`section-${sectionKey}`}
          className={`
            lg:block
            ${isOpen ? 'block' : 'hidden lg:block'}
            overflow-hidden transition-all duration-300 ease-in-out
          `}
        >
          <div className='lg:px-0 px-1 pb-4 lg:pb-0'>{children}</div>
        </div>
      </div>
    )
  }

  return (
    <footer className='relative bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, var(--primary) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, var(--secondary) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, var(--accent) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* CTA Section */}
      <div className='relative border-b border-white/10'>
        <div className='container mx-auto px-4 py-12 lg:py-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='!text-white'>Ready to Create Something Amazing?</h2>
            <p className='!text-white'>
              Let's collaborate to transform your ideas into exceptional digital
              experiences that captivate users and drive growth.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <LinkButton href='/contact-us' size='lg' className='group'>
                Start Your Project
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </LinkButton>
              <LinkButton
                href='/works'
                variant='outline'
                size='lg'
                className='border-white/30 text-white hover:bg-white/10'
              >
                View Our Work
              </LinkButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='relative container mx-auto px-4 py-12 lg:py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12'>
          {/* Brand & Newsletter Column - Always visible */}
          <div className='lg:col-span-4 mb-8 lg:mb-0'>
            <div className='mb-8'>
              <Link href='/' className='inline-block mb-6'>
                <Image
                  src='/pixelmojo-branding.svg'
                  alt='Pixelmojo'
                  width={150}
                  height={40}
                  className='brightness-0 invert'
                />
              </Link>
              <p className='text-white/70 mb-6'>
                Crafting digital experiences that inspire, engage, and deliver
                measurable results for forward-thinking brands.
              </p>
            </div>

            {/* Newsletter */}
            <div className='mb-8'>
              <h3 className='text-white font-montserrat font-semibold mb-3 text-fluid-base lg:text-fluid-lg'>
                Stay Updated
              </h3>
              <p className='text-white/60 mb-4 text-sm'>
                Get insights on design trends and digital innovation.
              </p>
              <form className='flex gap-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[var(--secondary)] transition-colors text-sm'
                  aria-label='Email for newsletter'
                />
                <button
                  type='submit'
                  className='px-4 py-2.5 bg-[var(--secondary)] hover:bg-[var(--secondary)]/90 text-white rounded-lg transition-all hover:shadow-lg hover:shadow-[var(--secondary)]/25 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50'
                  aria-label='Subscribe to newsletter'
                >
                  <Send className='h-4 w-4' />
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className='flex gap-3'>
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className='w-10 h-10 rounded-lg bg-white/10 hover:bg-[var(--secondary)]/20 border border-white/10 hover:border-[var(--secondary)]/50 flex items-center justify-center transition-all duration-300 group'
                    aria-label={social.label}
                  >
                    <Icon className='text-base text-white/70 group-hover:text-[var(--secondary)] transition-colors' />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Spacer - Only visible on large screens */}
          <div className='hidden lg:block lg:col-span-1'></div>

          {/* Links Container - Responsive grid within */}
          <div className='lg:col-span-7 border-t lg:border-0 border-white/10'>
            <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-8'>
              {/* Quick Links - Responsive Section */}
              <ResponsiveSection
                title='Quick Links'
                sectionKey='quicklinks'
                className='lg:col-span-1'
              >
                <ul className='space-y-3'>
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className='text-white/60 hover:text-[var(--secondary)] transition-colors duration-200 text-fluid-sm block group relative py-1 lg:py-0'
                      >
                        <span className='hidden lg:inline-block absolute left-0 top-1/2 -translate-y-1/2 w-0 h-px bg-[var(--secondary)] group-hover:w-4 transition-all duration-300' />
                        <span className='lg:group-hover:pl-6 transition-all duration-300 inline-block'>
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </ResponsiveSection>

              {/* Services - Responsive Section */}
              <ResponsiveSection
                title='Services'
                sectionKey='services'
                className='lg:col-span-1'
              >
                <ul className='space-y-3'>
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link
                        href={service.href}
                        className='text-white/60 hover:text-[var(--secondary)] transition-colors duration-200 text-fluid-sm block group relative py-1 lg:py-0'
                      >
                        <span className='hidden lg:inline-block absolute left-0 top-1/2 -translate-y-1/2 w-0 h-px bg-[var(--secondary)] group-hover:w-4 transition-all duration-300' />
                        <span className='lg:group-hover:pl-6 transition-all duration-300 inline-block'>
                          {service.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </ResponsiveSection>

              {/* Contact Info - Responsive Section */}
              <ResponsiveSection
                title='Get in Touch'
                sectionKey='contact'
                className='lg:col-span-1'
              >
                <ul className='space-y-3'>
                  <li>
                    <a
                      href='mailto:founders@pixelmojo.io'
                      className='text-white/60 hover:text-[var(--secondary)] transition-colors duration-200 text-fluid-sm flex items-start group'
                    >
                      <Mail className='h-4 w-4 text-white/40 group-hover:text-[var(--secondary)] mr-3 mt-0.5 flex-shrink-0' />
                      <span>founders@pixelmojo.io</span>
                    </a>
                  </li>
                  <li>
                    <div className='text-white/60 text-fluid-sm flex items-start'>
                      <MapPin className='h-4 w-4 text-white/40 mr-3 mt-0.5 flex-shrink-0' />
                      <span>
                        111 Paseo de Roxas, Legazpi Village
                        <br />
                        Makati, 1229 Metro Manila
                      </span>
                    </div>
                  </li>
                </ul>
              </ResponsiveSection>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='relative border-t border-white/10'>
        <div className='container mx-auto px-4 py-6'>
          {/* Desktop Layout - 3 columns with proper alignment */}
          <div className='hidden md:flex md:items-center md:justify-between'>
            {/* Left - Copyright */}
            <div className='flex-1'>
              <p className='text-white/50 text-sm font-inter'>
                &copy; {currentYear} Pixelmojo. All rights reserved.
              </p>
            </div>

            {/* Center - Designed & Built */}
            <div className='flex-1 flex justify-center'>
              <div className='text-white/50 text-sm'>
                Designed & Built with Passion
              </div>
            </div>

            {/* Right - Legal Links */}
            <div className='flex-1 flex justify-end'>
              <div className='flex items-center gap-1'>
                <Link
                  href='/privacy'
                  className='text-white/50 hover:text-white text-sm transition-colors duration-200 px-2'
                >
                  Privacy Policy
                </Link>
                <span className='text-white/30'>|</span>
                <Link
                  href='/terms'
                  className='text-white/50 hover:text-white text-sm transition-colors duration-200 px-2'
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Stacked and centered */}
          <div className='md:hidden flex flex-col items-center gap-4'>
            {/* Copyright */}
            <p className='text-white/50 text-sm font-inter text-center'>
              &copy; {currentYear} Pixelmojo. All rights reserved.
            </p>

            {/* Designed & Built */}
            <div className='text-white/50 text-sm text-center'>
              Designed & Built with Passion
            </div>

            {/* Legal Links */}
            <div className='flex items-center gap-1'>
              <Link
                href='/privacy'
                className='text-white/50 hover:text-white text-sm transition-colors duration-200 px-2'
              >
                Privacy Policy
              </Link>
              <span className='text-white/30'>|</span>
              <Link
                href='/terms'
                className='text-white/50 hover:text-white text-sm transition-colors duration-200 px-2'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
