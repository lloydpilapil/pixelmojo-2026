'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service (Sentry in production)
    if (process.env.NODE_ENV === 'production') {
      // TODO: Add Sentry logging
    }
  }, [error])

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='min-h-[60vh] flex items-center justify-center'>
        <div className='text-center max-w-md'>
          <AlertCircle className='h-16 w-16 text-destructive mx-auto mb-4' />
          <h2 className='text-2xl font-bold mb-2'>SEO Dashboard Error</h2>
          <p className='text-muted-foreground mb-6'>
            {error.message ||
              'Something went wrong while loading the SEO dashboard.'}
          </p>
          <div className='flex gap-4 justify-center'>
            <button
              onClick={reset}
              className='px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors'
            >
              Try Again
            </button>
            <a
              href='/admin'
              className='px-6 py-2 border border-border rounded hover:bg-muted transition-colors'
            >
              Back to Admin
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
