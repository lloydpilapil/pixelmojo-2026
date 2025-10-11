// Test script for automated follow-up system
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testFollowUpSystem() {
  console.log('🧪 Testing Automated Follow-Up System\n')

  // 1. Check for leads needing follow-ups
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('1️⃣ Checking for leads needing follow-ups...')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .gte('qualification_score', 40)
    .lt('qualification_score', 60)
    .is('follow_up_sent_at', null)
    .not('email', 'is', null)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ Error fetching leads:', error)
    return
  }

  if (!leads || leads.length === 0) {
    console.log('✅ No leads currently need follow-ups\n')
    console.log('To test the system, create a test lead with:')
    console.log('  - qualification_score between 40-59')
    console.log('  - email address provided')
    console.log('  - created_at 2-48 hours ago')
    console.log('  - follow_up_sent_at IS NULL\n')
    return
  }

  console.log(`Found ${leads.length} potential leads:\n`)

  const now = new Date()
  leads.forEach((lead, i) => {
    const createdAt = new Date(lead.created_at)
    const hoursSince = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)

    const eligible =
      hoursSince >= 2 && hoursSince <= 48 && !lead.follow_up_sent_at

    console.log(`[${i + 1}] ${eligible ? '✅' : '⏳'} ${lead.email}`)
    console.log(`    Name: ${lead.name || 'Not provided'}`)
    console.log(`    Score: ${lead.qualification_score}/100`)
    console.log(
      `    Created: ${Math.round(hoursSince)} hours ago (${lead.created_at.substring(0, 19)})`
    )
    console.log(`    Budget: ${lead.budget_range || 'Not mentioned'}`)
    console.log(`    Timeline: ${lead.timeline || 'Not mentioned'}`)
    console.log(`    Project: ${lead.project_type || 'Not mentioned'}`)
    console.log(
      `    Eligible: ${eligible ? 'YES' : hoursSince < 2 ? 'NO (too recent)' : hoursSince > 48 ? 'NO (too old)' : 'NO'}\n`
    )
  })

  // 2. Check API availability
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('2️⃣ Checking API endpoints...')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  console.log('✅ Manual trigger: POST /api/leads/follow-up')
  console.log('   Body: { "leadId": "uuid-here" }\n')

  console.log('✅ List eligible leads: GET /api/leads/follow-up\n')

  console.log('✅ Cron job: GET /api/cron/send-follow-ups')
  console.log('   Header: Authorization: Bearer <CRON_SECRET>\n')

  // 3. Show example curl commands
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('3️⃣ Test Commands')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  if (leads.length > 0) {
    const firstEligible = leads.find(l => {
      const hoursSince =
        (now.getTime() - new Date(l.created_at).getTime()) / (1000 * 60 * 60)
      return hoursSince >= 2 && hoursSince <= 48 && !l.follow_up_sent_at
    })

    if (firstEligible) {
      console.log('📧 Send follow-up to first eligible lead:\n')
      console.log(`curl -X POST http://localhost:3000/api/leads/follow-up \\`)
      console.log(`  -H "Content-Type: application/json" \\`)
      console.log(`  -d '{"leadId": "${firstEligible.id}"}'\n`)
    }
  }

  console.log('📋 List all eligible leads:\n')
  console.log(`curl http://localhost:3000/api/leads/follow-up\n`)

  // 4. Environment check
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('4️⃣ Environment Variables')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const checkEnv = (key: string) => {
    const exists = !!process.env[key]
    console.log(`${exists ? '✅' : '❌'} ${key}: ${exists ? 'Set' : 'MISSING'}`)
  }

  checkEnv('OPENAI_API_KEY')
  checkEnv('RESEND_API_KEY')
  checkEnv('RESEND_FROM_EMAIL')
  checkEnv('SUPABASE_URL')
  checkEnv('SUPABASE_SERVICE_ROLE_KEY')
  checkEnv('CRON_SECRET')

  console.log('\n✅ Test complete!\n')
}

testFollowUpSystem().then(() => process.exit(0))
