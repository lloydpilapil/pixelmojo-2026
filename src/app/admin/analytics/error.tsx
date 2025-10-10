'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

/**
 * Error boundary for analytics dashboard
 * Provides user-friendly error display with retry option
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error('[Analytics Error]:', error)
  }, [error])

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <div className='text-center max-w-md'>
          {/* Error Icon */}
          <div className='inline-flex items-center justify-center w-20 h-20 bg-destructive/10 rounded-full mb-6'>
            <AlertCircle className='h-10 w-10 text-destructive' />
          </div>

          {/* Error Message */}
          <h2 className='text-3xl font-bold mb-4'>Failed to Load Analytics</h2>

          <p className='text-muted-foreground mb-2'>
            We encountered an error while loading the analytics dashboard.
          </p>

          {/* Technical Details (optional, can be hidden in production) */}
          {process.env.NODE_ENV === 'development' && (
            <details className='mt-4 p-4 bg-muted rounded text-left'>
              <summary className='cursor-pointer text-sm font-medium mb-2'>
                Technical Details
              </summary>
              <pre className='text-xs text-muted-foreground overflow-auto'>
                {error.message}
              </pre>
              {error.digest && (
                <p className='text-xs text-muted-foreground mt-2'>
                  Error ID: {error.digest}
                </p>
              )}
            </details>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 justify-center mt-8'>
            <button
              onClick={reset}
              className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium'
            >
              <RefreshCw className='h-4 w-4' />
              Try Again
            </button>

            <button
              onClick={() => (window.location.href = '/admin')}
              className='inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium'
            >
              Go to Dashboard
            </button>
          </div>

          {/* Helpful Tips */}
          <div className='mt-8 p-4 bg-muted/50 rounded-lg'>
            <p className='text-sm text-muted-foreground'>
              <strong>Possible causes:</strong>
            </p>
            <ul className='text-sm text-muted-foreground list-disc list-inside mt-2 text-left'>
              <li>Network connection issue</li>
              <li>Database query timeout</li>
              <li>Invalid authentication</li>
              <li>Server temporarily unavailable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
