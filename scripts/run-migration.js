#!/usr/bin/env node

/**
 * Run Supabase migrations using PostgreSQL client
 * Usage: node scripts/run-migration.js <migration-file>
 */

const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')

const execAsync = promisify(exec)

// Load environment variables
const dotenv = require('fs').existsSync('.env.local')
  ? fs.readFileSync('.env.local', 'utf-8')
  : ''

const parseEnv = content => {
  const env = {}
  content.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      env[match[1].trim()] = match[2].trim()
    }
  })
  return env
}

const env = parseEnv(dotenv)
const SUPABASE_URL = env.SUPABASE_URL

if (!SUPABASE_URL) {
  console.error('❌ Missing SUPABASE_URL in .env.local')
  process.exit(1)
}

const migrationFile = process.argv[2]
if (!migrationFile) {
  console.error('❌ Usage: node scripts/run-migration.js <migration-file>')
  process.exit(1)
}

const migrationPath = path.join(
  __dirname,
  '../supabase/migrations',
  migrationFile
)

if (!fs.existsSync(migrationPath)) {
  console.error(`❌ Migration file not found: ${migrationPath}`)
  process.exit(1)
}

console.log(`📋 Running migration: ${migrationFile}`)
console.log(`\n⚠️  To run this migration, please:`)
console.log(
  `1. Go to your Supabase Dashboard: ${SUPABASE_URL.replace('/rest/v1', '')}`
)
console.log(`2. Navigate to SQL Editor`)
console.log(
  `3. Copy and paste the SQL from: supabase/migrations/${migrationFile}`
)
console.log(`4. Click "Run"`)
console.log(`\nOr install Supabase CLI:`)
console.log(`  brew install supabase/tap/supabase`)
console.log(`  supabase db push`)

// Display first 20 lines of migration for quick reference
console.log(`\n📄 Migration preview (first 20 lines):`)
console.log('─'.repeat(80))
const sqlContent = fs.readFileSync(migrationPath, 'utf-8')
const lines = sqlContent.split('\n').slice(0, 20)
lines.forEach((line, i) => {
  console.log(`${String(i + 1).padStart(3, ' ')} │ ${line}`)
})
if (sqlContent.split('\n').length > 20) {
  console.log(`... (${sqlContent.split('\n').length - 20} more lines)`)
}
console.log('─'.repeat(80))
