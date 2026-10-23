"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import {
  CASE_STUDIES,
  PROCUREMENT_LINES,
  ARCHITECTURE_STEPS,
  ARCH_PRINCIPLES,
  DELIVERY_STAGES,
  GOVERNANCE_STANDARDS,
} from "@/components/kabo/data";
import { SiteLink } from "./site-link";
import { EnquiryForm } from "./enquiry-form";
import "@/app/elevated-company.css";

type Narrative = { title: string; desc: string };
type Service = { title: string; description: string; bullets: string[] };
type CompanyKind = "about" | "services" | "case-studies" | "investors";

const VALUES: Narrative[] = [
  {
    title: "Accountability",
    desc: "One owner, end to end. No finger pointing, no orphaned outcomes.",
  },
  {
    title: "Transparency",
    desc: "Audit-ready evidence. POPIA-aligned, BBB-EE compliant, regulator-ready.",
  },
  {
    title: "African Reality",
    desc: "Engineered for load-shedding, copper theft and fibre cuts at 3am.",
  },
  {
    title: "Black Ownership",
    desc: "100% Black-owned. BBB-EE Level 1. Procurement advantage, not window dressing.",
  },
];

const TIMELINE: (Narrative & { year: string })[] = [
  {
    year: "2016",
    title: "KABO IT Group Founded",
    desc: "Established in Gauteng with a mission to engineer intelligent infrastructure for African enterprise.",
  },
  {
    year: "Growth",
    title: "15 Strategic Alliances",
    desc: "Curated fifteen technology partners across compute, data, networking, security, AI, cloud, workplace and physical security.",
  },
  {
    year: "Today",
    title: "12 Domains, 9 Provinces",
    desc: "Nationwide footprint across all nine South African provinces, 24/7 NOC and SOC from Gauteng, twelve interlocking solution domains, nine industry verticals.",
  },
  {
    year: "Tomorrow",
    title: "African Expansion",
    desc: "Extending KABO's ecosystem orchestration model into SADC and the broader African continent — carrying the same architecture, partnerships and operational discipline that work in South Africa.",
  },
];

const PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];

const COMMERCIAL_SERVICES: Service[] = [
  {
    title: "IT Hardware Supply",
    description:
      "Authorised supply of servers, storage, networking, endpoints and accessories from leading OEMs, with full warranty management.",
    bullets: [
      "Authorised reseller for Dell, HPE, Lenovo, H3C, Huawei, Aruba, Hikvision, Canon and Microsoft",
      "Full warranty registration and lifecycle management",
      "Volume pricing through aggregated partner relationships",
      "Configuration-to-order on servers, storage and networking",
      "Pre-sales architecture validation before any order is placed",
    ],
  },
  {
    title: "Solutions Procurement",
    description:
      "End-to-end procurement of integrated solutions against an RFP, with architecture, costing and supplier coordination by KABO.",
    bullets: [
      "Single unified procurement partner across multiple OEMs",
      "Architecture-led BoM with component-level costing",
      "Supplier coordination and lead-time management",
      "POPIA, B-BBEE and Treasury-compliant documentation pack",
      "Procurement tracking dashboard with milestone visibility",
    ],
  },
  {
    title: "Software Licensing",
    description:
      "Licensing strategy, sourcing and renewal management across cloud, security and productivity platforms.",
    bullets: [
      "Microsoft, VMware, Nutanix, Veeam and Hikvision licensing expertise",
      "True-up and renewal management with calendar reminders",
      "License optimisation to remove unused entitlements",
      "Cloud consumption monitoring and right-sizing",
      "Compliance audit support and remediation",
    ],
  },
  {
    title: "National Distribution",
    description:
      "Distribution and stocking of components and consumables across all nine provinces, with forward logistics.",
    bullets: [
      "Regional stocking hubs for fast-moving SKUs",
      "Consignment stock for high-volume customers",
      "Forward logistics to site, branch and remote locations",
      "Multi-province delivery with single-point accountability",
      "Stock visibility portal for procurement teams",
    ],
  },
  {
    title: "Logistics & Customs",
    description:
      "Site survey, staging, configuration, last-mile delivery and on-site deployment with single-point accountability.",
    bullets: [
      "SARS customs clearance and import documentation",
      "Staging and pre-configuration in KABO facilities",
      "Last-mile delivery and white-glove installation",
      "Site survey, rack-and-stack and cable management",
      "Commissioning, handover and as-built documentation",
    ],
  },
  {
    title: "Asset Recovery",
    description:
      "Secure decommissioning, data sanitisation, buy-back and responsible recycling of retired ICT assets.",
    bullets: [
      "Certified data sanitisation to NIST 800-88 standards",
      "On-site decommissioning with chain-of-custody documentation",
      "Buy-back and trade-in valuation against current market",
      "Responsible e-waste recycling with certificates of destruction",
      "Asset register reconciliation and disposal reporting",
    ],
  },
];

