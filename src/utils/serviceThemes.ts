// Centralized service theme mapping
export interface ServiceTheme {
  bg: string
  border: string
  hoverBorder: string
  iconBg: string
  dot: string
  isDark: boolean
  textColor: string
  mutedTextColor: string
  primary: string // Main brand color for this service
  logoFilter?: string // Optional CSS filter for logo adjustments
}

export const getServiceTheme = (title: string): ServiceTheme => {
  const themes: Record<string, ServiceTheme> = {
    'AI Product Development': {
      bg: '#7E64FC', // Purple full tone
      border: 'rgba(126, 100, 252, 0.8)', // Purple with 80% opacity
      hoverBorder: 'rgba(126, 100, 252, 1)', // Purple solid
      iconBg: 'rgba(255, 255, 255, 0.15)', // White with 15% opacity
      dot: '#FFFFFF', // White solid
      isDark: true,
      textColor: '#FFFFFF',
      mutedTextColor: 'rgba(255, 255, 255, 0.8)',
      primary: '#7E64FC', // Purple
    },
    'Revenue-First Design Systems': {
      bg: '#FDC304', // Yellow full tone
      border: 'rgba(253, 195, 4, 0.8)', // Yellow with 80% opacity
      hoverBorder: 'rgba(253, 195, 4, 1)', // Yellow solid
      iconBg: 'rgba(0, 0, 0, 0.15)', // Black with 15% opacity
      dot: '#000000', // Black solid
      isDark: false,
      textColor: '#000000',
      mutedTextColor: 'rgba(0, 0, 0, 0.7)',
      primary: '#FDC304', // Yellow
      logoFilter: 'brightness(0) invert(1)', // Make logo white for yellow background
    },
    'AI-Powered Growth Engines': {
      bg: '#55AE44', // Growth green full tone
      border: 'rgba(85, 174, 68, 0.8)', // Growth green with 80% opacity
      hoverBorder: 'rgba(85, 174, 68, 1)', // Growth green solid
      iconBg: 'rgba(255, 255, 255, 0.15)', // White with 15% opacity
      dot: '#FFFFFF', // White solid
      isDark: true,
      textColor: '#FFFFFF',
      mutedTextColor: 'rgba(255, 255, 255, 0.8)',
      primary: '#55AE44', // Growth green
    },
    'Profit-Optimized Interfaces': {
      bg: '#8CDFF3', // Sky blue full tone
      border: 'rgba(140, 223, 243, 0.8)', // Sky blue with 80% opacity
      hoverBorder: 'rgba(140, 223, 243, 1)', // Sky blue solid
      iconBg: 'rgba(0, 0, 0, 0.15)', // Black with 15% opacity
      dot: '#000000', // Black solid
      isDark: false,
      textColor: '#000000',
      mutedTextColor: 'rgba(0, 0, 0, 0.7)',
      primary: '#8CDFF3', // Sky blue
    },
    'Conversion Asset Systems': {
      bg: '#3CC29E', // Secondary teal full tone
      border: 'rgba(60, 194, 158, 0.8)', // Secondary teal with 80% opacity
      hoverBorder: 'rgba(60, 194, 158, 1)', // Secondary teal solid
      iconBg: 'rgba(255, 255, 255, 0.15)', // White with 15% opacity
      dot: '#FFFFFF', // White solid
      isDark: true,
      textColor: '#FFFFFF',
      mutedTextColor: 'rgba(255, 255, 255, 0.8)',
      primary: '#3CC29E', // Teal
    },
    'Full-Stack AI Implementation': {
      bg: '#008dcc', // Primary blue full tone
      border: 'rgba(0, 141, 204, 0.8)', // Primary blue with 80% opacity
      hoverBorder: 'rgba(0, 141, 204, 1)', // Primary blue solid
      iconBg: 'rgba(255, 255, 255, 0.15)', // White with 15% opacity
      dot: '#FFFFFF', // White solid
      isDark: true,
      textColor: '#FFFFFF',
      mutedTextColor: 'rgba(255, 255, 255, 0.8)',
      primary: '#008dcc', // Primary blue
    },
  }

  return (
    themes[title] || {
      bg: 'rgba(0, 0, 0, 0.02)',
      border: 'rgba(0, 0, 0, 0.1)',
      hoverBorder: 'rgba(0, 0, 0, 0.2)',
      iconBg: 'rgba(0, 0, 0, 0.05)',
      dot: '#000000',
      isDark: false,
      textColor: '#000000',
      mutedTextColor: 'rgba(0, 0, 0, 0.7)',
      primary: '#3CC29E', // Default teal
    }
  )
}

// Service slug to title mapping for theme lookup
export const getServiceTitleFromSlug = (slug: string): string => {
  const slugToTitle: Record<string, string> = {
    'ai-product-development': 'AI Product Development',
    'revenue-first-design': 'Revenue-First Design Systems',
    'ai-powered-growth': 'AI-Powered Growth Engines',
    'profit-optimized-interfaces': 'Profit-Optimized Interfaces',
    'conversion-assets': 'Conversion Asset Systems',
    'full-stack-ai': 'Full-Stack AI Implementation',
  }

  return slugToTitle[slug] || 'Default Service'
}
