# Code Standards Audit Report

**Date:** 2025-10-09
**Project:** PixelMojo 2026
**Standards Version:** 1.0 (Enhanced)

---

## Executive Summary

Your codebase is **solid** with good fundamentals, but there are **critical gaps** in error handling, security, and Next.js 15 best practices. This audit compares your current implementation against the new `CODING_STANDARDS.md`.

### Overall Score: **6.5/10**

**Strengths:**

- ✅ Good project structure with proper `src/` organization
- ✅ Sentry integration for error tracking
- ✅ Rate limiting in chat API
- ✅ TypeScript throughout
- ✅ Custom 404 and global error pages

**Critical Gaps:**

- ❌ Missing loading states (`loading.tsx`)
- ❌ Missing error boundaries (`error.tsx`) on routes
- ❌ No Zod validation (manual validation only)
- ❌ No DOMPurify for user content sanitization
- ❌ No rate limiting on most API routes
- ❌ No Server Actions (using API routes only)
- ⚠️ 55% of components are Client Components (likely too high)

---

## Detailed Findings

### 1. Next.js Special Files ❌ **CRITICAL**

**Current State:**

```
✅ /app/global-error.tsx
✅ /app/not-found.tsx
❌ /app/loading.tsx (MISSING)
❌ /app/error.tsx (MISSING)
❌ /app/blogs/loading.tsx (MISSING)
❌ /app/blogs/error.tsx (MISSING)
❌ /app/projects/loading.tsx (MISSING)
❌ /app/projects/error.tsx (MISSING)
```

**Impact:**

- No loading states = poor UX (blank screens while fetching)
- No error boundaries = unhandled errors crash entire routes
- Users see generic browser errors instead of branded error UI

**Action Items:**

1. **HIGH PRIORITY:** Create root `app/loading.tsx`
2. **HIGH PRIORITY:** Create root `app/error.tsx`
3. **MEDIUM:** Add `loading.tsx` to `/blogs`, `/projects`, `/services`
4. **MEDIUM:** Add `error.tsx` to `/blogs`, `/projects`

---

### 2. API Routes & Error Handling ⚠️ **NEEDS IMPROVEMENT**

#### `/api/contact/route.ts`

**Current:**

```typescript
// ✅ Has basic validation
// ✅ Has error handling
// ❌ NOT using Zod (manual checks)
// ❌ NO rate limiting
// ⚠️ Basic sanitization (just trim)
```

**Issues:**

- Manual validation is error-prone
- No rate limiting = spam vulnerability
- Missing structured error responses

**Recommended Changes:**

```typescript
// Add Zod schema
import { z } from 'zod'

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10).max(500),
})

// Add rate limiting
import { rateLimit } from '@/lib/rate-limit'
const limiter = rateLimit({ interval: 60000, uniqueTokenPerInterval: 500 })

export async function POST(request: NextRequest) {
  // Rate limit check
  const identifier = request.ip ?? 'anonymous'
  const { success } = await limiter.check(identifier, 3) // 3/min

  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const validated = contactSchema.parse(body) // Use Zod
    // ... rest of logic
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    // ... handle other errors
  }
}
```

#### `/api/chat/route.ts`

**Current:**

```typescript
// ✅ Has rate limiting (good!)
// ✅ Good error handling
// ❌ NOT using Zod
// ⚠️ Very long file (673 lines) - could be split
```

**Recommendation:** Good implementation overall. Consider:

1. Extract `calculateQualificationScore` to utility file
2. Move system prompt building to separate file
3. Add Zod validation for incoming payload

---

### 3. Server Actions ❌ **NOT IMPLEMENTED**

**Current State:**

```bash
$ grep -r "'use server'" src/
# No results
```

**Issue:**
You're using API routes for everything. Server Actions provide:

- Automatic CSRF protection
- Better form handling with `useFormState`
- Simpler code (no manual API calls)
- Progressive enhancement

