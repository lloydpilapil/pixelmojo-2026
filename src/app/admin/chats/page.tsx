'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface Lead {
  email?: string
  name?: string
  project_type?: string
  budget_range?: string
  qualification_score: number
}

interface Session {
  id: string
  created_at: string
  email: string | null
  message_count: number
  status: string
  lead: Lead | null
}

export default function AdminChatsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/admin/sessions')
      const data = await response.json()
      setSessions(data.sessions || [])
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true
    if (filter === 'leads') return session.lead !== null
    if (filter === 'high-score')
      return (session.lead?.qualification_score ?? 0) >= 7
    return true
  })

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center'>Loading conversations...</div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-4'>Chat Conversations</h1>
        <p className='text-muted-foreground'>
          View and manage all chat conversations from your website
        </p>
      </div>

      {/* Filters */}
      <div className='mb-6 flex gap-2'>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          All ({sessions.length})
        </button>
        <button
          onClick={() => setFilter('leads')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'leads'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Leads ({sessions.filter(s => s.lead).length})
        </button>
        <button
          onClick={() => setFilter('high-score')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'high-score'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          High Score (7+) (
          {sessions.filter(s => (s.lead?.qualification_score ?? 0) >= 7).length}
          )
        </button>
      </div>

      {/* Sessions List */}
      <div className='space-y-4'>
        {filteredSessions.length === 0 ? (
          <div className='text-center py-8 text-muted-foreground'>
            No conversations found
          </div>
        ) : (
          filteredSessions.map(session => (
            <Link
              key={session.id}
              href={`/admin/chats/${session.id}`}
              className='block p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow'
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <h3 className='font-semibold'>
                      {session.lead?.name || session.email || 'Anonymous'}
                    </h3>
                    {session.lead && (
                      <span className='px-2 py-1 bg-primary/10 text-primary text-xs rounded-full'>
                        Score: {session.lead.qualification_score}/10
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        session.status === 'active'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-gray-500/10 text-gray-500'
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>
                  <div className='text-sm text-muted-foreground space-y-1'>
                    {session.lead?.email && <p>📧 {session.lead.email}</p>}
                    {session.lead?.project_type && (
                      <p>💼 {session.lead.project_type}</p>
                    )}
                    {session.lead?.budget_range && (
                      <p>💰 {session.lead.budget_range}</p>
                    )}
                    <p>💬 {session.message_count} messages</p>
                  </div>
                </div>
                <div className='text-right text-sm text-muted-foreground'>
                  {formatDistanceToNow(new Date(session.created_at), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
