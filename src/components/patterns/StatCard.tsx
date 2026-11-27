import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: "up" | "down";
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
  surface = 1,
  className,
}: StatCardProps) {
  const trendColor =
    trend?.direction === "up"
      ? trend.inverted
        ? "text-destructive"
        : "text-success"
      : trend?.direction === "down"
      ? trend.inverted
        ? "text-success"
        : "text-destructive"
      : "text-muted-foreground";

  return (
    <Card
      surface={surface}
      className={cn(
        "group relative overflow-hidden transition-all hover:border-primary/50",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="relative z-10 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 flex-1">
            {Icon && (
              <div className="mb-2 text-muted-foreground">
                <Icon className="h-4 w-4" />
              </div>
            )}
            <CardDescription className="text-muted-foreground font-medium tracking-wide uppercase text-[10px]">
              {label}
            </CardDescription>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-foreground tabular-nums">
                {value}
              </div>
              {trend && (
                <div className={cn("flex items-center gap-1 text-xs font-semibold", trendColor)}>
                  {trend.value > 0 && <span className="text-[10px]">{trend.direction === "up" ? "▲" : "▼"}</span>}
                  <span>{Math.abs(trend.value).toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
