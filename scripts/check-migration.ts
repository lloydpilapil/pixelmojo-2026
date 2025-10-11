// Check if follow-up migration is needed
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkMigration() {
  console.log('🔍 Checking if follow-up migration is needed...\n')

  // Try to query a lead with follow_up fields
  const { data, error } = await supabase
    .from('leads')
    .select('follow_up_sent_at, follow_up_subject')
    .limit(1)

  if (error) {
    if (
      error.message.includes('column') &&
      error.message.includes('does not exist')
    ) {
      console.log('❌ Migration NOT applied yet\n')
      console.log('The follow-up columns do NOT exist in the database.')
      console.log('\n📋 You need to run the migration:\n')
      console.log('1. Go to Supabase SQL Editor')
      console.log('2. Run: supabase/migrations/011_add_follow_up_fields.sql\n')
      return false
    }
    console.error('Unexpected error:', error)
    return false
  }

  console.log('✅ Migration already applied!\n')
  console.log('The follow-up columns exist in the database.')
  console.log('You can start using the follow-up system.\n')
  return true
}

checkMigration().then(() => process.exit(0))
