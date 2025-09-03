'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { TOCItem } from '../../../contentlayer.config'

interface TableOfContentsProps {
  headings: TOCItem[]
  className?: string
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  
  // Filter to only show h2 headings (level 2)
  const h2Headings = headings.filter(h => h.level === 2)

  // Use native scrollIntoView with CSS scroll-margin-top for consistent offset
  const scrollToId = useCallback((id: string, smooth = true) => {
    // Find all elements with this ID (in case of duplicates from hydration)
    const elements = document.querySelectorAll(`#${CSS.escape(id)}`)
    
    if (elements.length === 0) {
      return false
    }
    
    // Use the last element (usually the client-rendered one in hydration issues)
    const element = elements[elements.length - 1] as HTMLElement
    
    // Let CSS handle the offset via scroll-margin-top
    element.scrollIntoView({ 
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start'
    })
    
    return true
  }, [])

  // Handle hash changes
  useEffect(() => {
    if (h2Headings.length === 0) return

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        setActiveId(hash)
      }
    }

    // Check for initial hash
    if (window.location.hash) {
      const hash = window.location.hash.slice(1)
      setActiveId(hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [h2Headings])

  // Track active heading on scroll
  useEffect(() => {
    if (h2Headings.length === 0) return

    // Get pixel offset from CSS variable for accurate intersection detection
    const rootStyles = getComputedStyle(document.documentElement)
    const cssOffset = rootStyles.getPropertyValue('--anchor-offset')
    const offset = cssOffset ? parseInt(cssOffset) : 120
    
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: `-${offset}px 0px -70% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )

    h2Headings.forEach(({ id }) => {
      // Get all elements with this ID (handle duplicates)
      const elements = document.querySelectorAll(`#${CSS.escape(id)}`)
      // Observe the last one (usually the visible one in hydration issues)
      if (elements.length > 0) {
        const element = elements[elements.length - 1]
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [h2Headings])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Update URL without triggering hashchange
    window.history.replaceState(null, '', `#${id}`)
    
    // Scroll with animation
    const success = scrollToId(id, true)
    if (success) {
      setActiveId(id)
    }
  }

  if (h2Headings.length === 0) {
    return null
  }

  return (
    <nav className={cn('space-y-1', className)} aria-label="Table of contents">
      {h2Headings.map(({ id, text }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => handleClick(e, id)}
          className={cn(
            'block py-2 px-2 text-sm transition-colors hover:text-primary hover:bg-muted/50 rounded-md cursor-pointer',
            {
              'text-primary font-medium bg-primary/10': activeId === id,
              'text-muted-foreground': activeId !== id,
            }
          )}
        >
          {text}
        </a>
      ))}
    </nav>
  )
}

export default TableOfContents