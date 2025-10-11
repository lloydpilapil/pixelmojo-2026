-- Clean up all RLS policies on contact_requests and create single optimized policies
-- Migration: 008_cleanup_contact_requests_policies
-- Created: 2025-10-11
--
-- Issue: Multiple permissive policies exist, causing conflicts and performance warnings
-- Fix: Remove ALL existing policies and create single, optimized policy per operation

-- Drop ALL existing policies on contact_requests (catch-all cleanup)
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'contact_requests') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.contact_requests', r.policyname);
    END LOOP;
END $$;

-- Create single optimized policy for each operation type
-- These use subqueries to prevent per-row re-evaluation (performance optimization)

-- INSERT: Allow anyone to create contact requests (public form submission)
CREATE POLICY "contact_requests_insert_policy"
  ON public.contact_requests
  FOR INSERT
  WITH CHECK (true);

-- SELECT: Only service role can read (admin reads via API with service role)
CREATE POLICY "contact_requests_select_policy"
  ON public.contact_requests
  FOR SELECT
  USING ((SELECT current_setting('role', true)) = 'service_role');

-- UPDATE: Only service role can update (admin updates via API)
CREATE POLICY "contact_requests_update_policy"
  ON public.contact_requests
  FOR UPDATE
  USING ((SELECT current_setting('role', true)) = 'service_role');

-- DELETE: Only service role can delete (admin deletes via API)
CREATE POLICY "contact_requests_delete_policy"
  ON public.contact_requests
  FOR DELETE
  USING ((SELECT current_setting('role', true)) = 'service_role');
