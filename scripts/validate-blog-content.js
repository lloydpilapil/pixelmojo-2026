#!/usr/bin/env node

/**
 * Validate blog content for common issues
 * Run before committing MDX files
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')

const CONTENT_DIR = path.join(__dirname, '../content')

const issues = []

// Find all MDX files
const mdxFiles = glob.sync(`${CONTENT_DIR}/**/*.mdx`)

mdxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8')
  const filename = path.basename(file)

  // Check for markdown tables (should use BlogTable)
  const hasMarkdownTable = /^\|.*\|.*\|/m.test(content)
  if (hasMarkdownTable) {
    issues.push({
      file: filename,
      issue: 'Contains markdown table',
      fix: 'Use <BlogTable> component instead',
      severity: 'warning',
    })
  }

  // Check for checkbox symbols (should use bullet lists)
  const hasCheckboxSymbol = /^□/m.test(content)
  if (hasCheckboxSymbol) {
    issues.push({
      file: filename,
      issue: 'Contains □ checkbox symbols',
      fix: 'Use "- " for bullet lists instead',
      severity: 'error',
    })
  }

  // Check for HTML entities in tables
  const hasHtmlEntity = /&lt;|&gt;|&amp;/.test(content)
  if (hasHtmlEntity) {
    issues.push({
      file: filename,
      issue: 'Contains HTML entities (&lt;, &gt;, &amp;)',
      fix: 'Use actual characters (<, >, &) instead',
      severity: 'warning',
    })
  }
})

// Report issues
if (issues.length > 0) {
  console.log('\n🔍 Blog Content Validation Issues:\n')

  issues.forEach(({ file, issue, fix, severity }) => {
    const icon = severity === 'error' ? '❌' : '⚠️'
    console.log(`${icon} ${file}`)
    console.log(`   Issue: ${issue}`)
    console.log(`   Fix: ${fix}\n`)
  })

  const errorCount = issues.filter(i => i.severity === 'error').length
  const warningCount = issues.filter(i => i.severity === 'warning').length

  console.log(`\nFound ${errorCount} errors and ${warningCount} warnings\n`)

  if (errorCount > 0) {
    console.log('❌ Please fix errors before committing.\n')
    process.exit(1)
  } else {
    console.log('⚠️  Warnings found but allowing commit.\n')
    process.exit(0)
  }
} else {
  console.log('✅ All blog content validated successfully!\n')
  process.exit(0)
}
