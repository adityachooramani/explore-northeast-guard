import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, ArrowRight, Clock } from "lucide-react";

interface GeoFenceAlertProps {
  onDismiss: (action: "turn-back" | "proceed") => void;
  alert: {
    type: string;
    description: string;
    severity: "low" | "medium" | "high";
  };
}

const GeoFenceAlert = ({ onDismiss, alert }: GeoFenceAlertProps) => {
  const [countdown, setCountdown] = useState(3);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setButtonsVisible(true);
    }
  }, [countdown]);

  const getSeverityColor = () => {
    switch (alert.severity) {
      case "high": return "danger";
      case "medium": return "amber-warning";
      case "low": return "soft-green";
      default: return "amber-warning";
    }
  };

  const getSeverityBg = () => {
    switch (alert.severity) {
      case "high": return "bg-danger/20 border-danger/40";
      case "medium": return "bg-amber-warning/20 border-amber-warning/40";
      case "low": return "bg-soft-green/20 border-soft-green/40";
      default: return "bg-amber-warning/20 border-amber-warning/40";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary-dark/95 backdrop-blur-md flex items-center justify-center p-6">
      <Card className={`w-full max-w-sm ${getSeverityBg()} border-2 animate-scale-in`}>
        <CardContent className="p-8 text-center">
          {/* Warning Icon */}
          <div className={`w-16 h-16 mx-auto mb-6 bg-${getSeverityColor()}/20 rounded-full flex items-center justify-center`}>
            <AlertTriangle className={`h-8 w-8 text-${getSeverityColor()}`} />
          </div>

          {/* Alert Title */}
          <h2 className="text-h1 font-bold text-pure-white mb-4">
            {alert.severity === "high" ? "⚠️ DANGER ZONE" : "⚠️ CAUTION"}
          </h2>

          {/* Alert Type */}
          <div className={`inline-block px-3 py-1 mb-4 rounded-full border text-${getSeverityColor()} ${getSeverityBg()}`}>
            <span className="text-small font-medium">{alert.type}</span>
          </div>

          {/* Alert Description */}
          <p className="text-body text-neutral-gray mb-6">
            {alert.description}
          </p>

          {/* Countdown or Actions */}
          {!buttonsVisible ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-neutral-gray">
                <Clock className="h-4 w-4" />
                <span className="text-small">Reading time: {countdown}s</span>
              </div>
              <div className="w-full bg-neutral-gray/20 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 bg-${getSeverityColor()}`}
                  style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              {alert.severity === "high" ? (
                <>
                  <Button
                    onClick={() => onDismiss("turn-back")}
                    size="lg"
                    className="w-full bg-deep-forest hover:bg-deep-forest/90 text-pure-white rounded-button"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Turn Back (Recommended)
                  </Button>
                  <Button
                    onClick={() => onDismiss("proceed")}
                    variant="outline"
                    size="lg"
                    className="w-full border-danger text-danger hover:bg-danger/10 rounded-button"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Proceed Anyway
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => onDismiss("proceed")}
                    size="lg"
                    className="w-full bg-deep-forest hover:bg-deep-forest/90 text-pure-white rounded-button"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Continue with Care
                  </Button>
                  <Button
                    onClick={() => onDismiss("turn-back")}
                    variant="outline"
                    size="lg"
                    className="w-full border-neutral-gray/20 text-pure-white hover:bg-card/20 rounded-button"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Turn Back
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Additional Info */}
          <p className="text-xs text-neutral-gray mt-6">
            Authorities have been notified of your location
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export { GeoFenceAlert };