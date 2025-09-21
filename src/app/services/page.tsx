import type { Metadata } from 'next'
import Image from 'next/image'
import ScrollVideoSection from '@/components/ScrollVideoSection'
import { LinkButtonWithArrow } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'AI Products That Generate ROI From Day One | Pixelmojo',
  description:
    'Complete product ecosystems that profit immediately. We design, develop, and deploy AI-powered solutions that generate measurable revenue from launch.',
  openGraph: {
    title: 'AI Products That Generate ROI From Day One | Pixelmojo',
    description:
      'Complete product ecosystems that profit immediately. We design, develop, and deploy AI-powered solutions that generate measurable revenue from launch.',
    type: 'website',
  },
}

export default function Services() {
  const services = [
    {
      title: 'AI Product Development',
      description:
        'Ship complete AI products in 90 days flat. Production-ready systems that generate revenue at launch, not someday.',
      features: [
        'Full product architecture & AI integration',
        'Revenue-validated user flows',
        'Launch with paying customers',
        'Built-in growth metrics',
      ],
      icon: '/ui_ux_design_solutions_services_thumb.svg',
      href: '/services/ai-product-development',
    },
    {
      title: 'Revenue-First Design Systems',
      description:
        'Design systems built to convert, not just look pretty. Every component optimized for activation, retention, and expansion.',
      features: [
        'Conversion-tested components',
        'AI-enhanced interactions',
        'Direct impact on revenue metrics',
        'Ship-ready from sprint one',
      ],
      icon: '/branding_services_thumb.svg',
      href: '/services/revenue-first-design',
    },
    {
      title: 'AI-Powered Growth Engines',
      description:
        'Automate growth that drives real pipeline. From lead scoring to lifecycle campaigns that convert.',
      features: [
        'Intelligent lead qualification',
        'Self-optimizing campaigns',
        'Revenue attribution built-in',
        'ROI visible in weeks',
      ],
      icon: '/digital_marketing_services_thumb.svg',
      href: '/services/ai-powered-growth',
    },
    {
      title: 'Profit-Optimized Interfaces',
      description:
        'Interfaces that maximize revenue per user. AI-powered experiences that convert, upsell, and retain.',
      features: [
        'Revenue-per-user optimization',
        'Smart upsell timing',
        'Churn prediction & prevention',
        'Measurable ARPU lift',
      ],
      icon: '/web_app_design_services_thumb.svg',
      href: '/services/profit-optimized-interfaces',
    },
    {
      title: 'Conversion Asset Systems',
      description:
        'Visuals that close deals, not win awards. From pitch decks to product experiences that drive expansion.',
      features: [
        'Battle-tested pitch templates',
        'Revenue-focused visual systems',
        'Conversion-validated designs',
        'Trackable impact on close rates',
      ],
      icon: '/graphic_visual_design_services_thumb.svg',
      href: '/services/conversion-assets',
    },
    {
      title: 'Full-Stack AI Implementation',
      description:
        'Production AI that generates ROI in weeks. Complete ecosystems from infrastructure to interface.',
      features: [
        'Ship production features weekly',
        'End-to-end deployment',
        'Revenue-focused roadmaps',
        'Self-funding growth cycles',
      ],
      icon: '/creative_contents_services_thumb.svg',
      href: '/services/full-stack-ai',
    },
  ]

  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='mb-6 font-heading max-w-6xl mx-auto'>
          Complete AI products built to generate revenue, fast.
        </h1>
        <p className='lead max-w-3xl mx-auto mb-8'>
          No fragmented vendors. No endless discovery. We design, develop, and
          deploy complete ecosystems that ship in weeks and scale immediately.
        </p>
      </div>

      {/* Scroll-Animated Video Section */}
      <ScrollVideoSection
        videoId='1098410997'
        coverImage='/our-services-cover.webp'
      />

      {/* Value Proposition Section */}
      <div className='text-center mb-20'>
        <h2 className='mb-6 max-w-5xl mx-auto leading-snug !text-4xl md:!text-5xl lg:!text-6xl'>
          Stop building features nobody wants. Start shipping products people
          pay for.
        </h2>
        <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed'>
          Every service engineered for measurable ROI. From AI development to
          growth automation, we deliver complete solutions that validate with
          real revenue. Built to scale, optimized to profit, designed to
          dominate.
        </p>
      </div>

      {/* Services Grid */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20'>
        {services.map((service, index) => (
          <div key={index} className='group h-full'>
            <div className='card h-full flex flex-col rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-1'>
              {/* Icon */}
              <div className='w-16 h-16 flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110'>
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={64}
                  height={64}
                  className='w-16 h-16'
                />
              </div>

              {/* Content wrapper with flex-1 */}
              <div className='flex-1 flex flex-col'>
                {/* Content */}
                <div className='space-y-4 mb-6'>
                  <h3 className='group-hover:text-primary transition-colors duration-300'>
                    {service.title}
                  </h3>
                  <p className='text-muted leading-relaxed'>
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className='space-y-3 mb-6'>
                  {service.features.map((feature, idx) => (
                    <div key={idx} className='flex items-start gap-3'>
                      <div className='flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5'>
                        <div className='w-2 h-2 rounded-full bg-primary' />
                      </div>
                      <span className='text-sm text-foreground'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA - aligned to bottom and left */}
              <LinkButtonWithArrow
                href={service.href}
                variant='link'
                arrowIcon='arrow'
                className='mt-6 self-start'
                aria-label={`Learn more about ${service.title} services`}
              >
                Learn More
              </LinkButtonWithArrow>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