**Example Migration:** Contact Form

**Before (Current):**

```typescript
// API route + fetch
export async function POST(request: Request) {
  const body = await request.json()
  // validation...
  // process...
}

// Client component
const handleSubmit = async data => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
```

**After (Recommended):**

```typescript
// lib/actions/contact.ts
'use server'

export async function submitContactForm(prevState: any, formData: FormData) {
  const validated = contactSchema.parse({
    firstName: formData.get('firstName'),
    email: formData.get('email'),
    // ...
  })

  // Process...
  return { success: true, message: 'Sent!' }
}

// Client component
'use client'
import { useFormState } from 'react-dom'

const [state, formAction] = useFormState(submitContactForm, null)
return <form action={formAction}>...</form>
```

**Action:** Create `src/lib/actions/` directory and migrate forms

---

### 4. Security Implementations ⚠️ **PARTIAL**

#### ✅ What You Have:

- Rate limiting in chat API
- Sentry error tracking
- Environment variables for secrets
- Basic input sanitization (trim)

#### ❌ What's Missing:

**No DOMPurify:**

```bash
$ grep -r "DOMPurify" src/
# No results
```

**Risk:** XSS vulnerability if displaying user-generated content

**Fix:**

```bash
npm install isomorphic-dompurify
```

```typescript
// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify'

export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}
```

**No Zod Validation:**

- Currently using manual checks
- Error-prone and inconsistent

**Action:** Replace all manual validation with Zod schemas

**Missing Rate Limiting Utility:**

- Rate limiting is hardcoded in chat route
- Need reusable utility for all API routes

**Action:** Create `src/lib/rate-limit.ts` (see SECURITY_CHECKLIST.md)

---

### 5. Component Architecture ⚠️ **TOO MANY CLIENT COMPONENTS**

**Statistics:**

- Total components: **53**
- Client Components: **29** (55%)
- Server Components: **24** (45%)

**Issue:**
Over half your components are Client Components. Many could be Server Components.

**Examples to Review:**

Look for components with `'use client'` that:

- Don't use `useState`, `useEffect`, or other hooks
- Don't have `onClick`, `onChange`, or event handlers
- Don't use browser APIs
- Just display data

**Common Pattern to Fix:**

```typescript
// ❌ Unnecessary 'use client'
'use client'

export function BlogCard({ post }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
    </div>
  )
}

// ✅ Should be Server Component
export function BlogCard({ post }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
    </div>
  )
}
```

**Action:** Audit components and remove unnecessary `'use client'` directives

---

### 6. TypeScript Standards ✅ **GOOD**

**Current State:**

- Using interfaces properly
- Good prop typing
- No obvious `any` types
- Proper async component typing

**Keep doing this!**

---

### 7. Validation & Error Classes ❌ **MISSING**

**Current:** Manual validation and generic errors

**Recommended:** Create custom error classes

```typescript
// lib/errors.ts
export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'NOT_FOUND')
  }
}

export class ValidationError extends APIError {
  constructor(
    message: string,
    public fields?: Record<string, string[]>
  ) {
    super(400, message, 'VALIDATION_ERROR')
  }
}
```

**Usage in API routes:**

```typescript
try {
  const post = await getPost(slug)
  if (!post) throw new NotFoundError('Post')
  return NextResponse.json(post)
} catch (error) {
  if (error instanceof NotFoundError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    )
  }
  // ... handle others
}
```

---

## Priority Action Plan

### 🔴 **CRITICAL (Do First)**

1. **Create missing special files** (2-3 hours)

   ```bash
   # Create these files using ERROR_HANDLING_GUIDE.md
   src/app/loading.tsx
   src/app/error.tsx
   src/app/blogs/loading.tsx
   src/app/blogs/error.tsx
   src/app/projects/loading.tsx
   src/app/projects/error.tsx
   ```

