import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Phone, 
  Mail, 
  Heart, 
  Shield, 
  FileText, 
  Download,
  Edit,
  ArrowLeft,
  MapPin,
  Smartphone,
  Wallet
} from "lucide-react";

interface ProfileScreenProps {
  onBack: () => void;
}

const mockProfile = {
  identity: {
    full_name: "Priya Sharma",
    display_photo: null,
    nationality: "Indian",
    dob: "1995-03-15",
    id_verification_status: "verified",
    masked_id_number: "XXXX-XXXX-4829"
  },
  contact: {
    phone: "+91 98765 43210",
    email: "priya.sharma@email.com",
    primary_emergency_contact: {
      name: "Rajesh Sharma",
      relation: "Father",
      phone: "+91 98765 43211",
      country_code: "+91"
    }
  },
  medical: {
    blood_group: "O+",
    allergies: "Shellfish, Peanuts",
    medications: "None",
    known_conditions: "None",
    insurance_provider: {
      provider: "Star Health Insurance",
      policy_number_masked: "SH****4829",
      contact: "1800-102-4444"
    }
  },
  travel: {
    current_trip: "Northeast India Cultural Tour - 7 days",
    trip_history: ["Rajasthan Heritage Tour", "Kerala Backwaters"],
    documents: ["Passport (verified)", "Aadhaar (verified)", "Travel Permits"]
  },
  blockchain: {
    wallet_address: "0x742d...4829",
    blockchain_id: "did:eth:0x742d...4829"
  },
  safety: {
    safety_score: 92,
    badges: ["Verified Traveler", "Safety Champion"],
    last_known_location: "Guwahati, Assam - 5 min ago",
    device_info: "iPhone 14, iOS 17.1"
  }
};

const ProfileScreen = ({ onBack }: ProfileScreenProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-semibold">Profile</span>
          <Button variant="ghost" size="icon">
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6 text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src={mockProfile.identity.display_photo || undefined} />
              <AvatarFallback className="text-lg">
                {mockProfile.identity.full_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold mb-1">{mockProfile.identity.full_name}</h2>
            <p className="text-muted-foreground mb-3">{mockProfile.identity.nationality}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="default" className="bg-success text-white">
                {mockProfile.identity.id_verification_status}
              </Badge>
              <Badge variant="outline">Safety Score: {mockProfile.safety.safety_score}%</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Identity Section */}
        <Card>
          <CardHeader className="pb-3" onClick={() => toggleSection('identity')}>
            <CardTitle className="flex items-center justify-between text-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Identity
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{new Date(mockProfile.identity.dob).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">ID Number</p>
                <p className="font-medium">{mockProfile.identity.masked_id_number}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Emergency */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Phone className="h-5 w-5" />
              Contact & Emergency
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-muted-foreground text-sm">Phone</p>
              <p className="font-medium">{mockProfile.contact.phone}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="font-medium">{mockProfile.contact.email}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Primary Emergency Contact</p>
              <p className="font-medium">{mockProfile.contact.primary_emergency_contact.name}</p>
              <p className="text-sm text-muted-foreground">
                {mockProfile.contact.primary_emergency_contact.relation} • {mockProfile.contact.primary_emergency_contact.phone}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Medical & Insurance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5" />
              Medical & Insurance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Blood Group</p>
                <p className="font-medium">{mockProfile.medical.blood_group}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Allergies</p>
                <p className="font-medium">{mockProfile.medical.allergies}</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Insurance Provider</p>
              <p className="font-medium">{mockProfile.medical.insurance_provider.provider}</p>
              <p className="text-sm text-muted-foreground">
                Policy: {mockProfile.medical.insurance_provider.policy_number_masked}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Travel & Documents */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              Travel & Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-muted-foreground text-sm">Current Trip</p>
              <p className="font-medium">{mockProfile.travel.current_trip}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Documents</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {mockProfile.travel.documents.map((doc, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {doc}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety & Devices */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              Safety & Devices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Safety Score</p>
                <p className="font-medium text-success">{mockProfile.safety.safety_score}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Location</p>
                <p className="font-medium text-xs">{mockProfile.safety.last_known_location}</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Device Info</p>
              <p className="font-medium text-sm">{mockProfile.safety.device_info}</p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Verify ID
          </Button>
        </div>

        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export { ProfileScreen };