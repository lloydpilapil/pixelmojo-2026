'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Lock, BarChart3, MessageSquare, LogOut } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        sessionStorage.setItem('admin_authenticated', 'true')
        setIsAuthenticated(true)
        setPassword('')
      } else {
        setError('Incorrect password')
      }
    } catch {
      setError('Authentication failed')
    }
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-muted-foreground'>Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='w-full max-w-md p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4'>
              <Lock className='w-8 h-8 text-primary' />
            </div>
            <h1 className='text-2xl font-bold mb-2'>Admin Access</h1>
            <p className='text-muted-foreground'>
              Enter password to view chat dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Enter admin password'
                className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                autoFocus
              />
            </div>

            {error && (
              <div className='text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-lg'>
                {error}
              </div>
            )}

            <button
              type='submit'
              className='w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium'
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
    router.push('/')
  }

  const tabs = [
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Chats', path: '/admin/chats', icon: MessageSquare },
  ]

  return (
    <div className='min-h-screen bg-background'>
      {/* Header with tabs */}
      <div className='border-b border-border bg-card sticky top-0 z-10 shadow-sm'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between py-4'>
            <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className='flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              <LogOut className='h-4 w-4' />
              Logout
            </button>
          </div>

          {/* Tab Navigation */}
          <div className='flex gap-1 -mb-px'>
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive =
                pathname === tab.path ||
                (tab.path === '/admin/chats' &&
                  pathname.startsWith('/admin/chats/'))

              return (
                <button
                  key={tab.path}
                  onClick={() => router.push(tab.path)}
                  className={`
                    flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-colors
                    ${
                      isActive
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }
                  `}
                >
                  <Icon className='h-4 w-4' />
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Page Content */}
      {children}
    </div>
  )
}
