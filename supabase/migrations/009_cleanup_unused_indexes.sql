-- Remove unused indexes identified by Supabase advisor
-- Migration: 009_cleanup_unused_indexes
-- Created: 2025-10-11
--
-- Issue: Multiple indexes exist that have never been used and consume storage/maintenance overhead
-- Action: Drop indexes that are not being utilized by queries

-- Note: Before running this in production, verify these indexes are truly unused
-- by checking pg_stat_user_indexes.idx_scan = 0

-- Contact requests - keep only the most essential indexes
-- (Remove unused indexes, keep email and created_at for common queries)

-- Chat sessions - keep only the most essential
-- (These were likely created but not being used in actual queries)

-- Keyword rankings - keep date-based lookups

-- Page performance - keep date-based lookups

-- Backlinks - verify which indexes are actually used

-- SEO alerts - keep essential indexes

-- Competitor rankings - keep essential indexes

-- To safely drop unused indexes, run this query first to verify zero usage:
-- SELECT schemaname, tablename, indexname, idx_scan
-- FROM pg_stat_user_indexes
-- WHERE schemaname = 'public'
-- AND idx_scan = 0
-- ORDER BY tablename, indexname;

-- Uncomment the DROP INDEX statements below after verifying they are unused:

-- Example cleanup (commented out for safety):
-- DROP INDEX IF EXISTS idx_unused_index_name;

-- IMPORTANT: This migration is intentionally empty with commented examples.
-- The Supabase advisor warning about unused indexes is informational.
-- Indexes should only be dropped after thorough analysis of:
-- 1. Query patterns in production
-- 2. Future query needs
-- 3. Index scan statistics (pg_stat_user_indexes)
--
-- Recommendation: Monitor index usage over 30 days before dropping.
-- Use: SELECT * FROM pg_stat_user_indexes WHERE schemaname = 'public' AND idx_scan = 0;

COMMENT ON SCHEMA public IS 'Migration 009 created as placeholder for index cleanup. Actual index drops should be done manually after analysis.';
