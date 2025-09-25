'use client'

import { useEffect, useRef, useState } from 'react'

interface UseLenisAnimationOptions {
  threshold?: number
  rootMargin?: string
  delay?: number
  once?: boolean
  enabled?: boolean
}

// Global intersection observer instance to optimize performance
let globalObserver: IntersectionObserver | null = null
const observedElements = new Map<Element, () => void>()

function getGlobalObserver(threshold: number, rootMargin: string) {
  if (!globalObserver) {
    globalObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const callback = observedElements.get(entry.target)
          if (callback && entry.isIntersecting) {
            callback()
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )
  }
  return globalObserver
}

export function useLenisAnimation({
  threshold = 0.15,
  rootMargin = '-50px 0px',
  delay = 0,
  once = true,
  enabled = true,
}: UseLenisAnimationOptions = {}) {
  const elementRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element || !enabled) return

    // Skip if already animated and once is true
    if (once && hasAnimated) return

    const observer = getGlobalObserver(threshold, rootMargin)

    const handleIntersection = () => {
      if (delay > 0) {
        setTimeout(() => {
          setIsVisible(true)
          if (once) {
            setHasAnimated(true)
            observedElements.delete(element)
            observer.unobserve(element)
          }
        }, delay)
      } else {
        setIsVisible(true)
        if (once) {
          setHasAnimated(true)
          observedElements.delete(element)
          observer.unobserve(element)
        }
      }
    }

    observedElements.set(element, handleIntersection)
    observer.observe(element)

    return () => {
      observedElements.delete(element)
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, delay, once, enabled, hasAnimated])

  return {
    ref: elementRef,
    isVisible,
    hasAnimated,
  }
}

// Hook specifically for Lenis scroll-based animations
export function useLenisScrollAnimation(callback: (scrollY: number) => void) {
  const isActiveRef = useRef(true)

  useEffect(() => {
    const handleScroll = (scrollY: number) => {
      if (isActiveRef.current) {
        callback(scrollY)
      }
    }

    // Use Lenis scroll events if available, fallback to native scroll
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.on('scroll', ({ scroll }: { scroll: number }) =>
        handleScroll(scroll)
      )
    } else {
      const nativeHandler = () => handleScroll(window.scrollY)
      window.addEventListener('scroll', nativeHandler, { passive: true })
      return () => window.removeEventListener('scroll', nativeHandler)
    }

    return () => {
      isActiveRef.current = false
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.off('scroll', handleScroll)
      }
    }
  }, [callback])

  return {
    setActive: (active: boolean) => {
      isActiveRef.current = active
    },
  }
}

// Performance monitoring hook for Lenis animations
export function useLenisPerformance() {
  const [fps, setFps] = useState(60)
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    let animationId: number

    const measureFps = () => {
      const now = performance.now()
      const delta = now - lastTimeRef.current
      frameCountRef.current++

      // Update FPS every second
      if (delta >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / delta)
        setFps(currentFps)
        frameCountRef.current = 0
        lastTimeRef.current = now
      }

      animationId = requestAnimationFrame(measureFps)
    }

    animationId = requestAnimationFrame(measureFps)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Recommend reduced animations if performance is poor
  const shouldReduceAnimations = fps < 30

  return {
    fps,
    shouldReduceAnimations,
    performanceLevel: fps >= 50 ? 'high' : fps >= 30 ? 'medium' : 'low',
  }
}
