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
  title: 'Conversion Asset Systems',
  description:
    'Visuals that speak volumes, designs that drive action. We create high-quality visuals that balance creativity with strategy to elevate your brand and share your message effectively.',
  pricing: 'Bundles from $4K',
}

export const metadata: Metadata = {
  title:
    'Conversion Asset Systems | Visuals That Speak Volumes, Designs That Drive Action | Pixelmojo',
  description:
    'Create high-quality visuals that balance creativity with strategy. From engaging infographics to polished pitch decks that drive action.',
  openGraph: {
    title:
      'Conversion Asset Systems | Visuals That Speak Volumes, Designs That Drive Action | Pixelmojo',
    description:
      'Create high-quality visuals that balance creativity with strategy. From engaging infographics to polished pitch decks that drive action.',
    type: 'website',
  },
}

export default function ConversionAssets() {
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
              • Conversion Asset Systems
            </p>
            <h1
              className='mb-6 font-heading max-w-7xl mx-auto'
              style={{ color: theme.textColor }}
            >
              Visuals That Speak Volumes, Designs That Drive Action
            </h1>
            <p
              className='lead max-w-5xl mx-auto mb-8'
              style={{ color: theme.mutedTextColor }}
            >
              {service.description} Our strategic design approach transforms
              complex information into compelling visual narratives that capture
              attention, communicate value, and inspire your audience to take
              action.
            </p>
          </div>
        </LenisFadeIn>

        {/* Image Section */}
        <LenisFadeIn delay={200}>
          <div className='mb-16'>
            <OptimizedImage
              src='/pixelmojo-services-conversion-assets.webp'
              alt='Conversion Asset Systems - Visuals that speak volumes, designs that drive action'
              aspectRatio='video'
              className='rounded-xl'
              priority
            />
            <p
              className='text-center mt-4 text-sm'
              style={{ color: theme.mutedTextColor }}
            >
              Strategic visual assets that transform complex ideas into
              compelling narratives that inspire action
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
                  <li>• Startups pitching to investors</li>
                  <li>• Marketing teams needing assets</li>
                  <li>• Sales teams requiring materials</li>
                  <li>• Educators creating content</li>
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
                    <strong>7 days:</strong> Asset strategy & concept approval
                  </p>
                  <p>
                    <strong>14 days:</strong> First draft designs & feedback
                  </p>
                  <p>
                    <strong>21 days:</strong> Final polished assets delivered
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
                  <li>• Close deals 2x faster</li>
                  <li>• Get 60%+ more meeting requests</li>
                  <li>• Win 45%+ more pitch competitions</li>
                  <li>• Generate 3x qualified leads</li>
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
              Transform Ideas Into Impact
            </h2>
            <p
              className='max-w-4xl mx-auto text-lg leading-relaxed mb-16'
              style={{ color: theme.mutedTextColor }}
            >
              Great ideas deserve great presentation. We create
              conversion-focused visual assets that cut through the noise and
              connect with your audience on an emotional level. From pitch decks
              that secure funding to infographics that simplify complex
              concepts, every asset drives action.
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
              Strategic Visual Communication
            </h2>
            <p style={{ color: theme.mutedTextColor }}>
              Every visual asset is designed to achieve specific business
              objectives and drive meaningful engagement.
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
            <h3 style={{ color: theme.textColor }}>Message Clarity</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Transform complex information into clear, compelling visual
              narratives that your audience understands instantly and remembers
              long-term.
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
            <h3 style={{ color: theme.textColor }}>Audience Engagement</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Strategic design that captures attention and creates emotional
              connection, turning passive viewers into active participants and
              advocates.
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
            <h3 style={{ color: theme.textColor }}>Conversion Focus</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Every asset is optimized for specific outcomes—whether closing
              deals, generating leads, or building brand authority that drives
              business growth.
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
              Strategic Asset Creation Process
            </h2>
            <p
              className='max-w-3xl mx-auto'
              style={{ color: theme.mutedTextColor }}
            >
              Our systematic approach ensures every visual asset serves your
              business objectives and drives results.
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
                  Content Strategy
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We analyze your message, audience, and objectives to develop a
                  strategic framework for maximum visual impact and engagement.
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
                  Visual Concept
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We develop creative concepts that align with your brand while
                  effectively communicating complex information in digestible
                  formats.
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
                  Design Execution
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We create polished, professional assets with attention to
                  every detail, ensuring consistency with your brand and message
                  clarity.
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
                  Optimization & Testing
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We refine and optimize assets based on feedback and
                  performance data to ensure maximum impact and conversion
                  potential.
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
                  Delivery & Support
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  We deliver final assets in all required formats with ongoing
                  support to ensure optimal use across all channels and
                  platforms.
                </p>
              </div>
            </div>
          </div>
        </LenisStaggered>

        {/* Service Navigation */}
        <ServiceNavigation currentService='conversion-assets' theme={theme} />
      </div>
    </div>
  )
}
