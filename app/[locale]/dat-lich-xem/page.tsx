import { ClipboardList, PhoneCall, KeyRound, MessageCircle, Phone, ShieldCheck, Clock3 } from "lucide-react";
import { BookingForm, type BookingApartmentOption } from "@/components/booking/BookingForm";
import { getApartments } from "@/lib/data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

const STEP_ICONS = [ClipboardList, PhoneCall, KeyRound];

export default async function Page({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { can_ho?: string };
}) {
  const dict = getDictionary(params.locale);
  const t = dict.booking;
  const apartments = await getApartments({});
  const options: BookingApartmentOption[] = apartments.map((a) => ({
    id: a.id,
    name: a.name,
    subzone: a.subzone,
  }));

  // Pre-chọn căn hộ nếu deep-link từ trang chi tiết / card.
  const preselect = searchParams.can_ho
    ? options.find(
        (o) => o.id === searchParams.can_ho || o.name === searchParams.can_ho,
      )?.id ?? ""
    : "";

  const STEPS = t.steps.map((s, i) => ({ ...s, icon: STEP_ICONS[i] }));
  const TRUST = [
    { icon: ShieldCheck, label: t.trustLegal },
    { icon: Clock3, label: t.trustResponse },
  ];

  return (
    <main className="bg-ivory pt-[72px]">
      <div className="container-x py-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* ── Cột trái: bối cảnh & quy trình ─────────────────────── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-6">
              <span className="eyebrow">{t.eyebrow}</span>
            </div>

            <h1 className="font-serif text-3xl font-bold leading-[1.1] text-ink sm:text-4xl lg:text-[44px]">
              {t.title_a}
              <br />
              <span className="text-gold-600">{t.title_accent}</span>
            </h1>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-500">
              {t.desc}
            </p>

            {/* Quy trình 3 bước */}
            <ol className="mt-10 space-y-6">
              {STEPS.map(({ icon: Icon, title, desc }, i) => (
                <li key={title} className="flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-ivory-50">
                      <Icon className="h-5 w-5" />
                    </span>
                    {i < STEPS.length - 1 && (
                      <span className="mt-1 h-full w-px flex-1 bg-ivory-300" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="font-serif text-[17px] font-bold text-ink">
                      {title}
                    </p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-500">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Liên hệ nhanh */}
            <div className="mt-10 rounded-xl2 border border-ivory-200 bg-ivory-50 p-5 shadow-card">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-400">
                {t.needHelp}
              </p>
              <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href="tel:0961893268"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory-50"
                >
                  <Phone className="h-4 w-4" />
                  0961 893 268
                </a>
                <a
                  href="https://zalo.me/0961893268"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 px-4 py-2.5 text-sm font-medium text-ivory-50 transition-colors hover:bg-gold-600"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.zalo}
                </a>
              </div>

              <div className="mt-4 flex items-center gap-5 border-t border-ivory-200 pt-4">
                {TRUST.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 text-[12px] text-ink-500"
                  >
                    <Icon className="h-4 w-4 text-gold-500" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Cột phải: form ──────────────────────────────────────── */}
          <div>
            <BookingForm apartments={options} defaultApartmentId={preselect} />
          </div>
        </div>
      </div>
    </main>
  );
}
