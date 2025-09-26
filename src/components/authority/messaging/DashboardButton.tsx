import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface DashboardButtonProps {
  onClick: () => void;
  className?: string;
}

const DashboardButton = ({ onClick, className }: DashboardButtonProps) => {
  return (
    <Button onClick={onClick} size="sm" className={className}>
      <MessageSquare className="h-4 w-4 mr-2" />
      Messaging
    </Button>
  );
};

export { DashboardButton };


