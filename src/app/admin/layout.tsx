'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { BarChart3, MessageSquare, LogOut, Search } from 'lucide-react'
import { AdminSessionProvider } from './providers'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated (except on login page)
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [status, pathname, router])

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='text-center'>
          <div className='animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4' />
          <p className='text-muted-foreground'>Loading...</p>
        </div>
      </div>
    )
  }

  // Show login page (the login page itself will be rendered as children)
  if (status === 'unauthenticated') {
    return <>{children}</>
  }

  // Show authenticated admin dashboard
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const tabs = [
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'SEO', path: '/admin/seo', icon: Search },
    { name: 'Chats', path: '/admin/chats', icon: MessageSquare },
  ]

  // Don't show navigation on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Header with tabs */}
      <div className='border-b border-border bg-card sticky top-0 z-10 shadow-sm'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between py-4'>
            <div>
              <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
              {session?.user?.email && (
                <p className='text-sm text-muted-foreground'>
                  {session.user.email}
                </p>
              )}
            </div>
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
                  pathname.startsWith('/admin/chats/')) ||
                (tab.path === '/admin/seo' &&
                  pathname.startsWith('/admin/seo/'))

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
      <div className='container mx-auto px-4 py-6'>{children}</div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminSessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminSessionProvider>
  )
}
