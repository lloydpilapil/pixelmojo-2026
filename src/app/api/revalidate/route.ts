import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

// Secret token for security (set in environment variables)
const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN || 'your-secret-token'

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (token !== REVALIDATE_TOKEN) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { type, slug, paths } = body

    const revalidatedPaths: string[] = []

    switch (type) {
      case 'blog-post':
        // Revalidate specific blog post
        if (slug) {
          const postPath = `/blog/${slug}`
          await revalidatePath(postPath)
          revalidatedPaths.push(postPath)
        }

        // Also revalidate blog listing pages
        await revalidatePath('/blog')
        revalidatedPaths.push('/blog')

        // Revalidate paginated blog pages (first few pages)
        for (let i = 2; i <= 5; i++) {
          const pagePath = `/blog/page/${i}`
          await revalidatePath(pagePath)
          revalidatedPaths.push(pagePath)
        }

        // Revalidate home page (if it shows recent articles)
        await revalidatePath('/')
        revalidatedPaths.push('/')
        break

      case 'blog-listing':
        // Revalidate all blog-related pages
        await revalidatePath('/blog')
        await revalidatePath('/')
        revalidatedPaths.push('/blog', '/')

        // Revalidate all paginated blog pages
        for (let i = 2; i <= 10; i++) {
          const pagePath = `/blog/page/${i}`
          await revalidatePath(pagePath)
          revalidatedPaths.push(pagePath)
        }
        break

      case 'content':
        // Revalidate specific paths
        if (paths && Array.isArray(paths)) {
          for (const path of paths) {
            await revalidatePath(path)
            revalidatedPaths.push(path)
          }
        }
        break

      case 'tag':
        // Revalidate by cache tag
        if (slug) {
          await revalidateTag(slug)
          revalidatedPaths.push(`tag:${slug}`)

          // Also revalidate common paths associated with this tag
          const tagMappings: Record<string, string[]> = {
            'blog-content': ['/blog', '/', '/blog/page/2', '/blog/page/3'],
            'static-pages': ['/about', '/services', '/works'],
            images: ['/'],
            'static-assets': ['/'],
            'dynamic-pages': ['/contact-us'],
            'api-routes': ['/api/revalidate'],
          }

          const associatedPaths = tagMappings[slug] || []
          for (const path of associatedPaths) {
            await revalidatePath(path)
            revalidatedPaths.push(path)
          }
        }
        break

      case 'cache-tags':
        // Revalidate multiple cache tags at once
        if (body.tags && Array.isArray(body.tags)) {
          for (const tag of body.tags) {
            await revalidateTag(tag)
            revalidatedPaths.push(`tag:${tag}`)
          }
        }
        break

      case 'full-site':
        // Emergency revalidation of key pages
        const keyPaths = [
          '/',
          '/blog',
          '/about',
          '/services',
          '/works',
          '/contact-us',
        ]

        for (const path of keyPaths) {
          await revalidatePath(path)
          revalidatedPaths.push(path)
        }
        break

      default:
        return NextResponse.json(
          { message: 'Invalid revalidation type' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      message: 'Revalidation successful',
      revalidated: revalidatedPaths,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      {
        message: 'Revalidation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET method for health check
export async function GET() {
  return NextResponse.json({
    message: 'Revalidation API is healthy',
    timestamp: new Date().toISOString(),
  })
}
