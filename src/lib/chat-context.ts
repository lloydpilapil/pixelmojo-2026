/**
 * Chat Context Tracker - Phase 1
 * Detects page context and user behavior for intelligent chat triggers
 */

export type PageType =
  | 'home'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'blog'
  | 'pricing'
  | 'contact'
  | 'other'

export interface ChatContext {
  // Page information
  pageType: PageType
  pageUrl: string
  pageTitle: string
  serviceName?: string // For service pages
  projectName?: string // For portfolio pages
  blogTopic?: string // For blog pages

  // Timing
  timeOnPage: number // seconds
  timestamp: string

  // User journey
  referrer: string
  isReturnVisitor: boolean
  previouslyEngaged: boolean

  // Device
  userAgent: string
  isMobile: boolean
}

export interface TriggerRules {
  pageType: PageType
  delaySeconds: number
  message: string
  enableExitIntent: boolean
  highIntent: boolean // True for pricing, contact, services pages
}

/**
 * Detect page type from URL pathname
 */
export function detectPageType(pathname: string): PageType {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/about')) return 'about'
  if (pathname.startsWith('/services')) return 'services'
  if (pathname.startsWith('/portfolio') || pathname.startsWith('/projects'))
    return 'portfolio'
  if (pathname.startsWith('/blog')) return 'blog'
  if (pathname.startsWith('/pricing')) return 'pricing'
  if (pathname.startsWith('/contact')) return 'contact'
  return 'other'
}

/**
 * Extract service name from service page URL
 */
