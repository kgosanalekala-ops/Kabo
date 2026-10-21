/** Hero image catalogue shared by the on-page hero and the glass header. */
export const HERO_VARIANT_IMAGE = {
  datacenter: "/images/sol_datacenter.jpg",
  network: "/images/sol_campus.jpg",
  security: "/images/sol_government.jpg",
  smartcity: "/images/sol_smartcity.jpg",
  abstract: "/images/sol_noc.jpg",
} as const;

export type HeroVariant = keyof typeof HERO_VARIANT_IMAGE;

const PRODUCT_VARIANTS: Record<string, HeroVariant> = {
  "ai-compute": "datacenter", "data-centre": "datacenter",
  "storage-resilience": "abstract", networking: "network",
  "cyber-security": "security", ccaas: "network",
  "document-management": "abstract", "digital-workplace": "abstract",
};
const SOLUTION_VARIANTS: Record<string, HeroVariant> = {
  compute: "datacenter", data: "datacenter", "ai-infrastructure": "datacenter",
  continuity: "datacenter", "analytics-bi": "datacenter", networking: "network",
  cloud: "network", security: "security", "physical-security": "security",
  "digital-workplace": "abstract", "iot-edge": "abstract",
};
const INDUSTRY_VARIANTS: Record<string, HeroVariant> = {
  healthcare: "abstract", education: "abstract", "financial-services": "abstract",
  "public-sector": "abstract", mining: "datacenter", "oil-gas": "datacenter",
  manufacturing: "datacenter", logistics: "network", retail: "network",
  hospitality: "abstract", transportation: "network",
  "energy-utilities": "datacenter", "defense-security": "security",
  "smart-city": "smartcity", agriculture: "abstract",
};

/** Keep the opening glass navigation on the same photograph as the page hero. */
export function getHeaderHeroImage(page: string, detail: string | null): string {
  let variant: HeroVariant;
  switch (page) {
    case "home":
    case "products":
      variant = "datacenter"; break;
    case "solutions":
    case "services":
      variant = "network"; break;
    case "industries":
      variant = "smartcity"; break;
    case "solution-detail":
      variant = SOLUTION_VARIANTS[detail ?? ""] ?? "abstract"; break;
    case "product-detail":
      variant = PRODUCT_VARIANTS[detail ?? ""] ?? "abstract"; break;
    case "industry-detail":
      variant = INDUSTRY_VARIANTS[detail ?? ""] ?? "abstract"; break;
    default:
      variant = "abstract";
  }
  return HERO_VARIANT_IMAGE[variant];
}