const ENGINEERING_SERVICES: Service[] = [
  {
    title: "AI Infrastructure Engineering",
    description:
      "End-to-end design, deployment and operation of GPU-accelerated AI platforms — from single-node inference appliances to liquid-cooled HGX clusters with InfiniBand fabrics.",
    bullets: [
      "GPU cluster sizing, architecture and TCO modelling against your workload",
      "NVIDIA H100/H200, HPE Apollo, Dell PowerEdge XE9680 and H3C GPU platforms",
      "InfiniBand 400G fabric design, commissioning and performance tuning",
      "ML/Ops platform deployment — training, serving, experiment tracking",
      "Edge AI inference platforms for remote sites, mines and plants",
      "AI workload migration, model governance and sovereign hosting",
    ],
  },
  {
    title: "Cloud & Hybrid Integration",
    description:
      "Architecture, migration and operation of hybrid cloud platforms spanning on-premises, HPE GreenLake, Microsoft Azure and sovereign African cloud zones.",
    bullets: [
      "Hybrid cloud architecture spanning on-prem, GreenLake and Azure",
      "Workload assessment, migration sequencing and landing-zone design",
      "Cloud consumption governance, FinOps and right-sizing",
      "Sovereign cloud zones keeping POPIA-regulated data on African soil",
      "Cloud-native modernisation — containers, microservices, serverless",
      "Disaster recovery and cross-cloud failover orchestration",
    ],
  },
  {
    title: "Solution Architecture & Design",
    description:
      "Vendor-agnostic architecture, reference design and validation across compute, storage, network, security and AI stacks — a single blueprint, a single accountable owner.",
    bullets: [
      "Reference architecture across all KABO solution domains",
      "Capacity planning, performance modelling and TCO comparison",
      "Vendor-agnostic stack selection against workload, not SKU",
      "BOM validation, build sheets and as-built documentation",
      "Architecture review board for in-flight customer projects",
      "POPIA, PCI-DSS and sector-regulator compliance mapping",
    ],
  },
  {
    title: "Managed AI Operations",
    description:
      "24/7 operations, monitoring and optimisation of AI platforms — from GPU utilisation to model drift, capacity and governance — delivered from the KABO Gauteng SOC.",
    bullets: [
      "GPU utilisation, throughput and queue-depth monitoring with capacity forecasting",
      "Model drift detection, retraining triggers and reproducible version governance",
      "AI workload governance — data lineage, model provenance and POPIA-aligned residency",
      "Prompt safety controls, output filtering and policy enforcement for generative AI",
      "Elastic burst to HPE GreenLake or Microsoft Azure when on-prem capacity is exhausted",
      "MLOps pipeline automation with CI/CD for model releases and rollback",
      "SLA-backed inference availability with sub-second latency targets",
    ],
  },
];

