import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MobileApp } from "@/components/tourist/mobile-app";
import { AuthorityDashboard } from "@/components/authority/dashboard";
import { Smartphone, Monitor } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<"selector" | "mobile" | "dashboard">("selector");

  if (currentView === "mobile") {
    return <MobileApp />;
  }

  if (currentView === "dashboard") {
    return <AuthorityDashboard />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">NorthEast Safe</h1>
          <p className="text-xl text-muted-foreground mb-2">Tourist Safety Platform</p>
          <p className="text-muted-foreground">
            Comprehensive safety solution for tourists exploring Northeast India, 
            with emergency features and authority monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-card transition-all cursor-pointer group" onClick={() => setCurrentView("mobile")}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Tourist Mobile App</h2>
              <p className="text-muted-foreground mb-4">
                Safety-first mobile interface with emergency features, live check-ins, 
                and local attraction recommendations.
              </p>
              <Button className="w-full">
                Launch Mobile App
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card transition-all cursor-pointer group" onClick={() => setCurrentView("dashboard")}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Monitor className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Authority Dashboard</h2>
              <p className="text-muted-foreground mb-4">
                Professional monitoring interface for authorities to track tourists, 
                manage incidents, and coordinate emergency responses.
              </p>
              <Button variant="outline" className="w-full">
                Open Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            ✨ Features: Emergency panic button, live location tracking, weather alerts, 
            verified local helpers, and real-time incident management
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
