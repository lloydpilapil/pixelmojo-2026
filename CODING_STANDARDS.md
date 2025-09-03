# Coding Standards - PixelMojo Portfolio

## Project Structure

```
app/
├── (routes)/          # Route groups
├── api/              # API routes
├── [dynamic]/        # Dynamic routes
└── layout.tsx        # Root layout
components/
├── ui/               # Reusable UI components
├── layout/           # Layout components
└── features/         # Feature-specific components
content/
├── posts/            # Blog MDX files
└── projects/         # Portfolio MDX files
lib/
├── utils/            # Utility functions
└── hooks/            # Custom hooks
```

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

### 2. API Routes

```typescript
// app/api/newsletter/route.ts
import { z } from 'zod'
import { NextResponse } from 'next/server'

const schema = z.object({
  email: z.string().email(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = schema.parse(body)
    
    // Process subscription
    await subscribeToNewsletter(email)
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
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

### 4. Component Architecture

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

### 9. Security & Validation

```typescript
// ✅ Validate all inputs
const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(500),
})

// ✅ Sanitize user content
import DOMPurify from 'isomorphic-dompurify'
const clean = DOMPurify.sanitize(userInput)

// ✅ Use environment variables
const apiKey = process.env.API_KEY // Never hardcode secrets

// ✅ Implement rate limiting
import { rateLimit } from '@/lib/rate-limit'
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})
```

## Pre-commit Checklist

- [ ] No TypeScript errors
- [ ] All images use Next/Image
- [ ] Loading states implemented
- [ ] Error boundaries added
- [ ] Forms validated with Zod
- [ ] No console.logs
- [ ] Responsive design tested
- [ ] Accessibility checked
- [ ] Meta tags added
- [ ] Performance optimized

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