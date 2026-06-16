"use client";

import { Suspense, useState } from "react";
import { FilterSidebar } from "./FilterSidebar";
import { SortBar } from "./SortBar";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { EmptyState } from "./EmptyState";
import { ListingCard } from "./ListingCard";
import type { Apartment } from "@/lib/types";

export function ListingPageShell({ apartments }: { apartments: Apartment[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="container-x py-10 lg:py-14">
        <div className="lg:flex lg:items-start lg:gap-10">
          {/* Filter sidebar — sticky, desktop only */}
          <aside className="hidden w-[260px] shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl2 border border-ivory-200 bg-ivory-50 p-6 shadow-card">
              <Suspense fallback={null}>
                <FilterSidebar />
              </Suspense>
            </div>
          </aside>

          {/* Main area */}
          <div className="min-w-0 flex-1">
            <Suspense
              fallback={
                <div className="mb-6 h-14 animate-pulse rounded-lg bg-ivory-200" />
              }
            >
              <SortBar
                count={apartments.length}
                onFilterClick={() => setMobileOpen(true)}
              />
            </Suspense>

            {apartments.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {apartments.map((a, i) => (
                  <ListingCard key={a.id} apartment={a} priority={i < 4} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      <Suspense fallback={null}>
        <MobileFilterSheet
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </Suspense>
    </>
  );
}
