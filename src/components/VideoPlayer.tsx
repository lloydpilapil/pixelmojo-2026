'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface VimeoPlayer {
  on: (event: string, callback: (error?: unknown) => void) => void
  off: (event: string, callback?: (error?: unknown) => void) => void
  play: () => Promise<void>
  setVolume: (volume: number) => Promise<void>
  getVolume: () => Promise<number>
  setCurrentTime: (seconds: number) => Promise<number>
  destroy: () => Promise<void>
}

interface VimeoConstructor {
  Player: new (element: HTMLIFrameElement | HTMLElement) => VimeoPlayer
}

declare global {
  interface Window {
    Vimeo: VimeoConstructor
  }
}

const VIMEO_SCRIPT_SRC = 'https://player.vimeo.com/api/player.js'
const VIMEO_ORIGIN = 'https://player.vimeo.com'

let vimeoAPIReadyPromise: Promise<VimeoConstructor> | null = null

const ensureVimeoConnectionHints = () => {
  if (typeof document === 'undefined') return

  if (
    !document.querySelector(
      `link[rel="dns-prefetch"][href="//player.vimeo.com"]`
    )
  ) {
    const dnsPrefetch = document.createElement('link')
    dnsPrefetch.rel = 'dns-prefetch'
    dnsPrefetch.href = '//player.vimeo.com'
    document.head.appendChild(dnsPrefetch)
  }

  if (
    !document.querySelector(`link[rel="preconnect"][href="${VIMEO_ORIGIN}"]`)
  ) {
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = VIMEO_ORIGIN
    preconnect.crossOrigin = 'anonymous'
    document.head.appendChild(preconnect)
  }
}

const loadVimeoAPI = async (): Promise<VimeoConstructor> => {
  if (typeof window === 'undefined') {
    throw new Error('Vimeo API can only be loaded in the browser')
  }

  if (window.Vimeo) {
    return window.Vimeo
  }

  if (!vimeoAPIReadyPromise) {
    ensureVimeoConnectionHints()

    vimeoAPIReadyPromise = new Promise((resolve, reject) => {
      const handleLoad = () => {
        if (window.Vimeo) {
          resolve(window.Vimeo)
        } else {
          vimeoAPIReadyPromise = null
          reject(new Error('Vimeo API did not initialize properly'))
        }
      }

      const handleError = () => {
        vimeoAPIReadyPromise = null
        reject(new Error('Failed to load Vimeo API script'))
      }

      const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${VIMEO_SCRIPT_SRC}"]`
      )

      if (existingScript) {
        existingScript.addEventListener('load', handleLoad, { once: true })
        existingScript.addEventListener('error', handleError, { once: true })
      } else {
        const script = document.createElement('script')
        script.src = VIMEO_SCRIPT_SRC
        script.async = true
        script.addEventListener('load', handleLoad, { once: true })
        script.addEventListener('error', handleError, { once: true })
        document.head.appendChild(script)
      }
    })
  }

  return vimeoAPIReadyPromise
}

interface VideoPlayerProps {
  videoId: string
  coverImage?: string
  className?: string
  autoplay?: boolean
  autoplayThreshold?: number // Percentage of element visible before autoplay (0.0 - 1.0)
  ariaDescribedBy?: string
}

