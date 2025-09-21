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
  title: 'AI + Design Sprints for SaaS Roadmaps | Pixelmojo',
  description:
    'Pixelmojo orchestrates AI + design so SaaS roadmaps ship faster, mapping enablement to real user journeys and experiments teams can run today.',
  openGraph: {
    title: 'AI + Design Sprints for SaaS Roadmaps | Pixelmojo',
    description:
      'Pixelmojo orchestrates AI + design so SaaS roadmaps ship faster, mapping enablement to real user journeys and experiments teams can run today.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      <Hero
        title={
          <>
            We build <span className='text-accent'>AI products</span> that
            profit from <span className='text-growth'>day one.</span>
          </>
        }
        description='Forget fragmented vendors and endless discovery. We design, develop, and deploy complete product ecosystems that generate measurable ROI immediately, not someday.'
        ctaText='Learn Our Process'
        ctaHref='/about'
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
