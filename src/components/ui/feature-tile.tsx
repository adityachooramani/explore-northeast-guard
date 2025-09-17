import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureTileProps {
  icon: LucideIcon;
  label: string;
  variant?: "default" | "success" | "info" | "accent" | "warning" | "primary" | "destructive";
  onClick?: () => void;
  className?: string;
}

const variantStyles = {
  default: "bg-surface border border-neutral-gray/20 text-neutral-gray",
  success: "bg-deep-forest/10 border border-deep-forest/20 text-deep-forest",
  info: "bg-soft-green/10 border border-soft-green/20 text-soft-green", 
  accent: "bg-soft-green/10 border border-soft-green/20 text-soft-green",
  warning: "bg-amber-warning/10 border border-amber-warning/20 text-amber-warning",
  primary: "bg-deep-forest/10 border border-deep-forest/20 text-deep-forest",
  destructive: "bg-danger/10 border border-danger/20 text-danger",
};

const FeatureTile = ({ 
  icon: Icon, 
  label, 
  variant = "default", 
  onClick,
  className 
}: FeatureTileProps) => {
  return (
    <Card 
      className={cn(
        "hover:shadow-card transition-all cursor-pointer group aspect-square",
        "bg-card border-neutral-gray/20 hover:bg-card/80 active:scale-95",
        "min-h-[88px] min-w-[88px]", // Touch-friendly size
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-3 text-center h-full flex flex-col items-center justify-center gap-2">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform",
          variantStyles[variant]
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-medium text-xs leading-tight text-pure-white/90 group-hover:text-pure-white transition-colors">
          {label}
        </h3>
      </CardContent>
    </Card>
  );
};

export { FeatureTile };