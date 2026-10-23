import type { MetadataRoute } from "next";

/** Public reference and commercial routes only; private or unverified content is excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const root = "https://www.kaboitgroup.co.za";
  const slugs = [
    "", "company", "about", "solutions", "products", "procurement", "partners", "services", "industries", "support", "contact", "investors", "rfq", "configure",
    ...["campus", "compute", "datacentre", "security", "widearea", "document", "resilience", "workplace"].map(slug => `studio/${slug}`),
    ...["campus-network", "ai-infrastructure", "data-centre", "surveillance", "wide-area", "document-systems", "cyber-resilience", "workplace"].map(slug => `solutions/${slug}`),
    ...["compute", "data", "networking", "security", "cloud", "continuity", "digital-workplace", "physical-security", "analytics-bi", "iot-edge"].map(slug => `solutions/${slug}`),
    ...["compute-platforms", "storage-platforms", "networking-fabric", "cyber-security", "ai-gpu-compute", "cloud-platforms", "physical-security", "analytics-platforms", "backup-resilience", "digital-workplace"].map(slug => `products/${slug}`),
    ...["public-sector", "financial-services", "mining", "healthcare", "education", "telecommunications", "manufacturing", "retail", "smart-infrastructure", "transport-logistics", "energy-utilities", "construction-property", "agriculture-food", "hospitality-tourism", "professional-services", "nonprofit-organisations"].map(slug => `industries/${slug}`),
  ];
  return slugs.map((slug) => ({ url: root + "/" + slug, changeFrequency: slug ? "monthly" : "weekly", priority: !slug ? 1 : slug.startsWith("solutions/") ? 0.85 : 0.7 }));
}
