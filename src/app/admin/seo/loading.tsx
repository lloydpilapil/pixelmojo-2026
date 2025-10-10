export default function Loading() {
  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='w-full space-y-6'>
        {/* Header Skeleton */}
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <div className='h-8 w-64 bg-muted animate-pulse rounded' />
            <div className='h-4 w-48 bg-muted animate-pulse rounded' />
          </div>
          <div className='flex items-center gap-4'>
            <div className='h-10 w-32 bg-muted animate-pulse rounded' />
            <div className='h-10 w-40 bg-muted animate-pulse rounded' />
          </div>
        </div>

        {/* Metrics Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='bg-card border border-border p-6'>
              <div className='space-y-3'>
                <div className='h-4 w-24 bg-muted animate-pulse rounded' />
                <div className='h-8 w-16 bg-muted animate-pulse rounded' />
                <div className='h-3 w-20 bg-muted animate-pulse rounded' />
              </div>
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {[...Array(2)].map((_, i) => (
            <div key={i} className='bg-card border border-border p-6'>
              <div className='h-6 w-32 bg-muted animate-pulse rounded mb-4' />
              <div className='space-y-3'>
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className='h-16 bg-muted/30 animate-pulse rounded'
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Queries Skeleton */}
        <div className='bg-card border border-border p-6'>
          <div className='h-6 w-40 bg-muted animate-pulse rounded mb-4' />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {[...Array(10)].map((_, i) => (
              <div key={i} className='h-16 bg-muted/30 animate-pulse rounded' />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
