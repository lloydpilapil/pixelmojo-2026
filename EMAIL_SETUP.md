# Email Notifications Setup Guide

## Overview

This project uses **Resend** for sending email notifications when qualified leads are captured through the AI chat widget.

## Features

- ✅ Email notifications for qualified leads (score 60-79)
- ✅ High-value urgent alerts for hot leads (score 80-100)
- ✅ Beautiful HTML email templates with lead details
- ✅ Direct links to chat sessions in admin panel
- ✅ Free tier: 3,000 emails/month

## Setup Instructions

### 1. Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address

### 2. Get API Key

1. Log into Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Name it: `Pixelmojo Production`
5. Copy the API key (starts with `re_`)

### 3. Configure Environment Variables

#### Local Development (.env.local)

Replace the placeholder in `.env.local`:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

#### Production (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `pixelmojo-2026`
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_api_key_here`
   - **Environment**: Production, Preview, Development
5. Click **Save**
6. **Redeploy** your application

### 4. Configure Email Domain (Optional but Recommended)

#### Using Default (resend.dev)

- Works immediately, no setup needed
- Emails sent from: `onboarding@resend.dev`
- Subject to Resend branding

#### Using Custom Domain (pixelmojo.io)

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `pixelmojo.io`
4. Add DNS records to your domain registrar:
   ```
   TXT _resend TXT record value from Resend
   MX @ mx1.resend.com (priority 10)
   MX @ mx2.resend.com (priority 20)
   ```
5. Wait for DNS verification (5-30 minutes)
6. Update email addresses in `src/lib/email.ts`:
   ```typescript
   from: 'Pixelmojo Leads <leads@pixelmojo.io>',
   to: ['founders@pixelmojo.io'],
   ```

### 5. Update Recipient Email

Edit `src/lib/email.ts` line 26 and 51:

```typescript
// Change from:
to: ['founders@pixelmojo.io'],

// To your actual email:
to: ['your-email@pixelmojo.io'],
```

## Email Templates

### Regular Lead Notification (Score 60-79)

- **From**: `Pixelmojo Leads <leads@pixelmojo.io>`
- **Subject**: `🔥 New Qualified Lead: [Name] (Score: [X]/100)`
- **Content**: Lead details, chat summary, call-to-action
- **Response Time**: Reply within 24 hours

### High-Value Lead Alert (Score 80-100)

- **From**: `Pixelmojo Alerts <alerts@pixelmojo.io>`
- **Subject**: `🚨 HIGH-VALUE LEAD ALERT: [Name] - [Budget]`
- **Content**: Urgent styling, recommended next steps
- **Response Time**: Reply within 1 hour for best conversion

## Lead Qualification Scoring

The system uses a 0-100 scoring system:

| Factor       | Points | Breakdown                                                  |
| ------------ | ------ | ---------------------------------------------------------- |
| Email        | 20     | Required for any notification                              |
| Name         | 10     | Full name provided                                         |
| Budget       | 30     | Under $5k (5), $5k-$15k (15), $15k-$50k (25), $50k+ (30)   |
| Timeline     | 20     | ASAP (20), 1-3mo (15), 3-6mo (10), 6+mo (5), Exploring (0) |
| Project Type | 10     | Any type selected                                          |
| Company      | 5      | Company name provided                                      |
| Phone        | 5      | Phone number provided                                      |

**Notification Thresholds:**

- **0-59**: No notification (low quality)
- **60-79**: Regular notification (qualified lead)
- **80-100**: Urgent alert (high-value lead)

## Testing Email Notifications

### 1. Start Development Server

```bash
npm run dev
```

### 2. Open Chat Widget

Visit `http://localhost:3000` and click the chat widget

### 3. Trigger a Qualified Lead

Have a conversation with the AI and provide:

- **Email**: your-test-email@example.com
- **Name**: Test User
- **Budget**: $50k+
- **Timeline**: ASAP
- **Project Type**: Any type
- **Company**: Test Company (optional)
- **Phone**: +1234567890 (optional)

This will give you a score of **75-85** and trigger an email notification.

### 4. Check Logs

Look for console output:

```
[Email] Lead notification sent: [email_id]
```

### 5. Check Inbox

- Go to your email inbox
- Look for subject: "🔥 New Qualified Lead..." or "🚨 HIGH-VALUE LEAD ALERT..."
- Verify email template displays correctly
- Click "View Full Conversation" link

## Troubleshooting

### "Failed to send lead notification" Error

- Check `RESEND_API_KEY` is set correctly
- Verify API key is active in Resend dashboard
- Check API key permissions

### Email Not Received

- Check spam/junk folder
- Verify recipient email in `src/lib/email.ts`
- Check Resend dashboard logs for delivery status
- Verify domain DNS records (if using custom domain)

### "Authentication Failed" in Resend

- API key might be invalid or revoked
- Create a new API key in Resend dashboard
- Update environment variables

### Email Shows as "From resend.dev"

- You're using the default domain
- Follow "Configure Email Domain" section above
- Update sender addresses in code

## Monitoring

### Resend Dashboard

- View sent emails: [resend.com/emails](https://resend.com/emails)
- Check delivery status
- View bounce/complaint rates
- Monitor monthly quota (3,000 emails free)

### Application Logs

Email notifications are logged in the chat API:

```bash
# View logs in Vercel
vercel logs

# Or check browser console in dev mode
```

## Free Tier Limits

Resend free tier includes:

- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ Custom domains
- ✅ Full API access
- ❌ Team members
- ❌ Priority support

If you exceed limits, upgrade to:

- **Pro**: $20/month (50,000 emails)
- **Business**: $100/month (250,000 emails)

## Next Steps

After setup is complete:

1. ✅ Test email notifications with a real lead
2. ✅ Verify emails arrive correctly
3. ✅ Check spam score (use [mail-tester.com](https://www.mail-tester.com))
4. ✅ Set up custom domain (optional)
5. ✅ Update recipient email addresses
6. ✅ Monitor Resend dashboard for delivery issues

## Support

- **Resend Docs**: [resend.com/docs](https://resend.com/docs)
- **Resend Support**: support@resend.com
- **Code Location**: `src/lib/email.ts` and `src/app/api/chat/route.ts`
