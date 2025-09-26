import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessagingList, type MessagingUser } from "./MessagingList";
import { ChatWindow } from "./ChatWindow";

const DUMMY_USERS: MessagingUser[] = [
  { id: "u1", name: "Alice", avatar: "https://randomuser.me/api/portraits/women/68.jpg", lastMessage: "See you at 5!", unread: 2 },
  { id: "u2", name: "Bob", avatar: "https://randomuser.me/api/portraits/men/32.jpg", lastMessage: "Thanks!", unread: 0 },
  { id: "u3", name: "Charlie", avatar: "https://randomuser.me/api/portraits/men/71.jpg", lastMessage: "Can we reschedule?", unread: 1 },
  { id: "u4", name: "Diana", avatar: "https://randomuser.me/api/portraits/women/12.jpg", lastMessage: "Noted.", unread: 0 },
  { id: "u5", name: "Eve", avatar: "https://randomuser.me/api/portraits/women/33.jpg", lastMessage: "Sent the file.", unread: 0 },
];

const DUMMY_MESSAGES: Record<string, { id: string; text: string; fromSelf?: boolean; time?: string }[]> = {
  u1: [
    { id: "m1", text: "Hey Alice!", fromSelf: true, time: "10:12" },
    { id: "m2", text: "Hi! How are you?", time: "10:12" },
    { id: "m3", text: "All good. The team is prepped.", fromSelf: true, time: "10:13" },
    { id: "m4", text: "Great!" },
  ],
  u2: [
    { id: "m1", text: "Bob, received your report.", fromSelf: true },
    { id: "m2", text: "Thanks!" },
  ],
  u3: [
    { id: "m1", text: "Charlie, meeting at 3 PM?", fromSelf: true },
    { id: "m2", text: "Can we reschedule?" },
    { id: "m3", text: "Sure, suggest a time.", fromSelf: true },
  ],
  u4: [
    { id: "m1", text: "Diana, please review the SOP.", fromSelf: true },
    { id: "m2", text: "Noted." },
  ],
  u5: [
    { id: "m1", text: "Eve, can you share the logs?", fromSelf: true },
    { id: "m2", text: "Sent the file." },
  ],
};

interface MessagingPageProps {
  onBackToDashboard: () => void;
}

const MessagingPage = ({ onBackToDashboard }: MessagingPageProps) => {
  const [selectedUser, setSelectedUser] = useState<MessagingUser | null>(null);

  if (selectedUser) {
    return (
      <div className="h-[calc(100vh-80px)] bg-white">
        <ChatWindow
          user={selectedUser}
          messages={DUMMY_MESSAGES[selectedUser.id] || []}
          onBack={() => setSelectedUser(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Messaging</h2>
        <Button variant="outline" size="sm" onClick={onBackToDashboard}>Back to Dashboard</Button>
      </div>
      <MessagingList users={DUMMY_USERS} onSelectUser={setSelectedUser} />
    </div>
  );
};

export { MessagingPage };


