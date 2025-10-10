import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { NextResponse } from 'next/server'

/**
 * Server-side authentication helper for API routes
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  return {
    authorized: true,
    session,
  }
}
