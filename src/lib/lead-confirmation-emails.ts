import { Resend } from 'resend'

/**
 * Lazy-load Resend client
 */
let resendClient: Resend | null = null

function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

export interface LeadConfirmationData {
  name: string
  email: string
  projectType?: string
  budgetRange?: string
  timeline?: string
  industry?: string
  qualificationScore: number
  sessionId: string
}

/**
 * Send immediate confirmation email to lead after they provide email
 */
export async function sendLeadConfirmationEmail(lead: LeadConfirmationData) {
  try {
    const resend = getResendClient()

    // Choose template based on qualification score
    let template
    if (lead.qualificationScore >= 80) {
      template = getHighValueConfirmationEmail(lead)
    } else if (lead.qualificationScore >= 60) {
      template = getQualifiedConfirmationEmail(lead)
    } else {
      template = getStandardConfirmationEmail(lead)
    }

    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        'Lloyd from Pixelmojo <lloyd@mg.pixelmojo.com>',
      to: [lead.email],
      subject: template.subject,
      html: template.html,
      replyTo: 'lloyd@pixelmojo.io',
    })

    if (error) {
      console.error('[LeadConfirmation] Failed to send email:', error)
      return { success: false, error }
    }

    console.log('[LeadConfirmation] Email sent successfully:', data?.id)
    return { success: true, data }
  } catch (error) {
    console.error('[LeadConfirmation] Error sending email:', error)
    return { success: false, error }
  }
}

/**
 * High-value lead confirmation (score >= 80)
 * Immediate response with direct booking link
 */
