'use client'

import { usePathname } from 'next/navigation'
import RecentArticles from './RecentArticles'
import { getServiceTheme, getServiceTitleFromSlug } from '@/utils/serviceThemes'

const ConditionalRecentArticles = () => {
  const pathname = usePathname()

  // Don't show RecentArticles on these pages
  const shouldHideRecentArticles =
    pathname === '/' ||
    pathname.startsWith('/blog') ||
    pathname.includes('/contact') ||
    pathname.includes('/thank-you') ||
    pathname.includes('/404') ||
    pathname.includes('/500')

  if (shouldHideRecentArticles) {
    return null
  }

  // Check if we're on a service page and get the theme
  const isServicePage =
    pathname.startsWith('/services/') && pathname !== '/services'
  let theme = null

  if (isServicePage) {
    const serviceSlug = pathname.split('/services/')[1]?.split('/')[0]
    if (serviceSlug) {
      const serviceTitle = getServiceTitleFromSlug(serviceSlug)
      theme = getServiceTheme(serviceTitle)
    }
  }

  return <RecentArticles theme={theme} />
}

export default ConditionalRecentArticles
