import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('sessionId')

    console.log(
      '[API /chat/messages] Fetching messages for session:',
      sessionId
    )

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    // Fetch messages for this session
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[API /chat/messages] Database error:', error)
      throw error
    }

    console.log(
      '[API /chat/messages] Found',
      data?.length || 0,
      'messages for session',
      sessionId
    )

    return NextResponse.json({ messages: data || [] })
  } catch (error) {
    console.error('Messages fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}
