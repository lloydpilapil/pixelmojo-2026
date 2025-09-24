'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeroVisualProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
  animation?: 'reveal' | 'parallax' | 'ken-burns' | 'none'
  caption?: string
  captionClassName?: string
  variant?: 'full' | 'contained' | 'narrow'
}

export default function HeroVisual({
  src,
  alt,
  priority = false,
  className,
  animation = 'reveal',
  caption,
  captionClassName,
  variant = 'full',
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
  }, [animation])

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
    <figure
      ref={containerRef}
      className={cn(
        'relative mb-16',
        variant === 'full' && 'w-full',
        variant === 'contained' && 'w-full max-w-6xl mx-auto',
        variant === 'narrow' && 'w-full max-w-4xl mx-auto',
        className
      )}
    >
      <div
        className={cn(
          'relative w-full',
          animation === 'reveal' && 'rounded-sm',
          getAnimationClasses()
        )}
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
          width={1920}
          height={960}
          priority={priority}
          className='w-full h-auto'
          sizes='100vw'
          quality={95}
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k='
        />
      </div>
      {caption && (
        <figcaption
          className={cn(
            'mt-4 text-center text-sm text-muted-foreground max-w-6xl mx-auto px-4',
            captionClassName
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
