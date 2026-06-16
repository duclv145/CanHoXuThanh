import { Clapperboard, Building2, Wand2, Scale } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SERVICES = [
  {
    icon: Clapperboard,
    title: "AI Video Tour",
    desc: "Tham quan từng căn hộ qua video dựng bằng AI, chân thực như đến tận nơi — mọi lúc, mọi nơi.",
  },
  {
    icon: Building2,
    title: "Quản lý cho thuê",
    desc: "Chúng tôi lo trọn gói: tìm khách, ký hợp đồng, thu tiền, bảo trì. Chủ nhà chỉ việc nhận doanh thu.",
  },
  {
    icon: Wand2,
    title: "Virtual Staging",
    desc: "Bài trí nội thất ảo giúp căn hộ trống trở nên cuốn hút, tăng tỷ lệ chốt thuê đáng kể.",
  },
  {
    icon: Scale,
    title: "Hỗ trợ pháp lý",
    desc: "Hợp đồng chuẩn, tư vấn pháp lý rõ ràng, bảo vệ quyền lợi cho cả chủ nhà và khách thuê.",
  },
];

export function Services() {
  return (
    <section id="dich-vu" className="bg-ivory-100 py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Dịch vụ"
          title="Trọn vẹn hành trình thuê & cho thuê"
          description="Mọi khâu được chăm chút bởi đội ngũ chuyên nghiệp, ứng dụng công nghệ để bạn nhẹ nhàng từ tìm kiếm đến nhận nhà."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group flex flex-col rounded-xl2 border border-ivory-200 bg-ivory-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-200 hover:shadow-card"
            >
              <span className="flex h-13 w-13 items-center justify-center rounded-full bg-ink text-ivory-50 transition-colors group-hover:bg-gold-500 group-hover:text-ink [width:52px] [height:52px]">
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
