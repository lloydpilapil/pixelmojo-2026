# GSC Sync Issue - Current Status

## Date: October 10, 2025

## Status: PARTIALLY WORKING - Needs Further Investigation

---

## What's Working ✅

1. **GSC Authentication** - Credentials are correctly configured in Vercel
2. **RLS Policies** - Database permissions are set correctly
3. **Sync Endpoint** - `/api/admin/seo/sync` returns 200 (no errors)
4. **Date Range Fix** - Adjusted to fetch data from 3 days ago (GSC has delay)

## What's NOT Working ❌

1. **Data Not Appearing** - Top Pages and Recent Search Queries still show blank
2. **Data May Not Be Saving** - Need to verify if data is actually being written to Supabase

---

## Root Cause Analysis

### Completed Fixes

1. **Fixed private key format issue**
   - Issue: Space in the middle of the private key in Vercel
   - Solution: Removed spaces, added as single line with `\n` as literal text
   - File: Vercel Environment Variables → `GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY`

2. **Fixed RLS policies**
   - Issue: Service role was being blocked by restrictive policies
   - Solution: Created migration `006_fix_rls_service_role.sql`
   - Applied to production Supabase

3. **Fixed date range**
   - Issue: Trying to fetch today's data (GSC has 2-3 day delay)
   - Solution: Changed to fetch data from 3 days ago
   - File: `src/lib/gsc-client.ts:210-220`

4. **Fixed query filters**
   - Issue: Queries were filtering by `created_at` instead of `date`
   - Solution: Changed all queries to use `date` field
   - File: `src/app/api/admin/seo/route.ts`

---

## Next Steps for Tomorrow

### 1. Verify Data is Actually Being Saved

Check Supabase directly:

```sql
-- Check if ANY data exists in the tables
SELECT COUNT(*) FROM page_performance;
SELECT COUNT(*) FROM search_queries;
SELECT COUNT(*) FROM keyword_rankings;

-- If data exists, check the dates
SELECT date, COUNT(*) FROM page_performance GROUP BY date ORDER BY date DESC;
SELECT date, COUNT(*) FROM search_queries GROUP BY date ORDER BY date DESC;
SELECT date, COUNT(*) FROM keyword_rankings GROUP BY date ORDER BY date DESC;
```

### 2. If No Data in Supabase

The sync might be failing silently. Need to:

- Check production logs in Vercel after triggering sync
- Look for specific error in the sync steps
- Verify GSC API is returning data (might be service account permission issue)

### 3. If Data Exists But Not Displaying

Check the API response:

- Test: `https://www.pixelmojo.io/api/admin/seo?days=30`
- Verify the response contains `topPages` and `recentQueries` arrays
- Check if date filtering is working correctly

### 4. Verify Service Account Has GSC Access

1. Go to https://search.google.com/search-console
2. Select property: https://www.pixelmojo.io
3. Settings → Users and permissions
4. Verify: `lloyd-website@lloyd-website.iam.gserviceaccount.com` has "Full" access

---

## Technical Details

### Environment Variables (Production)

```
GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL=lloyd-website@lloyd-website.iam.gserviceaccount.com
GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY=(set in Vercel - single line with \n)
GOOGLE_SEARCH_CONSOLE_PROPERTY_URL=https://www.pixelmojo.io
SUPABASE_URL=https://msmvdfkdmdlzcrxujtmq.supabase.co
SUPABASE_SERVICE_ROLE_KEY=(set in Vercel)
```

### Key Files

- Sync endpoint: `src/app/api/admin/seo/sync/route.ts`
- Data fetch API: `src/app/api/admin/seo/route.ts`
- GSC client: `src/lib/gsc-client.ts`
- RLS migration: `supabase/migrations/006_fix_rls_service_role.sql`
- Frontend: `src/app/admin/seo/page.tsx`

### Database Tables

- `page_performance` - Top performing pages from GSC
- `search_queries` - Search queries that led to site
- `keyword_rankings` - Rankings for tracked keywords
- `target_keywords` - Keywords we're tracking
- `seo_alerts` - Automated alerts for ranking changes

---

## Quick Diagnostic Script

```bash
# Check if data exists in Supabase
# Run this SQL in Supabase SQL Editor:

SELECT
  'page_performance' as table_name,
  COUNT(*) as row_count,
  MAX(date) as latest_date
FROM page_performance
UNION ALL
SELECT
  'search_queries',
  COUNT(*),
  MAX(date)
FROM search_queries
UNION ALL
SELECT
  'keyword_rankings',
  COUNT(*),
  MAX(date)
FROM keyword_rankings;
```

---

## Commits Made Today

1. `485723e` - fix(seo): resolve gsc sync 500 error
2. `0f76c29` - fix(seo): adjust gsc date range for data delay
3. `74f86d0` - chore(seo): add gsc test endpoint
4. `3ab04ee` - chore(seo): remove test endpoint
5. `c88b39a` - fix(seo): query by date field instead of created_at

---

## Time Spent

- Started: ~8:30 PM
- Ended: ~11:30 PM
- Total: ~3 hours
- Main blocker: Private key format issue (spaces in the key)
