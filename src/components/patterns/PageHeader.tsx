import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  action,
  breadcrumb,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border bg-background px-4 py-6 sm:px-6 lg:px-8",
        className
      )}
    >
      {breadcrumb && <div className="text-sm text-subtle-foreground">{breadcrumb}</div>}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold leading-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-subtle-foreground">{description}</p>
          )}
        </div>

        {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
      </div>
    </div>
  );
}
