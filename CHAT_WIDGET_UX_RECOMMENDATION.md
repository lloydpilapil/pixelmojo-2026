# Chat Widget UX Recommendations

**Date:** 2025-10-09

## Current Issue

Chat widget only appears after scrolling 80vh (past hero section):

- ❌ Users don't see it immediately
- ❌ Lower engagement rate
- ❌ Confusing when proactive triggers fire without visible button

## Expert UX Solutions

### **✅ RECOMMENDED: Progressive Disclosure Pattern**

This is what top companies (Intercom, Drift) use:

```typescript
const [widgetState, setWidgetState] = useState<
  'hidden' | 'icon' | 'badge' | 'expanded'
>('hidden')

useEffect(() => {
  // Phase 1: Show icon after 2 seconds (let hero breathe)
  const timer1 = setTimeout(() => setWidgetState('icon'), 2000)

  // Phase 2: Add pulsing badge after 5 seconds
  const timer2 = setTimeout(() => setWidgetState('badge'), 5000)

  return () => {
    clearTimeout(timer1)
    clearTimeout(timer2)
  }
}, [])
```

**Rendering:**

```tsx
{
  widgetState !== 'hidden' && (
    <button className='fixed bottom-6 right-6 z-40 group'>
      <div className='relative'>
        {/* Main button */}
        <div
          className={`p-4 bg-primary rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            widgetState === 'badge' ? 'animate-pulse-once' : ''
          }`}
        >
          <MessageCircle className='w-6 h-6 text-white' />
        </div>

        {/* Badge notification (Phase 2) */}
        {widgetState === 'badge' && (
          <div className='absolute -top-1 -right-1 w-3 h-3 bg-[#FDC304] rounded-full animate-ping' />
        )}

        {/* Tooltip hint */}
        {widgetState === 'badge' && (
          <div className='absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
            <p className='text-sm font-medium text-gray-900'>Need help? 👋</p>
          </div>
        )}
      </div>
    </button>
  )
}
```

---

### **Alternative: Mobile-First Visibility**

Show immediately on mobile, delayed on desktop:

```typescript
useEffect(() => {
  const isMobile = window.innerWidth < 768

  if (isMobile) {
    // Mobile: Show immediately (harder to scroll)
    setIsVisible(true)
  } else {
    // Desktop: Show after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }
}, [])
```

---

## Positioning Best Practices

### **Don't Block Hero CTA**

```tsx
{
  /* GOOD: Lower z-index, positioned away from CTA */
}
;<button className='fixed bottom-6 right-6 z-40' />

{
  /* Your hero CTA should have higher z-index */
}
;<button className='relative z-50'>Get Started</button>
```

### **Responsive Positioning**

```tsx
{
  /* Mobile: Full width at bottom */
}
{
  /* Desktop: Small circle at corner */
}
;<button
  className='
  fixed
  bottom-4 right-4
  md:bottom-6 md:right-6
  lg:bottom-8 lg:right-8
  z-40
'
/>
```

---

## Animation Micro-Interactions

Add subtle animations to guide attention WITHOUT being annoying:

```css
/* Gentle one-time pulse on appearance */
@keyframes pulse-once {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-pulse-once {
  animation: pulse-once 1s ease-in-out 1;
}

/* Subtle hover lift */
.hover\:scale-110:hover {
  transform: scale(1.1);
  transition: transform 200ms ease-out;
}
```

---

## Context-Aware Behavior

**High-intent pages** (pricing, contact, services):

- Show immediately with badge
- More aggressive proactive engagement

**Low-intent pages** (blog, about):

- Show after 3-5 seconds
- Less aggressive, exit-intent only

```typescript
const triggerRules = getTriggerRules(chatContext.pageType)

const showDelay = triggerRules.highIntent ? 0 : 3000

setTimeout(() => setIsVisible(true), showDelay)
```

---

## Recommended Implementation

**Update ChatWidget.tsx lines 58-70:**

```typescript
// Replace scroll-based visibility with time-based + context-aware
useEffect(() => {
  const isMobile = window.innerWidth < 768
  const context = getCurrentContext()
  const isHighIntent =
    context?.pageType === 'pricing' ||
    context?.pageType === 'contact' ||
    context?.pageType === 'services'

  // Mobile: Show immediately
  if (isMobile) {
    setIsVisible(true)
    return
  }

  // Desktop high-intent: Show after 1 second
  if (isHighIntent) {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }

  // Desktop low-intent: Show after 3 seconds
  const timer = setTimeout(() => setIsVisible(true), 3000)
  return () => clearTimeout(timer)
}, [])
```

---

## A/B Testing Recommendations

Test these variants to optimize engagement:

1. **Variant A**: Always visible after 2 seconds
2. **Variant B**: Scroll-based (current)
3. **Variant C**: Progressive disclosure (icon → badge → tooltip)

**Metrics to track:**

- Chat open rate
- Messages sent
- Conversion rate
- Hero CTA click rate (ensure no interference)

---

## What Top Companies Do

### **Intercom**

- ✅ Always visible
- ✅ Small icon in bottom right
- ✅ Badge notification after 5 seconds
- ✅ Auto-expand on high-intent pages

### **Drift**

- ✅ Immediate visibility
- ✅ Pulsing animation on first visit
- ✅ "👋" wave emoji in badge
- ✅ Tooltip: "Questions? We're here"

### **HubSpot**

- ✅ Delayed 3 seconds
- ✅ Small and subtle
- ✅ No auto-expand unless exit intent
- ✅ Badge with "1" notification count

---

## Final Recommendation

**Implement Progressive Disclosure:**

1. **0-2 seconds**: Hidden (let hero breathe)
2. **2 seconds**: Fade in icon button
3. **5 seconds**: Add pulsing badge + subtle bounce
4. **10 seconds**: Show tooltip "Need help? 👋" on hover
5. **Never**: Don't auto-expand unless exit intent/high-intent page

**Benefits:**

- ✅ Doesn't compete with hero CTA initially
- ✅ Users know help is available
- ✅ Progressive hints guide discovery
- ✅ Works great on mobile
- ✅ Industry-standard pattern

**Trade-offs:**

- Slightly more complex animation logic
- Need to track widget state phases

---

## Quick Win Implementation

If you want a **simple fix right now**, just change line 62:

```typescript
// OLD: Show after scroll
const scrolled = window.scrollY > window.innerHeight * 0.8

// NEW: Show after 2 seconds
useEffect(() => {
  const timer = setTimeout(() => setIsVisible(true), 2000)
  return () => clearTimeout(timer)
}, [])
```

**Result:**

- ✅ Visible on all pages after 2 seconds
- ✅ Doesn't interfere with hero (2-second delay)
- ✅ Simple, no complex state management
- ✅ Works on mobile

---

## Summary

**Your concern is 100% valid** - hiding chat until scroll hurts engagement.

**Best solution:** Progressive disclosure with 2-second initial delay

**Quick fix:** Change to time-based visibility (2-3 seconds)

**Don't:** Keep scroll-based hiding - it's costing you conversions!
