/**
 * Loading state for analytics dashboard
 * Displays skeleton loaders matching the actual dashboard layout
 */
export default function Loading() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='w-full space-y-6 animate-pulse'>
        {/* Header Skeleton */}
        <div className='flex items-center justify-between'>
          <div>
            <div className='h-8 bg-muted rounded w-80 mb-2' />
            <div className='h-4 bg-muted rounded w-64' />
          </div>
          <div className='h-10 bg-muted rounded w-40' />
        </div>

        {/* Key Metrics Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='bg-card border border-border p-6 rounded'>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <div className='h-4 bg-muted rounded w-24 mb-2' />
                  <div className='h-10 bg-muted rounded w-16 mb-2' />
                  <div className='h-3 bg-muted rounded w-32' />
                </div>
                <div className='h-12 w-12 bg-muted rounded' />
              </div>
            </div>
          ))}
        </div>

        {/* Conversion Funnel Skeleton */}
        <div className='bg-card border border-border p-6 rounded'>
          <div className='h-7 bg-muted rounded w-48 mb-6' />
          <div className='space-y-4'>
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <div className='flex justify-between items-center mb-2'>
                  <div className='h-4 bg-muted rounded w-64' />
                  <div className='flex items-center gap-4'>
                    <div className='h-6 bg-muted rounded w-12' />
                    <div className='h-6 bg-muted rounded w-16' />
                  </div>
                </div>
                <div className='w-full bg-muted h-3 rounded-full' />
                {i < 4 && <div className='h-4 w-0.5 bg-muted ml-4 my-1' />}
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Grid Skeleton */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-card border border-border p-6 rounded'>
            <div className='h-7 bg-muted rounded w-48 mb-6' />
            <div className='space-y-4'>
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className='flex justify-between items-center mb-2'>
                    <div className='h-4 bg-muted rounded w-32' />
                    <div className='h-6 bg-muted rounded w-12' />
                  </div>
                  <div className='w-full bg-muted h-8 rounded-full' />
                </div>
              ))}
            </div>
          </div>

          <div className='bg-card border border-border p-6 rounded'>
            <div className='h-7 bg-muted rounded w-48 mb-6' />
            <div className='space-y-4'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='flex justify-between items-center'>
                  <div className='h-4 bg-muted rounded w-24' />
                  <div className='h-8 bg-muted rounded w-12' />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid Skeleton */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {[...Array(2)].map((_, i) => (
            <div key={i} className='bg-card border border-border p-6 rounded'>
              <div className='h-7 bg-muted rounded w-40 mb-6' />
              <div className='space-y-3'>
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className='flex justify-between items-center p-3 bg-muted/30 rounded'
                  >
                    <div>
                      <div className='h-5 bg-muted rounded w-32 mb-2' />
                      <div className='h-4 bg-muted rounded w-24' />
                    </div>
                    <div className='h-6 bg-muted rounded w-8' />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Budget Distribution Skeleton */}
        <div className='bg-card border border-border p-6 rounded'>
          <div className='h-7 bg-muted rounded w-56 mb-6' />
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='text-center p-4 bg-muted/30 rounded'>
                <div className='h-4 bg-muted rounded w-20 mx-auto mb-2' />
                <div className='h-10 bg-muted rounded w-12 mx-auto' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
