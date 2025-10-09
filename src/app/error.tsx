'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import * as Sentry from '@sentry/nextjs'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to Sentry
    Sentry.captureException(error)
    console.error('Root error:', error)
  }, [error])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50'>
      <div className='max-w-md text-center space-y-6'>
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
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
        </div>

        {/* Content */}
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Oops! Something went wrong
          </h1>
          <p className='text-gray-600'>
            We're sorry, but something unexpected happened. Please try again.
          </p>
        </div>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button onClick={reset} variant='default'>
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            variant='outline'
          >
            Go Home
          </Button>
        </div>

        {/* Dev-only error details */}
        {process.env.NODE_ENV === 'development' && (
          <details className='mt-8 text-left'>
            <summary className='cursor-pointer text-sm text-gray-500 hover:text-gray-700'>
              Error Details (Development Only)
            </summary>
            <pre className='mt-2 text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-auto max-h-64'>
              {error.message}
              {'\n\n'}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
