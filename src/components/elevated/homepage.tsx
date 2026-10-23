"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  Plus,
  ShieldCheck,
  Layers3,
  Headset,
} from "lucide-react";
import {
  ARCHITECTURE_STEPS,
  ARCH_PRINCIPLES,
  PARTNERS,
  PROCUREMENT_LINES,
  SOLUTIONS,
  THOUGHT_LEADERSHIP,
} from "@/components/kabo/data";
import { INDUSTRIES } from "@/components/kabo/industries-data";
import { SiteLink } from "./site-link";

const BlueSculpture = dynamic(() => import("./blue-sculpture"), { ssr: false });
const industryPhotos: Record<string, string> = {
  "public-sector": "sol_government",
  "financial-services": "sol_banking",
  mining: "sol_mining",
  healthcare: "sol_hospital",
  education: "sol_campus",
  telecommunications: "sol_noc",
  manufacturing: "sol_manufacturing",
  retail: "sol_retail",
  "smart-infrastructure": "sol_smartcity",
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      element.getBoundingClientRect().top < window.innerHeight
    )
      return;
    element.classList.add("e-reveal-pending");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          element.classList.remove("e-reveal-pending");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -35px 0px", threshold: 0.02 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      element.classList.remove("e-reveal-pending");
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`e-reveal ${className}`}
      style={{ "--e-reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function ElevatedHome() {
  const [paused, setPaused] = useState(false);
  const [industryIndex, setIndustryIndex] = useState(0);
  const [method, setMethod] = useState(0);
  const industry = INDUSTRIES[industryIndex];
  const step = ARCHITECTURE_STEPS[method];
  const featured = ["compute", "security", "cloud", "networking"].map(
    (slug) => SOLUTIONS.find((s) => s.slug === slug)!,
  );
  return (
    <div className={`e-home${paused ? " e-paused" : ""}`}>
      <section className="e-hero" aria-labelledby="home-heading">
        <div className="e-container e-hero-main">
          <div className="e-hero-copy">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="e-hero-kicker"
            >
              <span />
              Intelligent infrastructure for the AI era
            </motion.div>
            <h1 id="home-heading">
              <span>Intelligent</span>
              <span>infrastructure.</span>
              <span className="e-title-blue">Built to perform.</span>
            </h1>
            <p>
              From the enterprise core to the intelligent edge. We connect
              technology, people and possibility—under one accountable partner.
            </p>
            <div className="e-hero-buttons">
              <SiteLink page="solutions" className="e-button">
                Explore our solutions
                <ArrowUpRight size={19} />
              </SiteLink>
              <SiteLink page="contact" className="e-text-link">
                Let’s talk
                <ArrowUpRight size={18} />
              </SiteLink>
            </div>
          </div>
          <div className="e-hero-art">
            <div className="e-sculpture-glow" />
            <BlueSculpture paused={paused} className="e-blue-sculpture" />
            <div className="e-art-caption">
              <span className="e-cross">+</span>
              <span>
                Independent technologies.
                <br />
                One intelligent whole.
              </span>
            </div>
            <span className="e-art-coordinate">KABO / CONNECTED BY DESIGN</span>
          </div>
          <div className="e-hero-lower">
            <a href="#kabo-difference" className="e-scroll-cue">
              <span>
                <ArrowDown size={16} />
              </span>
              Discover the KABO difference
            </a>
            <button
              className="e-motion-control"
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "Play animation" : "Pause animation"}
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}
              <span>{paused ? "Play motion" : "Pause motion"}</span>
            </button>
          </div>
        </div>
        <div className="e-credential-strip">
          <div className="e-container">
            <span>
              South African roots.
              <br />
              <strong>Enterprise ambition.</strong>
            </span>
            <div>
              <strong>Level 1</strong>
              <span>B-BBEE contributor</span>
            </div>
            <div>
              <strong>135%</strong>
              <span>Procurement recognition</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Black-owned</span>
            </div>
            <div>
              <strong>9 provinces</strong>
              <span>A nationwide footprint</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="e-partner-band e-container"
        aria-label="Technology partner ecosystem"
      >
        <span>
          World-class technology.
          <br />
          <strong>United by KABO.</strong>
        </span>
        <div className="e-partner-names">
          {[
            "HPE",
            "Dell Technologies",
            "Microsoft",
            "Fortinet",
            "Pure Storage",
          ].map((name) => (
            <SiteLink
              key={name}
              page="partner-detail"
              detail={PARTNERS.find((p) => p.name === name)?.slug}
            >
              {name}
            </SiteLink>
          ))}
        </div>
        <SiteLink
          page="partners"
          aria-label="Explore all fifteen technology partners"
          className="e-round-link"
        >
          <ArrowUpRight size={20} />
        </SiteLink>
      </section>

      <section className="e-section e-difference" id="kabo-difference">
        <div className="e-container">
          <Reveal className="e-section-top">
            <span className="e-eyebrow">
              <i>01</i>The KABO difference
            </span>
            <span className="e-side-note">
              A systems integrator.
              <br />
              An end-to-end perspective.
            </span>
          </Reveal>
          <div className="e-difference-grid">
            <Reveal>
              <h2>
                Complexity,
                <br />
                <span className="e-muted-title">connected.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="e-large-copy">
                Your technology should move your business forward. Every layer.
                Every location. Every day.
              </p>
              <p className="e-body-copy">
                Since 2016, KABO IT Group has brought enterprise compute, data,
                networking, security and AI infrastructure into one coherent
                architecture. Fifteen strategic alliances. Twelve interlocking
                solution domains. One engineering team that owns the outcome.
              </p>
              <SiteLink page="about" className="e-text-link">
                Get to know KABO
                <ArrowUpRight size={18} />
              </SiteLink>
            </Reveal>
          </div>
          <div className="e-promise-grid">
            {[
              {
                Icon: Layers3,
                title: "One architecture",
                text: "From the first reference design to the next refresh cycle. Every layer engineered to work with the next.",
              },
              {
                Icon: Headset,
                title: "One accountable team",
                text: "The same engineers integrate and operate. A single contract, a single escalation path.",
              },
              {
                Icon: ShieldCheck,
                title: "Built for your reality",
                text: "Power resilience, sovereign data and nationwide delivery. Infrastructure engineered for African enterprise.",
              },
            ].map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08} className="e-promise">
                <Icon size={26} strokeWidth={1.3} />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="e-section e-solutions-home">
        <div className="e-container">
          <Reveal className="e-section-top">
            <span className="e-eyebrow">
              <i>02</i>Connected capabilities
            </span>
            <SiteLink page="solutions" className="e-text-link">
              All twelve solutions
              <ArrowUpRight size={18} />
            </SiteLink>
          </Reveal>
          <Reveal className="e-heading-row">
            <h2>
              One portfolio.
              <br />
              <span className="e-muted-title">Every possibility.</span>
            </h2>
            <p>
              Enterprise foundations. Intelligent platforms.
              <br />
              The expertise to bring them together.
            </p>
          </Reveal>
          <div className="e-feature-grid">
            {featured.map((solution, i) => (
              <Reveal
                key={solution.slug}
                className={`e-feature-wrap e-feature-${i}`}
                delay={(i % 2) * 0.1}
              >
                <SiteLink
                  page="solution-detail"
                  detail={solution.slug}
                  className="e-feature-card"
                >
                  <div className="e-feature-card-top">
                    <span className="e-eyebrow">
                      0{i + 1} / {solution.shortTitle}
                    </span>
                    <span className="e-card-arrow">
                      <ArrowUpRight size={21} />
                    </span>
                  </div>
                  <h3>
                    {
                      [
                        "The foundation\nfor what’s next.",
                        "Resilience.\nAt every layer.",
                        "Your cloud.\nOne clear direction.",
                        "Connected.\nWithout compromise.",
                      ][i]
                    }
                  </h3>
                  <p>
                    {
                      [
                        "Compute, storage and hyperconverged platforms sized to your workloads, SLAs and growth.",
                        "A unified security posture across network, endpoint, identity and cloud.",
                        "Hybrid and multi-cloud platforms, migration and FinOps governance.",
                        "Campus, core, data centre and WAN. One observable fabric.",
                      ][i]
                    }
                  </p>
                  <div className="e-feature-image">
                    <Image
                      src={solution.image}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 100vw, 60vw"
                      className="object-cover"
                    />
                    <span className="e-feature-image-label">
                      {solution.stack.slice(0, 3).join(" / ")}
                    </span>
                  </div>
                </SiteLink>
              </Reveal>
            ))}
          </div>
          <div className="e-domain-links">
            {SOLUTIONS.filter((s) => !featured.includes(s)).map((solution) => (
              <SiteLink
                key={solution.slug}
                page="solution-detail"
                detail={solution.slug}
              >
                {solution.shortTitle}
                <Plus size={15} />
              </SiteLink>
            ))}
          </div>
        </div>
      </section>

      <section className="e-ai-chapter">
        <div className="e-ai-lines" aria-hidden="true">
          <svg viewBox="0 0 1440 850" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="e-light">
                <stop stopColor="#225fff" stopOpacity="0" />
                <stop offset=".5" stopColor="#58d6ff" />
                <stop offset="1" stopColor="#225fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {Array.from({ length: 22 }, (_, i) => (
              <path
                key={i}
                d={`M -100 ${650 + i * 8} C 300 ${-100 + i * 16}, 650 ${900 - i * 9}, 1550 ${60 + i * 18}`}
                fill="none"
                stroke="url(#e-light)"
                strokeWidth={i % 4 === 0 ? "1.5" : ".65"}
              />
            ))}
          </svg>
        </div>
        <div className="e-container">
          <Reveal className="e-section-top">
            <span className="e-eyebrow">
              <i>03</i>Built for the AI era
            </span>
            <span className="e-side-note">
              Compute → fabric → data → intelligence
            </span>
          </Reveal>
          <div className="e-ai-grid">
            <Reveal>
              <h2>
                Your AI ambitions.
                <br />
                <span>
                  Engineered
                  <br />
                  into reality.
                </span>
              </h2>
              <p>
                GPU compute. Low-latency fabric. High-throughput storage. Secure
                MLOps. We engineer the complete platform, so your teams can
                focus on what intelligence makes possible.
              </p>
              <SiteLink
                page="solution-detail"
                detail="ai-infrastructure"
                className="e-button e-button-white"
              >
                Explore AI infrastructure
                <ArrowUpRight size={19} />
              </SiteLink>
            </Reveal>
            <Reveal className="e-ai-visual">
              <div className="e-ai-orbit e-ai-orbit-one" />
              <div className="e-ai-orbit e-ai-orbit-two" />
              <div className="e-ai-core">
                <Image
                  src="/logos/kabo-emblem-white-blue.png"
                  width={95}
                  height={95}
                  alt=""
                />
              </div>
              <span className="e-ai-node e-ai-node-a">
                GPU COMPUTE<span>NVIDIA HGX H100 / H200</span>
              </span>
              <span className="e-ai-node e-ai-node-b">
                INTELLIGENT FABRIC<span>400G InfiniBand</span>
              </span>
              <span className="e-ai-node e-ai-node-c">
                SOVEREIGN DATA<span>Hybrid cloud · Secure MLOps</span>
              </span>
            </Reveal>
          </div>
          <div className="e-ai-footnote">
            <span>Training & inference</span>
            <span>Computer vision</span>
            <span>Predictive analytics</span>
            <span>Edge intelligence</span>
            <span>Data sovereignty</span>
          </div>
        </div>
      </section>

      <section className="e-section e-industries-home">
        <div className="e-container">
          <Reveal className="e-section-top">
            <span className="e-eyebrow">
              <i>04</i>Your world, understood
            </span>
            <SiteLink page="industries" className="e-text-link">
              Explore our industries
              <ArrowUpRight size={18} />
            </SiteLink>
          </Reveal>
          <Reveal>
            <h2>
              Built around
              <br />
              <span className="e-muted-title">your reality.</span>
            </h2>
          </Reveal>
          <div className="e-industry-grid">
            <div
              className="e-industry-tabs"
              role="tablist"
              aria-label="Industry expertise"
              aria-orientation="vertical"
            >
              {INDUSTRIES.map((item, i) => (
                <button
                  key={item.slug}
                  role="tab"
                  id={`industry-tab-${i}`}
                  aria-selected={industryIndex === i}
                  aria-controls="industry-panel"
                  tabIndex={industryIndex === i ? 0 : -1}
                  onClick={() => setIndustryIndex(i)}
                  onKeyDown={(event) => {
                    if (
                      [
                        "ArrowDown",
                        "ArrowUp",
                        "ArrowRight",
                        "ArrowLeft",
                      ].includes(event.key)
                    ) {
                      event.preventDefault();
                      const next =
                        (i +
                          (event.key === "ArrowDown" ||
                          event.key === "ArrowRight"
                            ? 1
                            : -1) +
                          INDUSTRIES.length) %
                        INDUSTRIES.length;
                      setIndustryIndex(next);
                      document.getElementById(`industry-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {item.name}
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>
            <div
              className="e-industry-panel"
              id="industry-panel"
              role="tabpanel"
              aria-labelledby={`industry-tab-${industryIndex}`}
              tabIndex={0}
            >
              <div className="e-industry-image">
                <Image
                  key={industry.slug}
                  src={`/images/${industryPhotos[industry.slug] || "sol_smartcity"}.jpg`}
                  alt={industry.name + " infrastructure"}
                  fill
                  sizes="(max-width: 767px) 100vw, 65vw"
                  className="object-cover"
                />
                <span>{industry.name}</span>
              </div>
              <div className="e-industry-text">
                <p>{industry.overview}</p>
                <SiteLink
                  page="industry-detail"
                  detail={industry.slug}
                  className="e-text-link"
                >
                  Explore this industry
                  <ArrowUpRight size={18} />
                </SiteLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="e-section e-method-section">
        <div className="e-container">
          <Reveal className="e-section-top">
            <span className="e-eyebrow">
              <i>05</i>Our way of working
            </span>
            <span className="e-side-note">
              An outcome at the beginning.
              <br />
              An outcome at the end.
            </span>
          </Reveal>
          <Reveal className="e-heading-row">
            <h2>
              From ambition
              <br />
              <span className="e-muted-title">to operation.</span>
            </h2>
            <p>
              Technology without an outcome is inventory.
              <br />
              Our eight-step method keeps the business goal in view.
            </p>
          </Reveal>
          <div className="e-method-grid">
            <div
              className="e-method-tabs"
              role="tablist"
              aria-label="Eight-step delivery methodology"
            >
              {ARCHITECTURE_STEPS.map((item, i) => (
                <button
                  key={item.num}
                  role="tab"
                  aria-selected={method === i}
                  aria-controls="method-panel"
                  id={`method-tab-${i}`}
                  tabIndex={method === i ? 0 : -1}
                  onClick={() => setMethod(i)}
                  onKeyDown={(event) => {
                    if (
                      [
                        "ArrowRight",
                        "ArrowLeft",
                        "ArrowDown",
                        "ArrowUp",
                      ].includes(event.key)
                    ) {
                      event.preventDefault();
                      const next =
                        (i +
                          (event.key === "ArrowRight" ||
                          event.key === "ArrowDown"
                            ? 1
                            : -1) +
                          8) %
                        8;
                      setMethod(next);
                      document.getElementById(`method-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <span>{item.num}</span>
                  {item.title}
                  <ArrowRight size={17} />
                </button>
              ))}
            </div>
            <div
              className="e-method-panel"
              id="method-panel"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`method-tab-${method}`}
            >
              <span className="e-method-large" aria-hidden="true">
                {step.num}
              </span>
              <div>
                <span className="e-eyebrow">{step.subtitle}</span>
                <h3>{step.title}.</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          </div>
          <div className="e-principles">
            {ARCH_PRINCIPLES.map((item) => (
              <div key={item.title}>
                <span>+</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="e-section e-procurement">
        <div className="e-container">
          <Reveal className="e-section-top">
            <span className="e-eyebrow">
              <i>06</i>Enterprise-ready procurement
            </span>
            <SiteLink page="services" className="e-text-link">
              How we deliver
              <ArrowUpRight size={18} />
            </SiteLink>
          </Reveal>
          <div className="e-procurement-grid">
            <Reveal>
              <h2>
                More value.
                <br />
                <span className="e-muted-title">Less friction.</span>
              </h2>
              <p className="e-body-copy">
                Architecture, technology supply, integration and operations
                under one accountable contract. A clearer path from your
                procurement requirement to a working solution.
              </p>
              <div className="e-procurement-stat">
                <strong>
                  135<span>%</span>
                </strong>
                <p>
                  B-BBEE procurement recognition.
                  <br />
                  Level 1. 100% Black-owned.
                </p>
              </div>
              <SiteLink page="contact" className="e-button">
                Discuss your procurement needs
                <ArrowUpRight size={18} />
              </SiteLink>
            </Reveal>
            <div className="e-procurement-list">
              {PROCUREMENT_LINES.map((item) => (
                <details key={item.num}>
                  <summary>
                    <span>{item.num}</span>
                    {item.title}
                    <Plus size={19} />
                  </summary>
                  <p>{item.desc}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="e-section e-insights">
        <div className="e-container">
          <Reveal className="e-section-top">
            <span className="e-eyebrow">
              <i>07</i>Perspective with purpose
            </span>
            <span className="e-side-note">
              Ideas shaping the next infrastructure chapter
            </span>
          </Reveal>
          <div className="e-insight-grid">
            {THOUGHT_LEADERSHIP.map((item, i) => (
              <Reveal key={item.thesis} delay={i * 0.08}>
                <SiteLink
                  page="solution-detail"
                  detail={
                    ["ai-infrastructure", "security", "managed-services-itsm"][
                      i
                    ]
                  }
                  className="e-insight-card"
                >
                  <span className="e-eyebrow">KABO perspective / 0{i + 1}</span>
                  <h3>{item.thesis}</h3>
                  <p>{item.desc}</p>
                  <span className="e-text-link">
                    Explore the thinking
                    <ArrowUpRight size={18} />
                  </span>
                </SiteLink>
              </Reveal>
            ))}
          </div>
          <div className="e-resources">
            <div className="e-resources-heading">
              <h3>
                Details for your
                <br />
                next decision.
              </h3>
              <p>
                Request technical resources for your procurement or architecture
                discussion. Availability and the appropriate material are
                confirmed with your enquiry.
              </p>
            </div>
            <div className="e-resource-list">
              {[
                {
                  type: "White paper",
                  title: "Africa-Grade Infrastructure",
                  description:
                    "Power instability, connectivity variance and sovereign data residency across all nine provinces.",
                },
                {
                  type: "Reference architecture",
                  title: "AI Infrastructure Reference Architecture",
                  description:
                    "NVIDIA HGX H100/H200, InfiniBand 400G fabrics, Pure Storage FlashBlade tiers and MLOps pipelines.",
                },
                {
                  type: "Capability statement",
                  title: "Procurement-Ready Capability Statement",
                  description:
                    "Company credentials, B-BBEE recognition, strategic alliances, solution domains and nationwide delivery.",
                },
              ].map((resource) => (
                <SiteLink
                  page="contact"
                  key={resource.title}
                  aria-label={`Request ${resource.title}`}
                >
                  <span>{resource.type}</span>
                  <div>
                    <h4>{resource.title}</h4>
                    <p>{resource.description}</p>
                  </div>
                  <ArrowUpRight size={20} />
                </SiteLink>
              ))}
            </div>
          </div>
          <div className="e-opportunity-row">
            <SiteLink page="partners">
              <span>Technology partnerships</span>
              <h3>
                Global expertise.
                <br />
                Shared ambition.
              </h3>
              <ArrowUpRight />
            </SiteLink>
            <SiteLink page="investors">
              <span>Investor relations</span>
              <h3>
                A stronger future.
                <br />
                Built together.
              </h3>
              <ArrowUpRight />
            </SiteLink>
          </div>
        </div>
      </section>
    </div>
  );
}
