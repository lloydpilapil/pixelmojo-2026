import type { Metadata } from 'next'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { LinkButton } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { getServiceTheme } from '@/utils/serviceThemes'
import {
  LenisFadeIn,
  LenisStaggered,
} from '@/components/animations/LenisReveal'
import ServiceNavigation from '@/components/ServiceNavigation'

const service = {
  title: 'Profit-Optimized Interfaces',
  description:
    'Design that delights, technology that delivers. We design and develop websites and mobile apps that balance beautiful design with powerful functionality for experiences users love.',
  pricing: 'Project scopes from $22K',
}

export const metadata: Metadata = {
  title:
    'Profit-Optimized Interfaces | Design That Delights, Technology That Delivers | Pixelmojo',
  description:
    'Design and develop websites and mobile apps that balance beautiful design with powerful functionality. Digital experiences that users love and drive results.',
  openGraph: {
    title:
      'Profit-Optimized Interfaces | Design That Delights, Technology That Delivers | Pixelmojo',
    description:
      'Design and develop websites and mobile apps that balance beautiful design with powerful functionality. Digital experiences that users love and drive results.',
    type: 'website',
  },
}

export default function ProfitOptimizedInterfaces() {
  const theme = getServiceTheme(service.title)

  return (
    <div
      className='min-h-screen'
      style={{
        backgroundColor: theme.bg,
        color: theme.textColor,
      }}
    >
      <div className='container mx-auto px-4 py-16'>
        {/* Hero Section */}
        <LenisFadeIn>
          <div className='text-center mb-12'>
            <p
              className='text-sm font-medium mb-4 uppercase tracking-wider'
              style={{ color: theme.mutedTextColor }}
            >
              • Profit-Optimized Interfaces
            </p>
            <h1
              className='mb-6 font-heading max-w-7xl mx-auto'
              style={{ color: theme.textColor }}
            >
              Design That Delights, Technology That Delivers
            </h1>
            <p
              className='lead max-w-5xl mx-auto mb-8'
              style={{ color: theme.mutedTextColor }}
            >
              {service.description} Our integrated approach combines exceptional
              user experience design with robust technical development to create
              digital solutions that drive engagement, conversions, and business
              growth.
            </p>
          </div>
        </LenisFadeIn>

        {/* Image Section */}
        <LenisFadeIn delay={200}>
          <div className='mb-16'>
            <OptimizedImage
              src='/pixelmojo-services-profit-optimized-interfaces.webp'
              alt='Profit-Optimized Interfaces - Design that delights, technology that delivers'
              aspectRatio='video'
              className='rounded-xl'
              priority
            />
            <p
              className='text-center mt-4 text-sm'
              style={{ color: theme.mutedTextColor }}
            >
              Seamless integration of beautiful design and robust technology for
              interfaces users love
            </p>
          </div>
        </LenisFadeIn>

        {/* Who It's For / Outcomes / KPIs Section */}
        <LenisFadeIn delay={250}>
          <div className='mb-20'>
            <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
              {/* Who It's For */}
              <div
                className='p-6 rounded-xl border'
                style={{
                  backgroundColor: theme.isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                  borderColor: theme.isDark
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3
                  className='font-semibold mb-3'
                  style={{ color: theme.textColor }}
                >
                  Who This Is For
                </h3>
                <ul
                  className='text-sm space-y-2'
                  style={{ color: theme.mutedTextColor }}
                >
                  <li>• E-commerce businesses</li>
                  <li>• SaaS platforms needing redesign</li>
                  <li>• Mobile app development teams</li>
                  <li>• Enterprise software companies</li>
                </ul>
              </div>

              {/* Outcomes Timeline */}
              <div
                className='p-6 rounded-xl border'
                style={{
                  backgroundColor: theme.isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                  borderColor: theme.isDark
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3
                  className='font-semibold mb-3'
                  style={{ color: theme.textColor }}
                >
                  Outcomes You'll See
                </h3>
                <div
                  className='text-sm space-y-2'
                  style={{ color: theme.mutedTextColor }}
                >
                  <p>
                    <strong>30 days:</strong> Design system & development setup
                  </p>
                  <p>
                    <strong>60 days:</strong> MVP interface & core functionality
                  </p>
                  <p>
                    <strong>90 days:</strong> Full launch & performance
                    optimization
                  </p>
                </div>
              </div>

              {/* Sample KPIs */}
              <div
                className='p-6 rounded-xl border'
                style={{
                  backgroundColor: theme.isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                  borderColor: theme.isDark
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3
                  className='font-semibold mb-3'
                  style={{ color: theme.textColor }}
                >
                  What You'll Achieve
                </h3>
                <ul
                  className='text-sm space-y-2'
                  style={{ color: theme.mutedTextColor }}
                >
                  <li>• 2x higher conversion rates</li>
                  <li>• 50%+ increase in user retention</li>
                  <li>• 35%+ boost in mobile revenue</li>
                  <li>• Reduced support tickets by 40%</li>
                </ul>
              </div>
            </div>
          </div>
        </LenisFadeIn>

        {/* Value Proposition Section */}
        <LenisFadeIn delay={300}>
          <div className='text-center mb-20'>
            <h2
              className='mb-6 max-w-5xl mx-auto leading-snug !text-4xl md:!text-5xl lg:!text-6xl'
              style={{ color: theme.textColor }}
            >
              Where Beautiful Meets Functional
            </h2>
            <p
              className='max-w-4xl mx-auto text-lg leading-relaxed mb-16'
              style={{ color: theme.mutedTextColor }}
            >
              We believe great digital experiences shouldn't require compromise
              between design and functionality. Our full-stack approach delivers
              interfaces that captivate users while supporting your business
              objectives with scalable, performant technology that grows with
              your needs.
            </p>

            {/* Pricing Section */}
            <p
              className='text-lg font-bold mb-8'
              style={{ color: theme.textColor }}
            >
              {service.pricing}
            </p>

            <LinkButton
              href='/contact-us'
              size='lg'
              className='group'
              style={{
                backgroundColor: theme.isDark
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
                color: theme.textColor,
                border: `2px solid ${theme.textColor}`,
              }}
            >
              Start Your Project
              <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </LinkButton>
          </div>
        </LenisFadeIn>

        {/* Core Benefits Section */}
        <LenisFadeIn delay={400}>
          <div className='text-center mb-20'>
            <h2 style={{ color: theme.textColor }}>
              Integrated Design & Development Excellence
            </h2>
            <p style={{ color: theme.mutedTextColor }}>
              Our seamless approach eliminates the gaps between design vision
              and technical execution.
            </p>
          </div>
        </LenisFadeIn>

        {/* 3 Benefits Cards */}
        <LenisStaggered
          delay={500}
          staggerDelay={150}
          className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20'
        >
          <div
            className='p-6 text-center border rounded-lg'
            style={{
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              borderColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ color: theme.textColor }}>User-Centric Design</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Intuitive interfaces designed through user research and testing,
              ensuring every interaction feels natural and drives users toward
              your business goals.
            </p>
          </div>
          <div
            className='p-6 text-center border rounded-lg'
            style={{
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              borderColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ color: theme.textColor }}>Robust Development</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Modern, scalable technology stack that delivers exceptional
              performance, security, and reliability while supporting future
              growth and feature expansion.
            </p>
          </div>
          <div
            className='p-6 text-center border rounded-lg'
            style={{
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              borderColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ color: theme.textColor }}>Performance Optimization</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Lightning-fast interfaces optimized for all devices and platforms,
              ensuring superior user experience that reduces bounce rates and
              increases conversions.
            </p>
          </div>
        </LenisStaggered>

        {/* Process Section Header */}
        <LenisFadeIn delay={600}>
          <div className='text-center mb-20'>
            <h2
              className='max-w-4xl mx-auto'
              style={{ color: theme.textColor }}
            >
              Integrated Development Process
            </h2>
            <p
              className='max-w-3xl mx-auto'
              style={{ color: theme.mutedTextColor }}
            >
              Our streamlined approach ensures design vision and technical
              execution work seamlessly together.
            </p>
          </div>
        </LenisFadeIn>

        {/* 5-Step Process */}
        <LenisStaggered
          delay={700}
          staggerDelay={150}
          className='w-full px-4 mb-20'
        >
          <div className='relative'>
            {/* Horizontal line - hidden on mobile */}
            <div
              className='absolute top-6 left-0 right-0 h-0.5 hidden md:block'
              style={{
                backgroundColor: theme.isDark
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'rgba(0, 0, 0, 0.3)',
              }}
            ></div>

            {/* Steps */}
            <div className='grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative'>
              {/* Step 1 */}
              <div className='text-center'>
                <div
                  className='w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 relative z-10'
                  style={{
                    backgroundColor: theme.isDark ? '#FFFFFF' : '#000000',
                    color: theme.isDark ? '#000000' : '#FFFFFF',
                  }}
                >
                  1
                </div>
                <h3 className='mb-2' style={{ color: theme.textColor }}>
                  Discovery & Planning
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We understand your users, business goals, and technical
                  requirements to create a comprehensive project roadmap and
                  technical architecture.
                </p>
              </div>

              {/* Step 2 */}
              <div className='text-center'>
                <div
                  className='w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 relative z-10'
                  style={{
                    backgroundColor: theme.isDark ? '#FFFFFF' : '#000000',
                    color: theme.isDark ? '#000000' : '#FFFFFF',
                  }}
                >
                  2
                </div>
                <h3 className='mb-2' style={{ color: theme.textColor }}>
                  Design & Prototype
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We create user-centered designs and interactive prototypes,
                  validating concepts before development to ensure optimal user
                  experience.
                </p>
              </div>

              {/* Step 3 */}
              <div className='text-center'>
                <div
                  className='w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 relative z-10'
                  style={{
                    backgroundColor: theme.isDark ? '#FFFFFF' : '#000000',
                    color: theme.isDark ? '#000000' : '#FFFFFF',
                  }}
                >
                  3
                </div>
                <h3 className='mb-2' style={{ color: theme.textColor }}>
                  Development & Build
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We build robust, scalable interfaces using modern
                  technologies, ensuring exceptional performance across all
                  devices and platforms.
                </p>
              </div>

              {/* Step 4 */}
              <div className='text-center'>
                <div
                  className='w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 relative z-10'
                  style={{
                    backgroundColor: theme.isDark ? '#FFFFFF' : '#000000',
                    color: theme.isDark ? '#000000' : '#FFFFFF',
                  }}
                >
                  4
                </div>
                <h3 className='mb-2' style={{ color: theme.textColor }}>
                  Testing & Optimization
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We rigorously test functionality, performance, and user
                  experience, optimizing every detail for maximum impact and
                  reliability.
                </p>
              </div>

              {/* Step 5 */}
              <div className='text-center'>
                <div
                  className='w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 relative z-10'
                  style={{
                    backgroundColor: theme.isDark ? '#FFFFFF' : '#000000',
                    color: theme.isDark ? '#000000' : '#FFFFFF',
                  }}
                >
                  5
                </div>
                <h3 className='mb-2' style={{ color: theme.textColor }}>
                  Launch & Support
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We deploy your interface with comprehensive monitoring and
                  provide ongoing support to ensure continued performance and
                  growth.
                </p>
              </div>
            </div>
          </div>
        </LenisStaggered>

        {/* Service Navigation */}
        <ServiceNavigation
          currentService='profit-optimized-interfaces'
          theme={theme}
        />
      </div>
    </div>
  )
}
