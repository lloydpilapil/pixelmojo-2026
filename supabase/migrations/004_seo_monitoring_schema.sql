-- SEO Monitoring Schema
-- Tracks keyword rankings, search performance, and SEO metrics over time

-- 1. Target Keywords Table
-- Defines which keywords we want to track
CREATE TABLE IF NOT EXISTS target_keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword TEXT NOT NULL,
  category TEXT, -- e.g., 'design', 'ai', 'development'
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  target_position INTEGER, -- Desired ranking position
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(keyword)
);

-- 2. Keyword Rankings Table
-- Historical ranking data for tracked keywords
CREATE TABLE IF NOT EXISTS keyword_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword_id UUID REFERENCES target_keywords(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  position REAL, -- Average position in search results
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr REAL DEFAULT 0, -- Click-through rate
  country TEXT DEFAULT 'total',
  device TEXT DEFAULT 'total' CHECK (device IN ('total', 'desktop', 'mobile', 'tablet')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(keyword_id, date, country, device)
);

-- 3. Page Performance Table
-- Track performance of individual pages
CREATE TABLE IF NOT EXISTS page_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  date DATE NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr REAL DEFAULT 0,
  position REAL,
  country TEXT DEFAULT 'total',
  device TEXT DEFAULT 'total' CHECK (device IN ('total', 'desktop', 'mobile', 'tablet')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(url, date, country, device)
);

-- 4. Search Queries Table
-- Track all organic search queries that led to our site
CREATE TABLE IF NOT EXISTS search_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  date DATE NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr REAL DEFAULT 0,
  position REAL,
  country TEXT DEFAULT 'total',
  device TEXT DEFAULT 'total' CHECK (device IN ('total', 'desktop', 'mobile', 'tablet')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(query, date, country, device)
);

-- 5. Backlinks Table
-- Monitor backlink profile
CREATE TABLE IF NOT EXISTS backlinks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  anchor_text TEXT,
  domain_authority INTEGER,
  is_follow BOOLEAN DEFAULT true,
  first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'lost', 'nofollow')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(source_url, target_url)
);

-- 6. SEO Alerts Table
-- Store alerts for ranking changes, new opportunities, etc.
CREATE TABLE IF NOT EXISTS seo_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('ranking_drop', 'ranking_gain', 'new_keyword', 'lost_backlink', 'opportunity')),
  severity TEXT DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB, -- Store additional context
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Competitor Tracking Table
-- Track competitor performance
CREATE TABLE IF NOT EXISTS competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS competitor_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id UUID REFERENCES competitors(id) ON DELETE CASCADE,
  keyword TEXT NOT NULL,
  date DATE NOT NULL,
  position REAL,
  visibility_score REAL, -- Estimated visibility
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(competitor_id, keyword, date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_keyword_rankings_date ON keyword_rankings(date DESC);
CREATE INDEX IF NOT EXISTS idx_keyword_rankings_keyword_id ON keyword_rankings(keyword_id);
CREATE INDEX IF NOT EXISTS idx_page_performance_date ON page_performance(date DESC);
CREATE INDEX IF NOT EXISTS idx_page_performance_url ON page_performance(url);
CREATE INDEX IF NOT EXISTS idx_search_queries_date ON search_queries(date DESC);
CREATE INDEX IF NOT EXISTS idx_search_queries_query ON search_queries(query);
CREATE INDEX IF NOT EXISTS idx_backlinks_target_url ON backlinks(target_url);
CREATE INDEX IF NOT EXISTS idx_backlinks_status ON backlinks(status);
CREATE INDEX IF NOT EXISTS idx_seo_alerts_created_at ON seo_alerts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_seo_alerts_is_read ON seo_alerts(is_read);
CREATE INDEX IF NOT EXISTS idx_competitor_rankings_date ON competitor_rankings(date DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_target_keywords_updated_at
  BEFORE UPDATE ON target_keywords
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_backlinks_updated_at
  BEFORE UPDATE ON backlinks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed some initial target keywords for PixelMojo
INSERT INTO target_keywords (keyword, category, priority, target_position) VALUES
  ('AI design agency', 'core', 'critical', 1),
  ('AI native design', 'core', 'critical', 1),
  ('design agency Philippines', 'local', 'high', 3),
  ('AI product development', 'services', 'high', 5),
  ('revenue-first design', 'unique', 'high', 5),
  ('conversion-focused design', 'services', 'medium', 10),
  ('AI-powered growth marketing', 'services', 'medium', 10),
  ('b2b design agency', 'industry', 'medium', 10)
ON CONFLICT (keyword) DO NOTHING;

-- Seed competitor domains
INSERT INTO competitors (domain, name) VALUES
  ('superside.com', 'Superside'),
  ('dribbble.com', 'Dribbble'),
  ('99designs.com', '99designs'),
  ('designpickle.com', 'Design Pickle')
ON CONFLICT (domain) DO NOTHING;
