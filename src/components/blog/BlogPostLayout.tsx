import React from 'react'
import { cn } from '@/lib/utils'

interface BlogPostLayoutProps {
  children: React.ReactNode
  tableOfContents?: React.ReactNode
  sidebar?: React.ReactNode
  className?: string
}

export function BlogPostLayout({
  children,
  tableOfContents,
  sidebar,
  className,
}: BlogPostLayoutProps) {
  return (
    <div className={cn('w-full px-4 py-8', className)}>
      <div className='max-w-full mx-auto px-4'>
        {/* Mobile/Tablet: Stacked Layout */}
        <div className='xl:hidden max-w-4xl mx-auto space-y-8'>
          {tableOfContents}
          <main className='blog-content'>{children}</main>
          {sidebar && <div>{sidebar}</div>}
        </div>

        {/* Desktop: CSS Grid Layout */}
        <div className='hidden xl:block'>
          <div className='blog-layout'>
            {/* TOC Sidebar - 25% width */}
            <aside
              className='sticky self-start'
              style={{ top: 'calc(var(--anchor-offset) + 1rem)' }}
            >
              {tableOfContents}
            </aside>

            {/* Main Content - 75% width */}
            <main className='blog-content'>
              {children}

              {/* Sidebar content flows with main content */}
              {sidebar && <div className='mt-12'>{sidebar}</div>}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostLayout
