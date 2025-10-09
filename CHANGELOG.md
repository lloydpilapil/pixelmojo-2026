# Changelog

All notable changes to PixelMojo website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2025-10-09

### 🎨 Added

- **Chat Widget UX 2.0**: Progressive disclosure pattern with time-based visibility
  - Pulsing badge notifications to draw attention
  - Context-aware timing (1s for high-intent pages, 2s for others)
  - Mobile-first approach (immediate visibility on mobile)
  - Hover tooltips with "Need help? 👋" message
  - Smart visibility: No longer requires scrolling to see chat
- **Services Loading/Error States**: Professional skeleton loaders and branded error pages
  - `src/app/services/loading.tsx` - Animated skeleton UI
  - `src/app/services/error.tsx` - Branded error page with Sentry integration
- **Chat Context High-Intent Tracking**: Added `highIntent` flag to trigger rules
  - Pricing, contact, and services pages marked as high-intent
  - Faster engagement on pages where users are ready to convert

### 🔒 Security

- **Enhanced Security Headers**: 9 comprehensive production-ready headers
  - `X-DNS-Prefetch-Control` - Enable DNS prefetching
  - `Strict-Transport-Security` - 2-year HSTS with preload
  - `X-Content-Type-Options` - Prevent MIME sniffing
  - `Referrer-Policy` - Privacy-focused referrer handling
  - `Permissions-Policy` - Block camera, microphone, geolocation, FLoC
  - `Cross-Origin-Resource-Policy` - Prevent resource leakage
  - Enhanced existing CSP, COOP, and X-Frame-Options

### ⚡ Performance

- **Client Components Audit**: Completed comprehensive audit
  - Confirmed 55% client component ratio is optimal for interactive portfolio
  - Identified 26/29 components legitimately need 'use client'
  - Only 3 components can be optimized (CTACard, ServicesPreview, OurApproach)

### 🐛 Fixed

- **Chat Widget Visibility Bug**: Fixed disappearing chat widget issue
  - Changed from context-dependent to mount-dependent effect
  - Ensures widget always appears regardless of context loading state

### 📝 Documentation

- Added `CHAT_WIDGET_IMPROVEMENTS.md` - Complete implementation guide
- Added `CHAT_WIDGET_UX_RECOMMENDATION.md` - Industry best practices analysis
- Updated implementation summaries with v1.4.0 changes

### 🔧 Technical Improvements

- TypeScript: Zero errors, full type safety maintained
- Build: All optimizations passing
- Rate limiting: Working correctly (3 requests/hour for contact form)
- Input validation: Zod schemas validating properly

---

## [1.3.0] - 2025-10-09 (Previous Release)

### 🎨 Added

- **Next.js Special Files**: Loading and error boundaries
  - `src/app/loading.tsx` - Root loading state
  - `src/app/error.tsx` - Root error boundary with Sentry
  - `src/app/blogs/loading.tsx` - Blog skeleton loader
  - `src/app/blogs/error.tsx` - Blog error page
  - `src/app/projects/loading.tsx` - Projects skeleton loader
  - `src/app/projects/error.tsx` - Projects error page

### 🔒 Security

- **Security Utilities**: Created comprehensive security layer
  - `src/lib/sanitize.ts` - DOMPurify wrapper for XSS protection
  - `src/lib/rate-limit.ts` - LRU cache-based rate limiter
  - `src/lib/errors.ts` - Custom error classes for consistent API responses
- **Contact API Refactor**: Complete security overhaul
  - Zod schema validation (min/max lengths, email validation)
  - Rate limiting (3 submissions per hour per IP)
  - DOMPurify sanitization on all text inputs
  - Structured error responses with custom error classes

### 📦 Dependencies

- Added `isomorphic-dompurify@2.28.0` - HTML sanitization
- Added `lru-cache@11.2.2` - Rate limiting cache

### 📝 Documentation

- Created `CODING_STANDARDS.md` - Enhanced with 5 new sections
- Created `SECURITY_CHECKLIST.md` - Pre-deployment security guide
- Created `ERROR_HANDLING_GUIDE.md` - Next.js 15 error patterns
- Created `AUDIT_REPORT.md` - Complete codebase audit
- Created `IMPLEMENTATION_SUMMARY.md` - v1.3.0 changes summary
- Created `CLIENT_COMPONENTS_AUDIT.md` - Component optimization analysis

### 🐛 Fixed

- TypeScript error: Removed unused `ContactRequest` type
- Zod validation: Fixed fieldErrors type incompatibility

---

## [1.2.0] - Previous versions

_(Documentation for earlier versions will be added as needed)_

---

## Version Numbering Guide

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (x.0.0): Breaking changes that affect existing functionality
- **MINOR** (0.x.0): New features and enhancements (backward compatible)
- **PATCH** (0.0.x): Bug fixes and minor improvements (backward compatible)

### When to Bump Versions

- **MAJOR**: Redesign, major architecture changes, breaking API changes
- **MINOR**: New features, new pages, significant UX improvements, new integrations
- **PATCH**: Bug fixes, typo corrections, minor style tweaks, dependency updates

---

## Unreleased (Next Version Ideas)

### Planned Features

- [ ] Refactor CTACard to Server Component (~2KB bundle savings)
- [ ] Server Actions for contact form (better form handling)
- [ ] Dynamic imports for heavy components
- [ ] A/B testing for chat widget timing
- [ ] Advanced chat badge animations
- [ ] Personalized chat messages for return visitors

### Under Consideration

- [ ] Bundle size monitoring dashboard
- [ ] Automated performance regression testing
- [ ] Image optimization audit
- [ ] Progressive Web App (PWA) features

---

## Links

- [GitHub Repository](https://github.com/pixelmojo/pixelmojo-2026) _(if applicable)_
- [Production Site](https://www.pixelmojo.io)
- [Staging Environment](https://staging.pixelmojo.io) _(if applicable)_
