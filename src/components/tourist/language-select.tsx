import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface LanguageSelectProps {
  onLanguageSelect: (language: string) => void;
}

const LanguageSelect = ({ onLanguageSelect }: LanguageSelectProps) => {
  const languages = [
    { code: "en", name: "English", available: true },
    { code: "as", name: "অসমীয়া", available: false },
    { code: "mni", name: "মণিপুরী", available: false },
    { code: "lus", name: "Mizo ṭawng", available: false },
  ];

  return (
    <div className="min-h-screen bg-primary-dark text-pure-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-deep-forest/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="h-8 w-8 text-deep-forest" />
          </div>
          <h1 className="text-h1 font-bold mb-4">Choose Your Language</h1>
          <p className="text-body text-neutral-gray">
            Select your preferred language to continue
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {languages.map((lang) => (
            <Card
              key={lang.code}
              className={`cursor-pointer transition-all duration-200 border-neutral-gray/20 ${
                lang.available 
                  ? "bg-gradient-surface hover:bg-deep-forest/10 hover:border-deep-forest/50" 
                  : "bg-card/50 opacity-60 cursor-not-allowed"
              }`}
              onClick={() => lang.available && onLanguageSelect(lang.code)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-h2 font-medium text-pure-white">
                    {lang.name}
                  </span>
                  {!lang.available && (
                    <span className="text-small text-neutral-gray">
                      Coming Soon
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={() => onLanguageSelect("en")}
          size="lg"
          className="w-full bg-deep-forest hover:bg-deep-forest/90 text-pure-white rounded-button"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export { LanguageSelect };