import type { Metadata } from 'next'
import ScrollVideoSection from './ScrollVideoSection'
import { LinkButton } from './ui/button'
import { ArrowRight } from 'lucide-react'

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
  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      <div className='text-center mb-12'>
        <h1 className='mb-6 font-heading max-w-6xl mx-auto'>{service.title}</h1>
        <p className='lead max-w-3xl mx-auto mb-8'>{service.description}</p>
      </div>

      {/* Video Section */}
      <ScrollVideoSection
        videoId='1098410997'
        coverImage='/our-services-cover.webp'
        className='mb-16'
      />

      {/* Value Proposition Section */}
      <div className='text-center mb-20'>
        <h2 className='mb-6 max-w-5xl mx-auto leading-snug !text-4xl md:!text-5xl lg:!text-6xl'>
          Stop burning cash on concepts. Start shipping products that pay.
        </h2>
        <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed mb-16'>
          Every solution is engineered for immediate returns. From development
          to deployment, we deliver complete systems that generate measurable
          revenue from launch. Built to scale, optimized to profit, designed to
          dominate.
        </p>

        {/* Rates Section */}
        <p className='text-lg font-bold mb-8' style={{ color: '#3CC29E' }}>
          {service.pricing}
        </p>

        <LinkButton href='/contact-us' size='lg' className='group'>
          Start Your Project
          <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
        </LinkButton>
      </div>

      {/* Additional Section */}
      <div className='text-center mb-20'>
        <h2>Your heading text here</h2>
        <p>Your paragraph text here</p>
      </div>

      {/* 3 Cards Section */}
      <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20'>
        <div className='card p-6 text-center'>
          <h3>Card Title 1</h3>
          <p>Card description text here</p>
        </div>
        <div className='card p-6 text-center'>
          <h3>Card Title 2</h3>
          <p>Card description text here</p>
        </div>
        <div className='card p-6 text-center'>
          <h3>Card Title 3</h3>
          <p>Card description text here</p>
        </div>
      </div>

      {/* Repeated Section */}
      <div className='text-center mb-20'>
        <h2>Your heading text here</h2>
        <p>Your paragraph text here</p>
      </div>

      {/* Repeated 3 Cards Section */}
      <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20'>
        <div className='card p-6 text-center'>
          <h3>Card Title 1</h3>
          <p>Card description text here</p>
        </div>
        <div className='card p-6 text-center'>
          <h3>Card Title 2</h3>
          <p>Card description text here</p>
        </div>
        <div className='card p-6 text-center'>
          <h3>Card Title 3</h3>
          <p>Card description text here</p>
        </div>
      </div>

      {/* Another H2 and P Section */}
      <div className='text-center mb-20'>
        <h2>Your heading text here</h2>
        <p>Your paragraph text here</p>
      </div>

      {/* Horizontal Step Process */}
      <div className='max-w-6xl mx-auto mb-20'>
        <div className='relative'>
          {/* Horizontal line - hidden on mobile */}
          <div className='absolute top-6 left-0 right-0 h-0.5 bg-gray-300 hidden md:block'></div>

          {/* Steps */}
          <div className='grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative'>
            {/* Step 1 */}
            <div className='text-center'>
              <div
                className='w-12 h-12 text-white rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 relative z-10'
                style={{ backgroundColor: '#3CC29E' }}
              >
                1
              </div>
              <h3 className='mb-2'>Step 1 Title</h3>
              <p className='text-sm text-muted'>Step 1 description text here</p>
            </div>

            {/* Step 2 */}
            <div className='text-center'>
              <div
                className='w-12 h-12 text-white rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 relative z-10'
                style={{ backgroundColor: '#3CC29E' }}
              >
                2
              </div>
              <h3 className='mb-2'>Step 2 Title</h3>
              <p className='text-sm text-muted'>Step 2 description text here</p>
            </div>

            {/* Step 3 */}
            <div className='text-center'>
              <div
                className='w-12 h-12 text-white rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 relative z-10'
                style={{ backgroundColor: '#3CC29E' }}
              >
                3
              </div>
              <h3 className='mb-2'>Step 3 Title</h3>
              <p className='text-sm text-muted'>Step 3 description text here</p>
            </div>

            {/* Step 4 */}
            <div className='text-center'>
              <div
                className='w-12 h-12 text-white rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 relative z-10'
                style={{ backgroundColor: '#3CC29E' }}
              >
                4
              </div>
              <h3 className='mb-2'>Step 4 Title</h3>
              <p className='text-sm text-muted'>Step 4 description text here</p>
            </div>

            {/* Step 5 */}
            <div className='text-center'>
              <div
                className='w-12 h-12 text-white rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 relative z-10'
                style={{ backgroundColor: '#3CC29E' }}
              >
                5
              </div>
              <h3 className='mb-2'>Step 5 Title</h3>
              <p className='text-sm text-muted'>Step 5 description text here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
