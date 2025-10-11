import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import {
  generateFollowUpEmail,
  shouldSendFollowUp,
} from '@/lib/follow-up-generator'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * POST /api/leads/follow-up
 * Generate and send a follow-up email to a specific lead
 */
export async function POST(req: NextRequest) {
  try {
    const { leadId } = await req.json()

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      )
    }

    // Fetch lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single()

    if (leadError || !lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Check if follow-up should be sent
    if (!shouldSendFollowUp(lead)) {
      return NextResponse.json(
        {
          error: 'Follow-up criteria not met',
          reason: getFollowUpSkipReason(lead),
        },
        { status: 400 }
      )
    }

    // Generate personalized follow-up email
    console.log('[FollowUp API] Generating follow-up for lead:', leadId)
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
      return NextResponse.json(
        { error: 'Failed to generate follow-up email' },
        { status: 500 }
      )
    }

    console.log('[FollowUp API] Generated email:', {
      subject: followUp.subject,
      reasoning: followUp.reasoning,
    })

    // Send email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        'Lloyd from Pixelmojo <lloyd@mg.pixelmojo.com>',
      to: [lead.email],
      subject: followUp.subject,
      html: followUp.htmlBody,
      text: followUp.textBody,
      replyTo: 'lloyd@pixelmojo.io',
    })

    if (emailError) {
      console.error('[FollowUp API] Failed to send email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send follow-up email', details: emailError },
        { status: 500 }
      )
    }

    console.log('[FollowUp API] Email sent successfully:', emailData?.id)

    // Update lead with follow-up timestamp
    await supabase
      .from('leads')
      .update({
        follow_up_sent_at: new Date().toISOString(),
        follow_up_subject: followUp.subject,
      })
      .eq('id', leadId)

    return NextResponse.json({
      success: true,
      emailId: emailData?.id,
      subject: followUp.subject,
      reasoning: followUp.reasoning,
    })
  } catch (error) {
    console.error('[FollowUp API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/leads/follow-up
 * Get all leads that need follow-up emails
 */
export async function GET() {
  try {
    // Fetch leads that might need follow-ups
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .gte('qualification_score', 40)
      .lt('qualification_score', 60)
      .is('follow_up_sent_at', null)
      .not('email', 'is', null)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Filter leads that meet time-based criteria
    const now = new Date()
    const leadsNeedingFollowUp = (leads || []).filter(lead => {
      const createdAt = new Date(lead.created_at)
      const hoursSinceCreation =
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)
      return hoursSinceCreation >= 2 && hoursSinceCreation <= 48
    })

    return NextResponse.json({
      total: leadsNeedingFollowUp.length,
      leads: leadsNeedingFollowUp.map(lead => ({
        id: lead.id,
        email: lead.email,
        name: lead.name,
        score: lead.qualification_score,
        createdAt: lead.created_at,
        hoursSinceCreation: Math.round(
          (now.getTime() - new Date(lead.created_at).getTime()) /
            (1000 * 60 * 60)
        ),
      })),
    })
  } catch (error) {
    console.error('[FollowUp API] Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Helper function to explain why follow-up was skipped
 */
function getFollowUpSkipReason(lead: {
  email: string | null
  qualification_score: number
  follow_up_sent_at: string | null
  created_at: string
}): string {
  if (!lead.email) return 'No email address'
  if (lead.qualification_score < 40) return 'Score too low (< 40)'
  if (lead.qualification_score >= 60) return 'Already qualified (>= 60)'
  if (lead.follow_up_sent_at) return 'Follow-up already sent'

  const hoursSinceCreation =
    (Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60)
  if (hoursSinceCreation < 2) return 'Too recent (< 2 hours)'
  if (hoursSinceCreation > 48) return 'Too old (> 48 hours)'

  return 'Unknown reason'
}
