import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Shield, AlertTriangle } from "lucide-react";

const MockMap = () => {
  const [currentLocation] = useState({ lat: 26.2006, lng: 92.9376 });
  
  // Mock tourist locations with real Northeast India coordinates
  const touristLocations = [
    { id: 1, lat: 26.2006, lng: 92.9376, name: "Guwahati", count: 45, status: "safe" },
    { id: 2, lat: 25.5788, lng: 91.8933, name: "Shillong", count: 32, status: "safe" },
    { id: 3, lat: 27.0238, lng: 93.6053, name: "Itanagar", count: 18, status: "warning" },
    { id: 4, lat: 27.533, lng: 88.5122, name: "Gangtok", count: 25, status: "safe" }
  ];

  const geoFenceZones = [
    { id: 1, lat: 26.15, lng: 92.85, radius: 15, type: "landslide", severity: "high" },
    { id: 2, lat: 25.55, lng: 91.85, radius: 10, type: "flood", severity: "medium" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "text-soft-green";
      case "warning": return "text-amber-warning";
      case "danger": return "text-danger";
      default: return "text-neutral-gray";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-danger bg-danger/20";
      case "medium": return "border-amber-warning bg-amber-warning/20";
      case "low": return "border-soft-green bg-soft-green/20";
      default: return "border-neutral-gray bg-neutral-gray/20";
    }
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-deep-forest via-primary-dark to-card rounded-lg overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-mesh"></div>
      </div>
      
      {/* Current Location */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="relative">
          <div className="w-4 h-4 bg-soft-green rounded-full border-2 border-pure-white shadow-lg animate-pulse"></div>
          <div className="absolute -inset-2 border-2 border-soft-green/50 rounded-full animate-ping"></div>
          <div className="absolute -inset-4 border border-soft-green/30 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Tourist Locations */}
      {touristLocations.map((location, index) => (
        <div
          key={location.id}
          className="absolute z-10 animate-fade-in"
          style={{
            left: `${20 + (index * 15)}%`,
            top: `${15 + (index * 12)}%`,
            animationDelay: `${index * 200}ms`
          }}
        >
          <div className="flex flex-col items-center">
            <div className={`p-1.5 rounded-full bg-card/80 backdrop-blur-sm border ${getStatusColor(location.status)} hover:scale-110 transition-transform duration-200`}>
              <MapPin className={`h-3 w-3 ${getStatusColor(location.status)}`} />
            </div>
            <Badge 
              variant="secondary" 
              className="mt-1 text-xs bg-card/90 text-pure-white border-neutral-gray/30 backdrop-blur-sm"
            >
              {location.count}
            </Badge>
          </div>
        </div>
      ))}

      {/* Geo-fence Zones */}
      {geoFenceZones.map((zone, index) => (
        <div
          key={zone.id}
          className={`absolute rounded-full border-2 border-dashed opacity-60 animate-pulse ${getSeverityColor(zone.severity)}`}
          style={{
            left: `${30 + (index * 25)}%`,
            top: `${25 + (index * 20)}%`,
            width: `${zone.radius * 2}px`,
            height: `${zone.radius * 2}px`,
            animationDelay: `${index * 300}ms`
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <AlertTriangle className="h-3 w-3 text-current" />
          </div>
        </div>
      ))}

      {/* Map Legend */}
      <div className="absolute bottom-2 left-2 flex gap-2 z-30">
        <Badge variant="secondary" className="text-xs bg-card/90 text-pure-white border-neutral-gray/30 backdrop-blur-sm">
          <Navigation className="h-2.5 w-2.5 mr-1" />
          Live
        </Badge>
        <Badge variant="secondary" className="text-xs bg-card/90 text-soft-green border-soft-green/30 backdrop-blur-sm">
          <Shield className="h-2.5 w-2.5 mr-1" />
          Safe Zones
        </Badge>
      </div>

      {/* Accuracy Circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-16 h-16 border border-soft-green/30 rounded-full animate-pulse"></div>
      </div>

      {/* OpenStreetMap Attribution */}
      <div className="absolute bottom-1 right-2 text-xs text-neutral-gray/60 bg-card/50 px-1 rounded backdrop-blur-sm">
        OSM
      </div>
    </div>
  );
};

export { MockMap };