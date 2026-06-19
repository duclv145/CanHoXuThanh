import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "ink",
  src = "/Logotext.png",
}: {
  className?: string;
  tone?: "ink" | "ivory";
  src?: string;
}) {
  return (
    <Image
      src={src}
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
