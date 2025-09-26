import { Card, CardContent } from "@/components/ui/card";

export interface MessagingUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unread?: number;
}

interface MessagingListProps {
  users: MessagingUser[];
  onSelectUser: (user: MessagingUser) => void;
}

const MessagingList = ({ users, onSelectUser }: MessagingListProps) => {
  return (
    <div className="space-y-2">
      {users.map((u) => (
        <Card key={u.id} className="cursor-pointer hover:bg-secondary/40" onClick={() => onSelectUser(u)}>
          <CardContent className="p-3 flex items-center gap-3">
            <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium truncate">{u.name}</span>
                {u.unread ? (
                  <span className="text-xs bg-primary text-white rounded-full px-2 py-0.5">{u.unread}</span>
                ) : null}
              </div>
              <div className="text-xs text-muted-foreground truncate">{u.lastMessage}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { MessagingList };


