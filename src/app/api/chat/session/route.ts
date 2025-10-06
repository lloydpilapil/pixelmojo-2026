import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { visitor_id, session_metadata } = await req.json()

    // Create new chat session
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        visitor_id,
        session_metadata: session_metadata || {},
        status: 'active',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ sessionId: data.id })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
