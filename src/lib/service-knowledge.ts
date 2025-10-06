import servicesData from '@/data/services-knowledge.json'

export type ServiceType =
  | 'conversion-assets'
  | 'profit-optimized-interfaces'
  | 'revenue-first-design'
  | 'ai-product-development'
  | 'ai-powered-growth'
  | 'full-stack-ai'

export type PackageLevel =
  | 'essential'
  | 'starter'
  | 'complete'
  | 'full'
  | 'enterprise'
  | 'mvp-validation'
  | 'ai-integration'
  | 'conversion-optimized'
  | 'campaign-bundle'
  | 'web-app-starter'
  | 'full-product-design'
  | 'enterprise-platform'
  | 'brand-essentials'
  | 'complete-brand-system'
  | 'full-ai-product'
  | 'enterprise-ai-platform'
  | 'growth-starter'
  | 'growth-accelerator'
  | 'growth-enterprise'
  | 'embedded-ai-team'
  | 'ai-infrastructure'

export interface ServicePackage {
  name: string
  price: string
  best_for: string
  deliverables: string[]
  timeline: string
  not_included: string[]
  add_ons: string[]
  team_options?: string[]
}

export interface Service {
  name: string
  tagline: string
  description: string
  starting_price: string
  packages: Record<string, ServicePackage>
}

/**
 * Get detailed information about a specific service
 */
export function getServiceDetails(serviceType: ServiceType): Service | null {
  const service = servicesData.services[serviceType]
  if (!service) return null
  return service as Service
}

/**
 * Get specific package details
 */
export function getPackageDetails(
  serviceType: ServiceType,
  packageLevel: string
): ServicePackage | null {
  const service = getServiceDetails(serviceType)
  if (!service) return null

  const pkg = service.packages[packageLevel]
  if (!pkg) return null

  return pkg as ServicePackage
}

/**
 * Find the best matching package based on budget
 */
export function findPackageByBudget(
  serviceType: ServiceType,
  budget: number
): ServicePackage | null {
  const service = getServiceDetails(serviceType)
  if (!service) return null

  // Parse prices and find best match
  const packages = Object.values(service.packages)

  for (const pkg of packages) {
    const priceRange = pkg.price
    // Extract min price from range like "$4K-$8K" or "From $15K" or "$12K/month"
    const minPrice = extractMinPrice(priceRange)
    const maxPrice = extractMaxPrice(priceRange)

    if (
      minPrice &&
      budget >= minPrice &&
      (!maxPrice || budget <= maxPrice * 1.2)
    ) {
      return pkg as ServicePackage
    }
  }

  // If budget is too low, return cheapest package
  if (packages.length > 0) {
    return packages[0] as ServicePackage
  }

  return null
}

/**
 * Extract minimum price from price string
 */
function extractMinPrice(priceString: string): number | null {
  // Remove $ and commas, extract numbers
  const match = priceString.match(/\$?(\d+)K/)
  if (match) {
    return parseInt(match[1]) * 1000
  }
  return null
}

/**
 * Extract maximum price from price string
 */
function extractMaxPrice(priceString: string): number | null {
  // Look for the second number in range like "$4K-$8K"
  const match = priceString.match(/\$?\d+K-\$?(\d+)K/)
  if (match) {
    return parseInt(match[1]) * 1000
  }
  return null
}

/**
 * Format package details for AI response
 */
export function formatPackageForAI(
  service: Service,
  pkg: ServicePackage
): string {
  let response = `## ${pkg.name} - ${pkg.price}\n\n`
  response += `**Best for:** ${pkg.best_for}\n`
  response += `**Timeline:** ${pkg.timeline}\n\n`

  response += `**What's Included:**\n`
  pkg.deliverables.forEach(item => {
    response += `• ${item}\n`
  })

  response += `\n**Not Included:**\n`
  pkg.not_included.forEach(item => {
    response += `• ${item}\n`
  })

  if (pkg.add_ons && pkg.add_ons.length > 0) {
    response += `\n**Popular Add-Ons:**\n`
    pkg.add_ons.forEach(item => {
      response += `• ${item}\n`
    })
  }

  if (pkg.team_options && pkg.team_options.length > 0) {
    response += `\n**Team Options:**\n`
    pkg.team_options.forEach(item => {
      response += `• ${item}\n`
    })
  }

  return response
}

/**
 * Get all available services summary
 */
export function getAllServicesSummary(): string {
  let summary = 'Here are all our services:\n\n'

  Object.values(servicesData.services).forEach((service: any) => {
    summary += `**${service.name}** (${service.starting_price})\n`
    summary += `${service.tagline}\n\n`
  })

  return summary
}
