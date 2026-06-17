import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ListingCard } from "@/components/listing/ListingCard";
import type { Apartment } from "@/lib/types";
import { localePath } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function FeaturedListings({
  apartments,
  dict,
  locale,
}: {
  apartments: Apartment[];
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={dict.featured.eyebrow}
          title={dict.featured.title}
          description={dict.featured.desc}
          action={
            <Button as="link" href={localePath(locale, "/can-ho")} variant="outline" size="md">
              {dict.featured.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Button>
          }
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apt, i) => (
            <ListingCard key={apt.id} apartment={apt} priority={i === 0} dict={dict} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
