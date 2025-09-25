'use client'

import { useEffect, useRef, useState } from 'react'

interface LenisRevealProps {
  children: React.ReactNode
  type?: 'fade' | 'slide' | 'staggered' | 'scale' | 'parallax'
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  staggerDelay?: number
  threshold?: number
  rootMargin?: string
  className?: string
  once?: boolean
}

export function LenisReveal({
  children,
  type = 'fade',
  direction = 'up',
  delay = 0,
  duration = 600,
  staggerDelay = 100,
  threshold = 0.15,
  rootMargin = '-50px 0px',
  className = '',
  once = true,
}: LenisRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Skip if already animated and once is true
    if (once && hasAnimated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
            if (once) setHasAnimated(true)
          }, delay)

          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [delay, threshold, rootMargin, once, hasAnimated])

  // Generate animation classes based on type and state
  const getAnimationClasses = () => {
    const baseClasses = 'lenis-reveal-element'
    const typeClass = `lenis-reveal-${type}`
    const directionClass = direction !== 'up' ? `lenis-reveal-${direction}` : ''
    const visibleClass = isVisible ? 'lenis-reveal-visible' : ''

    return `${baseClasses} ${typeClass} ${directionClass} ${visibleClass} ${className}`.trim()
  }

  // Custom CSS variables for animation control
  const animationStyles = {
    '--lenis-duration': `${duration}ms`,
    '--lenis-stagger-delay': `${staggerDelay}ms`,
  } as React.CSSProperties

  return (
    <div
      ref={elementRef}
      className={getAnimationClasses()}
      style={animationStyles}
    >
      {children}
    </div>
  )
}

// Specialized components for common use cases
export function LenisFadeIn({
  children,
  delay = 0,
  ...props
}: Omit<LenisRevealProps, 'type'>) {
  return (
    <LenisReveal type='fade' delay={delay} {...props}>
      {children}
    </LenisReveal>
  )
}

export function LenisSlideUp({
  children,
  delay = 0,
  ...props
}: Omit<LenisRevealProps, 'type' | 'direction'>) {
  return (
    <LenisReveal type='slide' direction='up' delay={delay} {...props}>
      {children}
    </LenisReveal>
  )
}

export function LenisStaggered({
  children,
  staggerDelay = 100,
  ...props
}: Omit<LenisRevealProps, 'type'>) {
  return (
    <LenisReveal type='staggered' staggerDelay={staggerDelay} {...props}>
      {children}
    </LenisReveal>
  )
}

export function LenisScale({
  children,
  delay = 0,
  ...props
}: Omit<LenisRevealProps, 'type'>) {
  return (
    <LenisReveal type='scale' delay={delay} {...props}>
      {children}
    </LenisReveal>
  )
}

export function LenisParallax({
  children,
  ...props
}: Omit<LenisRevealProps, 'type'>) {
  return (
    <LenisReveal type='parallax' {...props}>
      {children}
    </LenisReveal>
  )
}
