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
        "Hey! 👋 I'm here to help you explore how AI-native design can accelerate your product.\n\nWhat's the biggest challenge you're facing right now?",
      enableExitIntent: true,
      highIntent: false,
    },
    about: {
      pageType: 'about',
      delaySeconds: 20,
      message:
        'Hi there! 👋 Learning about how we work?\n\nWhat made you curious about PixelMojo?',
      enableExitIntent: false,
      highIntent: false,
    },
    services: {
      pageType: 'services',
      delaySeconds: 20,
      message:
        'Hey! 👋 Exploring our services?\n\nWhat problem are you trying to solve?',
      enableExitIntent: true,
      highIntent: true, // High-intent: user exploring solutions
    },
    portfolio: {
      pageType: 'portfolio',
      delaySeconds: 25,
      message:
        "Hey! 👋 Checking out our work?\n\nWhich project caught your eye, or is there a specific industry/type you're interested in?",
      enableExitIntent: true,
      highIntent: false,
    },
    blog: {
      pageType: 'blog',
      delaySeconds: 30,
      message:
        "Hi! 👋 Enjoying the article?\n\nAnything you'd like to explore further?",
      enableExitIntent: false,
      highIntent: false,
    },
    pricing: {
      pageType: 'pricing',
      delaySeconds: 15,
      message:
        'Hi! 👋 Exploring pricing options?\n\nWhat type of project are you planning - MVP, branding, growth system, or something else?',
      enableExitIntent: true,
      highIntent: true, // High-intent: user evaluating cost
    },
    contact: {
      pageType: 'contact',
      delaySeconds: 5,
      message:
        "Hey! 👋 Ready to chat about your project?\n\nWhat's driving this conversation right now - is it an upcoming launch, competitor pressure, or something else?",
      enableExitIntent: false,
      highIntent: true, // High-intent: user ready to reach out
    },
    other: {
      pageType: 'other',
      delaySeconds: 30,
      message: 'Welcome to PixelMojo! 👋\n\nWhat brings you here today?',
      enableExitIntent: false,
      highIntent: false,
    },
  }

  return rules[pageType]
}

/**
 * Generate context-aware greeting message
 * New consultative approach: Short, page-aware, single calibrated question
 */
export function generateGreeting(context: ChatContext): string {
  const { pageType, serviceName, projectName, blogTopic, isReturnVisitor } =
    context

  // Return visitors get personalized greeting
  if (isReturnVisitor && context.previouslyEngaged) {
    return 'Welcome back! 👋\n\nDid you have more questions about your project?'
  }

  // Context-aware greetings per page type (consultative, not menu-driven)
  switch (pageType) {
    case 'home':
      return "Hey! 👋 I'm here to help you explore how AI-native design can accelerate your product.\n\nWhat's the biggest challenge you're facing right now?"

    case 'about':
      return 'Hi there! 👋 Learning about how we work?\n\nWhat made you curious about PixelMojo?'

    case 'services':
      if (serviceName) {
        return `Hey! 👋 Interested in ${serviceName}?\n\nWhat problem are you trying to solve with this?`
      }
      return 'Hey! 👋 Exploring our services?\n\nWhat problem are you trying to solve with this?'

    case 'portfolio':
      if (projectName) {
        return `Hey! 👋 Checking out ${projectName}?\n\nWhich aspect of this project caught your eye?`
      }
      return "Hey! 👋 Checking out our work?\n\nWhich project caught your eye, or is there a specific industry/type you're interested in?"

    case 'blog':
      if (blogTopic) {
        return `Hi! 👋 Enjoying the article?\n\nAnything about ${blogTopic} you'd like to explore further?`
      }
      return "Hi! 👋 Enjoying the article?\n\nAnything you'd like to explore further?"

    case 'pricing':
      return 'Hi! 👋 Exploring pricing options?\n\nWhat type of project are you planning - MVP, branding, growth system, or something else?'

    case 'contact':
      return "Hey! 👋 Ready to chat about your project?\n\nWhat's driving this conversation right now - is it an upcoming launch, competitor pressure, or something else?"

    default:
      return 'Welcome to PixelMojo! 👋\n\nWhat brings you here today?'
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