export function extractServiceName(pathname: string): string | undefined {
  if (!pathname.startsWith('/services/')) return undefined

  const servicePart = pathname.replace('/services/', '').split('/')[0]
  // Convert slug to readable name
  return servicePart
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Extract project name from portfolio URL
 */
export function extractProjectName(pathname: string): string | undefined {
  if (!pathname.startsWith('/projects/') && !pathname.startsWith('/portfolio/'))
    return undefined

  const projectPart = pathname
    .replace('/projects/', '')
    .replace('/portfolio/', '')
    .split('/')[0]

  return projectPart
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Extract blog topic from blog URL (simple keyword extraction)
 */
export function extractBlogTopic(pathname: string): string | undefined {
  if (!pathname.startsWith('/blog/')) return undefined

  const blogSlug = pathname.replace('/blog/', '').split('/')[0]
  // Take first 2-3 words as topic
  const words = blogSlug.split('-').slice(0, 3)
  return words.join(' ')
}

/**
 * Get current page context
 */
export function getCurrentContext(): ChatContext {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '/'
  const pageType = detectPageType(pathname)

  return {
    pageType,
    pageUrl: pathname,
    pageTitle: typeof document !== 'undefined' ? document.title : '',
    serviceName: extractServiceName(pathname),
    projectName: extractProjectName(pathname),
    blogTopic: extractBlogTopic(pathname),
    timeOnPage: 0, // Will be tracked by component
    timestamp: new Date().toISOString(),
    referrer:
      typeof document !== 'undefined' ? document.referrer : 'direct/unknown',
    isReturnVisitor: checkReturnVisitor(),
    previouslyEngaged: checkPreviousEngagement(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    isMobile:
      typeof navigator !== 'undefined'
        ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        : false,
  }
}

/**
 * Check if user has visited before
 */
function checkReturnVisitor(): boolean {
  if (typeof localStorage === 'undefined') return false
  return localStorage.getItem('pixelmojo_visited') === 'true'
}

/**
 * Mark user as visited
 */
export function markAsVisited(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem('pixelmojo_visited', 'true')
}

/**
 * Check if user has engaged with chat before
 */
function checkPreviousEngagement(): boolean {
  if (typeof localStorage === 'undefined') return false
  return localStorage.getItem('pixelmojo_chat_engaged') === 'true'
}

/**
 * Mark user as having engaged with chat
 */
export function markAsEngaged(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem('pixelmojo_chat_engaged', 'true')
}

/**
 * Get trigger rules based on page type
 */
export function getTriggerRules(pageType: PageType): TriggerRules {
  const rules: Record<PageType, TriggerRules> = {
    home: {
      pageType: 'home',
      delaySeconds: 30,
      message:
        'Welcome to PixelMojo! 👋 What brings you here today - exploring our services, checking out projects, or looking for something specific?',
      enableExitIntent: true,
      highIntent: false,
    },
    about: {
      pageType: 'about',
      delaySeconds: 20,
      message:
        "Learning about PixelMojo? I'm here to answer any questions about our process, team, or approach!",
      enableExitIntent: false,
      highIntent: false,
    },
    services: {
      pageType: 'services',
      delaySeconds: 20,
      message:
        'Interested in our services? Tell me about your project and I can help you find the right solution!',
      enableExitIntent: true,
      highIntent: true, // High-intent: user exploring solutions
    },
    portfolio: {
      pageType: 'portfolio',
      delaySeconds: 25,
      message:
        "I see you're checking out our work! Like what you see? Want to discuss a similar project for your brand?",
      enableExitIntent: true,
      highIntent: false,
    },
    blog: {
      pageType: 'blog',
      delaySeconds: 30,
      message:
        'Enjoying the article? Have questions about how this applies to your project?',
      enableExitIntent: false,
      highIntent: false,
    },
    pricing: {
      pageType: 'pricing',
      delaySeconds: 15,
      message:
        'Questions about our pricing? I can help you find the right package for your budget and timeline!',
      enableExitIntent: true,
      highIntent: true, // High-intent: user evaluating cost
    },
    contact: {
      pageType: 'contact',
      delaySeconds: 5,
      message:
        "Hi! I'm here to help you get started. What kind of project do you have in mind? Rather chat than fill out a form?",
      enableExitIntent: false,
      highIntent: true, // High-intent: user ready to reach out
    },
    other: {
      pageType: 'other',
      delaySeconds: 30,
      message: 'Hi! 👋 How can I help you today?',
      enableExitIntent: false,
      highIntent: false,
    },
  }

  return rules[pageType]
}

/**
 * Generate context-aware greeting message
 */
export function generateGreeting(context: ChatContext): string {
  const { pageType, serviceName, projectName, blogTopic, isReturnVisitor } =
    context

  // Return visitors get personalized greeting
  if (isReturnVisitor && context.previouslyEngaged) {
    return 'Welcome back! 👋 Did you have more questions about your project?'
  }

  // Context-aware greetings per page type
  switch (pageType) {
    case 'home':
      return 'Welcome to PixelMojo! 👋 What brings you here today?'

    case 'about':
      return "Learning about PixelMojo? I'm here to answer any questions about our process, team, or approach!"

    case 'services':
      if (serviceName) {
        return `Interested in ${serviceName}? Tell me about your project and I can help you find the right solution!`
      }
      return 'Interested in our services? Tell me about your project and I can help!'

    case 'portfolio':
      if (projectName) {
        return `Checking out ${projectName}? Like what you see? Want to discuss something similar for your brand?`
      }
      return "I see you're exploring our work! Like what you see? Want to create something similar?"

    case 'blog':
      if (blogTopic) {
        return `Enjoying the article on ${blogTopic}? Have questions about how this applies to your project?`
      }
      return "Enjoying the article? Have questions about what you're reading?"

    case 'pricing':
      return 'Questions about our pricing? I can help you find the right package for your budget and timeline!'

    case 'contact':
      return "Hi! I'm here to help you get started. What kind of project do you have in mind?"

    default:
      return 'Hi! 👋 How can I help you today?'
  }
}

/**
 * Exit intent detection
 */
export function detectExitIntent(onExitIntent: () => void): () => void {
  if (typeof document === 'undefined') return () => {}

  let triggered = false

  const handleMouseLeave = (e: MouseEvent) => {
    // Check if mouse is leaving from top of viewport
    if (e.clientY <= 0 && !triggered) {
      triggered = true
      onExitIntent()
    }
  }

  document.addEventListener('mouseleave', handleMouseLeave)

  // Return cleanup function
  return () => {
    document.removeEventListener('mouseleave', handleMouseLeave)
  }
}

/**
 * Format context for AI system prompt
 */
export function formatContextForAI(context: ChatContext): string {
  return `
===== CURRENT PAGE CONTEXT =====
- Page Type: ${context.pageType}
- URL: ${context.pageUrl}
- Page Title: ${context.pageTitle}
${context.serviceName ? `- Service: ${context.serviceName}` : ''}
${context.projectName ? `- Project Viewed: ${context.projectName}` : ''}
${context.blogTopic ? `- Blog Topic: ${context.blogTopic}` : ''}
- Time on Page: ${context.timeOnPage} seconds
- Referrer: ${context.referrer}
- Return Visitor: ${context.isReturnVisitor ? 'Yes' : 'No'}
- Previously Engaged: ${context.previouslyEngaged ? 'Yes' : 'No'}
- Device: ${context.isMobile ? 'Mobile' : 'Desktop'}

CONVERSATION APPROACH:
- Reference the current page naturally in your responses
- If on services page, ask about their specific needs for that service
- If on portfolio, ask if they want something similar
- If on blog, connect the topic to potential projects
- If on pricing, help them find the right package
- Be contextual and helpful, not generic
`.trim()
}
