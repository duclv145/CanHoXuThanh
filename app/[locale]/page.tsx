import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { OwnerCta } from "@/components/home/OwnerCta";
import { Testimonials } from "@/components/home/Testimonials";
import {
  getFeaturedApartments,
  getSiteStats,
  getTestimonials,
} from "@/lib/data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default async function HomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = getDictionary(params.locale);
  const [featured, stats] = await Promise.all([
    getFeaturedApartments(6),
    getSiteStats(),
  ]);
  const testimonials = getTestimonials();

  return (
    <main>
      <Hero stats={stats} dict={dict} locale={params.locale} />
      <TrustStrip dict={dict} />
      <FeaturedListings apartments={featured} dict={dict} locale={params.locale} />
      <Services dict={dict} />
      <Process dict={dict} />
      <OwnerCta dict={dict} locale={params.locale} />
      <Testimonials items={testimonials} dict={dict} />
    </main>
  );
}
