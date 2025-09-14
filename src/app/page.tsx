import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import ScrollVideoSection from '@/components/ScrollVideoSection'
import CompanyLogos from '@/components/CompanyLogos'
import ServicesPreview from '@/components/ServicesPreview'
import TestimonialSection from '@/components/TestimonialSection'
import FeaturedWorks from '@/components/FeaturedWorks'
import ComparisonTable from '@/components/ComparisonTable'
import OurApproach from '@/components/OurApproach'
import CTACard from '@/components/CTACard'
import RecentArticles from '@/components/RecentArticles'

export const metadata: Metadata = {
  title: 'End-to-End Product Design for SaaS | AI, UI/UX & ROI',
  description:
    'Pixelmojo designs high-impact platforms for SaaS. We cut through the hype, blending human-centered UI/UX with strategic AI to deliver measurable ROI.',
  openGraph: {
    title: 'End-to-End Product Design for SaaS | AI, UI/UX & ROI',
    description:
      'Pixelmojo designs high-impact platforms for SaaS. We cut through the hype, blending human-centered UI/UX with strategic AI to deliver measurable ROI.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      <Hero
        title={
          <>
            WE <span className='text-accent'>DESIGN</span> FOR{' '}
            <span className='text-cta'>IMPACT</span>
            <span className='text-cta'>,</span> WE BUILD FOR{' '}
            <span
              className='text-growth underline decoration-growth underline-offset-4'
              style={{ textDecorationThickness: '10px' }}
            >
              ROI
            </span>
          </>
        }
        description='AI is transformative, but only when deployed strategically. We cut through the hype to identify and capture real business value. We integrate AI with clear purpose, build platforms, and deliver measurable ROI.'
        ctaText='See How We Drive Growth'
        ctaHref='/contact-us'
      />

      {/* Scroll-Animated Video Section */}
      <ScrollVideoSection videoId='1095336702' />

      {/* Company Logos Section */}
      <CompanyLogos />

      {/* Services Preview Section */}
      <ServicesPreview />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Featured Works Section */}
      <FeaturedWorks />

      {/* Comparison Table Section */}
      <ComparisonTable />

      {/* Our Approach Section */}
      <OurApproach />

      {/* CTA Card Section */}
      <CTACard />

      {/* Recent Articles Section */}
      <RecentArticles />
    </div>
  )
}
