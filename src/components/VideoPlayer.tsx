'use client'

import { useState, useEffect } from 'react'

interface VideoPlayerProps {
  videoId: string
  coverImage?: string
  className?: string
}

export default function VideoPlayer({
  videoId,
  coverImage = '/video-cover-02.webp',
  className = '',
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [, setPlayer] = useState<any>(null)

  useEffect(() => {
    // Load Vimeo Player API
    const script = document.createElement('script')
    script.src = 'https://player.vimeo.com/api/player.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const handlePlayClick = () => {
    setIsPlaying(true)

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

  return (
    <div
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

      {/* Vimeo Player */}
      {isPlaying && (
        <div className='absolute inset-0 z-5'>
          <iframe
            id={`vimeo-${videoId}`}
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0`}
            className='w-full h-full border-none'
            allow='autoplay; fullscreen; picture-in-picture; clipboard-write'
            allowFullScreen
          />
        </div>
      )}
    </div>
  )
}
