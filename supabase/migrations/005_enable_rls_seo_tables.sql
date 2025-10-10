/**
 * Enable Row Level Security (RLS) on SEO Monitoring Tables
 *
 * Security: These tables should only be accessible server-side via service role key.
 * RLS policies deny all public access, forcing server-side authentication.
 */

-- Enable RLS on all SEO tables
ALTER TABLE IF EXISTS target_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS keyword_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS page_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS seo_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS backlinks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS competitor_rankings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Deny all access to target_keywords" ON target_keywords;
DROP POLICY IF EXISTS "Deny all access to keyword_rankings" ON keyword_rankings;
DROP POLICY IF EXISTS "Deny all access to page_performance" ON page_performance;
DROP POLICY IF EXISTS "Deny all access to search_queries" ON search_queries;
DROP POLICY IF EXISTS "Deny all access to seo_alerts" ON seo_alerts;
DROP POLICY IF EXISTS "Deny all access to backlinks" ON backlinks;
DROP POLICY IF EXISTS "Deny all access to competitors" ON competitors;
DROP POLICY IF EXISTS "Deny all access to competitor_rankings" ON competitor_rankings;

-- Create restrictive policies (deny all access via anon/authenticated roles)
-- These tables are only accessible via service role key from backend

CREATE POLICY "Deny all access to target_keywords"
  ON target_keywords
  FOR ALL
  TO PUBLIC
  USING (false);

CREATE POLICY "Deny all access to keyword_rankings"
  ON keyword_rankings
  FOR ALL
  TO PUBLIC
  USING (false);

CREATE POLICY "Deny all access to page_performance"
  ON page_performance
  FOR ALL
  TO PUBLIC
  USING (false);

CREATE POLICY "Deny all access to search_queries"
  ON search_queries
  FOR ALL
  TO PUBLIC
  USING (false);

CREATE POLICY "Deny all access to seo_alerts"
  ON seo_alerts
  FOR ALL
  TO PUBLIC
  USING (false);

CREATE POLICY "Deny all access to backlinks"
  ON backlinks
  FOR ALL
  TO PUBLIC
  USING (false);

CREATE POLICY "Deny all access to competitors"
  ON competitors
  FOR ALL
  TO PUBLIC
  USING (false);

CREATE POLICY "Deny all access to competitor_rankings"
  ON competitor_rankings
  FOR ALL
  TO PUBLIC
  USING (false);

-- Add helpful comment
COMMENT ON TABLE target_keywords IS 'SEO target keywords - Server-side access only via service role';
COMMENT ON TABLE keyword_rankings IS 'SEO keyword ranking history - Server-side access only via service role';
COMMENT ON TABLE page_performance IS 'SEO page performance metrics - Server-side access only via service role';
COMMENT ON TABLE search_queries IS 'SEO search query data - Server-side access only via service role';
COMMENT ON TABLE seo_alerts IS 'SEO monitoring alerts - Server-side access only via service role';
COMMENT ON TABLE backlinks IS 'SEO backlink tracking - Server-side access only via service role';
COMMENT ON TABLE competitors IS 'SEO competitor tracking - Server-side access only via service role';
COMMENT ON TABLE competitor_rankings IS 'SEO competitor ranking history - Server-side access only via service role';
