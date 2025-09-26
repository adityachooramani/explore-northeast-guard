import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageBubble } from "./MessageBubble";

interface ChatMessage {
  id: string;
  text: string;
  fromSelf?: boolean;
  time?: string;
}

interface ChatWindowProps {
  user: { id: string; name: string; avatar: string };
  messages: ChatMessage[];
  onBack: () => void;
}

const ChatWindow = ({ user, messages, onBack }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 p-3 border-b bg-white sticky top-0 z-10">
        <Button variant="outline" size="sm" onClick={onBack}>Back</Button>
        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
        <div className="font-medium">{user.name}</div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-muted/30">
        {messages.map((m) => (
          <MessageBubble key={m.id} text={m.text} isOwn={!!m.fromSelf} time={m.time} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t bg-white">
        <Card>
          <CardContent className="p-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button>Send</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ChatWindow };


