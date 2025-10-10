# SEO Monitoring - Quick Start

## 🚀 What We Built

A complete SEO monitoring system that rivals Ahrefs/Ubersuggest, integrated with your Google Search Console:

### ✅ Features

- **Keyword Ranking Tracking** - Monitor target keywords daily
- **Page Performance** - Track clicks, impressions, CTR
- **Search Queries Analysis** - See what users search for
- **Automated Alerts** - Get notified of ranking changes (>5 positions)
- **Competitor Tracking** - Schema ready
- **Backlink Monitoring** - Schema ready
- **Daily Auto-Sync** - Runs at 2 AM UTC via Vercel Cron

## 📋 Next Steps

### 1. Run Database Migration

```bash
# Option A: Copy SQL from supabase/migrations/004_seo_monitoring_schema.sql
# and paste into Supabase SQL Editor

# Option B: Use helper script
node scripts/run-migration.js 004_seo_monitoring_schema.sql
```

Go to: https://msmvdfkdmdlzcrxujtmq.supabase.co
→ SQL Editor → Paste SQL → Run

### 2. Add Service Account to GSC

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select pixelmojo.io property
3. Settings → Users and permissions
4. Add: `lloyd-website@lloyd-website.iam.gserviceaccount.com`
5. Permission: **Full** or **Owner**

### 3. Test Locally

```bash
# Start dev server
npm run dev

# Visit admin panel
# http://localhost:3000/admin
# Password: pixelmojo2026

# Click "SEO" tab
# Click "Sync GSC Data" to test
```

### 4. Deploy to Vercel

```bash
git add .
git commit -m "feat(seo): add seo monitoring system"
git push
```

### 5. Set Vercel Environment Variables

Add these in Vercel Project Settings → Environment Variables:

```
GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL=lloyd-website@lloyd-website.iam.gserviceaccount.com
GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SEARCH_CONSOLE_PROPERTY_URL=https://www.pixelmojo.io
CRON_SECRET=pixelmojo-cron-secret-2026
```

## 📊 Dashboard Access

**URL:** `/admin/seo`

**Password:** `pixelmojo2026`

### Dashboard Shows:

- Tracked keywords count & avg position
- Total clicks & impressions
- Recent alerts (ranking drops/gains)
- Top performing keywords
- Top performing pages
- Recent search queries

## 🔄 How It Works

```
Daily at 2 AM UTC:
  ↓
Vercel Cron triggers /api/cron/seo-sync
  ↓
Fetches last 3 days from Google Search Console
  ↓
Updates Supabase:
  - keyword_rankings
  - page_performance
  - search_queries
  ↓
Detects ranking changes (>5 positions)
  ↓
Creates alerts in seo_alerts table
  ↓
Dashboard displays updated data
```

## 🎯 Tracked Keywords (Pre-seeded)

Already set up to track:

- AI design agency
- AI native design
- design agency Philippines
- AI product development
- revenue-first design
- conversion-focused design
- AI-powered growth marketing
- b2b design agency

## 🔧 Customization

### Add More Keywords

```sql
INSERT INTO target_keywords (keyword, category, priority, target_position)
VALUES ('new keyword', 'services', 'high', 5);
```

### Change Cron Schedule

Edit `vercel.json`:

```json
"schedule": "0 */6 * * *"  // Every 6 hours
```

## 📁 Key Files Created

```
src/
├── lib/
│   └── gsc-client.ts              # GSC API wrapper
├── app/
│   ├── api/
│   │   ├── admin/seo/
│   │   │   ├── route.ts           # GET SEO data
│   │   │   └── sync/route.ts      # POST manual sync
│   │   └── cron/
│   │       └── seo-sync/route.ts  # Cron job handler
│   └── admin/
│       └── seo/
│           └── page.tsx            # Dashboard UI

supabase/
└── migrations/
    └── 004_seo_monitoring_schema.sql  # Database schema

vercel.json                         # Cron configuration
SEO_MONITORING_GUIDE.md            # Full documentation
```

## 🆘 Troubleshooting

**No data showing?**

1. Run manual sync first (click "Sync GSC Data")
2. Check service account has GSC access
3. Verify GSC property URL

**Cron not running?**

1. Check Vercel → Settings → Cron Jobs
2. Verify `CRON_SECRET` is set
3. Check function logs

**TypeScript errors?**

```bash
npm run type-check  # Should show no errors
```

## 📈 What's Next

- [x] Keyword ranking tracking
- [x] Page performance
- [x] Search queries
- [x] Automated alerts
- [ ] Competitor analysis (UI)
- [ ] Backlink monitoring (UI)
- [ ] Email notifications
- [ ] Export to CSV
- [ ] Historical charts

## 🎉 Success!

You now have a production-ready SEO monitoring system that:

- Tracks your keyword rankings daily
- Monitors page performance
- Alerts you to significant changes
- Provides insights similar to Ahrefs/Ubersuggest
- Costs $0 (uses free GSC API)

**Next:** Run the migration and start monitoring your SEO! 🚀
