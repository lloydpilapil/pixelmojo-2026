import { NextResponse } from 'next/server'

const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'message'] as const

type RequiredField = (typeof REQUIRED_FIELDS)[number]

type ContactRequest = {
  firstName: string
  lastName: string
  company?: string
  role?: string
  email: string
  linkedin?: string
  projectWebsite?: string
  projectStage?: string
  projectTimeline?: string
  projectBudget?: string
  preferredContact: string
  hearAboutUs?: string
  message: string
}

const sanitize = (value?: string) => {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length ? trimmed : null
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactRequest>

  const missingField = REQUIRED_FIELDS.find(field => {
    const value = body[field]
    return typeof value !== 'string' || value.trim().length === 0
  }) as RequiredField | undefined

  if (missingField) {
    return NextResponse.json(
      {
        error: 'invalid_request',
        message: `Missing required field: ${missingField}`,
      },
      { status: 400 }
    )
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      {
        error: 'server_configuration_error',
        message: 'Supabase environment variables are not configured.',
      },
      { status: 500 }
    )
  }

  const payload = {
    first_name: sanitize(body.firstName)!,
    last_name: sanitize(body.lastName)!,
    company: sanitize(body.company),
    role: sanitize(body.role),
    email: sanitize(body.email)!,
    linkedin: sanitize(body.linkedin),
    project_website: sanitize(body.projectWebsite),
    project_stage: sanitize(body.projectStage),
    project_timeline: sanitize(body.projectTimeline),
    project_budget: sanitize(body.projectBudget),
    preferred_contact: sanitize(body.preferredContact) || 'email',
    hear_about_us: sanitize(body.hearAboutUs),
    message: sanitize(body.message)!,
  }

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
    return NextResponse.json(
      {
        error: 'supabase_insert_failed',
        message:
          'We ran into an issue saving your request. Please try again later.',
        details: errorText,
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
