'use client'

import { useEffect } from 'react'

export function ScrollDebug() {
  useEffect(() => {
    // Debug script - comprehensive anchor scrolling diagnosis
    function debugAnchorScrolling() {
      console.log('=== ANCHOR SCROLLING DEBUG ===')
      
      // 1. Check if the element exists
      const testId = 'the-gap-between-design-vision-and-technical-reality'
      const element = document.getElementById(testId)
      console.log('Element exists?', !!element)
      console.log('Element:', element)
      
      // 2. Check computed styles on html/body
      const htmlStyles = getComputedStyle(document.documentElement)
      const bodyStyles = getComputedStyle(document.body)
      console.log('HTML overflow:', htmlStyles.overflow)
      console.log('Body overflow:', bodyStyles.overflow)
      console.log('HTML height:', htmlStyles.height)
      console.log('Body height:', bodyStyles.height)
      console.log('Scroll padding top:', htmlStyles.scrollPaddingTop)
      console.log('Scroll behavior:', htmlStyles.scrollBehavior)
      
      // 3. Check if something is blocking scroll
      console.log('Can scroll?', document.body.scrollHeight > window.innerHeight)
      console.log('Body scroll height:', document.body.scrollHeight)
      console.log('Window inner height:', window.innerHeight)
      
      // 4. Check parent containers
      let parent = element?.parentElement
      let level = 0
      while (parent && level < 10) {
        const styles = getComputedStyle(parent)
        const hasScrollIssue = styles.overflow === 'hidden' || styles.position === 'fixed'
        
        console.log(`Parent level ${level}:`, {
          element: parent.tagName + (parent.className ? '.' + parent.className.split(' ').join('.') : ''),
          overflow: styles.overflow,
          position: styles.position,
          height: styles.height,
          maxHeight: styles.maxHeight,
          hasScrollIssue
        })
        
        if (hasScrollIssue) {
          console.warn('❌ BLOCKING PARENT FOUND:', parent, {
            overflow: styles.overflow,
            position: styles.position
          })
        }
        
        parent = parent.parentElement
        level++
      }
      
      // 5. Test native scrolling
      if (element) {
        console.log('Testing native scroll...')
        const beforeTop = element.getBoundingClientRect().top
        console.log('Element position before scroll:', beforeTop)
        
        // Try native scrollIntoView
        element.scrollIntoView({ behavior: 'instant', block: 'start' })
        
        setTimeout(() => {
          const afterTop = element.getBoundingClientRect().top
          console.log('Element position after scroll:', afterTop)
          console.log('Did native scroll work?', Math.abs(afterTop - beforeTop) > 10)
        }, 100)
      }
      
      // 6. Check for scroll containers
      const scrollContainers = document.querySelectorAll('[style*="overflow"], [style*="scroll"]')
      console.log('Custom scroll containers found:', scrollContainers.length)
      scrollContainers.forEach((container, i) => {
        console.log(`Scroll container ${i}:`, container)
      })
      
      // 7. Window scroll test
      console.log('Current window scroll position:', window.scrollY)
      console.log('Max scroll position:', document.body.scrollHeight - window.innerHeight)
    }

    // Run after a delay to ensure DOM is ready
    setTimeout(() => {
      debugAnchorScrolling()
    }, 1000)
  }, [])

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-2 text-xs z-50">
      ScrollDebug Active - Check Console
    </div>
  )
}

export default ScrollDebug