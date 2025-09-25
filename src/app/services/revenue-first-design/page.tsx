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
  title: 'Revenue-First Design Systems',
  description:
    'Build a brand that commands attention. We forge visual strategies for tech startups and SaaS businesses that capture attention, build trust, and drive growth through powerful brand identity.',
  pricing: 'Starts at $9K',
}

export const metadata: Metadata = {
  title:
    'Revenue-First Design Systems | Build Brands That Command Attention | Pixelmojo',
  description:
    'Build a brand that commands attention. Visual strategies that capture attention, build trust, and drive growth through powerful brand identity.',
  openGraph: {
    title:
      'Revenue-First Design Systems | Build Brands That Command Attention | Pixelmojo',
    description:
      'Build a brand that commands attention. Visual strategies that capture attention, build trust, and drive growth through powerful brand identity.',
    type: 'website',
  },
}

export default function RevenueFirstDesign() {
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
              • Revenue-First Design Systems
            </p>
            <h1
              className='mb-6 font-heading max-w-7xl mx-auto'
              style={{ color: theme.textColor }}
            >
              Build a Brand That Commands Attention
            </h1>
            <p
              className='lead max-w-5xl mx-auto mb-8'
              style={{ color: theme.mutedTextColor }}
            >
              {service.description} Our strategic approach transforms your
              visual identity into a competitive advantage that resonates with
              your target audience and accelerates business growth.
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
                    Assets feel disconnected, messaging shifts from channel to
                    channel, and execs keep asking how brand spend maps to ARR.
                    We align identity, demand, and enablement so buyers hear the
                    same promise from deck to demo.
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
                      Figma Tokens + Style Dictionary agents publish multi-brand
                      rules into production every night.
                    </li>
                    <li>
                      Midjourney + Runway prompt libraries spin on-brand visuals
                      with automatic compliance checks.
                    </li>
                    <li>
                      Notion AI roll-ups push positioning updates into Webflow,
                      pitch decks, and lifecycle copy with zero manual sync.
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
              src='/pixelmojo-services-revenue-first-design.webp'
              alt='Revenue-First Design Systems - Build brands that command attention'
              aspectRatio='video'
              className='rounded-xl'
              priority
            />
            <p
              className='text-center mt-4 text-sm'
              style={{ color: theme.mutedTextColor }}
            >
              Visual brand systems engineered to capture attention and drive
              sustainable business growth
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
                  <li>• B2B companies needing brand refresh</li>
                  <li>• Startups launching to market</li>
                  <li>• Scale-ups rebranding for growth</li>
                  <li>• Companies with low brand recognition</li>
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
                    <strong>30 days:</strong> Complete brand strategy & visual
                    identity
                  </p>
                  <p>
                    <strong>60 days:</strong> Full brand system & asset library
                  </p>
                  <p>
                    <strong>90 days:</strong> Measurable brand awareness
                    increase
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
                  <li>• Command premium pricing</li>
                  <li>• Convert 15%+ more visitors</li>
                  <li>• Build engaged community</li>
                  <li>• Attract higher-quality leads</li>
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
              Your Brand is Your Greatest Asset
            </h2>
            <p
              className='max-w-4xl mx-auto text-lg leading-relaxed mb-16'
              style={{ color: theme.mutedTextColor }}
            >
              We don't just create pretty designs—we build strategic visual
              systems that drive revenue. Every element is crafted to position
              your brand as the obvious choice in your market, from first
              impression to final conversion.
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
              Strategic Brand Foundation
            </h2>
            <p style={{ color: theme.mutedTextColor }}>
              Every visual decision is backed by strategy and optimized for
              business impact.
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
            <h3 style={{ color: theme.textColor }}>Market Differentiation</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Stand out in crowded markets with a distinctive visual identity
              that clearly communicates your unique value proposition and builds
              instant recognition.
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
            <h3 style={{ color: theme.textColor }}>Trust & Credibility</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Professional design systems that build immediate trust with
              prospects and customers, reducing sales cycles and increasing
              conversion rates across all touchpoints.
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
            <h3 style={{ color: theme.textColor }}>Scalable Growth</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Comprehensive design systems that grow with your business,
              maintaining consistency across all channels while supporting rapid
              expansion and evolution.
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
              Strategic Brand Development Process
            </h2>
            <p
              className='max-w-3xl mx-auto'
              style={{ color: theme.mutedTextColor }}
            >
              Our proven methodology transforms your vision into a powerful
              brand system that drives business results.
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
                  Brand Discovery
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We uncover your brand's essence, competitive landscape, and
                  strategic positioning to create a foundation for growth.
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
                  Visual Strategy
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We develop a comprehensive visual strategy that aligns with
                  your business goals and resonates with your target audience.
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
                  Identity Creation
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We craft distinctive visual elements including logos,
                  typography, color systems, and imagery that command attention.
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
                  System Design
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We create comprehensive design systems with guidelines,
                  templates, and assets for consistent brand application.
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
                  Implementation
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We support the rollout across all touchpoints, ensuring
                  consistent brand experience that drives business growth.
                </p>
              </div>
            </div>
          </div>
        </LenisStaggered>

        {/* Service Navigation */}
        <ServiceNavigation
          currentService='revenue-first-design'
          theme={theme}
        />
      </div>
    </div>
  )
}
