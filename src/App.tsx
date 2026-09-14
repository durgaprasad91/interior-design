import { useEffect } from "react";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Ethos from "./components/Ethos";
import Portfolio from "./components/Portfolio";
import RoomSection from "./components/RoomSection";
import BeforeAfter from "./components/BeforeAfter";
import Packages from "./components/Packages";
import Estimator from "./components/Estimator";
import Materials from "./components/Materials";
import Faq from "./components/Faq";
import Process from "./components/Process";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import QuoteForm from "./components/QuoteForm";
import Footer from "./components/Footer";
import FloatingCta from "./components/FloatingCta";
import { SITE } from "./config/site";
import { ScrollTrigger, useSmoothScroll } from "./lib/motion";
import { bootComplete } from "./lib/boot";
import { useSectionRouter } from "./lib/router";

export default function App() {
  useSmoothScroll();
  useSectionRouter();

  // Pinned/scroll-triggered sections measure themselves while the preloader
  // still has the page locked, so their start/end values need recomputing
  // once it lifts.
  useEffect(() => {
    let cancelled = false;
    bootComplete.then(() => {
      if (cancelled) return;
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // LocalBusiness structured data — helps the business surface in local search.
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: SITE.brandFull,
      description: SITE.tagline,
      telephone: SITE.phone,
      email: SITE.email,
      address: { "@type": "PostalAddress", addressLocality: SITE.city, streetAddress: SITE.address },
      areaServed: SITE.city,
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Ethos />
        <Portfolio />
        <RoomSection />
        <BeforeAfter />
        <Packages />
        <Estimator />
        <Materials />
        <Process />
        <WhyUs />
        <Faq />
        <Testimonials />
        <QuoteForm />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
