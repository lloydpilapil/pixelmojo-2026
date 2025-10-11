'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Search,
  Eye,
  MousePointerClick,
  AlertCircle,
  BarChart3,
  RefreshCw,
  Target,
  Zap,
} from 'lucide-react'

interface SEOData {
  period: {
    days: number
    startDate: string
    endDate: string
  }
  keywordStats: {
    totalKeywords: number
    avgPosition: number
    topPositions: number
    totalClicks: number
    totalImpressions: number
    avgCTR: number
  }
  topKeywords: Array<{
    position: number
    clicks: number
    impressions: number
    ctr: number
    target_keywords: {
      keyword: string
      priority: string
    }
  }>
  topPages: Array<{
    url: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  recentQueries: Array<{
    query: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  rankingTrends: Array<{
    date: string
    avgPosition: number
    totalClicks: number
    totalImpressions: number
  }>
  alerts: Array<{
    id: string
    type: string
    severity: string
    title: string
    description: string
    created_at: string
    is_read: boolean
  }>
}

export default function SEOMonitoringPage() {
  const [data, setData] = useState<SEOData | null>(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState(7) // Default to 7 days to match synced data
  const [showKeywordResearch, setShowKeywordResearch] = useState(false)
  const [keywordSeed, setKeywordSeed] = useState('')
  const [keywordResults, setKeywordResults] = useState<any>(null)
  const [researching, setResearching] = useState(false)

  const fetchSEOData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/seo?days=${timeRange}`)

      if (!response.ok) {
        throw new Error('Failed to fetch SEO data')
      }

      const seoData = await response.json()
      setData(seoData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [timeRange])

  const syncGSCData = async () => {
    setSyncing(true)
    try {
      const response = await fetch('/api/admin/seo/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ days: 30 }), // Sync 30 days of data
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to sync GSC data')
      }

      // Refresh data after sync
      await fetchSEOData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sync failed')
    } finally {
      setSyncing(false)
    }
  }

  const researchKeywords = async () => {
    if (!keywordSeed.trim()) return

    setResearching(true)
    try {
      const response = await fetch(
        `/api/admin/seo/keyword-research?seed=${encodeURIComponent(keywordSeed)}`
      )

      if (!response.ok) {
        throw new Error('Failed to research keywords')
      }

      const results = await response.json()
      setKeywordResults(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Research failed')
    } finally {
      setResearching(false)
    }
  }

  useEffect(() => {
    fetchSEOData()
  }, [fetchSEOData])

  if (loading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4' />
          <p className='text-muted-foreground'>Loading SEO data...</p>
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
            onClick={fetchSEOData}
            className='px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90'
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const { keywordStats, topKeywords, topPages, recentQueries, alerts } = data

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='w-full space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold flex items-center gap-2'>
              <BarChart3 className='h-6 w-6' />
              SEO Monitoring Dashboard
            </h2>
            <p className='text-muted-foreground text-sm mt-1'>
              Track keyword rankings, search performance, and SEO health
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => setShowKeywordResearch(!showKeywordResearch)}
              className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-2'
            >
              <Search className='h-4 w-4' />
              Keyword Research
            </button>
            <select
              value={timeRange}
              onChange={e => setTimeRange(Number(e.target.value))}
              className='px-4 py-2 border border-border rounded bg-background'
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <button
              onClick={syncGSCData}
              disabled={syncing}
              className='px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2'
            >
              <RefreshCw
                className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`}
              />
              {syncing ? 'Syncing...' : 'Sync GSC Data'}
            </button>
          </div>
        </div>

        {/* Keyword Research Tool */}
        {showKeywordResearch && (
          <div className='bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 p-6 rounded-lg'>
            <h3 className='text-xl font-bold mb-4 flex items-center gap-2'>
              <Search className='h-5 w-5 text-purple-500' />
              Keyword Research Tool (100% Free)
            </h3>
            <p className='text-sm text-muted-foreground mb-4'>
              Get keyword suggestions from Google Autocomplete + your GSC data.
              No expensive API needed!
            </p>

            <div className='flex gap-3 mb-6'>
              <input
                type='text'
                value={keywordSeed}
                onChange={e => setKeywordSeed(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && researchKeywords()}
                placeholder='Enter seed keyword (e.g., "ai design agency")'
                className='flex-1 px-4 py-2 border border-border rounded bg-background'
              />
              <button
                onClick={researchKeywords}
                disabled={researching || !keywordSeed.trim()}
                className='px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2'
              >
                {researching ? (
                  <>
                    <RefreshCw className='h-4 w-4 animate-spin' />
                    Researching...
                  </>
                ) : (
                  <>
                    <Search className='h-4 w-4' />
                    Research
                  </>
                )}
              </button>
            </div>

            {keywordResults && (
              <div className='space-y-3 max-h-[500px] overflow-y-auto'>
                <div className='flex items-center justify-between mb-3'>
                  <p className='text-sm font-semibold'>
                    Found {keywordResults.totalResults} keyword opportunities
                    for "{keywordResults.seed}"
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    Sorted by opportunity score
                  </p>
                </div>
                {keywordResults.keywords.map((kw: any, i: number) => (
                  <KeywordResearchRow key={i} keyword={kw} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Key Metrics */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <MetricCard
            title='Tracked Keywords'
            value={keywordStats.totalKeywords || 0}
            subtitle={`${keywordStats.topPositions || 0} in top 10`}
            icon={Search}
            color='blue'
          />
          <MetricCard
            title='Avg Position'
            value={
              keywordStats.avgPosition
                ? keywordStats.avgPosition.toFixed(1)
                : 'N/A'
            }
            subtitle='Average ranking'
            icon={TrendingUp}
            color='purple'
          />
          <MetricCard
            title='Total Clicks'
            value={(keywordStats.totalClicks || 0).toLocaleString()}
            subtitle={`${keywordStats.avgCTR ? keywordStats.avgCTR.toFixed(2) : '0.00'}% CTR`}
            icon={MousePointerClick}
            color='green'
          />
          <MetricCard
            title='Total Impressions'
            value={(keywordStats.totalImpressions || 0).toLocaleString()}
            subtitle='Search visibility'
            icon={Eye}
            color='orange'
          />
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className='bg-card border border-border p-6'>
            <h3 className='text-xl font-bold mb-4 flex items-center gap-2'>
              <AlertCircle className='h-5 w-5 text-yellow-500' />
              Recent Alerts
            </h3>
            <div className='space-y-3'>
              {alerts.slice(0, 5).map(alert => (
                <Alert key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        )}

        {/* Top Keywords */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-card border border-border p-6'>
            <h3 className='text-xl font-bold mb-4'>Top Keywords</h3>
            <div className='space-y-3'>
              {topKeywords && topKeywords.length > 0 ? (
                topKeywords
                  .slice(0, 10)
                  .map((keyword, i) => <KeywordRow key={i} keyword={keyword} />)
              ) : (
                <p className='text-muted-foreground text-sm'>
                  No keyword data yet. Click "Sync GSC Data" to fetch rankings.
                </p>
              )}
            </div>
          </div>

          {/* Top Pages */}
          <div className='bg-card border border-border p-6'>
            <h3 className='text-xl font-bold mb-4'>Top Pages</h3>
            <div className='space-y-3'>
              {topPages && topPages.length > 0 ? (
                topPages
                  .slice(0, 10)
                  .map((page, i) => <PageRow key={i} page={page} />)
              ) : (
                <p className='text-muted-foreground text-sm'>
                  No page data yet. Click "Sync GSC Data" to fetch performance.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Keyword Opportunities - Low Hanging Fruit */}
        <div className='bg-card border border-border p-6'>
          <h3 className='text-xl font-bold mb-4 flex items-center gap-2'>
            <Target className='h-5 w-5 text-green-500' />
            Keyword Opportunities (Low-Hanging Fruit)
          </h3>
          <p className='text-sm text-muted-foreground mb-4'>
            Pages with high impressions but low CTR - optimize these for quick
            wins
          </p>
          <div className='space-y-3'>
            {recentQueries && recentQueries.length > 0 ? (
              recentQueries
                .filter(
                  q => q.impressions > 100 && q.ctr < 0.05 && q.position <= 20
                )
                .slice(0, 10)
                .map((query, i) => <OpportunityRow key={i} query={query} />)
            ) : (
              <p className='text-muted-foreground text-sm'>
                No opportunities found yet. Click "Sync GSC Data" to analyze
                keywords.
              </p>
            )}
          </div>
        </div>

        {/* Recent Queries */}
        <div className='bg-card border border-border p-6'>
          <h3 className='text-xl font-bold mb-4'>Recent Search Queries</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {recentQueries && recentQueries.length > 0 ? (
              recentQueries
                .slice(0, 20)
                .map((query, i) => <QueryRow key={i} query={query} />)
            ) : (
              <p className='text-muted-foreground text-sm'>
                No query data yet. Click "Sync GSC Data" to fetch search
                queries.
              </p>
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
  value: string | number
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: MetricCardProps) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
    green: 'bg-green-500/10 text-green-500',
    orange: 'bg-orange-500/10 text-orange-500',
  }

  return (
    <div className='bg-card border border-border p-6'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-muted-foreground mb-1'>{title}</p>
          <p className='text-3xl font-bold'>{value}</p>
          <p className='text-xs text-muted-foreground mt-1'>{subtitle}</p>
        </div>
        <div className={`p-3 rounded ${colorClasses[color]}`}>
          <Icon className='h-6 w-6' />
        </div>
      </div>
    </div>
  )
}

interface AlertProps {
  alert: {
    id: string
    type: string
    severity: string
    title: string
    description: string
    created_at: string
    is_read: boolean
  }
}

function Alert({ alert }: AlertProps) {
  const severityColors: Record<string, string> = {
    critical: 'border-red-500 bg-red-500/5',
    warning: 'border-yellow-500 bg-yellow-500/5',
    info: 'border-blue-500 bg-blue-500/5',
  }

  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    ranking_drop: TrendingDown,
    ranking_gain: TrendingUp,
  }

  const Icon = icons[alert.type] || AlertCircle

  return (
    <div
      className={`p-4 border-l-4 rounded ${severityColors[alert.severity] || ''}`}
    >
      <div className='flex items-start gap-3'>
        <Icon className='h-5 w-5 mt-0.5' />
        <div className='flex-1'>
          <p className='font-semibold'>{alert.title}</p>
          <p className='text-sm text-muted-foreground'>{alert.description}</p>
          <p className='text-xs text-muted-foreground mt-1'>
            {new Date(alert.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}

interface KeywordRowProps {
  keyword: {
    position: number
    clicks: number
    impressions: number
    ctr: number
    target_keywords: {
      keyword: string
      priority: string
    }
  }
}

function KeywordRow({ keyword }: KeywordRowProps) {
  return (
    <div className='flex items-center justify-between p-3 bg-muted/30 rounded'>
      <div className='flex-1'>
        <p className='font-medium'>{keyword.target_keywords.keyword}</p>
        <p className='text-sm text-muted-foreground'>
          {keyword.clicks} clicks • {keyword.impressions} impressions
        </p>
      </div>
      <div className='text-right'>
        <div className='flex items-center gap-1'>
          {keyword.position < 10 && (
            <TrendingUp className='h-4 w-4 text-green-500' />
          )}
          <span className='text-lg font-bold'>
            #{keyword.position.toFixed(1)}
          </span>
        </div>
        <span className='text-xs text-muted-foreground'>
          {(keyword.ctr * 100).toFixed(2)}% CTR
        </span>
      </div>
    </div>
  )
}

interface PageRowProps {
  page: {
    url: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }
}

function PageRow({ page }: PageRowProps) {
  const url = new URL(page.url)
  const path = url.pathname

  return (
    <div className='flex items-center justify-between p-3 bg-muted/30 rounded'>
      <div className='flex-1 min-w-0'>
        <p className='font-medium truncate'>{path}</p>
        <p className='text-sm text-muted-foreground'>
          {page.clicks} clicks • {(page.ctr * 100).toFixed(2)}% CTR
        </p>
      </div>
      <div className='text-right'>
        <span className='text-lg font-bold'>#{page.position.toFixed(1)}</span>
      </div>
    </div>
  )
}

interface QueryRowProps {
  query: {
    query: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }
}

function QueryRow({ query }: QueryRowProps) {
  return (
    <div className='flex items-center justify-between p-3 bg-muted/30 rounded'>
      <div className='flex-1 min-w-0'>
        <p className='font-medium truncate'>{query.query}</p>
        <p className='text-sm text-muted-foreground'>
          {query.impressions} impressions • {query.clicks} clicks
        </p>
      </div>
      <div className='text-right'>
        <span className='text-sm font-semibold'>
          #{query.position.toFixed(1)}
        </span>
      </div>
    </div>
  )
}

interface OpportunityRowProps {
  query: {
    query: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }
}

function OpportunityRow({ query }: OpportunityRowProps) {
  // Calculate potential clicks if CTR improves to expected CTR by position
  const expectedCTR =
    query.position <= 3 ? 0.15 : query.position <= 10 ? 0.08 : 0.03
  const potentialClicks = Math.round(query.impressions * expectedCTR)
  const clickOpportunity = potentialClicks - query.clicks

  return (
    <div className='flex items-start justify-between p-4 bg-gradient-to-r from-green-500/5 to-transparent border border-green-500/20 rounded'>
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2 mb-1'>
          <Zap className='h-4 w-4 text-green-500' />
          <p className='font-medium truncate'>{query.query}</p>
        </div>
        <p className='text-sm text-muted-foreground mb-2'>
          {query.impressions.toLocaleString()} impressions • Position #
          {query.position.toFixed(1)}
        </p>
        <div className='flex items-center gap-4 text-xs'>
          <span className='text-red-500 font-semibold'>
            Current: {(query.ctr * 100).toFixed(2)}% CTR ({query.clicks} clicks)
          </span>
          <span className='text-muted-foreground'>→</span>
          <span className='text-green-500 font-semibold'>
            Target: {(expectedCTR * 100).toFixed(1)}% CTR ({potentialClicks}{' '}
            clicks)
          </span>
        </div>
      </div>
      <div className='text-right ml-4'>
        <div className='flex items-center gap-1 text-green-500'>
          <TrendingUp className='h-4 w-4' />
          <span className='text-lg font-bold'>+{clickOpportunity}</span>
        </div>
        <span className='text-xs text-muted-foreground'>potential clicks</span>
      </div>
    </div>
  )
}

interface KeywordResearchRowProps {
  keyword: {
    keyword: string
    source: string
    currentRanking: number | null
    impressions: number
    clicks: number
    ctr: number
    difficulty: string
    opportunityScore: number
    estimatedVolume: number | null
  }
}

function KeywordResearchRow({ keyword }: KeywordResearchRowProps) {
  const difficultyColors: Record<string, string> = {
    Easy: 'text-green-500 bg-green-500/10',
    Medium: 'text-yellow-500 bg-yellow-500/10',
    Hard: 'text-red-500 bg-red-500/10',
    Unknown: 'text-gray-500 bg-gray-500/10',
  }

  const sourceLabels: Record<string, string> = {
    autocomplete: 'Google Suggest',
    gsc: 'Your GSC Data',
    seed: 'Seed',
  }

  return (
    <div className='flex items-center justify-between p-3 bg-card border border-border rounded hover:border-purple-500/50 transition-colors'>
      <div className='flex-1 min-w-0'>
        <p className='font-medium truncate'>{keyword.keyword}</p>
        <div className='flex items-center gap-3 mt-1 text-xs text-muted-foreground'>
          <span className='px-2 py-0.5 rounded bg-purple-500/10 text-purple-500'>
            {sourceLabels[keyword.source]}
          </span>
          {keyword.currentRanking && (
            <span>Rank: #{keyword.currentRanking.toFixed(1)}</span>
          )}
          {keyword.impressions > 0 && (
            <span>{keyword.impressions.toLocaleString()} imp</span>
          )}
          {keyword.estimatedVolume && (
            <span>~{keyword.estimatedVolume.toLocaleString()}/mo volume</span>
          )}
        </div>
      </div>
      <div className='flex items-center gap-3 ml-4'>
        <div className='text-right'>
          <p className='text-sm font-semibold'>
            Score: {keyword.opportunityScore}
          </p>
          <span
            className={`text-xs px-2 py-0.5 rounded ${difficultyColors[keyword.difficulty]}`}
          >
            {keyword.difficulty}
          </span>
        </div>
      </div>
    </div>
  )
}
