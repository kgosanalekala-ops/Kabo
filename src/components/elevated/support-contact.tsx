"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import { EnquiryForm } from "./enquiry-form";
import { SiteLink } from "./site-link";

const articles = [
  {
    title: "P1 escalation runbook",
    category: "Operations",
    introduction:
      "Recognise a business-critical incident and give the support team a useful starting point.",
    steps: [
      "Confirm the business impact: affected services, sites, users and the time the outage started.",
      "Use the escalation channel in your support agreement. An online enquiry alone should not be your only action during a critical outage.",
      "Provide a reachable contact, the service or contract reference and any safe diagnostic evidence.",
      "Record actions already taken and recent changes. Preserve logs and avoid repeated restarts that destroy useful evidence.",
    ],
    note: "Critical incident response and escalation timing are governed by the active support agreement.",
  },
  {
    title: "HPE ProLiant — common POST errors",
    category: "Hardware",
    introduction:
      "Collect the right evidence when a server fails its power-on self-test.",
    steps: [
      "Record the exact POST code, front-panel indicators and server model before changing the system.",
      "Review iLO / integrated management logs and note recent firmware, memory or hardware changes.",
      "Check power and component health using the manufacturer's service documentation for that exact platform.",
      "Share the event log and serial / asset reference with support. Follow agreed maintenance and change procedures before reseating components.",
    ],
    note: "Error codes and safe service actions vary by model; this is a triage guide, not a replacement for the OEM service manual.",
  },
  {
    title: "Fortinet HA failover — verification checklist",
    category: "Security",
    introduction:
      "Understand the state of a high-availability pair without creating a second incident.",
    steps: [
      "Record which cluster member is primary, when failover occurred and whether the affected applications remain reachable.",
      "Review HA, heartbeat, interface and system logs around the event; note configuration or firmware changes.",
      "Check cluster synchronisation and monitored links using approved read-only diagnostics.",
      "Escalate mismatched configuration, repeated role changes or degraded connectivity. Do not force a failover outside an agreed change window.",
    ],
    note: "Confirm the relevant FortiOS version and deployment design before applying any configuration change.",
  },
  {
    title: "Pure Storage FlashArray — capacity threshold alerts",
    category: "Storage",
    introduction: "Turn an early capacity warning into a planned conversation.",
    steps: [
      "Capture the alert, the reported usable capacity and the date of the observation.",
      "Review growth trends, snapshots, protection policies and replication destinations with the storage owner.",
      "Identify unusual workload changes, retention increases or unexpectedly large data imports.",
      "Contact support for a workload-led capacity review before deleting data or changing retention.",
    ],
    note: "Never remove protected copies or business data solely to clear a dashboard warning.",
  },
  {
    title: "NVIDIA HGX cluster — health monitoring basics",
    category: "AI infrastructure",
    introduction:
      "Use consistent telemetry to distinguish workload behaviour from platform faults.",
    steps: [
      "Record the affected nodes, accelerator models, workload and software / driver versions.",
      "Review approved DCGM or platform telemetry for temperature, power, memory and error indicators.",
      "Compare observations with the workload's known-good baseline and the platform's OEM limits.",
      "Correlate accelerator events with fabric, storage, power and cooling conditions before escalating.",
    ],
    note: "Thresholds depend on the specific platform and operating envelope. Do not invent universal temperature or power limits.",
  },
  {
    title: "Veeam backup failure — first-response checks",
    category: "Resilience",
    introduction:
      "Preserve recoverability while investigating a failed backup job.",
    steps: [
      "Record the job, affected workloads, last successful restore point and the exact failure message.",
      "Check repository capacity, connectivity, credentials, scheduling conflicts and the backup infrastructure's health.",
      "Review recent application, hypervisor or configuration changes and the vendor's guidance for the exact error.",
      "Confirm the protection gap with the service owner and plan a controlled retry or escalation. Verify restoration through the agreed testing process.",
    ],
    note: "A successful retry is not proof of recoverability; restoration must be tested against agreed recovery objectives.",
  },
];
const priorities = [
  {
    code: "P1",
    name: "Critical",
    response: "15 minutes",
    description:
      "Production down. Material business impact. 24/7 escalation where contracted.",
  },
  {
    code: "P2",
    name: "High",
    response: "1 hour",
    description:
      "Severe degradation with a workaround available. Business-hours response.",
  },
  {
    code: "P3",
    name: "Medium",
    response: "4 hours",
    description:
      "Limited impact. Planned investigation and next-business-day follow-up where agreed.",
  },
  {
    code: "P4",
    name: "Low",
    response: "24 hours",
    description: "Information requests and non-urgent changes or issues.",
  },
];

