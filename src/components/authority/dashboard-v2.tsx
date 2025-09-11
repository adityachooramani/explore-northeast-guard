import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InteractiveMap } from "@/components/authority/interactive-map";
import { 
  MapPin, 
  Users, 
  AlertTriangle, 
  Shield,
  Phone,
  Clock,
  Filter,
  RefreshCw,
  Monitor,
  Activity,
  BarChart3,
  Settings,
  Radio,
  Building2,
  Smartphone,
  Brain,
  Wifi,
  Bell,
  User,
  Search,
  Plus
} from "lucide-react";

const incidents = [
  {
    id: "INC-2024-001",
    type: "Medical Emergency",
    location: "Tawang Monastery, Arunachal Pradesh",
    tourist: "Sarah Johnson (UK)",
    priority: "critical",
    time: "2 min ago",
    status: "dispatched",
    coordinates: [27.5844, 91.8597],
    eta: "12 min"
  },
  {
    id: "INC-2024-002", 
    type: "Lost Tourist",
    location: "Kaziranga National Park",
    tourist: "Raj Patel (Mumbai)",
    priority: "urgent",
    time: "15 min ago", 
    status: "investigating",
    coordinates: [26.5775, 93.1733],
    eta: "8 min"
  },
  {
    id: "INC-2024-003",
    type: "Weather Alert",
    location: "Shillong Peak",
    tourist: "Multiple (14 tourists)",
    priority: "info",
    time: "1 hour ago",
    status: "monitoring",
    coordinates: [25.5669, 91.8800],
    eta: null
  }
];

const tourists = [
  { id: "T001", name: "Sarah Johnson", location: "Tawang", status: "critical", lastSeen: "2 min ago", nationality: "UK" },
  { id: "T002", name: "Raj Patel", location: "Kaziranga", status: "urgent", lastSeen: "15 min ago", nationality: "India" },
  { id: "T003", name: "Maya Singh", location: "Shillong", status: "ok", lastSeen: "5 min ago", nationality: "India" },
  { id: "T004", name: "John Wilson", location: "Guwahati", status: "ok", lastSeen: "1 min ago", nationality: "USA" },
  { id: "T005", name: "Li Wei", location: "Mawlynnong", status: "ok", lastSeen: "3 min ago", nationality: "China" },
];

const demoStats = {
  touristsOnline: 124,
  incidentsActive: 3,
  avgResponseTimeMin: 4.5,
  alertsToday: 27,
  safetyScore: 92,
  regionsCovered: 8,
  responseTeams: 15,
  emergencyContacts: 247
};

const navigationSections = [
  {
    title: "🗺️ Monitoring",
    items: [
      { id: "live-map", label: "Live Tourist Map", icon: MapPin, active: true },
      { id: "heatmap", label: "Risk Heatmap", icon: Activity },
      { id: "patterns", label: "Movement Patterns", icon: BarChart3 },
    ]
  },
  {
    title: "👮‍♂️ Emergency Ops",
    items: [
      { id: "incidents", label: "Incident Dashboard", icon: AlertTriangle },
      { id: "dispatch", label: "Dispatch Center", icon: Radio },
      { id: "response", label: "Response Teams", icon: Shield },
    ]
  },
  {
    title: "📋 Tourist Management",
    items: [
      { id: "registration", label: "Registration", icon: Users },
      { id: "database", label: "Tourist Database", icon: User },
      { id: "permits", label: "Permits & Docs", icon: Building2 },
    ]
  },
  {
    title: "📊 Analytics",
    items: [
      { id: "predictive", label: "Predictive Analytics", icon: Brain },
      { id: "reports", label: "Reports & Insights", icon: BarChart3 },
    ]
  },
  {
    title: "🏛️ Govt Integration",
    items: [
      { id: "agencies", label: "Multi-Agency Hub", icon: Building2 },
      { id: "compliance", label: "Compliance Monitor", icon: Shield },
    ]
  },
  {
    title: "📱 Communication",
    items: [
      { id: "notifications", label: "Tourist Notifications", icon: Smartphone },
      { id: "training", label: "Staff Training", icon: Monitor },
    ]
  },
  {
    title: "⚙️ System Admin",
    items: [
      { id: "users", label: "User Management", icon: Users },
      { id: "config", label: "System Config", icon: Settings },
    ]
  },
  {
    title: "📈 Advanced Intelligence",
    items: [
      { id: "ai-console", label: "AI/ML Console", icon: Brain },
      { id: "iot", label: "IoT Integration", icon: Wifi },
    ]
  }
];

