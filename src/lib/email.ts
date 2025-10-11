import { Resend } from 'resend'

/**
 * Lazy-load Resend client to avoid build-time initialization
 * This ensures the API key is only accessed at runtime
 */
let resendClient: Resend | null = null

function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

export interface LeadNotificationData {
  name: string
  email: string
  company?: string
  phone?: string
  projectType?: string
  industry?: string
  budgetRange?: string
  timeline?: string
  qualificationScore: number
  sessionId: string
  chatSummary?: string
}

/**
 * Send email notification when a qualified lead is captured
 */
export async function sendLeadNotification(lead: LeadNotificationData) {
  try {
    const resend = getResendClient()
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || 'Pixelmojo <hello@mg.pixelmojo.com>',
      to: [process.env.RESEND_TO_EMAIL || 'founders@pixelmojo.com'],
      subject: `🔥 New Qualified Lead: ${lead.name} (Score: ${lead.qualificationScore}/100)`,
      html: getLeadEmailHTML(lead),
    })

    if (error) {
      console.error('[Email] Failed to send lead notification:', error)
      return { success: false, error }
    }

    console.log('[Email] Lead notification sent successfully:', data?.id)
    return { success: true, data }
  } catch (error) {
    console.error('[Email] Error sending lead notification:', error)
    return { success: false, error }
  }
}

/**
 * Send immediate alert for high-value leads (score >= 80)
 */
export async function sendHighValueLeadAlert(lead: LeadNotificationData) {
  try {
    const resend = getResendClient()
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || 'Pixelmojo <hello@mg.pixelmojo.com>',
      to: [process.env.RESEND_TO_EMAIL || 'founders@pixelmojo.com'],
      subject: `🚨 HIGH-VALUE LEAD ALERT: ${lead.name} - ${lead.budgetRange || 'Budget TBD'}`,
      html: getHighValueLeadHTML(lead),
    })

    if (error) {
      console.error('[Email] Failed to send high-value alert:', error)
      return { success: false, error }
    }

    console.log('[Email] High-value alert sent successfully:', data?.id)
    return { success: true, data }
  } catch (error) {
    console.error('[Email] Error sending high-value alert:', error)
    return { success: false, error }
  }
}

/**
 * Email template for regular lead notifications
 */
