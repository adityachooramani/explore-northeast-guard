import { useState, useRef, useEffect } from "react";  
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
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startHoldProgress = () => {
    setIsHolding(true);
    setHoldProgress(0);
    
    const startTime = Date.now();
    const holdDuration = 2000; // 2 seconds
    
    holdTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / holdDuration, 1);
      setHoldProgress(progress);
      
      if (progress >= 1) {
        clearInterval(holdTimerRef.current!);
        handleLongPress();
      }
    }, 16);
  };

  const stopHoldProgress = () => {
    setIsHolding(false);
    setHoldProgress(0);
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const handleLongPress = () => {
    setIsDialogOpen(true);
    setIsConfirming(true);
    setCountdown(5);
    
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current!);
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
    console.log("🚨 EMERGENCY ACTIVATED - Dispatching help");
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setIsConfirming(false);
    setCountdown(0);
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  return (
    <>
      <Button
        className={cn(
          "floating-panic fixed bottom-6 right-6 h-20 w-20 rounded-full shadow-emergency",
          "bg-danger hover:bg-danger/90 text-pure-white border-0",
          "focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2",
          "transition-all duration-300 hover:scale-105 active:scale-95",
          "touch-target overflow-hidden",
          className
        )}
        onClick={() => setIsDialogOpen(true)}
        onMouseDown={startHoldProgress}
        onMouseUp={stopHoldProgress}
        onMouseLeave={stopHoldProgress}
        onTouchStart={startHoldProgress}
        onTouchEnd={stopHoldProgress}
        aria-label="Emergency panic button - hold for 2 seconds to activate"
        size="icon"
      >
        {/* Progress ring */}
        {isHolding && (
          <div 
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              background: `conic-gradient(from 0deg, hsl(var(--amber-warning)) ${holdProgress * 360}deg, transparent 0deg)`,
              padding: '2px'
            }}
          />
        )}
        
        <div className="relative flex items-center justify-center z-10">
          <Phone className="h-8 w-8" />
          <Shield className="absolute -top-1 -right-1 h-4 w-4" />
        </div>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-neutral-gray/20 text-card-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-danger text-h2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Alert
            </DialogTitle>
            <DialogDescription className="text-body text-muted-foreground">
              {isConfirming 
                ? `Auto-dispatching help in ${countdown} seconds...`
                : "Are you in immediate danger and need emergency assistance?"
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4">
            {isConfirming && (
              <div className="bg-danger/10 border border-danger/20 rounded-lg p-4 text-center animate-pulse">
                <div className="text-3xl font-bold text-danger mb-2">{countdown}</div>
                <p className="text-small text-muted-foreground">
                  Help is being dispatched to your location
                </p>
              </div>
            )}
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 button-touch border-neutral-gray/20 hover:bg-muted"
                disabled={isConfirming}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleConfirmedEmergency}
                className="flex-1 button-touch bg-danger hover:bg-danger/90 text-pure-white"
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