export default function VideoPlayer({
  videoId,
  coverImage = '/video-cover-02.webp',
  className = '',
  autoplay = false,
  autoplayThreshold = 0.5, // Autoplay when 50% of video is visible
  ariaDescribedBy,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Start muted for autoplay
  const [hasAutoplayed, setHasAutoplayed] = useState(false)
  const [isPreloaded, setIsPreloaded] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false) // Only load when near viewport
  const [isVideoReady, setIsVideoReady] = useState(false) // Track when video is actually ready to play
  const [showCover, setShowCover] = useState(true) // Control cover visibility
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<VimeoPlayer | null>(null)
  const playerHandlersRef = useRef<{
    onPlay?: () => void
    onPause?: () => void
    onLoaded?: () => void
    onEnded?: () => void
    onError?: (error: unknown) => void
  }>({})
  const pendingStartMutedRef = useRef(true)
  const coverTimeoutRef = useRef<number | null>(null)

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

    let isActive = true

    loadVimeoAPI().catch(error => {
      if (isActive) {
        console.error('Failed to prepare Vimeo API', error)
      }
    })

    return () => {
      isActive = false
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

  const cleanupPlayer = useCallback((target?: VimeoPlayer | null) => {
    const activePlayer = target ?? playerRef.current
    if (!activePlayer) return

    if (coverTimeoutRef.current) {
      window.clearTimeout(coverTimeoutRef.current)
      coverTimeoutRef.current = null
    }

    const handlers = playerHandlersRef.current

    if (handlers?.onPlay) activePlayer.off('play', handlers.onPlay)
    if (handlers?.onPause) activePlayer.off('pause', handlers.onPause)
    if (handlers?.onLoaded) activePlayer.off('loaded', handlers.onLoaded)
    if (handlers?.onEnded) activePlayer.off('ended', handlers.onEnded)
    if (handlers?.onError) activePlayer.off('error', handlers.onError)

    playerHandlersRef.current = {}

    activePlayer.destroy().catch(() => undefined)

    if (!target || target === playerRef.current) {
      playerRef.current = null
    }
  }, [])

  const initializeVimeoPlayer = useCallback(
    async (startMuted: boolean = true) => {
      if (!shouldLoadVideo) return

      try {
        const Vimeo = await loadVimeoAPI()
        let iframe = document.getElementById(
          `vimeo-${videoId}`
        ) as HTMLIFrameElement | null

        if (!iframe) {
          // Wait for next animation frame in case the iframe hasn't been rendered yet
          await new Promise<void>(resolve => {
            requestAnimationFrame(() => resolve())
          })
          iframe = document.getElementById(
            `vimeo-${videoId}`
          ) as HTMLIFrameElement | null
        }

        if (!iframe) {
          return
        }

        if (!playerRef.current) {
          const vimeoPlayer = new Vimeo.Player(iframe)
          playerRef.current = vimeoPlayer

          const handlePlay = () => {
            setIsPlaying(true)
          }

          const handleLoaded = () => {
            setIsVideoReady(true)
            if (coverTimeoutRef.current) {
              window.clearTimeout(coverTimeoutRef.current)
            }
            coverTimeoutRef.current = window.setTimeout(() => {
              setShowCover(false)
              coverTimeoutRef.current = null
            }, 100)
          }

          const handlePause = () => {
            setIsPlaying(false)
            setIsVideoReady(false)
            setShowCover(true)
            pendingStartMutedRef.current = true
            cleanupPlayer()
          }

          const handleEnded = () => {
            const currentPlayer = playerRef.current
            if (!currentPlayer) return

            currentPlayer
              .setCurrentTime(0)
              .catch(error => {
                console.log('Error resetting video time:', error)
              })
              .finally(() => {
                setIsPlaying(false)
                setIsMuted(true)
                setHasAutoplayed(false)
                setIsVideoReady(false)
                setShowCover(true)
                pendingStartMutedRef.current = true
                cleanupPlayer(currentPlayer)
              })
          }

          const handleError = (error: unknown) => {
            console.error('Vimeo Player Error:', error)
          }

          vimeoPlayer.on('play', handlePlay)
          vimeoPlayer.on('loaded', handleLoaded)
          vimeoPlayer.on('pause', handlePause)
          vimeoPlayer.on('ended', handleEnded)
          vimeoPlayer.on('error', handleError)

          playerHandlersRef.current = {
            onPlay: handlePlay,
            onLoaded: handleLoaded,
            onPause: handlePause,
            onEnded: handleEnded,
            onError: handleError,
          }
        }

        const activePlayer = playerRef.current
        if (!activePlayer) return

        if (startMuted) {
          await activePlayer.setVolume(0)
          setIsMuted(true)
        } else {
          await activePlayer.setVolume(1)
          setIsMuted(false)
        }

        try {
          await activePlayer.play()
        } catch (error) {
          console.log('Autoplay blocked:', error)
        }
      } catch (error) {
        console.error('Failed to initialize Vimeo Player:', error)
      }
    },
    [cleanupPlayer, shouldLoadVideo, videoId]
  )

  const startPlayback = (startMuted: boolean) => {
    pendingStartMutedRef.current = startMuted
    setShouldLoadVideo(true)
    setIsPlaying(true)
  }

  const handleAutoplay = () => {
    startPlayback(true)
  }

  const handlePlayClick = () => {
    setHasAutoplayed(true)
    startPlayback(true)
  }

  const toggleMute = () => {
    const activePlayer = playerRef.current
    if (!activePlayer) return

    if (isMuted) {
      activePlayer
        .setVolume(1)
        .then(() => {
          setIsMuted(false)
          console.log('Unmuted')
        })
        .catch(error => {
          console.log('Unable to unmute video:', error)
        })
    } else {
      activePlayer
        .setVolume(0)
        .then(() => {
          setIsMuted(true)
          console.log('Muted')
        })
        .catch(error => {
          console.log('Unable to mute video:', error)
        })
    }
  }

  useEffect(() => {
    if (!isPlaying) return

    initializeVimeoPlayer(pendingStartMutedRef.current)
  }, [isPlaying, initializeVimeoPlayer])

  useEffect(() => {
    return () => {
      cleanupPlayer()
    }
  }, [cleanupPlayer])

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video overflow-hidden rounded-xl ${className}`}
      aria-describedby={ariaDescribedBy}
    >
      {/* Video Cover - Show until video is ready */}
      {showCover && (
        <button
          type='button'
          className='group absolute inset-0 z-10 flex items-center justify-center bg-cover bg-center transition-all duration-300 hover:brightness-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40'
          style={{ backgroundImage: `url(${coverImage})` }}
          onClick={handlePlayClick}
          aria-label='Play video'
        >
          {/* Play Button */}
          <div className='relative flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20'>
            {/* Glow Effect */}
            <div className='absolute inset-0 animate-pulse rounded-full bg-white opacity-60 blur-md group-hover:animate-none' />

            {/* Play Button SVG */}
            <svg
              className='relative z-10 h-full w-full animate-pulse transition-transform duration-300 group-hover:animate-none'
              viewBox='0 0 100 100'
              aria-hidden='true'
              focusable='false'
            >
              <circle fill='#FD4B8B' cx='50' cy='50' r='50' />
              <polygon className='fill-white' points='42,35 65,50 42,65' />
            </svg>
          </div>

          {/* Click to Play Text */}
          <span
            className='pointer-events-none absolute left-1/2 top-[calc(50%+60px)] -translate-x-1/2 transform text-base font-semibold text-white opacity-0 transition-all duration-300 drop-shadow-lg group-hover:top-[calc(50%+70px)] group-hover:opacity-100'
            aria-hidden='true'
          >
            Click to Play
          </span>
        </button>
      )}

      {/* Hidden Preload Iframe */}
      {isPreloaded && !isPlaying && (
        <iframe
          id={`vimeo-preload-${videoId}`}
          src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=1&app_id=58479&autoplay=0&title=0&byline=0&portrait=0&muted=1`}
          className='absolute h-full w-full border-none pointer-events-none opacity-0'
          allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          loading='lazy'
          title='Preload video'
          aria-hidden='true'
        />
      )}

      {/* Vimeo Player with Loading Background */}
      {isPlaying && (
        <div
          className={`absolute inset-0 z-5 bg-black ${!isVideoReady ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        >
          <iframe
            id={`vimeo-${videoId}`}
            src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&title=0&byline=0&portrait=0&muted=1&controls=1`}
            className='h-full w-full border-none opacity-0 transition-opacity duration-700 ease-out'
            allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share'
            allowFullScreen
            referrerPolicy='strict-origin-when-cross-origin'
            loading='lazy'
            title='Transform Your Business with Integrated Digital Solutions'
            aria-describedby={ariaDescribedBy}
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
          type='button'
          onClick={toggleMute}
          className='absolute bottom-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white/30 bg-gradient-to-r from-primary to-secondary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 active:scale-95 animate-pulse group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 md:bottom-5 md:right-5 md:h-12 md:w-12'
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
