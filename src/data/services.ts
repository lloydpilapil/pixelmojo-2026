import type { ServiceData } from '@/components/ServicePage'

export const servicesData: Record<string, ServiceData> = {
  'ai-product-development': {
    title: 'AI Product Development',
    description:
      'Transform your digital product into a growth engine. Stop losing customers to poor user experience—we create intuitive AI-powered interfaces that keep users engaged and drive conversions.',
    pricing: 'From $15K',
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
      'Build a brand that commands attention. We forge visual strategies for tech startups and SaaS businesses that capture attention, build trust, and drive growth through powerful brand identity.',
    pricing: 'Starts at $9K',
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
      'Go beyond design. Activate your brand for real growth. Turn your investment into your most powerful engine for leads, sales, and lasting market presence through strategic, data-driven activation.',
    pricing: 'Retainers from $6K/mo',
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
      'Design that delights, technology that delivers. We design and develop websites and mobile apps that balance beautiful design with powerful functionality for experiences users love.',
    pricing: 'Project scopes from $22K',
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
      'Visuals that speak volumes, designs that drive action. We create high-quality visuals that balance creativity with strategy to elevate your brand and share your message effectively.',
    pricing: 'Bundles from $4K',
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
      'Beyond code: our framework for high-performance development. Stop duct-taping tools together—we build fast, scalable, and collaborative digital products using a development system that actually works.',
    pricing: 'Embedded teams from $12K/mo',
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
