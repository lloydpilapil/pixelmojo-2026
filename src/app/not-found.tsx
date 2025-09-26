import Image from 'next/image'
import { LinkButton } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='container mx-auto max-w-3xl text-center'>
        {/* 404 Image */}
        <div className='mb-2 flex justify-center'>
          <Image
            src='/404-page.webp'
            alt='Page not found illustration'
            width={800}
            height={600}
            className='w-full max-w-4xl h-auto'
            priority
          />
        </div>

        {/* Error Content */}
        <div className='space-y-6'>
          <h1 className='text-4xl md:text-5xl font-heading text-gray-900'>
            Oops! This page seems to be missing.
          </h1>

          <p className='text-lg md:text-xl text-muted leading-relaxed max-w-3xl mx-auto'>
            This page doesn't exist, but we've got plenty more to explore!
          </p>

          <div className='pt-4'>
            <LinkButton
              href='/'
              variant='default'
              size='lg'
              shape='pill'
              className='min-w-[160px]'
            >
              Return Home
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
