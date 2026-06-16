import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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

export default async function HomePage() {
  const [featured, stats] = await Promise.all([
    getFeaturedApartments(3),
    getSiteStats(),
  ]);
  const testimonials = getTestimonials();

  return (
    <>
      <Navbar />
      <main>
        <Hero stats={stats} />
        <TrustStrip />
        <FeaturedListings apartments={featured} />
        <Services />
        <Process />
        <OwnerCta />
        <Testimonials items={testimonials} />
      </main>
      <Footer />
    </>
  );
}
