// Utility functions for triggering revalidation

const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN || 'your-secret-token'
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

interface RevalidateOptions {
  type: 'blog-post' | 'blog-listing' | 'content' | 'tag' | 'full-site'
  slug?: string
  paths?: string[]
}

export async function triggerRevalidation(options: RevalidateOptions) {
  try {
    const response = await fetch(`${BASE_URL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${REVALIDATE_TOKEN}`,
      },
      body: JSON.stringify(options),
    })

    if (!response.ok) {
      throw new Error(`Revalidation failed: ${response.statusText}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Revalidation error:', error)
    throw error
  }
}

// Helper functions for common revalidation scenarios
export const revalidationHelpers = {
  // Revalidate when a blog post is published/updated
  async blogPostUpdated(slug: string) {
    return triggerRevalidation({
      type: 'blog-post',
      slug,
    })
  },

  // Revalidate when blog listing changes (new post, featured post changed)
  async blogListingUpdated() {
    return triggerRevalidation({
      type: 'blog-listing',
    })
  },

  // Revalidate specific content pages
  async contentUpdated(paths: string[]) {
    return triggerRevalidation({
      type: 'content',
      paths,
    })
  },

  // Revalidate by cache tag
  async tagUpdated(tag: string) {
    return triggerRevalidation({
      type: 'tag',
      slug: tag,
    })
  },

  // Emergency full site revalidation
  async emergencyRevalidation() {
    return triggerRevalidation({
      type: 'full-site',
    })
  },
}

// Example usage in your content management workflow:
//
// 1. When you publish a new blog post:
// await revalidationHelpers.blogPostUpdated('my-new-post-slug')
//
// 2. When you update your featured posts:
// await revalidationHelpers.blogListingUpdated()
//
// 3. When you update service pages:
// await revalidationHelpers.contentUpdated(['/services', '/services/ai-product-development'])
//
// 4. Emergency revalidation:
// await revalidationHelpers.emergencyRevalidation()

// Webhook handler for external CMS (if you integrate with Contentful, Sanity, etc.)
export async function handleWebhook(webhookData: Record<string, unknown>) {
  try {
    // Parse webhook data based on your CMS
    const { type, slug, collection } = webhookData

    if (collection === 'blog-posts') {
      if (type === 'publish' || type === 'update') {
        await revalidationHelpers.blogPostUpdated(slug as string)
      } else if (type === 'delete') {
        await revalidationHelpers.blogListingUpdated()
      }
    }

    // Add more webhook handling logic as needed
    return { success: true }
  } catch (error) {
    console.error('Webhook handling error:', error)
    return { success: false, error }
  }
}
