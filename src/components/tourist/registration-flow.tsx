import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { User, Phone, Mail, Heart, MapPin, Calendar as CalendarIcon, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegistrationFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

const RegistrationFlow = ({ onComplete, onBack }: RegistrationFlowProps) => {
  const [step, setStep] = useState<"profile" | "emergency" | "trip">("profile");
  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    email: ""
  });
  const [emergency, setEmergency] = useState({
    contactName: "",
    contactPhone: ""
  });
  const [trip, setTrip] = useState({
    destination: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined
  });

  const handleNext = () => {
    if (step === "profile") setStep("emergency");
    else if (step === "emergency") setStep("trip");
    else onComplete();
  };

  const handleBack = () => {
    if (step === "profile") onBack();
    else if (step === "emergency") setStep("profile");
    else setStep("emergency");
  };

  const getStepTitle = () => {
    switch (step) {
      case "profile": return "Your Profile";
      case "emergency": return "Emergency Contact";
      case "trip": return "Trip Details";
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case "profile": return <User className="h-6 w-6 text-deep-forest" />;
      case "emergency": return <Heart className="h-6 w-6 text-deep-forest" />;
      case "trip": return <MapPin className="h-6 w-6 text-deep-forest" />;
    }
  };

  const canContinue = () => {
    switch (step) {
      case "profile": return profile.fullName && profile.phone && profile.email;
      case "emergency": return emergency.contactName && emergency.contactPhone;
      case "trip": return trip.destination && trip.startDate && trip.endDate;
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark text-pure-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-neutral-gray/20">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="text-pure-white hover:bg-neutral-gray/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-deep-forest/20 rounded-full flex items-center justify-center">
            {getStepIcon()}
          </div>
          <div>
            <h1 className="text-h2 font-semibold">{getStepTitle()}</h1>
            <p className="text-small text-neutral-gray">Step {step === "profile" ? "1" : step === "emergency" ? "2" : "3"} of 3</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="w-full bg-neutral-gray/20 rounded-full h-2">
          <div 
            className="bg-deep-forest h-2 rounded-full transition-all duration-300"
            style={{ 
              width: step === "profile" ? "33%" : step === "emergency" ? "66%" : "100%" 
            }}
          />
        </div>
      </div>

      <div className="flex-1 px-6 py-4">
        {step === "profile" && (
          <Card className="bg-gradient-surface border-neutral-gray/20">
            <CardHeader>
              <CardTitle className="text-pure-white">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-pure-white">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                  className="bg-card border-neutral-gray/20 text-pure-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-pure-white">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                  className="bg-card border-neutral-gray/20 text-pure-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-pure-white">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="bg-card border-neutral-gray/20 text-pure-white"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {step === "emergency" && (
          <Card className="bg-gradient-surface border-neutral-gray/20">
            <CardHeader>
              <CardTitle className="text-pure-white">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-pure-white">Contact Name</Label>
                <Input
                  id="contactName"
                  value={emergency.contactName}
                  onChange={(e) => setEmergency(prev => ({ ...prev, contactName: e.target.value }))}
                  placeholder="Emergency contact name"
                  className="bg-card border-neutral-gray/20 text-pure-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-pure-white">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={emergency.contactPhone}
                  onChange={(e) => setEmergency(prev => ({ ...prev, contactPhone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                  className="bg-card border-neutral-gray/20 text-pure-white"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {step === "trip" && (
          <Card className="bg-gradient-surface border-neutral-gray/20">
            <CardHeader>
              <CardTitle className="text-pure-white">Trip Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-pure-white">Destination</Label>
                <Input
                  id="destination"
                  value={trip.destination}
                  onChange={(e) => setTrip(prev => ({ ...prev, destination: e.target.value }))}
                  placeholder="Where are you traveling?"
                  className="bg-card border-neutral-gray/20 text-pure-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-pure-white">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-card border-neutral-gray/20 text-pure-white hover:bg-card/80",
                          !trip.startDate && "text-neutral-gray"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {trip.startDate ? format(trip.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={trip.startDate}
                        onSelect={(date) => setTrip(prev => ({ ...prev, startDate: date }))}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-pure-white">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-card border-neutral-gray/20 text-pure-white hover:bg-card/80",
                          !trip.endDate && "text-neutral-gray"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {trip.endDate ? format(trip.endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={trip.endDate}
                        onSelect={(date) => setTrip(prev => ({ ...prev, endDate: date }))}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Continue Button */}
      <div className="p-6">
        <Button
          onClick={handleNext}
          disabled={!canContinue()}
          size="lg"
          className="w-full bg-deep-forest hover:bg-deep-forest/90 text-pure-white rounded-button disabled:opacity-50"
        >
          {step === "trip" ? "Complete Registration" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export { RegistrationFlow };