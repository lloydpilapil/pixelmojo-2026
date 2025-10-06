-- PixelMojo Chatbot Database Schema
-- Migration: 001_chatbot_schema
-- Created: 2025-10-04

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Chat Sessions Table
create table if not exists chat_sessions (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  visitor_id text,
  email text,
  session_metadata jsonb default '{}'::jsonb,
  status text default 'active' check (status in ('active', 'completed', 'abandoned'))
);

-- Messages Table
create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references chat_sessions(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz default now() not null
);

-- Leads Table
create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references chat_sessions(id) on delete cascade not null,
  email text not null,
  name text,
  company text,
  phone text,
  project_type text,
  industry text,
  budget_range text,
  timeline text,
  notes text,
  qualification_score integer default 0 check (qualification_score >= 0 and qualification_score <= 10),
  status text default 'new' check (status in ('new', 'qualified', 'contacted', 'converted', 'lost')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Create indexes for better performance
create index if not exists idx_chat_sessions_visitor_id on chat_sessions(visitor_id);
create index if not exists idx_chat_sessions_email on chat_sessions(email);
create index if not exists idx_chat_sessions_created_at on chat_sessions(created_at desc);
create index if not exists idx_messages_session_id on messages(session_id);
create index if not exists idx_messages_created_at on messages(created_at);
create index if not exists idx_leads_session_id on leads(session_id);
create index if not exists idx_leads_email on leads(email);
create index if not exists idx_leads_status on leads(status);
create index if not exists idx_leads_created_at on leads(created_at desc);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add trigger to chat_sessions
create trigger update_chat_sessions_updated_at
  before update on chat_sessions
  for each row
  execute function update_updated_at_column();

-- Add trigger to leads
create trigger update_leads_updated_at
  before update on leads
  for each row
  execute function update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
alter table chat_sessions enable row level security;
alter table messages enable row level security;
alter table leads enable row level security;

-- Allow public read/write for chat sessions (will be restricted by API)
create policy "Allow public chat session creation"
  on chat_sessions for insert
  with check (true);

create policy "Allow public chat session read"
  on chat_sessions for select
  using (true);

create policy "Allow public chat session update"
  on chat_sessions for update
  using (true);

-- Allow public read/write for messages
create policy "Allow public message creation"
  on messages for insert
  with check (true);

create policy "Allow public message read"
  on messages for select
  using (true);

-- Allow public read/write for leads
create policy "Allow public lead creation"
  on leads for insert
  with check (true);

create policy "Allow public lead read"
  on leads for select
  using (true);

create policy "Allow public lead update"
  on leads for update
  using (true);

-- Comments for documentation
comment on table chat_sessions is 'Stores chatbot conversation sessions';
comment on table messages is 'Stores individual messages in chat conversations';
comment on table leads is 'Stores qualified leads captured from chat conversations';
comment on column chat_sessions.visitor_id is 'Anonymous visitor identifier (fingerprint or session ID)';
comment on column chat_sessions.session_metadata is 'JSON metadata: browser, location, referrer, etc.';
comment on column leads.qualification_score is 'Lead quality score from 0-10 based on engagement and information provided';
