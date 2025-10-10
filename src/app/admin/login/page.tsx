'use client'

import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, AlertCircle } from 'lucide-react'

/**
 * Admin Login Page
 * Secure session-based authentication with NextAuth
 */
export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/analytics'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid username or password')
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-card border border-border rounded-lg p-8 shadow-lg'>
          <div className='flex justify-center mb-6'>
            <div className='bg-primary/10 p-4 rounded-full'>
              <Lock className='h-8 w-8 text-primary' />
            </div>
          </div>

          <h1 className='text-2xl font-bold text-center mb-2'>Admin Login</h1>
          <p className='text-muted-foreground text-center mb-6'>
            Sign in to access the admin dashboard
          </p>

          {error && (
            <div className='mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded flex items-start gap-2'>
              <AlertCircle className='h-5 w-5 text-destructive flex-shrink-0 mt-0.5' />
              <p className='text-sm text-destructive'>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium mb-2'
              >
                Username
              </label>
              <input
                id='username'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
                className='w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                required
                autoComplete='username'
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium mb-2'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                required
                autoComplete='current-password'
                disabled={isLoading}
              />
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-2.5 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity'
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className='text-center text-sm text-muted-foreground mt-6'>
          Protected by session-based authentication
        </p>
      </div>
    </div>
  )
}
