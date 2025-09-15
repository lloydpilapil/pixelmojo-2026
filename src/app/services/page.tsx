import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ScrollVideoSection from '@/components/ScrollVideoSection'

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
      title: 'UI/UX Design Solutions',
      description:
        'User-centered design that drives engagement and conversions through intuitive interfaces and seamless experiences.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Interaction Design',
        'Usability Testing',
      ],
      icon: '/ui_ux_design_solutions_services_thumb.svg',
      href: '/services/ui-ux-design-solutions',
    },
    {
      title: 'Brand Identity',
      description:
        'Comprehensive brand design that tells your story and creates lasting connections with your audience.',
      features: [
        'Logo Design & Guidelines',
        'Brand Strategy & Positioning',
        'Visual Identity Systems',
        'Brand Voice & Messaging',
      ],
      icon: '/branding_services_thumb.svg',
      href: '/services/brand-identity',
    },
    {
      title: 'Brand Activation & Growth',
      description:
        'Strategic campaigns that amplify your brand presence and drive growth across all touchpoints.',
      features: [
        'Marketing Campaign Design',
        'Social Media Strategy',
        'Content Creation & Planning',
        'Growth Marketing Tactics',
      ],
      icon: '/digital_marketing_services_thumb.svg',
      href: '/services/brand-activation-growth',
    },
    {
      title: 'Web & App Design',
      description:
        'Digital experiences that perform beautifully and delight users on every device and platform.',
      features: [
        'Responsive Web Design',
        'Mobile App Interfaces',
        'Progressive Web Apps',
        'E-commerce Solutions',
      ],
      icon: '/web_app_design_services_thumb.svg',
      href: '/services/web-app-design',
    },
    {
      title: 'Graphic & Visuals',
      description:
        'Visual assets that communicate your message clearly and captivate your target audience.',
      features: [
        'Print & Digital Graphics',
        'Illustration & Iconography',
        'Marketing Collateral',
        'Presentation Design',
      ],
      icon: '/graphic_visual_design_services_thumb.svg',
      href: '/services/graphic-visuals',
    },
    {
      title: 'Development Solutions',
      description:
        'Robust technical implementation that scales with your business and delivers exceptional performance.',
      features: [
        'Frontend Development',
        'Backend Architecture',
        'CMS Integration',
        'Performance Optimization',
      ],
      icon: '/creative_contents_services_thumb.svg',
      href: '/services/development-solutions',
    },
  ]

  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='mb-6 font-heading'>Our Services</h1>
        <p className='lead max-w-3xl mx-auto mb-8'>
          From concept to deployment, we offer comprehensive web development
          services tailored to your unique needs. Let's build something amazing
          together.
        </p>
      </div>

      {/* Scroll-Animated Video Section */}
      <ScrollVideoSection
        videoId='1098410997'
        coverImage='/our-services-cover.webp'
      />

      {/* Value Proposition Section */}
      <div className='text-center mb-20'>
        <h2 className='mb-6 !text-4xl md:!text-5xl lg:!text-6xl'>
          End the Digital Chaos, Start Growing
        </h2>
        <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed'>
          Tired of disconnected teams creating beautiful but ineffective digital
          assets? We integrate all your digital services—branding, design,
          development, and marketing—into one cohesive growth engine. The
          result? No more miscommunication, faster timelines, and most
          importantly, measurable ROI from every project.
        </p>
      </div>

      {/* Services Grid */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20'>
        {services.map((service, index) => (
          <Link key={index} href={service.href} className='group block h-full'>
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

              {/* CTA */}
              <div className='flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300'>
                <span>Learn more</span>
                <ArrowRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
