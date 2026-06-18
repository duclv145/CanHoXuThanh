import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SearchCard } from "@/components/home/SearchCard";
import { localePath } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Hero({
  stats,
  dict,
  locale,
}: {
  stats: { available: number; avgRating: number; responseTime: string };
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.hero;
  return (
    <section className="relative flex min-h-screen w-full overflow-hidden pt-[72px]">
      {/* nền gradient ấm rất nhẹ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_60%_-10%,#efe7d8_0%,transparent_55%)]"
      />

      {/* Layout full-width: cột trái text, cột phải ảnh edge-to-edge */}
      <div className="grid w-full items-stretch lg:grid-cols-[1.08fr_0.92fr]">

        {/* Mobile: ảnh hero lên trên đầu */}
        <div className="order-1 px-6 pt-4 sm:px-10 lg:hidden">
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src="/phonkhach.png"
              alt="Phòng khách căn hộ cao cấp tại Vinhomes Star City"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          </div>
        </div>

        {/* Cột trái - padding nội dung */}
        <div className="order-2 flex items-center px-6 py-12 sm:px-10 lg:order-none lg:py-20 lg:px-16 xl:px-24">
          <div className="max-w-xl animate-fade-up">
            <h1 className="font-serif text-[36px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[44px] lg:text-[50px] xl:text-[58px]">
              {t.title_a}
              <span className="font-light text-gold-600">{t.title_accent}</span>
              {t.title_b}
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-500">
              {t.desc}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as="link" href={localePath(locale, "/can-ho")} variant="primary" size="lg">
                {t.explore}
              </Button>
              <Button as="link" href={localePath(locale, "/#dich-vu")} variant="outline" size="lg">
                {t.services}
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-5">
              <div className="flex -space-x-3">
                {[
                  "photo-1494790108377-be9c29b29330",
                  "photo-1507003211169-0a1dd7228f2d",
                  "photo-1438761681033-6461ffad8d80",
                ].map((id) => (
                  <span
                    key={id}
                    className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-ivory-100"
                  >
                    <Image
                      src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=80&q=80`}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-0.5 text-[13px] text-ink-500">
                  <span className="font-semibold text-ink">4.9/5</span> {t.rating}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải - ảnh full chiều cao, sát cạnh phải */}
        <div className="relative hidden lg:order-none lg:block">
          {/* Ảnh bo tròn (tách riêng để không cắt SearchCard tràn ra ngoài) */}
          <div className="absolute inset-0 my-6 mr-6 overflow-hidden rounded-[28px] 2xl:my-8 2xl:mr-10">
            <Image
              src="/phonkhach.png"
              alt="Phòng khách căn hộ cao cấp tại Vinhomes Star City"
              fill
              sizes="50vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ivory/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
          </div>

          {/* Search card nổi trên ảnh - căn giữa chiều dọc cho cân đối với cột text */}
          <div className="absolute left-[-72px] top-1/2 z-10 w-[400px] -translate-y-1/2 2xl:left-[-140px] 2xl:w-[420px]">
            <SearchCard stats={stats} />
          </div>
        </div>

        {/* Mobile: search card dưới cùng */}
        <div className="order-3 px-6 pb-10 sm:px-10 lg:hidden">
          <SearchCard stats={stats} />
        </div>
      </div>
    </section>
  );
}
