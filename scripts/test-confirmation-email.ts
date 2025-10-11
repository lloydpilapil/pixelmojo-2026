// Test confirmation email sending
import { config } from 'dotenv'
import { sendLeadConfirmationEmail } from '../src/lib/lead-confirmation-emails'

config({ path: '.env.local' })

async function testEmail() {
  console.log('🧪 Testing confirmation email...\n')

  const result = await sendLeadConfirmationEmail({
    name: 'Lloyd',
    email: 'lloydpilapil@gmail.com',
    projectType: 'branding',
    budgetRange: '$15k-$50k',
    timeline: 'ASAP',
    industry: undefined,
    qualificationScore: 55,
    sessionId: 'test-session-123',
  })

  console.log('Result:', result)
}

testEmail().then(() => process.exit(0))
