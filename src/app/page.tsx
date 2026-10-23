"use client";

import { MotionConfig, motion } from "framer-motion";
import { PageProvider, usePage } from "@/components/kabo/page-context";
import { Navigation } from "@/components/elevated/navigation";
import { ElevatedFooter } from "@/components/elevated/footer";
import { ElevatedHome } from "@/components/elevated/homepage";
import { CatalogPage } from "@/components/elevated/catalog-pages";
import { CompanyPage } from "@/components/elevated/company-pages";
import {
  ContactPage,
  SupportPage,
} from "@/components/elevated/support-contact";
import { PolicyPage } from "@/components/elevated/policy-page";

function PageContent() {
  const { currentPage, selectedDetail } = usePage();
  function content() {
    switch (currentPage) {
      case "home":
        return <ElevatedHome />;
      case "solutions":
        return <CatalogPage kind="solutions" />;
      case "solution-detail":
        return (
          <CatalogPage kind="solutions" detail={selectedDetail || undefined} />
        );
      case "products":
        return <CatalogPage kind="products" />;
      case "product-detail":
        return (
          <CatalogPage kind="products" detail={selectedDetail || undefined} />
        );
      case "industries":
        return <CatalogPage kind="industries" />;
      case "industry-detail":
        return (
          <CatalogPage kind="industries" detail={selectedDetail || undefined} />
        );
      case "partners":
        return <CatalogPage kind="partners" />;
      case "partner-detail":
        return (
          <CatalogPage kind="partners" detail={selectedDetail || undefined} />
        );
      case "about":
      case "services":
      case "case-studies":
      case "investors":
        return <CompanyPage kind={currentPage} />;
      case "contact":
        return <ContactPage />;
      case "support":
        return <SupportPage />;
      case "privacy":
      case "terms":
        return <PolicyPage kind={currentPage} />;
      default:
        return <ElevatedHome />;
    }
  }
  return (
    <>
      <Navigation />
      <motion.main
        id="main-content"
        key={currentPage + (selectedDetail || "")}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        tabIndex={-1}
      >
        {content()}
      </motion.main>
      <ElevatedFooter />
    </>
  );
}

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <PageProvider>
        <PageContent />
      </PageProvider>
    </MotionConfig>
  );
}
