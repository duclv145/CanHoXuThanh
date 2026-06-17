"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ImagePlus, Loader2, Check, Sparkles } from "lucide-react";
import { useI18n, localePath } from "@/lib/i18n/provider";
import { SUBZONES, BEDROOM_TYPES } from "@/lib/types";
import { cn } from "@/lib/utils";

const field =
  "h-11 w-full rounded-xl border border-ivory-300 bg-white px-3.5 text-sm text-ink outline-none transition-colors focus:border-ink";
const label =
  "mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-ink-500";
const selectCls = cn(field, "appearance-none pr-9");

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl2 border border-ivory-200 bg-ivory-50 p-6 shadow-card">
      <h2 className="mb-5 font-serif text-lg font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}

export function AddApartmentForm() {
  const { locale, dict } = useI18n();
  const t = dict.ownerArea.addForm;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [aiTour, setAiTour] = useState(true);

  const toggleAmenity = (a: string) =>
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push(localePath(locale, "/chu-nha/dashboard")), 800);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Thông tin cơ bản */}
      <Section title={t.secBasic}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>{t.name}</label>
            <input className={field} placeholder={t.namePh} required />
          </div>
          <div>
            <label className={label}>{t.code}</label>
            <input className={field} placeholder={t.codePh} />
          </div>
          <div>
            <label className={label}>{t.subzone}</label>
            <select className={selectCls} defaultValue={SUBZONES[0]}>
              {SUBZONES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={label}>{t.address}</label>
            <input className={field} placeholder={t.addressPh} />
          </div>
        </div>
      </Section>

      {/* Chi tiết */}
      <Section title={t.secDetail}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={label}>{t.area}</label>
            <input type="number" min={0} className={field} placeholder="78" />
          </div>
          <div>
            <label className={label}>{t.layout}</label>
            <select className={selectCls} defaultValue="2pn">
              {BEDROOM_TYPES.map((b) => (
                <option key={b.value} value={b.value}>
                  {dict.bedroomLabels[b.value]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>{t.bathrooms}</label>
            <input type="number" min={1} defaultValue={1} className={field} />
          </div>
          <div>
            <label className={label}>{t.floor}</label>
            <input type="number" min={1} className={field} placeholder="22" />
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <label className={label}>{t.orientation}</label>
            <input className={field} placeholder={t.orientationPh} />
          </div>
        </div>
      </Section>

      {/* Giá & thời hạn */}
      <Section title={t.secPrice}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={label}>{t.price}</label>
            <input type="number" min={0} className={field} placeholder="18" />
          </div>
          <div>
            <label className={label}>{t.term}</label>
            <select className={selectCls} defaultValue="12_thang">
              {(["ngan_han", "6_thang", "12_thang", "24_thang"] as const).map(
                (k) => (
                  <option key={k} value={k}>
                    {dict.termLabels[k]}
                  </option>
                ),
              )}
            </select>
          </div>
          <div>
            <label className={label}>{t.status}</label>
            <select className={selectCls} defaultValue="trong">
              {(["trong", "dang_thue", "dang_xu_ly"] as const).map((k) => (
                <option key={k} value={k}>
                  {dict.ownerArea.dash.status[k]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Section>

      {/* Mô tả & tiện ích */}
      <Section title={t.secContent}>
        <label className={label}>{t.description}</label>
        <textarea
          rows={4}
          className={cn(field, "h-auto resize-none py-3")}
          placeholder={t.descriptionPh}
        />
        <div className="mt-5">
          <label className={label}>{t.amenities}</label>
          <p className="mb-3 text-[12px] text-ink-400">{t.amenitiesHint}</p>
          <div className="flex flex-wrap gap-2">
            {t.amenityList.map((a) => {
              const active = amenities.includes(a);
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors",
                    active
                      ? "border-ink bg-ink text-ivory-50"
                      : "border-ivory-300 text-ink-600 hover:border-ink",
                  )}
                >
                  {active && <Check className="h-3.5 w-3.5" />}
                  {a}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setAiTour((v) => !v)}
          className="mt-5 flex w-full items-center justify-between rounded-xl border border-ivory-300 bg-white px-4 py-3"
        >
          <span className="flex items-center gap-2 text-[14px] font-medium text-ink">
            <Sparkles className="h-4 w-4 text-ink-500" />
            {t.aiTour}
          </span>
          <span
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors",
              aiTour ? "bg-ink" : "bg-ivory-300",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all",
                aiTour ? "left-[22px]" : "left-0.5",
              )}
            />
          </span>
        </button>
      </Section>

      {/* Hình ảnh */}
      <Section title={t.secMedia}>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-ivory-300 bg-white px-6 py-10 text-center transition-colors hover:border-ink">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-200 text-ink">
            <ImagePlus className="h-5 w-5" />
          </span>
          <span className="text-[14px] text-ink-500">{t.uploadHint}</span>
          <span className="rounded-full border border-ink/15 px-4 py-1.5 text-[13px] font-medium text-ink">
            {t.uploadCta}
          </span>
          <input type="file" accept="image/*" multiple className="hidden" />
        </label>
      </Section>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <p className="mr-auto text-[12px] text-ink-400">{t.demoNote}</p>
        <Link
          href={localePath(locale, "/chu-nha/dashboard")}
          className="inline-flex h-12 items-center rounded-full border border-ink/15 px-6 text-sm font-medium text-ink-600 transition-colors hover:border-ink hover:text-ink"
        >
          {t.cancel}
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-[15px] font-semibold text-ivory-50 transition-all hover:bg-ink-800 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? t.submitting : t.submit}
        </button>
      </div>
    </form>
  );
}
