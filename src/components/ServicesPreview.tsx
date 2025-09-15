'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LinkButtonWithArrow } from '@/components/ui/button'

interface ServiceItem {
  title: string
  description: string
  icon: string
  href: string
  gradient: string
}

interface ServicesPreviewProps {
  title?: string
  services?: ServiceItem[]
}

const ServicesPreview = ({
  title = 'Our Services',
  services = [
    {
      title: 'UI/UX Design Solutions',
      description:
        'User-centered design that drives engagement and conversions through intuitive interfaces and seamless experiences.',
      icon: '/ui_ux_design_solutions_services_thumb.svg',
      href: '/services/ui-ux-design-solutions',
      gradient: 'from-blue-500/10 to-purple-500/10',
    },
    {
      title: 'Brand Identity',
      description:
        'Comprehensive brand design that tells your story and creates lasting connections with your audience.',
      icon: '/branding_services_thumb.svg',
      href: '/services/brand-identity',
      gradient: 'from-purple-500/10 to-pink-500/10',
    },
    {
      title: 'Brand Activation & Growth',
      description:
        'Strategic campaigns that amplify your brand presence and drive growth across all touchpoints.',
      icon: '/digital_marketing_services_thumb.svg',
      href: '/services/brand-activation-growth',
      gradient: 'from-green-500/10 to-teal-500/10',
    },
    {
      title: 'Web & App Design',
      description:
        'Digital experiences that perform beautifully and delight users on every device and platform.',
      icon: '/web_app_design_services_thumb.svg',
      href: '/services/web-app-design',
      gradient: 'from-orange-500/10 to-red-500/10',
    },
    {
      title: 'Graphic & Visuals',
      description:
        'Visual assets that communicate your message clearly and captivate your target audience.',
      icon: '/graphic_visual_design_services_thumb.svg',
      href: '/services/graphic-visuals',
      gradient: 'from-pink-500/10 to-rose-500/10',
    },
    {
      title: 'Development Solutions',
      description:
        'Robust technical implementation that scales with your business and delivers exceptional performance.',
      icon: '/creative_contents_services_thumb.svg',
      href: '/services/development-solutions',
      gradient: 'from-indigo-500/10 to-blue-500/10',
    },
  ],
}: ServicesPreviewProps) => {
  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='mb-6'>{title}</h2>
          <p className='text-muted max-w-3xl mx-auto text-lg leading-relaxed'>
            Comprehensive digital solutions designed to elevate your brand and
            drive measurable results across every touchpoint.
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12'>
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className='group block h-full'
            >
              <div className='h-full bg-card rounded-2xl border border-border p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-1'>
                {/* Icon */}
                <div className='w-16 h-16 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110'>
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={64}
                    height={64}
                    className='w-16 h-16'
                  />
                </div>

                {/* Content */}
                <div className='space-y-4'>
                  <h3 className='group-hover:text-primary transition-colors duration-300'>
                    {service.title}
                  </h3>
                  <p className='text-muted leading-relaxed'>
                    {service.description}
                  </p>
                </div>

                {/* CTA */}
                <div className='flex items-center gap-2 mt-6 text-primary font-medium group-hover:gap-3 transition-all duration-300'>
                  <span>Learn more</span>
                  <ArrowRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Services Overview CTA */}
        <div className='text-center'>
          <LinkButtonWithArrow
            href='/services'
            variant='default'
            size='lg'
            arrowIcon='arrow'
          >
            View All Services
          </LinkButtonWithArrow>
        </div>
      </div>
    </section>
  )
}

export default ServicesPreview
