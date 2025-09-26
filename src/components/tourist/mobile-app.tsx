import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroCard } from "@/components/ui/hero-card";
import { PanicButton } from "@/components/ui/panic-button";
import { CheckInButton } from "@/components/tourist/check-in-button";
import { AttractionsCarousel } from "@/components/tourist/attractions-carousel";
import { StatusChip } from "@/components/ui/status-chip";
import { FeatureTile } from "@/components/ui/feature-tile";
import { MockMap } from "@/components/ui/mock-map";
import { ProfileScreen } from "@/components/tourist/profile-screen";
import { LanguageSelect } from "@/components/tourist/language-select";
import { PrivacyScreen } from "@/components/tourist/privacy-screen";
import { RegistrationFlow } from "@/components/tourist/registration-flow";
import { DigitalID } from "@/components/tourist/digital-id";
import { GeoFenceAlert } from "@/components/tourist/geo-fence-alert";
import { LocationHistory } from "@/components/tourist/location-history";
import { SettingsScreen } from "@/components/tourist/settings-screen";
import { VoiceRecorder } from "@/components/tourist/voice-recorder";
import { SafetyTipsScreen } from "@/components/tourist/safety-tips-screen";
import { ExploreScreen } from "@/components/tourist/explore-screen";
import { EventsScreen } from "@/components/tourist/events-screen";
import { User, Menu, Shield, Heart, Car, Calendar, MapPin, Phone, Settings, History, QrCode, Info } from "lucide-react";
import buddhaHero from "@/assets/buddha-hero.jpg";

