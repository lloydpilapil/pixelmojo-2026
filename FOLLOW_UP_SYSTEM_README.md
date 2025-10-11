# 🤖 Automated Follow-Up Email System

## ✅ System is Ready!

An AI-powered system that automatically sends personalized follow-up emails to warm leads (scored 40-59) within 2-4 hours of their conversation.

---

## 🚀 Quick Start

### 1. Apply Database Migration

Run this in your Supabase SQL Editor:

```sql
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS follow_up_sent_at timestamptz,
ADD COLUMN IF NOT EXISTS follow_up_subject text;

CREATE INDEX IF NOT EXISTS idx_leads_follow_up_needed
ON public.leads (qualification_score, follow_up_sent_at, created_at)
WHERE email IS NOT NULL
  AND qualification_score >= 40
  AND qualification_score < 60
  AND follow_up_sent_at IS NULL;
```

Or apply the migration file: `supabase/migrations/011_add_follow_up_fields.sql`

### 2. Add Environment Variable

Add to your `.env.local` (for local testing):

```bash
CRON_SECRET=your-random-secret-here
```

Add to Vercel (for production):

- Go to your Vercel project → Settings → Environment Variables
- Add: `CRON_SECRET` = `your-random-secret-here`

### 3. Test Locally

```bash
# Check for eligible leads
npx tsx scripts/test-follow-up.ts

# Start dev server
npm run dev

# In another terminal, list eligible leads
curl http://localhost:3000/api/leads/follow-up

# Send follow-up to a specific lead
curl -X POST http://localhost:3000/api/leads/follow-up \
  -H "Content-Type: application/json" \
  -d '{"leadId": "uuid-from-above-response"}'
```

### 4. Deploy to Production

```bash
git add .
git commit -m "feat: automated follow-up email system"
git push origin main
```

The cron job will automatically run every 2 hours on Vercel.

---

## 📋 What It Does

1. **Finds warm leads** (score 40-59, created 2-48 hours ago)
2. **Analyzes conversation** using GPT-4o
3. **Generates personalized email** based on:
   - Budget concerns → Flexible payment options
   - Urgency signals → Fast turnaround
   - Specific interests → Relevant case studies
   - Industry → Portfolio examples
4. **Sends via Resend** (from lloyd@mg.pixelmojo.com)
5. **Tracks in database** (prevents duplicates)

---

## 📁 Key Files

| File                                               | Purpose                   |
| -------------------------------------------------- | ------------------------- |
| `src/lib/follow-up-generator.ts`                   | AI email generation logic |
| `src/app/api/leads/follow-up/route.ts`             | Manual trigger API        |
| `src/app/api/cron/send-follow-ups/route.ts`        | Automated cron job        |
| `supabase/migrations/011_add_follow_up_fields.sql` | Database schema           |
| `scripts/test-follow-up.ts`                        | Testing utility           |
| `docs/FOLLOW_UP_SYSTEM.md`                         | Full documentation        |
| `docs/FOLLOW_UP_SYSTEM_SUMMARY.md`                 | Implementation summary    |

---

## 🧪 Testing Guide

### Scenario 1: Budget-Conscious Lead

Create a test lead with:

- `qualification_score`: 45
- `budget_range`: "Under $5k"
- `notes`: "Mentioned 'konti budget' and 'pricey'"
- `created_at`: 3 hours ago

Expected: Email emphasizes flexible payment (20-30-30-20) and PH discount

### Scenario 2: Urgent Lead

Create a test lead with:

- `qualification_score`: 50
- `timeline`: "ASAP"
- `notes`: "Said 'yes this is urgent' and 'need support'"
- `created_at`: 4 hours ago

Expected: Email highlights 48-hour start capability and fast turnaround

---

## 📊 Monitoring

Check these regularly:

1. **Vercel Cron Logs**
   - Dashboard → Your Project → Functions → `/api/cron/send-follow-ups`
   - Should run every 2 hours with no errors

2. **Resend Dashboard**
   - Check email delivery rates
   - Monitor opens/clicks (if tracking enabled)

3. **Database Query**
   ```sql
   SELECT
     COUNT(*) as total_sent,
     COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as sent_last_7_days
   FROM leads
   WHERE follow_up_sent_at IS NOT NULL;
   ```

---

## 🎯 Expected Results

| Metric        | Target | How to Measure                               |
| ------------- | ------ | -------------------------------------------- |
| Send Rate     | 80%+   | % of eligible leads with `follow_up_sent_at` |
| Open Rate     | 30-40% | Resend dashboard                             |
| Response Rate | 15-20% | Track replies to lloyd@pixelmojo.io          |
| Conversion    | 10-15% | Leads booking calls after follow-up          |

---

## ❓ Troubleshooting

### No emails sending?

1. Check eligibility: `npx tsx scripts/test-follow-up.ts`
2. Verify environment variables are set
3. Check Vercel function logs for errors
4. Ensure migration was applied to database

### AI generation failing?

1. Check OpenAI API key is valid
2. Verify conversation messages exist in database
3. Look for `[FollowUp]` errors in logs

### Cron not running?

1. Check `vercel.json` has cron configuration
2. Verify `CRON_SECRET` matches in Vercel env
3. Check if deployment succeeded
4. Look at Vercel cron logs

---

## 🔒 Security

- **Cron endpoint** protected by `CRON_SECRET`
- **Database** uses RLS policies
- **API keys** stored in environment variables
- **No sensitive data** in logs or responses

---

## 📖 Full Documentation

For complete details, see:

- **Architecture & Design:** `docs/FOLLOW_UP_SYSTEM.md`
- **Implementation Summary:** `docs/FOLLOW_UP_SYSTEM_SUMMARY.md`

---

## 🎉 Impact

**Problem:** Warm leads (like robert-claro case) were lost because they scored 40-59 and received no follow-up.

**Solution:** Automatic personalized re-engagement within 2-8 hours.

**Expected Value:** 10-15% of warm leads convert → ~1.5 additional qualified leads/month → $5K-15K additional revenue/month

---

## 📞 Questions?

- **Developer:** Lloyd Pilapil
- **Email:** lloyd@pixelmojo.io
- **Test Script:** `npx tsx scripts/test-follow-up.ts`
- **API Docs:** `docs/FOLLOW_UP_SYSTEM.md`

---

## ✨ Next Steps

1. ✅ Apply database migration
2. ✅ Add `CRON_SECRET` to environment
3. ✅ Test locally with script
4. ✅ Deploy to production
5. 📊 Monitor first week
6. 🔧 Optimize based on data
