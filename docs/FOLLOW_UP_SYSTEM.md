# Automated Follow-Up Email System

## Overview

The automated follow-up system re-engages warm leads who showed interest but didn't qualify for immediate notification (scored 40-59). It uses AI to generate personalized emails based on the actual conversation context.

## Architecture

```
Lead Conversation → Score 40-59 → Wait 2-4 hours → AI generates personalized email → Send via Resend
```

### Components

1. **AI Email Generator** (`src/lib/follow-up-generator.ts`)
   - Analyzes conversation history
   - Generates personalized subject and body
   - Context-aware messaging (budget concerns, urgency, industry)

2. **API Routes**
   - `POST /api/leads/follow-up` - Manual trigger for specific lead
   - `GET /api/leads/follow-up` - List leads needing follow-ups
   - `GET /api/cron/send-follow-ups` - Automated cron job

3. **Cron Job** (Vercel Cron)
   - Runs every 2 hours
   - Processes max 10 leads per run
   - Prevents duplicate sends

4. **Database Fields** (migration 011)
   - `follow_up_sent_at` - Timestamp of follow-up
   - `follow_up_subject` - Subject line sent

## Eligibility Criteria

A lead receives a follow-up if:

- ✅ Has email address
- ✅ Scored 40-59 (warm but not qualified)
- ✅ No follow-up sent yet
- ✅ Created 2-48 hours ago

**Why 2-48 hours?**

- < 2 hours: Give them time to return naturally
- > 48 hours: Lead is cold, unlikely to convert

## AI Personalization

The system analyzes conversation for:

### Budget Concerns

**Signals:** "konti budget", "pricey", "expensive", "tight budget"
**Response:** Emphasizes flexible payment terms (20-30-30-20), PH startup discount

### Timeline Urgency

**Signals:** "urgent", "ASAP", "need support", "this week"
**Response:** Highlights 48-hour start capability, priority delivery

### Package Interest

**Signals:** Mentioned specific service (MVP, Growth, etc.)
**Response:** Deep dive into package details, relevant case studies

### Industry-Specific

**Signals:** Real estate, SaaS, e-commerce, etc.
**Response:** References relevant portfolio work, industry optimizations

## Email Template Structure

Generated emails follow this format:

```
Subject: [Personalized, curiosity-driven, 6-10 words]

Body:
- Personal greeting (uses their name if available)
- Reference to specific conversation point
- Value-first insight or helpful resource
- Clear, single call-to-action
- Warm sign-off from Lloyd

Length: 200-300 words
Tone: Founder reaching out personally, not marketing team
```

## Usage

### Manual Trigger (Testing)

```bash
# Send follow-up to specific lead
curl -X POST http://localhost:3000/api/leads/follow-up \
  -H "Content-Type: application/json" \
  -d '{"leadId": "uuid-here"}'

# List leads needing follow-ups
curl http://localhost:3000/api/leads/follow-up
```

### Automated (Production)

Vercel Cron runs every 2 hours:

- Schedule: `0 */2 * * *`
- Max 10 leads per run
- Protected by `CRON_SECRET` env var

## Environment Variables

Required for follow-up system:

```bash
# OpenAI (for email generation)
OPENAI_API_KEY=sk-...

# Resend (for sending emails)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="Lloyd from Pixelmojo <lloyd@mg.pixelmojo.com>"

# Supabase (database)
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Cron security
CRON_SECRET=your-secret-here
```

## Database Schema

```sql
-- Leads table additions (migration 011)
ALTER TABLE leads
ADD COLUMN follow_up_sent_at timestamptz,
ADD COLUMN follow_up_subject text;

-- Index for efficient querying
CREATE INDEX idx_leads_follow_up_needed
ON leads (qualification_score, follow_up_sent_at, created_at)
WHERE email IS NOT NULL
  AND qualification_score >= 40
  AND qualification_score < 60
  AND follow_up_sent_at IS NULL;
```

## Metrics & Monitoring

Track these metrics:

1. **Follow-up Send Rate**
   - Query: Leads with `follow_up_sent_at IS NOT NULL`
   - Goal: 80%+ of eligible leads receive follow-up

2. **Response Rate**
   - Track replies to follow-up emails
   - Goal: 15-20% response rate

3. **Conversion Rate**
   - Leads that booked call after follow-up
   - Goal: 10-15% conversion to qualified

4. **Time to Send**
   - Hours between lead creation and follow-up
   - Goal: 2-8 hours (optimal engagement window)

## Testing

### Test Scenario 1: Budget-Conscious Lead

```typescript
// Create test lead in database
const testLead = {
  email: 'test@example.com',
  name: 'Test User',
  budget_range: 'Under $5k',
  timeline: 'ASAP',
  project_type: 'MVP Validation',
  notes: 'Mentioned "konti budget" and "pricey"',
  qualification_score: 45,
}

// Trigger follow-up
POST /api/leads/follow-up { leadId: test-lead-id }

// Expected: Email emphasizes flexible payment, PH discount
```

### Test Scenario 2: Urgent Lead

```typescript
const testLead = {
  email: 'urgent@example.com',
  timeline: 'ASAP',
  notes: 'Said "yes this is urgent" and "need support"',
  qualification_score: 50,
}

// Expected: Email highlights 48-hour start, fast turnaround
```

## Troubleshooting

### Follow-up not sending?

Check:

1. Lead scored 40-59? (see `qualification_score`)
2. Has email? (see `email IS NOT NULL`)
3. Already sent? (see `follow_up_sent_at`)
4. Right time window? (2-48 hours since `created_at`)

### Email generation failing?

Check:

1. OpenAI API key valid?
2. Conversation messages exist? (`messages` table)
3. Logs in console: `[FollowUp] Error generating follow-up`

### Cron not running?

Check:

1. Vercel cron configured? (see `vercel.json`)
2. `CRON_SECRET` matches?
3. Vercel deployment logs for errors

## Future Enhancements

1. **A/B Testing**
   - Test different subject line styles
   - Measure open rates by approach

2. **Multi-Touch Sequences**
   - Send 2nd follow-up after 24 hours if no response
   - Send 3rd follow-up with case study after 72 hours

3. **Behavioral Triggers**
   - Follow-up when lead revisits website
   - Follow-up when lead views pricing page

4. **Smart Timing**
   - Send based on timezone (9am-5pm local time)
   - Avoid weekends for B2B leads

5. **Performance Optimization**
   - Batch email sending (up to 50 per cron run)
   - Use Redis for rate limiting across instances

## Related Files

- `src/lib/follow-up-generator.ts` - AI email generation
- `src/app/api/leads/follow-up/route.ts` - Manual trigger API
- `src/app/api/cron/send-follow-ups/route.ts` - Automated cron job
- `src/lib/email.ts` - Email sending utilities
- `supabase/migrations/011_add_follow_up_fields.sql` - Database schema
- `vercel.json` - Cron configuration

## Contact

For questions or issues with the follow-up system:

- Developer: Lloyd Pilapil
- Email: lloyd@pixelmojo.io
- System logs: Check Vercel deployment logs → Functions → `/api/cron/send-follow-ups`
