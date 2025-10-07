# 🎯 Chatbot Negotiation Intelligence Guide

## Overview

Your chatbot now combines **Dan Ariely's 3-tier pricing psychology** with **Chris Voss's "Never Split the Difference" negotiation principles** to create a consultative, empathetic sales approach.

---

## 🧠 The Two Frameworks Working Together

### **Ariely's Pricing Psychology** (Structure)

- 3-tier pricing (Starter/Growth/Scale)
- Growth tier anchored as "Most Popular"
- Value framing: "Only $X more but includes..."
- Decoy effect makes Growth look like best value

### **Voss's Negotiation Tactics** (Conversation)

- Tactical empathy: Label concerns before they raise them
- Calibrated questions: "What" and "How" questions
- Mirroring: Repeat last 2-3 words
- Accusation audit: Address objections proactively
- Loss aversion: Focus on what they'll lose by NOT acting

---

## 💬 Example Conversations

### **Scenario 1: Budget-Conscious Lead**

❌ **OLD APPROACH (Pushy):**

```
User: "How much for a landing page?"
Bot: "Our landing pages start at $1,995. Want to book a call?"
```

✅ **NEW APPROACH (Voss Principles):**

```
User: "How much for a landing page?"

Bot: "Great question! Before I share pricing, can I ask—what are you hoping
this landing page will accomplish for you? (CALIBRATED QUESTION)

Are you looking to capture leads, drive purchases, or validate an idea?"

User: "We need to capture leads for our SaaS product."

Bot: "Capture leads... (MIRRORING) So it sounds like conversion rate is
the key metric here. What would a 20% lift in conversions mean for your
business? (CALIBRATED QUESTION + LOSS AVERSION)

For lead-focused landing pages, I'd recommend our **Conversion Asset System
(Growth tier)** at **$3,995-$5,995** ⭐ (most popular). Only $2K more than
Starter but includes conversion-focused copywriting, analytics setup, and
2 rounds of revisions. (ARIELY VALUE FRAMING)

You're probably thinking that's more than a Fiverr freelancer... (ACCUSATION
AUDIT) The difference is we're focused on revenue outcomes, not just pixels.
Timeline: 2-3 weeks.

What's your target launch timeline?"
```

---

### **Scenario 2: "Too Expensive" Objection**

❌ **OLD APPROACH (Discounting):**

```
User: "That seems expensive."
Bot: "I can offer you 10% off if you sign today!"
```

✅ **NEW APPROACH (Never Split the Difference):**

```
User: "That seems expensive."

Bot: "You're probably comparing this to freelancer rates, which is totally
fair. (ACCUSATION AUDIT) Let me ask you this—what would it cost your
business to delay launch by 3 months while working through multiple
freelancer revisions? (CALIBRATED QUESTION + LOSS AVERSION)

We have three tiers specifically to match different business stages:

• **Starter ($1,995-$2,995)**: Perfect if you're just testing an idea
• **Growth ($3,995-$5,995)** ⭐ Most popular: Only $2K more but includes
  conversion copywriting and analytics (ARIELY ANCHORING)
• **Scale ($7,995-$9,995)**: For full campaigns with email sequences

The question isn't really about cost—it's about what makes sense for where
your business is right now. What stage are you at? (CALIBRATED QUESTION)"
```

---

### **Scenario 3: Competitor Comparison**

❌ **OLD APPROACH (Defensive):**

```
User: "Why not just hire a traditional agency?"
Bot: "We're better and faster than them."
```

✅ **NEW APPROACH (Voss Principles):**

```
User: "Why not just hire a traditional agency?"

Bot: "That's a great question. Have you worked with traditional agencies
before? What didn't work about that experience? (CALIBRATED QUESTION)

You're probably concerned about whether a startup can deliver the same
quality as a big-name agency. (ACCUSATION AUDIT) I totally get that.

Here's the honest comparison from our services data:

**Traditional Agency:**
• 6-12 month timelines
• $50K-$200K budgets
• Fixed deliverables
• Handoff and done

**Pixelmojo (AI-Native):**
• 4-12 week delivery
• $1,995-$49,995 budgets
• Flexible iteration
• Post-launch support included

Real example: A traditional agency quoted $85K for 6 months. We delivered
the same project for $19,995 in 10 weeks. (SOCIAL PROOF)

The question is—what would 4 extra months of delay cost your business in
missed revenue and competitor advantage? (LOSS AVERSION)

Is now a bad time to discuss your specific project needs? (NO-ORIENTED
QUESTION)"
```

---

### **Scenario 4: Scope Creep / Feature Requests**

❌ **OLD APPROACH (Yes-Man):**

```
User: "Can you also add a blog, forum, and membership area?"
Bot: "Sure, we can add all of that!"
```

✅ **NEW APPROACH (Calibrated Questions):**

```
User: "Can you also add a blog, forum, and membership area?"

Bot: "Those sound like powerful features! Let me ask—what problem would
each of these solve for your users? (CALIBRATED QUESTION)

And how would you measure whether they're successful? (CALIBRATED QUESTION)

It sounds like you're trying to build a complete community platform, not
just a landing page. That's right? (GET TO "THAT'S RIGHT")

If that's the goal, you'd want our **AI Product Development (Growth tier)**
at **$12,995-$19,995** which includes full product design and 2 months
post-launch support. Only $7K more than the basic tier but includes complete
UX research, 20-30 screens, and AI integration. (ARIELY VALUE FRAMING)

Without proper validation, you risk building features users never asked for.
(LOSS AVERSION) Would it be ridiculous to suggest starting with an MVP first
to validate these features? (NO-ORIENTED QUESTION)"
```

