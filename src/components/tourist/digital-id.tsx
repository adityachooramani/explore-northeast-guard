import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { Download, Share2, Copy, Clock, ChevronLeft, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DigitalIDProps {
  onBack: () => void;
  userData: {
    name: string;
    phone: string;
    id: string;
  };
}

const DigitalID = ({ onBack, userData }: DigitalIDProps) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const qrValue = JSON.stringify({
    id: userData.id,
    name: userData.name,
    phone: userData.phone,
    timestamp: Date.now(),
    expires: Date.now() + 600000 // 10 minutes
  });

  const handleSave = () => {
    toast({
      title: "QR Code Saved",
      description: "Digital ID saved to gallery successfully",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Digital Tourist ID",
          text: `Tourist ID: ${userData.id}`,
          url: window.location.href
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userData.id);
    toast({
      title: "ID Copied",
      description: "Tourist ID copied to clipboard",
    });
  };

  const isExpiringSoon = timeLeft < 120; // Less than 2 minutes

  return (
    <div className="min-h-screen bg-primary-dark text-pure-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-neutral-gray/20">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-pure-white hover:bg-neutral-gray/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-deep-forest/20 rounded-full flex items-center justify-center">
            <Shield className="h-5 w-5 text-deep-forest" />
          </div>
          <div>
            <h1 className="text-h2 font-semibold">Digital Tourist ID</h1>
            <p className="text-small text-neutral-gray">Verified Identity</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-8">
        {/* Validity Timer */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
            isExpiringSoon 
              ? "bg-danger/10 border-danger/20 text-danger" 
              : "bg-deep-forest/10 border-deep-forest/20 text-deep-forest"
          }`}>
            <Clock className="h-4 w-4" />
            <span className="text-small font-medium">
              Valid for {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* QR Code Card */}
        <Card className="bg-gradient-surface border-neutral-gray/20 mb-6">
          <CardHeader className="text-center pb-4">
            <h2 className="text-h2 font-semibold text-pure-white">Tourist Verification</h2>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            {/* QR Code */}
            <div className="bg-white p-6 rounded-lg">
              <QRCodeSVG
                value={qrValue}
                size={200}
                level="M"
                includeMargin={true}
              />
            </div>

            {/* User Info */}
            <div className="text-center space-y-2">
              <h3 className="text-h2 font-semibold text-pure-white">{userData.name}</h3>
              <p className="text-body text-neutral-gray">{userData.phone}</p>
              <p className="text-small text-neutral-gray font-mono">
                ID: {userData.id}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 px-4 py-2 bg-deep-forest/20 rounded-full">
              <div className="w-2 h-2 bg-deep-forest rounded-full"></div>
              <span className="text-small text-deep-forest font-medium">Verified Tourist</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSave}
            variant="outline"
            className="w-full bg-card/50 border-neutral-gray/20 text-pure-white hover:bg-card/80"
          >
            <Download className="h-4 w-4 mr-2" />
            Save to Gallery
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleShare}
              variant="outline"
              className="bg-card/50 border-neutral-gray/20 text-pure-white hover:bg-card/80"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share ID
            </Button>

            <Button
              onClick={handleCopy}
              variant="outline"
              className="bg-card/50 border-neutral-gray/20 text-pure-white hover:bg-card/80"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy ID
            </Button>
          </div>
        </div>

        {/* Warning */}
        {isExpiringSoon && (
          <Card className="mt-6 bg-danger/10 border-danger/20">
            <CardContent className="p-4">
              <p className="text-small text-danger text-center">
                ⚠️ Your digital ID will expire soon. Please refresh for a new one.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export { DigitalID };