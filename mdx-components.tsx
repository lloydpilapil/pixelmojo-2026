import { useMDXComponents as _useMDXComponents } from '@/components/mdx-components'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return _useMDXComponents(components)
}