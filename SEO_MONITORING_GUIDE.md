# SEO Monitoring System Setup Guide

Complete SEO monitoring system with Google Search Console integration, automated tracking, and real-time alerts.

## Features

- ✅ **Google Search Console Integration** via MCP
- ✅ **Keyword Ranking Tracking** - Monitor target keywords over time
- ✅ **Page Performance Analytics** - Track clicks, impressions, CTR
- ✅ **Search Query Analysis** - Discover what users are searching for
- ✅ **Automated Alerts** - Get notified of ranking changes
- ✅ **Competitor Tracking** (schema ready)
- ✅ **Backlink Monitoring** (schema ready)
- ✅ **Daily Automated Sync** via Vercel Cron

## Architecture

```
┌─────────────────────────────────────────┐
│     Google Search Console API           │
│     (via Service Account)               │
└─────────────────┬───────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────┐
│     GSC Client Library                  │
│     (src/lib/gsc-client.ts)             │
└─────────────────┬───────────────────────┘
                  │
         ┌────────┴────────┐
         ↓                 ↓
┌────────────────┐  ┌──────────────────┐
│  API Routes    │  │  Cron Job        │
│  /api/admin/   │  │  (Daily Sync)    │
│  seo/          │  │                  │
└────────┬───────┘  └────────┬─────────┘
         │                   │
         ↓                   ↓
┌─────────────────────────────────────────┐
│          Supabase Database              │
│  - keyword_rankings                     │
│  - page_performance                     │
│  - search_queries                       │
│  - seo_alerts                           │
│  - backlinks                            │
│  - competitors                          │
└─────────────────┬───────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────┐
│     SEO Monitoring Dashboard            │
│     (/admin/seo)                        │
└─────────────────────────────────────────┘
```

## Setup Instructions

### 1. Run Database Migration

Copy the SQL from `supabase/migrations/004_seo_monitoring_schema.sql` and run it in your Supabase SQL Editor:

1. Go to [Supabase Dashboard](https://msmvdfkdmdlzcrxujtmq.supabase.co)
2. Navigate to **SQL Editor**
3. Paste the migration SQL
4. Click **Run**

Or use the helper script:

```bash
node scripts/run-migration.js 004_seo_monitoring_schema.sql
```

### 2. Verify Environment Variables

Ensure these are set in `.env.local`:

```bash
# Google Search Console
GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SEARCH_CONSOLE_PROPERTY_URL=https://www.yoursite.com

# Admin Access
ADMIN_PASSWORD=your-secure-password-here

# Cron Security
CRON_SECRET=your-random-secret-string
```

### 3. Add Service Account to GSC

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property (pixelmojo.io)
3. Settings → Users and permissions
4. Add user: `lloyd-website@lloyd-website.iam.gserviceaccount.com`
5. Permission: **Full** (or Owner)

### 4. Deploy to Vercel

The `vercel.json` cron configuration will automatically:

- Run daily at 2 AM UTC
- Sync last 3 days of data
- Detect ranking changes
- Create alerts

To deploy:

```bash
git add .
git commit -m "feat(seo): add seo monitoring system"
git push
```

### 5. Set Vercel Environment Variables

Add to Vercel project settings:

- `GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL`
- `GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY`
- `GOOGLE_SEARCH_CONSOLE_PROPERTY_URL`
- `CRON_SECRET`

## Usage

### Access the Dashboard

1. Go to `/admin` and log in
2. Click the **SEO** tab
3. View metrics, rankings, and alerts

### Manual Sync

Click the **"Sync GSC Data"** button in the dashboard to manually trigger a sync.

### API Endpoints

**Get SEO Data**

```bash
GET /api/admin/seo?days=30
Authorization: Basic YWRtaW46cGl4ZWxtb2pvMjAyNg==
```

**Trigger Manual Sync**

```bash
POST /api/admin/seo/sync
Authorization: Basic YWRtaW46cGl4ZWxtb2pvMjAyNg==
Content-Type: application/json

{
  "days": 7
}
```

**Cron Endpoint** (called by Vercel Cron)

```bash
GET /api/cron/seo-sync
Authorization: Bearer pixelmojo-cron-secret-2026
```

## Database Schema

### Target Keywords

Track specific keywords you want to monitor:

```sql
- keyword (text) - The search term
- category (text) - Grouping (e.g., 'core', 'services')
- priority (text) - low, medium, high, critical
- target_position (int) - Desired ranking
- is_active (boolean)
```

### Keyword Rankings

Historical ranking data:

```sql
- keyword_id (uuid)
- date (date)
- position (real) - Average position
- impressions (int)
- clicks (int)
- ctr (real)
- country (text)
- device (text)
```

### Page Performance

Track individual page metrics:

```sql
- url (text)
- date (date)
- impressions, clicks, ctr, position
```

### Search Queries

All organic queries leading to your site:

```sql
- query (text)
- date (date)
- impressions, clicks, ctr, position
```

### SEO Alerts

Automated alerts for ranking changes:

```sql
- type (text) - ranking_drop, ranking_gain, etc.
- severity (text) - info, warning, critical
- title, description
- metadata (jsonb)
- is_read (boolean)
```

## Metrics Tracked

### Dashboard Metrics

- **Total Tracked Keywords** - Number of active keywords
- **Average Position** - Overall ranking performance
- **Top 10 Rankings** - Keywords in top 10
- **Total Clicks** - Organic traffic
- **Total Impressions** - Search visibility
- **Average CTR** - Click-through rate

### Alert Types

1. **Ranking Drop** - Position decreased by >5
2. **Ranking Gain** - Position improved by >5
3. **New Keyword** - Discovered high-performing query
4. **Lost Backlink** - Important backlink removed
5. **Opportunity** - Quick win detected

## Customization

### Add Target Keywords

Insert directly in Supabase:

```sql
INSERT INTO target_keywords (keyword, category, priority, target_position)
VALUES
  ('your keyword', 'category', 'high', 5),
  ('another keyword', 'core', 'critical', 1);
```

Or via the dashboard (future feature).

### Adjust Cron Schedule

Edit `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/seo-sync",
      "schedule": "0 */6 * * *" // Every 6 hours
    }
  ]
}
```

Cron format: `minute hour day month weekday`

### Configure Alert Thresholds

Edit `src/app/api/cron/seo-sync/route.ts`:

```typescript
if (drop > 5) {
  // Change threshold
  // Create alert
}
```

## Troubleshooting

### Cron Not Running

1. Check Vercel dashboard → Settings → Cron Jobs
2. Verify `CRON_SECRET` is set in Vercel
3. Check function logs for errors

### No Data Showing

1. Run manual sync first
2. Ensure service account has GSC access
3. Check that target keywords are set
4. Verify GSC property URL is correct

### Authentication Errors

1. Verify private key format (includes `\\n` newlines)
2. Check service account email is correct
3. Ensure service account is added to GSC property

## Future Enhancements

- [ ] Competitor keyword tracking
- [ ] Backlink monitoring integration
- [ ] Content optimization suggestions
- [ ] Keyword research tools
- [ ] Mobile vs Desktop breakdown
- [ ] Country-specific tracking
- [ ] Email alerts for critical changes
- [ ] Export to CSV/Excel
- [ ] Historical trend charts
- [ ] AI-powered insights

## Support

For issues or questions:

1. Check function logs in Vercel
2. Review Supabase logs
3. Test GSC API access manually
4. Contact: lloyd@pixelmojo.io

## Resources

- [Google Search Console API Docs](https://developers.google.com/webmaster-tools/v1/how-tos/search-analytics)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [MCP Server GSC](https://github.com/ahonn/mcp-server-gsc)