function getHighValueConfirmationEmail(lead: LeadConfirmationData) {
  const firstName = lead.name?.split(' ')[0] || 'there'

  return {
    subject: `${firstName}, let's talk about your ${lead.projectType || 'project'} 🚀`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #005493 0%, #3CC29E 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 12px; margin-bottom: 30px; }
            .content { background: #ffffff; padding: 30px; border-radius: 8px; }
            .cta-button { display: inline-block; background: #005493; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .cta-button:hover { background: #003d6b; }
            .highlight { background: #fef3c7; padding: 20px; border-left: 4px solid #f59e0b; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
            .project-details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-item { margin: 10px 0; }
            .detail-label { font-weight: 600; color: #374151; }
            .detail-value { color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Hi ${firstName}! 👋</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.95;">Thanks for reaching out about your ${lead.projectType || 'project'}</p>
          </div>

          <div class="content">
            <div class="highlight">
              <strong>🎯 Priority Response</strong>
              <p style="margin: 10px 0 0 0;">Based on your project scope and timeline, I'm prioritizing your inquiry. Let's jump on a quick call this week to discuss the details.</p>
            </div>

            <h2 style="color: #111827; margin-top: 30px;">Here's What I've Captured:</h2>

            <div class="project-details">
              ${lead.projectType ? `<div class="detail-item"><span class="detail-label">Project Type:</span> <span class="detail-value">${lead.projectType}</span></div>` : ''}
              ${lead.budgetRange ? `<div class="detail-item"><span class="detail-label">Budget Range:</span> <span class="detail-value">${lead.budgetRange}</span></div>` : ''}
              ${lead.timeline ? `<div class="detail-item"><span class="detail-label">Timeline:</span> <span class="detail-value">${lead.timeline}</span></div>` : ''}
              ${lead.industry ? `<div class="detail-item"><span class="detail-label">Industry:</span> <span class="detail-value">${lead.industry}</span></div>` : ''}
            </div>

            <h2 style="color: #111827;">What Happens Next?</h2>

            <p><strong>Option 1 (Fastest):</strong> Book a 30-minute discovery call directly on my calendar. We can discuss your project in detail and I'll share relevant case studies.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://calendly.com/lloyd-pixelmojo/30min" class="cta-button">
                📅 Book Your Free Discovery Call
              </a>
            </div>

            <p><strong>Option 2:</strong> Reply to this email with any additional details or questions. I'll respond within 2 hours with a custom proposal.</p>

            <h2 style="color: #111827; margin-top: 40px;">Why Clients Choose Pixelmojo:</h2>

            <ul style="line-height: 2;">
              <li><strong>3-5x Faster Delivery:</strong> AI-native workflows deliver in weeks, not months</li>
              <li><strong>60% Lower Cost:</strong> Efficient processes = better pricing without compromising quality</li>
              <li><strong>Proven Track Record:</strong> 600K+ enterprise logistics platform, SaaS products, AI tools</li>
              <li><strong>Philippine Expertise:</strong> Local market knowledge + global standards</li>
            </ul>

            ${
              lead.budgetRange?.includes('$15k') ||
              lead.budgetRange?.includes('$50k')
                ? `
              <div class="highlight">
                <strong>💰 Philippine Startup Discount Available</strong>
                <p style="margin: 10px 0 0 0;">As a registered Philippine startup or business, you may qualify for 15-20% off our standard rates. I'll include this in your custom proposal.</p>
              </div>
            `
                : ''
            }

            <p style="margin-top: 30px;">Looking forward to working together on your ${lead.projectType || 'project'}!</p>

            <p style="margin-top: 30px;"><strong>Best regards,</strong><br>
            Lloyd Pilapil<br>
            Founder, Pixelmojo<br>
            <a href="mailto:lloyd@pixelmojo.io" style="color: #005493;">lloyd@pixelmojo.io</a></p>

            <p style="font-size: 14px; color: #6b7280; margin-top: 20px;"><em>P.S. - I typically respond to high-priority inquiries within 2 hours. If you don't see my email, check your spam folder or reach out via WhatsApp at the number on our website.</em></p>
          </div>

          <div class="footer">
            <p><strong>Pixelmojo</strong> | AI-Native Design & Development Agency</p>
            <p><a href="https://pixelmojo.io" style="color: #005493; text-decoration: none;">pixelmojo.io</a> | <a href="https://pixelmojo.io/projects" style="color: #005493; text-decoration: none;">View Portfolio</a></p>
            <p style="margin-top: 15px; font-size: 12px;">By providing your email, you agreed to our <a href="https://pixelmojo.io/privacy-policy" style="color: #005493; text-decoration: none;">Privacy Policy</a></p>
          </div>
        </body>
      </html>
    `,
  }
}

/**
 * Qualified lead confirmation (score 60-79)
 * Standard response with portfolio and pricing
 */
function getQualifiedConfirmationEmail(lead: LeadConfirmationData) {
  const firstName = lead.name?.split(' ')[0] || 'there'

  return {
    subject: `Thanks for your interest, ${firstName} - Portfolio & Pricing Inside 📊`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #005493 0%, #3CC29E 100%); color: white; padding: 35px 30px; text-align: center; border-radius: 12px; margin-bottom: 30px; }
            .content { background: #ffffff; padding: 30px; border-radius: 8px; }
            .cta-button { display: inline-block; background: #005493; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 15px 10px; }
            .service-card { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #005493; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 26px;">Thanks for reaching out, ${firstName}! 🎉</h1>
            <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.95;">Here's everything you need to know about working with Pixelmojo</p>
          </div>

          <div class="content">
            <p>Hi ${firstName},</p>

            <p>Thanks for your interest in Pixelmojo! I'm excited to learn more about your ${lead.projectType || 'project'}.</p>

            <h2 style="color: #111827;">What We Do Best:</h2>

            <div class="service-card">
              <h3 style="margin: 0 0 10px 0; color: #005493;">🚀 AI Product Development</h3>
              <p style="margin: 0; color: #6b7280;">Ship production-ready MVPs in 90 days. Full-stack development with AI-native workflows.</p>
              <p style="margin: 10px 0 0 0; font-weight: 600;">Pricing: $15K-$50K | Timeline: 8-12 weeks</p>
            </div>

            <div class="service-card">
              <h3 style="margin: 0 0 10px 0; color: #005493;">💰 60-Day Conversion Sprint</h3>
              <p style="margin: 0; color: #6b7280;">Prove ROI fast. Analytics audit + AI-optimized landing pages + A/B testing.</p>
              <p style="margin: 10px 0 0 0; font-weight: 600;">Pricing: ₱180K (~$3,200 USD) | Timeline: 60 days</p>
            </div>

            <div class="service-card">
              <h3 style="margin: 0 0 10px 0; color: #005493;">🎨 Revenue-First Design</h3>
              <p style="margin: 0; color: #6b7280;">Brand systems and visual identity that drive conversions, not just look good.</p>
              <p style="margin: 10px 0 0 0; font-weight: 600;">Pricing: $8K-$25K | Timeline: 4-8 weeks</p>
            </div>

            <h2 style="color: #111827; margin-top: 30px;">Recent Work:</h2>
            <ul style="line-height: 2;">
              <li><strong>Enterprise Logistics Platform:</strong> Track & trace system for ₱600K (under NDA)</li>
              <li><strong>Real Estate Earnings Tracker:</strong> Mobile-first dashboard for agents</li>
              <li><strong>Mojo AI:</strong> Figma plugin for automated design workflows</li>
              <li><strong>SaaS Products:</strong> B2B platforms with conversion optimization</li>
            </ul>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://pixelmojo.io/projects" class="cta-button">View Full Portfolio</a>
              <a href="https://calendly.com/lloyd-pixelmojo/30min" class="cta-button">Book Discovery Call</a>
            </div>

            ${
              lead.budgetRange
                ? `
              <h2 style="color: #111827;">Based on Your Budget (${lead.budgetRange}):</h2>
              <p>I'd recommend ${getRecommendedService(lead.budgetRange)}. I'll send you a detailed proposal within 24 hours.</p>
            `
                : ''
            }

            <h2 style="color: #111827; margin-top: 30px;">Next Steps:</h2>
            <ol style="line-height: 2;">
              <li><strong>Reply to this email</strong> with any questions or additional details</li>
              <li><strong>Book a call</strong> to discuss your project in depth (link above)</li>
              <li><strong>I'll send you a custom proposal</strong> within 24-48 hours</li>
            </ol>

            <p style="margin-top: 30px;">Looking forward to potentially working together!</p>

            <p style="margin-top: 30px;"><strong>Best regards,</strong><br>
            Lloyd Pilapil<br>
            Founder, Pixelmojo<br>
            <a href="mailto:lloyd@pixelmojo.io" style="color: #005493;">lloyd@pixelmojo.io</a></p>
          </div>

          <div class="footer">
            <p><strong>Pixelmojo</strong> | AI-Native Design & Development Agency</p>
            <p><a href="https://pixelmojo.io" style="color: #005493; text-decoration: none;">pixelmojo.io</a> | <a href="https://pixelmojo.io/pricing" style="color: #005493; text-decoration: none;">View Pricing</a></p>
            <p style="margin-top: 15px; font-size: 12px;">By providing your email, you agreed to our <a href="https://pixelmojo.io/privacy-policy" style="color: #005493; text-decoration: none;">Privacy Policy</a></p>
          </div>
        </body>
      </html>
    `,
  }
}

/**
 * Standard confirmation (score < 60)
 * Informational response to nurture lead
 */
function getStandardConfirmationEmail(lead: LeadConfirmationData) {
  const firstName = lead.name?.split(' ')[0] || 'there'

  return {
    subject: `Thanks for your interest - Let's explore if Pixelmojo is right for you`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #005493 0%, #3CC29E 100%); color: white; padding: 30px; text-align: center; border-radius: 12px; margin-bottom: 30px; }
            .content { background: #ffffff; padding: 30px; border-radius: 8px; }
            .cta-button { display: inline-block; background: #005493; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 15px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">Thanks for reaching out, ${firstName}! 👋</h1>
          </div>

          <div class="content">
            <p>Hi ${firstName},</p>

            <p>Thanks for your interest in Pixelmojo! I wanted to reach out personally to share more about what we do and see if we're a good fit for your needs.</p>

            <h2 style="color: #111827;">About Pixelmojo:</h2>
            <p>We're an AI-native design and development agency that helps startups and businesses build revenue-generating products. Our focus is on:</p>
            <ul style="line-height: 2;">
              <li>AI-powered product development (MVPs in 90 days)</li>
              <li>Conversion-focused design systems</li>
              <li>Growth marketing automation</li>
              <li>Full-stack AI implementation</li>
            </ul>

            <h2 style="color: #111827;">Typical Investment:</h2>
            <p>Most of our projects range from <strong>$3K-$50K</strong> depending on scope. We offer flexible payment terms and special pricing for Philippine startups.</p>

            <h2 style="color: #111827;">Want to Learn More?</h2>
            <p>I'd love to understand more about your project to see if we're a good fit. Feel free to:</p>
            <ul style="line-height: 2;">
              <li><strong>Reply to this email</strong> with more details about your project</li>
              <li><strong>Browse our portfolio:</strong> <a href="https://pixelmojo.io/projects" style="color: #005493;">pixelmojo.io/projects</a></li>
              <li><strong>Check our pricing:</strong> <a href="https://pixelmojo.io/pricing" style="color: #005493;">pixelmojo.io/pricing</a></li>
            </ul>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://calendly.com/lloyd-pixelmojo/30min" class="cta-button">Book a Free Discovery Call</a>
            </div>

            <p style="margin-top: 30px;">No pressure - just happy to chat and see how we can help!</p>

            <p style="margin-top: 30px;"><strong>Best regards,</strong><br>
            Lloyd Pilapil<br>
            Founder, Pixelmojo<br>
            <a href="mailto:lloyd@pixelmojo.io" style="color: #005493;">lloyd@pixelmojo.io</a></p>
          </div>

          <div class="footer">
            <p><strong>Pixelmojo</strong> | AI-Native Design & Development Agency</p>
            <p><a href="https://pixelmojo.io" style="color: #005493; text-decoration: none;">pixelmojo.io</a></p>
            <p style="margin-top: 15px; font-size: 12px;">By providing your email, you agreed to our <a href="https://pixelmojo.io/privacy-policy" style="color: #005493; text-decoration: none;">Privacy Policy</a></p>
          </div>
        </body>
      </html>
    `,
  }
}

/**
 * Helper function to recommend service based on budget
 */
function getRecommendedService(budgetRange: string): string {
  if (budgetRange.includes('$50k+') || budgetRange.includes('$15k-$50k')) {
    return 'our **AI Product Development** service (full MVP in 90 days) or a combination of services'
  } else if (budgetRange.includes('$5k-$15k')) {
    return 'our **60-Day Conversion Sprint** or **Revenue-First Design** package'
  } else {
    return 'our **MVP Validation** package or **60-Day Conversion Sprint** to start'
  }
}
