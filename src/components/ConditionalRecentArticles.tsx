'use client'

import { usePathname } from 'next/navigation'
import RecentArticles from './RecentArticles'

const ConditionalRecentArticles = () => {
  const pathname = usePathname()

  // Don't show RecentArticles on these pages
  const shouldHideRecentArticles =
    pathname.startsWith('/blog') ||
    pathname.includes('/contact') ||
    pathname.includes('/thank-you') ||
    pathname.includes('/404') ||
    pathname.includes('/500')

  if (shouldHideRecentArticles) {
    return null
  }

  return <RecentArticles />
}

export default ConditionalRecentArticles
