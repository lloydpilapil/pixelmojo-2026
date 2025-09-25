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
  title: 'AI-Powered Growth Engines',
  description:
    'Go beyond design. Activate your brand for real growth. Turn your investment into your most powerful engine for leads, sales, and lasting market presence through strategic, data-driven activation.',
  pricing: 'Retainers from $6K/mo',
}

export const metadata: Metadata = {
  title:
    'AI-Powered Growth Engines | Activate Your Brand for Real Growth | Pixelmojo',
  description:
    'Go beyond design. Activate your brand for real growth through strategic content, multi-channel engagement, and data-driven performance optimization.',
  openGraph: {
    title:
      'AI-Powered Growth Engines | Activate Your Brand for Real Growth | Pixelmojo',
    description:
      'Go beyond design. Activate your brand for real growth through strategic content, multi-channel engagement, and data-driven performance optimization.',
    type: 'website',
  },
}

export default function AIPoweredGrowth() {
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
              • AI-Powered Growth Engines
            </p>
            <h1
              className='mb-6 font-heading max-w-7xl mx-auto'
              style={{ color: theme.textColor }}
            >
              Activate Your Brand for Real Growth
            </h1>
            <p
              className='lead max-w-5xl mx-auto mb-8'
              style={{ color: theme.mutedTextColor }}
            >
              {service.description} Our comprehensive growth strategy combines
              content creation, performance optimization, and strategic
              activation to transform your brand investment into measurable
              business results.
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
                    Paid campaigns burn budget, content sits unread, and sales
                    is still asking where the pipeline went. We align brand,
                    demand, and RevOps so every touchpoint compounds instead of
                    cannibalizes.
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
                      GPT-4o + Claude 3 orchestrate omni-channel messaging so
                      tone and timing stay consistent from ads to nurture flows.
                    </li>
                    <li>
                      HubSpot lead scoring blends Pipedrive deal data with
                      Pinecone intent signals for real-time prioritization.
                    </li>
                    <li>
                      Make + Mutiny automations run continuous experiments on
                      every micro-conversion.
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
              src='/pixelmojo-services-ai-powered-growth.webp'
              alt='AI-Powered Growth Engines - Activate your brand for real growth'
              aspectRatio='video'
              className='rounded-xl'
              priority
            />
            <p
              className='text-center mt-4 text-sm'
              style={{ color: theme.mutedTextColor }}
            >
              Data-driven growth strategies that transform brand investments
              into measurable revenue generation
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
                  <li>• Agencies scaling client growth</li>
                  <li>• SaaS companies post-launch</li>
                  <li>• B2B brands needing activation</li>
                  <li>• Companies with stagnant growth</li>
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
                    <strong>30 days:</strong> Content strategy & campaign launch
                  </p>
                  <p>
                    <strong>60 days:</strong> Lead flow & engagement systems
                  </p>
                  <p>
                    <strong>90 days:</strong> Scalable growth infrastructure
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
                  <li>• Build a predictable lead pipeline</li>
                  <li>• Close deals 30%+ faster</li>
                  <li>• Establish thought leadership</li>
                  <li>• Scale revenue 3x year-over-year</li>
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
              Turn Investment Into Growth Engine
            </h2>
            <p
              className='max-w-4xl mx-auto text-lg leading-relaxed mb-16'
              style={{ color: theme.mutedTextColor }}
            >
              Great brands need strategic activation to drive results. We don't
              just launch your brand— we build comprehensive growth systems that
              generate leads, increase sales, and establish lasting market
              presence through data-driven optimization and multi-channel
              engagement.
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
              Strategic Growth Framework
            </h2>
            <p style={{ color: theme.mutedTextColor }}>
              Our proven approach transforms brand investment into measurable
              business growth across all channels.
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
            <h3 style={{ color: theme.textColor }}>Lead Generation Engine</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Strategic content and campaigns that consistently attract
              qualified prospects, turning your brand into a powerful lead
              generation machine that drives revenue growth.
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
            <h3 style={{ color: theme.textColor }}>Sales Acceleration</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Comprehensive sales enablement and conversion optimization that
              shortens sales cycles, increases close rates, and maximizes
              revenue from every opportunity.
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
            <h3 style={{ color: theme.textColor }}>Market Leadership</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Establish lasting market presence through thought leadership,
              strategic positioning, and consistent brand activation that builds
              authority and drives long-term growth.
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
              Comprehensive Growth Activation Process
            </h2>
            <p
              className='max-w-3xl mx-auto'
              style={{ color: theme.mutedTextColor }}
            >
              Our systematic approach transforms your brand into a growth engine
              through strategic activation and optimization.
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
                  Growth Strategy
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We analyze your market, audience, and goals to develop a
                  comprehensive growth strategy aligned with business
                  objectives.
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
                  Content Systems
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We create strategic content frameworks that position your
                  brand as the authority while driving consistent engagement and
                  leads.
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
                  Channel Activation
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We execute multi-channel campaigns across digital touchpoints,
                  ensuring consistent brand presence and maximum market reach.
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
                  Performance Optimization
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We continuously monitor, analyze, and optimize campaigns using
                  data-driven insights to maximize ROI and growth impact.
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
                  Scale & Expand
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We scale successful strategies across new channels and
                  markets, building sustainable growth systems for long-term
                  success.
                </p>
              </div>
            </div>
          </div>
        </LenisStaggered>

        {/* Service Navigation */}
        <ServiceNavigation currentService='ai-powered-growth' theme={theme} />
      </div>
    </div>
  )
}
