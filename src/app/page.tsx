"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PageProvider, usePage } from "@/components/kabo/page-context";
import { Navbar } from "@/components/kabo/navbar";
import { Footer } from "@/components/kabo/footer";
import { Hero } from "@/components/kabo/hero";
import { Stats } from "@/components/kabo/stats";
import { About } from "@/components/kabo/about";
import { Framework } from "@/components/kabo/framework";
import { Solutions } from "@/components/kabo/solutions";
import { AIInfrastructure } from "@/components/kabo/ai-infrastructure";
import { WhyKABO } from "@/components/kabo/why-kabo";
import { CoreServices } from "@/components/kabo/core-services";
import { ProcurementAdvantage } from "@/components/kabo/procurement-advantage";
import { Resources } from "@/components/kabo/resources";
import { Investor } from "@/components/kabo/investor";
import { ThoughtLeadership } from "@/components/kabo/thought-leadership";
import { Contact } from "@/components/kabo/contact";
import { AboutPage } from "@/components/kabo/pages/about-page";
import { SolutionsPage } from "@/components/kabo/pages/solutions-page";
import { SolutionDetailPage } from "@/components/kabo/pages/solution-detail-page";
import { PartnersPage } from "@/components/kabo/pages/partners-page";
import { PartnerDetailPage } from "@/components/kabo/pages/partner-detail-page";
import { CaseStudiesPage } from "@/components/kabo/pages/case-studies-page";
import { ContactPage } from "@/components/kabo/pages/contact-page";
import { IndustriesPage } from "@/components/kabo/pages/industries-page";
import { IndustryDetailPage } from "@/components/kabo/pages/industry-detail-page";
import { ProductsPage } from "@/components/kabo/pages/products-page";
import { ProductDetailPage } from "@/components/kabo/pages/product-detail-page";
import { ServicesPage } from "@/components/kabo/pages/services-page";
import { SupportPage } from "@/components/kabo/pages/support-page";
import { InvestorPage } from "@/components/kabo/pages/investor-page";
import { ScrollToTopButton } from "@/components/kabo/scroll-to-top-button";

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
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

function PageRouter() {
  const { currentPage, selectedDetail } = usePage();
  return (
    <AnimatePresence mode="wait">
      <motion.main key={currentPage + (selectedDetail ?? "")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="flex-1">
        {(() => {
          switch (currentPage) {
            case "home": return <HomePage />;
            case "about": return <AboutPage />;
            case "solutions": return <SolutionsPage />;
            case "solution-detail": return <SolutionDetailPage detail={selectedDetail ?? "ai-infrastructure"} />;
            case "products": return <ProductsPage />;
            case "product-detail": return <ProductDetailPage slug={selectedDetail ?? "ai-compute"} />;
            case "industries": return <IndustriesPage />;
            case "industry-detail": return <IndustryDetailPage slug={selectedDetail ?? "healthcare"} />;
            case "services": return <ServicesPage />;
            case "support": return <SupportPage />;
            case "partners": return <PartnersPage />;
            case "partner-detail": return <PartnerDetailPage detail={selectedDetail ?? "hpe"} />;
            case "case-studies": return <CaseStudiesPage />;
            case "contact": return <ContactPage />;
            case "investors": return <InvestorPage />;
            default: return <HomePage />;
          }
        })()}
      </motion.main>
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <PageProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <PageRouter />
        <Footer />
        <ScrollToTopButton />
      </div>
    </PageProvider>
  );
}
