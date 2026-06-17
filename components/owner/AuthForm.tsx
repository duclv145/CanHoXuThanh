"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useI18n, localePath } from "@/lib/i18n/provider";

const fieldClass =
  "h-11 w-full rounded-xl border border-ivory-300 bg-white px-3.5 text-sm text-ink outline-none transition-colors focus:border-ink";
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
          <input className={fieldClass} placeholder="Nguyễn Văn A" required />
        </div>
      )}

      <div>
        <label className={labelClass}>
          {mode === "register" ? t.phone : `${t.email} / ${t.phone}`}
        </label>
        <input
          className={fieldClass}
          placeholder={mode === "register" ? "0961 893 268" : "email@example.com"}
          required
        />
      </div>

      {mode === "register" && (
        <div>
          <label className={labelClass}>{t.email}</label>
          <input type="email" className={fieldClass} placeholder="email@example.com" />
        </div>
      )}

      <div>
        <label className={labelClass}>{t.password}</label>
        <input type="password" className={fieldClass} placeholder="••••••••" required />
      </div>

      {mode === "register" && (
        <div>
          <label className={labelClass}>{t.apartmentCount}</label>
          <input type="number" min={1} defaultValue={1} className={fieldClass} />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-semibold text-ivory-50 transition-all hover:bg-ink-800 disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {mode === "register" ? t.register : t.login}
      </button>

      <p className="text-center text-[12px] text-ink-400">{t.demoNote}</p>

      <p className="pt-2 text-center text-[13px] text-ink-500">
        {mode === "register" ? t.haveAccount : t.noAccount}{" "}
        <Link
          href={localePath(
            locale,
            mode === "register" ? "/chu-nha/dang-nhap" : "/chu-nha/dang-ky",
          )}
          className="font-semibold text-ink underline-offset-2 hover:underline"
        >
          {mode === "register" ? t.loginNow : t.registerNow}
        </Link>
      </p>
    </form>
  );
}
