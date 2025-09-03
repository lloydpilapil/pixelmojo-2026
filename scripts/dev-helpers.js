#!/usr/bin/env node

const fs = require('fs').promises
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')

const execAsync = promisify(exec)

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

// Utility functions
const log = {
  info: msg => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: msg => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: msg => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: msg => console.error(`${colors.red}✗${colors.reset} ${msg}`),
  title: msg =>
    console.log(`${colors.bright}${colors.cyan}${msg}${colors.reset}`),
}

// Input validation helpers
const validateInput = (input, type = 'string') => {
  if (!input) {
    throw new Error(`${type} is required`)
  }
  if (typeof input !== 'string' || input.trim().length === 0) {
    throw new Error(`Invalid ${type} provided`)
  }
  return input.trim()
}

const sanitizeFilename = filename => {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const formatDate = (date = new Date()) => {
  return date.toISOString().split('T')[0]
}

// File system helpers
const ensureDir = async dirPath => {
  try {
    await fs.access(dirPath)
  } catch {
    await fs.mkdir(dirPath, { recursive: true })
  }
}

const fileExists = async filePath => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

// Command implementations
const commands = {
  'new-post': async title => {
    try {
      log.title('Creating new blog post...')

      const validatedTitle = validateInput(title, 'title')
      const slug = sanitizeFilename(validatedTitle)
      const date = formatDate()

      if (!slug) {
        throw new Error('Title resulted in empty slug after sanitization')
      }

      // Ensure content directory exists
      const contentDir = path.join(process.cwd(), 'content')
      await ensureDir(contentDir)

      // Create filename and check if it exists
      const filename = `${slug}.mdx`
      const filePath = path.join(contentDir, filename)

      if (await fileExists(filePath)) {
        throw new Error(`Post with slug "${slug}" already exists`)
      }

      // Generate blog post template
      const postTemplate = `---
title: ${validatedTitle}
date: ${date}
description: Add your post description here
tags: []
---

# ${validatedTitle}

Start writing your blog post content here...

## Example Section

This is an example section. You can:

- Add bullet points
- Include code blocks
- Embed images
- And much more with MDX!

\`\`\`javascript
// Example code block
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`
`

      await fs.writeFile(filePath, postTemplate, 'utf8')

      log.success(`Created blog post: ${filename}`)
      log.info(`File location: ${filePath}`)
      log.info(`Blog URL will be: /blog/${slug}`)

      // Try to open in editor if available
      try {
        const editors = ['cursor', 'code', 'subl', 'atom']
        for (const editor of editors) {
          try {
            await execAsync(`which ${editor}`)
            await execAsync(`${editor} "${filePath}"`)
            log.info(`Opened in ${editor}`)
            break
          } catch {
            // Try next editor
            continue
          }
        }
      } catch {
        log.warning('Could not open in editor. Please open manually.')
      }
    } catch (error) {
      log.error(`Failed to create blog post: ${error.message}`)
      process.exit(1)
    }
  },

  'new-component': async name => {
    try {
      log.title('Creating new component...')

      const validatedName = validateInput(name, 'component name')

      // Convert to PascalCase for component name
      const componentName = validatedName
        .split(/[-_\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('')

      if (!componentName || !/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
        throw new Error('Component name must be valid PascalCase')
      }

      // Ensure components directory exists
      const componentsDir = path.join(process.cwd(), 'src', 'components')
      await ensureDir(componentsDir)

      // Create filename and check if it exists
      const filename = `${componentName.toLowerCase()}.tsx`
      const filePath = path.join(componentsDir, filename)

      if (await fileExists(filePath)) {
        throw new Error(`Component "${componentName}" already exists`)
      }

      // Generate component template
      const componentTemplate = `interface ${componentName}Props {
  // Define your props here
}

export default function ${componentName}({}: ${componentName}Props) {
  return (
    <div>
      <h2>${componentName}</h2>
      <p>Your component content goes here.</p>
    </div>
  )
}`

      await fs.writeFile(filePath, componentTemplate, 'utf8')

      log.success(`Created component: ${componentName}`)
      log.info(`File location: ${filePath}`)
      log.info(
        `Import with: import ${componentName} from '@/components/${componentName.toLowerCase()}'`
      )

      // Try to open in editor if available
      try {
        const editors = ['cursor', 'code', 'subl', 'atom']
        for (const editor of editors) {
          try {
            await execAsync(`which ${editor}`)
            await execAsync(`${editor} "${filePath}"`)
            log.info(`Opened in ${editor}`)
            break
          } catch {
            continue
          }
        }
      } catch {
        log.warning('Could not open in editor. Please open manually.')
      }
    } catch (error) {
      log.error(`Failed to create component: ${error.message}`)
      process.exit(1)
    }
  },

  help: () => {
    log.title('Development Helper Commands')
    console.log()
    console.log('Available commands:')
    console.log(
      '  new-post <title>      Create a new blog post with MDX template'
    )
    console.log(
      '  new-component <name>  Create a new React component with TypeScript'
    )
    console.log('  help                  Show this help message')
    console.log()
    console.log('Examples:')
    console.log('  npm run new:post "My First Blog Post"')
    console.log('  npm run new:component "Button"')
    console.log('  npm run dev:help')
    console.log()
  },
}

// Main execution
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    commands.help()
    return
  }

  const [command, ...params] = args

  if (!commands[command]) {
    log.error(`Unknown command: ${command}`)
    console.log()
    commands.help()
    process.exit(1)
  }

  try {
    await commands[command](...params)
  } catch (error) {
    log.error(`Command failed: ${error.message}`)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    log.error(`Unexpected error: ${error.message}`)
    process.exit(1)
  })
}

module.exports = { commands, log, validateInput, sanitizeFilename }
