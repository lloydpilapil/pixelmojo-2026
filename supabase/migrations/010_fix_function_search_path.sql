-- Fix Function Search Path Mutable warning
-- Migration: 010_fix_function_search_path
-- Created: 2025-10-11
--
-- Issue: update_updated_at_column() function lacks explicit search_path setting
-- Risk: Without search_path set, function could be vulnerable to search path attacks
-- Fix: Set explicit search_path and use SECURITY DEFINER properly

-- Recreate the function with security best practices
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add comment for documentation
COMMENT ON FUNCTION update_updated_at_column() IS 'Automatically updates the updated_at column to current timestamp. Uses explicit search_path for security.';