const MobileApp = () => {
  const [currentView, setCurrentView] = useState<
    "language" | "splash" | "privacy" | "registration" | "home" | "profile" | 
    "digitalId" | "history" | "settings" | "panicFlow" | "safetyTips" | "explore" | "events"
  >("language");
  const [geoFenceAlert, setGeoFenceAlert] = useState<{
    type: string;
    description: string; 
    severity: "low" | "medium" | "high";
  } | null>(null);
  
  const userData = {
    name: "John Doe",
    phone: "+91 98765 43210", 
    id: "NEST_2024_001234"
  };

  // Handle different screens
  if (currentView === "language") {
    return <LanguageSelect onLanguageSelect={() => setCurrentView("splash")} />;
  }
  
  if (currentView === "privacy") {
    return <PrivacyScreen onContinue={() => setCurrentView("registration")} />;
  }
  
  if (currentView === "registration") {
    return (
      <RegistrationFlow 
        onComplete={() => setCurrentView("home")}
        onBack={() => setCurrentView("privacy")}
      />
    );
  }
  
  if (currentView === "profile") {
    return <ProfileScreen onBack={() => setCurrentView("home")} />;
  }
  
  if (currentView === "digitalId") {
    return (
      <DigitalID 
        userData={userData}
        onBack={() => setCurrentView("home")}
      />
    );
  }
  
  if (currentView === "history") {
    return <LocationHistory onBack={() => setCurrentView("home")} />;
  }
  
  if (currentView === "settings") {
    return <SettingsScreen onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "safetyTips") {
    return <SafetyTipsScreen onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "explore") {
    return <ExploreScreen onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "events") {
    return <EventsScreen onBack={() => setCurrentView("home")} />;
  }
  
  if (currentView === "panicFlow") {
    return (
      <div className="min-h-screen bg-primary-dark flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-h1 font-bold text-pure-white mb-4">Emergency Activated</h1>
            <p className="text-body text-neutral-gray mb-6">Record a message for responders</p>
          </div>
          
          <VoiceRecorder 
            maxDuration={30}
            autoStart={true}
            onRecordingComplete={(blob) => {
              console.log("Recording completed:", blob);
              // Simulate emergency pipeline
              setTimeout(() => {
                setCurrentView("home");
              }, 3000);
            }}
          />
          
          <Button
            onClick={() => setCurrentView("home")}
            variant="outline"
            className="w-full border-neutral-gray/20 text-pure-white hover:bg-card/20"
          >
            Cancel Emergency
          </Button>
        </div>
      </div>
    );
  }

  if (currentView === "splash") {
    return (
      <div className="min-h-screen bg-primary-dark">
        <HeroCard 
          image={buddhaHero} 
          alt="Buddha statue overlooking green hillside"
          height="xl"
          className="min-h-screen rounded-none"
        >
          <div className="text-center animate-fade-in px-6">
            <h1 className="text-h1 text-pure-white font-semibold mb-3 tracking-tight">
              NorthEast Safe
            </h1>
            <p className="text-body text-pure-white/90 mb-8 max-w-sm mx-auto">
              Explore safe. Explore Northeast.
            </p>
            <Button 
              onClick={() => setCurrentView("privacy")}
              size="lg"
              className="button-touch bg-deep-forest hover:bg-deep-forest/90 text-pure-white 
                         border-0 shadow-lg backdrop-blur-sm transition-all duration-300
                         hover:scale-105 focus:scale-105 rounded-button"
            >
              Get Started
            </Button>
            <p className="text-small text-pure-white/75 mt-6 max-w-xs mx-auto">
              Your safety companion for Northeast India
            </p>
          </div>
        </HeroCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark text-pure-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-primary-dark/95 backdrop-blur-md border-b border-neutral-gray/20">
        <div className="flex items-center justify-between p-4 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-deep-forest" />
            <span className="text-h2 font-semibold text-pure-white">NorthEast Safe</span>
          </div>
          <div className="flex items-center gap-3">
            <StatusChip variant="ok" className="bg-deep-forest/20 text-deep-forest border-deep-forest/30">
              Safe Zone
            </StatusChip>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCurrentView("profile")}
              className="button-touch hover:bg-neutral-gray/10 text-pure-white"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-6 pb-32">
        {/* Check-in Button */}
        <div className="pt-6">
          <CheckInButton />
        </div>

        {/* Map Section */}
        <Card className="overflow-hidden bg-card border-neutral-gray/20 shadow-card">
          <CardContent className="p-0">
            <MockMap />
          </CardContent>
        </Card>

        {/* Feature Grid */}
        <div className="space-y-4">
          <h2 className="text-h2 font-semibold text-pure-white px-2">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <FeatureTile 
              icon={Shield} 
              label="Safety Tips" 
              variant="success" 
              onClick={() => setCurrentView("safetyTips")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-deep-forest/50 transition-all duration-200"
            />
            <FeatureTile 
              icon={QrCode} 
              label="Digital ID" 
              variant="info" 
              onClick={() => setCurrentView("digitalId")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-soft-green/50 transition-all duration-200"
            />
            <FeatureTile 
              icon={History} 
              label="History" 
              variant="accent" 
              onClick={() => setCurrentView("history")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-soft-green/50 transition-all duration-200"
            />
            <FeatureTile 
              icon={Calendar} 
              label="Events" 
              variant="warning" 
              onClick={() => setCurrentView("events")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-amber-warning/50 transition-all duration-200"
            />
            <FeatureTile 
              icon={MapPin} 
              label="Explore" 
              variant="primary" 
              onClick={() => setCurrentView("explore")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-deep-forest/50 transition-all duration-200"
            />
            <FeatureTile 
              icon={Settings} 
              label="Settings" 
              variant="info" 
              onClick={() => setCurrentView("settings")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-neutral-gray/50 transition-all duration-200"
            />
            <FeatureTile 
              icon={Phone} 
              label="Emergency" 
              variant="destructive" 
              onClick={() => setCurrentView("panicFlow")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-danger/50 transition-all duration-200"
            />
          </div>
        </div>

        {/* Attractions */}
        <div className="space-y-4">
          <h2 className="text-h2 font-semibold text-pure-white px-2">Attractions</h2>
          <AttractionsCarousel />
        </div>
      </div>

      {/* Panic Button */}
      <PanicButton onEmergency={() => setCurrentView("panicFlow")} />
      
      {/* Geo-fence Alert Modal */}
      {geoFenceAlert && (
        <GeoFenceAlert
          alert={geoFenceAlert}
          onDismiss={(action) => {
            console.log("Geo-fence action:", action);
            setGeoFenceAlert(null);
          }}
        />
      )}
    </div>
  );
};

export { MobileApp };