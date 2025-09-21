export interface WorkItem {
  title: string
  description: string
  year: string
  category: string
  slug: string
  coverImage?: string
  technologies?: string[]
  featured?: boolean
  demoUrl?: string
  isNew?: boolean // For projects less than 3 months old
}

export const worksData: WorkItem[] = [
  {
    title: 'Real Estate Bear',
    description:
      'Unified web and mobile funnels that help real estate teams onboard agents faster and convert warmer leads.',
    year: '2024',
    category: 'Web & Mobile',
    slug: '/works/real-estate-bear',
    coverImage: '/placeholder.svg',
    technologies: ['React', 'Next.js', 'React Native', 'TypeScript'],
    featured: true,
    isNew: true,
  },
  {
    title: 'Funnel Zen Branding',
    description:
      'Positioned a growth-stage SaaS with a cohesive brand system that signals maturity and boosts demo requests.',
    year: '2023',
    category: 'Branding',
    slug: '/works/funnel-zen-branding',
    coverImage: '/placeholder.svg',
    technologies: ['Brand Strategy', 'Logo Design', 'Visual Identity'],
    featured: true,
  },
  {
    title: 'Beemine Store',
    description:
      'CRO-focused Shopify refresh aligning storytelling with subscription offers to lift average order value.',
    year: '2023',
    category: 'E-commerce',
    slug: '/works/beemine-store',
    coverImage: '/placeholder.svg',
    technologies: ['Shopify', 'UI/UX', 'Brand Design', 'Conversion'],
    featured: true,
  },
  {
    title: 'Cigna Stress Management App',
    description:
      'Accessible stress management journey that keeps patients engaged while clinicians monitor progress in real time.',
    year: '2020',
    category: 'Healthcare',
    slug: '/works/cigna-stress-management-app',
    coverImage: '/placeholder.svg',
    technologies: ['Mobile Design', 'Healthcare UX', 'Accessibility'],
    featured: true,
  },
]

// Helper functions for filtering
export const getFeaturedWorks = () => worksData.filter(work => work.featured)
export const getAllWorks = () => worksData
export const getWorksByCategory = (category: string) =>
  worksData.filter(work => work.category === category)
export const getRecentWorks = () => worksData.filter(work => work.isNew)
