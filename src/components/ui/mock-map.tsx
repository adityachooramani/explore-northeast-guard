import { useState, useEffect } from "react";
import { MapPin, Locate, Layers, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MockMarker {
  id: string;
  label: string;
  lat: number;
  lng: number;
  type: "city" | "tourist" | "poi";
}

const mockMarkers: MockMarker[] = [
  { id: "m1", label: "Guwahati", lat: 26.1445, lng: 91.7362, type: "city" },
  { id: "m2", label: "Shillong", lat: 25.5788, lng: 91.8933, type: "city" },
  { id: "m3", label: "Tawang", lat: 27.5860, lng: 92.1910, type: "city" },
  { id: "tourist_123", label: "You", lat: 26.0, lng: 92.0, type: "tourist" },
];

const MockMap = () => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [demoTime, setDemoTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoTime(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
      {/* Demo Badge */}
      <Badge variant="secondary" className="absolute top-2 left-2 z-10 text-xs">
        DEMO
      </Badge>

      {/* Map Controls */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        <Button variant="secondary" size="icon" className="h-8 w-8">
          <Locate className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="h-8 w-8">
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Simple terrain paths */}
          <path d="M0,150 Q100,100 200,120 T400,140" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.3" />
          <path d="M0,200 Q150,160 300,180 T400,190" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none" opacity="0.2" />
        </svg>
      </div>

      {/* Mock Markers */}
      {mockMarkers.map((marker) => (
        <div
          key={marker.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
            activeMarker === marker.id ? "z-20" : "z-10"
          }`}
          style={{
            left: `${((marker.lng - 90) / 4) * 100 + 30}%`,
            top: `${((28 - marker.lat) / 4) * 100 + 30}%`,
          }}
          onClick={() => setActiveMarker(activeMarker === marker.id ? null : marker.id)}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
            marker.type === "tourist" 
              ? "bg-primary text-primary-foreground animate-pulse" 
              : marker.type === "city"
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground"
          }`}>
            <MapPin className="h-3 w-3" />
          </div>
          
          {/* Marker Popup */}
          {activeMarker === marker.id && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs whitespace-nowrap shadow-lg">
              <div className="text-center">
                <p className="font-medium">{marker.label}</p>
                {marker.type === "tourist" && (
                  <p className="text-muted-foreground">Last seen: {demoTime.toLocaleTimeString()}</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Safety Indicators */}
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2 text-xs bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="w-3 h-3 rounded-full bg-success/60"></div>
          <span>Low Risk Zone</span>
        </div>
      </div>

      {/* Safety Score */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-success" />
          <span className="text-sm font-medium">Safety: 92%</span>
        </div>
      </div>
    </div>
  );
};

export { MockMap };