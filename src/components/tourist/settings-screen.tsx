import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  ChevronLeft, 
  Settings, 
  Moon, 
  Wifi, 
  Shield, 
  Bell, 
  HelpCircle, 
  FileText, 
  LogOut,
  ChevronRight
} from "lucide-react";

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const [settings, setSettings] = useState({
    offlineSync: true,
    darkMode: true,
    notifications: true,
    locationSharing: true,
    emergencyAlerts: true,
    voiceRecording: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsGroups = [
    {
      title: "Privacy & Safety",
      icon: <Shield className="h-5 w-5 text-deep-forest" />,
      items: [
        {
          key: "locationSharing" as keyof typeof settings,
          label: "Location Sharing", 
          description: "Share location with emergency services",
          icon: <Shield className="h-4 w-4" />
        },
        {
          key: "emergencyAlerts" as keyof typeof settings,
          label: "Emergency Alerts",
          description: "Receive safety alerts and warnings", 
          icon: <Bell className="h-4 w-4" />
        }
      ]
    },
    {
      title: "App Preferences",
      icon: <Settings className="h-5 w-5 text-neutral-gray" />,
      items: [
        {
          key: "darkMode" as keyof typeof settings,
          label: "Dark Mode",
          description: "Use dark theme throughout the app",
          icon: <Moon className="h-4 w-4" />
        },
        {
          key: "offlineSync" as keyof typeof settings,
          label: "Offline Sync", 
          description: "Sync data when connection is restored",
          icon: <Wifi className="h-4 w-4" />
        },
        {
          key: "notifications" as keyof typeof settings,
          label: "Push Notifications",
          description: "Receive app notifications",
          icon: <Bell className="h-4 w-4" />
        }
      ]
    }
  ];

  const helpItems = [
    { label: "Help & FAQs", icon: <HelpCircle className="h-4 w-4" />, action: () => console.log("Help") },
    { label: "Privacy Policy", icon: <FileText className="h-4 w-4" />, action: () => console.log("Privacy") },
    { label: "Terms of Service", icon: <FileText className="h-4 w-4" />, action: () => console.log("Terms") }
  ];

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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-gray/20 rounded-full flex items-center justify-center">
            <Settings className="h-5 w-5 text-neutral-gray" />
          </div>
          <div>
            <h1 className="text-h2 font-semibold">Settings</h1>
            <p className="text-small text-neutral-gray">App preferences</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Settings Groups */}
        {settingsGroups.map((group) => (
          <Card key={group.title} className="bg-gradient-surface border-neutral-gray/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-pure-white">
                {group.icon}
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-card/50 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={item.key} className="text-body text-pure-white cursor-pointer">
                        {item.label}
                      </Label>
                      <p className="text-small text-neutral-gray">{item.description}</p>
                    </div>
                  </div>
                  <Switch
                    id={item.key}
                    checked={settings[item.key]}
                    onCheckedChange={() => toggleSetting(item.key)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Help & Support */}
        <Card className="bg-gradient-surface border-neutral-gray/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-pure-white">Help & Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {helpItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={item.action}
                className="w-full justify-between text-left h-auto p-4 text-pure-white hover:bg-card/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-card/50 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-body">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-neutral-gray" />
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-gradient-surface border-neutral-gray/20">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <h3 className="text-h2 font-semibold text-pure-white">NEST v1.0.0</h3>
              <p className="text-small text-neutral-gray">
                North East Safe Tourism
              </p>
              <p className="text-xs text-neutral-gray">
                Made with ❤️ for safer travels
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Button
          variant="outline"
          className="w-full border-danger/20 text-danger hover:bg-danger/10 rounded-button"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export { SettingsScreen };