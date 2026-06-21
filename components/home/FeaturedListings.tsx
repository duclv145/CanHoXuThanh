import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
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
        />

        {/* Banner slider vừa khung website, bo góc */}
        <div className="mt-12">
          <FeaturedCarousel apartments={apartments} dict={dict} locale={locale} />
        </div>

        <div className="mt-12 flex justify-center">
          <Button as="link" href={localePath(locale, "/can-ho")} variant="outline" size="md">
            {dict.featured.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
