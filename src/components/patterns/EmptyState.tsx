import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card
      surface={1}
      className={cn(
        "border border-border-subtle rounded-2xl",
        className
      )}
    >
      <CardContent className="flex flex-col items-center justify-center gap-4 py-16 px-6">
        {Icon && (
          <div className="text-muted-foreground">
            <Icon className="h-12 w-12" />
          </div>
        )}

        <div className="flex flex-col gap-1 text-center">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-subtle-foreground">{description}</p>
          )}
        </div>

        {action && <div className="mt-2">{action}</div>}
      </CardContent>
    </Card>
  );
}
