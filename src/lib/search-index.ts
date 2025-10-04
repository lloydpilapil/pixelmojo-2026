import { allPosts } from '.contentlayer/generated'
import { worksData } from '@/data/works'
import { servicesData } from '@/data/services'

export interface SearchableItem {
  id: string
  title: string
  description: string
  category: 'blog' | 'project' | 'service' | 'page'
  url: string
  tags?: string[]
}

export function buildSearchIndex(): SearchableItem[] {
  const items: SearchableItem[] = []

  // Index blog posts
  allPosts.forEach(post => {
    items.push({
      id: `blog-${post.slug}`,
      title: post.title,
      description: post.description || '',
      category: 'blog',
      url: post.url || `/blogs/${post.slug || post._raw.flattenedPath}`,
      tags: post.tags || [],
    })
  })

  // Index projects
  worksData.forEach(work => {
    items.push({
      id: `project-${work.slug}`,
      title: work.title,
      description: work.description,
      category: 'project',
      url: work.slug,
      tags: work.technologies || [],
    })
  })

  // Index services
  Object.entries(servicesData).forEach(([slug, service]) => {
    items.push({
      id: `service-${slug}`,
      title: service.title,
      description: service.description,
      category: 'service',
      url: `/services/${slug}`,
      tags: [],
    })
  })

  // Index static pages
  const staticPages: SearchableItem[] = [
    {
      id: 'page-home',
      title: 'Home',
      description: 'AI-native design agency transforming ideas into revenue',
      category: 'page',
      url: '/',
    },
    {
      id: 'page-about',
      title: 'About',
      description: 'Learn about our team and mission',
      category: 'page',
      url: '/about',
    },
    {
      id: 'page-contact',
      title: 'Contact',
      description: 'Get in touch with us',
      category: 'page',
      url: '/contact-us',
    },
  ]

  items.push(...staticPages)
  return items
}

export function getCategoryLabel(category: SearchableItem['category']): string {
  const labels = {
    blog: 'Blog',
    project: 'Project',
    service: 'Service',
    page: 'Page',
  }
  return labels[category]
}
