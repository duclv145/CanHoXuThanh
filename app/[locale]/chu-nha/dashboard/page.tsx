import Link from "next/link";
import {
  TrendingUp,
  Building2,
  FileText,
  Inbox,
  Plus,
  LogOut,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { RevenueChart } from "@/components/owner/RevenueChart";
import { getApartments } from "@/lib/data";
import { formatVnd } from "@/lib/utils";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { APARTMENT_STATUS_TONE } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";

export default async function Page({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const t = getDictionary(locale).ownerArea.dash;
  const apartments = (await getApartments({})).slice(0, 5);

  // Doanh thu 12 tháng (mock, triệu đồng)
  const revenue = [62, 68, 71, 74, 80, 86, 84, 90, 97, 104, 112, 121].map(
    (value, i) => ({ month: t.months[i], value }),
  );

  const stats = [
    {
      icon: TrendingUp,
      label: t.statRevenue,
      value: "121 triệu",
      sub: "+8,7% " + t.statRevenueSub,
      up: true,
    },
    {
      icon: Building2,
      label: t.statOccupancy,
      value: "83%",
      sub: "5/6 " + t.statOccupancySub,
    },
    {
      icon: FileText,
      label: t.statLeases,
      value: "5",
      sub: "2 " + t.statLeasesSub,
    },
    {
      icon: Inbox,
      label: t.statLeads,
      value: "3",
      sub: "3 " + t.statLeadsSub,
    },
  ];

  const leads = [
    { name: "Trần Quốc Bảo", apt: "Kyoto Zen Apartment", date: "18/06", isNew: true },
    { name: "Lê Thuý Dương", apt: "Sentosa Lakeview Studio", date: "17/06", isNew: true },
    { name: "Phạm Hữu Tài", apt: "K-Park Avenue Premier", date: "16/06", isNew: false },
  ];

  const tenants = ["Nguyễn Hoà", "—", "Đỗ Lan", "—", "Vũ Hải"];

  return (
    <main className="min-h-screen bg-ivory pt-[72px]">
      <div className="container-x py-10 lg:py-12">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">{t.greeting}</span>
            <h1 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
              {t.owner}
            </h1>
            <p className="mt-2 text-[15px] text-ink-500">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={localePath(locale, "/chu-nha/them-can-ho")}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-ivory-50 transition-colors hover:bg-ink-800"
            >
              <Plus className="h-4 w-4" />
              {t.addApartment}
            </Link>
            <Link
              href={localePath(locale, "/chu-nha/dang-nhap")}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 px-5 text-sm font-medium text-ink-600 transition-colors hover:border-ink hover:text-ink"
            >
              <LogOut className="h-4 w-4" />
              {t.logout}
            </Link>
          </div>
        </div>

        {/* Stat cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, label, value, sub, up }) => (
            <div
              key={label}
              className="rounded-xl2 border border-ivory-200 bg-ivory-50 p-5 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-ivory-50">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                {up && (
                  <span className="flex items-center gap-0.5 text-[12px] font-semibold text-ink">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
              <p className="mt-4 text-2xl font-bold text-ink">{value}</p>
              <p className="mt-1 text-[13px] font-medium text-ink-600">{label}</p>
              <p className="mt-0.5 text-[12px] text-ink-400">{sub}</p>
            </div>
          ))}
        </div>

        {/* Chart + leads */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl2 border border-ivory-200 bg-ivory-50 p-6 shadow-card lg:col-span-2">
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold text-ink">
                  {t.revenueTitle}
                </h2>
                <p className="text-[12px] text-ink-400">{t.revenueSubtitle}</p>
              </div>
            </div>
            <RevenueChart data={revenue} />
          </div>

          <div className="rounded-xl2 border border-ivory-200 bg-ivory-50 p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-ink">
                {t.leadsTitle}
              </h2>
              <Link
                href={localePath(locale, "/chu-nha/dashboard")}
                className="text-[12px] font-medium text-ink-500 hover:text-ink"
              >
                {t.viewAll}
              </Link>
            </div>
            <ul className="space-y-3">
              {leads.map((l) => (
                <li
                  key={l.name}
                  className="flex items-center gap-3 rounded-xl border border-ivory-200 bg-white p-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory-200 text-[13px] font-semibold text-ink">
                    {l.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-ink">
                      {l.name}
                    </p>
                    <p className="flex items-center gap-1 truncate text-[12px] text-ink-400">
                      <Calendar className="h-3 w-3" />
                      {l.date} · {l.apt}
                    </p>
                  </div>
                  <Badge tone={l.isNew ? "blush" : "mist"}>
                    {l.isNew ? t.leadNew : t.leadContacted}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Apartments table */}
        <div className="mt-6 overflow-hidden rounded-xl2 border border-ivory-200 bg-ivory-50 shadow-card">
          <div className="flex items-center justify-between border-b border-ivory-200 px-6 py-4">
            <h2 className="font-serif text-lg font-bold text-ink">
              {t.apartmentsTitle}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-ivory-200 text-[12px] uppercase tracking-wide text-ink-400">
                  <th className="px-6 py-3 font-semibold">{t.thApartment}</th>
                  <th className="px-6 py-3 font-semibold">{t.thStatus}</th>
                  <th className="px-6 py-3 font-semibold">{t.thTenant}</th>
                  <th className="px-6 py-3 font-semibold">{t.thPrice}</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {apartments.map((a, i) => (
                  <tr
                    key={a.id}
                    className="border-b border-ivory-200 transition-colors last:border-0 hover:bg-ivory-100"
                  >
                    <td className="px-6 py-4">
                      <p className="text-[14px] font-semibold text-ink">{a.name}</p>
                      <p className="text-[12px] text-ink-400">{a.subzone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge tone={APARTMENT_STATUS_TONE[a.status]}>
                        {t.status[a.status]}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-ink-600">
                      {tenants[i] ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-[14px] font-semibold text-ink">
                      {formatVnd(a.price)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={localePath(locale, `/can-ho/${a.slug}`)}
                        className="text-[13px] font-medium text-ink-500 underline-offset-2 hover:text-ink hover:underline"
                      >
                        {t.manage}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
