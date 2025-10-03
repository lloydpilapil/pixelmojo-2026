'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <div className='flex min-h-screen flex-col items-center justify-center p-8'>
          <div className='max-w-2xl text-center'>
            <h2 className='mb-4 text-4xl font-bold'>Something went wrong!</h2>
            <p className='mb-8 text-lg text-gray-600'>
              An error has been logged to Sentry.
            </p>
            <button
              className='rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700'
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
