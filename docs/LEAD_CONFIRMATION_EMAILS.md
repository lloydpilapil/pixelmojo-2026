# Lead Confirmation Email System

## Overview

Automatic confirmation emails sent to leads immediately after they provide their email in the chat. This fixes the critical issue where users expected to receive emails but never got them.

## The Problem

**Before:** When users gave their email in chat (e.g., "send me email lloyd@lloydpilapil.com"), the AI said "I'll send you the details" but **NO email was actually sent to the user**. Only the founder received a notification.

**After:** Users receive an immediate confirmation email with portfolio, pricing, and next steps based on their qualification score.

---

## How It Works

### Flow

```
User gives email in chat
↓
Lead saved to database + Score calculated
↓
TWO emails sent in parallel:
├─ Founder Notification (if score ≥ 60) → lloyd@pixelmojo.io
└─ Lead Confirmation (ALWAYS) → user's email
```

### Three Email Templates Based on Score

#### 1. High-Value Leads (Score ≥ 80)

**Template:** Priority response with urgent tone

- Subject: "Lloyd, let's talk about your [project] 🚀"
- Content:
  - Personalized greeting with their name
  - "Priority Response" callout box
  - Project details captured
  - Two CTAs: Book call (primary) or Reply
  - Philippine startup discount mention (if high budget)
  - Portfolio highlights
- Tone: Enthusiastic, urgent, high-touch

#### 2. Qualified Leads (Score 60-79)

**Template:** Professional portfolio & pricing overview

- Subject: "Thanks for your interest - Portfolio & Pricing Inside 📊"
- Content:
  - Service cards with pricing
  - Recent work highlights
  - Recommended service based on budget
  - Two CTAs: View portfolio + Book call
  - Next steps outlined
- Tone: Professional, informative, helpful

#### 3. Standard Leads (Score < 60)

**Template:** Nurture and educate

- Subject: "Thanks for your interest - Let's explore if Pixelmojo is right for you"
- Content:
  - About Pixelmojo overview
  - Typical investment ranges
  - Links to portfolio and pricing
  - Single CTA: Book discovery call
  - No pressure approach
- Tone: Friendly, educational, low-pressure

---

## Email Content Personalization

### Dynamic Elements

All templates include:

- **Name:** Uses first name if provided, otherwise "there"
- **Project Type:** Referenced throughout ("your healthcare AI project")
- **Budget Range:** Drives service recommendations
- **Timeline:** Mentioned if urgent (ASAP)
- **Industry:** Incorporated into examples

### Smart Recommendations

Based on budget range, we recommend:

- **$50k+ or $15k-$50k:** AI Product Development (full MVP)
- **$5k-$15k:** 60-Day Conversion Sprint or Revenue-First Design
- **Under $5k:** MVP Validation or 60-Day Sprint to start

---

## Technical Implementation

### Files

1. **`src/lib/lead-confirmation-emails.ts`** (530 lines)
   - `sendLeadConfirmationEmail()` - Main sending function
   - `getHighValueConfirmationEmail()` - Template for score ≥ 80
   - `getQualifiedConfirmationEmail()` - Template for score 60-79
   - `getStandardConfirmationEmail()` - Template for score < 60
   - `getRecommendedService()` - Budget-based recommendations

2. **`src/app/api/chat/route.ts`** (updated)
   - Added import for `sendLeadConfirmationEmail`
   - Sends confirmation email immediately after lead is saved
   - Runs in parallel with founder notification

### Email Sending Logic

```typescript
// ALWAYS send confirmation email to the lead if they provided email
if (leadData.email && isNewLead) {
  console.log('[Chat API] Sending confirmation email to lead...')

  try {
    const confirmationResult = await sendLeadConfirmationEmail({
      name: leadData.name || 'there',
      email: leadData.email,
      projectType: leadData.project_type,
      budgetRange: leadData.budget_range,
      timeline: leadData.timeline,
      industry: leadData.industry,
      qualificationScore,
      sessionId,
    })
    console.log('[Chat API] Lead confirmation result:', confirmationResult)
  } catch (confirmError) {
    console.error('[Chat API] Lead confirmation failed:', confirmError)
  }
}
```

---

## Email Examples

### Example 1: High-Value Lead

**Scenario:** Lloyd gives email, wants healthcare AI product, budget $15k-$50k, timeline ASAP
**Score:** 100/100

**Subject:** Lloyd, let's talk about your healthcare AI product development 🚀

**Key Elements:**

- ⚡ "Priority Response" highlight box
- 📋 Project details captured (Healthcare AI, $15k-$50k, ASAP)
- 💰 Philippine startup discount callout
- 📅 Primary CTA: Book discovery call
- 💬 Secondary: Reply to email
- ⏱️ "I respond within 2 hours" in PS

### Example 2: Qualified Lead

**Scenario:** User interested in branding, budget $5k-$15k, timeline 1-3 months
**Score:** 65/100

**Subject:** Thanks for your interest, [Name] - Portfolio & Pricing Inside 📊

**Key Elements:**

- 🚀 Service cards with pricing (MVP, Sprint, Design)
- 📊 Recent work highlights
- 💡 Recommended service based on budget
- 🔗 View portfolio + Book call CTAs
- 📋 Clear next steps

### Example 3: Standard Lead

**Scenario:** User exploring options, no budget mentioned, just researching
**Score:** 35/100

**Subject:** Thanks for your interest - Let's explore if Pixelmojo is right for you

**Key Elements:**

- ℹ️ About Pixelmojo overview
- 💵 Typical investment ranges ($3K-$50K)
- 🔗 Links to portfolio and pricing pages
- 📞 Book discovery call (low-pressure)
- 🤝 "No pressure - happy to chat" tone

---

## Resend Configuration

