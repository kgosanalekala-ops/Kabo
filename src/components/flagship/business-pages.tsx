"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, Download, Search } from "lucide-react";
import { usePage } from "@/components/kabo/page-context";
import { PRODUCT_CATEGORIES } from "@/components/kabo/products-data";
import { INDUSTRIES } from "@/components/kabo/industries-data";
import { ICON_MAP } from "@/components/kabo/icon-map";
import { KABO_CATALOGUE } from "@/lib/kabo-catalogue";

const SELECTION_NOTICE = "Technology examples describe possible portfolios, not confirmed stock, current model availability, OEM authorisation or a guaranteed outcome. Compatibility, licences, support, performance and commercial terms are verified for each enquiry.";

/** Preserve the original technical catalogue without repeating unsupported promises. */
export function publicText(text: string) {
  return text
    .replace(/KABO engineers/g, "KABO helps specify")
    .replace(/KABO architects/g, "KABO helps plan")
    .replace(/KABO delivers/g, "KABO can help plan")
    .replace(/a appropriately scoped security monitoring/g, "project-specific security monitoring")
    .replace(/appropriately scoped security monitoring monitoring/g, "project-specific security monitoring")
    .replace(/appropriately scoped security monitoring/g, "security monitoring")
    .replace(/ransomware cannot encrypt/g, "are designed to resist unauthorised alteration, subject to correct implementation")
    .replace(/regulated data stays on African soil/g, "data-residency requirements are validated for the chosen hosting arrangement")
    .replace(/POPIA-aligned GPU zones keeping African enterprise data on African soil/g, "GPU hosting options assessed against applicable data-residency and POPIA obligations")
    .replace(/integrated into the SOC/g, "with project-specific monitoring integration")
    .replace(/SOC integration/g, "monitoring integration")
    .replace(/powered by Hikvision/g, "with technology options including Hikvision")
    .replace(/AcuSense drops false alarms by up to 95%/g, "AcuSense offers target-classification features whose results depend on scene conditions and configuration")
    .replace(/with RPO\/RTO bound contractually and audited semi-annually/g, "with recovery objectives and test intervals agreed for the specific project")
    .replace(/A unified DaaS commercial model, a single accountable owner across imaging, deployment and lifecycle\./g, "Device lifecycle arrangements, imaging, deployment and ownership are agreed for each engagement.")
    .replace(/a contract-defined security monitoring/g, "contract-defined security monitoring")
    .replace(/a contract-defined security monitoring for/g, "contract-defined security monitoring for");
}

function industryText(text: string) {
  return publicText(text)
    .replace(/Sovereign cloud zones keeping (?:citizen|customer) data on African soil/g, "Hosting options assessed against the organisation’s lawful data-residency obligations")
    .replace(/HIPAA-equivalent data protection/g, "privacy-conscious patient information handling")
    .replace(/engineered for life-safety availability/g, "planned around availability requirements agreed with clinical operators")
    .replace(/Continuous availability — 99\.999% is the baseline, not the target/g, "Availability targets, redundancy and recovery arrangements must be defined and validated for each service")
    .replace(/PCI-DSS compliant segmentation/g, "Payment-path segmentation designed against applicable PCI-DSS requirements and independently assessed where required")
    .replace(/operate without surprises/g, "plan and operate their agreed environment")
    .replace(/contract-defined network monitoring and SOC with carrier-grade SLA reporting/g, "Network and security monitoring options with service levels agreed by contract")
    .replace(/Central NOC monitoring/g, "Centralised monitoring")
    .replace(/a single operations pane that gives operators situational awareness and decision-grade data/g, "an operating view designed to support situational awareness and informed decisions");
}

