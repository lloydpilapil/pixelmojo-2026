export default function BlogsLoading() {
  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='max-w-6xl mx-auto'>
        {/* Header skeleton */}
        <div className='animate-pulse mb-12'>
          <div className='h-12 bg-gray-200 rounded w-1/3 mb-4'></div>
          <div className='h-6 bg-gray-200 rounded w-1/2'></div>
        </div>

        {/* Blog posts skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className='animate-pulse'>
              {/* Image skeleton */}
              <div className='bg-gray-200 rounded-lg h-48 mb-4'></div>

              {/* Content skeleton */}
              <div className='space-y-3'>
                {/* Tags */}
                <div className='flex gap-2'>
                  <div className='h-6 bg-gray-200 rounded w-16'></div>
                  <div className='h-6 bg-gray-200 rounded w-20'></div>
                </div>

                {/* Title */}
                <div className='h-6 bg-gray-200 rounded w-full'></div>
                <div className='h-6 bg-gray-200 rounded w-4/5'></div>

                {/* Excerpt */}
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>

                {/* Meta */}
                <div className='flex items-center gap-4 pt-4'>
                  <div className='h-4 bg-gray-200 rounded w-24'></div>
                  <div className='h-4 bg-gray-200 rounded w-20'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
