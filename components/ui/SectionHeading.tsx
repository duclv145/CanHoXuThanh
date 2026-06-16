import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex w-full gap-6",
        align === "center"
          ? "flex-col items-center text-center"
          : "flex-col items-start justify-between md:flex-row md:items-end",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-2xl",
          align === "center" && "mx-auto flex flex-col items-center",
        )}
      >
        {eyebrow && (
          <div className="mb-4">
            <span className="eyebrow">{eyebrow}</span>
          </div>
        )}
        <h2 className="font-serif text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-[44px]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
