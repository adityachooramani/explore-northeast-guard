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
      <div className="min-h-screen bg-background">
        <HeroCard 
          image={buddhaHero} 
          alt="Buddha statue overlooking green hillside"
          height="xl"
          className="min-h-screen rounded-none"
        >
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">NorthEast Safe</h1>
            <p className="text-lg mb-8 opacity-90">Explore safe. Explore Northeast.</p>
            <Button 
              onClick={() => setCurrentView("home")}
              size="lg"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
            >
              Get Started
            </Button>
            <p className="text-xs mt-4 opacity-75">
              Your safety companion for Northeast India
            </p>
          </div>
        </HeroCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold">NorthEast Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusChip variant="ok">Safe Zone</StatusChip>
            <Button variant="ghost" size="icon" onClick={() => setCurrentView("profile")}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Check-in Button */}
      <CheckInButton />

      {/* Map Section */}
      <Card className="mx-4 mt-4 overflow-hidden">
        <CardContent className="p-0">
          <MockMap />
        </CardContent>
      </Card>

      {/* Feature Grid */}
      <div className="grid grid-cols-3 gap-2.5 p-4">
        <FeatureTile 
          icon={Shield} 
          label="Safety Tips" 
          variant="success" 
          onClick={() => console.log("Safety Tips tapped")}
        />
        <FeatureTile 
          icon={User} 
          label="Local Help" 
          variant="info" 
          onClick={() => console.log("Local Help tapped")}
        />
        <FeatureTile 
          icon={Car} 
          label="Transport" 
          variant="accent" 
          onClick={() => console.log("Transport booking tapped")}
        />
        <FeatureTile 
          icon={Calendar} 
          label="Events" 
          variant="warning" 
          onClick={() => console.log("Events & Tickets tapped")}
        />
        <FeatureTile 
          icon={MapPin} 
          label="Explore" 
          variant="primary" 
          onClick={() => console.log("Explore tapped")}
        />
        <FeatureTile 
          icon={Phone} 
          label="Emergency" 
          variant="destructive" 
          onClick={() => console.log("Emergency tapped")}
        />
      </div>

      {/* Attractions */}
      <AttractionsCarousel />

      {/* Panic Button */}
      <PanicButton />

      {/* Bottom spacing for floating button */}
      <div className="h-24"></div>
    </div>
  );
};

export { MobileApp };