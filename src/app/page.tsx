import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import ScrollVideoSection from '@/components/ScrollVideoSection'
import CompanyLogos from '@/components/CompanyLogos'
import ServicesPreview from '@/components/ServicesPreview'
import TestimonialSection from '@/components/TestimonialSection'
import FeaturedWorks from '@/components/FeaturedWorks'
import OurApproach from '@/components/OurApproach'
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
            We design SaaS experiences that turn{' '}
            <span className='text-accent'>strategy</span> into{' '}
            <span className='text-growth'>ROI.</span>
          </>
        }
        description='We bridge product strategy, UX, and AI enablement so your teams launch faster, convert better, and prove measurable value to the business.'
        ctaText='See How We Drive Growth'
        ctaHref='/contact-us'
        proofPoints={[]}
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

      {/* Our Approach Section */}
      <OurApproach />

      {/* Recent Articles Section */}
      <RecentArticles />
    </div>
  )
}
