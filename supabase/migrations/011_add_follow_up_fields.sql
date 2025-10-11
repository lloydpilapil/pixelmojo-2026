-- Add Follow-Up Email Fields to Leads Table
-- Migration: 011_add_follow_up_fields
-- Created: 2025-10-11
--
-- Purpose: Enable automated follow-up email system for warm leads (score 40-59)
-- This allows the system to track when follow-up emails are sent and their content

-- Add follow-up tracking fields
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS follow_up_sent_at timestamptz,
ADD COLUMN IF NOT EXISTS follow_up_subject text;

-- Create index for efficient querying of leads needing follow-ups
CREATE INDEX IF NOT EXISTS idx_leads_follow_up_needed
ON public.leads (qualification_score, follow_up_sent_at, created_at)
WHERE email IS NOT NULL
  AND qualification_score >= 40
  AND qualification_score < 60
  AND follow_up_sent_at IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN leads.follow_up_sent_at IS 'Timestamp when automated follow-up email was sent';
COMMENT ON COLUMN leads.follow_up_subject IS 'Subject line of the follow-up email sent';