const INVESTOR_PILLARS: Narrative[] = [
  {
    title: "Growth Trajectory",
    desc: "KABO is positioned for sustained growth across South Africa's enterprise ICT market — driven by AI infrastructure demand, B-BBEE procurement acceleration and sovereign cloud adoption. The structural shift from capex to SLA-based consumption models plays directly to our integrated architecture and 24/7 operations capability.",
  },
  {
    title: "Diversified Revenue",
    desc: "Revenue across twelve solution domains, fifteen strategic alliances and nine industry verticals. No single point of dependency. Hardware supply, solutions procurement, managed services and asset recovery under one roof — with recurring managed-services revenue growing as a proportion of total.",
  },
  {
    title: "Expansion Vision",
    desc: "Nationwide footprint across all nine South African provinces today. Strategic roadmap extends KABO's ecosystem orchestration model into SADC and the broader African continent — carrying the same architecture, the same partnerships and the same operational discipline that work in South Africa.",
  },
];

const INVESTMENT_HIGHLIGHTS: { value: string; label: string; desc: string }[] =
  [
    {
      value: "15",
      label: "Strategic Alliances",
      desc: "HPE, Dell, Microsoft, NVIDIA, Hikvision and more — vendor-neutral selection across the full stack.",
    },
    {
      value: "12",
      label: "Solution Domains",
      desc: "From compute and AI infrastructure to managed services — a complete portfolio across the infrastructure lifecycle.",
    },
    {
      value: "9",
      label: "Industries Served",
      desc: "Public sector, financial services, mining, healthcare, education, telecoms, manufacturing, retail and smart infrastructure.",
    },
    {
      value: "L1",
      label: "B-BBEE · 135%",
      desc: "Level 1 contributor with maximum procurement recognition — a structural advantage in the South African market.",
    },
  ];

const INVESTOR_THESIS: (Narrative & { num: string })[] = [
  {
    num: "01",
    title: "AI changes the physics of the room",
    desc: "Density, power and cooling envelopes will re-architect the data centre — not just refresh it. KABO is positioned at the intersection of GPU infrastructure, sovereign cloud and 24/7 operations, capturing the spend that follows this shift.",
  },
  {
    num: "02",
    title: "Security is the architecture",
    desc: "Zero-Trust will move from a capability to a precondition; the SOC becomes the system of record. KABO's converged cyber + physical security practice, anchored by Hikvision and a 24/7 Gauteng SOC, turns this regulatory shift into recurring managed-services revenue.",
  },
  {
    num: "03",
    title: "Operations is the product",
    desc: "Infrastructure value will be measured in SLA performance, not in capex. Integrators who can't operate won't survive. KABO's model — the same engineers integrate and operate — is structurally designed for the SLA economy.",
  },
];

function PageHeading({
  label,
  title,
  accent,
  summary,
  number,
}: {
  label: string;
  title: string;
  accent: string;
  summary: string;
  number: string;
}) {
  return (
    <header className="e-page-hero e-company-hero">
      <div className="e-container">
        <div className="e-company-hero-kicker">
          <span className="e-eyebrow">{label}</span>
          <span className="e-company-page-number">
            {number} / KABO IT GROUP
          </span>
        </div>
        <h1>
          {title}
          <span>{accent}</span>
        </h1>
        <div className="e-company-hero-bottom">
          <p>{summary}</p>
          <a href="#page-content" className="e-company-scroll">
            Explore this page <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}

function SectionHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="e-company-section-heading">
      <span className="e-eyebrow">{label}</span>
      <h2>{title}</h2>
      {children && <div className="e-company-introduction">{children}</div>}
    </div>
  );
}

function Invitation({
  title,
  body,
  label = "Start a conversation",
}: {
  title: string;
  body: string;
  label?: string;
}) {
  return (
    <section className="e-company-invitation">
      <div className="e-container e-company-invitation-inner">
        <div>
          <span className="e-eyebrow">The next step</span>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <SiteLink page="contact" className="e-button">
          {label}
          <ArrowUpRight size={19} aria-hidden="true" />
        </SiteLink>
      </div>
    </section>
  );
}

