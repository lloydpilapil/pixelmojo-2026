'use client'

import { SessionProvider } from 'next-auth/react'

/**
 * Admin Session Provider
 * Wraps admin pages with NextAuth session context
 */
export function AdminSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}