const AuthorityDashboardV2 = () => {
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);
  const [activeTab, setActiveTab] = useState("incidents");
  const [activeNavItem, setActiveNavItem] = useState("live-map");
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const handleMarkerSelect = (markerId: string) => {
    setSelectedMarkerId(markerId);
  };

  const renderMainContent = () => {
    switch (activeNavItem) {
      case "live-map":
        return (
          <div className="h-full">
            <InteractiveMap
              selectedMarkerId={selectedMarkerId}
              onMarkerSelect={handleMarkerSelect}
              showHeatmap={true}
              showRiskZones={true}
            />
          </div>
        );
      default:
        return (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
            <div className="text-center">
              <Monitor className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {navigationSections
                  .flatMap(s => s.items)
                  .find(item => item.id === activeNavItem)?.label || "Feature"}
              </h3>
              <p className="text-muted-foreground max-w-md">
                This feature is under development. The live map above demonstrates 
                real-time tourist tracking and incident management capabilities.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <div className="bg-white border-b border-border p-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Authority Command & Control Dashboard</h1>
                <p className="text-sm text-muted-foreground">Northeast India Tourist Safety Platform v2.0</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>System Online</span>
              </div>
              <div className="text-muted-foreground">
                Last sync: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts ({demoStats.alertsToday})
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-semibold">{demoStats.touristsOnline}</span>
            <span className="text-sm text-muted-foreground">Tourists Online</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-danger" />
            <span className="font-semibold">{demoStats.incidentsActive}</span>
            <span className="text-sm text-muted-foreground">Active Incidents</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-success" />
            <span className="font-semibold">{demoStats.avgResponseTimeMin}min</span>
            <span className="text-sm text-muted-foreground">Avg Response</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-semibold">{demoStats.safetyScore}%</span>
            <span className="text-sm text-muted-foreground">Safety Score</span>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Side Navigation */}
        <div className="w-64 bg-white border-r border-border overflow-y-auto">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search features..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <nav className="pb-4">
            {navigationSections.map((section) => (
              <div key={section.title} className="mb-6">
                <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveNavItem(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-secondary/50 transition-colors ${
                          activeNavItem === item.id ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                        {item.active && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            Live
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Content */}
          <div className="flex-1">
            {renderMainContent()}
          </div>

          {/* Right Panel - Context Sidebar */}
          <div className="w-80 bg-white border-l border-border flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <div className="border-b border-border p-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="incidents">Incidents</TabsTrigger>
                  <TabsTrigger value="tourists">Tourists</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="incidents" className="px-4 pb-4 space-y-4 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Active Incidents</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
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
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{incident.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {incident.status}
                        </Badge>
                        {incident.eta && (
                          <span className="text-xs text-primary font-medium">
                            ETA: {incident.eta}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="tourists" className="px-4 pb-4 space-y-4 flex-1 overflow-y-auto">
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
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {tourist.nationality}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {tourist.id}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            {/* Incident Details Panel */}
            {activeTab === "incidents" && (
              <div className="border-t p-4">
                <h4 className="font-semibold mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <Button className="w-full justify-start" size="sm" variant="default">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Tourist
                  </Button>
                  <Button className="w-full justify-start" size="sm" variant="outline">
                    <Radio className="h-4 w-4 mr-2" />
                    Dispatch Team
                  </Button>
                  <Button className="w-full justify-start" size="sm" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Escalate Priority
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AuthorityDashboardV2 };