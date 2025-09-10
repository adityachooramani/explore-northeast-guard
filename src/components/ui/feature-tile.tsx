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
  default: "bg-muted/10 text-muted-foreground",
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info", 
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
  primary: "bg-primary/10 text-primary",
  destructive: "bg-destructive/10 text-destructive",
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
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-3 text-center h-full flex flex-col items-center justify-center">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform",
          variantStyles[variant]
        )}>
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="font-medium text-xs leading-tight">{label}</h3>
      </CardContent>
    </Card>
  );
};

export { FeatureTile };