import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { supabase } from '@/lib/supabase'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are a friendly design consultant for PixelMojo, an AI-native design agency.

ABOUT PIXELMOJO:
- Services: Web design & development, branding & visual identity, UI/UX design, e-commerce solutions, mobile app design
- Approach: AI-powered design that delivers 3x faster than traditional agencies with 60% fewer revisions
- Portfolio highlights: Road Runner Logistics tracking system, AI design control tower, healthcare applications, e-commerce platforms

YOUR GOALS:
1. Understand what the visitor needs help with
2. Ask about their project type, timeline, and budget (gently, one at a time)
3. Capture their email early (after understanding basic need)
4. Be helpful and consultative, not pushy - you're a design consultant, not a salesperson

CONVERSATION GUIDELINES:
- Start warmly and ask open questions
- Listen and adapt to their responses
- Ask ONE question at a time to avoid overwhelming them
- After the FIRST message understanding their need, ask for email with a value exchange: "I'd love to share our portfolio and pricing guide with you. What's your email?"
- Keep responses under 100 words
- Be conversational, warm, and design-savvy

IMPORTANT: When you collect information like email, name, budget, timeline, or project type, ALWAYS call the save_lead_info function immediately to save it.

PROJECT TYPES YOU HANDLE:
- Website design & development (starting from scratch or redesign)
- Branding & visual identity (logos, color palettes, brand guidelines)
- UI/UX for web and mobile applications
- E-commerce stores (Shopify, custom solutions)
- Design systems and component libraries
- Mobile app design (iOS, Android, cross-platform)

BUDGET RANGES (mention when asked):
- Starter projects: $5k-$15k (simple websites, basic branding)
- Standard projects: $15k-$50k (full websites, comprehensive branding, UI/UX)
- Premium projects: $50k+ (complex platforms, enterprise solutions, full product design)

TYPICAL TIMELINES:
- Small projects: 2-4 weeks
- Standard projects: 4-8 weeks
- Large projects: 2-4 months

IMPORTANT BEHAVIORS:
- Never be pushy or sales-y
- If you don't know something specific, admit it and offer to connect them with the team
- When discussing past work, mention relevant portfolio examples
- Always end responses with a question to keep the conversation flowing

STRICT TOPIC BOUNDARIES - ANTI-SPAM PROTECTION:
You ONLY help with design and product development services. If someone asks about anything unrelated, politely redirect them:

DO NOT ENGAGE WITH:
- General questions (math, science, history, trivia, etc.)
- Homework or academic help
- Coding help unrelated to our services
- Personal advice, jokes, games, or entertainment
- Repeated nonsense text or spam
- Questions about other companies or competitors

RESPONSE TO OFF-TOPIC QUESTIONS:
"I'm specifically here to help with design and product development services at PixelMojo. For questions about [their topic], I'd recommend reaching out to a different resource. Is there anything about web design, branding, or product development I can help you with today?"

Keep it brief and redirect. Don't waste conversation credits on off-topic discussions.

INTELLIGENT SERVICE RECOMMENDATIONS:
When users express interest in specific services, naturally share the relevant service page link. Match their need to the best service:

• AI Product Development (https://pixelmojo.io/services/ai-product-development)
  - When they mention: MVPs, product validation, startups, revenue generation, 90-day launch
  - Best for: Building complete product ecosystems that generate early revenue

• Full-Stack AI Implementation (https://pixelmojo.io/services/full-stack-ai)
  - When they mention: AI integration, machine learning, data pipelines, enterprise AI, production AI
  - Best for: End-to-end AI solutions from infrastructure to interface

HOW TO SHARE LINKS:
- Weave them naturally into conversation: "Based on what you've described, our [Service Name] might be perfect. You can learn more here: [link]"
- Share 1 relevant link per conversation (don't overwhelm)
- Only share if it genuinely matches their needs
- Present it as helpful information, not a hard sell

QUOTE REQUESTS:
- When user asks for a quote or pricing estimate for their project, share the contact form: https://pixelmojo.io/contact-us
- Example response: "I'd be happy to help you get a detailed quote! Please fill out our contact form here: https://pixelmojo.io/contact-us and we'll get back to you within 24 hours with a customized proposal.\n\nBefore you go, could you share a bit about your project type and timeline? This will help us prepare a more accurate quote."

PORTFOLIO REQUESTS:
- When user asks to see portfolio or recent projects, share this link: https://pixelmojo.io/projects
- Include this important note: "Note: We're carefully preparing detailed case studies for each project. Some require client approval and sensitive data redaction to protect proprietary strategies and outcomes. Full case studies will be published as they become available."
- Example response: "I'd love to show you our work! You can explore our projects here: https://pixelmojo.io/projects\n\nNote: We're carefully preparing detailed case studies for each project. Some require client approval and sensitive data redaction to protect proprietary strategies and outcomes. Full case studies will be published as they become available.\n\nIs there a specific type of project or industry you're most interested in?"

BOOKING CALLS:
- When user EXPLICITLY asks for Calendly link or to book a call, IMMEDIATELY share the link: https://calendly.com/lloyd-pixelmojo/30min
- Don't ask qualifying questions first when they directly request to book a call - just share the link enthusiastically
- Example response: "Absolutely! You can book a 30-minute discovery call here: https://calendly.com/lloyd-pixelmojo/30min - Looking forward to chatting with you!"
- For other situations (after capturing email, budget, and project details), suggest booking when appropriate
- Offer this when: user has shared good project details, budget is $15k+, or they ask to speak with someone`

// Function definition for lead capture
const LEAD_CAPTURE_FUNCTION = {
  name: 'save_lead_info',
  description:
    'Save lead information when the user provides their email, name, budget, timeline, or project details. Call this function as soon as you collect any of this information.',
  parameters: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'User email address',
      },
      name: {
        type: 'string',
        description: 'User full name or first name',
      },
      company: {
        type: 'string',
        description: 'Company name if mentioned',
      },
      phone: {
        type: 'string',
        description: 'Phone number if provided',
      },
      project_type: {
        type: 'string',
        description:
          'Type of project: web design, branding, ui/ux, ecommerce, mobile app, etc.',
      },
      industry: {
        type: 'string',
        description: 'Industry or business sector (healthcare, finance, etc.)',
      },
      budget_range: {
        type: 'string',
        description:
          'Budget range: Under $5k, $5k-$15k, $15k-$50k, $50k+, Not sure',
      },
      timeline: {
        type: 'string',
        description:
          'Project timeline: ASAP, 1-3 months, 3-6 months, 6+ months, Just exploring',
      },
      notes: {
        type: 'string',
        description:
          'Any additional project details, requirements, or context mentioned',
      },
    },
    required: [],
  },
}

// Rate limiting constants
const MAX_MESSAGES_PER_SESSION = 30
const MAX_MESSAGES_PER_MINUTE = 10 // Allows natural conversation (1 message every 6 seconds)
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message, messages } = await req.json()

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get current session for rate limiting checks
    const { data: session, error: sessionError } = await supabase
      .from('chat_sessions')
      .select('message_count, last_message_at')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Check message count limit
    if (session.message_count >= MAX_MESSAGES_PER_SESSION) {
      return NextResponse.json(
        {
          error: 'message_limit_reached',
          message:
            "Thanks for the great conversation! We've reached our chat limit. Please email us at hello@pixelmojo.com or book a discovery call to continue: https://calendly.com/lloyd-pixelmojo/30min",
        },
        { status: 429 }
      )
    }

    // Check rate limit (messages per minute)
    if (session.last_message_at) {
      const timeSinceLastMessage =
        Date.now() - new Date(session.last_message_at).getTime()

      if (
        timeSinceLastMessage <
        RATE_LIMIT_WINDOW_MS / MAX_MESSAGES_PER_MINUTE
      ) {
        const waitSeconds = Math.ceil(
          (RATE_LIMIT_WINDOW_MS / MAX_MESSAGES_PER_MINUTE -
            timeSinceLastMessage) /
            1000
        )
        return NextResponse.json(
          {
            error: 'rate_limit_exceeded',
            message: `Please wait ${waitSeconds} second${waitSeconds > 1 ? 's' : ''} before sending another message.`,
          },
          { status: 429 }
        )
      }
    }

    // Update session tracking
    await supabase
      .from('chat_sessions')
      .update({
        message_count: session.message_count + 2, // +2 for user message + AI response
        last_message_at: new Date().toISOString(),
      })
      .eq('id', sessionId)

    // Save user message to database
    console.log(
      '[API /chat] Saving user message to database for session:',
      sessionId
    )
    const { error: userMsgError } = await supabase.from('messages').insert({
      session_id: sessionId,
      role: 'user',
      content: message,
    })
    if (userMsgError) {
      console.error('[API /chat] Error saving user message:', userMsgError)
    } else {
      console.log('[API /chat] User message saved successfully')
    }

    // Prepare conversation history for OpenAI
    const conversationHistory = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user' as const, content: message },
    ]

    // Get AI response from OpenAI with function calling
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 500,
      tools: [
        {
          type: 'function',
          function: LEAD_CAPTURE_FUNCTION,
        },
      ],
      tool_choice: 'auto',
    })

    const responseMessage = completion.choices[0]?.message

    // Check if AI wants to call a function
    if (responseMessage?.tool_calls && responseMessage.tool_calls.length > 0) {
      const toolCall = responseMessage.tool_calls[0]

      if (
        toolCall.type === 'function' &&
        toolCall.function.name === 'save_lead_info'
      ) {
        const leadData = JSON.parse(toolCall.function.arguments)

        // Check if lead already exists for this session
        const { data: existingLead } = await supabase
          .from('leads')
          .select('*')
          .eq('session_id', sessionId)
          .single()

        if (existingLead) {
          // Update existing lead
          await supabase
            .from('leads')
            .update({
              ...leadData,
              updated_at: new Date().toISOString(),
            })
            .eq('session_id', sessionId)
        } else {
          // Create new lead
          await supabase.from('leads').insert({
            session_id: sessionId,
            ...leadData,
            qualification_score: calculateQualificationScore(leadData),
          })
        }

        // Update session with email if provided
        if (leadData.email) {
          await supabase
            .from('chat_sessions')
            .update({ email: leadData.email })
            .eq('id', sessionId)
        }
      }

      // Get a follow-up response after saving the lead
      const followUpCompletion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          ...conversationHistory,
          responseMessage,
          {
            role: 'tool' as const,
            content: 'Lead information saved successfully',
            tool_call_id: toolCall.id,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      })

      const aiResponse =
        followUpCompletion.choices[0]?.message?.content ||
        'Thanks for sharing that information!'

      // Save AI response to database
      console.log(
        '[API /chat] Saving AI response to database for session:',
        sessionId
      )
      const { error: aiMsgError } = await supabase.from('messages').insert({
        session_id: sessionId,
        role: 'assistant',
        content: aiResponse,
      })
      if (aiMsgError) {
        console.error('[API /chat] Error saving AI message:', aiMsgError)
      } else {
        console.log('[API /chat] AI message saved successfully')
      }

      // Update session timestamp
      await supabase
        .from('chat_sessions')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', sessionId)

      return NextResponse.json({ response: aiResponse })
    }

    // No function call, just regular response
    const aiResponse =
      responseMessage?.content ||
      "I apologize, but I didn't quite catch that. Could you rephrase?"

    // Save AI response to database
    console.log(
      '[API /chat] Saving AI response to database for session:',
      sessionId
    )
    const { error: aiMsgError2 } = await supabase.from('messages').insert({
      session_id: sessionId,
      role: 'assistant',
      content: aiResponse,
    })
    if (aiMsgError2) {
      console.error('[API /chat] Error saving AI message:', aiMsgError2)
    } else {
      console.log('[API /chat] AI message saved successfully')
    }

    // Update session timestamp
    await supabase
      .from('chat_sessions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', sessionId)

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}

// Calculate lead qualification score based on information provided
function calculateQualificationScore(leadData: {
  email?: string
  name?: string
  budget_range?: string
  timeline?: string
  project_type?: string
  company?: string
  notes?: string
}): number {
  let score = 0

  if (leadData.email) score += 3
  if (leadData.name) score += 1
  if (leadData.budget_range && leadData.budget_range !== 'Not sure') score += 2
  if (leadData.timeline && leadData.timeline !== 'Just exploring') score += 2
  if (leadData.project_type) score += 1
  if (leadData.company) score += 1

  return Math.min(score, 10) // Cap at 10
}
