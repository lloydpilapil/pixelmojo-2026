import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    // Log the message for now (remove when implementing OpenAI)
    console.log('Received message:', message)

    // TODO: Replace with OpenAI integration
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "You are Pixelmojo's AI assistant. Help users with questions about AI product development, design services, and Pixelmojo's capabilities."
    //     },
    //     {
    //       role: "user",
    //       content: message
    //     }
    //   ],
    //   max_tokens: 500,
    //   temperature: 0.7,
    // })

    // For now, return a placeholder response
    return NextResponse.json({
      message:
        'Thanks for your message! Our AI assistant is coming soon. For immediate assistance, please contact us at founders@pixelmojo.io or use our contact form.',
      status: 'coming_soon',
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}

// TODO: When ready to integrate with OpenAI:
// 1. Install: npm install openai
// 2. Add OPENAI_API_KEY to your environment variables
// 3. Uncomment and configure the OpenAI client:
/*
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
*/
