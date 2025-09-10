import { cn } from "@/lib/utils";

interface HeroCardProps {
  image: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  height?: "sm" | "md" | "lg" | "xl";
}

const heightClasses = {
  sm: "h-48",
  md: "h-64", 
  lg: "h-80",
  xl: "h-96"
};

const HeroCard = ({ image, alt, children, className, height = "lg" }: HeroCardProps) => {
  return (
    <div
      className={cn(
        "hero-image relative rounded-large overflow-hidden",
        heightClasses[height],
        className
      )}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay applied via CSS */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
        {children}
      </div>
    </div>
  );
};

export { HeroCard };