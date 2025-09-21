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
          {/* Content First on Mobile */}
          <main>{children}</main>

          {/* TOC on mobile/tablet */}
          {tableOfContents}

          {/* CTA on mobile/tablet */}
          {sidebar && <div>{sidebar}</div>}
        </div>

        {/* Desktop: Dynamic Layout Based on Sidebar */}
        <div
          className={`hidden xl:grid xl:gap-12 ${
            sidebar ? 'xl:grid-cols-12' : 'xl:grid-cols-4'
          }`}
        >
          {/* Left Sidebar - TOC (25% width) */}
          <aside
            className={`xl:sticky xl:self-start ${
              sidebar ? 'xl:col-span-3' : 'xl:col-span-1'
            }`}
            style={{ top: 'calc(var(--anchor-offset) + 1rem)' }}
          >
            {tableOfContents}
          </aside>

          {/* Center Content Area - 75% when no sidebar */}
          <main className={sidebar ? 'xl:col-span-6' : 'xl:col-span-3'}>
            <div className='w-full max-w-none'>{children}</div>
          </main>

          {/* Right Sidebar - CTA (only if present) */}
          {sidebar && (
            <aside
              className='xl:col-span-3 xl:sticky xl:self-start'
              style={{ top: 'calc(var(--anchor-offset) + 1rem)' }}
            >
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPostLayout
