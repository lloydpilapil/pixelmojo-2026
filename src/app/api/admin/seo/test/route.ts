import { NextResponse } from 'next/server'
import { GSCClient } from '@/lib/gsc-client'

/**
 * Test GSC credentials
 * GET /api/admin/seo/test
 */
export async function GET() {
  try {
    const siteUrl =
      process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY_URL ||
      'https://www.pixelmojo.io'

    console.error('[GSC Test] Site URL:', siteUrl)
    console.error(
      '[GSC Test] Client Email:',
      process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL
    )
    console.error(
      '[GSC Test] Private Key present:',
      !!process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY
    )
    console.error(
      '[GSC Test] Private Key length:',
      process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY?.length
    )
    console.error(
      '[GSC Test] Private Key starts with:',
      process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY?.substring(0, 50)
    )

    const gscClient = new GSCClient(siteUrl)

    // Try to fetch some data
    const endDate = new Date()
    endDate.setDate(endDate.getDate() - 3)
    const startDate = new Date(endDate)
    startDate.setDate(startDate.getDate() - 7)

    const startStr = startDate.toISOString().split('T')[0]
    const endStr = endDate.toISOString().split('T')[0]

    console.error('[GSC Test] Attempting to fetch data...')
    const pages = await gscClient.getTopPages(startStr, endStr, 5)

    return NextResponse.json({
      success: true,
      message: 'GSC credentials are working!',
      pagesCount: pages.length,
      dateRange: { startDate: startStr, endDate: endStr },
    })
  } catch (error) {
    console.error('[GSC Test] Error:', error)
    console.error(
      '[GSC Test] Error stack:',
      error instanceof Error ? error.stack : 'No stack trace'
    )
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
