'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface BlogLayoutContextType {
  tableOfContents: ReactNode | null
  sidebar: ReactNode | null
  setTableOfContents: (content: ReactNode) => void
  setSidebar: (content: ReactNode) => void
}

const BlogLayoutContext = createContext<BlogLayoutContextType | null>(null)

export function BlogLayoutProvider({ children }: { children: ReactNode }) {
  const [tableOfContents, setTableOfContents] = useState<ReactNode | null>(null)
  const [sidebar, setSidebar] = useState<ReactNode | null>(null)

  return (
    <BlogLayoutContext.Provider value={{ 
      tableOfContents, 
      sidebar, 
      setTableOfContents, 
      setSidebar 
    }}>
      {children}
    </BlogLayoutContext.Provider>
  )
}

export function useBlogLayout() {
  const context = useContext(BlogLayoutContext)
  if (!context) {
    throw new Error('useBlogLayout must be used within BlogLayoutProvider')
  }
  return context
}