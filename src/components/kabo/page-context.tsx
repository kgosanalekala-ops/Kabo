"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type Page =
  | "home" | "about" | "solutions" | "solution-detail" | "products" | "product-detail"
  | "industries" | "industry-detail" | "services" | "partners" | "partner-detail"
  | "case-studies" | "support" | "contact" | "investors";

interface PageContextValue {
  currentPage: Page;
  selectedDetail: string | null;
  navigate: (page: Page, detail?: string) => void;
}

const PageContext = createContext<PageContextValue | undefined>(undefined);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

  const navigate = useCallback((page: Page, detail?: string) => {
    setCurrentPage(page);
    setSelectedDetail(detail ?? null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

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
