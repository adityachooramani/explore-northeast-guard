import { useState, useEffect } from "react";
import { MapPin, Locate, Layers, Heart, AlertTriangle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";
import { OSMMap, type OSMMarker } from "@/components/ui/osm-map";

interface MapMarker {
  id: string;
  label: string;
  lat: number;
  lng: number;
  type: "city" | "tourist" | "incident" | "risk_zone";
  status?: "safe" | "warning" | "emergency" | "restricted";
  details?: string;
  radius_km?: number;
}

const demoMarkers: MapMarker[] = [
  // Cities
  { id: "c1", label: "Guwahati", lat: 26.1445, lng: 91.7362, type: "city" },
  { id: "c2", label: "Shillong", lat: 25.5788, lng: 91.8933, type: "city" },
  { id: "c3", label: "Tawang", lat: 27.5860, lng: 92.1910, type: "city" },
  { id: "c4", label: "Kaziranga", lat: 26.5775, lng: 93.1733, type: "city" },

  // Tourists
  { id: "t1", label: "Tourist A", lat: 26.1445, lng: 91.7362, type: "tourist", status: "safe", details: "Last seen: 2 min ago" },
  { id: "t2", label: "Tourist B", lat: 25.5788, lng: 91.8933, type: "tourist", status: "warning", details: "Missed check-in: 45 min ago" },
  { id: "t3", label: "Tourist C", lat: 27.5860, lng: 92.1910, type: "tourist", status: "emergency", details: "Panic button activated" },
  { id: "t4", label: "Tourist D", lat: 25.2909, lng: 91.7126, type: "tourist", status: "safe", details: "Last seen: 5 min ago" },

  // Risk Zones
  { id: "rz1", label: "Flood-prone Zone", lat: 25.2787, lng: 91.7110, type: "risk_zone", status: "warning", radius_km: 10 },
  { id: "rz2", label: "Restricted Border Area", lat: 27.6167, lng: 93.8333, type: "risk_zone", status: "restricted", radius_km: 15 },
];

interface InteractiveMapProps {
  selectedMarkerId?: string;
  onMarkerSelect?: (markerId: string) => void;
  showHeatmap?: boolean;
  showRiskZones?: boolean;
}

const InteractiveMap = ({ 
  selectedMarkerId, 
  onMarkerSelect, 
  showHeatmap = true, 
  showRiskZones = true 
}: InteractiveMapProps) => {
  const [activeMarker, setActiveMarker] = useState<string | null>(selectedMarkerId || null);
  const [demoTime, setDemoTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [timeSlider, setTimeSlider] = useState(100);
  const [showLegend, setShowLegend] = useState(true);
  const [layerStates, setLayerStates] = useState({
    tourists: true,
    heatmap: showHeatmap,
    riskZones: showRiskZones,
    weather: true,
    terrain: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoTime(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkerClick = (markerId: string) => {
    setActiveMarker(activeMarker === markerId ? null : markerId);
    onMarkerSelect?.(markerId);
  };

  const getMarkerColor = (marker: MapMarker) => {
    if (marker.type === "tourist") {
      switch (marker.status) {
        case "emergency": return "bg-danger text-white";
        case "warning": return "bg-warning text-white";
        case "safe": return "bg-success text-white";
        default: return "bg-primary text-white";
      }
    }
    if (marker.type === "risk_zone") {
      switch (marker.status) {
        case "restricted": return "bg-destructive text-white";
        case "warning": return "bg-warning text-white";
        default: return "bg-muted text-muted-foreground";
      }
    }
    if (marker.type === "city") return "bg-accent text-white";
    return "bg-muted text-muted-foreground";
  };

  const getMarkerIcon = (marker: MapMarker) => {
    switch (marker.type) {
      case "tourist": return MapPin;
      case "risk_zone": return AlertTriangle;
      case "city": return Shield;
      default: return MapPin;
    }
  };

  const layerToggle = (layer: keyof typeof layerStates) => {
    setLayerStates(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const touristCount = demoMarkers.filter(m => m.type === "tourist").length;
  const emergencyCount = demoMarkers.filter(m => m.type === "tourist" && m.status === "emergency").length;
  const warningCount = demoMarkers.filter(m => m.type === "tourist" && m.status === "warning").length;

  const center: [number, number] = [26.2006, 92.9376];

  const osmMarkers: OSMMarker[] = demoMarkers.map((m) => ({
    id: m.id,
    position: [m.lat, m.lng],
    label: `${m.label}${m.status ? ` (${m.status})` : ""}`,
    details: m.details,
    radiusMeters: m.type === "risk_zone" && m.radius_km ? m.radius_km * 1000 : undefined,
  }));

  return (
    <div className="h-full bg-gradient-to-br from-primary/5 to-accent/10 relative overflow-hidden">
      {/* Demo Badge */}
      <Badge variant="secondary" className="absolute top-4 left-4 z-20 text-xs">
        LIVE DEMO - Northeast India
      </Badge>

      {/* Search Bar */}
      <Card className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-80">
        <CardContent className="p-3">
          <input
            type="text"
            placeholder="Search tourists, locations, incidents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </CardContent>
      </Card>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-20 space-y-2">
        <Button variant="secondary" size="icon" className="h-8 w-8">
          <Locate className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => setShowLegend(!showLegend)}>
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Layer Controls & Filter Panel */}
      <Card className="absolute top-20 right-4 z-20 w-64">
        <CardContent className="p-3">
          <h4 className="font-semibold text-sm mb-3">Filter & Layers</h4>
          
          {/* Time Slider */}
          <div className="mb-4">
            <label className="text-xs font-medium">Time Range</label>
            <input
              type="range"
              min="0"
              max="100"
              value={timeSlider}
              onChange={(e) => setTimeSlider(Number(e.target.value))}
              className="w-full mt-1"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>24h ago</span>
              <span>Live</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded" 
                checked={layerStates.tourists}
                onChange={() => layerToggle('tourists')}
              />
              🧳 Tourist Locations
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded" 
                checked={layerStates.heatmap}
                onChange={() => layerToggle('heatmap')}
              />
              🔥 Tourist Density Heatmap
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded" 
                checked={layerStates.riskZones}
                onChange={() => layerToggle('riskZones')}
              />
              ⚠️ Risk Zones
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded" 
                checked={layerStates.weather}
                onChange={() => layerToggle('weather')}
              />
              🌦️ Weather Layer
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded" 
                checked={layerStates.terrain}
                onChange={() => layerToggle('terrain')}
              />
              🏔️ Terrain & Satellite
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      {showLegend && (
        <Card className="absolute top-20 left-4 z-20 w-48">
          <CardContent className="p-3">
            <h4 className="font-semibold text-sm mb-3">Legend</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span>Safe Tourist</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span>Warning Status</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger animate-pulse"></div>
                <span>Emergency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-accent"></div>
                <span>City/POI</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-danger border-dashed rounded"></div>
                <span>Risk Zone</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* OSM Map */}
      <div className="absolute inset-0">
        <OSMMap center={center} zoom={6} markers={osmMarkers} />
      </div>

      {/* Tourist Markers */}
      {layerStates.tourists && demoMarkers
        .filter(m => m.type === "tourist" || m.type === "city")
        .map((marker) => {
          const Icon = getMarkerIcon(marker);
          return (
            <div
              key={marker.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 z-10 ${
                activeMarker === marker.id ? "z-30" : ""
              } ${marker.type === "tourist" && marker.status === "emergency" ? "animate-pulse" : ""}`}
              style={{
                left: `${((marker.lng - 90) / 5) * 100 + 20}%`,
                top: `${((28 - marker.lat) / 5) * 100 + 20}%`,
              }}
              onClick={() => handleMarkerClick(marker.id)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${getMarkerColor(marker)}`}>
                <Icon className="h-4 w-4" />
              </div>
              
              {/* Status indicator ring for emergency */}
              {marker.type === "tourist" && marker.status === "emergency" && (
                <div className="absolute inset-0 w-8 h-8 rounded-full border-2 border-danger animate-ping"></div>
              )}
              
              {/* Marker Popup */}
              {activeMarker === marker.id && (
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl border z-40">
                  <div className="text-center">
                    <p className="font-semibold">{marker.label}</p>
                    {marker.status && (
                      <StatusChip variant={marker.status as any} className="mt-1 text-xs">
                        {marker.status.charAt(0).toUpperCase() + marker.status.slice(1)}
                      </StatusChip>
                    )}
                    {marker.details && (
                      <p className="text-muted-foreground mt-1">{marker.details}</p>
                    )}
                    {marker.type === "tourist" && (
                      <p className="text-muted-foreground">Updated: {demoTime.toLocaleTimeString()}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {/* Risk Zone Markers */}
      {layerStates.riskZones && demoMarkers
        .filter(m => m.type === "risk_zone")
        .map((marker) => {
          const Icon = getMarkerIcon(marker);
          return (
            <div
              key={marker.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 z-10 ${
                activeMarker === marker.id ? "z-30" : ""
              }`}
              style={{
                left: `${((marker.lng - 90) / 5) * 100 + 20}%`,
                top: `${((28 - marker.lat) / 5) * 100 + 20}%`,
              }}
              onClick={() => handleMarkerClick(marker.id)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${getMarkerColor(marker)}`}>
                <Icon className="h-3 w-3" />
              </div>
              
              {/* Zone Popup */}
              {activeMarker === marker.id && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl border z-40">
                  <div className="text-center">
                    <p className="font-semibold">{marker.label}</p>
                    <StatusChip variant={marker.status as any} className="mt-1 text-xs">
                      {marker.status?.charAt(0).toUpperCase() + marker.status?.slice(1)}
                    </StatusChip>
                    {marker.radius_km && (
                      <p className="text-muted-foreground mt-1">Radius: {marker.radius_km}km</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {/* Live Statistics */}
      <Card className="absolute bottom-4 left-4 z-20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{touristCount}</div>
              <div className="text-xs text-muted-foreground">Active Tourists</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-danger">{emergencyCount}</div>
              <div className="text-xs text-muted-foreground">Emergencies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">{warningCount}</div>
              <div className="text-xs text-muted-foreground">Warnings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">92%</div>
              <div className="text-xs text-muted-foreground">Safety Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Time Display */}
      <Badge variant="outline" className="absolute bottom-4 right-4 z-20 bg-white/90">
        Last Update: {demoTime.toLocaleTimeString()}
      </Badge>
    </div>
  );
};

export { InteractiveMap };