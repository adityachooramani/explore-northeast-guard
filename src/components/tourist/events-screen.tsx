import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, Music } from "lucide-react";

interface EventsScreenProps {
  onBack: () => void;
}

const EventsScreen = ({ onBack }: EventsScreenProps) => {
  const festivals = [
    {
      title: "Hornbill Festival",
      location: "Nagaland",
      month: "December",
      description: "Cultural extravaganza showcasing Naga tribes",
      duration: "10 days",
      highlights: ["Traditional dances", "Handicrafts", "Local cuisine", "Music concerts"],
      status: "upcoming",
      color: "text-soft-green border-soft-green/30 bg-soft-green/10"
    },
    {
      title: "Bihu Festival",
      location: "Assam",
      month: "April",
      description: "Assamese New Year celebration",
      duration: "7 days",
      highlights: ["Folk dances", "Traditional music", "Community feasts", "Cultural programs"],
      status: "seasonal",
      color: "text-amber-warning border-amber-warning/30 bg-amber-warning/10"
    },
    {
      title: "Chapchar Kut",
      location: "Mizoram",
      month: "March",
      description: "Spring festival of joy and harvest",
      duration: "3 days",
      highlights: ["Bamboo dances", "Traditional games", "Community celebrations", "Local delicacies"],
      status: "seasonal",
      color: "text-soft-green border-soft-green/30 bg-soft-green/10"
    },
    {
      title: "Losar Festival",
      location: "Arunachal Pradesh",
      month: "February",
      description: "Tibetan New Year celebration",
      duration: "15 days",
      highlights: ["Monastery visits", "Prayer ceremonies", "Traditional foods", "Cultural performances"],
      status: "seasonal",
      color: "text-deep-forest border-deep-forest/30 bg-deep-forest/10"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="secondary" className="bg-soft-green/20 text-soft-green border-soft-green/50">Upcoming</Badge>;
      case "seasonal":
        return <Badge variant="outline" className="text-neutral-gray border-neutral-gray/50">Seasonal</Badge>;
      default:
        return null;
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
          <h1 className="text-h1 font-bold text-pure-white">Cultural Events</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center mb-6">
          <p className="text-body text-neutral-gray">
            Experience the rich cultural heritage of Northeast India
          </p>
        </div>

        {festivals.map((festival, index) => (
          <Card 
            key={index} 
            className={`bg-card border shadow-card animate-fade-in hover:shadow-lg transition-all duration-300 ${festival.color}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Music className="h-4 w-4 text-current" />
                    {getStatusBadge(festival.status)}
                  </div>
                  <CardTitle className="text-h2 text-pure-white mb-2">
                    {festival.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-small text-neutral-gray">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {festival.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {festival.month}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-body text-pure-white/90">
                {festival.description}
              </p>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-current" />
                <span className="text-small text-neutral-gray">Duration: {festival.duration}</span>
              </div>

              <div>
                <h4 className="text-body font-medium text-pure-white mb-2">Highlights</h4>
                <div className="flex flex-wrap gap-2">
                  {festival.highlights.map((highlight, hIndex) => (
                    <Badge 
                      key={hIndex} 
                      variant="outline" 
                      className="text-xs bg-gradient-surface/30 text-pure-white/80 border-neutral-gray/30"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-gray/20">
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full border-current text-current hover:bg-current/10"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-gradient-surface border-deep-forest/30 mt-8">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-deep-forest mx-auto mb-3" />
            <h3 className="text-h2 text-pure-white mb-2">Festival Calendar</h3>
            <p className="text-body text-neutral-gray mb-4">
              Plan your visit around these amazing cultural celebrations
            </p>
            <Button 
              className="bg-deep-forest hover:bg-deep-forest/90 text-pure-white border-0"
              size="sm"
            >
              Download Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { EventsScreen };