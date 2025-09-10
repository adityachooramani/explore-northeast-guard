import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import waterfallImage from "@/assets/waterfall-attraction.jpg";
import lakeImage from "@/assets/lake-local.jpg";
import mountainImage from "@/assets/mountain-alert.jpg";

const attractions = [
  {
    id: 1,
    name: "Loktak Lake",
    image: waterfallImage,
    distance: "2.3 km",
    rating: 4.8,
    type: "Natural Wonder",
    safety: "safe"
  },
  {
    id: 2,
    name: "Peaceful Valley",
    image: lakeImage,
    distance: "5.7 km", 
    rating: 4.6,
    type: "Scenic Spot",
    safety: "safe"
  },
  {
    id: 3,
    name: "Sandakphu Peak", 
    image: mountainImage,
    distance: "12.4 km",
    rating: 4.9,
    type: "Trekking",
    safety: "caution"
  }
];

const AttractionsCarousel = () => {
  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Nearby Attractions</h2>
        <button className="text-sm text-primary hover:underline">
          View All
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2">
        {attractions.map((attraction) => (
          <Card 
            key={attraction.id} 
            className="min-w-[280px] hover:shadow-card transition-all duration-200 cursor-pointer group"
          >
            <CardContent className="p-0">
              <div 
                className="h-32 bg-cover bg-center rounded-t-lg relative"
                style={{ backgroundImage: `url(${attraction.image})` }}
              >
                <div className="absolute inset-0 bg-black/20 rounded-t-lg" />
                <Badge 
                  variant="secondary" 
                  className={`absolute top-2 right-2 ${
                    attraction.safety === 'safe' 
                      ? 'bg-success/90 text-white' 
                      : 'bg-warning/90 text-white'
                  }`}
                >
                  {attraction.safety === 'safe' ? '✓ Safe' : '⚠ Caution'}
                </Badge>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                  {attraction.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {attraction.type}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {attraction.distance}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{attraction.rating}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { AttractionsCarousel };