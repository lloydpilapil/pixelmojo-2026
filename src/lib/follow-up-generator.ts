import OpenAI from 'openai'
import { supabase } from './supabase'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface LeadFollowUpData {
  leadId: string
  sessionId: string
  email: string
  name?: string
  budgetRange?: string
  timeline?: string
  projectType?: string
  industry?: string
  notes?: string
  qualificationScore: number
}

export interface GeneratedFollowUp {
  subject: string
  htmlBody: string
  textBody: string
  reasoning: string
}

/**
 * Generates a personalized follow-up email based on the lead's conversation
 */
export async function generateFollowUpEmail(
  leadData: LeadFollowUpData
): Promise<GeneratedFollowUp | null> {
  try {
    // Fetch full conversation history from database
    const { data: messages, error } = await supabase
      .from('messages')
      .select('role, content, created_at')
      .eq('session_id', leadData.sessionId)
      .order('created_at', { ascending: true })

    if (error || !messages || messages.length === 0) {
      console.error('[FollowUp] Failed to fetch messages:', error)
      return null
    }

    // Build conversation transcript
    const conversationTranscript = messages
      .map((msg, i) => `[${i + 1}] ${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n')

    // Generate personalized follow-up using GPT-4
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: FOLLOW_UP_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: buildFollowUpPrompt(leadData, conversationTranscript),
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 1500,
    })

    const responseText = completion.choices[0]?.message?.content
    if (!responseText) {
      console.error('[FollowUp] No response from OpenAI')
      return null
    }

    const parsed = JSON.parse(responseText)
    return {
      subject: parsed.subject,
      htmlBody: parsed.html_body,
      textBody: parsed.text_body,
      reasoning: parsed.reasoning,
    }
  } catch (error) {
    console.error('[FollowUp] Error generating follow-up:', error)
    return null
  }
}

/**
 * System prompt for follow-up email generation
 */
const FOLLOW_UP_SYSTEM_PROMPT = `You are Lloyd, founder of Pixelmojo, an AI-native design and development agency.

Your task is to generate a personalized follow-up email for a lead who chatted with your AI assistant but didn't proceed to booking a call or submitting a detailed inquiry.

FOLLOW-UP EMAIL PRINCIPLES:

1. **PERSONALIZATION IS KEY**
   - Reference specific things they mentioned in the conversation
   - Address their exact pain points, not generic problems
   - Use their language and terminology

2. **VALUE-FIRST APPROACH**
   - Lead with helpful insights, not a sales pitch
   - Share relevant case study or data point
   - Offer something useful (framework, checklist, strategy insight)

3. **CONVERSATIONAL TONE**
   - Write like a founder reaching out personally, not a marketing team
   - Be warm, authentic, and direct
   - Keep it concise (200-300 words max)

4. **CLEAR NEXT STEP**
   - Single, specific call-to-action
   - Low-friction (book a call, reply with details, etc.)
   - Create urgency without being pushy

5. **CONTEXT-AWARE MESSAGING**

   Budget Concerns ("konti budget", "pricey", "expensive"):
   → Emphasize flexible payment terms (20-30-30-20)
   → Mention PH startup discount (15-20% off)
   → Frame as investment with ROI examples

   Timeline Urgency ("urgent", "ASAP", "need support"):
   → Highlight fast turnaround capability (48-hour start)
   → Mention priority delivery options
   → Show timeline examples from similar projects

   Specific Package Interest (MVP, Growth, etc.):
   → Provide detailed breakdown of that package
   → Include timeline and deliverables
   → Show relevant case study or portfolio item

   Industry-Specific:
   → Reference relevant portfolio work
   → Mention industry-specific optimizations
   → Show understanding of their market

   Multiple Services:
   → Explain value of integrated approach
   → Mention bundle efficiency (2-3x better results)
   → Show how services complement each other

RESPONSE FORMAT (JSON):
{
  "subject": "Email subject line (personalized, curiosity-driven, 6-10 words)",
  "html_body": "Full HTML email body (use simple inline styling)",
  "text_body": "Plain text version of email",
  "reasoning": "Brief explanation of your approach (internal use)"
}

HTML STYLING GUIDELINES:
- Use inline styles only (Gmail compatibility)
- Keep it clean and simple
- Use PixelMojo brand colors: Primary #005493 (blue), Accent #3CC29E (teal)
- Mobile-friendly (single column, readable fonts)
- Include clear CTA button

TONE EXAMPLES:

❌ BAD (Too formal/generic):
"Dear Potential Client,
Thank you for your interest in our services. We would like to schedule a meeting to discuss your requirements further..."

✅ GOOD (Personal/conversational):
"Hey [Name],
I saw you were looking into [specific thing]. Quick thought - most clients in [their situation] actually save $XX by starting with [approach].
Want to hop on a quick call this week to explore if that fits your situation?"

IMPORTANT CONSTRAINTS:
- Never use placeholder text like "[Name]" - use actual data provided
- If name is missing, use "there" or "you" naturally
- Always sign off as "Lloyd" not "Lloyd Pilapil" or formal variations
- Include real Pixelmojo contact info: lloyd@pixelmojo.io, calendly link
- DO NOT make up portfolio items or case studies not mentioned in data
- DO NOT promise specific results unless backed by real data`

/**
 * Build the user prompt with lead data and conversation
 */
function buildFollowUpPrompt(
  leadData: LeadFollowUpData,
  conversationTranscript: string
): string {
  return `Generate a personalized follow-up email for this lead:

LEAD INFORMATION:
- Name: ${leadData.name || 'Not provided'}
- Email: ${leadData.email}
- Budget Range: ${leadData.budgetRange || 'Not mentioned'}
- Timeline: ${leadData.timeline || 'Not mentioned'}
- Project Type: ${leadData.projectType || 'Not mentioned'}
- Industry: ${leadData.industry || 'Not mentioned'}
- Qualification Score: ${leadData.qualificationScore}/100
- Notes: ${leadData.notes || 'None'}

CONVERSATION TRANSCRIPT:
${conversationTranscript}

ANALYSIS CONTEXT:
- This lead scored ${leadData.qualificationScore}/100 (below 60 threshold for immediate notification)
- They showed interest but didn't complete the conversation or book a call
- Your goal: Re-engage them with personalized value

SPECIFIC REQUIREMENTS:
1. Reference something specific from the conversation (show you read it)
2. Address their main concern or question
3. Provide immediate value (insight, data, or helpful resource)
4. Include ONE clear call-to-action
5. Keep it under 300 words

Generate the follow-up email in JSON format as specified.`
}

/**
 * Determine if a lead needs a follow-up email
 */
export function shouldSendFollowUp(leadData: {
  qualificationScore: number
  email: string | null
  followUpSentAt: string | null
  createdAt: string
}): boolean {
  // Must have email
  if (!leadData.email) return false

  // Must score 40-59 (warm but not qualified)
  if (leadData.qualificationScore < 40 || leadData.qualificationScore >= 60)
    return false

  // Must not have sent follow-up already
  if (leadData.followUpSentAt) return false

  // Must be at least 2 hours old (give them time to return naturally)
  const createdAt = new Date(leadData.createdAt)
  const now = new Date()
  const hoursSinceCreation =
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)

  if (hoursSinceCreation < 2) return false

  // Must be less than 48 hours old (after that, they're cold)
  if (hoursSinceCreation > 48) return false

  return true
}
