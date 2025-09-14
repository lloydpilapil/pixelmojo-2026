import Link from 'next/link'
import Image from 'next/image'
import { LinkButton } from '@/components/ui/button'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  ArrowRight,
  Send,
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Works', href: '/works' },
    { label: 'Blog', href: '/blog' },
    { label: 'Reviews', href: '/reviews' },
  ]

  const services = [
    { label: 'UI/UX Design', href: '/services#uiux' },
    { label: 'Web Development', href: '/services#web' },
    { label: 'Brand Identity', href: '/services#brand' },
    { label: 'Product Design', href: '/services#product' },
  ]

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

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
        <div className='container mx-auto px-4 py-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-fluid-4xl font-montserrat font-extrabold text-white mb-6 tracking-tight'>
              Ready to Create Something
              <span className='bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent'>
                {' '}
                Amazing?
              </span>
            </h2>
            <p className='text-fluid-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed'>
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
      <div className='relative container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12'>
          {/* Brand & Newsletter Column */}
          <div className='lg:col-span-5'>
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
              <p className='text-white/70 mb-6 text-fluid-base leading-relaxed'>
                Crafting digital experiences that inspire, engage, and deliver
                measurable results for forward-thinking brands.
              </p>
            </div>

            {/* Newsletter */}
            <div className='mb-8'>
              <h4 className='text-white font-montserrat font-semibold mb-3 text-fluid-lg'>
                Stay Updated
              </h4>
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
                    <Icon className='h-4 w-4 text-white/70 group-hover:text-[var(--secondary)] transition-colors' />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className='lg:col-span-2'>
            <h4 className='text-white font-montserrat font-semibold mb-4 text-fluid-base'>
              Quick Links
            </h4>
            <ul className='space-y-3'>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className='text-white/60 hover:text-[var(--secondary)] transition-colors duration-200 text-fluid-sm inline-flex items-center group'
                  >
                    <span className='w-0 group-hover:w-4 h-px bg-[var(--secondary)] transition-all duration-300 mr-0 group-hover:mr-2' />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className='lg:col-span-3'>
            <h4 className='text-white font-montserrat font-semibold mb-4 text-fluid-base'>
              Services
            </h4>
            <ul className='space-y-3'>
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className='text-white/60 hover:text-[var(--secondary)] transition-colors duration-200 text-fluid-sm inline-flex items-center group'
                  >
                    <span className='w-0 group-hover:w-4 h-px bg-[var(--secondary)] transition-all duration-300 mr-0 group-hover:mr-2' />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className='lg:col-span-2'>
            <h4 className='text-white font-montserrat font-semibold mb-4 text-fluid-base'>
              Get in Touch
            </h4>
            <ul className='space-y-3'>
              <li>
                <a
                  href='mailto:hello@pixelmojo.com'
                  className='text-white/60 hover:text-[var(--secondary)] transition-colors duration-200 text-fluid-sm flex items-center gap-2 group'
                >
                  <Mail className='h-4 w-4 text-white/40 group-hover:text-[var(--secondary)]' />
                  hello@pixelmojo.com
                </a>
              </li>
              <li>
                <a
                  href='tel:+1234567890'
                  className='text-white/60 hover:text-[var(--secondary)] transition-colors duration-200 text-fluid-sm flex items-center gap-2 group'
                >
                  <Phone className='h-4 w-4 text-white/40 group-hover:text-[var(--secondary)]' />
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <div className='text-white/60 text-fluid-sm flex items-start gap-2'>
                  <MapPin className='h-4 w-4 text-white/40 mt-0.5' />
                  <span>
                    123 Design Street
                    <br />
                    Creative City, CC 12345
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='relative border-t border-white/10'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6'>
              <p className='text-white/50 text-sm font-inter'>
                &copy; {currentYear} Pixelmojo. All rights reserved.
              </p>
              <div className='flex items-center gap-6'>
                <Link
                  href='/privacy'
                  className='text-white/50 hover:text-white text-sm transition-colors duration-200'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='text-white/50 hover:text-white text-sm transition-colors duration-200'
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            {/* Badge or Certification */}
            <div className='flex items-center gap-2 text-white/50 text-sm'>
              <span>Crafted with</span>
              <span className='text-[var(--cta)] animate-pulse'>♥</span>
              <span>in Creative City</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
