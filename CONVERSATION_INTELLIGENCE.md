# Conversation Intelligence System

## Overview

An AI-powered conversation analysis system that detects serious clients and strategically guides them to reveal budget and timeline information.

## How It Works

### 1. Engagement Scoring (0-100 points)

**Base Scoring:**

- Message count: 5 points per message (max 25)

**High-Intent Signal Detection:**

- Active need ("need", "want", "require"): +10 points
- Budget awareness ("how much", "cost", "pricing"): +15 points
- Timeline concern ("when", "urgent", "ASAP"): +15 points
- Specific services ("website", "app", "branding"): +10 points
- Solution validation ("can you", "do you"): +10 points
- Positive engagement ("yes", "sounds good"): +5 points
- Budget amount mentioned ($5,000, $30,000): +20 points
- Meeting interest ("call", "schedule", "book"): +20 points

### 2. Strategic Guidance Rules

The AI automatically detects patterns and provides guidance:

#### **High Engagement (40+) + Missing Budget**

```
🎯 HIGH_PRIORITY: Extract budget now
AI asks: "To give you the most accurate recommendation, what budget
range are you working with? (Ballpark is fine)"
```

#### **Has Budget (30+) + Missing Timeline**

```
🎯 HIGH_PRIORITY: Extract timeline now
AI asks: "What's driving your timeline? Are you looking to launch
ASAP, or is this more of a 3-6 month planning horizon?"
```

#### **Has Timeline (30+) + Missing Budget**

```
🎯 HIGH_PRIORITY: Extract budget with urgency frame
AI says: "Given your timeline, I want to make sure we're aligned
on investment. Most clients in your situation invest between
$15K-$50K. Does that range work for you?"
```

#### **Multiple Messages (3+) + Missing Email**

```
🎯 MEDIUM_PRIORITY: Get email
AI offers: "I'd love to send you our portfolio and case studies.
What's your email?"
```

#### **Low Engagement (<30) + Early Stage**

```
🎯 BUILD_INTEREST: Focus on pain points first
Don't ask for info yet - build trust and demonstrate value
```

## Real Example Test Results

### Test 1: Tire Kicker

```
Messages: "Hi", "What do you do?"
Score: 20/100
Guidance: BUILD_INTEREST - Don't push for info yet
```

### Test 2: High-Intent Client (Missing Budget)

```
Messages:
- "I need a website and mobile app for my startup"
- "We need to launch ASAP, like in 2-3 months"
- "Yes, sounds good. What do you recommend?"

Score: 65/100
Detected: Active need, Timeline concern, Specific services, Positive engagement
Guidance: HIGH_PRIORITY - Extract budget now ✅
```

### Test 3: Budget Known (Missing Timeline)

```
Messages:
- "How much does branding cost?"
- "That works for me. I have about $30,000 budget"
- "Great, what are the next steps?"

Score: 60/100
Detected: Budget awareness, Budget amount mentioned, Positive engagement
Guidance: HIGH_PRIORITY - Extract timeline now ✅
```

### Test 4: Sonny Example (Fully Qualified)

```
Messages:
- "i need support website, branding, mobile app"
- "yes and how much is the cost of these"
- "yes pls email me im open to budget $30,000"

Score: 75/100
All Info Captured: ✅ email, budget, timeline, project_type
Guidance: NONE - Lead fully qualified! 🚨
```

## Implementation

### Location

- File: `src/app/api/chat/route.ts`
- Function: `analyzeConversationPatterns()`
- Integration: Automatically runs before each AI response

### How It Works in Practice

1. **User sends message** → System analyzes entire conversation history
2. **Pattern detection** → Calculates engagement score + detects signals
3. **Strategic guidance** → Injects priority instructions into AI prompt
4. **AI responds** → Naturally weaves budget/timeline questions into response
5. **Lead capture** → Saves info + triggers email if qualified (60+)

### Console Logging

Check server logs to see analysis:

```javascript
[Chat API] Conversation Analysis: {
  engagementScore: 65,
  seriousnessSignals: ['Active need stated', 'Timeline concern', ...],
  missingInfo: ['budget'],
  guidance: 'HIGH_PRIORITY: Extract budget now'
}
```

## Benefits

✅ **Automatic Lead Qualification** - No manual scoring needed
✅ **Natural Conversations** - AI smoothly extracts info without being pushy
✅ **Prioritized Follow-up** - High-intent leads get immediate attention
✅ **Higher Conversion** - Strategic guidance increases budget/timeline capture rate
✅ **Smart Timing** - Knows when to build interest vs. ask for info

## Scoring Thresholds

- **0-29**: Tire kicker - Build interest first
- **30-39**: Engaged - Start extracting info
- **40-59**: High intent - Prioritize missing critical info
- **60-79**: Qualified - Trigger email notification ⭐
- **80-100**: High-value - Trigger urgent alert 🚨

## Integration with Lead Scoring

The conversation analysis feeds into the overall lead qualification system:

1. **Engagement Score** guides conversation strategy
2. **Extracted Info** (budget, timeline) feeds into qualification score
3. **Qualification Score** (60+) triggers email notifications
4. **High-value Leads** (80+) get urgent alerts

Result: Serious clients are automatically identified, guided, and converted into qualified leads with full information.
