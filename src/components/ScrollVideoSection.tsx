'use client'

import { useEffect, useRef, useState } from 'react'
import VideoPlayer from './VideoPlayer'

interface ScrollVideoSectionProps {
  videoId: string
  coverImage?: string
  className?: string
}

export default function ScrollVideoSection({
  videoId,
  coverImage,
  className = '',
}: ScrollVideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.8)
  const [opacity, setOpacity] = useState(0)
  const [shouldAutoplay, setShouldAutoplay] = useState(false)
  const [hasAutoplayed, setHasAutoplayed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !videoRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate visibility percentage
      const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
      const sectionHeight = rect.height
      const visibilityRatio = Math.max(
        0,
        Math.min(1, visibleHeight / sectionHeight)
      )

      // Calculate scale based on scroll position
      // Start at 0.8 scale and grow to 1.0 as it enters viewport
      const scrollProgress = 1 - rect.top / windowHeight
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress))

      // Smooth scaling from 0.8 to 1.0
      const newScale = 0.8 + 0.2 * clampedProgress
      setScale(newScale)

      // Smooth opacity from 0 to 1
      setOpacity(clampedProgress)

      // Trigger autoplay when video is 50% visible and hasn't autoplayed yet
      if (visibilityRatio > 0.5 && !hasAutoplayed && !shouldAutoplay) {
        setShouldAutoplay(true)
        setHasAutoplayed(true)
      }

      // Optional: pause when out of view (if you want to implement pause functionality)
      if (visibilityRatio < 0.2 && hasAutoplayed) {
        // Could trigger pause here if needed
      }
    }

    // Initial check
    handleScroll()

    // Add scroll listener with throttling
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', scrollListener)
      window.removeEventListener('resize', handleScroll)
    }
  }, [hasAutoplayed, shouldAutoplay])

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-16 md:py-24 ${className}`}
    >
      {/* Background gradient for dramatic effect */}
      <div
        className='absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent pointer-events-none'
        style={{
          opacity: opacity * 0.3,
        }}
      />

      {/* Video Container */}
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Video with scaling animation */}
        <div
          ref={videoRef}
          className='transform-gpu transition-all duration-700 ease-out'
          style={{
            transform: `scale(${scale})`,
            opacity: opacity,
            transformOrigin: 'center center',
          }}
        >
          {/* Video Player with subtle shadow */}
          <div
            className='relative rounded-2xl overflow-hidden transition-all duration-700'
            style={{
              boxShadow: `0 ${8 + 12 * opacity}px ${16 + 24 * opacity}px -${4 - 2 * opacity}px rgba(0, 0, 0, ${0.06 + 0.08 * opacity})`,
            }}
          >
            <VideoPlayer
              videoId={videoId}
              coverImage={coverImage}
              className='w-full'
              autoplay={shouldAutoplay}
            />
          </div>

          {/* Optional: Add floating elements that parallax */}
          <div
            className='absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl'
            style={{
              transform: `translateY(${-30 * (1 - opacity)}px)`,
              opacity: opacity * 0.5,
            }}
          />
          <div
            className='absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl'
            style={{
              transform: `translateY(${30 * (1 - opacity)}px)`,
              opacity: opacity * 0.5,
            }}
          />
        </div>
      </div>
    </section>
  )
}
