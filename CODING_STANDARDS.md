# Coding Standards - PixelMojo Portfolio

## Project Structure

```
pixelmojo-2026/
├── src/
│   ├── app/               # Next.js 15 App Router
│   │   ├── api/          # API routes
│   │   ├── blogs/        # Blog pages
│   │   ├── projects/     # Portfolio pages
│   │   ├── services/     # Service pages
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Homepage
│   ├── components/
│   │   ├── ui/           # Reusable UI components (Button, etc.)
│   │   ├── blog/         # Blog-specific components
│   │   ├── chat/         # Chat widget components
│   │   └── services/     # Service page components
│   ├── lib/              # Core utilities
│   │   └── data/         # Data fetching functions
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions
│   └── data/             # Static data/constants
├── content/              # MDX blog posts
├── public/               # Static assets
├── scripts/              # Dev helper scripts
└── supabase/            # Database migrations
```

## Quick Reference (Most Important Rules)

- ✅ **Default to Server Components** - Only use `'use client'` when you need interactivity
- ✅ **Validate all inputs** - Use Zod schemas for forms and API routes
- ✅ **No `any` types** - Always use proper TypeScript typing
- ✅ **Use `cn()` for classes** - Conditional Tailwind classes with the cn() utility
- ✅ **Error handling** - Add `loading.tsx` and `error.tsx` to all routes
- ✅ **Security first** - Sanitize user content, use environment variables, implement rate limiting
- ✅ **Mobile-first** - Design for mobile, enhance for desktop
- ✅ **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- ⛔ **No inline styles** - Use Tailwind classes instead
- ⛔ **No console.logs** - Remove before committing

## Code Standards

### 1. Server vs Client Components

**DEFAULT TO SERVER COMPONENTS**

```typescript
// ✅ Server Component (default)
// app/blog/page.tsx
export default async function BlogPage() {
  const posts = await getPosts() // Direct data fetching
  return <BlogList posts={posts} />
}

// ✅ Client Component (only when needed)
// components/ui/ThemeToggle.tsx
'use client'
import { useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
}

// ✅ Fetch in Server Components
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`/api/products/${params.id}`, {
    next: { revalidate: 3600 } // ISR - revalidate every hour
  })
  return <ProductDetails product={product} />
}

// ✅ Static Generation
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// ✅ Metadata Generation
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.description,
  }
}
```

### 2. API Routes & Error Handling

```typescript
// app/api/newsletter/route.ts
import { z } from 'zod'
import { NextRequest, NextResponse } from 'next/server'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate
    const body = await request.json()
    const { email, name } = schema.parse(body)

    // Process subscription
    await subscribeToNewsletter({ email, name })

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 200 }
    )
  } catch (error) {
    // Validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    // Log unexpected errors (use Sentry in production)
    console.error('Newsletter subscription error:', error)

    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}

// ✅ GET endpoint with query params
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '10')

  const posts = await getPosts({ page, limit })

  return NextResponse.json({ posts, page, limit })
}
```

### 3. TypeScript Standards

```typescript
// ✅ Proper Interface Definition
interface BlogPost {
  id: string
  title: string
  content: string
  author: Author
  publishedAt: Date
  tags: string[]
}

// ✅ Proper Props Typing
interface CardProps {
  title: string
  description?: string // Optional
  onClick: () => void
  children: React.ReactNode
}

// ✅ Async Component Typing
interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// ❌ NEVER use 'any'
const data: any = {} // WRONG!
```

### 4. Server Actions

```typescript
// lib/actions/contact.ts
'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500),
})

// ✅ Server Action with proper error handling
export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    // Validate
    const validatedFields = contactSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    })

    // Process (e.g., send email, save to DB)
    await sendContactEmail(validatedFields)

    // Revalidate if needed
    revalidatePath('/contact')

    return {
      success: true,
      message: 'Message sent successfully!',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }

    return {
      success: false,
      message: 'Failed to send message. Please try again.',
    }
  }
}

// ✅ Server Action with redirect
export async function createPost(formData: FormData) {
  const post = await db.post.create({
    data: {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    },
  })

  revalidatePath('/blog')
  redirect(`/blog/${post.slug}`)
}

// ✅ Using in Client Component with useFormState
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitContactForm } from '@/lib/actions/contact'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  )
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, null)

  return (
    <form action={formAction}>
      <input name="name" required />
      {state?.errors?.name && <p className="text-red-500">{state.errors.name}</p>}

      <input name="email" type="email" required />
      {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}

      <textarea name="message" required />
      {state?.errors?.message && <p className="text-red-500">{state.errors.message}</p>}

      <SubmitButton />

      {state?.success && <p className="text-green-500">{state.message}</p>}
    </form>
  )
}
```

### 5. Loading & Error States

```typescript
// ✅ app/loading.tsx - Automatic loading UI with Suspense
export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  )
}

// ✅ app/error.tsx - Automatic error handling
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service (Sentry)
    console.error('Error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  )
}

// ✅ app/not-found.tsx - Custom 404
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  )
}

// ✅ app/global-error.tsx - Global error handler
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  )
}
```

### 6. Error Handling Patterns

```typescript
// ✅ Custom Error Classes
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

export class ValidationError extends Error {
  constructor(
    message: string,
    public fields?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`)
    this.name = 'NotFoundError'
  }
}

