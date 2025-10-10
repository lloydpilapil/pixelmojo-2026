import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { rateLimiters } from '@/lib/rate-limit'
import { requireAuth } from '@/lib/auth-helpers'

// Query parameter validation schema
const analyticsQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(365).default(30),
})

/**
 * Analytics API for conversion funnel and lead metrics
 *
 * Returns:
 * - Conversion funnel metrics
 * - Lead quality distribution
 * - Time-based trends
 * - Performance metrics
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const identifier =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'anonymous'

    const { success } = await rateLimiters.admin.check(10, identifier)

    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    // Verify admin authorization via session
    const auth = await requireAuth()
    if (!auth.authorized) {
      return auth.response
    }

    // Validate query parameters
    const searchParams = request.nextUrl.searchParams
    const validationResult = analyticsQuerySchema.safeParse({
      days: searchParams.get('days'),
    })

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid query parameters',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const { days } = validationResult.data
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // 1. CONVERSION FUNNEL METRICS
    const funnelMetrics = await getConversionFunnel(startDate)

    // 2. LEAD QUALITY DISTRIBUTION
    const leadQuality = await getLeadQualityDistribution(startDate)

    // 3. TIME-BASED TRENDS
    const trends = await getTimeTrends(startDate)

    // 4. TOP PERFORMING METRICS
    const topMetrics = await getTopPerformingMetrics(startDate)

    // 5. LEAD STATUS BREAKDOWN
    const statusBreakdown = await getLeadStatusBreakdown(startDate)

    return NextResponse.json({
      period: {
        days,
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString(),
      },
      funnel: funnelMetrics,
      leadQuality,
      trends,
      topMetrics,
      statusBreakdown,
    })
  } catch (error) {
    console.error('[Analytics API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

/**
 * Get conversion funnel metrics
 */
async function getConversionFunnel(startDate: Date) {
  // Total sessions
  const { count: totalSessions } = await supabase
    .from('chat_sessions')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startDate.toISOString())

  // Sessions with messages (engaged)
  const { count: engagedSessions } = await supabase
    .from('chat_sessions')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startDate.toISOString())
    .gt('message_count', 2) // At least 1 user message + 1 AI response

  // Total leads captured
  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startDate.toISOString())

  // Qualified leads (score >= 60)
  const { count: qualifiedLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startDate.toISOString())
    .gte('qualification_score', 60)

  // High-value leads (score >= 80)
  const { count: highValueLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startDate.toISOString())
    .gte('qualification_score', 80)

  // Converted leads (status = 'converted')
  const { count: convertedLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startDate.toISOString())
    .eq('status', 'converted')

  const totalSessionsCount = totalSessions || 0
  const engagedSessionsCount = engagedSessions || 0
  const totalLeadsCount = totalLeads || 0
  const qualifiedLeadsCount = qualifiedLeads || 0
  const highValueLeadsCount = highValueLeads || 0
  const convertedLeadsCount = convertedLeads || 0

  return {
    totalSessions: totalSessionsCount,
    engagedSessions: engagedSessionsCount,
    totalLeads: totalLeadsCount,
    qualifiedLeads: qualifiedLeadsCount,
    highValueLeads: highValueLeadsCount,
    convertedLeads: convertedLeadsCount,
    // Conversion rates
    engagementRate:
      totalSessionsCount > 0
        ? (engagedSessionsCount / totalSessionsCount) * 100
        : 0,
    leadCaptureRate:
      engagedSessionsCount > 0
        ? (totalLeadsCount / engagedSessionsCount) * 100
        : 0,
    qualificationRate:
      totalLeadsCount > 0 ? (qualifiedLeadsCount / totalLeadsCount) * 100 : 0,
    conversionRate:
      qualifiedLeadsCount > 0
        ? (convertedLeadsCount / qualifiedLeadsCount) * 100
        : 0,
  }
}

/**
 * Get lead quality distribution
 */
async function getLeadQualityDistribution(startDate: Date) {
  const { data: leads } = await supabase
    .from('leads')
    .select('qualification_score')
    .gte('created_at', startDate.toISOString())

  if (!leads) return { low: 0, medium: 0, high: 0 }

  const distribution = {
    low: 0, // 0-59
    medium: 0, // 60-79
    high: 0, // 80-100
  }

  leads.forEach(lead => {
    if (lead.qualification_score < 60) distribution.low++
    else if (lead.qualification_score < 80) distribution.medium++
    else distribution.high++
  })

  return distribution
}