function AboutContent() {
  return (
    <>
      <PageHeading
        number="01"
        label="Company / About KABO"
        title="Intelligent infrastructure,"
        accent="engineered for the AI era."
        summary="KABO IT Group is a Gauteng-established systems integrator — 100% Black-owned, B-BBEE Level 1 with 135% procurement recognition. Founded in 2016. Fifteen strategic alliances, twelve interlocking domains, a unified architecture — engineered end-to-end. Nationwide footprint today, expanding into the broader African continent."
      />
      <section className="e-company-section" id="page-content">
        <div className="e-container">
          <div className="e-company-mission">
            <SectionHeading
              label="Our mission"
              title="One owner for every layer of African enterprise ICT."
            />
            <div className="e-company-body-copy">
              <p>
                KABO IT Group exists to remove the friction, finger-pointing and
                accountability gaps that plague multi-vendor ICT estates. We
                orchestrate fifteen strategic alliances into twelve interlocking
                solution domains under a single architecture, a single contract
                and a single escalation path.
              </p>
              <p>
                From compute, data and networking through security, AI
                infrastructure, cloud, digital workplace, physical security,
                analytics/BI, continuity and IoT/edge — KABO owns the outcome.
                End to end, across all nine South African provinces today,
                expanding into the broader African continent, 24/7.
              </p>
              <SiteLink page="contact" className="e-company-text-link">
                Engage KABO <ArrowUpRight size={18} aria-hidden="true" />
              </SiteLink>
            </div>
          </div>
          <dl className="e-company-proofbar">
            {[
              { value: "Level 1", label: "B-BBEE · 135%" },
              { value: "100%", label: "Black-owned" },
              { value: "12", label: "Solution domains" },
              { value: "9", label: "Provinces covered" },
            ].map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="e-company-section e-company-tint">
        <div className="e-container">
          <SectionHeading
            label="What we stand for"
            title="Four values, non-negotiable."
          />
          <div className="e-company-values">
            {VALUES.map((value, index) => (
              <article className="e-company-value" key={value.title}>
                <span className="e-company-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="e-company-section">
        <div className="e-container">
          <SectionHeading
            label="Our journey"
            title="Built in Africa, for Africa."
          />
          <ol className="e-company-timeline">
            {TIMELINE.map((item) => (
              <li key={item.year}>
                <span className="e-company-timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="e-company-section e-company-method">
        <div className="e-container">
          <SectionHeading
            label="Our approach"
            title="Every architecture starts with a business outcome — and ends with one."
          >
            <p>
              Every KABO engagement is structured as an eight-step architectural
              flow that ties business requirement to measurable result, with
              each layer accountable to the next.
            </p>
          </SectionHeading>
          <ol className="e-company-method-list">
            {ARCHITECTURE_STEPS.map((step) => (
              <li key={step.num}>
                <span className="e-company-index">{step.num}</span>
                <div>
                  <span className="e-company-small-label">{step.subtitle}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="e-company-principles">
            {ARCH_PRINCIPLES.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="e-company-section">
        <div className="e-container">
          <SectionHeading
            label="Delivery discipline"
            title="Discover. Design. Deliver. Operate."
          />
          <div className="e-company-delivery">
            {DELIVERY_STAGES.map((stage) => (
              <article key={stage.num}>
                <span className="e-company-index">{stage.num}</span>
                <h3>{stage.name}</h3>
                <p>{stage.desc}</p>
                <span className="e-company-deliverable">{stage.output}</span>
              </article>
            ))}
          </div>
          <div className="e-company-governance">
            <span className="e-company-small-label">Governance context</span>
            <ul>
              {GOVERNANCE_STANDARDS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Invitation
        title="Ready to work with a single accountable partner?"
        body="A single architecture, a single contract and a single escalation path for your organisation's technology requirements."
      />
    </>
  );
}

function ServiceRows({
  services,
  prefix,
}: {
  services: Service[];
  prefix: string;
}) {
  return (
    <div className="e-company-service-list">
      {services.map((service, index) => (
        <article
          className="e-company-service"
          key={service.title}
          id={prefix + "-" + String(index + 1)}
        >
          <span className="e-company-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="e-company-service-description">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
          <ul className="e-company-service-scope">
            {service.bullets.map((item) => (
              <li key={item}>
                <Check size={15} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function ServicesContent() {
  return (
    <>
      <PageHeading
        number="02"
        label="Services / Supply to lifecycle"
        title="IT hardware supply."
        accent="Solutions procurement."
        summary="IT hardware supply and solutions procurement is our core service. Beyond solutions, KABO operates the supply chain that puts enterprise ICT on the ground across South Africa."
      />
      <nav className="e-company-page-index" aria-label="Services sections">
        <div className="e-container">
          <a href="#page-content">01 / Core services</a>
          <a href="#engineering-services">02 / Engineering</a>
          <a href="#procurement-scope">03 / Procurement</a>
          <a href="#national-footprint">04 / National footprint</a>
        </div>
      </nav>
      <section className="e-company-section" id="page-content">
        <div className="e-container">
          <SectionHeading
            label="Six core services"
            title="A unified contract across the ICT lifecycle."
          >
            <p>
              From the first server to the last recycled asset, KABO owns the
              outcome. Each service below is delivered under one contract and
              one escalation path.
            </p>
          </SectionHeading>
          <ServiceRows services={COMMERCIAL_SERVICES} prefix="commercial" />
        </div>
      </section>
      <section
        className="e-company-section e-company-tint"
        id="engineering-services"
      >
        <div className="e-container">
          <SectionHeading
            label="Engineering & integration"
            title="AI & cloud infrastructure, engineered end-to-end."
          >
            <p>
              Beyond procurement and logistics, KABO engineers the AI and cloud
              platforms that define the next decade of African enterprise
              compute. Four specialised services delivered by certified
              architects and operated from our Gauteng SOC.
            </p>
          </SectionHeading>
          <ServiceRows services={ENGINEERING_SERVICES} prefix="engineering" />
          <SiteLink page="contact" className="e-company-text-link">
            Engage our AI & cloud engineers{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </SiteLink>
        </div>
      </section>
      <section className="e-company-section" id="procurement-scope">
        <div className="e-container">
          <SectionHeading
            label="Procurement scope"
            title="The technology. The supplies. The complete requirement."
          />
          <div className="e-company-procurement">
            {PROCUREMENT_LINES.map((item) => (
              <article key={item.num}>
                <span className="e-company-index">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="e-company-section e-company-coverage"
        id="national-footprint"
      >
        <div className="e-container e-company-coverage-inner">
          <SectionHeading
            label="Nationwide footprint"
            title="Distribution, logistics and engineering across all nine provinces."
          >
            <p>
              From Cape Town to Musina, KABO delivers, stages, configures and
              supports. A unified contract, a single standard, every province.
            </p>
            <SiteLink page="contact" className="e-company-text-link">
              Talk to our logistics team{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </SiteLink>
          </SectionHeading>
          <ul className="e-company-provinces">
            {PROVINCES.map((province) => (
              <li key={province}>
                {province}
                <span aria-hidden="true">↗</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Invitation
        title="Ready to consolidate your ICT supply chain?"
        body="A single contract, a single escalation path, and the same engineering team across hardware, software, logistics and asset recovery."
        label="Engage KABO"
      />
    </>
  );
}

function CaseStudiesContent() {
  return (
    <>
      <PageHeading
        number="03"
        label="Case studies / Applied infrastructure"
        title="Evidence,"
        accent="in the detail."
        summary="Selected KABO engagements across AI infrastructure, data centre, SD-WAN and integrated security. Each delivered under a unified contract, a single escalation path, and the same engineering team from workshop to QBR."
      />
      <section className="e-company-section" id="page-content">
        <div className="e-container">
          <div className="e-company-case-index">
            <span className="e-eyebrow">Four perspectives on delivery</span>
            <div>
              {CASE_STUDIES.map((item, index) => (
                <a href={"#case-" + item.slug} key={item.slug}>
                  {String(index + 1).padStart(2, "0")} / {item.sector}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="e-company-cases">
            {CASE_STUDIES.map((item, index) => (
              <article
                className="e-company-case"
                key={item.slug}
                id={"case-" + item.slug}
              >
                <header>
                  <span className="e-company-case-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="e-company-small-label">
                      {item.sector} / {item.client}
                    </span>
                    <h2>{item.title}</h2>
                  </div>
                </header>
                <div className="e-company-case-narrative">
                  {[
                    ["Challenge", item.challenge],
                    ["Solution", item.solution],
                    ["Outcome", item.outcome],
                  ].map(([label, body]) => (
                    <section key={label}>
                      <h3>{label}</h3>
                      <p>{body}</p>
                    </section>
                  ))}
                </div>
                <div className="e-company-case-stack">
                  <span className="e-company-small-label">
                    Technology stack
                  </span>
                  <ul>
                    {item.stack.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </div>
                <SiteLink page="contact" className="e-company-text-link">
                  Discuss a similar requirement{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </SiteLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Invitation
        title="Become our next case study."
        body="Tell us about the business challenge, the existing estate and the outcome you need."
      />
    </>
  );
}

function InvestorsContent() {
  return (
    <>
      <PageHeading
        number="04"
        label="Investor relations / A shared direction"
        title="Building Africa's"
        accent="ecosystem orchestrator."
        summary="KABO IT Group is building the integrated ICT platform that African enterprise needs for the AI era. We welcome conversations with strategic investors aligned with our mission to engineer intelligent infrastructure across the continent."
      />
      <section className="e-company-section" id="page-content">
        <div className="e-container">
          <SectionHeading
            label="Investment highlights"
            title="A national integrator with enterprise depth."
          >
            <p>
              KABO occupies a distinct position in the South African
              infrastructure market — the engineering depth of an enterprise
              integrator, the partnership credibility of a Tier-1 reseller and
              the B-BBEE profile of a Level 1 contributor with maximum
              procurement recognition.
            </p>
          </SectionHeading>
          <div className="e-company-investment-highlights">
            {INVESTMENT_HIGHLIGHTS.map((item) => (
              <article key={item.label}>
                <span>{item.value}</span>
                <h3>{item.label}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="e-company-section e-company-tint">
        <div className="e-container">
          <SectionHeading
            label="Why invest in KABO"
            title="Three structural growth drivers."
          />
          <div className="e-company-investor-pillars">
            {INVESTOR_PILLARS.map((item, index) => (
              <article key={item.title}>
                <span className="e-company-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="e-company-section">
        <div className="e-container">
          <SectionHeading
            label="Investment thesis"
            title="Three theses for the AI era."
          >
            <p>
              KABO's investment thesis is grounded in three structural shifts
              re-architecting how African enterprise designs, buys and operates
              infrastructure. Each thesis maps directly to a revenue stream.
            </p>
          </SectionHeading>
          <div className="e-company-theses">
            {INVESTOR_THESIS.map((item) => (
              <article key={item.num}>
                <span className="e-company-index">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="e-company-section e-company-tint"
        id="investor-enquiry"
      >
        <div className="e-container e-company-investor-enquiry">
          <div>
            <SectionHeading
              label="Investor enquiries"
              title="Start a conversation."
            >
              <p>
                We welcome conversations with strategic investors, private
                equity and development finance institutions aligned with our
                mission to engineer intelligent infrastructure for African
                enterprise. All enquiries are treated in strict confidence and
                routed directly to the KABO executive team.
              </p>
            </SectionHeading>
            <SiteLink page="contact" className="e-company-text-link">
              Company contact details{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </SiteLink>
          </div>
          <div className="e-company-investor-form">
            <h3>Investor Conversation Request</h3>
            <p>
              Tell us about your investment focus and we'll route this directly
              to the KABO executive team. All enquiries are treated in strict
              confidence.
            </p>
            <EnquiryForm kind="investor" />
          </div>
        </div>
      </section>
    </>
  );
}

export function CompanyPage({ kind }: { kind: CompanyKind }) {
  return (
    <div className={"e-company e-company--" + kind}>
      {kind === "about" ? (
        <AboutContent />
      ) : kind === "services" ? (
        <ServicesContent />
      ) : kind === "case-studies" ? (
        <CaseStudiesContent />
      ) : (
        <InvestorsContent />
      )}
    </div>
  );
}
