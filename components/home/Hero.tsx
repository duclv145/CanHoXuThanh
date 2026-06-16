import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SearchCard } from "@/components/home/SearchCard";

export function Hero({
  stats,
}: {
  stats: { available: number; avgRating: number; responseTime: string };
}) {
  return (
    <section className="relative flex min-h-screen w-full overflow-hidden pt-[72px]">
      {/* nền gradient ấm rất nhẹ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_60%_-10%,#efe7d8_0%,transparent_55%)]"
      />

      {/* Layout full-width: cột trái text, cột phải ảnh edge-to-edge */}
      <div className="grid w-full items-stretch xl:grid-cols-[1.08fr_0.92fr]">

        {/* Cột trái — padding nội dung */}
        <div className="flex items-center px-6 py-20 sm:px-10 lg:px-16 xl:px-24">
          <div className="max-w-xl animate-fade-up">
            <div className="mb-6">
              <span className="eyebrow">Vinhomes Star City · Thanh Hoá</span>
            </div>

            <h1 className="font-serif text-[38px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[52px] xl:text-[58px]">
              Không gian sống
              <br />
              <span className="font-light text-gold-600">xứng tầm</span> của bạn
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-500">
              Tuyển chọn những căn hộ cao cấp nhất tại Vinhomes Star City. Khám phá
              bằng AI Video Tour, pháp lý minh bạch, thủ tục nhẹ nhàng — trải nghiệm
              thuê nhà đẳng cấp quốc tế.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as="link" href="/can-ho" variant="primary" size="lg">
                Khám phá căn hộ
              </Button>
              <Button as="link" href="/#dich-vu" variant="outline" size="lg">
                Tìm hiểu dịch vụ
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
                      className="h-3.5 w-3.5 fill-gold-400 text-gold-400"
                    />
                  ))}
                </div>
                <p className="mt-0.5 text-[13px] text-ink-500">
                  <span className="font-semibold text-ink">4.9/5</span> từ hơn 200
                  khách thuê hài lòng
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải — ảnh full chiều cao, sát cạnh phải */}
        <div className="relative hidden xl:block">
          <Image
            src="/phonkhach.png"
            alt="Phòng khách căn hộ cao cấp tại Vinhomes Star City"
            fill
            sizes="50vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />

          {/* Search card nổi trên ảnh */}
          <div className="absolute bottom-10 left-[-90px] z-10 w-[400px] 2xl:left-[-180px] 2xl:w-[420px]">
            <SearchCard stats={stats} />
          </div>
        </div>

        {/* Mobile & tablet: search card dưới text */}
        <div className="px-6 pb-16 sm:px-10 lg:px-16 xl:hidden">
          <SearchCard stats={stats} />
        </div>
      </div>
    </section>
  );
}
