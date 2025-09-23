'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
  serviceTheme?: {
    textColor: string
    mutedTextColor: string
    isDark: boolean
  } | null
}

export function ThemeToggle({ serviceTheme }: ThemeToggleProps = {}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    // Check current theme from HTML first, then saved theme, then default to dark
    const currentHtmlTheme = document.documentElement.getAttribute(
      'data-theme'
    ) as 'light' | 'dark' | null
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initialTheme = savedTheme || currentHtmlTheme || 'dark'

    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 transition-colors duration-200 rounded-full ${
        serviceTheme
          ? 'hover:bg-[var(--header-search-hover)] focus-visible:bg-[var(--header-search-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--header-text)] focus-visible:ring-offset-transparent'
          : 'hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary text-foreground'
      }`}
      style={serviceTheme ? { color: serviceTheme.textColor } : {}}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon className='w-5 h-5' />
      ) : (
        <Sun className='w-5 h-5' />
      )}
    </button>
  )
}
