import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Shield, ChevronDown, MapPin, MessageSquare } from "lucide-react";

interface PrivacyScreenProps {
  onContinue: () => void;
}

const PrivacyScreen = ({ onContinue }: PrivacyScreenProps) => {
  const [locationConsent, setLocationConsent] = useState(false);
  const [emergencySMS, setEmergencySMS] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  const canContinue = locationConsent && emergencySMS;

  return (
    <div className="min-h-screen bg-primary-dark text-pure-white flex flex-col">
      <div className="flex-1 px-6 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-deep-forest/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-deep-forest" />
          </div>
          <h1 className="text-h1 font-bold mb-4">Privacy & Permissions</h1>
          <p className="text-body text-neutral-gray">
            Your safety is our priority. We need your consent for essential features.
          </p>
        </div>

        <div className="space-y-6">
          {/* Privacy Policy */}
          <Card className="bg-gradient-surface border-neutral-gray/20">
            <Collapsible open={policyOpen} onOpenChange={setPolicyOpen}>
              <CollapsibleTrigger asChild>
                <CardContent className="p-6 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-h2 font-semibold text-pure-white">Privacy Policy</h3>
                    <ChevronDown className={`h-5 w-5 text-neutral-gray transition-transform ${policyOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CardContent>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="px-6 pb-6">
                  <div className="text-small text-neutral-gray space-y-3">
                    <p>Your location data is protected and encrypted. We only use it for:</p>
                    <ul className="space-y-2 ml-4">
                      <li>• Emergency response and rescue operations</li>
                      <li>• Safety alerts and geo-fence notifications</li>
                      <li>• Location history for your reference</li>
                    </ul>
                    <p>Data is never shared with third parties without your consent.</p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Location Permission */}
          <Card className="bg-gradient-surface border-neutral-gray/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-deep-forest/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-deep-forest" />
                  </div>
                  <div>
                    <h3 className="text-body font-medium text-pure-white">Location Tracking</h3>
                    <p className="text-small text-neutral-gray">Required for safety features</p>
                  </div>
                </div>
                <Switch 
                  checked={locationConsent} 
                  onCheckedChange={setLocationConsent}
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency SMS Permission */}
          <Card className="bg-gradient-surface border-neutral-gray/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-warning/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-amber-warning" />
                  </div>
                  <div>
                    <h3 className="text-body font-medium text-pure-white">Emergency SMS</h3>
                    <p className="text-small text-neutral-gray">Send alerts to emergency contacts</p>
                  </div>
                </div>
                <Switch 
                  checked={emergencySMS} 
                  onCheckedChange={setEmergencySMS}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6">
        <Button
          onClick={onContinue}
          disabled={!canContinue}
          size="lg"
          className="w-full bg-deep-forest hover:bg-deep-forest/90 text-pure-white rounded-button disabled:opacity-50"
        >
          Agree & Continue
        </Button>
      </div>
    </div>
  );
};

export { PrivacyScreen };