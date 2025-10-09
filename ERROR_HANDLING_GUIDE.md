# Error Handling Guide - PixelMojo

## Next.js 15 Special Files Overview

```
app/
├── loading.tsx          # Automatic loading UI
├── error.tsx            # Error boundary for this route
├── not-found.tsx        # Custom 404 page
├── global-error.tsx     # Global error handler
└── [route]/
    ├── loading.tsx      # Route-specific loading
    └── error.tsx        # Route-specific error
```

## 1. Loading States

### Root Loading (app/loading.tsx)

```typescript
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F90B8A]" />
    </div>
  )
}
```

### Route-Specific Loading (app/blogs/loading.tsx)

```typescript
export default function BlogsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Skeleton for blog posts */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Component-Level Loading with Suspense

```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <Suspense fallback={<BlogPostsSkeleton />}>
        <BlogPosts />
      </Suspense>
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments />
      </Suspense>
    </div>
  )
}

async function BlogPosts() {
  const posts = await getPosts() // Streaming
  return <PostsList posts={posts} />
}
```

## 2. Error Boundaries

### Root Error Boundary (app/error.tsx)

```typescript
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error('Root error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Please try again.
        </p>
        <div className="space-x-4">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Go Home
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto">
              {error.message}
              {'\n\n'}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
```

### Route-Specific Error (app/blogs/error.tsx)

```typescript
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Blog error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Failed to load blog posts
      </h2>
      <p className="text-gray-600 mb-6">
        We couldn't load the blog posts. Please try again.
      </p>
      <div className="space-x-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
        <Link href="/" className="px-4 py-2 border rounded hover:bg-gray-50">
          Go Home
        </Link>
      </div>
    </div>
  )
}
```

### Global Error Handler (app/global-error.tsx)

```typescript
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
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Something went wrong!
          </h2>
          <button
            onClick={reset}
            style={{
              padding: '0.5rem 1rem',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
```

## 3. Custom 404 Pages

### Root Not Found (app/not-found.tsx)

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/blogs">View Blog</Link>
        </Button>
      </div>
    </div>
  )
}
```

### Programmatic 404 (in page.tsx)

```typescript
import { notFound } from 'next/navigation'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound() // Triggers not-found.tsx
  }

  return <article>{/* Render post */}</article>
}
```

## 4. API Route Error Handling

### Standard Pattern

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = schema.parse(body)

    // Process request
    const result = await processRequest(validated)

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    // Validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    // Custom errors
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      )
    }

    // Unexpected errors
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## 5. Custom Error Classes

### lib/errors.ts

```typescript
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public fields?: Record<string, string[]>
  ) {
    super(400, message, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(403, message, 'FORBIDDEN')
    this.name = 'ForbiddenError'
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests') {
    super(429, message, 'RATE_LIMIT_EXCEEDED')
    this.name = 'RateLimitError'
  }
}
```

### Usage Example

```typescript
import { NotFoundError, ValidationError } from '@/lib/errors'

export async function getPost(slug: string) {
  const post = await db.post.findUnique({ where: { slug } })

  if (!post) {
    throw new NotFoundError('Post')
  }

  return post
}

export async function createUser(data: unknown) {
  const validated = userSchema.safeParse(data)

  if (!validated.success) {
    throw new ValidationError(
      'Invalid user data',
      validated.error.flatten().fieldErrors
    )
  }

  return db.user.create({ data: validated.data })
}
```

## 6. Server Action Error Handling

### lib/actions/contact.ts

```typescript
'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10).max(500),
})

type FormState = {
  success: boolean
  message?: string
  errors?: Record<string, string[]>
}

export async function submitContactForm(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  try {
    const validated = contactSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    })

    await sendEmail(validated)

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

    console.error('Contact form error:', error)
    return {
      success: false,
      message: 'Failed to send message. Please try again.',
    }
  }
}
```

### Client Component Usage

```typescript
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
    <form action={formAction} className="space-y-4">
      <div>
        <input name="name" placeholder="Name" required />
        {state?.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name}</p>
        )}
      </div>

      <div>
        <input name="email" type="email" placeholder="Email" required />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div>
        <textarea name="message" placeholder="Message" required />
        {state?.errors?.message && (
          <p className="text-red-500 text-sm">{state.errors.message}</p>
        )}
      </div>

      <SubmitButton />

      {state?.success && (
        <p className="text-green-600">{state.message}</p>
      )}
      {state?.success === false && state.message && (
        <p className="text-red-600">{state.message}</p>
      )}
    </form>
  )
}
```

## 7. Try-Catch Wrapper Utility

### lib/utils/error-handler.ts

```typescript
type Result<T> = [null, T] | [Error, null]

export async function tryCatch<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await fn()
    return [null, data]
  } catch (error) {
    return [error as Error, null]
  }
}

// Usage
const [error, data] = await tryCatch(() => fetchData())
if (error) {
  console.error('Failed to fetch:', error)
  return
}
// data is safely typed here
console.log(data)
```

## 8. Error Monitoring with Sentry

### instrumentation.ts

```typescript
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}
```

### Logging Errors

```typescript
import * as Sentry from '@sentry/nextjs'

try {
  // Your code
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'api',
      endpoint: '/api/contact',
    },
    extra: {
      userId: user?.id,
      requestId: req.headers.get('x-request-id'),
    },
  })

  // Handle error
}
```

## Quick Reference

### When to Use Each

- **`loading.tsx`** - Every async page/route
- **`error.tsx`** - Routes that fetch data
- **`not-found.tsx`** - Dynamic routes (blogs, projects)
- **`global-error.tsx`** - Root level only
- **Custom errors** - API routes and server actions
- **Suspense** - Granular loading states within pages

### Error Handling Priority

1. Validate inputs (Zod)
2. Handle known errors (custom error classes)
3. Log unexpected errors (Sentry)
4. Return user-friendly messages
5. Never expose stack traces in production

### Testing Errors in Development

```typescript
// Trigger error boundary
if (process.env.NODE_ENV === 'development') {
  throw new Error('Test error')
}

// Trigger 404
if (process.env.NODE_ENV === 'development') {
  notFound()
}
```
