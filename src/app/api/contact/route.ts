import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimiters } from '@/lib/rate-limit'
import {
  ValidationError,
  RateLimitError,
  formatErrorResponse,
} from '@/lib/errors'
import { sanitizeText } from '@/lib/sanitize'

// Zod schema for contact form validation
const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  company: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  email: z.string().email('Invalid email address'),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  projectWebsite: z
    .string()
    .url('Invalid website URL')
    .optional()
    .or(z.literal('')),
  projectStage: z.string().optional(),
  projectTimeline: z.string().optional(),
  projectBudget: z.string().optional(),
  preferredContact: z.string().default('email'),
  hearAboutUs: z.string().optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
})

const sanitize = (value?: string) => {
  if (!value) return null
  const cleaned = sanitizeText(value)
  const trimmed = cleaned.trim()
  return trimmed.length ? trimmed : null
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 3 requests per hour per IP
    const identifier =
      request.headers.get('x-forwarded-for') ??
      request.headers.get('x-real-ip') ??
      'anonymous'
    const { success: rateLimitSuccess } = await rateLimiters.contact.check(
      3,
      identifier
    )

    if (!rateLimitSuccess) {
      throw new RateLimitError(
        'Too many contact form submissions. Please try again later.'
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Check environment variables
    const supabaseUrl = process.env.SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json(
        {
          error: 'server_configuration_error',
          message: 'Server configuration error. Please contact support.',
        },
        { status: 500 }
      )
    }

    // Prepare payload with sanitized data
    const payload = {
      first_name: sanitize(validatedData.firstName)!,
      last_name: sanitize(validatedData.lastName)!,
      company: sanitize(validatedData.company),
      role: sanitize(validatedData.role),
      email: sanitize(validatedData.email)!,
      linkedin: sanitize(validatedData.linkedin),
      project_website: sanitize(validatedData.projectWebsite),
      project_stage: sanitize(validatedData.projectStage),
      project_timeline: sanitize(validatedData.projectTimeline),
      project_budget: sanitize(validatedData.projectBudget),
      preferred_contact: sanitize(validatedData.preferredContact) || 'email',
      hear_about_us: sanitize(validatedData.hearAboutUs),
      message: sanitize(validatedData.message)!,
    }

    // Save to Supabase
    const response = await fetch(`${supabaseUrl}/rest/v1/contact_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Supabase insert failed:', errorText)
      return NextResponse.json(
        {
          error: 'database_error',
          message:
            'We ran into an issue saving your request. Please try again later.',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We'll get back to you soon!",
      },
      { status: 201 }
    )
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors
      const cleanedErrors: Record<string, string[]> = {}

      // Clean up undefined values
      for (const [key, value] of Object.entries(fieldErrors)) {
        if (value) {
          cleanedErrors[key] = value
        }
      }

      const validationError = new ValidationError(
        'Invalid form data',
        cleanedErrors
      )
      return NextResponse.json(formatErrorResponse(validationError), {
        status: validationError.statusCode,
      })
    }

    // Handle rate limit errors
    if (error instanceof RateLimitError) {
      return NextResponse.json(formatErrorResponse(error), {
        status: error.statusCode,
      })
    }

    // Handle unknown errors
    console.error('Contact form error:', error)
    return NextResponse.json(formatErrorResponse(error), { status: 500 })
  }
}
