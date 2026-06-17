import { Clapperboard, Building2, Wand2, Scale } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const ICONS = [Clapperboard, Building2, Wand2, Scale];

export function Services({ dict }: { dict: Dictionary }) {
  const t = dict.services;
  const SERVICES = t.items.map((it, i) => ({ ...it, icon: ICONS[i] }));
  return (
    <section id="dich-vu" className="bg-ivory-100 py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={
            <>
              {t.title_a}
              <br />
              {t.title_b}
            </>
          }
          description={t.desc}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group flex flex-col rounded-xl2 border border-ivory-200 bg-ivory-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-200 hover:shadow-card"
            >
              <span className="flex h-13 w-13 items-center justify-center rounded-full bg-ink text-ivory-50 transition-colors group-hover:bg-gold-500 [width:52px] [height:52px]">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-serif text-xl font-bold text-ink">
                {title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
