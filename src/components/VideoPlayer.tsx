'use client'

import { useState, useEffect, useRef } from 'react'

interface VimeoPlayer {
  on: (event: string, callback: (error?: unknown) => void) => void
  play: () => Promise<void>
  setVolume: (volume: number) => Promise<void>
  getVolume: () => Promise<number>
  setCurrentTime: (seconds: number) => Promise<number>
}

interface VimeoConstructor {
  Player: new (element: HTMLIFrameElement | HTMLElement) => VimeoPlayer
}

declare global {
  interface Window {
    Vimeo: VimeoConstructor
  }
}

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
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Start muted for autoplay
  const [player, setPlayer] = useState<VimeoPlayer | null>(null)
  const [hasAutoplayed, setHasAutoplayed] = useState(false)
  const [isPreloaded, setIsPreloaded] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false) // Only load when near viewport
  const containerRef = useRef<HTMLDivElement>(null)

  // Lazy loading: Only load video resources when component enters viewport
  useEffect(() => {
    if (!containerRef.current) return

    const lazyLoadObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            console.log('Video component in viewport - loading resources')
            setShouldLoadVideo(true)
          }
        })
      },
      {
        threshold: 0.1, // Load when 10% visible
        rootMargin: '200px', // Start loading 200px before entering viewport
      }
    )

    lazyLoadObserver.observe(containerRef.current)

    return () => {
      if (containerRef.current) {
        lazyLoadObserver.unobserve(containerRef.current)
      }
    }
  }, [shouldLoadVideo])

  // Load Vimeo Player API only when video is needed
  useEffect(() => {
    if (!shouldLoadVideo) return

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
  }, [shouldLoadVideo])

  // Preload iframe only after resources are loaded and video is near viewport
  useEffect(() => {
    if (autoplay && shouldLoadVideo) {
      const preloadTimer = setTimeout(() => {
        setIsPreloaded(true)
      }, 1000) // Reduced delay since we're already near viewport

      return () => clearTimeout(preloadTimer)
    }
  }, [autoplay, shouldLoadVideo])

  // Intersection Observer for autoplay (only works if resources are loaded)
  useEffect(() => {
    if (!autoplay || !shouldLoadVideo || !containerRef.current) return

    const autoplayObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Check if element is entering viewport and we haven't autoplayed yet
          if (entry.isIntersecting && !hasAutoplayed && !isPlaying) {
            console.log('Video entering viewport - autoplaying muted')
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

    autoplayObserver.observe(containerRef.current)

    return () => {
      if (containerRef.current) {
        autoplayObserver.unobserve(containerRef.current)
      }
    }
  }, [autoplay, shouldLoadVideo, hasAutoplayed, isPlaying, autoplayThreshold])

  const initializeVimeoPlayer = (startMuted: boolean = true) => {
    // Initialize Vimeo player after iframe is rendered
    setTimeout(() => {
      const iframe = document.getElementById(`vimeo-${videoId}`)
      if (iframe && window.Vimeo) {
        const vimeoPlayer = new window.Vimeo.Player(iframe)
        setPlayer(vimeoPlayer)

        // Start playing muted for guaranteed autoplay
        if (startMuted) {
          vimeoPlayer.setVolume(0).then(() => {
            vimeoPlayer
              .play()
              .then(() => {
                setIsPlaying(true)
                console.log('Video playing muted')
              })
              .catch(error => {
                console.log('Autoplay blocked:', error)
              })
          })
        }

        // Handle video events
        vimeoPlayer.on('play', () => {
          setIsPlaying(true)
        })

        vimeoPlayer.on('pause', () => {
          setIsPlaying(false)
        })

        vimeoPlayer.on('ended', () => {
          // Reset video to frame 1 and show cover image
          vimeoPlayer
            .setCurrentTime(0)
            .then(() => {
              setIsPlaying(false)
              setIsMuted(true)
              setPlayer(null)
              setHasAutoplayed(false) // Allow autoplay again if user scrolls back
            })
            .catch(error => {
              console.log('Error resetting video time:', error)
              // Fallback: just hide the video and show cover
              setIsPlaying(false)
              setIsMuted(true)
              setPlayer(null)
              setHasAutoplayed(false)
            })
        })

        vimeoPlayer.on('error', (error: any) => {
          console.error('Vimeo Player Error:', error)
        })
      }
    }, 100)
  }

  const handleAutoplay = () => {
    setIsPlaying(true)
    initializeVimeoPlayer(true) // Start muted
  }

  const handlePlayClick = () => {
    setIsPlaying(true)
    setHasAutoplayed(true)
    initializeVimeoPlayer(true) // Start muted even on click for consistency
  }

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.setVolume(1).then(() => {
          setIsMuted(false)
          console.log('Unmuted')
        })
      } else {
        player.setVolume(0).then(() => {
          setIsMuted(true)
          console.log('Muted')
        })
      }
    }
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
          src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=1&app_id=58479&autoplay=0&title=0&byline=0&portrait=0&muted=1`}
          className='absolute opacity-0 pointer-events-none w-full h-full border-none'
          allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          title='Preload video'
        />
      )}

      {/* Vimeo Player with Loading Background */}
      {isPlaying && (
        <div className='absolute inset-0 z-5 bg-black'>
          <iframe
            id={`vimeo-${videoId}`}
            src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&title=0&byline=0&portrait=0&muted=1&controls=0`}
            className='w-full h-full border-none opacity-0 transition-opacity duration-700 ease-out'
            allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share'
            allowFullScreen
            referrerPolicy='strict-origin-when-cross-origin'
            title='Transform Your Business with Integrated Digital Solutions'
            onLoad={() => {
              // Fade in the video once it's loaded
              const iframe = document.getElementById(`vimeo-${videoId}`)
              if (iframe) {
                iframe.classList.remove('opacity-0')
                iframe.classList.add('opacity-100')
              }
            }}
          />
        </div>
      )}

      {/* Unmute button overlay */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className='absolute bottom-4 right-4 md:bottom-5 md:right-5 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-primary to-secondary border-2 border-white/30 flex items-center justify-center cursor-pointer z-20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 active:scale-95 animate-pulse group'
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='md:w-6 md:h-6'
            >
              <path
                d='M11 5L6 9H2V15H6L11 19V5Z'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <line
                x1='23'
                y1='9'
                x2='17'
                y2='15'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <line
                x1='17'
                y1='9'
                x2='23'
                y2='15'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          ) : (
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='md:w-6 md:h-6'
            >
              <path
                d='M11 5L6 9H2V15H6L11 19V5Z'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}
