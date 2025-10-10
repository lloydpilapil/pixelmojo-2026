import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

/**
 * NextAuth API Route Handler
 * Handles authentication requests for the admin panel
 */
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
