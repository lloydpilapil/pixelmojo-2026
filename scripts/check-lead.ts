// Quick script to check lead data for robert-claro@gmail.com
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env variables. Please check .env.local file.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkLead() {
  console.log('Checking for lead: robert-claro@gmail.com')

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .eq('email', 'robert-claro@gmail.com')
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) {
    console.error('Error:', error)
    return
  }

  if (!leads || leads.length === 0) {
    console.log('❌ No lead found with this email')
    return
  }

  const lead = leads[0]
  console.log('\n✅ Lead found:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Email:', lead.email)
  console.log('Name:', lead.name || 'Not provided')
  console.log('Budget Range:', lead.budget_range || 'Not provided')
  console.log('Timeline:', lead.timeline || 'Not provided')
  console.log('Project Type:', lead.project_type || 'Not provided')
  console.log('Industry:', lead.industry || 'Not provided')
  console.log('Qualification Score:', lead.qualification_score)
  console.log('Status:', lead.status)
  console.log('Created:', lead.created_at)
  console.log('Notes:', lead.notes || 'None')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  // Check if email should have been sent
  if (lead.qualification_score >= 60) {
    console.log('\n📧 EMAIL SHOULD HAVE BEEN SENT (score >= 60)')
    console.log('Score:', lead.qualification_score)

    if (lead.qualification_score >= 80) {
      console.log('Type: HIGH-VALUE ALERT (score >= 80)')
    } else {
      console.log('Type: REGULAR NOTIFICATION (score 60-79)')
    }
  } else {
    console.log('\n❌ Email NOT sent (score < 60)')
    console.log('Score:', lead.qualification_score)
  }

  // Get session messages to see full conversation
  console.log('\n📝 Conversation:')
  console.log('Session ID:', lead.session_id)

  const { data: messages } = await supabase
    .from('messages')
    .select('role, content, created_at')
    .eq('session_id', lead.session_id)
    .order('created_at', { ascending: true })

  if (messages && messages.length > 0) {
    messages.forEach((msg, i) => {
      console.log(`\n[${i + 1}] ${msg.role.toUpperCase()}:`)
      console.log(
        msg.content.substring(0, 200) + (msg.content.length > 200 ? '...' : '')
      )
    })
  }
}

checkLead().then(() => process.exit(0))
