import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import {
  generateFollowUpEmail,
  shouldSendFollowUp,
} from '@/lib/follow-up-generator'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * GET /api/cron/send-follow-ups
 * Automated cron job to send follow-up emails to warm leads
 *
 * Vercel Cron Configuration (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/send-follow-ups",
 *     "schedule": "0 * * * *"  // Run every hour
 *   }]
 * }
 *
 * Security: Uses CRON_SECRET to prevent unauthorized access
 */
export async function GET(req: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      console.error('[Cron] Unauthorized access attempt')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('[Cron] Starting follow-up email job...')

    // Fetch leads that might need follow-ups
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .gte('qualification_score', 40)
      .lt('qualification_score', 60)
      .is('follow_up_sent_at', null)
      .not('email', 'is', null)
      .order('created_at', { ascending: true }) // Oldest first
      .limit(10) // Process max 10 per run to avoid timeouts

    if (error) {
      console.error('[Cron] Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!leads || leads.length === 0) {
      console.log('[Cron] No leads need follow-ups')
      return NextResponse.json({
        success: true,
        processed: 0,
        message: 'No leads need follow-ups',
      })
    }

    console.log(`[Cron] Found ${leads.length} potential leads`)

    // Filter leads that meet time-based criteria
    const eligibleLeads = leads.filter(lead => shouldSendFollowUp(lead))

    console.log(`[Cron] ${eligibleLeads.length} leads eligible for follow-up`)

    const results = {
      total: eligibleLeads.length,
      sent: 0,
      failed: 0,
      skipped: 0,
      errors: [] as string[],
    }

    // Process each eligible lead
    for (const lead of eligibleLeads) {
      try {
        console.log(`[Cron] Processing lead: ${lead.email} (${lead.id})`)

        // Generate personalized follow-up
        const followUp = await generateFollowUpEmail({
          leadId: lead.id,
          sessionId: lead.session_id,
          email: lead.email,
          name: lead.name,
          budgetRange: lead.budget_range,
          timeline: lead.timeline,
          projectType: lead.project_type,
          industry: lead.industry,
          notes: lead.notes,
          qualificationScore: lead.qualification_score,
        })

        if (!followUp) {
          console.error(`[Cron] Failed to generate email for ${lead.email}`)
          results.failed++
          results.errors.push(`${lead.email}: Generation failed`)
          continue
        }

        // Send email via Resend
        const { data: emailData, error: emailError } = await resend.emails.send(
          {
            from:
              process.env.RESEND_FROM_EMAIL ||
              'Lloyd from Pixelmojo <lloyd@mg.pixelmojo.com>',
            to: [lead.email],
            subject: followUp.subject,
            html: followUp.htmlBody,
            text: followUp.textBody,
            replyTo: 'lloyd@pixelmojo.io',
          }
        )

        if (emailError) {
          console.error(
            `[Cron] Email send failed for ${lead.email}:`,
            emailError
          )
          results.failed++
          results.errors.push(`${lead.email}: ${emailError.message}`)
          continue
        }

        console.log(`[Cron] Email sent to ${lead.email}:`, emailData?.id)

        // Update lead with follow-up timestamp
        await supabase
          .from('leads')
          .update({
            follow_up_sent_at: new Date().toISOString(),
            follow_up_subject: followUp.subject,
          })
          .eq('id', lead.id)

        results.sent++
      } catch (leadError) {
        console.error(`[Cron] Error processing lead ${lead.email}:`, leadError)
        results.failed++
        results.errors.push(
          `${lead.email}: ${leadError instanceof Error ? leadError.message : 'Unknown error'}`
        )
      }
    }

    console.log('[Cron] Follow-up job completed:', results)

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error('[Cron] Fatal error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/cron/send-follow-ups
 * Manual trigger for testing (same as GET)
 */
export async function POST(req: NextRequest) {
  return GET(req)
}
