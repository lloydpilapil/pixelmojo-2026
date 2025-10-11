// Check if emails were actually sent by looking at chat API logs
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkEmailStatus() {
  console.log('📧 Checking email notification status for high-value leads...\n')

  // Get high-value leads (score >= 60)
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .gte('qualification_score', 60)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error:', error)
    return
  }

  if (!leads || leads.length === 0) {
    console.log('No qualified leads found (score >= 60)')
    return
  }

  console.log(`Found ${leads.length} qualified lead(s):\n`)

  for (const lead of leads) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`Email: ${lead.email}`)
    console.log(`Score: ${lead.qualification_score}/100`)
    console.log(`Created: ${lead.created_at}`)
    console.log(`Status: ${lead.status}`)

    // Check expected email type
    if (lead.qualification_score >= 80) {
      console.log('📧 Expected: HIGH-VALUE ALERT EMAIL')
      console.log('   To: founders@pixelmojo.com (or RESEND_TO_EMAIL)')
      console.log('   Subject: 🚨 HIGH-VALUE LEAD ALERT')
    } else {
      console.log('📧 Expected: REGULAR NOTIFICATION EMAIL')
      console.log('   To: founders@pixelmojo.com (or RESEND_TO_EMAIL)')
      console.log('   Subject: 🔥 New Qualified Lead')
    }

    console.log('\n💡 Check your Resend dashboard for this email:')
    console.log(`   Search for: "${lead.email}"`)
    console.log(`   Time: ${new Date(lead.created_at).toLocaleString()}`)
    console.log()
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  console.log('🔍 To debug further:')
  console.log('1. Check Resend dashboard: https://resend.com/emails')
  console.log('2. Look for emails sent around the times above')
  console.log(
    '3. Check your email inbox (including spam) for notifications from Pixelmojo'
  )
  console.log('4. Verify RESEND_TO_EMAIL in .env.local (should be your email)')
  console.log(
    `   Current: ${process.env.RESEND_TO_EMAIL || 'founders@pixelmojo.com (default)'}`
  )
}

checkEmailStatus().then(() => process.exit(0))