export function ContactPage() {
  return (
    <div className="ec-page">
      <section className="e-page-heading ec-heading">
        <div className="e-container">
          <span className="e-eyebrow">Contact / Start a conversation</span>
          <h1>
            Big ambitions.
            <br />
            <em>One conversation.</em>
          </h1>
          <p>
            Tell us about your workload, your estate or your procurement
            requirement. We’ll connect the conversation with the right KABO
            expertise.
          </p>
          <a href="#project-enquiry" className="ec-heading-link">
            Tell us what you’re building <ArrowDown size={16} />
          </a>
        </div>
        <span className="ec-heading-orbit" aria-hidden="true" />
      </section>
      <section className="ec-enquiry-section" id="project-enquiry">
        <div className="e-container ec-contact-grid">
          <div className="ec-form-column">
            <div className="ec-section-intro">
              <span className="e-eyebrow">Start with the requirement</span>
              <h2>
                What are you
                <br />
                <em>working towards?</em>
              </h2>
              <p>
                AI infrastructure, ICT supply, an RFP or a more connected
                workplace. Share the context, constraints and timeframe so the
                first conversation is a useful one.
              </p>
            </div>
            <EnquiryForm kind="contact" />
          </div>
          <aside
            className="ec-contact-aside"
            aria-label="KABO company contact details"
          >
            <span className="e-eyebrow">The direct line</span>
            <h2>
              People behind
              <br />
              the infrastructure.
            </h2>
            <p>
              Prefer to speak directly? Choose the channel that works for your
              enquiry.
            </p>
            <dl className="ec-contact-details">
              <div>
                <dt>
                  <Mail size={18} /> General enquiries
                </dt>
                <dd>
                  <a href="mailto:info@kaboitgroup.co.za">
                    info@kaboitgroup.co.za <ArrowUpRight size={15} />
                  </a>
                  <small>
                    General acknowledgement target: one business day.
                  </small>
                </dd>
              </div>
              <div>
                <dt>
                  <ShieldCheck size={18} /> Technical support
                </dt>
                <dd>
                  <a href="mailto:support@kaboitgroup.co.za">
                    support@kaboitgroup.co.za <ArrowUpRight size={15} />
                  </a>
                  <small>
                    Include your service reference and the business impact.
                  </small>
                </dd>
              </div>
              <div>
                <dt>
                  <Phone size={18} /> Telephone
                </dt>
                <dd>
                  <a href="tel:+27612854418">
                    +27 612 85 4418 <ArrowUpRight size={15} />
                  </a>
                </dd>
              </div>
              <div>
                <dt>
                  <MapPin size={18} /> Registered address
                </dt>
                <dd>
                  <address>
                    12886 Masemola Street
                    <br />
                    Mamelodi East, Pretoria, 0122
                    <br />
                    South Africa
                  </address>
                </dd>
              </div>
              <div>
                <dt>
                  <Clock3 size={18} /> Engineering & support coverage
                </dt>
                <dd>
                  Business-hours and 24/7 escalation arrangements follow your
                  support agreement.
                  <small>
                    Confirm coverage and the appropriate urgent-contact route
                    when your service is onboarded.
                  </small>
                </dd>
              </div>
            </dl>
            <a
              className="ec-whatsapp"
              href="https://wa.me/27612854418?text=Hello%20KABO%20IT%20Group%2C%20I%27d%20like%20to%20start%20a%20conversation%20about%20your%20solutions."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={19} /> Start a WhatsApp conversation{" "}
              <ArrowUpRight size={16} />
            </a>
            <div className="ec-other-enquiries">
              <SiteLink page="support">
                Need technical support? <ArrowUpRight size={15} />
              </SiteLink>
              <SiteLink page="investors">
                Investor conversations <ArrowUpRight size={15} />
              </SiteLink>
            </div>
          </aside>
        </div>
      </section>
      <section className="ec-promise">
        <div className="e-container">
          <span className="e-eyebrow">A clearer way forward</span>
          <h2>
            Less vendor complexity.
            <br />
            <em>More connected thinking.</em>
          </h2>
          <div>
            {[
              "One conversation across equipment, systems and services.",
              "Specifications shaped around the requirement.",
              "A clear path from discovery to proposal and delivery.",
            ].map((item) => (
              <p key={item}>
                <Check size={17} />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function SupportPage() {
  const [query, setQuery] = useState("");
  const shownArticles = articles.filter((article) =>
    `${article.title} ${article.category} ${article.introduction}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <div className="es-page">
      <section className="e-page-heading es-heading">
        <div className="e-container">
          <span className="e-eyebrow">Support / Built around your estate</span>
          <h1>
            When it matters,
            <br />
            <em>clarity comes first.</em>
          </h1>
          <p>
            From a platform issue to a resilience question. Give the support
            team the context they need to understand the impact and identify the
            next step.
          </p>
          <div className="es-heading-actions">
            <a href="#support-enquiry" className="e-button">
              Open a support enquiry <ArrowUpRight size={17} />
            </a>
            <a href="#support-knowledge" className="es-text-link">
              Explore the knowledge base <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </section>
      <section className="es-channels">
        <div className="e-container">
          <div className="es-channel-grid">
            {[
              {
                icon: Ticket,
                number: "01",
                title: "Open an enquiry",
                text: "Describe the platform, symptoms and business impact. Include your service reference so the request can be routed in context.",
                href: "#support-enquiry",
                action: "Share the issue",
              },
              {
                icon: BookOpen,
                number: "02",
                title: "Find a starting point",
                text: "Practical first-response guides for the platforms KABO works with. Read the evidence to collect before making a change.",
                href: "#support-knowledge",
                action: "Read the guides",
              },
              {
                icon: LifeBuoy,
                number: "03",
                title: "Managed-service support",
                text: "Monitoring, capacity reviews, incident reporting and access arrangements follow your managed-service agreement.",
                href: "#managed-support",
                action: "Understand your coverage",
              },
            ].map((channel) => (
              <a
                key={channel.number}
                href={channel.href}
                className="es-channel"
              >
                <div>
                  <channel.icon size={27} strokeWidth={1.3} />
                  <span>{channel.number}</span>
                </div>
                <h2>{channel.title}</h2>
                <p>{channel.text}</p>
                <span className="es-channel-action">
                  {channel.action}
                  <ArrowUpRight size={17} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="es-enquiry-section" id="support-enquiry">
        <div className="e-container es-enquiry-grid">
          <div className="es-enquiry-copy">
            <span className="e-eyebrow">Your issue / Our starting point</span>
            <h2>
              Tell us
              <br />
              <em>what changed.</em>
            </h2>
            <p>
              What is affected? When did it start? Which services or users are
              impacted? The more useful the context, the more focused the
              investigation.
            </p>
            <ul>
              <li>Affected equipment, platform and site.</li>
              <li>Error messages, symptoms and recent changes.</li>
              <li>Business impact and a reachable contact.</li>
              <li>Your existing service or contract reference.</li>
            </ul>
            <div className="es-support-note">
              <ShieldCheck size={21} />
              <p>
                For a critical outage, use the urgent escalation route in your
                support agreement as well as this form. Response times and
                coverage are contractual.
              </p>
            </div>
            <SiteLink page="contact" className="es-text-link">
              Find direct contact options <ArrowUpRight size={16} />
            </SiteLink>
          </div>
          <EnquiryForm kind="support" />
        </div>
      </section>
      <section className="es-priorities">
        <div className="e-container">
          <div className="es-section-top">
            <div>
              <span className="e-eyebrow">Priority framework</span>
              <h2>
                Four priorities.
                <br />
                <em>One clear context.</em>
              </h2>
            </div>
            <p>
              The support team triages requests according to business impact.
              These original response tiers describe the framework; your signed
              service agreement determines the applicable response target,
              coverage window and escalation process.
            </p>
          </div>
          <div className="es-priority-grid">
            {priorities.map((priority) => (
              <article key={priority.code}>
                <div>
                  <span>{priority.code}</span>
                  <strong>{priority.name}</strong>
                </div>
                <h3>{priority.response}</h3>
                <p>{priority.description}</p>
              </article>
            ))}
          </div>
          <p className="es-priority-disclosure">
            Published response tiers are not an automatic SLA for an online
            submission. Contractual remedies, escalation windows and service
            credits apply only where agreed in writing.
          </p>
        </div>
      </section>
      <section className="es-knowledge" id="support-knowledge">
        <div className="e-container">
          <div className="es-section-top">
            <div>
              <span className="e-eyebrow">
                Knowledge base / First-response guides
              </span>
              <h2>
                Useful answers.
                <br />
                <em>Before the next step.</em>
              </h2>
            </div>
            <p>
              Start with observation, preserve the evidence and make changes
              safely. These public guides provide a first-response checklist;
              they do not replace platform documentation or an agreed change
              process.
            </p>
          </div>
          <label className="es-knowledge-search">
            <Search size={18} />
            <span className="ef-sr-only">Search support articles</span>
            <input
              type="search"
              placeholder="Search a platform or topic"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              maxLength={100}
            />
          </label>
          <div className="es-article-list">
            {shownArticles.map((article) => (
              <details key={article.title} className="es-article">
                <summary>
                  <span>{article.category}</span>
                  <h3>{article.title}</h3>
                  <ChevronDown size={22} />
                </summary>
                <div>
                  <p>{article.introduction}</p>
                  <ol>
                    {article.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <p className="es-article-note">{article.note}</p>
                  <a href="#support-enquiry">
                    Ask the support team <ArrowUpRight size={15} />
                  </a>
                </div>
              </details>
            ))}
          </div>
          {shownArticles.length === 0 && (
            <p className="es-no-results" role="status">
              No guide matches that search. Try a platform name, or send the
              support team an enquiry.
            </p>
          )}
        </div>
      </section>
      <section className="es-managed" id="managed-support">
        <div className="e-container es-managed-grid">
          <div>
            <span className="e-eyebrow">Managed-service customers</span>
            <h2>
              Your estate.
              <br />
              <em>Your agreed support.</em>
            </h2>
          </div>
          <div>
            <p>
              Monitoring, incident history, capacity dashboards and SLA
              reporting form part of an agreed managed-service scope. Access and
              escalation details are supplied through your service onboarding
              process.
            </p>
            <p>
              If you need help locating your access details, use the support
              form with your organisation and service reference. The team can
              confirm the appropriate access route. Never share passwords or
              authentication codes through this website.
            </p>
            <a href="#support-enquiry" className="e-button">
              Request help with service access <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
