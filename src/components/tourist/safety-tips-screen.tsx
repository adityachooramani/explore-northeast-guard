import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, AlertTriangle, Phone, Map, Heart } from "lucide-react";

interface SafetyTipsScreenProps {
  onBack: () => void;
}

const SafetyTipsScreen = ({ onBack }: SafetyTipsScreenProps) => {
  const safetyTips = [
    {
      icon: Phone,
      title: "Emergency Contacts",
      tip: "Always inform your emergency contact before heading out.",
      priority: "high"
    },
    {
      icon: AlertTriangle,
      title: "Night Travel",
      tip: "Avoid traveling alone at night in remote areas.",
      priority: "high"
    },
    {
      icon: Heart,
      title: "Health & Hydration",
      tip: "Stay hydrated and carry local emergency helplines.",
      priority: "medium"
    },
    {
      icon: Map,
      title: "Cultural Respect",
      tip: "Follow local cultural norms and respect traditions.",
      priority: "medium"
    },
    {
      icon: Shield,
      title: "Panic Button",
      tip: "Use the Panic Button if you feel unsafe.",
      priority: "critical"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-danger border-danger/30 bg-danger/10";
      case "high": return "text-amber-warning border-amber-warning/30 bg-amber-warning/10";
      default: return "text-soft-green border-soft-green/30 bg-soft-green/10";
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark text-pure-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-primary-dark/95 backdrop-blur-md border-b border-neutral-gray/20">
        <div className="flex items-center gap-4 p-4 max-w-md mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="button-touch hover:bg-neutral-gray/10 text-pure-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-h1 font-bold text-pure-white">Safety Tips</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <p className="text-body text-neutral-gray mb-6">
          Essential safety guidelines for exploring Northeast India
        </p>

        {safetyTips.map((tip, index) => (
          <Card 
            key={index} 
            className={`bg-card border transition-all duration-200 hover:scale-[1.02] animate-fade-in ${getPriorityColor(tip.priority)}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-h2">
                <tip.icon className="h-5 w-5" />
                {tip.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-body text-pure-white/90">{tip.tip}</p>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-gradient-surface border-deep-forest/30 mt-8">
          <CardHeader>
            <CardTitle className="text-h2 text-deep-forest flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Emergency Numbers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-small text-pure-white/75">Police</span>
              <span className="text-body font-medium text-pure-white">100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-small text-pure-white/75">Ambulance</span>
              <span className="text-body font-medium text-pure-white">108</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-small text-pure-white/75">Tourist Helpline</span>
              <span className="text-body font-medium text-pure-white">1363</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { SafetyTipsScreen };