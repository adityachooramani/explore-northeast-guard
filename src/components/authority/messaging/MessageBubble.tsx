interface MessageBubbleProps {
  text: string;
  isOwn?: boolean;
  time?: string;
}

const MessageBubble = ({ text, isOwn = false, time }: MessageBubbleProps) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} w-full`}> 
      <div className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm shadow ${
        isOwn ? 'bg-primary text-white rounded-br-sm' : 'bg-muted rounded-bl-sm'
      }`}>
        <div>{text}</div>
        {time && (
          <div className={`text-[10px] mt-1 opacity-70 ${isOwn ? 'text-white' : 'text-foreground'}`}>{time}</div>
        )}
      </div>
    </div>
  );
};

export { MessageBubble };


