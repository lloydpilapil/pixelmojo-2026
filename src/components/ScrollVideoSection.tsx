'use client'

import { useEffect, useId, useRef, useState } from 'react'
import VideoPlayer from './VideoPlayer'

interface ScrollVideoSectionProps {
  videoId: string
  coverImage?: string
  className?: string
  caption?: string
}

export default function ScrollVideoSection({
  videoId,
  coverImage,
  className = '',
  caption = 'Pixelmojo project reel highlighting integrated strategy, design, and engineering partnerships.',
}: ScrollVideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.8)
  const [opacity, setOpacity] = useState(1)
  const [shouldAutoplay, setShouldAutoplay] = useState(false)
  const [hasAutoplayed, setHasAutoplayed] = useState(false)
  const [videoStyle, setVideoStyle] = useState<React.CSSProperties>({})
  const [isMobile, setIsMobile] = useState(false)
  const captionId = useId()

  useEffect(() => {
    // Calculate video size to fit viewport with navbar
    const calculateVideoSize = () => {
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isSmallScreen)

      const navbarHeight = 64 // h-16 in Tailwind = 4rem = 64px
      const padding = isSmallScreen ? 24 : 48 // Allow more breathing room on desktop
      const availableHeight = window.innerHeight - navbarHeight - padding
      const maxWidth = isSmallScreen
        ? window.innerWidth
        : window.innerWidth * 0.9

      // Video aspect ratio is 16:9
      const aspectRatio = 16 / 9

      // Calculate dimensions that fit within available space
      let width = maxWidth
      let height = width / aspectRatio

      // If height exceeds available space, scale down
      if (height > availableHeight) {
        height = availableHeight
        width = height * aspectRatio
      }

      setVideoStyle({
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
        width: '100%',
        aspectRatio: '16/9',
      })

      setScale(isSmallScreen ? 1 : 0.8)
    }

    calculateVideoSize()
    window.addEventListener('resize', calculateVideoSize)

    return () => {
      window.removeEventListener('resize', calculateVideoSize)
    }
  }, [])

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
      const minScale = isMobile ? 1 : 0.8
      const maxScale = 1
      const newScale = minScale + (maxScale - minScale) * clampedProgress
      setScale(newScale)

      // Smooth opacity from 0 to 1
      setOpacity(1)

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
  }, [hasAutoplayed, shouldAutoplay, isMobile])

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-16 md:py-24 ${className}`}
      aria-labelledby={captionId}
    >
      {/* Background gradient for dramatic effect */}
      <div
        className='absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent pointer-events-none'
        style={{
          opacity: opacity * 0.3,
        }}
      />

      <figure className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Video with scaling animation and dynamic sizing */}
        <div
          ref={videoRef}
          className='transform-gpu transition-all duration-700 ease-out mx-auto'
          style={{
            transform: `scale(${scale})`,
            opacity: opacity,
            transformOrigin: 'center center',
            ...videoStyle,
          }}
        >
          {/* Video Player with subtle shadow */}
          <div
            className='relative w-full h-full overflow-hidden rounded-2xl transition-all duration-700'
            style={{
              boxShadow: isMobile
                ? `0 10px 26px rgba(0, 0, 0, 0.18)`
                : `0 ${8 + 12 * opacity}px ${16 + 24 * opacity}px -${4 - 2 * opacity}px rgba(0, 0, 0, ${0.06 + 0.08 * opacity})`,
            }}
          >
            <VideoPlayer
              videoId={videoId}
              coverImage={coverImage}
              className='w-full'
              autoplay={shouldAutoplay}
              ariaDescribedBy={captionId}
            />
          </div>

          {/* Optional: Add floating elements that parallax */}
          <div
            className='absolute -top-10 -left-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl'
            style={{
              transform: `translateY(${-30 * (1 - opacity)}px)`,
              opacity: opacity * 0.5,
            }}
          />
          <div
            className='absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-secondary/10 blur-3xl'
            style={{
              transform: `translateY(${30 * (1 - opacity)}px)`,
              opacity: opacity * 0.5,
            }}
          />
        </div>
        <figcaption
          id={captionId}
          className='mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground md:text-base'
        >
          {caption}
        </figcaption>
      </figure>
    </section>
  )
}
