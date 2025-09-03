'use client'

import React, { useEffect } from 'react'
import TableOfContents from './TableOfContents'
import BlogCTA from './BlogCTA'

interface BlogSidebarProps {
  showTOC?: boolean
  showCTA?: boolean
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaVariant?: 'newsletter' | 'contact' | 'custom'
}

export function BlogSidebar({
  showTOC = true,
  showCTA = true,
  ctaTitle = "Stay Updated",
  ctaDescription = "Get the latest web development insights delivered to your inbox.",
  ctaButtonText = "Subscribe",
  ctaVariant = "newsletter"
}: BlogSidebarProps) {
  useEffect(() => {
    // Find the BlogPostLayout and inject sidebar content
    const blogLayout = document.querySelector('[data-blog-layout]')
    const leftSidebar = document.querySelector('[data-left-sidebar]')
    const rightSidebar = document.querySelector('[data-right-sidebar]')
    
    if (!blogLayout || !leftSidebar || !rightSidebar) return

    // Show the layout
    blogLayout.classList.remove('hidden')
    blogLayout.classList.add('xl:grid')

    // Inject TOC into left sidebar
    if (showTOC && leftSidebar) {
      const tocContainer = leftSidebar.querySelector('[data-toc-container]')
      if (tocContainer && !tocContainer.hasChildNodes()) {
        // TOC will be rendered by React, we just need to show the container
        (leftSidebar as HTMLElement).style.display = 'block'
      }
    }

    // Inject CTA into right sidebar  
    if (showCTA && rightSidebar) {
      const ctaContainer = rightSidebar.querySelector('[data-cta-container]')
      if (ctaContainer && !ctaContainer.hasChildNodes()) {
        // CTA will be rendered by React, we just need to show the container
        (rightSidebar as HTMLElement).style.display = 'block'
      }
    }
  }, [showTOC, showCTA])

  // This component doesn't render anything visible - it just configures the layout
  return (
    <>
      {/* Hidden elements that will be moved to sidebars by the effect */}
      <div id="toc-content" style={{ display: 'none' }}>
        {showTOC && <TableOfContents headings={[]} />}
      </div>
      <div id="cta-content" style={{ display: 'none' }}>
        {showCTA && (
          <BlogCTA
            title={ctaTitle}
            description={ctaDescription}
            buttonText={ctaButtonText}
            variant={ctaVariant}
          />
        )}
      </div>
    </>
  )
}

export default BlogSidebar