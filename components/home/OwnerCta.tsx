import Image from "next/image";
import { TrendingUp, ShieldCheck, Clock, LineChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const ICONS = [TrendingUp, ShieldCheck, Clock, LineChart];

export function OwnerCta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.owner;
  const PERKS = t.points.map((p, i) => ({ ...p, icon: ICONS[i] }));
  return (
    <section id="chu-nha" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] bg-forest text-ivory-100">
          {/* ảnh nền mờ bên phải */}
          <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <Image
              src="/K5-Bancong.jpg"
              alt="Căn hộ cho thuê quản lý bởi CanHoXuThanh"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-transparent" />
          </div>

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:p-16">
            <div className="max-w-2xl">
              <div className="mb-5">
                <span className="text-[11px] font-medium uppercase tracking-eyebrow text-gold-300">
                  {t.eyebrow}
                </span>
              </div>
              <h2 className="font-serif text-[26px] font-bold leading-[1.15] sm:text-[32px]">
                {t.title_a}
                <br />
                {t.title_b}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ivory-200/80">
                {t.desc}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                {PERKS.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory-100/10 text-gold-300">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ivory-50">
                        {title}
                      </p>
                      <p className="text-[13px] text-ivory-200/70">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                as="link"
                href={localePath(locale, "/chu-nha/dang-ky")}
                variant="ivory"
                size="lg"
                className="mt-10"
              >
                {t.register}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
