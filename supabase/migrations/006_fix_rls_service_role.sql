/**
 * Fix RLS Policies for Service Role Access
 *
 * The service role should bypass RLS by default, but we're adding explicit
 * policies to ensure server-side operations work correctly.
 */

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Deny all access to target_keywords" ON target_keywords;
DROP POLICY IF EXISTS "Deny all access to keyword_rankings" ON keyword_rankings;
DROP POLICY IF EXISTS "Deny all access to page_performance" ON page_performance;
DROP POLICY IF EXISTS "Deny all access to search_queries" ON search_queries;
DROP POLICY IF EXISTS "Deny all access to seo_alerts" ON seo_alerts;
DROP POLICY IF EXISTS "Deny all access to backlinks" ON backlinks;
DROP POLICY IF EXISTS "Deny all access to competitors" ON competitors;
DROP POLICY IF EXISTS "Deny all access to competitor_rankings" ON competitor_rankings;

-- Create policies that allow service role access
-- Note: Service role bypasses RLS, but we're being explicit here

CREATE POLICY "Service role full access to target_keywords"
  ON target_keywords
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to keyword_rankings"
  ON keyword_rankings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to page_performance"
  ON page_performance
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to search_queries"
  ON search_queries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to seo_alerts"
  ON seo_alerts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to backlinks"
  ON backlinks
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to competitors"
  ON competitors
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to competitor_rankings"
  ON competitor_rankings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Deny access to anon and authenticated roles
CREATE POLICY "Deny anon/authenticated to target_keywords"
  ON target_keywords
  FOR ALL
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny anon/authenticated to keyword_rankings"
  ON keyword_rankings
  FOR ALL
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny anon/authenticated to page_performance"
  ON page_performance
  FOR ALL
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny anon/authenticated to search_queries"
  ON search_queries
  FOR ALL
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny anon/authenticated to seo_alerts"
  ON seo_alerts
  FOR ALL
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny anon/authenticated to backlinks"
  ON backlinks
  FOR ALL
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny anon/authenticated to competitors"
  ON competitors
  FOR ALL
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny anon/authenticated to competitor_rankings"
  ON competitor_rankings
  FOR ALL
  TO anon, authenticated
  USING (false);
