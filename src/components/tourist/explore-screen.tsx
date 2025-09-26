import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Star, Camera } from "lucide-react";

interface ExploreScreenProps {
  onBack: () => void;
}

const ExploreScreen = ({ onBack }: ExploreScreenProps) => {
  const itinerary = [
    {
      day: 1,
      title: "Shillong - Scotland of the East",
      location: "Meghalaya",
      activities: [
        { name: "Ward's Lake visit", icon: Camera, duration: "2h" },
        { name: "Shillong Peak trek", icon: MapPin, duration: "4h" },
        { name: "Local cuisine tasting", icon: Star, duration: "1h" }
      ],
      highlights: "Scenic beauty, Pleasant weather, Cultural diversity"
    },
    {
      day: 2,
      title: "Kaziranga National Park",
      location: "Assam",
      activities: [
        { name: "Elephant Safari", icon: Camera, duration: "3h" },
        { name: "Rhino spotting", icon: Star, duration: "2h" },
        { name: "Assamese cultural show", icon: MapPin, duration: "1h" }
      ],
      highlights: "One-horned rhinoceros, Wildlife photography, Tea gardens"
    },
    {
      day: 3,
      title: "Gangtok - Gateway to Himalayas",
      location: "Sikkim",
      activities: [
        { name: "MG Marg stroll", icon: MapPin, duration: "2h" },
        { name: "Rumtek Monastery visit", icon: Star, duration: "3h" },
        { name: "Cable car ride", icon: Camera, duration: "1h" }
      ],
      highlights: "Mountain views, Buddhist culture, Adventure sports"
    }
  ];

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
          <h1 className="text-h1 font-bold text-pure-white">Explore Northeast</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center mb-6">
          <p className="text-body text-neutral-gray">
            Discover the hidden gems of Northeast India
          </p>
          <Badge variant="secondary" className="mt-2 bg-deep-forest/20 text-soft-green border-deep-forest/30">
            3-Day Itinerary
          </Badge>
        </div>

        {itinerary.map((day, index) => (
          <Card 
            key={day.day} 
            className="bg-card border-neutral-gray/20 shadow-card animate-fade-in hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="outline" className="mb-2 text-soft-green border-soft-green/50">
                    Day {day.day}
                  </Badge>
                  <CardTitle className="text-h2 text-pure-white mb-1">
                    {day.title}
                  </CardTitle>
                  <p className="text-small text-neutral-gray flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {day.location}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-body font-medium text-pure-white">Activities</h4>
                {day.activities.map((activity, actIndex) => (
                  <div 
                    key={actIndex} 
                    className="flex items-center gap-3 p-2 rounded-lg bg-gradient-surface/50 hover:bg-gradient-surface transition-colors"
                  >
                    <activity.icon className="h-4 w-4 text-soft-green" />
                    <span className="text-body text-pure-white flex-1">{activity.name}</span>
                    <Badge variant="secondary" className="text-xs bg-neutral-gray/20 text-neutral-gray">
                      {activity.duration}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="pt-2 border-t border-neutral-gray/20">
                <h4 className="text-small font-medium text-pure-white mb-2">Highlights</h4>
                <p className="text-small text-neutral-gray">{day.highlights}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-gradient-surface border-deep-forest/30 mt-6">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-deep-forest mx-auto mb-3" />
            <h3 className="text-h2 text-pure-white mb-2">Plan Your Trip</h3>
            <p className="text-body text-neutral-gray mb-4">
              Best time to visit: October to April
            </p>
            <Button 
              className="bg-deep-forest hover:bg-deep-forest/90 text-pure-white border-0"
              size="sm"
            >
              Book Guided Tour
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ExploreScreen };