# Security Checklist - PixelMojo

## Before Every Deployment

### Input Validation ✅

- [ ] All form inputs validated with Zod
- [ ] API route payloads validated with Zod schemas
- [ ] File uploads restricted by type and size
- [ ] URL parameters sanitized and validated
- [ ] Email addresses validated with proper regex
- [ ] Phone numbers validated with proper format

### Output Sanitization ✅

- [ ] User-generated HTML sanitized with DOMPurify
- [ ] Markdown content properly escaped
- [ ] SQL queries use parameterized statements
- [ ] No direct string interpolation in queries
- [ ] XSS protection enabled in all user content displays

### Authentication & Authorization ✅

- [ ] All protected routes check authentication
- [ ] API routes verify user permissions
- [ ] Session tokens stored securely (httpOnly cookies)
- [ ] Password requirements enforced (min 8 chars, uppercase, lowercase, number)
- [ ] Failed login attempts rate limited
- [ ] Password reset tokens expire after 1 hour
- [ ] Multi-factor authentication available (if applicable)

### API Security ✅

- [ ] Rate limiting implemented on all public endpoints
- [ ] CORS properly configured (not wide open)
- [ ] API keys stored in environment variables
- [ ] Webhooks validate signatures
- [ ] No sensitive data in URL parameters
- [ ] Error messages don't leak system info

### Environment & Configuration ✅

- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.example` contains all required keys (no values)
- [ ] No hardcoded API keys or secrets in code
- [ ] Production uses different credentials than dev
- [ ] Database connection strings use SSL
- [ ] Third-party API keys have proper scopes/permissions

### Headers & HTTPS ✅

- [ ] HTTPS enforced in production
- [ ] `Strict-Transport-Security` header set
- [ ] `X-Frame-Options` set to SAMEORIGIN
- [ ] `X-Content-Type-Options` set to nosniff
- [ ] `Referrer-Policy` configured
- [ ] Content Security Policy (CSP) configured
- [ ] Cookies use `secure` and `httpOnly` flags

### Dependencies ✅

- [ ] No critical vulnerabilities in `npm audit`
- [ ] All dependencies up to date
- [ ] Unused dependencies removed
- [ ] No packages from untrusted sources
- [ ] Lock file (`package-lock.json`) committed

### Data Protection ✅

- [ ] Passwords hashed with bcrypt (min 10 rounds)
- [ ] Sensitive data encrypted at rest
- [ ] PII (Personal Identifiable Information) minimized
- [ ] GDPR compliance checked (if applicable)
- [ ] Data retention policy implemented
- [ ] Secure deletion of user data works

### Error Handling ✅

- [ ] Production errors don't expose stack traces
- [ ] Errors logged to monitoring service (Sentry)
- [ ] Database errors don't leak schema info
- [ ] 404 pages don't reveal file structure
- [ ] Generic error messages for failed auth

### File Uploads ✅

- [ ] File size limits enforced
- [ ] File type validation (not just extension)
- [ ] Files scanned for malware (if applicable)
- [ ] Uploaded files stored outside web root
- [ ] Filenames sanitized (no path traversal)
- [ ] Images processed/resized before storing

## Rate Limiting Guide

### Recommended Limits

```typescript
// Public endpoints
const publicLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})
// 10-20 requests per minute

// Authentication endpoints
const authLimiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 500,
})
// 5 requests per 15 minutes

// Contact forms
const contactLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
})
// 3 requests per hour

// Newsletter signup
const newsletterLimiter = rateLimit({
  interval: 24 * 60 * 60 * 1000, // 24 hours
  uniqueTokenPerInterval: 500,
})
// 2 requests per day
```

## Common Vulnerabilities to Check

### ❌ SQL Injection

```typescript
// WRONG
const result = await db.query(`SELECT * FROM users WHERE email = '${email}'`)

// CORRECT
const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
```

### ❌ XSS (Cross-Site Scripting)

```typescript
// WRONG
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// CORRECT
import DOMPurify from 'isomorphic-dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

### ❌ Path Traversal

```typescript
// WRONG
const file = fs.readFileSync(`./uploads/${req.params.filename}`)

// CORRECT
import path from 'path'
const safeFilename = path.basename(req.params.filename)
const file = fs.readFileSync(path.join('./uploads', safeFilename))
```

### ❌ Command Injection

```typescript
// WRONG
exec(`convert ${userFilename} output.jpg`)

// CORRECT
execFile('convert', [userFilename, 'output.jpg'])
```

### ❌ Insecure Deserialization

```typescript
// WRONG
const data = eval(userInput)

// CORRECT
const data = JSON.parse(userInput) // Still validate with Zod after!
```

## Incident Response Plan

### If You Detect a Security Issue:

1. **Immediate Actions**
   - [ ] Take affected service offline if critical
   - [ ] Rotate all API keys and secrets
   - [ ] Invalidate all user sessions
   - [ ] Document what happened

2. **Investigation**
   - [ ] Check logs for extent of breach
   - [ ] Identify affected users
   - [ ] Determine what data was accessed
   - [ ] Find the vulnerability

3. **Fix**
   - [ ] Patch the vulnerability
   - [ ] Deploy fix to production
   - [ ] Verify fix works
   - [ ] Add tests to prevent regression

4. **Communication**
   - [ ] Notify affected users
   - [ ] Update status page
   - [ ] Document lessons learned
   - [ ] Update security procedures

## Security Tools

### Recommended

- **Dependency scanning:** `npm audit` or Snyk
- **SAST:** ESLint with security plugins
- **Error tracking:** Sentry
- **Secrets scanning:** GitGuardian or TruffleHog
- **Penetration testing:** OWASP ZAP

### Run Before Every Deploy

```bash
# Check for vulnerabilities
npm audit

# Type checking
npm run type-check

# Linting
npm run lint

# Build check
npm run build
```

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Zod Documentation](https://zod.dev/)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
