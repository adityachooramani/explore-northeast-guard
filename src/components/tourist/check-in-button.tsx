import { useState } from "react";
import { MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CheckInButtonProps {
  className?: string;
  onCheckIn?: () => void;
}

const CheckInButton = ({ className, onCheckIn }: CheckInButtonProps) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    onCheckIn?.();
    
    // Reset after 3 seconds for demo
    setTimeout(() => setIsCheckedIn(false), 3000);
  };

  return (
    <Button
      onClick={handleCheckIn}
      variant={isCheckedIn ? "default" : "secondary"}
      size="sm"
      className={cn(
        "fixed top-20 left-1/2 -translate-x-1/2 z-40",
        "shadow-floating backdrop-blur-sm",
        "transition-all duration-300",
        isCheckedIn && "bg-success hover:bg-success/90 text-white",
        className
      )}
    >
      {isCheckedIn ? (
        <>
          <CheckCircle className="h-4 w-4 mr-2" />
          I'm Safe ✓
        </>
      ) : (
        <>
          <MapPin className="h-4 w-4 mr-2" />
          Check In
        </>
      )}
    </Button>
  );
};

export { CheckInButton };