### From Address

```
Lloyd from Pixelmojo <lloyd@mg.pixelmojo.com>
```

### Reply-To

```
lloyd@pixelmojo.io
```

### Email Template Features

- HTML with inline CSS (Gmail-compatible)
- Mobile-responsive single column
- Brand colors: #005493 (blue), #3CC29E (teal)
- Clean, professional design
- Clear CTAs with button styling

---

## Testing

### Test Scenarios

#### Scenario 1: High-Value Lead

```typescript
// Create test lead in chat
User: "im building healthcare ai from scratch what can u do for me"
AI: [responds]
User: "how about the budget"
AI: [quotes pricing]
User: "i think im good with this pls send me email lloyd@lloydpilapil.com this is urgent and if u have discount i need to see it too looking forward!"

// Expected:
// - Lead created with score 100
// - Founder gets HIGH-VALUE ALERT email
// - User gets HIGH-VALUE CONFIRMATION email
```

#### Scenario 2: Qualified Lead

```typescript
// Create test lead
User: "need branding for startup"
AI: [responds]
User: "budget around $10k, timeline 2 months"
AI: [quotes pricing]
User: "sounds good, email me: user@example.com"

// Expected:
// - Lead created with score ~65
// - Founder gets QUALIFIED NOTIFICATION email
// - User gets QUALIFIED CONFIRMATION email
```

#### Scenario 3: Standard Lead

```typescript
// Create test lead
User: 'just looking around, what do you do?'
AI: [responds]
User: 'interesting, email me updates: explorer@example.com'

// Expected:
// - Lead created with score ~30
// - Founder gets NO email (score < 60)
// - User gets STANDARD CONFIRMATION email
```

### Check Emails Sent

```bash
# Check all leads
npx tsx scripts/check-all-leads.ts

# Check specific lead
npx tsx scripts/check-lead.ts

# Check Resend dashboard
# Visit: https://resend.com/emails
# Search for lead email address
```

---

## Monitoring

### Success Metrics

| Metric        | Target | How to Track                  |
| ------------- | ------ | ----------------------------- |
| Delivery Rate | 98%+   | Resend dashboard              |
| Open Rate     | 40-60% | Resend analytics              |
| Click Rate    | 15-25% | Track CTA clicks              |
| Response Rate | 10-15% | Replies to lloyd@pixelmojo.io |
| Booking Rate  | 5-10%  | Calendly bookings from emails |

### Logs to Monitor

```bash
# Watch for confirmation emails in dev server logs
tail -f logs/dev.log | grep "Lead confirmation"

# Look for these patterns:
"[Chat API] Sending confirmation email to lead..."
"[Chat API] Lead confirmation result: { success: true }"
"[LeadConfirmation] Email sent successfully: re_..."
```

---

## Troubleshooting

### Email Not Received by User

**Symptoms:** User says they didn't get email, but logs show success

**Possible Causes:**

1. **Spam folder** - Check user's spam/junk folder
2. **Email typo** - User typed wrong email in chat
3. **Deliverability issue** - Domain blocked by user's email provider
4. **Resend quota** - Check if you hit sending limits

**Debug Steps:**

```bash
# 1. Check if email was actually sent
npx tsx scripts/check-all-leads.ts

# 2. Check Resend dashboard
# Visit: https://resend.com/emails
# Search for user's email
# Check delivery status

# 3. Check dev server logs
grep "Lead confirmation" logs/dev.log

# 4. Try manual resend
curl -X POST http://localhost:3000/api/leads/follow-up \
  -H "Content-Type: application/json" \
  -d '{"leadId": "uuid-here"}'
```

### Wrong Template Sent

**Symptoms:** User received standard email but should have gotten high-value

**Cause:** Lead score calculation issue

**Fix:**

```bash
# Check lead score
npx tsx scripts/check-lead.ts

# Verify scoring logic in src/app/api/chat/route.ts:calculateQualificationScore()
# Score breakdown:
# - Email: 20 points
# - Name: 10 points
# - Budget: 5-35 points (based on range)
# - Timeline: 6-25 points (ASAP = 25)
# - Project type: 10 points
# - Urgency signals: +10 bonus
# - Budget alignment: +10 bonus
```

### Email Formatting Issues

**Symptoms:** Email looks broken in Gmail/Outlook

**Cause:** Complex CSS not supported by email clients

**Fix:**

- Only use inline styles
- Test in Gmail, Outlook, Apple Mail
- Use simple table-based layouts
- Avoid flexbox, grid, complex positioning

---

## Future Enhancements

### Phase 2 (2-4 weeks)

- [ ] Add portfolio PDF attachment
- [ ] Include case study links relevant to industry
- [ ] A/B test subject lines
- [ ] Track open/click rates in database

### Phase 3 (1-2 months)

- [ ] Multi-touch email sequence (follow-up after 24h, 72h, 7days)
- [ ] Personalized video messages for high-value leads
- [ ] Dynamic pricing calculator embedded in email
- [ ] Calendar integration to suggest available times

### Phase 4 (3+ months)

- [ ] AI-generated email variations per industry
- [ ] Smart send time optimization (based on timezone)
- [ ] Automated lead nurture campaigns
- [ ] Integration with CRM (HubSpot/Salesforce)

---

## Related Files

- `src/lib/lead-confirmation-emails.ts` - Email templates and sending logic
- `src/app/api/chat/route.ts` - Chat API with confirmation integration
- `src/lib/email.ts` - Founder notification emails
- `scripts/check-all-leads.ts` - Lead debugging tool

---

## Contact

For questions or issues:

- **Developer:** Lloyd Pilapil
- **Email:** lloyd@pixelmojo.io
- **Test:** Create test lead in chat widget at http://localhost:3000
