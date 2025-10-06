import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface ChatSession {
  id: string
  created_at: string
  updated_at: string
  visitor_id: string | null
  email: string | null
  session_metadata: Record<string, unknown>
  status: 'active' | 'completed' | 'abandoned'
}

export interface Message {
  id: string
  session_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at: string
}

export interface Lead {
  id: string
  session_id: string
  email: string
  name: string | null
  company: string | null
  phone: string | null
  project_type: string | null
  industry: string | null
  budget_range: string | null
  timeline: string | null
  notes: string | null
  qualification_score: number
  status: 'new' | 'qualified' | 'contacted' | 'converted' | 'lost'
  created_at: string
  updated_at: string
}
