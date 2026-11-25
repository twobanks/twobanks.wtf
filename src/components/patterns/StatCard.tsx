import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
    inverted?: boolean;
  };
  surface?: 1 | 2 | 3;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  surface,
  className,
}: StatCardProps) {
  const getTrendColor = (
    direction: "up" | "down" | "neutral",
    inverted: boolean = false
  ) => {
    if (direction === "up") {
      return inverted ? "text-destructive" : "text-success";
    }
    if (direction === "down") {
      return inverted ? "text-success" : "text-destructive";
    }
    return "text-muted-foreground";
  };

  const getTrendIcon = (direction: "up" | "down" | "neutral") => {
    if (direction === "up") {
      return <ArrowUpRight className="h-3.5 w-3.5" />;
    }
    if (direction === "down") {
      return <ArrowDownRight className="h-3.5 w-3.5" />;
    }
    return null;
  };

  return (
    <Card
      surface={surface}
      className={cn(
        "group relative overflow-hidden transition-all hover:border-primary/50",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="relative z-10 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <CardDescription className="text-muted-foreground font-medium tracking-wide uppercase text-[10px]">
              {label}
            </CardDescription>

            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-foreground tabular-nums">
                {value}
              </div>

              {trend && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-semibold",
                    getTrendColor(trend.direction, trend.inverted)
                  )}
                >
                  {getTrendIcon(trend.direction)}
                  <span>{Math.abs(trend.value).toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>

          {Icon && (
            <div className="text-muted-foreground group-hover:text-primary transition-colors">
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
