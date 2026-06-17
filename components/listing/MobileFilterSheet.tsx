"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterSidebar } from "./FilterSidebar";
import { useI18n } from "@/lib/i18n/provider";

export function MobileFilterSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { dict } = useI18n();
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal
        aria-label={dict.filters.title}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 max-h-[88vh] overflow-y-auto rounded-t-2xl bg-ivory shadow-float transition-transform duration-500 ease-out lg:hidden",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        {/* Sticky drag handle + title */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ivory-200 bg-ivory px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="mx-auto h-1 w-10 rounded-full bg-ivory-300 lg:hidden" />
            <span className="font-semibold text-ink">{dict.filters.title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.nav.closeMenu}
            className="rounded-full p-1.5 text-ink-500 transition-colors hover:bg-ivory-200 hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 pb-10">
          <FilterSidebar onApply={onClose} />
        </div>
      </div>
    </>
  );
}
