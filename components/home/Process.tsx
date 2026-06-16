import { SearchCheck, PlayCircle, CalendarCheck, FileSignature } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    icon: SearchCheck,
    title: "Tìm kiếm & lọc",
    desc: "Lọc theo phân khu, phòng ngủ, mức giá và tiện ích để khoanh vùng những căn ưng ý nhất.",
  },
  {
    icon: PlayCircle,
    title: "Xem AI Video Tour",
    desc: "Tham quan ảo từng căn hộ qua video AI sống động, tiết kiệm thời gian đi lại.",
  },
  {
    icon: CalendarCheck,
    title: "Đặt lịch xem thực tế",
    desc: "Chọn căn ưng ý và đặt lịch xem trực tiếp. Đội ngũ đón tiếp tận tình tại dự án.",
  },
  {
    icon: FileSignature,
    title: "Ký hợp đồng & nhận nhà",
    desc: "Hoàn tất hợp đồng minh bạch, bàn giao nhận nhà nhanh gọn và an tâm.",
  },
];

export function Process() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Quy trình 4 bước"
          title="Thuê nhà nhẹ nhàng như một kỳ nghỉ"
        />

        <div className="relative mt-14 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* đường nối ngang trên desktop */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-ivory-300 to-transparent lg:block"
          />
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative flex flex-col items-center px-4 text-center">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-ivory-300 bg-ivory-50 text-gold-600 shadow-card">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-ivory-50">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-lg font-bold text-ink">
                {title}
              </h3>
              <p className="mt-2 max-w-[230px] text-[13.5px] leading-relaxed text-ink-500">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
