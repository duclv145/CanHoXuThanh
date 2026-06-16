import Image from "next/image";
import { TrendingUp, ShieldCheck, Clock, LineChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const PERKS = [
  { icon: TrendingUp, title: "Tối ưu doanh thu", desc: "Định giá thông minh, lấp đầy nhanh." },
  { icon: ShieldCheck, title: "Khách thuê chọn lọc", desc: "Thẩm định kỹ, an tâm tài sản." },
  { icon: Clock, title: "Tiết kiệm thời gian", desc: "Chúng tôi lo mọi khâu vận hành." },
  { icon: LineChart, title: "Báo cáo minh bạch", desc: "Theo dõi doanh thu mọi lúc." },
];

export function OwnerCta() {
  return (
    <section id="chu-nha" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] bg-forest text-ivory-100">
          {/* ảnh nền mờ bên phải */}
          <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1100&q=80"
              alt="Căn hộ cho thuê quản lý bởi StarLiving"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-transparent" />
          </div>

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div className="max-w-lg">
              <div className="mb-5">
                <span className="text-[11px] font-medium uppercase tracking-eyebrow text-gold-300">
                  Dành cho chủ nhà
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold leading-[1.1] sm:text-4xl">
                Giao căn hộ — nhận doanh thu, bỏ qua mọi phiền hà
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ivory-200/80">
                Đăng ký để StarLiving quản lý trọn gói việc cho thuê căn hộ của
                bạn tại Vinhomes Star City. Minh bạch, chuyên nghiệp, hiệu quả.
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
                href="/chu-nha/dang-ky"
                variant="gold"
                size="lg"
                className="mt-10"
              >
                Đăng ký ngay
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
