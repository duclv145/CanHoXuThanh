import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/mock-data";

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section id="ve-chung-toi" className="bg-ivory-100 py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Khách hàng nói gì"
          title="Niềm tin được vun đắp mỗi ngày"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col rounded-xl2 border border-ivory-200 bg-ivory-50 p-7 shadow-card"
            >
              <Quote className="h-7 w-7 text-gold-300" />
              <div className="mt-3 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ivory-200 pt-5">
                <span className="relative h-11 w-11 overflow-hidden rounded-full">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-[12.5px] text-ink-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
