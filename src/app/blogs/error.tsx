'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BlogsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Blogs error:', error)
  }, [error])

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='max-w-2xl mx-auto text-center space-y-6'>
        {/* Icon */}
        <div className='mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center'>
          <svg
            className='w-8 h-8 text-red-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>

        {/* Content */}
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Failed to load blog posts
          </h2>
          <p className='text-gray-600'>
            We couldn't load the blog posts. This might be a temporary issue.
            Please try again.
          </p>
        </div>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button onClick={reset} variant='default'>
            Try Again
          </Button>
          <Button asChild variant='outline'>
            <Link href='/'>Go Home</Link>
          </Button>
        </div>

        {/* Dev-only error details */}
        {process.env.NODE_ENV === 'development' && (
          <details className='mt-8 text-left'>
            <summary className='cursor-pointer text-sm text-gray-500 hover:text-gray-700'>
              Error Details (Development Only)
            </summary>
            <pre className='mt-2 text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-auto max-h-48'>
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
