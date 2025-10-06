# PixelMojo Chatbot Setup Instructions

## 🎉 Phase 1 Minimal Chatbot - COMPLETE!

You now have a fully functional AI chatbot! Here's what we've built:

### ✅ What's Done:

1. ✅ Supabase database schema (migrations file created)
2. ✅ OpenAI API integration
3. ✅ Chat UI components (floating widget + chat window)
4. ✅ API routes for chat, sessions, and messages
5. ✅ Added to all pages via root layout

---

## 🚀 Next Steps to Go Live

### Step 1: Apply Database Migrations to Supabase

You need to run the SQL migrations to create the database tables and add rate limiting:

**Option A: Using Supabase Dashboard (Recommended)**

1. Go to https://supabase.com/dashboard
2. Select your `pixelmojo-2026` project
3. Click **SQL Editor** in the left sidebar

**First Migration (Database Schema):**

4. Click **New Query**
5. Copy the contents of `supabase/migrations/001_chatbot_schema.sql`
6. Paste into the SQL editor
7. Click **Run** (or press Cmd/Ctrl + Enter)
8. You should see: "Success. No rows returned"

**Second Migration (Rate Limiting):**

9. Click **New Query** again
10. Copy the contents of `supabase/migrations/002_add_rate_limiting.sql`
11. Paste into the SQL editor
12. Click **Run** (or press Cmd/Ctrl + Enter)
13. You should see: "Success. No rows returned"

**Option B: Using Supabase CLI**

```bash
npx supabase db push
```

### Step 2: Add Your OpenAI API Key

1. Open `.env.local`
2. Replace `your_openai_api_key_here` with your actual OpenAI API key
3. Make sure it starts with `sk-`

Example:

```
OPENAI_API_KEY=sk-proj-abc123...
```

### Step 3: Restart Your Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 4: Test the Chatbot!

1. Open http://localhost:3000
2. Look for the chat bubble in bottom-right corner
3. Click to open the chat
4. Send a message like "I need help with web design"
5. Watch the AI respond!

---

## 📊 What the Chatbot Can Do (Phase 1)

### Current Features:

- ✅ Greets visitors warmly
- ✅ Understands project needs (web design, branding, UI/UX, etc.)
- ✅ Asks about budget and timeline
- ✅ Captures email addresses automatically
- ✅ Saves all conversations to Supabase
- ✅ Works on all pages
- ✅ Mobile responsive
- ✅ **Rate limiting protection** (30 messages per session, 10 messages per minute)
- ✅ **Abuse prevention** with automatic limits and redirect to email/Calendly
- ✅ **Content filtering** - Rejects off-topic questions (spam, homework, general Q&A)
- ✅ **Topic enforcement** - Only engages with design/product development inquiries

### AI Behavior:

- Friendly and consultative (not pushy)
- Asks ONE question at a time
- Knows your services and pricing
- Can discuss your portfolio
- Suggests discovery calls when appropriate

---

## 🔍 Verify It's Working

### Check Database:

1. Go to Supabase Dashboard → Table Editor
2. You should see these new tables:
   - `chat_sessions`
   - `messages`
   - `leads`

### Check Conversations:

After chatting, check the `messages` table to see the conversation history!

---

## 🎯 What's Next (Phase 2 - Later)

These features are planned but not built yet:

- Portfolio search function
- File uploads
- Calendar integration (Calendly)
- Lead scoring
- Email notifications
- Admin dashboard

---

## 🐛 Troubleshooting

### "OpenAI API Error"

- Check that `OPENAI_API_KEY` in `.env.local` is correct
- Make sure it starts with `sk-`
- Restart your dev server after adding the key

### "Supabase Error" or "Failed to create session"

- Make sure you ran the database migration (Step 1)
- Check that `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` are correct

### Chat button doesn't appear

- Make sure you restarted the dev server
- Check browser console for errors (F12 → Console tab)

### Messages not saving

- Verify the database migration was successful
- Check the `chat_sessions` and `messages` tables exist in Supabase

---

## 💰 Cost Estimates

With `gpt-4o-mini`:

- ~500 conversations/month = **$10-15/month**
- Each conversation averages 5-10 messages
- Very affordable for testing!

---

## 🎨 Customization (Later)

Want to tweak the chatbot? Here's where to look:

- **System Prompt**: `src/app/api/chat/route.ts` (line 9)
- **UI Colors**: Components use your existing theme automatically
- **Greeting Message**: `src/components/chat/ChatWindow.tsx` (line 42)
- **Model Settings**: `src/app/api/chat/route.ts` (line 84-89)

---

## Questions?

The chatbot is ready to test! Just complete Steps 1-3 above and you're good to go! 🚀
