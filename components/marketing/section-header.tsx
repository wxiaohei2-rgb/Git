import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  badge: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  variant?: "default" | "center";
};

export function SectionHeader({
  action,
  badge,
  className,
  description,
  title,
  variant = "default"
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "section-header",
        variant === "center" && "section-header-center",
        className
      )}
    >
      <div>
        <Badge className="mb-4" variant="secondary">
          {badge}
        </Badge>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="section-header-action">{action}</div> : null}
    </div>
  );
}
