import type { Metadata } from 'next'
import Image from 'next/image'
import ScrollVideoSection from '@/components/ScrollVideoSection'
import { LinkButtonWithArrow } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'UI/UX, Product Design & Growth Services | Pixelmojo',
  description:
    'Scalable UI/UX, product design, development, and growth strategy—integrated into one cohesive system to launch faster, convert better, and scale smarter.',
  openGraph: {
    title: 'UI/UX, Product Design & Growth Services | Pixelmojo',
    description:
      'Scalable UI/UX, product design, development, and growth strategy—integrated into one cohesive system to launch faster, convert better, and scale smarter.',
    type: 'website',
  },
}

export default function Services() {
  const services = [
    {
      title: 'Growth-Focused Product Sprint',
      description:
        'Align product, design, and AI leads around your north-star journey; prototype flows that unblock adoption faster.',
      features: [
        'North-star journey & opportunity mapping',
        'Prototype and experiment sprints',
        'Analytics & dashboard setup',
        'Activation playbooks and handoff',
      ],
      icon: '/ui_ux_design_solutions_services_thumb.svg',
      href: '/services/ui-ux-design-solutions',
    },
    {
      title: 'Brand Identity',
      description:
        'Translate positioning into design systems teams can ship—voice, visuals, governance rooted in customer truth.',
      features: [
        'Brand research & positioning',
        'Visual language & asset systems',
        'Messaging & narrative frameworks',
        'Governance and rollout playbooks',
      ],
      icon: '/branding_services_thumb.svg',
      href: '/services/brand-identity',
    },
    {
      title: 'Brand Activation & Growth',
      description:
        'Pair narrative, AI-assisted nurture, and revenue analytics so every campaign ladders back to roadmap.',
      features: [
        'Lifecycle & nurture strategy',
        'Campaign activation kits',
        'Automation & tooling setup',
        'Pipeline analytics & reporting',
      ],
      icon: '/digital_marketing_services_thumb.svg',
      href: '/services/brand-activation-growth',
    },
    {
      title: 'Web & App Design',
      description:
        'Build product surfaces tied to journeys, with AI cues, accessibility, and performance tuned before launch.',
      features: [
        'Experience audit & journey mapping',
        'High-fidelity UI & motion specs',
        'AI-assisted workflow design',
        'Accessibility & performance QA',
      ],
      icon: '/web_app_design_services_thumb.svg',
      href: '/services/web-app-design',
    },
    {
      title: 'Graphic & Visuals',
      description:
        'Deliver on-demand storytelling assets for experiments—from investor decks to nudges.',
      features: [
        'Campaign & launch asset sprints',
        'Sales, board & investor decks',
        'Illustration & iconography systems',
        'Reusable template libraries',
      ],
      icon: '/graphic_visual_design_services_thumb.svg',
      href: '/services/graphic-visuals',
    },
    {
      title: 'Development Solutions',
      description:
        'Embed full-stack squads who code against the design system, automate QA, and surface actionable evidence every sprint.',
      features: [
        'Embedded product & web squads',
        'Design system implementation',
        'Automated QA & analytics setup',
        'DevOps & release optimization',
      ],
      icon: '/creative_contents_services_thumb.svg',
      href: '/services/development-solutions',
    },
  ]

  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='mb-6 font-heading max-w-6xl mx-auto'>
          Choose the partnership that keeps your roadmap moving.
        </h1>
        <p className='lead max-w-3xl mx-auto mb-8'>
          We embed with your squads to deliver evidence-led UX, AI-enabled
          product design, and engineering rituals that leadership can defend.
        </p>
      </div>

      {/* Scroll-Animated Video Section */}
      <ScrollVideoSection
        videoId='1098410997'
        coverImage='/our-services-cover.webp'
      />

      {/* Value Proposition Section */}
      <div className='text-center mb-20'>
        <h2 className='mb-6 max-w-5xl mx-auto !text-4xl md:!text-5xl lg:!text-6xl'>
          Turn AI ambition into launch-ready experiences
        </h2>
        <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed'>
          Disconnected vendors create pretty assets; we design systems that
          ship. Pixelmojo aligns product, design, content, and engineering
          around experiment-ready journeys, reusable components, and analytics
          that prove what works. Every engagement is built to give leadership
          confidence and teams momentum.
        </p>
      </div>

      {/* Services Grid */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20'>
        {services.map((service, index) => (
          <div key={index} className='group h-full'>
            <div className='h-full flex flex-col bg-card rounded-2xl border border-border p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-1'>
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
              >
                Learn more
              </LinkButtonWithArrow>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
