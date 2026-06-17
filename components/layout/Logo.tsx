import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "ivory";
}) {
  return (
    <Image
      src="/canhoxuthanh.png"
      alt="CanHoXuThanh"
      width={160}
      height={32}
      priority
      className={cn(
        "h-12 w-auto object-contain",
        tone === "ivory" && "brightness-0 invert",
        className,
      )}
    />
  );
}
