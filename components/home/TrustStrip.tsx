import {
  BadgeCheck,
  ScrollText,
  Clapperboard,
  Headphones,
  KeyRound,
} from "lucide-react";

const ITEMS = [
  { icon: BadgeCheck, label: "Chính thức từ Vinhomes" },
  { icon: ScrollText, label: "Pháp lý minh bạch" },
  { icon: Clapperboard, label: "AI Video Tour" },
  { icon: Headphones, label: "Hỗ trợ 7/7" },
  { icon: KeyRound, label: "Quản lý trọn gói" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-ivory-200 bg-ivory-100">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <span className="text-[13px] font-medium leading-tight text-ink-700">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
