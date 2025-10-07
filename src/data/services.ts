import type { ServiceData } from '@/components/ServicePage'

export const servicesData: Record<string, ServiceData> = {
  'ai-product-development': {
    title: 'AI Product Development',
    description:
      'Design and build AI-powered products from validation to launch using modern tools and frameworks.',
    pricing: 'From $4,995',
    metadata: {
      title:
        'AI Product Development | Transform Digital Products Into Growth Engines | Pixelmojo',
      description:
        'Transform your digital product into a growth engine. AI-powered interfaces that drive engagement, conversions, and lasting customer relationships.',
    },
  },
  'revenue-first-design': {
    title: 'Revenue-First Design Systems',
    description:
      'Brand identity and design systems that help startups look professional and build trust with customers.',
    pricing: 'Starts at $1,995',
    metadata: {
      title:
        'Revenue-First Design Systems | Build Brands That Command Attention | Pixelmojo',
      description:
        'Build a brand that commands attention. Visual strategies that capture attention, build trust, and drive growth through powerful brand identity.',
    },
  },
  'ai-powered-growth': {
    title: 'AI-Powered Growth Engines',
    description:
      'Content marketing and growth campaigns to help startups generate leads and build consistent pipeline.',
    pricing: 'Retainers from $2,995/mo',
    metadata: {
      title:
        'AI-Powered Growth Engines | Activate Your Brand for Real Growth | Pixelmojo',
      description:
        'Go beyond design. Activate your brand for real growth through strategic content, multi-channel engagement, and data-driven performance optimization.',
    },
  },
  'profit-optimized-interfaces': {
    title: 'Profit-Optimized Interfaces',
    description:
      'Product UI/UX designed to maximize user engagement, conversion, and retention.',
    pricing: 'Projects from $2,995',
    metadata: {
      title:
        'Profit-Optimized Interfaces | Design That Delights, Technology That Delivers | Pixelmojo',
      description:
        'Design and develop websites and mobile apps that balance beautiful design with powerful functionality. Digital experiences that users love and drive results.',
    },
  },
  'conversion-assets': {
    title: 'Conversion Asset Systems',
    description:
      'Landing pages and marketing assets designed to convert visitors into customers.',
    pricing: 'Projects from $1,995',
    metadata: {
      title:
        'Conversion Asset Systems | Visuals That Speak Volumes, Designs That Drive Action | Pixelmojo',
      description:
        'Create high-quality visuals that balance creativity with strategy. From engaging infographics to polished pitch decks that drive action.',
    },
  },
  'full-stack-ai': {
    title: 'Full-Stack AI Implementation',
    description:
      'Add AI features to existing products or get dedicated AI engineers for ongoing development.',
    pricing: 'Programs from $5,995',
    metadata: {
      title:
        'Full-Stack AI Implementation | Beyond Code: High-Performance Development Framework | Pixelmojo',
      description:
        'Beyond code: our framework for high-performance development. Build fast, scalable, collaborative digital products with a development system that works.',
    },
  },
}

export function getServiceData(slug: string): ServiceData | null {
  return servicesData[slug] || null
}
