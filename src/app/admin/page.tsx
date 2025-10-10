'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to analytics by default
    router.replace('/admin/analytics')
  }, [router])

  return (
    <div className='flex items-center justify-center min-h-[50vh]'>
      <div className='text-center'>
        <div className='animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4' />
        <p className='text-muted-foreground'>Loading dashboard...</p>
      </div>
    </div>
  )
}
