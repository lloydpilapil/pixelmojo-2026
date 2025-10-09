'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at: string
}

interface Lead {
  email?: string
  name?: string
  company?: string
  phone?: string
  project_type?: string
  industry?: string
  budget_range?: string
  timeline?: string
  notes?: string
  qualification_score: number
  status: string
}

interface Session {
  id: string
  created_at: string
  email: string | null
  visitor_id: string | null
  session_metadata: Record<string, unknown>
  status: string
  message_count: number
  // Location data
  country: string | null
  country_code: string | null
  region: string | null
  city: string | null
  timezone: string | null
  ip_address: string | null
}

// Helper function to get country flag emoji
function getCountryFlag(countryCode: string | null): string {
  if (!countryCode || countryCode.length !== 2) return ''
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

// Helper function to format location
function formatLocation(session: Session): string {
  const parts: string[] = []
  if (session.city) parts.push(session.city)
  if (session.region) parts.push(session.region)
  if (session.country) parts.push(session.country)
  const location = parts.join(', ')
  const flag = getCountryFlag(session.country_code)
  return flag ? `${flag} ${location}` : location
}

export default function ConversationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.sessionId as string

  const [session, setSession] = useState<Session | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [lead, setLead] = useState<Lead | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      fetchConversation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  const fetchConversation = async () => {
    try {
      const response = await fetch(`/api/admin/sessions/${sessionId}`)
      const data = await response.json()
      setSession(data.session)
      setMessages(data.messages)
      setLead(data.lead)
    } catch (error) {
      console.error('Failed to fetch conversation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center'>Loading conversation...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center'>Conversation not found</div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-6xl'>
      {/* Header */}
      <div className='mb-8'>
        <button
          onClick={() => router.push('/admin/chats')}
          className='flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to conversations
        </button>
        <h1 className='text-3xl font-bold mb-2'>
          Conversation with {lead?.name || session.email || 'Anonymous'}
        </h1>
        <p className='text-muted-foreground'>
          Started {format(new Date(session.created_at), 'PPpp')}
        </p>
      </div>

      <div className='grid md:grid-cols-3 gap-8'>
        {/* Conversation */}
        <div className='md:col-span-2'>
          <div className='bg-card border border-border rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Conversation</h2>
            <div className='space-y-4'>
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className='flex items-center gap-2 mb-1'>
                      <span className='text-xs font-semibold'>
                        {message.role === 'user' ? 'User' : 'AI'}
                      </span>
                      <span className='text-xs opacity-70'>
                        {format(new Date(message.created_at), 'p')}
                      </span>
                    </div>
                    <p className='text-sm whitespace-pre-wrap'>
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lead Info Sidebar */}
        <div className='space-y-6'>
          {/* Lead Details */}
          {lead ? (
            <div className='bg-card border border-border rounded-lg p-6'>
              <h2 className='text-xl font-semibold mb-4'>Lead Details</h2>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Score</span>
                  <span className='font-semibold text-primary'>
                    {lead.qualification_score}/10
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Status</span>
                  <span className='px-2 py-1 bg-primary/10 text-primary text-xs rounded-full'>
                    {lead.status}
                  </span>
                </div>
                {lead.email && (
                  <div>
                    <span className='text-sm text-muted-foreground block mb-1'>
                      Email
                    </span>
                    <a
                      href={`mailto:${lead.email}`}
                      className='text-sm text-primary hover:underline'
                    >
                      {lead.email}
                    </a>
                  </div>
                )}
                {lead.name && (
                  <div>
                    <span className='text-sm text-muted-foreground block mb-1'>
                      Name
                    </span>
                    <span className='text-sm'>{lead.name}</span>
                  </div>
                )}
                {lead.company && (
                  <div>
                    <span className='text-sm text-muted-foreground block mb-1'>
                      Company
                    </span>
                    <span className='text-sm'>{lead.company}</span>
                  </div>
                )}
                {lead.phone && (
                  <div>
                    <span className='text-sm text-muted-foreground block mb-1'>
                      Phone
                    </span>
                    <a
                      href={`tel:${lead.phone}`}
                      className='text-sm text-primary hover:underline'
                    >
                      {lead.phone}
                    </a>
                  </div>
                )}
                {lead.project_type && (
                  <div>
                    <span className='text-sm text-muted-foreground block mb-1'>
                      Project Type
                    </span>
                    <span className='text-sm'>{lead.project_type}</span>
                  </div>
                )}
                {lead.industry && (
                  <div>
                    <span className='text-sm text-muted-foreground block mb-1'>
                      Industry
                    </span>
                    <span className='text-sm'>{lead.industry}</span>
                  </div>
                )}
                {lead.budget_range && (
                  <div>
                    <span className='text-sm text-muted-foreground block mb-1'>
                      Budget
                    </span>
                    <span className='text-sm'>{lead.budget_range}</span>
                  </div>
                )}
                {lead.timeline && (
                  <div>
                    <span className='text-sm text-muted-foreground block mb-1'>
                      Timeline
                    </span>
                    <span className='text-sm'>{lead.timeline}</span>
                  </div>
                )}
                {lead.notes && (
                  <div>
                    <span className='text-sm text-muted-foreground block mb-1'>
                      Notes
                    </span>
                    <p className='text-sm whitespace-pre-wrap'>{lead.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='bg-card border border-border rounded-lg p-6'>
              <h2 className='text-xl font-semibold mb-4'>Lead Details</h2>
              <p className='text-sm text-muted-foreground'>
                No lead information captured
              </p>
            </div>
          )}

          {/* Session Metadata */}
          <div className='bg-card border border-border rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>Session Info</h2>
            <div className='space-y-3 text-sm'>
              <div>
                <span className='text-muted-foreground block mb-1'>Status</span>
                <span className='capitalize'>{session.status}</span>
              </div>
              <div>
                <span className='text-muted-foreground block mb-1'>
                  Messages
                </span>
                <span>{session.message_count}</span>
              </div>
              {/* Location Display */}
              {(session.city || session.country) && (
                <div>
                  <span className='text-muted-foreground block mb-1'>
                    Location
                  </span>
                  <span>{formatLocation(session)}</span>
                </div>
              )}
              {session.timezone && (
                <div>
                  <span className='text-muted-foreground block mb-1'>
                    Timezone
                  </span>
                  <span>{session.timezone}</span>
                </div>
              )}
              {session.ip_address ? (
                <div>
                  <span className='text-muted-foreground block mb-1'>
                    IP Address
                  </span>
                  <span className='text-xs'>{session.ip_address}</span>
                </div>
              ) : null}
              {session.session_metadata?.referrer ? (
                <div>
                  <span className='text-muted-foreground block mb-1'>
                    Referrer
                  </span>
                  <span className='text-xs break-all'>
                    {String(session.session_metadata.referrer)}
                  </span>
                </div>
              ) : null}
              {session.session_metadata?.userAgent ? (
                <div>
                  <span className='text-muted-foreground block mb-1'>
                    Device
                  </span>
                  <span className='text-xs break-all'>
                    {String(session.session_metadata.userAgent)}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
