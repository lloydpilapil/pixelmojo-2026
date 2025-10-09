/**
 * Loading state for services pages
 * Displays while service content is being fetched
 */
export default function ServicesLoading() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Skeleton */}
      <div className='relative bg-gradient-to-br from-gray-50 to-white py-20 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='space-y-6 animate-pulse'>
            {/* Breadcrumb skeleton */}
            <div className='h-4 bg-gray-200 rounded w-48'></div>

            {/* Title skeleton */}
            <div className='h-12 bg-gray-300 rounded w-3/4 max-w-2xl'></div>

            {/* Description skeleton */}
            <div className='space-y-3 max-w-3xl'>
              <div className='h-4 bg-gray-200 rounded w-full'></div>
              <div className='h-4 bg-gray-200 rounded w-5/6'></div>
            </div>

            {/* CTA skeleton */}
            <div className='h-12 bg-gray-300 rounded w-48 mt-8'></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='space-y-4'>
              {/* Icon skeleton */}
              <div className='h-12 w-12 bg-gray-300 rounded-lg'></div>

              {/* Title skeleton */}
              <div className='h-6 bg-gray-300 rounded w-3/4'></div>

              {/* Description skeleton */}
              <div className='space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                <div className='h-4 bg-gray-200 rounded w-4/6'></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Skeleton */}
      <div className='bg-gray-50 py-16 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='space-y-12 animate-pulse'>
            {/* Section title */}
            <div className='h-10 bg-gray-300 rounded w-64 mx-auto'></div>

            {/* Feature cards */}
            <div className='grid md:grid-cols-2 gap-8'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className='bg-white p-8 rounded-2xl space-y-4'>
                  <div className='h-6 bg-gray-300 rounded w-2/3'></div>
                  <div className='space-y-2'>
                    <div className='h-4 bg-gray-200 rounded w-full'></div>
                    <div className='h-4 bg-gray-200 rounded w-4/5'></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <div className='fixed bottom-8 right-8'>
        <div className='relative w-12 h-12'>
          <div className='absolute inset-0 rounded-full border-4 border-gray-200'></div>
          <div className='absolute inset-0 rounded-full border-4 border-[#F90B8A] border-t-transparent animate-spin'></div>
        </div>
      </div>
    </div>
  )
}
