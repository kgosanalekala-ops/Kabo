import type { Page } from "@/components/kabo/page-context";

export const SIMPLE_PAGES = ["home", "about", "company", "solutions", "products", "industries", "services", "partners", "case-studies", "support", "contact", "investors", "procurement", "rfq", "configure"] as const;
export const DETAIL_SEGMENTS = {
  "solution-detail": "solutions", "product-detail": "products",
  "industry-detail": "industries", "partner-detail": "partners",
} as const;
const architectureSlugs = new Set(["sd-wan", "campus-network", "data-centre", "surveillance", "ai-infrastructure", "continuity", "cybersecurity", "hybrid-cloud"]);

export function pageToPath(page: Page, detail?: string | null): string {
  if (page === "home") return "/";
  if (page === "architecture") return `/architectures/${encodeURIComponent(detail || "sd-wan")}`;
  if (page === "rfq") return detail ? `/rfq/${encodeURIComponent(detail)}` : "/rfq";
  if (page.endsWith("-detail")) {
    const stem = DETAIL_SEGMENTS[page as keyof typeof DETAIL_SEGMENTS];
    return `/${stem}/${encodeURIComponent(detail || "")}`;
  }
  return `/${page}`;
}

export function pathToPage(pathname: string): { page: Page; detail: string | null } | null {
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return { page: "home", detail: null };
  if (parts.length === 1 && SIMPLE_PAGES.includes(parts[0] as typeof SIMPLE_PAGES[number])) {
    return { page: parts[0] as Page, detail: null };
  }
  if (parts.length === 2) {
    const [stem, slug] = parts;
    if (!/^[a-z0-9-]{1,100}$/.test(slug)) return null;
    if (stem === "rfq") return { page: "rfq", detail: slug };
    if (stem === "architectures" && architectureSlugs.has(slug)) return { page: "architecture", detail: slug };
    if (stem === "solutions" && ["sd-wan", "campus-network", "data-centre", "surveillance"].includes(slug)) return { page: "architecture", detail: slug };
    const type: Record<string, Page> = {
      solutions: "solution-detail", products: "product-detail", industries: "industry-detail", partners: "partner-detail",
    };
    if (type[stem]) return { page: type[stem], detail: slug };
  }
  return null;
}
