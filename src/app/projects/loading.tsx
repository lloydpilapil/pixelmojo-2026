export default function ProjectsLoading() {
  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='max-w-6xl mx-auto'>
        {/* Header skeleton */}
        <div className='animate-pulse mb-12'>
          <div className='h-12 bg-gray-200 rounded w-1/3 mb-4'></div>
          <div className='h-6 bg-gray-200 rounded w-1/2'></div>
        </div>

        {/* Projects skeleton */}
        <div className='space-y-12'>
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className='grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse'
            >
              {/* Image skeleton */}
              <div className='bg-gray-200 rounded-lg h-64 lg:h-80'></div>

              {/* Content skeleton */}
              <div className='space-y-4'>
                {/* Tags */}
                <div className='flex gap-2'>
                  <div className='h-6 bg-gray-200 rounded w-20'></div>
                  <div className='h-6 bg-gray-200 rounded w-24'></div>
                  <div className='h-6 bg-gray-200 rounded w-16'></div>
                </div>

                {/* Title */}
                <div className='h-8 bg-gray-200 rounded w-4/5'></div>

                {/* Description */}
                <div className='space-y-2'>
                  <div className='h-4 bg-gray-200 rounded w-full'></div>
                  <div className='h-4 bg-gray-200 rounded w-full'></div>
                  <div className='h-4 bg-gray-200 rounded w-full'></div>
                  <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                </div>

                {/* Key features */}
                <div className='space-y-2 pt-4'>
                  <div className='h-4 bg-gray-200 rounded w-full'></div>
                  <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                  <div className='h-4 bg-gray-200 rounded w-4/5'></div>
                </div>

                {/* CTA */}
                <div className='pt-4'>
                  <div className='h-10 bg-gray-200 rounded w-32'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
