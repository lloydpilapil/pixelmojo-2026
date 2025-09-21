import type { ServiceData } from '@/components/ServicePage'

export const servicesData: Record<string, ServiceData> = {
  'ai-product-development': {
    title: 'AI Product Development',
    description:
      'Ship complete AI products in 90 days. Production-ready systems that generate revenue from launch, not someday.',
    pricing: 'From $15K',
    metadata: {
      title:
        'AI Product Development | Ship Revenue-Generating Products in 90 Days | Pixelmojo',
      description:
        'Ship complete AI products in 90 days. Production-ready systems that generate revenue from launch, not someday.',
    },
  },
  'revenue-first-design': {
    title: 'Revenue-First Design Systems',
    description:
      'Design systems built to convert. Every component optimized for activation, retention, and expansion from day one.',
    pricing: 'Starts at $9K',
    metadata: {
      title:
        'Revenue-First Design Systems | Conversion-Optimized Components | Pixelmojo',
      description:
        'Design systems built to convert. Every component optimized for activation, retention, and expansion from day one.',
    },
  },
  'ai-powered-growth': {
    title: 'AI-Powered Growth Engines',
    description:
      'Automate your entire growth stack. From lead scoring to lifecycle campaigns that generate immediate pipeline.',
    pricing: 'Retainers from $6K/mo',
    metadata: {
      title:
        'AI-Powered Growth Engines | Automated Lead Scoring & Campaigns | Pixelmojo',
      description:
        'Automate your entire growth stack. From lead scoring to lifecycle campaigns that generate immediate pipeline.',
    },
  },
  'profit-optimized-interfaces': {
    title: 'Profit-Optimized Interfaces',
    description:
      'Product experiences that maximize revenue per user. AI-enhanced flows that convert, upsell, and retain.',
    pricing: 'Project scopes from $22K',
    metadata: {
      title:
        'Profit-Optimized Interfaces | Revenue-Per-User Optimization | Pixelmojo',
      description:
        'Product experiences that maximize revenue per user. AI-enhanced flows that convert, upsell, and retain.',
    },
  },
  'conversion-assets': {
    title: 'Conversion Asset Systems',
    description:
      'Visual systems that sell. From pitch decks that close to in-app experiences that drive expansion revenue.',
    pricing: 'Bundles from $4K',
    metadata: {
      title: 'Conversion Asset Systems | Visual Systems That Sell | Pixelmojo',
      description:
        'Visual systems that sell. From pitch decks that close to in-app experiences that drive expansion revenue.',
    },
  },
  'full-stack-ai': {
    title: 'Full-Stack AI Implementation',
    description:
      'Teams that ship production AI weekly. Complete ecosystems from infrastructure to interface, generating ROI immediately.',
    pricing: 'Embedded teams from $12K/mo',
    metadata: {
      title:
        'Full-Stack AI Implementation | Production AI Features Weekly | Pixelmojo',
      description:
        'Teams that ship production AI weekly. Complete ecosystems from infrastructure to interface, generating ROI immediately.',
    },
  },
}

export function getServiceData(slug: string): ServiceData | null {
  return servicesData[slug] || null
}
