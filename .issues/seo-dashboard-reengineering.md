# SEO Dashboard Re-engineering Session

**Date:** 2025-10-11
**Status:** In Progress - Testing Required

## Problem Identified

The SEO dashboard was not properly querying Google Search Console (GSC) data. Issues found:

1. **Incorrect Query Pattern** - Using aggregated data instead of daily breakdowns
2. **Invalid API Limits** - Exceeding GSC's 25,000 row limit (was requesting 100,000)
3. **Date Range Mismatch** - Syncing 7 days but querying 30 days = empty results

## Changes Made

### 1. GSC Client (`src/lib/gsc-client.ts`)

**Added:**

- `'date'` dimension to `GSCQuery` interface type
- `getKeywordRankingsByDate()` - fetches daily keyword data with `dimensions: ['query', 'date']`
- `getTopPagesByDate()` - fetches daily page performance
- `getTopQueriesByDate()` - fetches daily search query data
- Row limit capping: `Math.min(25000, limit * multiplier)` to respect GSC API limits

**Deprecated:**

- `getKeywordRankings()` - use `getKeywordRankingsByDate()` instead
- `getTopPages()` - use `getTopPagesByDate()` instead
- `getTopQueries()` - use `getTopQueriesByDate()` instead

### 2. Sync Logic (`src/app/api/admin/seo/sync/route.ts`)

**Updated all sync functions:**

```typescript
// OLD APPROACH (❌ Incorrect)
syncKeywordRankings() {
  - Query: dimensions: ['query']
  - Result: 1 row per keyword (averaged across date range)
  - Storage: Single entry with incorrect date
}

// NEW APPROACH (✅ Correct)
syncKeywordRankings() {
  - Query: dimensions: ['query', 'date']
  - Result: Multiple rows per keyword (one per day)
  - Storage: Daily entries for proper trend analysis
  - Batch processing: Chunks of 1000 records
}
```

**Changes:**

- `syncKeywordRankings()` - Now stores daily data for each keyword
- `syncPagePerformance()` - Now stores daily page metrics
- `syncSearchQueries()` - Now stores daily query metrics
- Added batch upsert in chunks of 1000 to handle large datasets
- Added comprehensive logging for debugging
- Changed default sync from 7 days to 30 days

### 3. Dashboard API (`src/app/api/admin/seo/route.ts`)

**Fixed aggregation logic:**

All query functions now:

1. Fetch ALL daily records within date range
2. Group by entity (keyword/page/query)
3. Use latest position (first in DESC date order)
4. Sum clicks/impressions across all days
5. Calculate CTR from totals

**Updated functions:**

- `getKeywordStats()` - Properly aggregates daily keyword data
- `getTopKeywords()` - Groups by keyword_id, sums metrics
- `getTopPages()` - Groups by URL, sums metrics
- `getRecentQueries()` - Groups by query, sums metrics

**Added debug logging:**

- Date range being queried
- Number of records found
- Supabase errors if any

### 4. Dashboard UI (`src/app/admin/seo/page.tsx`)

**Changed defaults:**

- Time range: 30 days → **7 days** (matches initially synced data)
- Sync days: 7 days → **30 days** (syncs more historical data)

## Current Status

### ✅ Fixed Issues:

1. GSC API calls now use daily dimensions
2. Row limits capped at 25,000 (GSC maximum)
3. Daily data properly stored in database
4. Dashboard aggregates daily data correctly
5. Sync successfully completed with 437 pages + 1054 queries

### ❌ Outstanding Issues:

**1. Date Range Mismatch (CRITICAL)**

- **Problem:** Synced Oct 1-8 (7 days), Dashboard queries Sept 11 - Oct 11 (30 days)
- **Result:** No data displayed even though data exists in DB
- **Solution Applied:** Changed dashboard default to 7 days
- **Testing Required:** Refresh dashboard to confirm data appears

**2. Keyword Rankings Return 0 Results**

- **Problem:** Tracked keywords ('AI design agency', etc.) get 0 results from GSC
- **Possible Causes:**
  - Keywords don't have impressions in that date range
  - Case sensitivity mismatch
  - Exact match filter too strict
- **Not blocking:** Pages and queries work fine
- **Action Needed:** Verify which keywords actually have data in GSC console

**3. Server Caching**

- Debug logs not appearing after code changes
- May need hard refresh or server restart
- **Testing Required:** Verify debug logs appear on next refresh

## Testing Checklist

- [ ] Refresh dashboard at http://localhost:3003/admin/seo
- [ ] Verify "Last 7 days" is selected by default
- [ ] Confirm "Top Pages" section shows ~437 pages
- [ ] Confirm "Recent Search Queries" shows ~1054 queries
- [ ] Check if metrics (Total Clicks, Impressions) are populated
- [ ] Click "Sync GSC Data" to sync full 30 days
- [ ] Switch to "Last 30 days" view after sync completes
- [ ] Verify data still appears for full 30-day range

## Data Flow

```
GSC API
  ↓ (dimensions: ['query', 'date'])
syncKeywordRankings()
  ↓ (daily records)
Supabase: keyword_rankings table
  ↓ (date range query)
getTopKeywords()
  ↓ (group + aggregate)
Dashboard UI
```

## Key Improvements

**Before:**

- ❌ 1 data point per keyword (averaged position)
- ❌ No daily tracking
- ❌ No trend analysis possible
- ❌ API limit exceeded (100k requests)
- ❌ Date range mismatches

**After:**

- ✅ Daily data points for each keyword
- ✅ Full historical tracking
- ✅ Accurate day-over-day comparisons
- ✅ API limits respected (25k max)
- ✅ Proper date range handling

## Files Modified

```
src/lib/gsc-client.ts
src/app/api/admin/seo/sync/route.ts
src/app/api/admin/seo/route.ts
src/app/admin/seo/page.tsx
```

## Next Steps

1. **Immediate:** Test dashboard to confirm data appears
2. **Short-term:** Sync full 30 days of historical data
3. **Future:**
   - Investigate why tracked keywords return 0 results
   - Add pagination for large datasets
   - Implement caching for expensive queries
   - Add date picker for custom ranges
   - Consider scheduling automatic daily syncs

## Notes

- Same issue would occur in production (not local-only)
- Database is shared between local/production (msmvdfkdmdlzcrxujtmq.supabase.co)
- GSC service account properly configured
- All type checking passes ✅

## Questions to Address

1. Why do the seeded target keywords not appear in GSC results?
2. Should we add automatic daily sync via cron job?
3. Do we need device/country breakdown or just totals?
4. Should we add competitors tracking functionality?

---

**To Resume:** Start by testing the dashboard at http://localhost:3003/admin/seo and verifying data appears. Then sync 30 days and retest.