/**
 * Get time-based trends (daily data for the period)
 */
async function getTimeTrends(startDate: Date) {
  const { data: sessions } = await supabase
    .from('chat_sessions')
    .select('created_at, message_count')
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: true })

  const { data: leads } = await supabase
    .from('leads')
    .select('created_at, qualification_score')
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: true })

  // Group by day
  const dailyData: Record<
    string,
    { sessions: number; leads: number; avgScore: number; scores: number[] }
  > = {}

  sessions?.forEach(session => {
    const day = session.created_at.split('T')[0]
    if (!dailyData[day])
      dailyData[day] = { sessions: 0, leads: 0, avgScore: 0, scores: [] }
    dailyData[day].sessions++
  })

  leads?.forEach(lead => {
    const day = lead.created_at.split('T')[0]
    if (!dailyData[day])
      dailyData[day] = { sessions: 0, leads: 0, avgScore: 0, scores: [] }
    dailyData[day].leads++
    dailyData[day].scores.push(lead.qualification_score)
  })

  // Calculate average scores
  Object.keys(dailyData).forEach(day => {
    const scores = dailyData[day].scores
    dailyData[day].avgScore =
      scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  })

  return dailyData
}

/**
 * Get top performing metrics
 */
async function getTopPerformingMetrics(startDate: Date) {
  // Top industries
  const { data: industries } = await supabase
    .from('leads')
    .select('industry, qualification_score')
    .gte('created_at', startDate.toISOString())
    .not('industry', 'is', null)

  const industryStats: Record<
    string,
    { count: number; totalScore: number; avgScore: number }
  > = {}

  industries?.forEach(lead => {
    if (!industryStats[lead.industry])
      industryStats[lead.industry] = { count: 0, totalScore: 0, avgScore: 0 }
    industryStats[lead.industry].count++
    industryStats[lead.industry].totalScore += lead.qualification_score
  })

  Object.keys(industryStats).forEach(industry => {
    industryStats[industry].avgScore =
      industryStats[industry].totalScore / industryStats[industry].count
  })

  // Top project types
  const { data: projectTypes } = await supabase
    .from('leads')
    .select('project_type, qualification_score')
    .gte('created_at', startDate.toISOString())
    .not('project_type', 'is', null)

  const projectTypeStats: Record<
    string,
    { count: number; totalScore: number; avgScore: number }
  > = {}

  projectTypes?.forEach(lead => {
    if (!projectTypeStats[lead.project_type])
      projectTypeStats[lead.project_type] = {
        count: 0,
        totalScore: 0,
        avgScore: 0,
      }
    projectTypeStats[lead.project_type].count++
    projectTypeStats[lead.project_type].totalScore += lead.qualification_score
  })

  Object.keys(projectTypeStats).forEach(projectType => {
    projectTypeStats[projectType].avgScore =
      projectTypeStats[projectType].totalScore /
      projectTypeStats[projectType].count
  })

  // Top budget ranges
  const { data: budgets } = await supabase
    .from('leads')
    .select('budget_range')
    .gte('created_at', startDate.toISOString())
    .not('budget_range', 'is', null)

  const budgetStats: Record<string, number> = {}
  budgets?.forEach(lead => {
    budgetStats[lead.budget_range] = (budgetStats[lead.budget_range] || 0) + 1
  })

  return {
    topIndustries: Object.entries(industryStats)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([industry, stats]) => ({ industry, ...stats })),
    topProjectTypes: Object.entries(projectTypeStats)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([projectType, stats]) => ({ projectType, ...stats })),
    budgetDistribution: budgetStats,
  }
}

/**
 * Get lead status breakdown
 */
async function getLeadStatusBreakdown(startDate: Date) {
  const { data: leads } = await supabase
    .from('leads')
    .select('status')
    .gte('created_at', startDate.toISOString())

  const statusCounts: Record<string, number> = {
    new: 0,
    qualified: 0,
    contacted: 0,
    converted: 0,
    lost: 0,
  }

  leads?.forEach(lead => {
    statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1
  })

  return statusCounts
}
