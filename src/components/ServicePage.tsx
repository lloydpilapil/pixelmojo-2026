import type { Metadata } from 'next'
import ScrollVideoSection from './ScrollVideoSection'
import { LinkButton } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { getServiceTheme } from '@/utils/serviceThemes'

export interface ServiceData {
  title: string
  description: string
  pricing: string
  metadata: {
    title: string
    description: string
  }
}

interface ServicePageProps {
  service: ServiceData
}

export function generateServiceMetadata(service: ServiceData): Metadata {
  return {
    title: service.metadata.title,
    description: service.metadata.description,
    openGraph: {
      title: service.metadata.title,
      description: service.metadata.description,
      type: 'website',
    },
  }
}

export default function ServicePage({ service }: ServicePageProps) {
  const theme = getServiceTheme(service.title)

  return (
    <div
      className='min-h-screen'
      style={{
        backgroundColor: theme.bg,
        color: theme.textColor,
      }}
    >
      <div className='container mx-auto px-4 py-16 animate-fade-in'>
        <div className='text-center mb-12'>
          <h1
            className='mb-6 font-heading max-w-6xl mx-auto'
            style={{ color: theme.textColor }}
          >
            {service.title}
          </h1>
          <p
            className='lead max-w-3xl mx-auto mb-8'
            style={{ color: theme.mutedTextColor }}
          >
            {service.description}
          </p>
        </div>

        {/* Video Section */}
        <ScrollVideoSection
          videoId='1098410997'
          coverImage='/our-services-cover.webp'
          className='mb-16'
        />

        {/* Value Proposition Section */}
        <div className='text-center mb-20'>
          <h2
            className='mb-6 max-w-5xl mx-auto leading-snug !text-4xl md:!text-5xl lg:!text-6xl'
            style={{ color: theme.textColor }}
          >
            Stop burning cash on concepts. Start shipping products that pay.
          </h2>
          <p
            className='max-w-4xl mx-auto text-lg leading-relaxed mb-16'
            style={{ color: theme.mutedTextColor }}
          >
            Every solution is engineered for immediate returns. From development
            to deployment, we deliver complete systems that generate measurable
            revenue from launch. Built to scale, optimized to profit, designed
            to dominate.
          </p>

          {/* Rates Section */}
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

        {/* Additional Section */}
        <div className='text-center mb-20'>
          <h2 style={{ color: theme.textColor }}>Your heading text here</h2>
          <p style={{ color: theme.mutedTextColor }}>
            Your paragraph text here
          </p>
        </div>

        {/* 3 Cards Section */}
        <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20'>
          <div
            className='p-6 text-center border'
            style={{
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              borderColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ color: theme.textColor }}>Card Title 1</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Card description text here
            </p>
          </div>
          <div
            className='p-6 text-center border'
            style={{
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              borderColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ color: theme.textColor }}>Card Title 2</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Card description text here
            </p>
          </div>
          <div
            className='p-6 text-center border'
            style={{
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              borderColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ color: theme.textColor }}>Card Title 3</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Card description text here
            </p>
          </div>
        </div>

        {/* Repeated Section */}
        <div className='text-center mb-20'>
          <h2 style={{ color: theme.textColor }}>Your heading text here</h2>
          <p style={{ color: theme.mutedTextColor }}>
            Your paragraph text here
          </p>
        </div>

        {/* Repeated 3 Cards Section */}
        <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20'>
          <div
            className='p-6 text-center border'
            style={{
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              borderColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ color: theme.textColor }}>Card Title 1</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Card description text here
            </p>
          </div>
          <div
            className='p-6 text-center border'
            style={{
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              borderColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ color: theme.textColor }}>Card Title 2</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Card description text here
            </p>
          </div>
          <div
            className='p-6 text-center border'
            style={{
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              borderColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ color: theme.textColor }}>Card Title 3</h3>
            <p style={{ color: theme.mutedTextColor }}>
              Card description text here
            </p>
          </div>
        </div>

        {/* Another H2 and P Section */}
        <div className='text-center mb-20'>
          <h2 style={{ color: theme.textColor }}>Your heading text here</h2>
          <p style={{ color: theme.mutedTextColor }}>
            Your paragraph text here
          </p>
        </div>

        {/* Horizontal Step Process */}
        <div className='max-w-6xl mx-auto mb-20'>
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
                  Step 1 Title
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  Step 1 description text here
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
                  Step 2 Title
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  Step 2 description text here
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
                  Step 3 Title
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  Step 3 description text here
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
                  Step 4 Title
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  Step 4 description text here
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
                  Step 5 Title
                </h3>
                <p className='text-sm' style={{ color: theme.mutedTextColor }}>
                  Step 5 description text here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
