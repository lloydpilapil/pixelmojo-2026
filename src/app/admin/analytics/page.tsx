'use client'

import { useEffect, useState, useCallback, memo } from 'react'
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Award,
  AlertCircle,
} from 'lucide-react'

interface AnalyticsData {
  period: {
    days: number
    startDate: string
    endDate: string
  }
  funnel: {
    totalSessions: number
    engagedSessions: number
    totalLeads: number
    qualifiedLeads: number
    highValueLeads: number
    convertedLeads: number
    engagementRate: number
    leadCaptureRate: number
    qualificationRate: number
    conversionRate: number
  }
  leadQuality: {
    low: number
    medium: number
    high: number
  }
  trends: Record<
    string,
    {
      sessions: number
      leads: number
      avgScore: number
    }
  >
  topMetrics: {
    topIndustries: Array<{
      industry: string
      count: number
      avgScore: number
    }>
    topProjectTypes: Array<{
      projectType: string
      count: number
      avgScore: number
    }>
    budgetDistribution: Record<string, number>
  }
  statusBreakdown: Record<string, number>
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState(30)

  const fetchAnalytics = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/analytics?days=${timeRange}`)

      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }

      const analytics = await response.json()
      setData(analytics)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [timeRange])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  if (loading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4' />
          <p className='text-muted-foreground'>Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center max-w-md'>
          <AlertCircle className='h-12 w-12 text-destructive mx-auto mb-4' />
          <h2 className='text-2xl font-bold mb-2'>Error</h2>
          <p className='text-muted-foreground mb-4'>{error}</p>
          <button
            onClick={fetchAnalytics}
            className='px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90'
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const { funnel, leadQuality, topMetrics, statusBreakdown } = data

  return (
    <div className='w-full space-y-6'>
      {/* Time Range Selector */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>
            Conversion Funnel & Lead Metrics
          </h2>
          <p className='text-muted-foreground text-sm mt-1'>
            Track your lead performance and conversion rates
          </p>
        </div>
        <select
          value={timeRange}
          onChange={e => setTimeRange(Number(e.target.value))}
          className='px-4 py-2 border border-border rounded bg-background'
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
          <option value={365}>Last year</option>
        </select>
      </div>

      <div className='space-y-8'>
        {/* Key Metrics */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <MetricCard
            title='Total Sessions'
            value={funnel.totalSessions}
            icon={Users}
            color='blue'
          />
          <MetricCard
            title='Engaged Sessions'
            value={funnel.engagedSessions}
            subtitle={`${funnel.engagementRate.toFixed(1)}% engagement rate`}
            icon={Target}
            color='green'
          />
          <MetricCard
            title='Qualified Leads'
            value={funnel.qualifiedLeads}
            subtitle={`${funnel.qualificationRate.toFixed(1)}% of total`}
            icon={Award}
            color='purple'
          />
          <MetricCard
            title='Converted'
            value={funnel.convertedLeads}
            subtitle={`${funnel.conversionRate.toFixed(1)}% conversion`}
            icon={TrendingUp}
            color='emerald'
          />
        </div>

        {/* Conversion Funnel */}
        <div className='bg-card border border-border p-6'>
          <h2 className='text-xl font-bold mb-6'>Conversion Funnel</h2>
          <div className='space-y-4'>
            <FunnelStep
              label='Website Visitors → Chat Sessions'
              value={funnel.totalSessions}
              percentage={100}
            />
            <FunnelStep
              label='Chat Sessions → Engaged'
              value={funnel.engagedSessions}
              percentage={funnel.engagementRate}
            />
            <FunnelStep
              label='Engaged → Lead Captured'
              value={funnel.totalLeads}
              percentage={funnel.leadCaptureRate}
            />
            <FunnelStep
              label='Leads → Qualified (60+ score)'
              value={funnel.qualifiedLeads}
              percentage={funnel.qualificationRate}
            />
            <FunnelStep
              label='Qualified → Converted'
              value={funnel.convertedLeads}
              percentage={funnel.conversionRate}
              isLast
            />
          </div>
        </div>

        {/* Lead Quality Distribution */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-card border border-border p-6'>
            <h2 className='text-xl font-bold mb-6'>
              Lead Quality Distribution
            </h2>
            <div className='space-y-4'>
              <QualityBar
                label='Low Quality (0-59)'
                value={leadQuality.low}
                total={leadQuality.low + leadQuality.medium + leadQuality.high}
                color='red'
              />
              <QualityBar
                label='Qualified (60-79)'
                value={leadQuality.medium}
                total={leadQuality.low + leadQuality.medium + leadQuality.high}
                color='yellow'
              />
              <QualityBar
                label='High-Value (80-100)'
                value={leadQuality.high}
                total={leadQuality.low + leadQuality.medium + leadQuality.high}
                color='green'
              />
            </div>
          </div>

          <div className='bg-card border border-border p-6'>
            <h2 className='text-xl font-bold mb-6'>Lead Status Breakdown</h2>
            <div className='space-y-4'>
              {Object.entries(statusBreakdown).map(([status, count]) => (
                <div key={status} className='flex justify-between items-center'>
                  <span className='text-sm font-medium capitalize'>
                    {status}
                  </span>
                  <span className='text-2xl font-bold'>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-card border border-border p-6'>
            <h2 className='text-xl font-bold mb-6 flex items-center gap-2'>
              <DollarSign className='h-5 w-5 text-primary' />
              Top Industries
            </h2>
            <div className='space-y-3'>
              {topMetrics.topIndustries.map((item, i) => (
                <div
                  key={i}
                  className='flex justify-between items-center p-3 bg-muted/30 rounded'
                >
                  <div>
                    <p className='font-medium'>{item.industry}</p>
                    <p className='text-sm text-muted-foreground'>
                      Avg Score: {item.avgScore.toFixed(0)}
                    </p>
                  </div>
                  <span className='text-lg font-bold'>{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-card border border-border p-6'>
            <h2 className='text-xl font-bold mb-6 flex items-center gap-2'>
              <Target className='h-5 w-5 text-primary' />
              Top Project Types
            </h2>
            <div className='space-y-3'>
              {topMetrics.topProjectTypes.map((item, i) => (
                <div
                  key={i}
                  className='flex justify-between items-center p-3 bg-muted/30 rounded'
                >
                  <div>
                    <p className='font-medium'>{item.projectType}</p>
                    <p className='text-sm text-muted-foreground'>
                      Avg Score: {item.avgScore.toFixed(0)}
                    </p>
                  </div>
                  <span className='text-lg font-bold'>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget Distribution */}
        <div className='bg-card border border-border p-6'>
          <h2 className='text-xl font-bold mb-6'>Budget Range Distribution</h2>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {Object.entries(topMetrics.budgetDistribution).map(
              ([range, count]) => (
                <div
                  key={range}
                  className='text-center p-4 bg-muted/30 rounded'
                >
                  <p className='text-sm text-muted-foreground mb-2'>{range}</p>
                  <p className='text-3xl font-bold'>{count}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components

interface MetricCardProps {
  title: string
  value: number
  subtitle?: string
  icon: typeof Users
  color: string
}

const MetricCard = memo(function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
    purple: 'bg-purple-500/10 text-purple-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
  }

  return (
    <div className='bg-card border border-border p-6'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-muted-foreground mb-1'>{title}</p>
          <p className='text-3xl font-bold'>{value}</p>
          {subtitle && (
            <p className='text-xs text-muted-foreground mt-1'>{subtitle}</p>
          )}
        </div>
        <div
          className={`p-3 rounded ${colorClasses[color as keyof typeof colorClasses]}`}
        >
          <Icon className='h-6 w-6' />
        </div>
      </div>
    </div>
  )
})

interface FunnelStepProps {
  label: string
  value: number
  percentage: number
  isLast?: boolean
}

const FunnelStep = memo(function FunnelStep({
  label,
  value,
  percentage,
  isLast,
}: FunnelStepProps) {
  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-sm font-medium'>{label}</span>
        <div className='flex items-center gap-4'>
          <span className='text-lg font-bold'>{value}</span>
          <span
            className={`text-sm font-semibold px-2 py-1 rounded ${
              percentage >= 50
                ? 'bg-green-500/10 text-green-500'
                : percentage >= 25
                  ? 'bg-yellow-500/10 text-yellow-500'
                  : 'bg-red-500/10 text-red-500'
            }`}
          >
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className='w-full bg-muted h-3 rounded-full overflow-hidden'>
        <div
          className='h-full bg-primary transition-all duration-500'
          style={{ width: `${percentage}%` }}
        />
      </div>
      {!isLast && <div className='h-4 w-0.5 bg-border ml-4 my-1' />}
    </div>
  )
})

interface QualityBarProps {
  label: string
  value: number
  total: number
  color: string
}

const QualityBar = memo(function QualityBar({
  label,
  value,
  total,
  color,
}: QualityBarProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0

  const colorClasses = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-sm font-medium'>{label}</span>
        <span className='text-lg font-bold'>{value}</span>
      </div>
      <div className='w-full bg-muted h-8 rounded-full overflow-hidden'>
        <div
          className={`h-full ${colorClasses[color as keyof typeof colorClasses]} transition-all duration-500 flex items-center justify-end pr-3`}
          style={{ width: `${percentage}%` }}
        >
          <span className='text-white text-sm font-semibold'>
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  )
})
