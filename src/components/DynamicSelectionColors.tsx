'use client'

import { useEffect, useRef } from 'react'

export interface SelectionColor {
  bg: string
  color: string
}

export interface DynamicSelectionColorsProps {
  // Color customization
  colors?: SelectionColor[]

  // Behavior options
  rotationTrigger?: 'selection' | 'time' | 'both'
  rotationInterval?: number // Time in ms (default 5000)
  randomize?: boolean // Random vs sequential (default false)

  // Animation
  transitionDuration?: number // Smooth transitions in ms (default 300)
  fadeEffect?: boolean // Enable fade between colors (default true)

  // Scope
  selector?: string // Apply to specific elements only
  excludeElements?: string[] // Elements to exclude
}

const defaultColors: SelectionColor[] = [
  { bg: 'rgba(147, 51, 234, 0.3)', color: 'rgb(147, 51, 234)' }, // Purple
  { bg: 'rgba(236, 72, 153, 0.3)', color: 'rgb(236, 72, 153)' }, // Pink
  { bg: 'rgba(251, 146, 60, 0.3)', color: 'rgb(251, 146, 60)' }, // Orange
  { bg: 'rgba(59, 130, 246, 0.3)', color: 'rgb(59, 130, 246)' }, // Blue
]

export const DynamicSelectionColors = ({
  colors = defaultColors,
  rotationTrigger = 'selection',
  rotationInterval = 5000,
  randomize = false,
  transitionDuration = 300,
  fadeEffect = true,
  selector,
  excludeElements = [],
}: DynamicSelectionColorsProps = {}) => {
  const currentColorIndexRef = useRef(0)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initialize CSS transition if fadeEffect is enabled
    if (fadeEffect && transitionDuration > 0) {
      const style = document.createElement('style')
      style.textContent = `
        ::selection {
          transition: background-color ${transitionDuration}ms ease, color ${transitionDuration}ms ease;
        }
        ::-moz-selection {
          transition: background-color ${transitionDuration}ms ease, color ${transitionDuration}ms ease;
        }
        ${excludeElements
          .map(
            el => `
          ${el}::selection {
            background: inherit;
            color: inherit;
          }
          ${el}::-moz-selection {
            background: inherit;
            color: inherit;
          }
        `
          )
          .join('')}
        ${
          selector
            ? `
          ${selector}::selection {
            background: var(--selection-bg);
            color: var(--selection-color);
          }
          ${selector}::-moz-selection {
            background: var(--selection-bg);
            color: var(--selection-color);
          }
        `
            : ''
        }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [fadeEffect, transitionDuration, selector, excludeElements])

  useEffect(() => {
    const rotateSelectionColor = () => {
      let nextIndex: number

      if (randomize) {
        // Get a random color, but avoid the same one twice in a row
        do {
          nextIndex = Math.floor(Math.random() * colors.length)
        } while (
          nextIndex === currentColorIndexRef.current &&
          colors.length > 1
        )
      } else {
        // Sequential rotation
        nextIndex = (currentColorIndexRef.current + 1) % colors.length
      }

      currentColorIndexRef.current = nextIndex
      const nextColor = colors[nextIndex]

      // Update CSS custom properties
      const root = selector
        ? (document.querySelector(selector) as HTMLElement)
        : document.documentElement
      if (root) {
        root.style.setProperty('--selection-bg', nextColor.bg)
        root.style.setProperty('--selection-color', nextColor.color)
      }
    }

    // Set initial color
    if (randomize) {
      currentColorIndexRef.current = Math.floor(Math.random() * colors.length)
    }
    const initialColor = colors[currentColorIndexRef.current]
    const root = selector
      ? (document.querySelector(selector) as HTMLElement)
      : document.documentElement
    if (root) {
      root.style.setProperty('--selection-bg', initialColor.bg)
      root.style.setProperty('--selection-color', initialColor.color)
    }

    // Selection-based rotation
    const handleSelectionStart = () => {
      if (rotationTrigger === 'selection' || rotationTrigger === 'both') {
        rotateSelectionColor()
      }
    }

    const handleMouseUp = () => {
      if (rotationTrigger === 'selection' || rotationTrigger === 'both') {
        const selection = window.getSelection()
        if (selection && selection.toString().length > 0) {
          rotateSelectionColor()
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (rotationTrigger === 'selection' || rotationTrigger === 'both') {
        if (e.ctrlKey || e.metaKey || e.shiftKey) {
          setTimeout(() => {
            const selection = window.getSelection()
            if (selection && selection.toString().length > 0) {
              rotateSelectionColor()
            }
          }, 10)
        }
      }
    }

    // Time-based rotation
    if (rotationTrigger === 'time' || rotationTrigger === 'both') {
      intervalIdRef.current = setInterval(
        rotateSelectionColor,
        rotationInterval
      )
    }

    // Add event listeners
    const targetElement = selector ? document.querySelector(selector) : document
    if (targetElement) {
      targetElement.addEventListener(
        'selectstart',
        handleSelectionStart as EventListener
      )
      targetElement.addEventListener('mouseup', handleMouseUp as EventListener)
      targetElement.addEventListener('keyup', handleKeyUp as EventListener)
    }

    // Cleanup
    return () => {
      if (targetElement) {
        targetElement.removeEventListener(
          'selectstart',
          handleSelectionStart as EventListener
        )
        targetElement.removeEventListener(
          'mouseup',
          handleMouseUp as EventListener
        )
        targetElement.removeEventListener('keyup', handleKeyUp as EventListener)
      }

      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
      }
    }
  }, [colors, rotationTrigger, rotationInterval, randomize, selector])

  return null
}