// ✅ Error Handling in API Routes
export async function GET(request: NextRequest) {
  try {
    const data = await fetchData()
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    if (error instanceof APIError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      )
    }

    // Log unexpected errors
    console.error('Unexpected error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ✅ Try-Catch Wrapper Utility
export async function tryCatch<T>(
  fn: () => Promise<T>
): Promise<[Error, null] | [null, T]> {
  try {
    const data = await fn()
    return [null, data]
  } catch (error) {
    return [error as Error, null]
  }
}

// Usage:
const [error, data] = await tryCatch(() => fetchData())
if (error) {
  console.error(error)
  return
}
// data is safely typed here
```

### 7. Component Architecture

```typescript
// ✅ Proper Component Structure
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function Page() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <AsyncComponent />
      </Suspense>
    </ErrorBoundary>
  )
}

// ✅ Conditional Rendering
function Component({ isLoading, error, data }) {
  if (error) return <ErrorState error={error} />
  if (isLoading) return <LoadingState />
  if (!data) return <EmptyState />
  return <DataDisplay data={data} />
}
```

### 5. Performance Optimization

```typescript
// ✅ Dynamic Imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // Disable SSR if not needed
})

// ✅ Image Optimization
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>

// ✅ Font Optimization
import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
```

### 6. MDX Content Standards

```markdown
# ✅ Proper Frontmatter

---

title: "Complete Guide to Next.js"
description: "Learn Next.js from scratch" # Under 160 chars
date: 2024-01-15
updated: 2024-01-20
tags: ["nextjs", "react", "tutorial"]
image: "/images/nextjs-guide.jpg"
author: "Your Name"

---
```

### 7. Styling with Tailwind

```typescript
// ✅ Use cn() utility for conditional classes
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  isDisabled && "disabled-classes"
)} />

// ✅ Responsive Design (Mobile First)
<div className="text-sm md:text-base lg:text-lg" />

// ❌ Never use inline styles
<div style={{ color: 'red' }} /> // WRONG!
```

### 8. Testing Standards

```typescript
// __tests__/component.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Component', () => {
  it('should handle user interaction', async () => {
    const user = userEvent.setup()
    render(<Component />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Success')).toBeInTheDocument()
  })
})
```

### 11. Security & Validation

```typescript
// ✅ Input Validation with Zod
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/[0-9]/, 'Password must contain number'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  age: z.number().int().min(13, 'Must be at least 13 years old'),
  website: z.string().url('Invalid URL').optional(),
})

// ✅ Sanitize User Content
import DOMPurify from 'isomorphic-dompurify'

function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}

// Usage in component
<div dangerouslySetInnerHTML={{ __html: sanitizeHTML(userContent) }} />

// ✅ Environment Variables (NEVER hardcode secrets)
// .env.local (never commit to git)
// DATABASE_URL="postgresql://..."
// API_KEY="secret_key"
// NEXTAUTH_SECRET="random_string"

// Access in Server Components/API Routes only
const apiKey = process.env.API_KEY

// For Client Components, prefix with NEXT_PUBLIC_
// NEXT_PUBLIC_SITE_URL="https://pixelmojo.io"

// ✅ Rate Limiting Implementation
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache'

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (limit: number, token: string) =>
      new Promise<{ success: boolean }>((resolve) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1])
          resolve({ success: true })
        } else if (tokenCount[0] < limit) {
          tokenCount[0] += 1
          tokenCache.set(token, tokenCount)
          resolve({ success: true })
        } else {
          resolve({ success: false })
        }
      }),
  }
}

// Usage in API route
import { rateLimit } from '@/lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

export async function POST(request: NextRequest) {
  // Rate limiting
  const identifier = request.ip ?? 'anonymous'
  const { success } = await limiter.check(identifier, 5) // 5 requests per minute

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    )
  }

  // Process request...
}

// ✅ CSRF Protection
// Server Actions automatically include CSRF tokens - no setup needed!

// ✅ Security Headers (next.config.ts)
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
]

export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

## Pre-commit Checklist

**Code Quality**

- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Code formatted with Prettier
- [ ] No console.logs in production code

**Components & Functionality**

- [ ] Default to Server Components (only use 'use client' when needed)
- [ ] Loading states implemented (loading.tsx)
- [ ] Error boundaries added (error.tsx)
- [ ] All images use Next/Image with proper alt text
- [ ] Forms validated with Zod
- [ ] Server Actions use proper error handling

**Security**

- [ ] All user inputs validated
- [ ] User-generated content sanitized (DOMPurify)
- [ ] No hardcoded secrets (use .env)
- [ ] Rate limiting implemented on API routes
- [ ] CSRF protection enabled (automatic with Server Actions)

**Performance & UX**

- [ ] Responsive design tested (mobile-first)
- [ ] Above-fold images use `priority` prop
- [ ] Heavy components use dynamic imports
- [ ] Loading skeletons for async content

**SEO & Accessibility**

- [ ] Meta tags added (title, description, OG)
- [ ] Semantic HTML used
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA

## Development Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript checking
npm run format          # Format with Prettier
npm run format:check    # Check formatting

# Content & Helpers
npm run new:post "Title"      # Create new blog post
npm run new:component "Name"  # Create new component
npm run contentlayer          # Build content
npm run dev:help             # Show helper commands

# Maintenance
npm run clean           # Clean build artifacts
npm run analyze         # Bundle size analysis
```

## Resources

- [Next.js 13+ App Router](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDX Documentation](https://mdxjs.com/)
- [Contentlayer](https://contentlayer.dev/)
