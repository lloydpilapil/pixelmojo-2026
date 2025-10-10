# GSC Sync 500 Error - Fix Instructions

## Problem

The `/api/admin/seo/sync` endpoint is returning a 500 error when trying to sync data from Google Search Console to Supabase.

## Root Cause

The issue is likely one of the following:

1. **RLS Policies blocking service role access** - The current RLS policies may be too restrictive
2. **GSC Authentication failure** - The Google Search Console API credentials may not be configured correctly
3. **Database connectivity** - Supabase connection issues

## Changes Made

### 1. Added Detailed Error Logging

Updated `src/app/api/admin/seo/sync/route.ts` to log:

- Each step of the sync process
- GSC authentication status
- Database operation results
- Full error stack traces

### 2. Created RLS Policy Fix

Created migration: `supabase/migrations/006_fix_rls_service_role.sql`

This migration:

- Explicitly grants service role full access to all SEO tables
- Denies access to anon/authenticated roles (security)
- Ensures server-side operations work correctly

### 3. Improved Error Handling

All database operations now:

- Check for errors after each query
- Throw descriptive error messages
- Log the exact operation that failed

## How to Fix

### Step 1: Apply the RLS Migration

You need to apply the RLS fix to your Supabase database:

**Option A: Via Supabase Dashboard (Recommended)**

1. Go to https://app.supabase.com
2. Select your project
3. Navigate to SQL Editor
4. Open `supabase/migrations/006_fix_rls_service_role.sql`
5. Copy and paste the entire contents
6. Click "Run"

**Option B: Via Supabase CLI**

```bash
# If you have Supabase CLI installed
supabase db push
```

### Step 2: Verify Environment Variables

Make sure these are set in `.env.local`:

```bash
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Search Console
GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SEARCH_CONSOLE_PROPERTY_URL=https://www.pixelmojo.io
```

### Step 3: Restart Dev Server

```bash
# Kill any running instances
pkill -f "next dev"

# Start fresh
npm run dev
```

### Step 4: Test the Sync

1. Open your admin panel and try to refresh GSC data
2. Check the server console for detailed logs
3. Look for the specific error message

### Step 5: Check the Logs

After testing, check your terminal for logs starting with `[SEO Sync]`:

```
[SEO Sync] Starting sync process...
[SEO Sync] Checking authentication...
[SEO Sync] Authentication successful
[SEO Sync] Initializing GSC client for: https://www.pixelmojo.io
[SEO Sync] GSC Client Email: xxx@xxx.iam.gserviceaccount.com
[SEO Sync] Private Key present: true
[SEO Sync] Date range: { startDate: '2025-10-03', endDate: '2025-10-10' }
[SEO Sync] Step 1: Syncing keyword rankings...
```

The logs will show exactly where the process is failing.

## Common Issues

### Issue 1: "GSC authentication not configured"

**Solution:** Make sure `GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL` and `GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY` are set in `.env.local`

### Issue 2: "Failed to fetch target keywords: ..."

**Solution:** Apply the RLS migration (Step 1 above)

### Issue 3: "Failed to upsert ..."

**Solution:** Apply the RLS migration (Step 1 above)

### Issue 4: Google API errors

**Solution:**

- Verify the service account has access to your GSC property
- Go to https://search.google.com/search-console
- Add the service account email as a user with "Full" permissions

## Verification

Once fixed, you should see:

```
[SEO Sync] Sync completed successfully
```

And the response:

```json
{
  "success": true,
  "message": "Synced SEO data for 7 days",
  "dateRange": { "startDate": "2025-10-03", "endDate": "2025-10-10" }
}
```

## Need Help?

Check the server logs for the exact error message. The new logging will show:

- Where the process fails (authentication, GSC API, database)
- The specific error message
- Full stack trace
