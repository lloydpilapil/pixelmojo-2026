# Fix Database Schema - Qualification Score Constraint

## Problem

The `leads` table has a constraint that limits `qualification_score` to 0-10, but the code is sending values 0-100.

This causes:

- **400 Bad Request** when inserting leads
- **406 Not Acceptable** when querying leads
- Emails never sent because leads aren't saved

## Solution

Run this SQL in Supabase SQL Editor:

```sql
-- Fix qualification_score constraint from 0-10 to 0-100

-- Drop the old constraint
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_qualification_score_check;

-- Add new constraint for 0-100 range
ALTER TABLE leads ADD CONSTRAINT leads_qualification_score_check
  CHECK (qualification_score >= 0 AND qualification_score <= 100);

-- Update comment to reflect correct range
COMMENT ON COLUMN leads.qualification_score IS 'Lead quality score from 0-100 based on engagement and information provided';
```

## How to Run

### Option 1: Supabase Dashboard (Recommended)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `pixelmojo-2026`
3. Click **SQL Editor** in left sidebar
4. Create **New Query**
5. Copy/paste the SQL above
6. Click **Run**

### Option 2: Via psql Command Line

```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres" -f supabase/migrations/002_fix_qualification_score.sql
```

### Option 3: Supabase CLI

```bash
supabase db push
```

## Verification

After running, verify the constraint:

```sql
SELECT constraint_name, check_clause
FROM information_schema.check_constraints
WHERE constraint_name = 'leads_qualification_score_check';
```

Should return:

```
qualification_score >= 0 AND qualification_score <= 100
```

## Test

After fixing, test lead creation:

```sql
-- This should now work (previously failed)
INSERT INTO leads (
  session_id,
  email,
  name,
  qualification_score
) VALUES (
  (SELECT id FROM chat_sessions LIMIT 1),
  'test@example.com',
  'Test User',
  90  -- This was failing before!
);
```
