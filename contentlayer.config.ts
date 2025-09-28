import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypeSlug from 'rehype-slug'

// Type definitions for ToC
export interface TOCItem {
  id: string
  text: string
  level: number
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description:
        'The title of the post (recommended: 50-60 characters for SEO)',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The publication date of the post',
      required: true,
    },
    createdDate: {
      type: 'date',
      description: 'The date when the post was first created',
      required: false,
    },
    updatedDate: {
      type: 'date',
      description: 'The date when the post was last updated',
      required: false,
    },
    description: {
      type: 'string',
      description:
        'The description of the post (recommended: 120-160 characters for SEO)',
      required: false,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Tags for the post',
      required: false,
    },
    showTOC: {
      type: 'boolean',
      description: 'Whether to show table of contents in sidebar',
      required: false,
      default: true,
    },
    showCTA: {
      type: 'boolean',
      description: 'Whether to show CTA in sidebar',
      required: false,
      default: true,
    },
    featuredImage: {
      type: 'string',
      description: 'Featured image URL for the post',
      required: false,
    },
    featured: {
      type: 'boolean',
      description: 'Marks the post as featured on the blog overview',
      required: false,
      default: false,
    },
    slug: {
      type: 'string',
      description:
        'Custom slug for the post URL (optional, overrides filename)',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/blogs/${post.slug || post._raw.flattenedPath}`,
    },
    headings: {
      type: 'json',
      resolve: async doc => {
        // Process the raw MDX to extract headings
        const headingsRegex = /^(#{1,6})\s+(.+)$/gm
        const headings: TOCItem[] = []
        let match

        while ((match = headingsRegex.exec(doc.body.raw)) !== null) {
          const level = match[1].length
          const text = match[2].trim()

          // Generate slug to match rehype-slug
          const id = text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/^-+|-+$/g, '')

          headings.push({
            id,
            text,
            level,
          })
        }

        return headings
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypeSlug],
  },
})