export function BusinessFrame({ eyebrow, title, description, children, action }: {
  eyebrow: string; title: ReactNode; description: string; children: ReactNode; action?: ReactNode;
}) {
  return <>
    <section className="vf-interior-hero vf-business-hero">
      <div className="vf-interior-pattern" aria-hidden="true" />
      <div className="vf-container vf-interior-content">
        <span className="vf-eyebrow"><span className="vf-eyebrow-line" />{eyebrow}</span>
        <h1>{title}</h1><p>{description}</p>
        {action && <div className="vf-interior-action">{action}</div>}
        <div className="vf-interior-index">KABO / CONNECTED THINKING <span>↗</span> SOUTH AFRICA</div>
      </div>
    </section>
    {children}
  </>;
}

function QuoteButton({ context, children = "Discuss your requirements" }: { context?: string; children?: ReactNode }) {
  const { navigate } = usePage();
  return <button type="button" className="vf-action vf-action--dark" onClick={() => navigate("rfq", context)}>{children}<ArrowUpRight size={18} /></button>;
}

export function ProductsIndex() {
  const [query, setQuery] = useState("");
  const { navigate } = usePage();
  const categories = PRODUCT_CATEGORIES.filter(category => [category.name, category.tagline, category.overview, ...category.technologies].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  return <BusinessFrame eyebrow="PRODUCTS / TECHNOLOGY PORTFOLIO" title={<>The tools behind <em>what comes next.</em></>} description="Explore KABO’s detailed enterprise technology portfolio: compute, storage, networks, security, AI, cloud, analytics, recoverability and the digital workplace." action={<QuoteButton>Request product guidance</QuoteButton>}>
    <section className="vf-section vf-section--light"><div className="vf-container">
      <div className="vf-section-lead"><span className="vf-eyebrow">TEN TECHNOLOGY CATEGORIES</span><div className="vf-section-lead-grid"><h2>Find the right <em>foundation.</em></h2><p>Open a category for its technical scope, representative platforms and related solution architecture.</p></div></div>
      <div className="vf-filter"><Search size={20} /><input aria-label="Search product categories" placeholder="Search compute, storage, networking, laptops…" value={query} onChange={event => setQuery(event.target.value)} /><span>{categories.length} CATEGORIES</span></div>
      <div className="vf-procurement-grid">{categories.map(category => {
        const Icon = ICON_MAP[category.icon] ?? ICON_MAP.Server;
        return <button type="button" key={category.slug} onClick={() => navigate("product-detail", category.slug)}><div><Icon size={27} strokeWidth={1.4} /><ArrowUpRight /></div><h3>{publicText(category.name)}</h3><p>{publicText(category.tagline)}</p><span>EXPLORE CATEGORY <ArrowRight size={13} /></span></button>;
      })}</div>
      {categories.length === 0 && <p role="status" className="vf-public-note">No category matches that search. Try a technology name or send us a specification.</p>}
      <p className="vf-public-note">{SELECTION_NOTICE}</p>
      <div className="vf-publication-card"><div><span className="vf-eyebrow">EQUIPMENT / EVERYDAY ESSENTIALS</span><h2>From server platforms to office paper.</h2><p>Our wider procurement catalogue also covers printers, consumables, A4 and A3 paper, stationery, peripherals and daily workplace supplies.</p></div><button type="button" className="vf-text-link" onClick={() => navigate("procurement")}>Explore itemised procurement <ArrowUpRight size={17} /></button></div>
    </div></section>
  </BusinessFrame>;
}

const PRODUCT_STUDIOS: Record<string, string> = {
  "compute-platforms": "compute", "storage-platforms": "datacentre", "networking-fabric": "campus", "cyber-security": "resilience", "ai-gpu-compute": "compute", "cloud-platforms": "widearea", "physical-security": "security", "analytics-platforms": "compute", "backup-resilience": "resilience", "digital-workplace": "workplace",
};

const SOLUTION_LINKS: Record<string, { slug: string; label: string }> = {
  compute: { slug: "ai-infrastructure", label: "Compute platforms" },
  data: { slug: "data-centre", label: "Data platforms" },
  networking: { slug: "campus-network", label: "Enterprise networking" },
  security: { slug: "cyber-resilience", label: "Cybersecurity and resilience" },
  "physical-security": { slug: "surveillance", label: "Electronic security" },
  "ai-infrastructure": { slug: "ai-infrastructure", label: "AI infrastructure" },
  cloud: { slug: "wide-area", label: "Cloud connectivity" },
  "analytics-bi": { slug: "ai-infrastructure", label: "Data and analytics infrastructure" },
  continuity: { slug: "cyber-resilience", label: "Backup and continuity" },
  "digital-workplace": { slug: "workplace", label: "Digital workplace" },
  "iot-edge": { slug: "campus-network", label: "Connected edge environments" },
};

function RelatedLinks({ solutions, industries = [] }: { solutions: string[]; industries?: string[] }) {
  const { navigate } = usePage();
  return <div className="vf-business-related"><span className="vf-eyebrow">EXPLORE / CONNECTED CAPABILITIES</span><div>{solutions.map(key => {
    const solution = SOLUTION_LINKS[key];
    return solution ? <button type="button" className="vf-text-link" key={key} onClick={() => navigate("solution-detail", solution.slug)}>{solution.label} <ArrowUpRight size={15} /></button> : null;
  })}{industries.map(slug => {
    const industry = INDUSTRIES.find(item => item.slug === slug);
    return industry ? <button type="button" className="vf-text-link" key={slug} onClick={() => navigate("industry-detail", industry.slug)}>{industry.name} <ArrowUpRight size={15} /></button> : null;
  })}</div></div>;
}

export function ProductDetails({ slug }: { slug: string }) {
  const { navigate } = usePage();
  const product = PRODUCT_CATEGORIES.find(category => category.slug === slug);
  if (!product) return <BusinessFrame eyebrow="PRODUCTS / CATEGORY LOOKUP" title={<>Let’s find the <em>right category.</em></>} description="This product category is not in our published portfolio. Explore the catalogue or send a specification for assessment."><section className="vf-section vf-section--light"><div className="vf-container"><button className="vf-action vf-action--dark" onClick={() => navigate("products")}>Explore all products <ArrowRight size={18} /></button></div></section></BusinessFrame>;
  return <BusinessFrame eyebrow="PRODUCTS / TECHNOLOGY DETAIL" title={<>{publicText(product.name)}</>} description={publicText(product.tagline)} action={<QuoteButton context={product.slug}>Enquire about this category</QuoteButton>}>
    <section className="vf-section vf-section--light"><div className="vf-container">
      <div className="vf-detail-overview"><div><span className="vf-eyebrow">TECHNOLOGY / PURPOSE</span><h2>A platform chosen for <em>your workload.</em></h2></div><div><p>{publicText(product.overview)}</p><p>Product variants, regional availability, integration dependencies and support options are assessed against your existing environment before a quotation is confirmed.</p></div></div>
      <div className="vf-detail-list">{product.capabilities.map((capability, index) => <article key={capability.name}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{publicText(capability.name)}</h3><p>{publicText(capability.desc)}</p></div><Check size={18} /></article>)}</div>
    </div></section>
    <section className="vf-section vf-section--cream"><div className="vf-container">
      <div className="vf-section-lead"><span className="vf-eyebrow">REPRESENTATIVE / PLATFORMS</span><div className="vf-section-lead-grid"><h2>Technology <em>in context.</em></h2><p>Portfolio references help explain the category. They do not establish a manufacturer appointment or confirmed entitlement to supply.</p></div></div>
      <ul className="vf-product-tech" aria-label="Representative technologies">{product.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
      <p className="vf-public-note">{SELECTION_NOTICE}</p>
      <a className="vf-text-link" href={`/studio/${PRODUCT_STUDIOS[product.slug]}`}>Explore the related architecture <ArrowUpRight size={17} /></a>
      <RelatedLinks solutions={product.relatedSolutions} industries={product.relatedIndustries} />
    </div></section>
    <section className="vf-section vf-section--light"><div className="vf-container"><div className="vf-publication-card"><div><span className="vf-eyebrow">FROM CATEGORY / TO REQUIREMENTS</span><h2>Tell us what the system must do.</h2><p>Useful details include workloads, quantities, existing platforms, compatibility requirements, site conditions, target timing and the required support scope.</p></div><QuoteButton context={product.slug} /></div></div></section>
  </BusinessFrame>;
}

const COMMERCIAL_SERVICES = [
  { title: "ICT hardware supply", introduction: "Source enterprise equipment and everyday workplace technology against a defined specification.", points: ["Servers, storage, networking, security and user devices", "Printers, scanners, peripherals, stationery and consumables", "Manufacturer part numbers, approved alternatives and compatibility checks", "Opportunity-specific channel, warranty and availability validation"] },
  { title: "Specification and procurement coordination", introduction: "Turn operational requirements into a structured, reviewable bill of materials.", points: ["Requirements capture and equipment schedules", "Component dependencies, licences and support options", "Supplier quotations and lead-time coordination", "Project-specific procurement documentation and agreed returnables"] },
  { title: "Software and licence sourcing", introduction: "Plan legitimate software entitlements for the platform, users and agreed operating model.", points: ["Infrastructure, backup, security and productivity licences", "Subscription, term and renewal requirements", "Version and platform compatibility", "Vendor eligibility and licence conditions confirmed per opportunity"] },
  { title: "Rollout and implementation logistics", introduction: "Coordinate delivery and installation activities around site readiness and the agreed project scope.", points: ["Delivery destinations, access and scheduling dependencies", "Staging, configuration and integration requirements", "Installation resources and specialist coordination", "Asset schedules, commissioning and handover documentation"] },
  { title: "Lifecycle support planning", introduction: "Define practical support and maintenance requirements before equipment enters service.", points: ["Warranty, maintenance and manufacturer-support options", "Replacement and escalation arrangements", "Configuration records and operational handover", "Support coverage and response commitments explicitly agreed by contract"] },
  { title: "Refresh and asset recovery planning", introduction: "Prepare equipment refresh and decommissioning activities with attention to information handling and traceability.", points: ["Asset inventories and replacement dependencies", "Data sanitisation requirements and chain-of-custody documentation", "Trade-in or recovery options where an approved provider offers them", "Responsible disposal and evidence requirements agreed before execution"] },
];

export function ServicesIndex() {
  return <BusinessFrame eyebrow="SERVICES / FROM REQUIREMENTS TO READINESS" title={<>The thinking around <em>the technology.</em></>} description="IT hardware supply and solutions procurement form the core of KABO’s offering. Architecture-led discovery, implementation planning and lifecycle coordination connect the equipment to the business requirement." action={<QuoteButton>Discuss a service requirement</QuoteButton>}>
    <section className="vf-section vf-section--light"><div className="vf-container">
      <div className="vf-section-lead"><span className="vf-eyebrow">SIX / COMMERCIAL AND LIFECYCLE SERVICES</span><div className="vf-section-lead-grid"><h2>Clarity across <em>the lifecycle.</em></h2><p>Every engagement has a defined scope, resources and commercial terms. The activities below are assessed and agreed for each opportunity.</p></div></div>
      <div className="vf-business-list">{COMMERCIAL_SERVICES.map((service, index) => <article key={service.title}><span className="vf-eyebrow">{String(index + 1).padStart(2, "0")} / SERVICE SCOPE</span><h3>{service.title}</h3><p>{service.introduction}</p><ul>{service.points.map(point => <li key={point}>{point}</li>)}</ul></article>)}</div>
    </div></section>
    <section className="vf-section vf-section--cream"><div className="vf-container">
      <div className="vf-section-lead"><span className="vf-eyebrow">ENGINEERING / EIGHT CONNECTED DOMAINS</span><div className="vf-section-lead-grid"><h2>Technical depth. <em>Practical scope.</em></h2><p>Discover the specific assessment, planning, configuration and handover activities associated with each capability domain.</p></div></div>
      <div className="vf-business-list">{KABO_CATALOGUE.map((section, index) => <article key={section.title}><span className="vf-eyebrow">{String(index + 1).padStart(2, "0")} / TECHNICAL SERVICES</span><h3>{section.title}</h3><p>{section.intro}</p><ul>{section.services.map(service => <li key={service}>{service}</li>)}</ul></article>)}</div>
      <p className="vf-public-note">Specialist engineering, deployment, operational monitoring, service levels and compliance evidence are delivered only where expressly included in an agreed scope. Reference capabilities are not claims of a certified facility, existing customer deployment or guaranteed service outcome.</p>
      <QuoteButton />
    </div></section>
  </BusinessFrame>;
}

export function IndustryIndex() {
  const { navigate } = usePage();
  const [query, setQuery] = useState("");
  const industries = INDUSTRIES.filter(industry => [industry.name, industry.tagline, industry.overview].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  return <BusinessFrame eyebrow="INDUSTRIES / OPERATING CONTEXT" title={<>Every environment <em>has its own logic.</em></>} description="Sixteen sector perspectives show how infrastructure requirements change with operating conditions, regulation, geography, users and critical workloads.">
    <section className="vf-section vf-section--light"><div className="vf-container">
      <div className="vf-section-lead"><span className="vf-eyebrow">SIXTEEN / INDUSTRY PERSPECTIVES</span><div className="vf-section-lead-grid"><h2>Start with <em>the environment.</em></h2><p>Explore each sector’s practical challenges, relevant technology layers and illustrative deployment scenarios. These are reference requirements, not customer project claims.</p></div></div>
      <div className="vf-filter"><Search size={20} /><input aria-label="Search industries" placeholder="Search healthcare, education, retail, logistics…" value={query} onChange={event => setQuery(event.target.value)} /><span>{industries.length} SECTORS</span></div>
      <div className="vf-procurement-grid">{industries.map(industry => { const Icon = ICON_MAP[industry.icon] ?? ICON_MAP.Building2; return <button type="button" key={industry.slug} onClick={() => navigate("industry-detail", industry.slug)}><div><Icon size={27} strokeWidth={1.4} /><ArrowUpRight /></div><h3>{industry.name}</h3><p>{industryText(industry.tagline)}</p><span>EXPLORE REQUIREMENTS <ArrowRight size={13} /></span></button>; })}</div>
      {industries.length === 0 && <p className="vf-public-note" role="status">No sector matches that search. Try an operating environment or submit a general project enquiry.</p>}
      <p className="vf-public-note">Sector illustrations are discovery aids. They do not represent a completed KABO installation, approved engineering design, customer endorsement or compliance certification.</p>
    </div></section>
  </BusinessFrame>;
}

export function IndustryDetails({ slug }: { slug: string }) {
  const { navigate } = usePage();
  const industry = INDUSTRIES.find(item => item.slug === slug);
  if (!industry) return <BusinessFrame eyebrow="INDUSTRIES / SECTOR LOOKUP" title={<>Let’s understand <em>your environment.</em></>} description="Explore the published sector perspectives or describe your particular operational requirements."><section className="vf-section vf-section--light"><div className="vf-container"><button className="vf-action vf-action--dark" onClick={() => navigate("industries")}>Explore all industries <ArrowRight size={18} /></button></div></section></BusinessFrame>;
  return <BusinessFrame eyebrow="INDUSTRIES / REQUIREMENTS PERSPECTIVE" title={<>{industry.name}</>} description={industryText(industry.tagline)} action={<QuoteButton context={industry.slug}>Discuss this environment</QuoteButton>}>
    <section className="vf-section vf-section--light"><div className="vf-container">
      <div className="vf-detail-overview"><div><span className="vf-eyebrow">CONTEXT / OPERATING REALITY</span><h2>Infrastructure shaped by <em>the work.</em></h2></div><div><p>{industryText(industry.overview)}</p><p>Every organisation has its own installed base, procurement requirements, policies, risks and operational constraints. These reference considerations are assessed against your actual environment.</p></div></div>
      <div className="vf-business-list"><article><span className="vf-eyebrow">01 / OPERATIONAL CHALLENGES</span><h3>What the infrastructure must address.</h3><ul>{industry.challenges.map(challenge => <li key={challenge}>{industryText(challenge)}</li>)}</ul></article><article><span className="vf-eyebrow">02 / PLANNING CONSIDERATIONS</span><h3>A connected approach.</h3><ul>{industry.kaboApproach.map(point => <li key={point}>{industryText(point)}</li>)}</ul></article></div>
    </div></section>
    <section className="vf-section vf-section--cream"><div className="vf-container"><div className="vf-section-lead"><span className="vf-eyebrow">SIX / TECHNOLOGY LAYERS</span><div className="vf-section-lead-grid"><h2>From the edge <em>to the operating model.</em></h2><p>These layers form a reference checklist. Technology selection and architecture are validated for the project; not every layer is required in every environment.</p></div></div><div className="vf-business-list">{industry.architecture.map((layer, index) => <article key={layer.layer}><span className="vf-eyebrow">0{index + 1} / REFERENCE LAYER</span><h3>{layer.layer}</h3><p>{industryText(layer.desc)}</p></article>)}</div></div></section>
    <section className="vf-section vf-section--light"><div className="vf-container"><div className="vf-section-lead"><span className="vf-eyebrow">ILLUSTRATIVE / DEPLOYMENT SCENARIOS</span><div className="vf-section-lead-grid"><h2>Different sites. <em>One coherent plan.</em></h2><p>Conceptual examples help frame scope and dependencies. They are not examples of verified KABO customer sites.</p></div></div><div className="vf-business-list">{industry.deployment.map(scenario => <article key={scenario.scenario}><h3>{scenario.scenario}</h3><p>{industryText(scenario.desc)}</p></article>)}</div><p className="vf-public-note">Availability, safety, regulatory compliance, security monitoring, hosting and response-time commitments require project-specific assessment and written agreement. Portfolio references do not establish OEM authorisation.</p><RelatedLinks solutions={industry.relatedSolutions} /><QuoteButton context={industry.slug} /></div></section>
  </BusinessFrame>;
}

type SubmissionState = { pending: boolean; error: string; accepted: boolean; reference?: string };
const INITIAL_SUBMISSION: SubmissionState = { pending: false, error: "", accepted: false };

function InputField({ name, label, type = "text", required = false, autoComplete }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return <label>{label}{required ? " *" : ""}<input name={name} type={type} required={required} maxLength={250} autoComplete={autoComplete} /></label>;
}

function SubmissionFeedback({ status, reset, type }: { status: SubmissionState; reset: () => void; type: "support" | "investor" }) {
  return <div className="vf-form-success" role="status" aria-live="polite"><Check size={30} /><h3>{type === "support" ? "Support enquiry accepted." : "Investor enquiry accepted."}</h3>{status.reference && <p>Your enquiry reference is <strong>{status.reference}</strong>.</p>}<p>Your submission was accepted by a configured delivery channel. {type === "support" ? "This reference does not confirm an assigned service-desk ticket, active support agreement or response time." : "The team will review your enquiry; this does not constitute an investment offer, financial forecast or agreement."}</p><button type="button" onClick={reset}>Send another enquiry</button></div>;
}

export function SupportEnquiry() {
  const [status, setStatus] = useState<SubmissionState>(INITIAL_SUBMISSION);
  const { navigate } = usePage();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = Object.fromEntries(["category", "subject", "description", "fullName", "email", "phone", "organisation", "contractRef"].map(key => [key, String(fields.get(key) || "").trim()]));
    setStatus({ pending: true, error: "", accepted: false });
    try {
      const response = await fetch("/api/tickets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "The support enquiry could not be delivered. Please use the contact page.");
      setStatus({ pending: false, error: "", accepted: true, reference: result.ticket?.ticketNumber });
      form.reset();
    } catch (error) { setStatus({ pending: false, error: error instanceof Error ? error.message : "The support service could not be reached. Please try again.", accepted: false }); }
  }
  return <BusinessFrame eyebrow="SUPPORT / ENQUIRY INTAKE" title={<>Support begins with <em>clarity.</em></>} description="Tell us what is happening with your installation, equipment or procurement. We will use your details to route the enquiry to the appropriate team.">
    <section className="vf-section vf-section--light"><div className="vf-container vf-form-grid"><div><span className="vf-eyebrow">YOUR ENVIRONMENT / YOUR CONTEXT</span><h2>Describe the <em>issue.</em></h2><p>Include the affected equipment, symptoms, when the issue began and any recent changes. Provide a service or contract reference if you have one.</p><p>Response arrangements and service levels depend on your confirmed agreement. This form is an enquiry intake service, not a live incident-management dashboard.</p><button type="button" className="vf-text-link" onClick={() => navigate("contact")}>Find direct contact options <ArrowUpRight size={17} /></button></div>
      <form className="vf-form" onSubmit={submit} aria-label="Support enquiry"><div className="vf-form-top">SUPPORT ENQUIRY <span>FIELDS MARKED * REQUIRED</span></div>{status.accepted ? <SubmissionFeedback status={status} reset={() => setStatus(INITIAL_SUBMISSION)} type="support" /> : <>
        <div className="vf-form-row"><InputField name="fullName" label="Full name" required autoComplete="name" /><InputField name="email" label="Email" type="email" required autoComplete="email" /></div>
        <div className="vf-form-row"><InputField name="organisation" label="Organisation" autoComplete="organization" /><InputField name="phone" label="Phone" type="tel" autoComplete="tel" /></div>
        <label>Issue category *<select name="category" required defaultValue=""><option value="" disabled>Select an issue category</option><option>Network and connectivity</option><option>Compute and storage</option><option>Security systems</option><option>Print and workplace equipment</option><option>Procurement and delivery</option><option>Other</option></select></label>
        <InputField name="contractRef" label="Service or contract reference" /><InputField name="subject" label="Subject" required />
        <label>Issue description *<textarea name="description" required rows={6} maxLength={6000} /></label>
        {status.error && <div className="vf-form-error" role="alert">{status.error}</div>}
        <button type="submit" className="vf-action vf-action--dark" disabled={status.pending}>{status.pending ? "Sending…" : "Send support enquiry"}<ArrowUpRight size={18} /></button>
        <p className="vf-form-privacy">Your details are used to respond to this enquiry. Do not submit passwords, confidential credentials or unnecessary sensitive personal information.</p>
      </>}</form>
    </div></section>
  </BusinessFrame>;
}

const INVESTOR_THEMES = [
  { title: "AI changes infrastructure requirements", text: "Accelerated workloads alter compute, interconnect, storage, power and cooling requirements. Opportunities begin with workload validation, suitable platforms and an operationally supportable design." },
  { title: "Security belongs in the architecture", text: "Identity, segmentation, recovery, physical access and visibility should be considered together. Monitoring and incident-response services require an explicitly agreed operating model." },
  { title: "Lifecycle value matters", text: "Technology decisions extend beyond initial equipment supply. Deployment dependencies, supportability, renewals, resilience and responsible refresh shape the long-term operating outcome." },
];

export function InvestorEnquiry() {
  const [status, setStatus] = useState<SubmissionState>(INITIAL_SUBMISSION);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = Object.fromEntries(["fullName", "organisation", "email", "phone", "investorType", "fundSize", "timeline", "message"].map(key => [key, String(fields.get(key) || "").trim()]));
    setStatus({ pending: true, error: "", accepted: false });
    try {
      const response = await fetch("/api/investor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "The investor enquiry could not be delivered. Please use the contact page.");
      setStatus({ pending: false, error: "", accepted: true });
      form.reset();
    } catch (error) { setStatus({ pending: false, error: error instanceof Error ? error.message : "The enquiry service could not be reached. Please try again.", accepted: false }); }
  }
  return <BusinessFrame eyebrow="INVESTORS / STRATEGIC CONVERSATIONS" title={<>A conversation about <em>what comes next.</em></>} description="KABO welcomes strategic conversations aligned with coherent, resilient infrastructure for South African and African organisations. Share your focus and the nature of the proposed relationship.">
    <section className="vf-section vf-section--light"><div className="vf-container"><div className="vf-section-lead"><span className="vf-eyebrow">OUR PERSPECTIVE / THREE THEMES</span><div className="vf-section-lead-grid"><h2>Infrastructure is <em>a long-term decision.</em></h2><p>These themes explain the business context for an introductory discussion. Financial information, due diligence, ownership and investment terms are addressed separately using verified documentation.</p></div></div><div className="vf-business-list">{INVESTOR_THEMES.map((theme, index) => <article key={theme.title}><span className="vf-eyebrow">0{index + 1} / STRATEGIC THEME</span><h3>{theme.title}</h3><p>{theme.text}</p></article>)}</div></div></section>
    <section className="vf-section vf-section--cream"><div className="vf-container vf-form-grid"><div><span className="vf-eyebrow">INTRODUCE / YOUR INTEREST</span><h2>Begin with <em>alignment.</em></h2><p>Tell us about your organisation, investment or partnership interests, the proposed relationship and your time horizon. An introductory enquiry is not an investment offer or agreement.</p><a className="vf-text-link" href="/api/downloads/company-profile" download><Download size={17} /> Download the company profile</a></div><form className="vf-form" onSubmit={submit} aria-label="Investor enquiry"><div className="vf-form-top">INVESTOR ENQUIRY <span>FIELDS MARKED * REQUIRED</span></div>{status.accepted ? <SubmissionFeedback status={status} reset={() => setStatus(INITIAL_SUBMISSION)} type="investor" /> : <>
      <div className="vf-form-row"><InputField name="fullName" label="Full name" required autoComplete="name" /><InputField name="organisation" label="Organisation" required autoComplete="organization" /></div><div className="vf-form-row"><InputField name="email" label="Email" type="email" required autoComplete="email" /><InputField name="phone" label="Phone" type="tel" autoComplete="tel" /></div>
      <label>Nature of interest *<select name="investorType" required defaultValue=""><option value="" disabled>Select your interest</option><option>Strategic investment</option><option>Private investment</option><option>Institutional investment</option><option>Commercial partnership</option><option>Other</option></select></label>
      <div className="vf-form-row"><InputField name="fundSize" label="Indicative mandate or scale (optional)" /><InputField name="timeline" label="Time horizon (optional)" /></div>
      <label>Introduce your interest *<textarea name="message" required rows={6} maxLength={6000} /></label>
      {status.error && <div className="vf-form-error" role="alert">{status.error}</div>}
      <button type="submit" className="vf-action vf-action--dark" disabled={status.pending}>{status.pending ? "Sending…" : "Send investor enquiry"}<ArrowUpRight size={18} /></button><p className="vf-form-privacy">We use your details to respond to this enquiry. Please do not include confidential deal documentation, passwords or unnecessary personal information in this form.</p>
    </>}</form></div></section>
  </BusinessFrame>;
}
