-- Add rate limiting fields to chat_sessions
-- Migration: 002_add_rate_limiting
-- Created: 2025-10-06

-- Add message count tracking
alter table chat_sessions
add column if not exists message_count integer default 0 not null;

-- Add last message timestamp for rate limiting
alter table chat_sessions
add column if not exists last_message_at timestamptz;

-- Add index for efficient queries
create index if not exists idx_chat_sessions_message_count on chat_sessions(message_count);

-- Comments
comment on column chat_sessions.message_count is 'Total messages sent in this session (both user and assistant)';
comment on column chat_sessions.last_message_at is 'Timestamp of last message sent, used for rate limiting';
