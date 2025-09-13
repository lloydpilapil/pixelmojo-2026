'use client'

import { useState, useEffect, useRef } from 'react'

interface VideoPlayerProps {
  videoId: string
  coverImage?: string
  className?: string
  autoplay?: boolean
  autoplayThreshold?: number // Percentage of element visible before autoplay (0.0 - 1.0)
}

export default function VideoPlayer({
  videoId,
  coverImage = '/video-cover-02.webp',
  className = '',
  autoplay = false,
  autoplayThreshold = 0.5, // Autoplay when 50% of video is visible
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false) // Don't autoplay immediately
  const [, setPlayer] = useState<any>(null)
  const [hasAutoplayed, setHasAutoplayed] = useState(false) // Track if we've already autoplayed
  const [isPreloaded, setIsPreloaded] = useState(false) // Track if iframe is preloaded
  const containerRef = useRef<HTMLDivElement>(null)

  // Load Vimeo Player API and setup preloading
  useEffect(() => {
    // DNS prefetch for faster connection
    const dnsPrefetch = document.createElement('link')
    dnsPrefetch.rel = 'dns-prefetch'
    dnsPrefetch.href = '//player.vimeo.com'
    document.head.appendChild(dnsPrefetch)

    // Preconnect for even faster loading
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://player.vimeo.com'
    document.head.appendChild(preconnect)

    // Load Vimeo Player API
    const script = document.createElement('script')
    script.src = 'https://player.vimeo.com/api/player.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      if (document.head.contains(dnsPrefetch)) {
        document.head.removeChild(dnsPrefetch)
      }
      if (document.head.contains(preconnect)) {
        document.head.removeChild(preconnect)
      }
    }
  }, [])

  // Preload iframe after component mounts (delayed to not block hero)
  useEffect(() => {
    if (autoplay) {
      const preloadTimer = setTimeout(() => {
        setIsPreloaded(true)
      }, 2000) // Wait 2 seconds after mount to preload

      return () => clearTimeout(preloadTimer)
    }
  }, [autoplay])

  // Intersection Observer for viewport detection
  useEffect(() => {
    if (!autoplay || !containerRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Check if element is entering viewport and we haven't autoplayed yet
          if (entry.isIntersecting && !hasAutoplayed && !isPlaying) {
            console.log('Video entering viewport - autoplaying')
            handleAutoplay()
            setHasAutoplayed(true)
          }
        })
      },
      {
        threshold: autoplayThreshold, // Trigger when X% of element is visible
        rootMargin: '0px', // Can adjust this to trigger earlier/later
      }
    )

    observer.observe(containerRef.current)

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [autoplay, hasAutoplayed, isPlaying, autoplayThreshold])

  const initializeVimeoPlayer = () => {
    // Initialize Vimeo player after iframe is rendered
    setTimeout(() => {
      const iframe = document.getElementById(`vimeo-${videoId}`)
      if (iframe && (window as any).Vimeo) {
        const vimeoPlayer = new (window as any).Vimeo.Player(iframe)
        setPlayer(vimeoPlayer)

        // Handle video end
        vimeoPlayer.on('ended', () => {
          setIsPlaying(false)
          setPlayer(null)
        })

        vimeoPlayer.on('error', (error: any) => {
          console.error('Vimeo Player Error:', error)
        })
      }
    }, 100)
  }

  const handleAutoplay = () => {
    setIsPlaying(true)
    initializeVimeoPlayer()
  }

  const handlePlayClick = () => {
    setIsPlaying(true)
    setHasAutoplayed(true) // Mark as autoplayed to prevent re-triggering
    initializeVimeoPlayer()
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video overflow-hidden rounded-xl ${className}`}
    >
      {/* Video Cover */}
      {!isPlaying && (
        <div
          className='absolute inset-0 bg-cover bg-center flex justify-center items-center cursor-pointer z-10 transition-all duration-300 hover:brightness-90 group'
          style={{ backgroundImage: `url(${coverImage})` }}
          onClick={handlePlayClick}
        >
          {/* Play Button */}
          <div className='relative w-16 h-16 md:w-20 md:h-20 flex justify-center items-center transition-transform duration-300 group-hover:scale-110'>
            {/* Glow Effect */}
            <div className='absolute inset-0 bg-white rounded-full opacity-60 blur-md animate-pulse group-hover:animate-none' />

            {/* Play Button SVG */}
            <svg
              className='w-full h-full relative z-10 animate-pulse group-hover:animate-none transition-transform duration-300'
              viewBox='0 0 100 100'
              aria-label='Play video'
            >
              <circle fill='#FD4B8B' cx='50' cy='50' r='50' />
              <polygon className='fill-white' points='42,35 65,50 42,65' />
            </svg>
          </div>

          {/* Click to Play Text */}
          <span className='absolute top-[calc(50%+60px)] left-1/2 transform -translate-x-1/2 text-white font-semibold text-base drop-shadow-lg opacity-0 group-hover:opacity-100 group-hover:top-[calc(50%+70px)] transition-all duration-300 pointer-events-none'>
            Click to Play
          </span>
        </div>
      )}

      {/* Hidden Preload Iframe */}
      {isPreloaded && !isPlaying && (
        <iframe
          id={`vimeo-preload-${videoId}`}
          src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=1&app_id=58479&autoplay=0&title=0&byline=0&portrait=0`}
          className='absolute opacity-0 pointer-events-none w-full h-full border-none'
          allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          title='Preload video'
        />
      )}

      {/* Vimeo Player */}
      {isPlaying && (
        <div className='absolute inset-0 z-5'>
          <iframe
            id={`vimeo-${videoId}`}
            src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&title=0&byline=0&portrait=0`}
            className='w-full h-full border-none'
            allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share'
            allowFullScreen
            referrerPolicy='strict-origin-when-cross-origin'
            title='Transform Your Business with Integrated Digital Solutions'
          />
        </div>
      )}
    </div>
  )
}
