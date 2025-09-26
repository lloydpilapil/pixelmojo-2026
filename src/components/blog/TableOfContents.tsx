'use client'

import React, { useState, useEffect, useCallback, useMemo, useId } from 'react'
import { cn } from '@/lib/utils'
import type { TOCItem } from '../../../contentlayer.config'

interface TableOfContentsProps {
  headings: TOCItem[]
  className?: string
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)
  const listId = useId()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(min-width: 1280px)')
    const update = () => {
      const matches = mediaQuery.matches
      setIsDesktop(matches)
      setIsExpanded(prev => (matches ? true : prev))
    }
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  const h2Headings = useMemo(
    () => headings.filter(h => h.level === 2),
    [headings]
  )

  const getAnchorOffset = useCallback(() => {
    if (typeof window === 'undefined') return 120
    const cssOffset = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--anchor-offset')
    const parsed = parseInt(cssOffset, 10)
    return Number.isNaN(parsed) ? 120 : parsed
  }, [])

  const scrollToId = useCallback(
    (id: string, smooth = true) => {
      const elements = document.querySelectorAll(`#${CSS.escape(id)}`)
      if (elements.length === 0) return false
      const el = elements[elements.length - 1] as HTMLElement
      const anchorOffset = getAnchorOffset() + 10
      const target =
        el.getBoundingClientRect().top + window.scrollY - anchorOffset
      window.scrollTo({
        top: Math.max(target, 0),
        behavior: smooth ? 'smooth' : 'auto',
      })
      return true
    },
    [getAnchorOffset]
  )

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
    if (!isDesktop || h2Headings.length === 0) return
    let ticking = false
    const update = () => {
      const offset = getAnchorOffset() + 10
      const y = window.scrollY + offset
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
  }, [getAnchorOffset, h2Headings, isDesktop])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    window.history.replaceState(null, '', `#${id}`)
    setActiveId(id)
    scrollToId(id, true)
    if (!isDesktop) setIsExpanded(false)
  }

  if (!h2Headings.length) return null

  return (
    <div
      className={cn(
        'not-prose w-full xl:pr-8',
        isDesktop
          ? 'sticky top-[calc(var(--anchor-offset)+0.75rem)] z-30 bg-background/98 backdrop-blur-sm supports-[backdrop-filter]:bg-background/90 border border-border/30 rounded-xl px-4 py-5 shadow-sm'
          : 'relative bg-background/98 border border-border/30 rounded-xl px-4 py-5 shadow-sm',
        'xl:static xl:bg-transparent xl:backdrop-blur-none xl:border-0 xl:rounded-none xl:px-0 xl:py-0 xl:shadow-none',
        className
      )}
    >
      <nav aria-label='Table of contents'>
        <button
          type='button'
          onClick={() => {
            if (isDesktop) return
            setIsExpanded(prev => !prev)
          }}
          className='flex w-full items-center justify-between gap-3 text-left text-sm font-bold uppercase tracking-wider text-foreground xl:cursor-default xl:pointer-events-none xl:mb-7'
          aria-expanded={isDesktop ? true : isExpanded}
          aria-controls={listId}
          tabIndex={isDesktop ? -1 : 0}
        >
          Table of Contents
          <span
            className={cn(
              'text-base transition-transform duration-150',
              isExpanded ? 'rotate-180' : 'rotate-0',
              'xl:hidden'
            )}
            aria-hidden='true'
          >
            ▾
          </span>
        </button>

        <ul
          className={cn(
            'mb-0 p-0 list-none space-y-4 transition-[max-height,opacity] duration-200 ease-out overflow-hidden',
            isExpanded
              ? 'max-h-[75vh] opacity-100 pointer-events-auto mt-4'
              : 'max-h-0 opacity-0 pointer-events-none mt-0',
            'xl:mt-0 xl:overflow-visible xl:max-h-none xl:opacity-100 xl:pointer-events-auto'
          )}
          id={listId}
          aria-hidden={!isDesktop && !isExpanded}
        >
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
                    isActive ? 'text-cta' : 'text-foreground opacity-60'
                  )}
                >
                  {displayNumber}
                </span>

                <a
                  href={`#${id}`}
                  onClick={e => handleClick(e, id)}
                  className={cn(
                    'flex-1 text-base leading-snug transition-colors transition-opacity duration-150 font-medium outline-none focus-visible:ring-2 focus-visible:ring-cta/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive ? 'text-foreground' : 'text-foreground opacity-70'
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
