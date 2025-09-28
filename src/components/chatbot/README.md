# ChatBot Component

A placeholder chatbot implementation with "coming soon" functionality that can be easily integrated with OpenAI later.

## Current Features

- ✅ Chat UI with floating toggle button
- ✅ Message interface with user/bot styling
- ✅ "Coming soon" placeholder messages
- ✅ Responsive design with dark mode support
- ✅ Accessible keyboard navigation

## Future Integration (OpenAI)

### 1. Install Dependencies

```bash
npm install openai
```

### 2. Environment Variables

Add to your `.env.local`:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Update ChatBot.tsx

Replace the `handleSendMessage` function to call your API:

```typescript
const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!message.trim()) return

  // Add user message
  const userMessage: Message = {
    id: Date.now().toString(),
    text: message,
    sender: 'user',
    timestamp: new Date(),
  }
  setMessages(prev => [...prev, userMessage])
  setMessage('')

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message.trim() }),
    })

    const data = await response.json()

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: data.message,
      sender: 'bot',
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, botMessage])
  } catch (error) {
    console.error('Chat error:', error)
    // Handle error
  }
}
```

### 4. Update API Route

Uncomment and configure the OpenAI integration in `/api/chat/route.ts`

### 5. Customize System Prompt

Update the system message in the API route to match Pixelmojo's tone and capabilities:

```typescript
{
  role: "system",
  content: `You are Pixelmojo's AI assistant. You help users with:
  - AI product development questions
  - Design and UX inquiries
  - Information about Pixelmojo's services
  - Project timelines and capabilities

  Be helpful, professional, and focus on how Pixelmojo can solve their problems.
  If you can't answer something, direct them to founders@pixelmojo.io`
}
```

## Python Integration Option

If you prefer Python for the backend:

1. Create a Python FastAPI service
2. Use the OpenAI Python SDK
3. Update the fetch URL in the component to point to your Python service
4. Keep the same message interface for consistency

## Styling Notes

- Uses Tailwind CSS classes
- Follows the site's color scheme (primary, secondary)
- Responsive design works on mobile and desktop
- Dark mode compatible
