import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Fetch all sessions with their associated leads
    const { data: sessions, error: sessionsError } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('created_at', { ascending: false })

    if (sessionsError) {
      console.error('Error fetching sessions:', sessionsError)
      return NextResponse.json(
        { error: 'Failed to fetch sessions' },
        { status: 500 }
      )
    }

    // Fetch leads for all sessions
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')

    if (leadsError) {
      console.error('Error fetching leads:', leadsError)
    }

    // Combine sessions with their leads
    const sessionsWithLeads = sessions.map(session => {
      const lead = leads?.find(l => l.session_id === session.id)
      return {
        ...session,
        lead: lead || null,
      }
    })

    return NextResponse.json({ sessions: sessionsWithLeads })
  } catch (error) {
    console.error('Admin sessions API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}