2. **Add Zod validation to API routes** (3-4 hours)
   - Install: `npm install zod` (already installed)
   - Create schemas for `/api/contact`, `/api/chat`
   - Replace manual validation

3. **Install and implement DOMPurify** (1 hour)

   ```bash
   npm install isomorphic-dompurify
   ```

   - Create `lib/sanitize.ts`
   - Use wherever displaying user content

### 🟡 **HIGH PRIORITY (Do Next)**

4. **Create rate limiting utility** (2 hours)
   - Create `src/lib/rate-limit.ts`
   - Add to `/api/contact` and other public routes
   - See SECURITY_CHECKLIST.md for implementation

5. **Create custom error classes** (1 hour)
   - Create `src/lib/errors.ts`
   - Use in API routes for consistent error handling

6. **Audit Client Components** (3-4 hours)
   - Review 29 Client Components
   - Remove `'use client'` where not needed
   - Target: reduce to ~30% Client Components

### 🟢 **MEDIUM PRIORITY (After Above)**

7. **Implement Server Actions** (4-6 hours)
   - Create `src/lib/actions/` directory
   - Migrate contact form to Server Action
   - Migrate other forms as needed

8. **Add error boundaries to key pages** (2 hours)
   - Create route-specific error.tsx files
   - Customize error messages per route

9. **Security headers** (1 hour)
   - Add security headers to `next.config.ts`
   - See SECURITY_CHECKLIST.md

### 🔵 **LOW PRIORITY (Nice to Have)**

10. **Testing setup** (4-8 hours)
    - Install Vitest or Jest
    - Add tests for critical paths
    - Target 80% coverage

11. **Performance optimization** (Ongoing)
    - Review bundle size with `npm run analyze`
    - Add dynamic imports for heavy components
    - Optimize images

---

## Files to Create

### 1. `src/lib/rate-limit.ts`

See `SECURITY_CHECKLIST.md` for full implementation.

### 2. `src/lib/errors.ts`

See `ERROR_HANDLING_GUIDE.md` Section 5.

### 3. `src/lib/sanitize.ts`

```typescript
import DOMPurify from 'isomorphic-dompurify'

export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}
```

### 4. `src/lib/actions/contact.ts`

See `CODING_STANDARDS.md` Section 4 for Server Actions pattern.

### 5. Special Files

See `ERROR_HANDLING_GUIDE.md` for all loading/error state templates.

---

## Testing Your Improvements

### After Creating Special Files:

```bash
# 1. Delete .next cache
npm run clean

# 2. Rebuild
npm run build

# 3. Test loading states
# Navigate to /blogs - should see loading skeleton

# 4. Test error boundaries
# Temporarily throw error in a page component
throw new Error('Test error')
# Should see custom error page, not browser error
```

### After Adding Zod:

```bash
# Test invalid data
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email": "invalid"}'

# Should return 400 with Zod error details
```

### After Rate Limiting:

```bash
# Rapid fire requests
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Test","lastName":"User","email":"test@test.com","message":"Hello"}'
done

# Should get 429 after rate limit
```

---

## Estimated Time to Full Compliance

- **Critical Items:** 8-10 hours
- **High Priority:** 8-12 hours
- **Medium Priority:** 8-12 hours
- **Low Priority:** 12-20 hours

**Total:** 36-54 hours (4-7 business days)

---

## Resources

- `CODING_STANDARDS.md` - Main reference
- `SECURITY_CHECKLIST.md` - Security implementations
- `ERROR_HANDLING_GUIDE.md` - Loading/error patterns
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Zod Documentation](https://zod.dev/)

---

## Questions?

Review the three standards documents:

1. `CODING_STANDARDS.md` - How to write code
2. `SECURITY_CHECKLIST.md` - Security best practices
3. `ERROR_HANDLING_GUIDE.md` - Error handling patterns

**Need help?** Reference specific sections in these docs for examples and patterns.
