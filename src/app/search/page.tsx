'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { useSearch } from '@/hooks/useSearch'
import { getCategoryLabel } from '@/lib/search-index'

function SearchContent() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get('q') || ''
  const { query, setQuery, allResults, isSearching } = useSearch()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (queryParam) {
      setQuery(queryParam)
    }
  }, [queryParam, setQuery])

  if (!mounted) {
    return (
      <div className='min-h-screen bg-background'>
        <div className='container mx-auto px-4 py-12'>
          <div className='max-w-4xl mx-auto'>
            <div className='animate-pulse'>
              <div className='h-12 bg-muted rounded-lg mb-8' />
              <div className='space-y-4'>
                {[1, 2, 3].map(i => (
                  <div key={i} className='h-24 bg-muted rounded-lg' />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='border-b border-border bg-card'>
        <div className='container mx-auto px-4 py-6'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Home
          </Link>
          <div className='max-w-3xl'>
            <h1 className='mb-4'>Search</h1>
            <div className='relative'>
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
              <input
                type='text'
                placeholder='Search blog posts, projects, services...'
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
                className='w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-3xl mx-auto'>
          {isSearching ? (
            allResults.length > 0 ? (
              <div>
                <p className='text-muted-foreground mb-6'>
                  Found {allResults.length} result
                  {allResults.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
                </p>
                <div className='space-y-4'>
                  {allResults.map(item => (
                    <Link
                      key={item.id}
                      href={item.url}
                      className='block group p-6 rounded-lg border border-border hover:border-primary bg-card hover:shadow-lg transition-all'
                    >
                      <div className='flex items-start justify-between gap-4 mb-2'>
                        <h3 className='text-lg font-semibold group-hover:text-primary transition-colors'>
                          {item.title}
                        </h3>
                        <span className='text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground whitespace-nowrap'>
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>
                      <p className='text-muted-foreground text-sm'>
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className='text-center py-12'>
                <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4'>
                  <Search className='w-8 h-8 text-muted-foreground' />
                </div>
                <h2 className='text-xl font-semibold mb-2'>No results found</h2>
                <p className='text-muted-foreground'>
                  We couldn&apos;t find anything matching &ldquo;{query}&rdquo;
                  <br />
                  Try different keywords or browse our content below.
                </p>
                <div className='mt-8 flex flex-wrap gap-3 justify-center'>
                  <Link
                    href='/blogs'
                    className='px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all'
                  >
                    Browse Blogs
                  </Link>
                  <Link
                    href='/projects'
                    className='px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all'
                  >
                    View Projects
                  </Link>
                  <Link
                    href='/services'
                    className='px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all'
                  >
                    Our Services
                  </Link>
                </div>
              </div>
            )
          ) : (
            <div className='text-center py-12 text-muted-foreground'>
              <p>Start typing to search across all content...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-background'>
          <div className='container mx-auto px-4 py-12'>
            <div className='max-w-4xl mx-auto'>
              <div className='animate-pulse'>
                <div className='h-12 bg-muted rounded-lg mb-8' />
                <div className='space-y-4'>
                  {[1, 2, 3].map(i => (
                    <div key={i} className='h-24 bg-muted rounded-lg' />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
