import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { ASSISTANT_VERSION } from '@/lib/assistant-version'
import { getClientIP, getGeolocation } from '@/lib/geolocation'

export async function POST(req: NextRequest) {
  try {
    const { visitor_id, session_metadata } = await req.json()

    // Create new chat session with assistant version tracking
    // Try with geolocation first, fallback to basic session if it fails
    let data, error

    try {
      // Get client IP address
      const clientIP = getClientIP(req.headers)

      // Fetch geolocation data (non-blocking, falls back to null if fails)
      const geoData = clientIP ? await getGeolocation(clientIP) : null

      // Try to create session WITH geolocation fields
      const result = await supabase
        .from('chat_sessions')
        .insert({
          visitor_id,
          session_metadata: {
            ...(session_metadata || {}),
            assistant_version: ASSISTANT_VERSION,
          },
          status: 'active',
          // Geolocation fields (will fail if columns don't exist yet)
          ip_address: geoData?.ip || clientIP || null,
          country: geoData?.country || null,
          country_code: geoData?.country_code || null,
          region: geoData?.region || null,
          city: geoData?.city || null,
          timezone: geoData?.timezone || null,
          latitude: geoData?.latitude || null,
          longitude: geoData?.longitude || null,
        })
        .select()
        .single()

      data = result.data
      error = result.error
    } catch {
      // Fallback: Create session WITHOUT geolocation fields
      const result = await supabase
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

      data = result.data
      error = result.error
    }

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
