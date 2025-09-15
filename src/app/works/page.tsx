import type { Metadata } from 'next'
import { PortfolioCard } from '@/components/FeaturedWorks'

export const metadata: Metadata = {
  title: 'Our Work | Growth-Focused Design & Strategy by Pixelmojo',
  description:
    'View case studies in UI/UX, product design, and digital strategy. See how Pixelmojo delivers high-impact results for startups, B2B teams, and global brands.',
  openGraph: {
    title: 'Our Work | Growth-Focused Design & Strategy by Pixelmojo',
    description:
      'View case studies in UI/UX, product design, and digital strategy. See how Pixelmojo delivers high-impact results for startups, B2B teams, and global brands.',
    type: 'website',
  },
}

export default function Works() {
  // Exact same works data from FeaturedWorks component
  const works = [
    {
      title: 'Real Estate Bear',
      description:
        'A comprehensive digital transformation combining modern web design with intuitive mobile app interfaces for real estate professionals.',
      year: '2024',
      category: 'Web & Mobile',
      slug: '/works/real-estate-bear',
      coverImage: '',
      technologies: ['React', 'Next.js', 'React Native', 'TypeScript'],
      featured: true,
    },
    {
      title: 'Funnel Zen Branding',
      description:
        'Complete brand identity redesign featuring modern logo design, visual systems, and strategic positioning for growth.',
      year: '2023',
      category: 'Branding',
      slug: '/works/funnel-zen-branding',
      coverImage: '',
      technologies: ['Brand Strategy', 'Logo Design', 'Visual Identity'],
    },
    {
      title: 'Beemine Store',
      description:
        'E-commerce platform design with custom landing page development, comprehensive branding, and conversion optimization.',
      year: '2023',
      category: 'E-commerce',
      slug: '/works/beemine-store',
      coverImage: '',
      technologies: ['Shopify', 'UI/UX', 'Brand Design', 'Conversion'],
    },
    {
      title: 'Cigna Stress Management App',
      description:
        'Healthcare mobile application focused on stress management with user-centered design and accessibility standards.',
      year: '2020',
      category: 'Healthcare',
      slug: '/works/cigna-stress-management-app',
      coverImage: '',
      technologies: ['Mobile Design', 'Healthcare UX', 'Accessibility'],
      featured: true,
    },
  ]

  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      <div className='max-w-7xl mx-auto'>
        {/* Page Header */}
        <div className='text-center mb-20'>
          <h1 className='mb-6 font-heading'>Our Works</h1>
          <p className='lead max-w-3xl mx-auto mb-8'>
            Explore our portfolio of successful projects that have driven
            measurable results for clients across various industries.
          </p>
        </div>

        {/* Projects Grid */}
        <div className='grid md:grid-cols-2 gap-8 mb-20'>
          {works.map(work => (
            <PortfolioCard key={work.slug} work={work} />
          ))}
        </div>
      </div>
    </div>
  )
}
