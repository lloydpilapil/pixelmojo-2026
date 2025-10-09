'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import Link from 'next/link'

/**
 * Error boundary for services pages
 * Catches errors and displays a branded error page with recovery options
 */
export default function ServicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error)
    console.error('Services page error:', error)
  }, [error])

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-6'>
      <div className='max-w-2xl mx-auto text-center space-y-8'>
        {/* Error Icon */}
        <div className='relative mx-auto w-24 h-24'>
          <div className='absolute inset-0 bg-red-100 rounded-full'></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <svg
              className='w-12 h-12 text-red-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className='space-y-4'>
          <h1 className='text-4xl font-bold text-gray-900'>
            Oops! Something went wrong
          </h1>
          <p className='text-lg text-gray-600'>
            We encountered an error while loading our services. Don&apos;t
            worry, our team has been notified.
          </p>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className='bg-red-50 border border-red-200 rounded-xl p-6 text-left'>
            <h3 className='text-sm font-semibold text-red-900 mb-2'>
              Error Details (Development Only):
            </h3>
            <pre className='text-xs text-red-800 overflow-auto max-h-48 font-mono'>
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
          <button
            onClick={reset}
            className='px-8 py-4 bg-[#F90B8A] text-white font-semibold rounded-xl hover:bg-[#d9097a] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          >
            Try Again
          </button>

          <Link
            href='/services'
            className='px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5'
          >
            All Services
          </Link>

          <Link
            href='/'
            className='px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5'
          >
            Go Home
          </Link>
        </div>

        {/* Help Text */}
        <p className='text-sm text-gray-500 pt-8'>
          Still having issues?{' '}
          <Link
            href='/contact-us'
            className='text-[#F90B8A] hover:underline font-medium'
          >
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  )
}
