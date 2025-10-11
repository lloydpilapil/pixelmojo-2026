-- Fix qualification_score constraint from 0-10 to 0-100
-- Migration: 002_fix_qualification_score
-- Created: 2025-10-11

-- Drop the old constraint
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_qualification_score_check;

-- Add new constraint for 0-100 range
ALTER TABLE leads ADD CONSTRAINT leads_qualification_score_check
  CHECK (qualification_score >= 0 AND qualification_score <= 100);

-- Update comment to reflect correct range
COMMENT ON COLUMN leads.qualification_score IS 'Lead quality score from 0-100 based on engagement and information provided';
