import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";

const statusChipVariants = cva(
  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
  {
    variants: {
      variant: {
        critical: "bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-800",
        urgent: "bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-800",
        ok: "bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-800",
        info: "bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-800",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const iconMap = {
  critical: AlertTriangle,
  urgent: AlertCircle,
  ok: CheckCircle,
  info: Info,
};

export interface StatusChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusChipVariants> {
  children: React.ReactNode;
}

const StatusChip = ({ className, variant = "info", children, ...props }: StatusChipProps) => {
  const Icon = iconMap[variant || "info"];
  
  return (
    <div className={cn(statusChipVariants({ variant }), className)} {...props}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
};

export { StatusChip, statusChipVariants };