import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Users, 
  AlertTriangle, 
  Shield,
  Phone,
  Clock,
  Filter,
  RefreshCw
} from "lucide-react";

const incidents = [
  {
    id: "INC-001",
    type: "Medical Emergency",
    location: "Tawang Monastery, Arunachal Pradesh",
    tourist: "Sarah Johnson",
    priority: "critical",
    time: "2 min ago",
    status: "active",
    coordinates: [27.5844, 91.8597]
  },
  {
    id: "INC-002", 
    type: "Lost Tourist",
    location: "Kaziranga National Park",
    tourist: "Raj Patel",
    priority: "urgent",
    time: "15 min ago", 
    status: "assigned",
    coordinates: [26.5775, 93.1733]
  },
  {
    id: "INC-003",
    type: "Weather Alert",
    location: "Shillong Peak",
    tourist: "Multiple",
    priority: "info",
    time: "1 hour ago",
    status: "monitoring",
    coordinates: [25.5669, 91.8800]
  }
];

const tourists = [
  { id: "T001", name: "Sarah Johnson", location: "Tawang", status: "critical", lastSeen: "2 min ago" },
  { id: "T002", name: "Raj Patel", location: "Kaziranga", status: "urgent", lastSeen: "15 min ago" },
  { id: "T003", name: "Maya Singh", location: "Shillong", status: "ok", lastSeen: "5 min ago" },
  { id: "T004", name: "John Wilson", location: "Guwahati", status: "ok", lastSeen: "1 min ago" },
];

const AuthorityDashboard = () => {
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);
  const [activeTab, setActiveTab] = useState("incidents");

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <div className="bg-white border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Authority Dashboard</h1>
              <p className="text-sm text-muted-foreground">Northeast India Tourist Safety Command</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StatusChip variant="ok">System Online</StatusChip>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Incidents & Controls */}
        <div className="w-80 bg-white border-r border-border flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="grid w-full grid-cols-2 m-4">
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
              <TabsTrigger value="tourists">Tourists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="incidents" className="px-4 pb-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Active Incidents</h3>
                <Button variant="outline" size="sm">
                  <Filter className="h-3 w-3" />
                </Button>
              </div>
              
              {incidents.map((incident) => (
                <Card 
                  key={incident.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedIncident.id === incident.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedIncident(incident)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <StatusChip variant={incident.priority as any}>
                          {incident.priority === 'critical' ? 'Critical' : 
                           incident.priority === 'urgent' ? 'Urgent' : 
                           incident.priority === 'info' ? 'Info' : 'Status'}
                        </StatusChip>
                        <Badge variant="outline" className="text-xs">
                          {incident.id}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{incident.time}</span>
                    </div>
                    
                    <h4 className="font-medium text-sm mb-1">{incident.type}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Tourist: {incident.tourist}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{incident.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="tourists" className="px-4 pb-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Active Tourists</h3>
                <span className="text-sm text-muted-foreground">{tourists.length} online</span>
              </div>
              
              {tourists.map((tourist) => (
                <Card key={tourist.id} className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{tourist.name}</h4>
                      <StatusChip variant={tourist.status as any}>
                        {tourist.status === 'critical' ? 'Critical' : 
                         tourist.status === 'urgent' ? 'Urgent' : 
                         tourist.status === 'ok' ? 'Safe' : 'Status'}
                      </StatusChip>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {tourist.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Last seen {tourist.lastSeen}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Center - Map */}
        <div className="flex-1 relative">
          <Card className="h-full rounded-none border-0">
            <CardContent className="p-0 h-full">
              <div className="h-full bg-gradient-to-br from-primary/5 to-accent/5 relative">
                {/* Simulated map with markers */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground max-w-md">
                      Real-time tracking of tourists and incidents across Northeast India.
                      Heatmap overlay shows risk levels and safety zones.
                    </p>
                  </div>
                </div>
                
                {/* Map controls */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-card p-4">
                  <h4 className="font-semibold text-sm mb-2">Map Layers</h4>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      Tourist Locations
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      Risk Heatmap
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Weather Layer
                    </label>
                  </div>
                </div>
                
                {/* Live stats */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-card p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{tourists.length}</div>
                      <div className="text-xs text-muted-foreground">Active Tourists</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-danger">{incidents.filter(i => i.status === 'active').length}</div>
                      <div className="text-xs text-muted-foreground">Active Incidents</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Incident Details */}
        <div className="w-80 bg-white border-l border-border">
          <Card className="h-full rounded-none border-0">
            <CardHeader>
              <CardTitle className="text-lg">Incident Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{selectedIncident.id}</Badge>
                  <StatusChip variant={selectedIncident.priority as any}>
                    {selectedIncident.priority === 'critical' ? 'Critical' : 
                     selectedIncident.priority === 'urgent' ? 'Urgent' : 
                     selectedIncident.priority === 'info' ? 'Info' : 'Status'}
                  </StatusChip>
                </div>
                
                <h3 className="font-semibold mb-2">{selectedIncident.type}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Reported {selectedIncident.time}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">TOURIST</label>
                    <p className="text-sm">{selectedIncident.tourist}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">LOCATION</label>
                    <p className="text-sm">{selectedIncident.location}</p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">STATUS</label>
                    <p className="text-sm capitalize">{selectedIncident.status}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="default">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Tourist
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Dispatch Team
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Escalate Priority
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-2">Timeline</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-danger rounded-full mt-2 shrink-0"></div>
                    <div>
                      <p className="font-medium">Incident reported</p>
                      <p className="text-xs text-muted-foreground">{selectedIncident.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2 shrink-0"></div>
                    <div>
                      <p className="font-medium">Team dispatched</p>
                      <p className="text-xs text-muted-foreground">1 min ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { AuthorityDashboard };