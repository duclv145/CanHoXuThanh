"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Check,
  CalendarCheck,
  Loader2,
  User,
  Phone,
  Building2,
  CalendarDays,
  Clock,
  Video,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { createBooking } from "@/lib/actions";
import { cn } from "@/lib/utils";

export interface BookingApartmentOption {
  id: string;
  name: string;
  subzone: string;
}

const TIME_SLOTS = [
  "Sáng (08:00 – 11:00)",
  "Trưa (11:00 – 14:00)",
  "Chiều (14:00 – 17:00)",
  "Tối (17:00 – 20:00)",
];

const METHODS = [
  { value: "Trực tiếp", label: "Tham quan trực tiếp", icon: MapPin },
  { value: "AI Video Tour", label: "AI Video Tour", icon: Video },
];

const todayISO = () => new Date().toISOString().split("T")[0];

export function BookingForm({
  apartments,
  defaultApartmentId = "",
}: {
  apartments: BookingApartmentOption[];
  defaultApartmentId?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [apartmentId, setApartmentId] = useState(defaultApartmentId);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(TIME_SLOTS[2]);
  const [method, setMethod] = useState(METHODS[0].value);
  const [note, setNote] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const selectedApartment = apartments.find((a) => a.id === apartmentId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("Vui lòng nhập họ tên hợp lệ.");
      return;
    }
    if (!/^(0\d{9}|\+84\d{9})$/.test(phone.replace(/[\s.]/g, ""))) {
      setError("Số điện thoại không hợp lệ (VD: 0901 234 567).");
      return;
    }

    const composedNote = [
      `Hình thức: ${method}`,
      slot ? `Khung giờ: ${slot}` : "",
      note.trim(),
    ]
      .filter(Boolean)
      .join(" · ");

    startTransition(async () => {
      const res = await createBooking({
        apartment_id: apartmentId,
        name,
        phone,
        preferred_date: date,
        note: composedNote,
      });
      if (res.ok) setDone(true);
      else setError(res.error);
    });
  }

  // ── Trạng thái thành công ─────────────────────────────────────────────
  if (done) {
    return (
      <div className="rounded-xl2 border border-ivory-200 bg-ivory-50 p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 ring-1 ring-teal-100">
          <Check className="h-7 w-7 text-teal-600" strokeWidth={2.5} />
        </div>
        <h3 className="mt-6 font-serif text-2xl font-bold text-ink">
          Đã gửi yêu cầu đặt lịch!
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-ink-500">
          Cảm ơn <span className="font-semibold text-ink">{name}</span>. Đội ngũ
          StarLiving sẽ liên hệ qua số{" "}
          <span className="font-semibold text-ink">{phone}</span> trong vòng{" "}
          <span className="font-semibold text-ink">~15 phút</span> để xác nhận.
        </p>

        <div className="mx-auto mt-6 max-w-xs space-y-2 rounded-xl border border-ivory-200 bg-ivory p-4 text-left text-[13px]">
          <Row label="Căn hộ" value={selectedApartment?.name ?? "Tư vấn chung"} />
          <Row label="Ngày mong muốn" value={date ? formatDateVi(date) : "Linh hoạt"} />
          <Row label="Khung giờ" value={slot} />
          <Row label="Hình thức" value={method} />
        </div>

        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/can-ho"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-ivory-50 transition-colors hover:bg-ink-800"
          >
            Xem thêm căn hộ
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => {
              setDone(false);
              setName("");
              setPhone("");
              setNote("");
            }}
            className="text-sm font-medium text-ink-500 transition-colors hover:text-gold-600"
          >
            Đặt lịch khác
          </button>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl2 border border-ivory-200 bg-ivory-50 p-6 shadow-card sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-ivory-50">
          <CalendarCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="font-serif text-lg font-bold text-ink">
            Thông tin đặt lịch
          </p>
          <p className="text-[12px] text-ink-500">
            Điền thông tin, chúng tôi xác nhận trong ~15 phút.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Họ và tên" icon={User} required>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className={inputClass}
              required
            />
          </Field>
          <Field label="Số điện thoại" icon={Phone} required>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0901 234 567"
              className={inputClass}
              required
            />
          </Field>
        </div>

        <Field label="Căn hộ quan tâm" icon={Building2}>
          <select
            value={apartmentId}
            onChange={(e) => setApartmentId(e.target.value)}
            className={cn(inputClass, "appearance-none")}
          >
            <option value="">Tư vấn chung — chưa chọn căn cụ thể</option>
            {apartments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} · {a.subzone}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ngày mong muốn" icon={CalendarDays}>
            <input
              type="date"
              value={date}
              min={todayISO()}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Khung giờ" icon={Clock}>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              className={cn(inputClass, "appearance-none")}
            >
              {TIME_SLOTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Hình thức tham quan */}
        <div>
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-ink-500">
            Hình thức tham quan
          </span>
          <div className="grid grid-cols-2 gap-3">
            {METHODS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setMethod(value)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[13px] font-medium transition-all",
                  method === value
                    ? "border-gold-500 bg-gold-50 text-gold-700"
                    : "border-ivory-300 text-ink-500 hover:border-gold-300 hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <Field label="Ghi chú (tuỳ chọn)">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Số người tham quan, yêu cầu đặc biệt…"
            className={cn(inputClass, "h-auto resize-none py-3")}
          />
        </Field>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-rose-100 px-4 py-2.5 text-[13px] text-rose-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-ivory-50 transition-colors hover:bg-ink-800 disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Đang gửi…
          </>
        ) : (
          <>
            <CalendarCheck className="h-[18px] w-[18px]" />
            Xác nhận đặt lịch xem
          </>
        )}
      </button>

      <p className="mt-3 text-center text-[12px] text-ink-400">
        Bằng việc gửi, bạn đồng ý để StarLiving liên hệ tư vấn. Miễn phí &amp;
        không ràng buộc.
      </p>
    </form>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────
const inputClass =
  "h-11 w-full rounded-lg border border-ivory-300 bg-ivory px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-400 focus:border-gold-400";

function Field({
  label,
  icon: Icon,
  required,
  children,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-500">
        {Icon && <Icon className="h-3.5 w-3.5 text-gold-500" />}
        {label}
        {required && <span className="text-gold-600">*</span>}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-ink-500">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}

function formatDateVi(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
