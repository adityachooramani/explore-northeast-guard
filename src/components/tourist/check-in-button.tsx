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
        "shadow-floating backdrop-blur-md border-0",
        "transition-all duration-300 button-touch",
        isCheckedIn 
          ? "bg-deep-forest hover:bg-deep-forest/90 text-pure-white" 
          : "bg-card/80 hover:bg-card text-pure-white border border-neutral-gray/20",
        className
      )}
    >
      {isCheckedIn ? (
        <>
          <CheckCircle className="h-4 w-4 mr-2" />
          <span className="text-small font-medium">I'm Safe ✓</span>
        </>
      ) : (
        <>
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-small font-medium">Check In</span>
        </>
      )}
    </Button>
  );
};

export { CheckInButton };