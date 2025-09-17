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
import { User, Menu, Shield, Heart, Car, Calendar, MapPin, Phone } from "lucide-react";
import buddhaHero from "@/assets/buddha-hero.jpg";

const MobileApp = () => {
  const [currentView, setCurrentView] = useState<"splash" | "home" | "profile">("splash");

  if (currentView === "profile") {
    return <ProfileScreen onBack={() => setCurrentView("home")} />;
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
              onClick={() => setCurrentView("home")}
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
              onClick={() => console.log("Safety Tips tapped")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-deep-forest/50 transition-all duration-200"
            />
            <FeatureTile 
              icon={User} 
              label="Local Help" 
              variant="info" 
              onClick={() => console.log("Local Help tapped")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-soft-green/50 transition-all duration-200"
            />
            <FeatureTile 
              icon={Car} 
              label="Transport" 
              variant="accent" 
              onClick={() => console.log("Transport booking tapped")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-soft-green/50 transition-all duration-200"
            />
            <FeatureTile 
              icon={Calendar} 
              label="Events" 
              variant="warning" 
              onClick={() => console.log("Events & Tickets tapped")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-amber-warning/50 transition-all duration-200"
            />
            <FeatureTile 
              icon={MapPin} 
              label="Explore" 
              variant="primary" 
              onClick={() => console.log("Explore tapped")}
              className="touch-target bg-gradient-surface border-neutral-gray/20 hover:border-deep-forest/50 transition-all duration-200"
            />
            <FeatureTile 
              icon={Phone} 
              label="Emergency" 
              variant="destructive" 
              onClick={() => console.log("Emergency tapped")}
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
      <PanicButton />
    </div>
  );
};

export { MobileApp };