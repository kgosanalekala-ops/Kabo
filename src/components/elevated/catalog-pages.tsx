"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Search,
  X,
} from "lucide-react";
import {
  SOLUTIONS,
  PARTNERS,
  EXTENDED_VENDORS,
  type Solution,
  type Partner,
  type ExtendedVendor,
} from "@/components/kabo/data";
import {
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/components/kabo/products-data";
import { INDUSTRIES, type Industry } from "@/components/kabo/industries-data";
import { PageHero, type HeroVariant } from "./page-hero";
import { SiteLink } from "./site-link";
import { IntelligenceBrief } from "./intelligence-brief";

type CatalogKind = "solutions" | "products" | "industries" | "partners";
type Vendor = Partner | ExtendedVendor;
const VENDORS: Vendor[] = [...PARTNERS, ...EXTENDED_VENDORS];
const DETAIL_PAGES = {
  solutions: "solution-detail",
  products: "product-detail",
  industries: "industry-detail",
  partners: "partner-detail",
} as const;
const INDUSTRY_IMAGES: Record<string, string> = {
  "public-sector": "/images/sol_government.jpg",
  "financial-services": "/images/sol_banking.jpg",
  mining: "/images/sol_mining.jpg",
  healthcare: "/images/sol_hospital.jpg",
  education: "/images/sol_campus.jpg",
  telecommunications: "/images/sol_smartcity.jpg",
  manufacturing: "/images/sol_manufacturing.jpg",
  retail: "/images/sol_retail.jpg",
  "smart-infrastructure": "/images/sol_smartcity.jpg",
};
const CATEGORY_IMAGES: Record<string, string> = {
  "compute-platforms": "/images/sol_datacenter.jpg",
  "storage-platforms": "/images/sol_datacenter.jpg",
  "networking-fabric": "/images/sol_campus.jpg",
  "cyber-security": "/images/sol_government.jpg",
  "ai-gpu-compute": "/images/sol_datacenter.jpg",
  "cloud-platforms": "/images/sol_noc.jpg",
  "digital-workplace": "/images/sol_callcenter.jpg",
  "physical-security": "/images/sol_smartcity.jpg",
  "analytics-bi": "/images/sol_noc.jpg",
  "iot-edge": "/images/sol_manufacturing.jpg",
};
const INDEX = {
  solutions: {
    tag: "SOLUTIONS",
    title: (
      <>
        Solutions engineered
        <br />
        for <span className="intel-text-gradient">Africa’s reality.</span>
      </>
    ),
    subtitle:
      "Twelve interlocking solution domains — from compute and AI infrastructure to managed services and ITSM — engineered against your workload, not a vendor SKU. Click a card to see the technology stack.",
    variant: "network" as HeroVariant,
    label: "THE SOLUTION PORTFOLIO",
    heading: "Every layer. One architecture.",
    description:
      "Explore the infrastructure, technology stack and outcomes behind each KABO solution.",
  },
  products: {
    tag: "PRODUCTS & TECHNOLOGIES",
    title: (
      <>
        Products & Technologies
        <br />
        <span className="intel-text-gradient">One curated</span> technology
        portfolio.
      </>
    ),
    subtitle:
      "Ten product categories across fifteen strategic alliances and a broader vendor estate — from AI compute and cloud infrastructure through to digital workplace.",
    variant: "datacenter" as HeroVariant,
    label: "PRODUCTS / TECHNOLOGIES",
    heading: "The right platform for the workload.",
    description:
      "KABO curates technology across fifteen strategic alliances and a broader vendor estate into ten product categories — from AI compute and cloud infrastructure through to digital workplace. Each engineered to integrate with the next. No orphan SKUs, no orphan accountability.",
  },
  industries: {
    tag: "INDUSTRIES",
    title: (
      <>
        Industry-vertical expertise,
        <br />
        <span className="intel-text-gradient">engineered in.</span>
      </>
    ),
    subtitle:
      "Nine verticals across public and private enterprise. Each with its own regulatory regime, its own availability posture and its own definition of mission-critical. One partner that speaks your vertical.",
    variant: "smartcity" as HeroVariant,
    label: "OPERATING ENVIRONMENTS",
    heading: "Context changes everything.",
    description:
      "Reference architectures for every vertical we serve. Explore the challenges, the approach and the technology supporting each operating environment.",
  },
  partners: {
    tag: "PARTNER ECOSYSTEM",
    title: (
      <>
        Fifteen strategic alliances,
        <br />
        <span className="intel-text-gradient">one architecture.</span>
      </>
    ),
    subtitle:
      "HPE, Dell, Microsoft, Veeam, Fortinet, Sophos, Palo Alto, Pure Storage, Commvault, Juniper, Schneider, Huawei, ManageEngine, H3C and Hikvision — engineered into one architecture under one contract. No vendor sprawl, no orphan SKUs.",
    variant: "abstract" as HeroVariant,
    label: "TECHNOLOGY ECOSYSTEM",
    heading: "A curated ecosystem. A single owner.",
    description:
      "Each strategic partner is integrated into KABO solutions under a unified contract. Explore the portfolios, relationships and integration points, alongside the extended vendor estate.",
  },
};

function partnerFor(name: string): Vendor | undefined {
  const normalized = name.toLowerCase();
  return (
    VENDORS.find(
      (vendor) =>
        vendor.name.toLowerCase() === normalized ||
        vendor.slug === normalized.replaceAll(" ", "-"),
    ) ??
    VENDORS.find((vendor) => vendor.name.toLowerCase().startsWith(normalized))
  );
}
function eyebrow(children: ReactNode) {
  return <p className="e-catalog__eyebrow">{children}</p>;
}
function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="e-catalog__section-heading">
      <div>
        {eyebrow(label)}
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
function ContentSection({
  children,
  tone = "white",
}: {
  children: ReactNode;
  tone?: "white" | "pale" | "ink";
}) {
  return (
    <section className={`e-catalog__section e-catalog__section--${tone}`}>
      <div className="e-catalog__container">{children}</div>
    </section>
  );
}
function TechnologyList({
  values,
  label = "TECHNOLOGY STACK",
}: {
  values: string[];
  label?: string;
}) {
  return (
    <div className="e-catalog__technology">
      <h3>{label}</h3>
      <ul>
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
function Outcomes({ values }: { values: string[] }) {
  return (
    <div className="e-catalog__outcomes">
      {values.map((value, index) => (
        <div key={value}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{value}</p>
          <Check size={19} />
        </div>
      ))}
    </div>
  );
}
function Enquiry({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <ContentSection tone="ink">
      <div className="e-catalog__invitation">
        <div>
          {eyebrow("YOUR REQUIREMENT / THE NEXT CONVERSATION")}
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <SiteLink
          page="contact"
          className="e-catalog__button e-catalog__button--light"
        >
          Start a conversation <ArrowUpRight size={18} />
        </SiteLink>
      </div>
    </ContentSection>
  );
}
function CapabilityTable({
  values,
}: {
  values: { title: string; description: string }[];
}) {
  return (
    <div className="e-catalog__capabilities">
      {values.map((value, index) => (
        <article key={value.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{value.title}</h3>
          <p>{value.description}</p>
        </article>
      ))}
    </div>
  );
}
function RelatedSolutions({
  slugs,
  heading = "Connected solutions.",
}: {
  slugs: string[];
  heading?: string;
}) {
  const values = SOLUTIONS.filter((solution) => slugs.includes(solution.slug));
  return values.length ? (
    <>
      <SectionHeading label="THE BIGGER PICTURE" title={heading} />
      <div className="e-catalog__related">
        {values.map((solution) => (
          <SiteLink
            page="solution-detail"
            detail={solution.slug}
            key={solution.slug}
          >
            <solution.icon size={25} strokeWidth={1.4} />
            <h3>{solution.shortTitle}</h3>
            <p>{solution.tagline}</p>
            <span>
              Explore solution <ArrowUpRight size={16} />
            </span>
          </SiteLink>
        ))}
      </div>
    </>
  ) : null;
}
function NotFound({ kind }: { kind: CatalogKind }) {
  return (
    <ContentSection>
      <div className="e-catalog__missing">
        {eyebrow("KABO / PORTFOLIO")}
        <h1>This portfolio item is unavailable.</h1>
        <SiteLink page={kind} className="e-catalog__button">
          Return to {kind} <ArrowRight size={17} />
        </SiteLink>
      </div>
    </ContentSection>
  );
}

function CatalogIndex({ kind }: { kind: CatalogKind }) {
  const [query, setQuery] = useState("");
  const meta = INDEX[kind];
  const entries = useMemo(() => {
    const source =
      kind === "solutions"
        ? SOLUTIONS.map((item) => ({
            slug: item.slug,
            title: item.shortTitle,
            description: item.tagline,
            image: item.image,
            category: "SOLUTION DOMAIN",
          }))
        : kind === "products"
          ? PRODUCT_CATEGORIES.map((item) => ({
              slug: item.slug,
              title: item.name,
              description: item.tagline,
              image: CATEGORY_IMAGES[item.slug] ?? "/images/sol_noc.jpg",
              category: "PRODUCT CATEGORY",
            }))
          : kind === "industries"
            ? INDUSTRIES.map((item) => ({
                slug: item.slug,
                title: item.name,
                description: item.tagline,
                image:
                  INDUSTRY_IMAGES[item.slug] ?? "/images/sol_smartcity.jpg",
                category: "INDUSTRY VERTICAL",
              }))
            : [];
    return source.filter((entry) =>
      `${entry.title} ${entry.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    );
  }, [kind, query]);
  const vendors = useMemo(
    () =>
      VENDORS.filter((vendor) =>
        `${vendor.name} ${vendor.category} ${vendor.tagline} ${vendor.portfolio.join(" ")}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      ),
    [query],
  );
  const count = kind === "partners" ? vendors.length : entries.length;
  return (
    <>
      <PageHero
        variant={meta.variant}
        tag={meta.tag}
        title={meta.title}
        subtitle={meta.subtitle}
      >
        <SiteLink page="contact">
          Discuss your requirements <ArrowUpRight size={16} />
        </SiteLink>
      </PageHero>
      <ContentSection>
        <SectionHeading
          label={meta.label}
          title={meta.heading}
          description={meta.description}
        />
        <div className="e-catalog__filter">
          <label htmlFor={`e-catalog-filter-${kind}`}>
            <Search size={17} />
            <input
              id={`e-catalog-filter-${kind}`}
              aria-label="Search the portfolio"
              type="search"
              placeholder={`Find ${kind === "partners" ? "a technology partner" : `a ${kind.slice(0, -1)}`}`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear portfolio filter"
            >
              <X size={17} />
            </button>
          )}
          <span aria-live="polite">
            {String(count).padStart(2, "0")}{" "}
            {count === 1 ? "result" : "results"}
          </span>
        </div>
        {kind === "partners" ? (
          <div className="e-catalog__vendors">
            {vendors.map((vendor, index) => (
              <SiteLink
                page="partner-detail"
                detail={vendor.slug}
                key={vendor.slug}
                style={{ "--vendor-accent": vendor.colour } as CSSProperties}
              >
                <div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    {"strategic" in vendor
                      ? "STRATEGIC ALLIANCE"
                      : "EXTENDED PORTFOLIO"}
                  </span>
                </div>
                <h3>{vendor.name}</h3>
                <small>{vendor.category}</small>
                <p>{vendor.tagline}</p>
                <span className="e-catalog__vendor-action">
                  Explore portfolio <ArrowUpRight size={17} />
                </span>
              </SiteLink>
            ))}
          </div>
        ) : (
          <div className="e-catalog__entries">
            {entries.map((entry, index) => (
              <SiteLink
                page={DETAIL_PAGES[kind]}
                detail={entry.slug}
                key={entry.slug}
                className={`e-catalog__entry ${index < 2 && !query ? "e-catalog__entry--feature" : ""}`}
              >
                <div className="e-catalog__entry-image">
                  <Image
                    src={entry.image}
                    alt=""
                    fill
                    sizes="(max-width:700px) 100vw,(max-width:1100px) 48vw,45vw"
                  />
                </div>
                <div className="e-catalog__entry-copy">
                  <div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <small>{entry.category}</small>
                  </div>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                  <span className="e-catalog__entry-action">
                    Explore{" "}
                    {kind === "industries" ? "industry" : kind.slice(0, -1)}{" "}
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </SiteLink>
            ))}
          </div>
        )}
        {!count && (
          <div className="e-catalog__empty">
            <Search size={26} />
            <h3>No matching {kind}.</h3>
            <p>Try a technology, a manufacturer or a broader term.</p>
            <button onClick={() => setQuery("")}>
              Show the complete portfolio <ArrowRight size={16} />
            </button>
          </div>
        )}
      </ContentSection>
      {kind === "products" && (
        <ContentSection tone="pale">
          <div className="e-catalog__editorial-note">
            <span>BEYOND THE CATALOGUE</span>
            <h2>Looking for a specific SKU?</h2>
            <p>
              We supply, configure and support the full portfolio of every
              partner we represent. Tell us what you need — we’ll route it to
              the right specialist.
            </p>
            <SiteLink page="contact">
              Talk to a product specialist <ArrowUpRight size={17} />
            </SiteLink>
          </div>
        </ContentSection>
      )}
      <Enquiry
        title={
          kind === "industries"
            ? "Infrastructure that speaks your industry."
            : "One conversation replaces a queue of vendors."
        }
        description="Tell us about your workload, your estate and your next requirement."
      />
    </>
  );
}

function SolutionDetail({ solution }: { solution: Solution }) {
  const vendors = solution.partners
    .map(partnerFor)
    .filter((vendor): vendor is Vendor => !!vendor);
  const products = PRODUCT_CATEGORIES.filter((product) =>
    product.relatedSolutions.includes(solution.slug),
  );
  return (
    <>
      <PageHero
        variant="datacenter"
        image={solution.image}
        imageCaption={solution.shortTitle.toUpperCase()}
        tag={solution.shortTitle}
        title={solution.title}
        subtitle={solution.description}
      >
        <SiteLink page="solutions">
          <ArrowLeft size={16} /> All solutions
        </SiteLink>
        <SiteLink page="contact">
          Discuss this solution <ArrowUpRight size={16} />
        </SiteLink>
      </PageHero>
      <ContentSection>
        <div className="e-catalog__overview">
          <div>
            {eyebrow("SOLUTION / OVERVIEW")}
            <h2>
              Engineered,
              <br />
              <em>not resold.</em>
            </h2>
          </div>
          <div>
            <p className="e-catalog__lead">{solution.tagline}</p>
            <TechnologyList values={solution.stack} />
          </div>
        </div>
      </ContentSection>
      <ContentSection tone="pale">
        <SectionHeading
          label="CAPABILITIES"
          title="What this solution delivers."
        />
        <CapabilityTable
          values={solution.capabilities.map((item) => ({
            title: item.title,
            description: item.spec,
          }))}
        />
      </ContentSection>
      {solution.slug === "ai-infrastructure" && <IntelligenceBrief />}
      <ContentSection>
        <SectionHeading
          label="THE BUSINESS OUTCOME"
          title="What changes for your business."
        />
        <Outcomes values={solution.outcomes} />
      </ContentSection>
      <ContentSection tone="pale">
        <SectionHeading
          label="TECHNOLOGY ECOSYSTEM"
          title="Platforms working together."
        />
        <div className="e-catalog__partner-links">
          {solution.partners.map((name) => {
            const vendor = partnerFor(name);
            return vendor ? (
              <SiteLink page="partner-detail" detail={vendor.slug} key={name}>
                <span>{name}</span>
                <ArrowUpRight size={20} />
              </SiteLink>
            ) : (
              <span key={name}>{name}</span>
            );
          })}
        </div>
        {vendors.length > 0 && (
          <p className="e-catalog__footnote">
            Explore each portfolio for product families, integration points and
            related KABO solutions.
          </p>
        )}
        {products.length > 0 && (
          <div className="e-catalog__related-products">
            <h3>Related product categories</h3>
            {products.map((product) => (
              <SiteLink
                page="product-detail"
                detail={product.slug}
                key={product.slug}
              >
                {product.name}
                <ArrowUpRight size={16} />
              </SiteLink>
            ))}
          </div>
        )}
      </ContentSection>
      <Enquiry
        title={`Let’s talk ${solution.shortTitle.toLowerCase()}.`}
        description="From the workload and technology stack to integration and ongoing operations."
      />
    </>
  );
}

function ProductDetail({ product }: { product: ProductCategory }) {
  const industries = INDUSTRIES.filter((industry) =>
    product.relatedIndustries.includes(industry.slug),
  );
  return (
    <>
      <PageHero
        variant="datacenter"
        image={CATEGORY_IMAGES[product.slug] ?? "/images/sol_noc.jpg"}
        tag="PRODUCTS & TECHNOLOGIES"
        title={product.name}
        subtitle={product.tagline}
      >
        <SiteLink page="products">
          <ArrowLeft size={16} /> All products
        </SiteLink>
        <SiteLink page="contact">
          Discuss this category <ArrowUpRight size={16} />
        </SiteLink>
      </PageHero>
      <ContentSection>
        <div className="e-catalog__overview">
          <div>
            {eyebrow("PRODUCT CATEGORY / OVERVIEW")}
            <h2>
              A platform with
              <br />
              <em>a purpose.</em>
            </h2>
          </div>
          <div>
            <p className="e-catalog__lead">{product.overview}</p>
            <TechnologyList
              values={product.technologies}
              label="TECHNOLOGIES & PLATFORMS"
            />
          </div>
        </div>
      </ContentSection>
      <ContentSection tone="pale">
        <SectionHeading
          label="PORTFOLIO CAPABILITIES"
          title="The detail behind the technology."
        />
        <CapabilityTable
          values={product.capabilities.map((item) => ({
            title: item.name,
            description: item.desc,
          }))}
        />
      </ContentSection>
      <ContentSection>
        <RelatedSolutions slugs={product.relatedSolutions} />
      </ContentSection>
      <ContentSection tone="pale">
        <SectionHeading
          label="WHERE IT WORKS"
          title="Built for your environment."
        />
        <div className="e-catalog__industry-links">
          {industries.map((industry) => (
            <SiteLink
              page="industry-detail"
              detail={industry.slug}
              key={industry.slug}
            >
              <span>{industry.name}</span>
              <p>{industry.tagline}</p>
              <ArrowUpRight size={19} />
            </SiteLink>
          ))}
        </div>
      </ContentSection>
      <Enquiry
        title="Looking for a specific configuration?"
        description="Tell us about quantities, workloads, applications and your target timeline."
      />
    </>
  );
}

function IndustryDetail({ industry }: { industry: Industry }) {
  return (
    <>
      <PageHero
        variant="smartcity"
        image={INDUSTRY_IMAGES[industry.slug] ?? "/images/sol_smartcity.jpg"}
        tag="INDUSTRY / OPERATING CONTEXT"
        title={industry.name}
        subtitle={industry.tagline}
      >
        <SiteLink page="industries">
          <ArrowLeft size={16} /> All industries
        </SiteLink>
        <SiteLink page="contact">
          Discuss your environment <ArrowUpRight size={16} />
        </SiteLink>
      </PageHero>
      <ContentSection>
        <div className="e-catalog__overview">
          <div>
            {eyebrow("INDUSTRY / OVERVIEW")}
            <h2>
              Understanding
              <br />
              <em>your environment.</em>
            </h2>
          </div>
          <p className="e-catalog__lead">{industry.overview}</p>
        </div>
      </ContentSection>
      <ContentSection tone="pale">
        <div className="e-catalog__dual-list">
          <div>
            {eyebrow("THE CHALLENGE")}
            <h2>What your industry faces.</h2>
            <ul>
              {industry.challenges.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {eyebrow("THE KABO APPROACH")}
            <h2>How we respond.</h2>
            <ul>
              {industry.kaboApproach.map((item) => (
                <li key={item}>
                  <Check size={18} />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ContentSection>
      <ContentSection>
        <SectionHeading
          label="CONNECTED TECHNOLOGY LAYERS"
          title="From the edge to the operating core."
        />
        <div className="e-catalog__architecture">
          {industry.architecture.map((layer, index) => (
            <div key={layer.layer}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{layer.layer}</h3>
              <p>{layer.desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>
      <ContentSection tone="pale">
        <SectionHeading
          label="DEPLOYMENT PATTERNS"
          title="The right design for every site."
        />
        <CapabilityTable
          values={industry.deployment.map((item) => ({
            title: item.scenario,
            description: item.desc,
          }))}
        />
      </ContentSection>
      <ContentSection>
        <RelatedSolutions slugs={industry.relatedSolutions} />
      </ContentSection>
      <Enquiry
        title={`Let’s talk ${industry.name.toLowerCase()}.`}
        description="One partner that speaks your vertical. Start with your estate, your operating requirements and your next project."
      />
    </>
  );
}

function PartnerDetail({ partner }: { partner: Vendor }) {
  const solutionSlugs =
    "solutions" in partner
      ? partner.solutions
      : SOLUTIONS.filter((solution) =>
          solution.partners.some(
            (name) => partnerFor(name)?.slug === partner.slug,
          ),
        ).map((solution) => solution.slug);
  return (
    <>
      <PageHero
        variant="abstract"
        tag={
          "strategic" in partner
            ? "STRATEGIC ALLIANCE"
            : "EXTENDED VENDOR PORTFOLIO"
        }
        title={
          <>
            {partner.name}
            <br />
            <span className="intel-text-gradient">{partner.category}</span>
          </>
        }
        subtitle={partner.tagline}
      >
        <SiteLink page="partners">
          <ArrowLeft size={16} /> All partners
        </SiteLink>
        <SiteLink page="contact">
          Discuss {partner.name} <ArrowUpRight size={16} />
        </SiteLink>
      </PageHero>
      <ContentSection>
        <div className="e-catalog__overview">
          <div>
            {eyebrow("PARTNER / OVERVIEW")}
            <h2>{partner.name}</h2>
          </div>
          <div>
            <p className="e-catalog__lead">{partner.description}</p>
            <TechnologyList values={partner.portfolio} label="THE PORTFOLIO" />
          </div>
        </div>
      </ContentSection>
      {"relationship" in partner && (
        <ContentSection tone="pale">
          <div className="e-catalog__overview">
            <div>
              {eyebrow("THE RELATIONSHIP")}
              <h2>
                Integrated.
                <br />
                <em>Accountable.</em>
              </h2>
              <p className="e-catalog__relationship">{partner.relationship}</p>
            </div>
            <div>
              <h3 className="e-catalog__integration-label">KABO INTEGRATION</h3>
              <Outcomes values={partner.integration} />
            </div>
          </div>
        </ContentSection>
      )}
      {solutionSlugs.length > 0 && (
        <ContentSection>
          <RelatedSolutions
            slugs={solutionSlugs}
            heading={`Solutions featuring ${partner.name}.`}
          />
        </ContentSection>
      )}
      <Enquiry
        title={`Ready to engineer with ${partner.name}?`}
        description={`One conversation replaces a queue of vendors. Let’s talk about your ${partner.name} requirement.`}
      />
    </>
  );
}

export function CatalogPage({
  kind,
  detail,
}: {
  kind: CatalogKind;
  detail?: string;
}) {
  let content: ReactNode;
  if (!detail) content = <CatalogIndex key={kind} kind={kind} />;
  else if (kind === "solutions") {
    const item = SOLUTIONS.find((entry) => entry.slug === detail);
    content = item ? (
      <SolutionDetail solution={item} />
    ) : (
      <NotFound kind={kind} />
    );
  } else if (kind === "products") {
    const item = PRODUCT_CATEGORIES.find((entry) => entry.slug === detail);
    content = item ? (
      <ProductDetail product={item} />
    ) : (
      <NotFound kind={kind} />
    );
  } else if (kind === "industries") {
    const item = INDUSTRIES.find((entry) => entry.slug === detail);
    content = item ? (
      <IndustryDetail industry={item} />
    ) : (
      <NotFound kind={kind} />
    );
  } else {
    const item = VENDORS.find((entry) => entry.slug === detail);
    content = item ? (
      <PartnerDetail partner={item} />
    ) : (
      <NotFound kind={kind} />
    );
  }
  return <div className="business-content e-catalog">{content}</div>;
}
