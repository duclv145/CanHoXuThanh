import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ListingCard } from "@/components/listing/ListingCard";
import type { Apartment } from "@/lib/types";

export function FeaturedListings({ apartments }: { apartments: Apartment[] }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Căn hộ nổi bật"
          title="Tuyển chọn xứng tầm"
          description="Những căn hộ được đánh giá cao nhất, sẵn sàng đón chủ nhân mới."
          action={
            <Button as="link" href="/can-ho" variant="outline" size="md">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Button>
          }
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apt, i) => (
            <ListingCard key={apt.id} apartment={apt} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
