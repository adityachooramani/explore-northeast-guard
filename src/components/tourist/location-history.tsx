import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft, MapPin, Clock, Shield, AlertTriangle, CheckCircle, Download, Map } from "lucide-react";
import { MockMap } from "@/components/ui/mock-map";

interface LocationHistoryProps {
  onBack: () => void;
}

const LocationHistory = ({ onBack }: LocationHistoryProps) => {
  const [showMap, setShowMap] = useState(false);

  const historyItems = [
    {
      id: 1,
      time: "09:30 AM",
      location: "Guwahati Railway Station",
      type: "check-in",
      status: "safe",
      coordinates: { lat: 26.1445, lng: 91.7362 }
    },
    {
      id: 2,
      time: "10:15 AM", 
      location: "Kamakhya Temple",
      type: "visit",
      status: "safe",
      coordinates: { lat: 26.1664, lng: 91.7022 }
    },
    {
      id: 3,
      time: "11:30 AM",
      location: "Urvashi Island",
      type: "geo-fence-alert",
      status: "warning", 
      coordinates: { lat: 26.1445, lng: 91.7362 }
    },
    {
      id: 4,
      time: "12:45 PM",
      location: "Fancy Bazaar",
      type: "check-in", 
      status: "safe",
      coordinates: { lat: 26.1516, lng: 91.7650 }
    },
    {
      id: 5,
      time: "02:20 PM",
      location: "Assam State Museum",
      type: "visit",
      status: "safe", 
      coordinates: { lat: 26.1543, lng: 91.7515 }
    }
  ];

  const getStatusIcon = (type: string, status: string) => {
    if (type === "geo-fence-alert") return <AlertTriangle className="h-4 w-4" />;
    if (status === "safe") return <CheckCircle className="h-4 w-4" />;
    return <MapPin className="h-4 w-4" />;
  };

  const getStatusColor = (type: string, status: string) => {
    if (type === "geo-fence-alert") return "destructive";
    if (status === "safe") return "default";
    return "secondary";
  };

  const getStatusBg = (type: string, status: string) => {
    if (type === "geo-fence-alert") return "bg-danger/10 border-danger/20";
    if (status === "safe") return "bg-deep-forest/10 border-deep-forest/20";
    return "bg-neutral-gray/10 border-neutral-gray/20";
  };

  const handleExportCSV = () => {
    const csvContent = [
      "Time,Location,Type,Status,Coordinates",
      ...historyItems.map(item => 
        `${item.time},"${item.location}",${item.type},${item.status},"${item.coordinates.lat},${item.coordinates.lng}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'location-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-deep-forest/20 rounded-full flex items-center justify-center">
            <Clock className="h-5 w-5 text-deep-forest" />
          </div>
          <div>
            <h1 className="text-h2 font-semibold">Location History</h1>
            <p className="text-small text-neutral-gray">Today's journey</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="border-neutral-gray/20 text-pure-white hover:bg-card/20"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Map Toggle */}
      <div className="p-6 border-b border-neutral-gray/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Map className="h-5 w-5 text-neutral-gray" />
            <Label htmlFor="map-toggle" className="text-body text-pure-white">
              Show on Map
            </Label>
          </div>
          <Switch
            id="map-toggle"
            checked={showMap}
            onCheckedChange={setShowMap}
          />
        </div>
      </div>

      <div className="flex-1">
        {showMap ? (
          <div className="h-64 border-b border-neutral-gray/20">
            <MockMap />
          </div>
        ) : null}

        {/* Timeline */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h2 font-semibold text-pure-white">Today's Activities</h2>
            <Badge variant="outline" className="border-deep-forest/20 text-deep-forest">
              {historyItems.length} entries
            </Badge>
          </div>

          <div className="space-y-4">
            {historyItems.map((item, index) => (
              <Card key={item.id} className={`${getStatusBg(item.type, item.status)} border relative`}>
                {/* Timeline connector */}
                {index < historyItems.length - 1 && (
                  <div className="absolute left-6 top-16 w-px h-6 bg-neutral-gray/20" />
                )}

                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Status icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.type === "geo-fence-alert" 
                        ? "bg-danger/20 text-danger" 
                        : item.status === "safe" 
                          ? "bg-deep-forest/20 text-deep-forest"
                          : "bg-neutral-gray/20 text-neutral-gray"
                    }`}>
                      {getStatusIcon(item.type, item.status)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-body font-medium text-pure-white truncate">
                          {item.location}
                        </h3>
                        <span className="text-small text-neutral-gray whitespace-nowrap ml-2">
                          {item.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={getStatusColor(item.type, item.status) as any}
                          className="text-xs"
                        >
                          {item.type === "geo-fence-alert" ? "Alert" : item.type === "check-in" ? "Check-in" : "Visit"}
                        </Badge>
                        
                        {item.type === "geo-fence-alert" && (
                          <span className="text-xs text-danger">
                            Warning zone entered
                          </span>
                        )}
                      </div>

                      <p className="text-small text-neutral-gray mt-1">
                        {item.coordinates.lat.toFixed(4)}, {item.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card className="bg-gradient-surface border-neutral-gray/20 mt-6">
            <CardHeader>
              <CardTitle className="text-pure-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-deep-forest" />
                Safety Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-h2 font-semibold text-deep-forest">4</div>
                  <div className="text-small text-neutral-gray">Safe Locations</div>
                </div>
                <div>
                  <div className="text-h2 font-semibold text-amber-warning">1</div>
                  <div className="text-small text-neutral-gray">Warnings</div>
                </div>
                <div>
                  <div className="text-h2 font-semibold text-pure-white">5.2 km</div>
                  <div className="text-small text-neutral-gray">Distance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { LocationHistory };