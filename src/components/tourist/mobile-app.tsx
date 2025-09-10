import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroCard } from "@/components/ui/hero-card";
import { PanicButton } from "@/components/ui/panic-button";
import { CheckInButton } from "@/components/tourist/check-in-button";
import { AttractionsCarousel } from "@/components/tourist/attractions-carousel";
import { StatusChip } from "@/components/ui/status-chip";
import { User, Menu, Shield, Heart } from "lucide-react";
import buddhaHero from "@/assets/buddha-hero.jpg";

const MobileApp = () => {
  const [currentView, setCurrentView] = useState<"splash" | "home">("splash");

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
            <Button variant="ghost" size="icon">
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
          <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 relative">
            {/* Simulated map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse mb-2 mx-auto"></div>
                <p className="text-sm text-muted-foreground">Live Location</p>
                <p className="text-xs text-muted-foreground mt-1">Guwahati, Assam</p>
              </div>
            </div>
            
            {/* Heatmap indicators */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-success/60"></div>
                <span>Low Risk</span>
              </div>
            </div>
            
            {/* Safety score */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Safety: 92%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <Card className="hover:shadow-card transition-all cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-medium text-sm">Safety Tips</h3>
            <p className="text-xs text-muted-foreground mt-1">Local guidelines</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card transition-all cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <User className="h-6 w-6 text-info" />
            </div>
            <h3 className="font-medium text-sm">Local Help</h3>
            <p className="text-xs text-muted-foreground mt-1">Verified guides</p>
          </CardContent>
        </Card>
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