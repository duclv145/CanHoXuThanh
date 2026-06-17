"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand } from "lucide-react";

export function ApartmentGallery({
  images,
  alt,
}: {
  images: { url: string; alt: string }[];
  alt: string;
}) {
  const pics = images.filter((i) => i.url);
  const [active, setActive] = useState(0);
  if (!pics.length) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl2 bg-ivory-200">
        <Image
          src={pics[active].url}
          alt={pics[active].alt || alt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
          className="object-cover"
        />
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-[12px] font-medium text-ivory-50 backdrop-blur">
          <Expand className="h-3.5 w-3.5" />
          {active + 1}/{pics.length}
        </span>
      </div>

      {pics.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {pics.map((p, i) => (
            <button
              key={p.url + i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
                i === active
                  ? "ring-2 ring-gold-500 ring-offset-2 ring-offset-ivory"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={p.url}
                alt={p.alt || alt}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
