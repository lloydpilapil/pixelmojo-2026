'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeroVisualProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
  aspectRatio?: 'video' | 'square' | 'wide'
  animation?: 'reveal' | 'parallax' | 'ken-burns' | 'none'
}

const aspectRatios = {
  video: 'aspect-video',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
}

export default function HeroVisual({
  src,
  alt,
  priority = false,
  className,
  aspectRatio = 'video',
  animation = 'reveal',
}: HeroVisualProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger reveal animation on mount
    if (animation === 'reveal' || animation === 'ken-burns') {
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    if (animation !== 'parallax') return

    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const speed = 0.5
      const yPos = rect.top * speed
      setParallaxOffset(yPos)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [animation])

  const getAnimationClasses = () => {
    switch (animation) {
      case 'reveal':
        return cn(
          'transition-all duration-1000 ease-out',
          isVisible
            ? 'opacity-100 scale-100 blur-0'
            : 'opacity-0 scale-95 blur-sm'
        )
      case 'ken-burns':
        return cn(
          'transition-all duration-[20s] ease-out',
          isVisible ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
        )
      case 'parallax':
        return 'will-change-transform'
      default:
        return ''
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full mb-16 overflow-hidden', className)}
    >
      <div className='relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] max-w-none'>
        <div
          className={cn(
            'relative w-full overflow-hidden',
            aspectRatios[aspectRatio],
            animation === 'reveal' && 'rounded-sm'
          )}
        >
          <div
            className={cn('absolute inset-0', getAnimationClasses())}
            style={{
              transform:
                animation === 'parallax'
                  ? `translateY(${parallaxOffset}px)`
                  : undefined,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className='object-cover w-full h-full'
              sizes='100vw'
              placeholder='blur'
              blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k='
            />
          </div>
        </div>
      </div>
    </div>
  )
}