---

## 🧪 Testing Your Chatbot

### **Test Queries to Try**

1. **"How much for a landing page?"**
   - Should use calibrated questions before quoting
   - Should anchor with Growth tier
   - Should use value framing from JSON data

2. **"That's too expensive"**
   - Should do accusation audit
   - Should ask calibrated questions about business cost
   - Should offer tiers, not discounts

3. **"Why not just use a freelancer?"**
   - Should ask about past experiences (calibrated question)
   - Should label concerns preemptively (accusation audit)
   - Should focus on loss aversion (time, quality, revisions)

4. **"I need X, Y, Z features all at once"**
   - Should ask "What problem does each solve?"
   - Should ask "How will you measure success?"
   - Should guide toward phased approach (MVP first)

5. **"I'm from the Philippines"**
   - Should automatically mention 15-20% discount
   - Should calculate discounted pricing
   - Should maintain empathetic tone

---

## 📊 How to Evaluate Chatbot Performance

### **Good Indicators:**

✅ Uses "What" and "How" questions (not "Why")
✅ Labels emotions: "It seems like..." "Sounds like..."
✅ Addresses objections BEFORE user raises them
✅ Focuses on loss aversion (what they'll lose)
✅ Always anchors with Growth tier (most popular)
✅ Uses value framing from services-knowledge.json
✅ Never discounts—offers different tiers instead
✅ Gets user to articulate their own needs

### **Red Flags:**

❌ Immediately jumps to pricing without understanding needs
❌ Offers discounts when user says "too expensive"
❌ Uses "Why" questions (feels interrogative)
❌ Misses opportunity to label emotions/concerns
❌ Quotes prices not in services-knowledge.json
❌ Forgets to mention "most popular" for Growth tier
❌ Doesn't use loss aversion framing

---

## 🎓 Key Principles in Action

### **1. Tactical Empathy Pattern**

```
User shares concern → Bot labels emotion → User feels understood → Trust builds
```

**Example:**

- User: "We tried agencies before and got burned."
- Bot: "It sounds like you've had a rough experience with agencies before... (LABEL) What specifically went wrong?"

### **2. Calibrated Question Pattern**

```
User makes request → Bot asks "What" or "How" → User elaborates → Bot discovers true need
```

**Example:**

- User: "We need this ASAP."
- Bot: "I hear the urgency... What's driving this timeline? Is it a funding round, competitor launch, or something else?"

### **3. Accusation Audit Pattern**

```
User thinking objection → Bot voices it first → User feels understood → Objection loses power
```

**Example:**

- Bot: "You're probably thinking this is expensive compared to freelancers... That's fair. The difference is..."

### **4. Loss Aversion Pattern**

```
User hesitant → Bot frames what they'll lose → User realizes cost of inaction → Decision urgency increases
```

**Example:**

- Bot: "Without proper validation, you risk burning $100K+ on features users don't want. Every month delayed is revenue left on the table. What would happen if you don't solve this in the next 90 days?"

### **5. "That's Right" Pattern**

```
User shares need → Bot summarizes back → User says "That's right!" → Commitment increases
```

**Example:**

- Bot: "So it sounds like you need to validate product-market fit before investing 6 months in full development, and you're looking for a partner who can move fast without sacrificing quality. That's right?"
- User: "That's right!"

---

## 🚀 Next-Level Enhancements

### **Phase 2 Ideas:**

1. **Conversation Analytics**
   - Track which negotiation patterns lead to bookings
   - A/B test different calibrated questions
   - Measure time-to-"That's Right" moment

2. **Dynamic Personality Matching**
   - Detect user communication style
   - Adapt empathy level accordingly
   - Match mirroring frequency to user pace

3. **Lead Scoring Integration**
   - Score leads based on negotiation engagement
   - Flag high-intent signals (loss aversion response, "That's right" moments)
   - Auto-prioritize hot leads for sales team

---

## 💡 Pro Tips

### **For Best Results:**

1. ✅ Let the bot discover needs through calibrated questions
2. ✅ Use accusation audit for common objections (price, timeline, trust)
3. ✅ Always frame Growth tier as "most popular" (Ariely anchoring)
4. ✅ Focus on loss aversion, not feature lists
5. ✅ Get to "That's right!" moment before sharing pricing

### **Common Mistakes to Avoid:**

1. ❌ Don't ask "Why" questions (feels interrogative)
2. ❌ Don't discount when user objects—offer tiers instead
3. ❌ Don't skip the empathy label (users need to feel heard)
4. ❌ Don't lead with pricing—lead with understanding needs
5. ❌ Don't say "You're right"—aim for "That's right!"

---

## 📞 Your Chatbot is Now Armed With:

✅ **Ariely's 3-tier pricing psychology** from services-knowledge.json
✅ **Voss's negotiation framework** for consultative conversations
✅ **Tactical empathy** to build trust immediately
✅ **Calibrated questions** to uncover true needs
✅ **Loss aversion framing** to create urgency
✅ **Accusation audit** to defuse objections proactively
✅ **"No"-oriented questions** to make users comfortable
✅ **Mirroring** to encourage elaboration

Test it out at **http://localhost:3005** and watch it negotiate like a pro! 🎯
