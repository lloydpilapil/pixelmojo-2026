interface MessageProps {
  role: 'user' | 'assistant'
  content: string
}

export default function Message({ role, content }: MessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] md:max-w-[80%] rounded-lg px-3 py-2 md:px-4 md:py-2.5 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        }`}
      >
        <p className='text-xs md:text-sm whitespace-pre-wrap'>{content}</p>
      </div>
    </div>
  )
}
