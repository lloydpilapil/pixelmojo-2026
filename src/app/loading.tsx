export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center space-y-4'>
        {/* Animated spinner */}
        <div className='relative mx-auto w-16 h-16'>
          <div className='absolute inset-0 rounded-full border-4 border-gray-200'></div>
          <div className='absolute inset-0 rounded-full border-4 border-[#F90B8A] border-t-transparent animate-spin'></div>
        </div>
        <p className='text-gray-600 font-medium'>Loading...</p>
      </div>
    </div>
  )
}
