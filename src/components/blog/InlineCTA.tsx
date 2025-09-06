'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface InlineCTAProps {
  title: string
  description: string
  primaryButton: {
    text: string
  }
  backgroundImage?: string
  className?: string
}

export default function InlineCTA({
  title,
  description,
  primaryButton,
  backgroundImage = '/placeholder.svg',
  className = '',
}: InlineCTAProps) {
  const router = useRouter()

  return (
    <section
      className={`relative rounded-2xl overflow-hidden my-12 min-h-[400px] bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent' />

      {/* Content */}
      <div className='relative z-10 px-8 py-16 md:px-16 md:py-20'>
        <h3
          className='text-white text-3xl md:text-4xl font-bold mb-4'
          style={{ color: '#FFFFFF' }}
        >
          {title}
        </h3>

        <p
          className='text-white text-lg md:text-xl mb-8 max-w-2xl'
          style={{ color: '#FFFFFF' }}
        >
          {description}
        </p>

        <Button
          variant='default'
          shape='pill'
          size='lg'
          onClick={() => router.push('/contact-us')}
        >
          {primaryButton.text}
        </Button>
      </div>
    </section>
  )
}
