"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";
import { pageToPath, pathToPage } from "@/lib/site-routes";

export type Page =
  | "home" | "about" | "solutions" | "solution-detail" | "products" | "product-detail"
  | "industries" | "industry-detail" | "services" | "partners" | "partner-detail"
  | "case-studies" | "support" | "contact" | "investors" | "procurement" | "rfq" | "architecture" | "configure";

interface PageContextValue {
  currentPage: Page;
  selectedDetail: string | null;
  navigate: (page: Page, detail?: string) => void;
}

const PageContext = createContext<PageContextValue | undefined>(undefined);

export function PageProvider({ children, initialPage = "home", initialDetail = null }: { children: React.ReactNode; initialPage?: Page; initialDetail?: string | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<Page>(initialPage);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(initialDetail);

  useEffect(() => {
    const route = pathToPage(pathname);
    if (route) { setCurrentPage(route.page); setSelectedDetail(route.detail); }
  }, [pathname]);

  const navigate = useCallback((page: Page, detail?: string) => {
    setCurrentPage(page);
    setSelectedDetail(detail ?? null);
    router.push(pageToPath(page, detail));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [router]);

  return (
    <PageContext.Provider value={{ currentPage, selectedDetail, navigate }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error("usePage must be used within a PageProvider");
  return ctx;
}
