// Check all leads in the system
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAllLeads() {
  console.log('🔍 Checking ALL leads in system...\n')

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('❌ Error:', error)
    return
  }

  if (!leads || leads.length === 0) {
    console.log('No leads found')
    return
  }

  console.log(`Found ${leads.length} leads:\n`)

  leads.forEach((lead, i) => {
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(`[${i + 1}] ${lead.email}`)
    console.log(`Name: ${lead.name || 'Not provided'}`)
    console.log(`Score: ${lead.qualification_score}/100`)
    console.log(`Status: ${lead.status}`)
    console.log(`Created: ${lead.created_at}`)
    console.log(`Budget: ${lead.budget_range || 'Not provided'}`)
    console.log(`Timeline: ${lead.timeline || 'Not provided'}`)
    console.log(`Project: ${lead.project_type || 'Not provided'}`)
    console.log(`Notes: ${lead.notes || 'None'}`)

    // Check if email should have been sent
    const shouldSendEmail = lead.qualification_score >= 60
    const emailSentStatus = shouldSendEmail
      ? lead.qualification_score >= 80
        ? '🔥 HIGH-VALUE (≥80)'
        : '✅ QUALIFIED (60-79)'
      : '❌ BELOW THRESHOLD (<60)'

    console.log(`Email Status: ${emailSentStatus}`)
    console.log()
  })
}

checkAllLeads().then(() => process.exit(0))
