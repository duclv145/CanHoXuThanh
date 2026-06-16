import Link from "next/link";
import { SearchX } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex min-h-[44vh] flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ivory-200">
        <SearchX className="h-7 w-7 text-ink-400" />
      </div>
      <h3 className="font-serif text-xl font-bold text-ink">
        Không tìm thấy căn hộ phù hợp
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-ink-500">
        Thử điều chỉnh bộ lọc hoặc mở rộng tiêu chí tìm kiếm để xem thêm kết quả.
      </p>
      <Link
        href="/can-ho"
        className="mt-6 inline-flex items-center rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-ink-700"
      >
        Xoá bộ lọc, xem tất cả
      </Link>
    </div>
  );
}
