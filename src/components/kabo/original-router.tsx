"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePage } from "./page-context";

import { Hero } from "./hero";
import { About } from "./about";
import { Framework } from "./framework";
import { Solutions } from "./solutions";
import { AIInfrastructure } from "./ai-infrastructure";
import { CoreServices } from "./core-services";
import { ProcurementAdvantage } from "./procurement-advantage";
import { WhyKABO } from "./why-kabo";
import { ThoughtLeadership } from "./thought-leadership";
import { Resources } from "./resources";
import { Investor } from "./investor";
import { Contact } from "./contact";

import { AboutPage } from "./pages/about-page";
import { SolutionsPage } from "./pages/solutions-page";
import { SolutionDetailPage } from "./pages/solution-detail-page";
import { ProductsPage } from "./pages/products-page";
import { ProductDetailPage } from "./pages/product-detail-page";
import { IndustriesPage } from "./pages/industries-page";
import { IndustryDetailPage } from "./pages/industry-detail-page";
import { ServicesPage } from "./pages/services-page";
import { PartnersPage } from "./pages/partners-page";
import { PartnerDetailPage } from "./pages/partner-detail-page";
import { CaseStudiesPage } from "./pages/case-studies-page";
import { SupportPage } from "./pages/support-page";
import { ContactPage } from "./pages/contact-page";
import { InvestorPage } from "./pages/investor-page";
import { ProcurementPage } from "./pages/procurement-page";
import { RFQPage } from "./pages/rfq-page";
import { ConfiguratorPage } from "./pages/configurator-page";

/**
 * This is the original, complete KABO Next.js homepage sequence recovered
 * from the source checkpoint. Keep this order and its content intact.
 * The approved newer header/footer are mounted by VisionShell around it.
 */
function OriginalHome() {
  return (
    <>
      <Hero />
      <About />
      <Framework />
      <Solutions variant="home" />
      <AIInfrastructure />
      <CoreServices />
      <ProcurementAdvantage />
      <WhyKABO />
      <ThoughtLeadership />
      <Resources />
      <Investor />
      <Contact />
    </>
  );
}

/** Preserve the original dedicated page routes, without the 3D/architecture studio. */
export function OriginalRouter() {
  const { currentPage, selectedDetail } = usePage();
  const reducedMotion = useReducedMotion();
  const detail = selectedDetail ?? "";

  const page = (() => {
    switch (currentPage) {
      case "home": return <OriginalHome />;
      case "about": return <AboutPage />;
      case "solutions": return <SolutionsPage />;
      case "solution-detail": return <SolutionDetailPage detail={detail} />;
      case "products": return <ProductsPage />;
      case "product-detail": return <ProductDetailPage slug={detail} />;
      case "industries": return <IndustriesPage />;
      case "industry-detail": return <IndustryDetailPage slug={detail} />;
      case "services": return <ServicesPage />;
      case "partners": return <PartnersPage />;
      case "partner-detail": return <PartnerDetailPage detail={detail} />;
      case "case-studies":
      case "architecture": return <CaseStudiesPage />;
      case "support": return <SupportPage />;
      case "contact": return <ContactPage />;
      case "investors": return <InvestorPage />;
      case "procurement": return <ProcurementPage />;
      case "rfq": return <RFQPage context={detail || undefined} />;
      case "configure": return <ConfiguratorPage />;
      default: return <OriginalHome />;
    }
  })();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={currentPage + ":" + detail}
        className="vf-content kabo-original-content"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: reducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        {page}
      </motion.main>
    </AnimatePresence>
  );
}
