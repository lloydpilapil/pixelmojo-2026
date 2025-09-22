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

  // only level-2 items
  const h2Headings = headings.filter(h => h.level === 2)

  const scrollToId = useCallback((id: string, smooth = true) => {
    const elements = document.querySelectorAll(`#${CSS.escape(id)}`)
    if (elements.length === 0) return false
    const el = elements[elements.length - 1] as HTMLElement
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    return true
  }, [])

  useEffect(() => {
    if (h2Headings.length === 0) return
    const onHash = () => {
      const hash = window.location.hash.slice(1)
      if (hash) setActiveId(hash)
    }
    if (window.location.hash) setActiveId(window.location.hash.slice(1))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [h2Headings])

  useEffect(() => {
    if (h2Headings.length === 0) return
    let ticking = false
    const update = () => {
      const cssOffset = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--anchor-offset')
      const offset = cssOffset ? parseInt(cssOffset) : 120
      const y = window.scrollY + offset + 10
      let current = ''
      for (let i = h2Headings.length - 1; i >= 0; i--) {
        const { id } = h2Headings[i]
        const nodes = document.querySelectorAll(`#${CSS.escape(id)}`)
        if (nodes.length) {
          const el = nodes[nodes.length - 1] as HTMLElement
          const top = el.getBoundingClientRect().top + window.scrollY
          if (y >= top) {
            current = id
            break
          }
        }
      }
      if (!current && window.scrollY < 100 && h2Headings.length)
        current = h2Headings[0].id
      setActiveId(prev => (current && current !== prev ? current : prev))
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [h2Headings])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    window.history.replaceState(null, '', `#${id}`)
    setActiveId(id)
    scrollToId(id, true)
  }

  if (!h2Headings.length) return null

  return (
    <div className={cn('not-prose pr-8', className)}>
      <nav aria-label='Table of contents'>
        {/* TOC title - same font as content but bold and uppercase */}
        <span className='block mb-7 text-sm font-bold text-foreground uppercase tracking-wider'>
          Table of Contents
        </span>

        {/* Normalize list spacing to avoid hidden top margin */}
        <ul className='mt-0 mb-0 p-0 list-none space-y-4'>
          {h2Headings.map(({ id, text }, index) => {
            const isActive = activeId === id
            const displayNumber = String(index + 1).padStart(2, '0')

            return (
              <li
                key={id}
                className='flex items-start gap-4 transition-transform duration-150 hover:scale-[1.02]'
              >
                <span
                  className={cn(
                    'text-base font-semibold tracking-wide min-w-[2.5rem] transition-colors transition-opacity duration-150',
                    isActive ? 'text-cta' : 'text-foreground opacity-40'
                  )}
                >
                  {displayNumber}
                </span>

                <a
                  href={`#${id}`}
                  onClick={e => handleClick(e, id)}
                  className={cn(
                    'flex-1 text-base leading-snug transition-colors transition-opacity duration-150 font-medium outline-none focus-visible:ring-2 focus-visible:ring-cta/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive ? 'text-foreground' : 'text-foreground opacity-40'
                  )}
                  aria-current={isActive ? 'location' : undefined}
                  title={text}
                >
                  {text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default TableOfContents
