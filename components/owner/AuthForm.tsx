"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, User, Phone, Mail, Lock, Home, ArrowRight } from "lucide-react";
import { useI18n, localePath } from "@/lib/i18n/provider";

const fieldWrap = "relative";
const fieldClass =
  "h-12 w-full rounded-xl border border-ivory-300 bg-white pl-10 pr-3.5 text-sm text-ink outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15";
const iconClass =
  "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400";
const labelClass =
  "mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-ink-500";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { locale, dict } = useI18n();
  const t = dict.ownerArea;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Demo: không xác thực thật, chuyển thẳng vào bảng điều khiển.
    setTimeout(() => router.push(localePath(locale, "/chu-nha/dashboard")), 700);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "register" && (
        <div>
          <label className={labelClass}>{t.fullName}</label>
          <div className={fieldWrap}>
            <User className={iconClass} />
            <input className={fieldClass} placeholder="Nguyễn Văn A" required />
          </div>
        </div>
      )}

      <div>
        <label className={labelClass}>
          {mode === "register" ? t.phone : `${t.email} / ${t.phone}`}
        </label>
        <div className={fieldWrap}>
          {mode === "register" ? (
            <Phone className={iconClass} />
          ) : (
            <Mail className={iconClass} />
          )}
          <input
            className={fieldClass}
            placeholder={
              mode === "register" ? "0961 893 268" : "email@example.com"
            }
            required
          />
        </div>
      </div>

      {mode === "register" && (
        <div>
          <label className={labelClass}>{t.email}</label>
          <div className={fieldWrap}>
            <Mail className={iconClass} />
            <input
              type="email"
              className={fieldClass}
              placeholder="email@example.com"
            />
          </div>
        </div>
      )}

      <div>
        <label className={labelClass}>{t.password}</label>
        <div className={fieldWrap}>
          <Lock className={iconClass} />
          <input
            type="password"
            className={fieldClass}
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      {mode === "register" && (
        <div>
          <label className={labelClass}>{t.apartmentCount}</label>
          <div className={fieldWrap}>
            <Home className={iconClass} />
            <input
              type="number"
              min={1}
              defaultValue={1}
              className={fieldClass}
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-500 text-[15px] font-semibold text-white shadow-card transition-all hover:bg-gold-600 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {mode === "register" ? t.register : t.login}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-[12px] text-ink-400">{t.demoNote}</p>

      <p className="pt-2 text-center text-[13px] text-ink-500">
        {mode === "register" ? t.haveAccount : t.noAccount}{" "}
        <Link
          href={localePath(
            locale,
            mode === "register" ? "/chu-nha/dang-nhap" : "/chu-nha/dang-ky",
          )}
          className="font-semibold text-gold-600 underline-offset-2 hover:underline"
        >
          {mode === "register" ? t.loginNow : t.registerNow}
        </Link>
      </p>
    </form>
  );
}