function getLeadEmailHTML(lead: LeadNotificationData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #005493 0%, #3CC29E 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .score { display: inline-block; background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; }
          .score.high { background: #ef4444; }
          .score.medium { background: #f59e0b; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
          .info-item { background: white; padding: 15px; border-left: 3px solid #005493; }
          .info-label { font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600; }
          .info-value { font-size: 16px; color: #111827; margin-top: 5px; font-weight: 500; }
          .cta-button { display: inline-block; background: #005493; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
          .chat-summary { background: white; padding: 20px; border-left: 3px solid #3CC29E; margin: 20px 0; font-style: italic; color: #4b5563; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🎯 New Lead Captured</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">From AI Chat Widget</p>
          </div>
          <div class="content">
            <div style="text-align: center; margin-bottom: 25px;">
              <span class="${getScoreClass(lead.qualificationScore)}">${getScoreBadge(lead.qualificationScore)}</span>
            </div>

            <h2 style="margin-top: 0; color: #111827;">${lead.name}</h2>

            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value"><a href="mailto:${lead.email}" style="color: #005493;">${lead.email}</a></div>
              </div>
              ${
                lead.company
                  ? `
              <div class="info-item">
                <div class="info-label">Company</div>
                <div class="info-value">${lead.company}</div>
              </div>
              `
                  : ''
              }
              ${
                lead.phone
                  ? `
              <div class="info-item">
                <div class="info-label">Phone</div>
                <div class="info-value"><a href="tel:${lead.phone}" style="color: #005493;">${lead.phone}</a></div>
              </div>
              `
                  : ''
              }
              ${
                lead.projectType
                  ? `
              <div class="info-item">
                <div class="info-label">Project Type</div>
                <div class="info-value">${lead.projectType}</div>
              </div>
              `
                  : ''
              }
              ${
                lead.industry
                  ? `
              <div class="info-item">
                <div class="info-label">Industry</div>
                <div class="info-value">${lead.industry}</div>
              </div>
              `
                  : ''
              }
              ${
                lead.budgetRange
                  ? `
              <div class="info-item">
                <div class="info-label">Budget Range</div>
                <div class="info-value">${lead.budgetRange}</div>
              </div>
              `
                  : ''
              }
              ${
                lead.timeline
                  ? `
              <div class="info-item">
                <div class="info-label">Timeline</div>
                <div class="info-value">${lead.timeline}</div>
              </div>
              `
                  : ''
              }
            </div>

            ${
              lead.chatSummary
                ? `
            <div class="chat-summary">
              <strong>Chat Summary:</strong><br/>
              ${lead.chatSummary}
            </div>
            `
                : ''
            }

            <div style="text-align: center; margin-top: 30px;">
              <a href="https://pixelmojo-2026.vercel.app/admin/chats/${lead.sessionId}" class="cta-button">
                View Full Conversation →
              </a>
            </div>

            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; text-align: center;">
              <strong>Next Steps:</strong> Reply within 24 hours for best conversion rates
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

/**
 * Email template for high-value leads (immediate attention needed)
 */
function getHighValueLeadHTML(lead: LeadNotificationData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
          .alert-badge { background: #fef2f2; color: #dc2626; padding: 10px 20px; border-radius: 20px; font-weight: bold; display: inline-block; margin-bottom: 15px; }
          .content { background: #fef2f2; padding: 30px; border-radius: 0 0 8px 8px; border: 3px solid #dc2626; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
          .info-item { background: white; padding: 15px; border-left: 3px solid #dc2626; }
          .info-label { font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600; }
          .info-value { font-size: 16px; color: #111827; margin-top: 5px; font-weight: 500; }
          .cta-button { display: inline-block; background: #dc2626; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 16px; margin-top: 20px; }
          .urgency { background: #fee2e2; border: 2px solid #dc2626; padding: 20px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="alert-badge">🚨 HIGH-VALUE LEAD 🚨</div>
            <h1 style="margin: 0; font-size: 28px;">IMMEDIATE ACTION REQUIRED</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.95;">Qualification Score: ${lead.qualificationScore}/100</p>
          </div>
          <div class="content">
            <div class="urgency">
              <strong style="color: #dc2626; font-size: 18px;">⏰ Respond within 1 hour for maximum conversion!</strong>
              <p style="margin: 10px 0 0 0; color: #7f1d1d;">High-quality leads expect fast responses. Strike while the iron is hot!</p>
            </div>

            <h2 style="margin-top: 0; color: #111827; font-size: 24px;">${lead.name}</h2>

            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value"><a href="mailto:${lead.email}" style="color: #dc2626; font-weight: bold;">${lead.email}</a></div>
              </div>
              ${
                lead.phone
                  ? `
              <div class="info-item">
                <div class="info-label">Phone (Call Now!)</div>
                <div class="info-value"><a href="tel:${lead.phone}" style="color: #dc2626; font-weight: bold;">${lead.phone}</a></div>
              </div>
              `
                  : ''
              }
              ${
                lead.company
                  ? `
              <div class="info-item">
                <div class="info-label">Company</div>
                <div class="info-value">${lead.company}</div>
              </div>
              `
                  : ''
              }
              ${
                lead.budgetRange
                  ? `
              <div class="info-item" style="border-left-color: #10b981;">
                <div class="info-label">Budget Range</div>
                <div class="info-value" style="color: #10b981; font-weight: bold;">${lead.budgetRange}</div>
              </div>
              `
                  : ''
              }
              ${
                lead.projectType
                  ? `
              <div class="info-item">
                <div class="info-label">Project Type</div>
                <div class="info-value">${lead.projectType}</div>
              </div>
              `
                  : ''
              }
              ${
                lead.timeline
                  ? `
              <div class="info-item">
                <div class="info-label">Timeline</div>
                <div class="info-value">${lead.timeline}</div>
              </div>
              `
                  : ''
              }
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="https://pixelmojo-2026.vercel.app/admin/chats/${lead.sessionId}" class="cta-button">
                📞 View Chat & Respond Now →
              </a>
            </div>

            <div style="background: white; padding: 20px; margin-top: 25px; border-radius: 6px;">
              <h3 style="margin-top: 0; color: #dc2626;">Recommended Next Steps:</h3>
              <ol style="color: #374151; margin: 0; padding-left: 20px;">
                <li><strong>Within 1 hour:</strong> Send personalized email referencing chat</li>
                ${lead.phone ? '<li><strong>Within 2 hours:</strong> Follow up with phone call</li>' : ''}
                <li><strong>Within 24 hours:</strong> Send calendar link for discovery call</li>
                <li><strong>Within 48 hours:</strong> Prepare initial proposal</li>
              </ol>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

/**
 * Helper functions for email styling
 */
function getScoreClass(score: number): string {
  if (score >= 80) return 'score high'
  if (score >= 60) return 'score medium'
  return 'score'
}

function getScoreBadge(score: number): string {
  if (score >= 80) return `🔥 HOT LEAD - Score: ${score}/100`
  if (score >= 60) return `⭐ QUALIFIED - Score: ${score}/100`
  return `📊 Lead Score: ${score}/100`
}

/**
 * Send follow-up email to a lead
 */
export async function sendFollowUpEmail(data: {
  to: string
  subject: string
  htmlBody: string
  textBody: string
}) {
  try {
    const resend = getResendClient()
    const { data: emailData, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        'Lloyd from Pixelmojo <lloyd@mg.pixelmojo.com>',
      to: [data.to],
      subject: data.subject,
      html: data.htmlBody,
      text: data.textBody,
      replyTo: 'lloyd@pixelmojo.io',
    })

    if (error) {
      console.error('[Email] Failed to send follow-up:', error)
      return { success: false, error }
    }

    console.log('[Email] Follow-up sent successfully:', emailData?.id)
    return { success: true, data: emailData }
  } catch (error) {
    console.error('[Email] Error sending follow-up:', error)
    return { success: false, error }
  }
}

/**
 * Send weekly summary of all leads
 */
export async function sendWeeklySummary(_leads: LeadNotificationData[]) {
  // TODO: Implement weekly digest email
  // Group leads by status, show metrics, trends
  return { success: false, message: 'Not yet implemented' }
}
