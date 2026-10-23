import type { Page } from "@/components/kabo/page-context";

export const SIMPLE_PAGES = ["home", "about", "company", "solutions", "products", "industries", "services", "partners", "case-studies", "support", "contact", "investors", "procurement", "rfq", "configure"] as const;
export const DETAIL_SEGMENTS = {
  "solution-detail": "solutions", "product-detail": "products",
  "industry-detail": "industries", "partner-detail": "partners",
} as const;
const architectureSlugs = new Set(["campus-network", "ai-infrastructure", "data-centre", "surveillance", "wide-area", "document-systems", "cyber-resilience", "workplace", "sd-wan", "continuity", "cybersecurity", "hybrid-cloud"]);
const productSlugs = new Set(["compute-platforms", "storage-platforms", "networking-fabric", "cyber-security", "ai-gpu-compute", "cloud-platforms", "physical-security", "analytics-platforms", "backup-resilience", "digital-workplace"]);
const industrySlugs = new Set(["public-sector", "financial-services", "mining", "healthcare", "education", "telecommunications", "manufacturing", "retail", "smart-infrastructure", "transport-logistics", "energy-utilities", "construction-property", "agriculture-food", "hospitality-tourism", "professional-services", "nonprofit-organisations"]);
const partnerSlugs = new Set(["hpe", "hpe-aruba-networking", "aruba", "dell", "dell-technologies", "lenovo", "hp", "h3c", "huawei", "veeam", "canon", "hikvision"]);
const solutionSlugs = new Set(["campus-network", "ai-infrastructure", "data-centre", "surveillance", "wide-area", "document-systems", "cyber-resilience", "workplace", "compute", "data", "networking", "security", "cloud", "continuity", "digital-workplace", "physical-security", "analytics-bi", "iot-edge"]);
export function studioSlug(detail?: string | null): string {
  const aliases: Record<string,string> = {
    campus:"campus", "campus-network":"campus", compute:"compute", "ai-infrastructure":"compute",
    datacentre:"datacentre", "data-centre":"datacentre", "hybrid-cloud":"datacentre", surveillance:"security", security:"security",
    widearea:"widearea", "wide-area":"widearea", "sd-wan":"widearea", document:"document", "document-systems":"document",
    resilience:"resilience", "cyber-resilience":"resilience", continuity:"resilience", cybersecurity:"resilience", workplace:"workplace",
  };
  return aliases[detail || ""] || "campus";
}

export function pageToPath(page: Page, detail?: string | null): string {
  if (page === "home") return "/";
  if (page === "architecture") return `/studio/${studioSlug(detail || "sd-wan")}`;
  if (page === "case-studies") return "/studio/campus";
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
    if (stem === "solutions" && slug === "sd-wan") return { page: "architecture", detail: slug };
    const type: Record<string, Page> = {
      solutions: "solution-detail", products: "product-detail", industries: "industry-detail", partners: "partner-detail",
    };
    if (stem === "products" && !productSlugs.has(slug)) return null;
    if (stem === "industries" && !industrySlugs.has(slug)) return null;
    if (stem === "partners" && !partnerSlugs.has(slug)) return null;
    if (stem === "solutions" && !solutionSlugs.has(slug)) return null;
    if (type[stem]) return { page: type[stem], detail: slug };
  }
  return null;
}
