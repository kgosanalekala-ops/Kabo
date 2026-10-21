import type { MetadataRoute } from "next";

/** Public reference and commercial routes only; private or unverified content is excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const root = "https://www.kaboitgroup.co.za";
  const slugs = [
    "", "about", "solutions", "products", "procurement", "partners", "services", "industries", "support", "contact", "rfq",
    "configure", "architectures/sd-wan", "architectures/campus-network", "architectures/data-centre", "architectures/surveillance", "architectures/ai-infrastructure", "architectures/continuity", "architectures/cybersecurity", "architectures/hybrid-cloud", "solutions/ai-infrastructure", "solutions/continuity", "solutions/security", "solutions/cloud",
  ];
  return slugs.map((slug) => ({ url: root + "/" + slug, changeFrequency: slug ? "monthly" : "weekly", priority: !slug ? 1 : slug.startsWith("solutions/") ? 0.85 : 0.7 }));
}
