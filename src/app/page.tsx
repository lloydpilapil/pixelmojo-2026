import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import HeroVisual from '@/components/HeroVisual'
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
    <div className='animate-fade-in'>
      <div className='container mx-auto px-4 py-16'>
        <Hero
          title={
            <>
              We build <span className='text-primary'>AI products</span> that
              actually <span className='text-accent'>ship</span> and{' '}
              <span className='text-growth'>sell.</span>
            </>
          }
          description='While others deliver endless strategy decks, we ship working products that validate with real users and real revenue, in weeks, not quarters.'
          ctaText='See How We Ship'
          ctaHref='/about'
          proofPoints={[]}
        />

        {/* Hero Visual Section */}
        <HeroVisual
          src='/pixelmojo-about-02-image.webp'
          alt='Pixelmojo AI-powered design sprint process showing user research, rapid prototyping, and iterative testing workflow for SaaS product development'
          priority
          animation='reveal'
          caption='Our proven AI + design sprint methodology that helps SaaS teams ship user-validated products faster than traditional development cycles'
        />
      </div>

      {/* Company Logos Section - Full Width */}
      <CompanyLogos />

      <div className='container mx-auto px-4 py-16 animate-fade-in'>
        {/* Services Preview Section */}
        <ServicesPreview />

        {/* Testimonial Section */}
        <TestimonialSection />

        {/* Featured Works Section */}
        <FeaturedWorks />

        {/* Our Approach Section */}
        <OurApproach />
      </div>

      {/* Recent Articles Section with Footer Visual */}
      <RecentArticles
        footerImage='/pixelmojo-home-footer-image.webp'
        footerImageAlt='Pixelmojo portfolio showcase - comprehensive AI product development solutions'
      />
    </div>
  )
}
