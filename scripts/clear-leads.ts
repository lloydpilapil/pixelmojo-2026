// Clear all leads from database (for testing)
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function clearLeads() {
  console.log('🗑️  Clearing all leads from database...\n')

  const { data, error } = await supabase
    .from('leads')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

  if (error) {
    console.error('❌ Error:', error)
    return
  }

  console.log('✅ All leads cleared successfully!')
}

clearLeads().then(() => process.exit(0))
