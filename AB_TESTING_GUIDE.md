# A/B Testing with Vercel Edge Config

Complete guide to running A/B tests using Vercel Edge Config and Edge Middleware.

## 🎯 What You Have

- **Edge Middleware** - Assigns users to variants server-side
- **Consistent Bucketing** - Same user always gets same variant
- **Client Hooks** - React hooks to read variants
- **Analytics Integration** - Tracks experiments in GA4 + Vercel Analytics
- **No Client Bloat** - Zero JavaScript overhead (server-side only)

## 📋 Table of Contents

1. [Setup Edge Config on Vercel](#1-setup-edge-config-on-vercel)
2. [Running Your First Experiment](#2-running-your-first-experiment)
3. [Usage Examples](#3-usage-examples)
4. [Analyzing Results](#4-analyzing-results)
5. [Best Practices](#5-best-practices)

---

## 1. Setup Edge Config on Vercel

### Step 1: Create Edge Config (One-time setup)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** → **Edge Config**
3. Click **Create Edge Config**
4. Name it: `experiments` (or any name)
5. Click **Create**

### Step 2: Add to Your Project

1. In Edge Config page, click **Connect to Project**
2. Select `pixelmojo-2026`
3. Click **Connect**

### Step 3: Add Environment Variable

Vercel automatically adds `EDGE_CONFIG` to your project. Verify:

```bash
# Check in Vercel Dashboard
Settings → Environment Variables → EDGE_CONFIG
```

Or pull locally:

```bash
npx vercel env pull
```

### Step 4: Configure Experiments

1. Go to your Edge Config in Vercel Dashboard
2. Click **Edit Items**
3. Add new item:
   - **Key:** `experiments`
   - **Value:** (paste this JSON)

```json
{
  "pricing_page_layout": {
    "id": "pricing_page_layout",
    "name": "Pricing Page Layout Test",
    "enabled": true,
    "variants": [
      { "id": "control", "name": "Original Layout", "weight": 50 },
      { "id": "variant_a", "name": "Simplified Layout", "weight": 50 }
    ]
  },
  "hero_cta_text": {
    "id": "hero_cta_text",
    "name": "Hero CTA Button Text",
    "enabled": true,
    "variants": [
      { "id": "control", "name": "Get Started", "weight": 33 },
      { "id": "variant_a", "name": "Start Free Trial", "weight": 33 },
      { "id": "variant_b", "name": "Book a Demo", "weight": 34 }
    ]
  }
}
```

4. Click **Save**

**Note:** If you don't set up Edge Config, the system falls back to experiments defined in `src/middleware.ts`. This is fine for development!

---

## 2. Running Your First Experiment

### Example: Test Different CTA Button Text on Homepage

**Goal:** See which CTA converts better

#### Step 1: Define Experiment (Already done in Edge Config above)

```json
{
  "hero_cta_text": {
    "id": "hero_cta_text",
    "enabled": true,
    "variants": [
      { "id": "control", "name": "Get Started", "weight": 50 },
      { "id": "variant_a", "name": "Start Free Trial", "weight": 50 }
    ]
  }
}
```

#### Step 2: Use in Your Component

```tsx
'use client'

import { useExperimentWithDefault } from '@/hooks/useExperiment'
import { Button } from '@/components/ui/button'

export function HeroCTA() {
  const variant = useExperimentWithDefault('hero_cta_text', 'control')

  const buttonText = {
    control: 'Get Started',
    variant_a: 'Start Free Trial',
  }[variant]

  return (
    <Button
      onClick={() => {
        // Your CTA action
        window.location.href = '/contact-us'
      }}
    >
      {buttonText}
    </Button>
  )
}
```

#### Step 3: Deploy & Monitor

```bash
git add .
git commit -m "feat(ab-test): test hero cta button text"
git push
```

#### Step 4: Check Analytics

**Google Analytics 4:**

1. Go to GA4 → Events
2. Look for `experiment_exposure` events
3. Filter by `experiment_id: hero_cta_text`
4. Compare conversion rates between variants

**Vercel Analytics:**

1. Go to Vercel Dashboard → Analytics
2. Look for custom events
3. Filter by experiment data

---

## 3. Usage Examples

### Example 1: Simple A/B Test (Boolean)

Test if new design performs better:

```tsx
'use client'

import { useExperimentBoolean } from '@/hooks/useExperiment'

export function PricingPage() {
  const showNewDesign = useExperimentBoolean('pricing_page_layout')

  return showNewDesign ? <NewPricingLayout /> : <OldPricingLayout />
}
```

### Example 2: Multi-Variant Test (A/B/C)

Test 3 different headlines:

```tsx
'use client'

import { useExperimentWithDefault } from '@/hooks/useExperiment'

export function Hero() {
  const variant = useExperimentWithDefault('hero_headline', 'control')

  const headlines = {
    control: 'Ship Revenue in 90 Days',
    variant_a: 'Build Products That Actually Sell',
    variant_b: 'From Idea to Profit in 3 Months',
  }

  return <h1>{headlines[variant]}</h1>
}
```

### Example 3: Server Component (Read-only)

For Server Components, use `getVariant`:

```tsx
import { getVariant } from '@/lib/ab-testing'

export default async function PricingPage() {
  const variant = await getVariant('pricing_page_layout')

  return variant === 'variant_a' ? <NewLayout /> : <OldLayout />
}
```

### Example 4: Conditional Features

Show/hide features based on experiment:

```tsx
'use client'

import { useExperiment } from '@/hooks/useExperiment'

export function ContactForm() {
  const variant = useExperiment('contact_form_fields')

  const showCompanyField = variant !== 'variant_a' // Minimal form skips company

  return (
    <form>
      <input name='name' required />
      <input name='email' required />
      {showCompanyField && <input name='company' />}
      <textarea name='message' required />
    </form>
  )
}
```

---

## 4. Analyzing Results

### Track Conversions

Add tracking to your conversion events:

```tsx
'use client'

import { useExperiment } from '@/hooks/useExperiment'

export function ContactForm() {
  const variant = useExperiment('contact_form_fields')

  const handleSubmit = async e => {
    e.preventDefault()

    // Send form data
    await submitForm(formData)

    // Track conversion with variant
    if (window.gtag) {
      window.gtag('event', 'form_submission', {
        experiment_id: 'contact_form_fields',
        variant_id: variant,
        value: 1, // Conversion value
      })
    }

    // Or use Vercel Analytics
    if (window.va) {
      window.va('event', {
        name: 'form_submission',
        data: {
          experiment_id: 'contact_form_fields',
          variant_id: variant,
        },
      })
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### Calculate Statistical Significance

Use this formula to determine if results are significant:

**Minimum Sample Size:** ~1000 conversions per variant
**Minimum Runtime:** 7-14 days
**Confidence Level:** 95% (industry standard)

**Tools:**

- [AB Test Calculator](https://abtestguide.com/calc/) - Free calculator
- [Optimizely Stats Engine](https://www.optimizely.com/sample-size-calculator/) - Sample size calculator

### When to Stop a Test

Stop when:

- ✅ Statistical significance reached (95%+)
- ✅ Minimum 7 days runtime
- ✅ Minimum 1000 conversions per variant
- ✅ Winner is clear (>10% lift)

Don't stop when:

- ❌ Results look good early (might be noise)
- ❌ Only 2-3 days of data
- ❌ Small sample size (<500 per variant)

---

## 5. Best Practices

### ✅ DO:

1. **Test One Thing at a Time**

   ```tsx
   // ✅ Good - Test ONE variable
   const buttonText =
     variant === 'variant_a' ? 'Start Free Trial' : 'Get Started'

   // ❌ Bad - Multiple changes
   const buttonText =
     variant === 'variant_a' ? 'Start Free Trial' : 'Get Started'
   const buttonColor = variant === 'variant_a' ? 'blue' : 'green'
   ```

2. **Run Tests for Sufficient Time**
   - Minimum: 7 days
   - Recommended: 14 days
   - Captures weekly patterns (weekday vs weekend)

3. **Use Consistent User Bucketing**
   - Our middleware uses IP-based hashing
   - Same user always sees same variant
   - No flickering between variants

4. **Track Both Exposure and Conversion**

   ```tsx
   // Track when user sees the variant
   trackExperiment(experimentId, variant)

   // Track when user converts
   gtag('event', 'conversion', { experiment_id, variant_id })
   ```

5. **Clean Up Finished Experiments**
   ```tsx
   // Remove experiment code after winner is chosen
   // Don't let dead code accumulate
   ```

### ❌ DON'T:

1. **Don't Stop Tests Early**
   - Wait for statistical significance
   - Avoid "peeking" at results daily

2. **Don't Test Too Many Variants**
   - A/B test: 2 variants (good)
   - A/B/C test: 3 variants (okay)
   - A/B/C/D/E test: 5+ variants (bad - splits traffic too much)

3. **Don't Change Experiment Mid-Flight**
   - Once running, don't modify variants
   - Invalidates existing data

4. **Don't Ignore Mobile vs Desktop**
   - Segment results by device type
   - Mobile users behave differently

5. **Don't Forget to Remove Code**

   ```tsx
   // ❌ Bad - Keep old experiment code forever
   const variant = useExperiment('old_test_from_2023')

   // ✅ Good - Remove after test completes
   // Just use the winning variant
   ```

---

## 📊 Real-World Example: Pricing Page Test

Let's run a complete pricing page test:

### 1. Hypothesis

"Showing monthly pricing first will increase conversions by 15%"

### 2. Create Experiment

In Vercel Edge Config, add:

```json
{
  "pricing_default_plan": {
    "id": "pricing_default_plan",
    "name": "Default Pricing Plan Display",
    "enabled": true,
    "variants": [
      { "id": "control", "name": "Show Annual First", "weight": 50 },
      { "id": "monthly_first", "name": "Show Monthly First", "weight": 50 }
    ]
  }
}
```

### 3. Implement in Code

```tsx
'use client'

import { useState } from 'react'
import { useExperimentWithDefault } from '@/hooks/useExperiment'

export function PricingPage() {
  const variant = useExperimentWithDefault('pricing_default_plan', 'control')

  // Set default based on variant
  const [billingCycle, setBillingCycle] = useState(
    variant === 'monthly_first' ? 'monthly' : 'annual'
  )

  return (
    <div>
      <BillingToggle value={billingCycle} onChange={setBillingCycle} />
      <PricingCards billingCycle={billingCycle} />
    </div>
  )
}
```

### 4. Track Conversions

```tsx
const handleSelectPlan = plan => {
  const variant = useExperiment('pricing_default_plan')

  // Track in GA4
  if (window.gtag) {
    window.gtag('event', 'select_plan', {
      experiment_id: 'pricing_default_plan',
      variant_id: variant,
      plan_name: plan,
      value: plan.price,
    })
  }

  // Proceed to checkout
  router.push(`/checkout?plan=${plan.id}`)
}
```

### 5. Analyze After 14 Days

Check conversion rates:

- **Control (Annual First):** 3.2% conversion
- **Variant (Monthly First):** 4.1% conversion
- **Lift:** +28% (statistically significant!)

### 6. Implement Winner

```tsx
// Remove experiment code, use winning variant
export function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly') // Winner!

  return (
    <div>
      <BillingToggle value={billingCycle} onChange={setBillingCycle} />
      <PricingCards billingCycle={billingCycle} />
    </div>
  )
}
```

---

## 🚀 Quick Start Checklist

- [ ] Edge Config created on Vercel
- [ ] Edge Config connected to project
- [ ] Environment variable `EDGE_CONFIG` exists
- [ ] Experiment added to Edge Config (or using fallback)
- [ ] Middleware deployed (`src/middleware.ts`)
- [ ] Component using `useExperiment` hook
- [ ] Analytics tracking implemented
- [ ] Test running for 7+ days
- [ ] Results analyzed
- [ ] Winner implemented, experiment removed

---

## 🆘 Troubleshooting

### "Variant always returns null"

**Fix:** Make sure middleware is deployed. Check:

```bash
# Check if middleware file exists
ls src/middleware.ts

# Check Vercel deployment logs
```

### "All users see same variant"

**Fix:** Weights might be wrong. Check Edge Config:

```json
// ✅ Correct - weights sum to 100
{ "id": "control", "weight": 50 },
{ "id": "variant_a", "weight": 50 }

// ❌ Wrong - weights sum to 200
{ "id": "control", "weight": 100 },
{ "id": "variant_a", "weight": 100 }
```

### "Experiment not tracking in GA4"

**Fix:** Make sure GTM consent is granted:

```tsx
// Check if gtag exists
if (window.gtag) {
  window.gtag('event', 'experiment_exposure', {...})
}
```

---

## 📚 Additional Resources

- [Vercel Edge Config Docs](https://vercel.com/docs/storage/edge-config)
- [A/B Testing Best Practices](https://www.optimizely.com/optimization-glossary/ab-testing/)
- [Statistical Significance Calculator](https://abtestguide.com/calc/)
- [Google Analytics 4 Events](https://developers.google.com/analytics/devguides/collection/ga4/events)

---

**Questions?** Check out `src/lib/ab-testing.ts`, `src/middleware.ts`, and `src/hooks/useExperiment.ts` for implementation details.
