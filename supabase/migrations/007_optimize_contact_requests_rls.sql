-- Optimize RLS policies for contact_requests table
-- Migration: 007_optimize_contact_requests_rls
-- Created: 2025-10-11
--
-- Issue: RLS policies re-evaluate auth functions for each row, causing performance issues
-- Fix: Since this app uses NextAuth (not Supabase Auth), we use service role bypass
--       Admin operations are handled at the application layer via API routes with NextAuth
--
-- Strategy: Allow service role full access, block anon/authenticated roles from admin operations

-- Drop existing RLS policies on contact_requests
DROP POLICY IF EXISTS "Only admins can read contact requests" ON public.contact_requests;
DROP POLICY IF EXISTS "Admins can update contact requests" ON public.contact_requests;
DROP POLICY IF EXISTS "Admins can delete contact requests" ON public.contact_requests;
DROP POLICY IF EXISTS "Allow public to create contact requests" ON public.contact_requests;

-- Create optimized RLS policies

-- Allow anyone to create contact requests (public form submission)
CREATE POLICY "Allow public to create contact requests"
  ON public.contact_requests
  FOR INSERT
  WITH CHECK (true);

-- Service role can read all contact requests (bypasses RLS by default)
-- Anon/authenticated users cannot read (admin reads via service role in API routes)
CREATE POLICY "Service role can read contact requests"
  ON public.contact_requests
  FOR SELECT
  USING (
    (SELECT current_setting('role', true)) = 'service_role'
    OR
    (SELECT auth.jwt()->>'role') = 'service_role'
  );

-- Service role can update contact requests (admin updates via API with service role)
CREATE POLICY "Service role can update contact requests"
  ON public.contact_requests
  FOR UPDATE
  USING (
    (SELECT current_setting('role', true)) = 'service_role'
    OR
    (SELECT auth.jwt()->>'role') = 'service_role'
  );

-- Service role can delete contact requests (admin deletes via API with service role)
CREATE POLICY "Service role can delete contact requests"
  ON public.contact_requests
  FOR DELETE
  USING (
    (SELECT current_setting('role', true)) = 'service_role'
    OR
    (SELECT auth.jwt()->>'role') = 'service_role'
  );

-- Add comment for documentation
COMMENT ON TABLE public.contact_requests IS 'Stores contact form submissions from the website. Admin operations handled via NextAuth + service role in API routes. RLS policies optimized by using subqueries for auth checks.';
