-- Add Location Tracking to Chat Sessions
-- Migration: 003_add_location_tracking
-- Created: 2025-10-07
-- Purpose: Capture IP-based geolocation for chat visitors

-- Add location fields to chat_sessions table
alter table chat_sessions
  add column if not exists ip_address text,
  add column if not exists country text,
  add column if not exists country_code text,
  add column if not exists region text,
  add column if not exists city text,
  add column if not exists timezone text,
  add column if not exists latitude numeric(10, 7),
  add column if not exists longitude numeric(10, 7);

-- Create index for location-based queries
create index if not exists idx_chat_sessions_country_code on chat_sessions(country_code);
create index if not exists idx_chat_sessions_city on chat_sessions(city);

-- Comments for documentation
comment on column chat_sessions.ip_address is 'IP address of the visitor (for geolocation)';
comment on column chat_sessions.country is 'Country name (e.g., "Philippines", "United States")';
comment on column chat_sessions.country_code is 'ISO 3166-1 alpha-2 country code (e.g., "PH", "US")';
comment on column chat_sessions.region is 'State/Province/Region (e.g., "Metro Manila", "California")';
comment on column chat_sessions.city is 'City name (e.g., "Manila", "San Francisco")';
comment on column chat_sessions.timezone is 'Timezone (e.g., "Asia/Manila", "America/Los_Angeles")';
comment on column chat_sessions.latitude is 'Approximate latitude';
comment on column chat_sessions.longitude is 'Approximate longitude';
