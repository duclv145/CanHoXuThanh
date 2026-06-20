import { cn } from "@/lib/utils";
import { MARK } from "@/components/layout/LogoLockup";

/**
 * Just the "canhoxuthanh.com" house mark, cropped tight to its bounding box
 * (viewBox derived from the lockup's .lk-mark getBBox). Used by the page
 * Preloader as a standalone, animatable icon.
 */
export function HouseMark({
  className,
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "ivory";
}) {
  return (
    <svg
      viewBox="11 4 527 507"
      role="img"
      aria-label="CanHoXuThanh"
      className={cn(
        "block",
        tone === "ivory" ? "text-white" : "text-[#ff0052]",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        {MARK.map((d, i) => (
          <path
            key={`hm${i}`}
            className="hm-piece"
            d={d}
            style={{ "--mi": i } as React.CSSProperties}
          />
        ))}
      </g>
    </svg>
  );
}
