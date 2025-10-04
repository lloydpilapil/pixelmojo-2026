import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { buildSearchIndex } from '@/lib/search-index'

export function useSearch() {
  const [query, setQuery] = useState('')

  // Build search index
  const searchIndex = useMemo(() => buildSearchIndex(), [])

  // Configure Fuse.js
  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: 'title', weight: 2 },
          { name: 'tags', weight: 1.5 },
          { name: 'description', weight: 1 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [searchIndex]
  )

  // Perform search - limit to 8 for dropdown, unlimited for search page
  const allResults = useMemo(() => {
    if (!query.trim()) return []
    const searchResults = fuse.search(query)
    return searchResults.map(result => result.item)
  }, [query, fuse])

  const results = useMemo(() => {
    return allResults.slice(0, 8)
  }, [allResults])

  return {
    query,
    setQuery,
    results, // Limited to 8 for dropdown
    allResults, // All results for search page
    isSearching: query.trim().length > 0,
  }
}
