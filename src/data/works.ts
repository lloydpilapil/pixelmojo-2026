export interface WorkItem {
  title: string
  description: string
  year: string
  category: string
  slug: string
  coverImage?: string
  thumbnailImage?: string // For works listing and featured works (3:2 aspect ratio)
  technologies?: string[]
  featured?: boolean
  demoUrl?: string
  isNew?: boolean // For projects less than 3 months old
}

export const worksData: WorkItem[] = [
  {
    title: 'Mojo AI',
    description:
      'Transform single templates into hundreds of on-brand ad variations in minutes. AI-powered content generation meets intelligent design analysis for faster, smarter creative workflows.',
    year: '2025',
    category: 'Product Design',
    slug: '/projects/mojo-ai',
    coverImage: '/mojo-ai-visual.webp',
    thumbnailImage: '/mojo-ai-visual.webp',
    technologies: [
      'TypeScript',
      'Figma Plugin API',
      'OpenAI GPT-5',
      'shadcn/ui',
    ],
    featured: true,
    isNew: true,
    demoUrl: '#', // Placeholder for live demo link
  },
  {
    title: 'SEO Intelligence Platform',
    description:
      'Built with Google Search Console MCP to create an autonomous SEO optimization system that monitors rankings, identifies opportunities, and generates content strategies that drove 3x organic traffic growth.',
    year: '2025',
    category: 'Marketing Tech',
    slug: '/projects/seo-intelligence-platform',
    coverImage: '/seo-intelligence-platform-visual.webp',
    thumbnailImage: '/seo-intelligence-platform-visual.webp',
    technologies: [
      'TypeScript',
      'MCP Protocol',
      'Google Search Console API',
      'Claude AI',
      'Data Analytics',
    ],
    featured: true,
    isNew: true,
    demoUrl: '#',
  },
  {
    title: 'Real Estate Earnings Tracker',
    description:
      'Predictive analytics platform that transforms property investment data into actionable profit forecasts with real-time market analysis and portfolio optimization.',
    year: '2025',
    category: 'Real Estate Tech',
    slug: '/projects/real-estate-earnings-tracker',
    coverImage: '/real-estate-earning-tracker-visual.webp',
    thumbnailImage: '/real-estate-earning-tracker-visual.webp',
    technologies: [
      'React',
      'TypeScript',
      'Python',
      'Machine Learning',
      'PostgreSQL',
      'Chart.js',
    ],
    featured: true,
    demoUrl: '#',
  },
  {
    title: 'Logistics Track & Trace System',
    description:
      'Enterprise logistics platform that unified fragmented operations into a real-time tracking system, cutting ops workload by 70% and delivering 3 months ahead of schedule.',
    year: '2025',
    category: 'Enterprise SaaS',
    slug: '/projects/logistics-track-trace-system',
    coverImage: '/logistics-track-and-trace-visual.webp',
    thumbnailImage: '/logistics-track-and-trace-visual.webp',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'WebSockets',
    ],
    featured: true,
    demoUrl: '#',
  },
]

// Helper functions for filtering
export const getFeaturedWorks = () => worksData.filter(work => work.featured)
export const getAllWorks = () => worksData
export const getWorksByCategory = (category: string) =>
  worksData.filter(work => work.category === category)
export const getRecentWorks = () => worksData.filter(work => work.isNew)

// SEO-optimized alt text generation
export const generateAltText = (
  work: WorkItem,
  imageType: 'thumbnail' | 'main' = 'thumbnail'
): string => {
  const { title, category, technologies } = work
  const mainTech = technologies?.[0] || ''
  const imageContext =
    imageType === 'thumbnail' ? 'project thumbnail' : 'case study image'

  // Create descriptive alt text under 125 characters for SEO
  const altText = `${title} ${category.toLowerCase()} ${imageContext}${mainTech ? ` - ${mainTech}` : ''} by Pixelmojo`

  return altText.length > 125
    ? `${title} ${category.toLowerCase()} ${imageContext} by Pixelmojo`
    : altText
}
