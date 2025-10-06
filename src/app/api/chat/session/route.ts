import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { ASSISTANT_VERSION } from '@/lib/assistant-version'

export async function POST(req: NextRequest) {
  try {
    const { visitor_id, session_metadata } = await req.json()

    // Create new chat session with assistant version tracking
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        visitor_id,
        session_metadata: {
          ...(session_metadata || {}),
          assistant_version: ASSISTANT_VERSION,
        },
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
