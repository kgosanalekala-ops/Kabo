import type { Page } from "@/components/kabo/page-context";

export const SIMPLE_PAGES = [
  "about",
  "solutions",
  "products",
  "industries",
  "services",
  "partners",
  "case-studies",
  "support",
  "contact",
  "investors",
  "privacy",
  "terms",
] as const;

const DETAIL_PAGES = {
  solutions: {
    page: "solution-detail",
    slugs: [
      "compute",
      "data",
      "networking",
      "security",
      "ai-infrastructure",
      "cloud",
      "digital-workplace",
      "physical-security",
      "analytics-bi",
      "continuity",
      "iot-edge",
      "managed-services-itsm",
    ],
  },
  products: {
    page: "product-detail",
    slugs: [
      "compute-platforms",
      "storage-platforms",
      "networking-fabric",
      "cyber-security",
      "ai-gpu-compute",
      "cloud-platforms",
      "physical-security",
      "analytics-platforms",
      "backup-resilience",
      "digital-workplace",
    ],
  },
  industries: {
    page: "industry-detail",
    slugs: [
      "public-sector",
      "financial-services",
      "mining",
      "healthcare",
      "education",
      "telecommunications",
      "manufacturing",
      "retail",
      "smart-infrastructure",
    ],
  },
  partners: {
    page: "partner-detail",
    slugs: [
      "hpe",
      "dell",
      "microsoft",
      "veeam",
      "fortinet",
      "sophos",
      "palo-alto",
      "pure-storage",
      "commvault",
      "juniper",
      "schneider",
      "huawei",
      "manageengine",
      "h3c",
      "hikvision",
      "lenovo",
      "aruba",
      "hp",
      "canon",
      "acer",
      "nvidia",
    ],
  },
} satisfies Record<string, { page: Page; slugs: string[] }>;

export function hrefFor(page: Page, detail?: string | null): string {
  if (page === "home") return "/";
  for (const [stem, group] of Object.entries(DETAIL_PAGES)) {
    if (group.page === page)
      return detail ? `/${stem}/${encodeURIComponent(detail)}` : `/${stem}`;
  }
  return `/${page}`;
}

export const pageToPath = hrefFor;

export function pathToPage(
  pathname: string,
): { page: Page; detail: string | null } | null {
  let parts: string[];
  try {
    parts = pathname.split("/").filter(Boolean).map(decodeURIComponent);
  } catch {
    return null;
  }
  if (!parts.length) return { page: "home", detail: null };
  if (
    parts.length === 1 &&
    SIMPLE_PAGES.includes(parts[0] as (typeof SIMPLE_PAGES)[number])
  ) {
    return { page: parts[0] as Page, detail: null };
  }
  if (parts.length === 2) {
    const group = DETAIL_PAGES[parts[0] as keyof typeof DETAIL_PAGES];
    if (group && group.slugs.includes(parts[1]))
      return { page: group.page, detail: parts[1] };
  }
  return null;
}

export function allBusinessPaths(): string[] {
  return [
    ...SIMPLE_PAGES.map((page) => `/${page}`),
    ...Object.entries(DETAIL_PAGES).flatMap(([stem, group]) =>
      group.slugs.map((slug) => `/${stem}/${slug}`),
    ),
  ];
}
