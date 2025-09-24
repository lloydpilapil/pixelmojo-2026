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
  const isServicesOverview = pathname === '/services'
  let theme = null

  if (isServicePage) {
    const serviceSlug = pathname.split('/services/')[1]?.split('/')[0]
    if (serviceSlug) {
      const serviceTitle = getServiceTitleFromSlug(serviceSlug)
      theme = getServiceTheme(serviceTitle)
    }
  }

  // Add footer image for services overview page
  const footerImageProps = isServicesOverview
    ? {
        footerImage: '/pixelmojo-services-footer-image.webp',
        footerImageAlt:
          'Pixelmojo services overview - comprehensive AI product development solutions',
      }
    : {}

  return <RecentArticles theme={theme} {...footerImageProps} />
}

export default ConditionalRecentArticles
