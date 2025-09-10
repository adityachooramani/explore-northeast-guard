import { useState } from "react";  
import { Phone, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface PanicButtonProps {
  className?: string;
  onEmergency?: () => void;
}

const PanicButton = ({ className, onEmergency }: PanicButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleLongPress = () => {
    setIsConfirming(true);
    setCountdown(15);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleConfirmedEmergency();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleConfirmedEmergency = () => {
    setIsDialogOpen(false);
    setIsConfirming(false);
    onEmergency?.();
    // In real app: trigger emergency protocol
    console.log("🚨 EMERGENCY ACTIVATED - Dispatching help");
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setIsConfirming(false);
    setCountdown(0);
  };

  return (
    <>
      <Button
        className={cn(
          "floating-panic fixed bottom-6 right-6 h-18 w-18 rounded-full shadow-emergency",
          "bg-danger hover:bg-danger/90 text-white",
          "focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2",
          "transition-all duration-200 hover:scale-105",
          className
        )}
        onClick={() => setIsDialogOpen(true)}
        onMouseDown={handleLongPress}
        aria-label="Emergency panic button - call for immediate help"
        size="icon"
      >
        <div className="relative flex items-center justify-center">
          <Phone className="h-6 w-6" />
          <Shield className="absolute -top-1 -right-1 h-4 w-4" />
        </div>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-danger">
              <AlertTriangle className="h-5 w-5" />
              Emergency Alert
            </DialogTitle>
            <DialogDescription>
              {isConfirming 
                ? `Auto-dispatching help in ${countdown} seconds...`
                : "Are you in immediate danger and need emergency assistance?"
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4">
            {isConfirming && (
              <div className="bg-danger/10 border border-danger/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-danger mb-2">{countdown}</div>
                <p className="text-sm text-muted-foreground">
                  Help is being dispatched to your location
                </p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
                disabled={isConfirming}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleConfirmedEmergency}
                className="flex-1 bg-danger hover:bg-danger/90"
                disabled={isConfirming}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Help Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const AlertTriangle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 14.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

export { PanicButton };