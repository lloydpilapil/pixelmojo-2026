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
  title: 'Full-Stack AI Implementation',
  description:
    'Beyond code: our framework for high-performance development. Stop duct-taping tools together—we build fast, scalable, and collaborative digital products using a development system that actually works.',
  pricing: 'Embedded teams from $12K/mo',
}

export const metadata: Metadata = {
  title:
    'Full-Stack AI Implementation | Beyond Code: High-Performance Development Framework | Pixelmojo',
  description:
    'Beyond code: our framework for high-performance development. Build fast, scalable, collaborative digital products with a development system that works.',
  openGraph: {
    title:
      'Full-Stack AI Implementation | Beyond Code: High-Performance Development Framework | Pixelmojo',
    description:
      'Beyond code: our framework for high-performance development. Build fast, scalable, collaborative digital products with a development system that works.',
    type: 'website',
  },
}

export default function FullStackAI() {
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
              • Full-Stack AI Implementation
            </p>
            <h1
              className='mb-6 font-heading max-w-7xl mx-auto'
              style={{ color: theme.textColor }}
            >
              Beyond Code: High-Performance Development Framework
            </h1>
            <p
              className='lead max-w-5xl mx-auto mb-8'
              style={{ color: theme.mutedTextColor }}
            >
              {service.description} Our comprehensive development approach
              integrates cutting-edge AI technology with proven engineering
              practices to deliver digital products that scale with your
              business and evolve with your needs.
            </p>
            <div className='max-w-4xl mx-auto mb-8'>
              <div className='grid gap-6 md:grid-cols-2 text-left'>
                <div
                  className='rounded-xl border p-6 space-y-3'
                  style={{
                    backgroundColor: theme.isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                    borderColor: theme.isDark
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)',
                    color: theme.mutedTextColor,
                  }}
                >
                  <h3
                    className='text-sm font-semibold uppercase tracking-wide'
                    style={{ color: theme.textColor }}
                  >
                    If This Sounds Familiar
                  </h3>
                  <p className='text-sm md:text-base leading-relaxed'>
                    Shipping slows down, vendor sprawl explodes, and infra tips
                    over the minute growth hits. We bring a governed, AI-first
                    delivery model so product, data, and platform teams finally
                    row in the same direction.
                  </p>
                </div>
                <div
                  className='rounded-xl border p-6 space-y-3'
                  style={{
                    backgroundColor: theme.isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                    borderColor: theme.isDark
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)',
                    color: theme.mutedTextColor,
                  }}
                >
                  <h3
                    className='text-sm font-semibold uppercase tracking-wide'
                    style={{ color: theme.textColor }}
                  >
                    AI-Native Moves We Deploy
                  </h3>
                  <ul className='list-disc pl-5 space-y-2 text-sm md:text-base'>
                    <li>
                      Bedrock + Vertex pipelines route workloads to the right
                      model based on latency and compliance.
                    </li>
                    <li>
                      GitHub Copilot with Superhuman reviews keeps paired
                      engineers shipping production slices every sprint.
                    </li>
                    <li>
                      Dagster orchestrates LangChain, dbt, and Supabase so data,
                      product, and analytics share one deployment rhythm.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </LenisFadeIn>

        {/* Image Section */}
        <LenisFadeIn delay={200}>
          <div className='mb-16'>
            <OptimizedImage
              src='/pixelmojo-services-full-stack-ai.webp'
              alt='Full-Stack AI Implementation - Beyond code: high-performance development framework'
              aspectRatio='video'
              className='rounded-xl'
              priority
            />
            <p
              className='text-center mt-4 text-sm'
              style={{ color: theme.mutedTextColor }}
            >
              Comprehensive development solutions that integrate cutting-edge AI
              with proven engineering practices
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
                  <li>• Growing companies needing dev capacity</li>
                  <li>• Enterprises modernizing systems</li>
                  <li>• Startups requiring technical expertise</li>
                  <li>• Teams replacing legacy infrastructure</li>
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
                    <strong>30 days:</strong> Team integration & project setup
                  </p>
                  <p>
                    <strong>60 days:</strong> Core systems & AI implementation
                  </p>
                  <p>
                    <strong>90 days:</strong> Production-ready scalable solution
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
                  <li>• Ship products 3x faster</li>
                  <li>• Scale without system failures</li>
                  <li>• Cut development costs in half</li>
                  <li>• Deploy features every 2 weeks</li>
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
              Development System That Actually Works
            </h2>
            <p
              className='max-w-4xl mx-auto text-lg leading-relaxed mb-16'
              style={{ color: theme.mutedTextColor }}
            >
              Stop struggling with fragmented tools and inconsistent processes.
              We provide embedded development teams that integrate seamlessly
              with your organization, delivering enterprise-grade solutions
              using our battle-tested framework for rapid, reliable, and
              scalable product development.
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
              Integrated Development Excellence
            </h2>
            <p style={{ color: theme.mutedTextColor }}>
              Our comprehensive approach delivers complete solutions from
              architecture to deployment and beyond.
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
            <h3 style={{ color: theme.textColor }}>Rapid Development</h3>
            <p style={{ color: theme.mutedTextColor }}>
              AI-powered development tools and proven frameworks that accelerate
              delivery without compromising quality or long-term
              maintainability.
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
            <h3 style={{ color: theme.textColor }}>Scalable Architecture</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Enterprise-grade systems designed for growth, with robust
              infrastructure that handles increasing load and complexity with
              ease.
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
            <h3 style={{ color: theme.textColor }}>Team Integration</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Embedded developers who work as extension of your team, bringing
              expertise while maintaining seamless collaboration and knowledge
              transfer.
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
              Comprehensive Development Framework
            </h2>
            <p
              className='max-w-3xl mx-auto'
              style={{ color: theme.mutedTextColor }}
            >
              Our systematic approach ensures every project delivers exceptional
              results through proven processes and cutting-edge technology.
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
                  Architecture Design
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We design scalable system architecture that supports current
                  needs while providing flexibility for future growth and
                  evolution.
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
                  AI Integration
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We implement AI-powered features and development tools that
                  enhance functionality while accelerating development cycles.
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
                  Agile Development
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We build using proven agile methodologies with continuous
                  integration and deployment for rapid, reliable delivery.
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
                  Quality Assurance
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We implement comprehensive testing and monitoring systems to
                  ensure reliability, security, and optimal performance.
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
                  Continuous Evolution
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We provide ongoing optimization, feature development, and
                  technical support to ensure long-term success and growth.
                </p>
              </div>
            </div>
          </div>
        </LenisStaggered>

        {/* Service Navigation */}
        <ServiceNavigation currentService='full-stack-ai' theme={theme} />
      </div>
    </div>
  )
}
