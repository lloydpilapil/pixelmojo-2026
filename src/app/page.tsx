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
  title: 'Pixelmojo | AI Product Studio - Ship Revenue in 90 Days',
  description:
    'AI-native product studio that builds complete ecosystems generating immediate revenue. From idea to profitable product in 90 days. Real results, not promises.',
  alternates: {
    canonical: 'https://pixelmojo.com',
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
          description='We fuse UX, engineering, and applied AI to ship revenue-driving products—fast. While others deliver endless strategy decks, we ship working products that validate with real users and real revenue, in weeks, not quarters.'
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
        {/* AI-Native Advantage Section */}
        <section className='mb-32 text-center'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='mb-8 text-4xl md:text-5xl font-bold'>
              Built AI-Native From Day One
            </h2>
            <p className='text-lg text-muted-foreground mb-12 max-w-3xl mx-auto'>
              Most agencies add AI as an afterthought. We built our entire
              process around it from day one. That means faster decisions,
              better results, and products that improve themselves over time.
            </p>

            {/* AI-Native vs Traditional Comparison */}
            <div className='grid md:grid-cols-3 gap-8 text-left'>
              <div className='p-6 border border-destructive/20 bg-destructive/5 rounded-lg'>
                <h3 className='font-semibold text-destructive mb-3'>
                  Traditional Agencies
                </h3>
                <ul className='text-sm text-muted-foreground space-y-2'>
                  <li>• Manual processes</li>
                  <li>• Opinion-based design</li>
                  <li>• One-time deliverables</li>
                  <li>• Hope for results</li>
                </ul>
              </div>

              <div className='p-6 border border-secondary/20 bg-secondary/5 rounded-lg'>
                <h3 className='font-semibold text-secondary mb-3'>
                  AI-Added Companies
                </h3>
                <ul className='text-sm text-muted-foreground space-y-2'>
                  <li>• AI features bolted on</li>
                  <li>• Some data insights</li>
                  <li>• Static with AI features</li>
                  <li>• Better guesswork</li>
                </ul>
              </div>

              <div className='p-6 border-2 border-primary bg-primary/10 rounded-lg relative'>
                <div className='absolute -top-3 left-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold'>
                  Our Approach
                </div>
                <h3 className='font-semibold text-primary mb-3 mt-2'>
                  Pixelmojo (AI-Native)
                </h3>
                <ul className='text-sm text-foreground space-y-2'>
                  <li>✓ AI-first architecture</li>
                  <li>✓ Every decision data-driven</li>
                  <li>✓ Self-improving systems</li>
                  <li>✓ Predictable outcomes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview Section */}
        <ServicesPreview />

        {/* Testimonial Section */}
        <TestimonialSection />

        {/* Featured Projects Section */}
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
