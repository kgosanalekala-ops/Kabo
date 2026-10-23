"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SOLUTIONS } from "@/components/kabo/data";
import { usePage } from "@/components/kabo/page-context";
import { BusinessFrame, publicText } from "./business-pages";

const STUDIOS: Record<string, string> = { compute: "compute", data: "datacentre", networking: "campus", security: "resilience", "ai-infrastructure": "compute", cloud: "widearea", "physical-security": "security", "analytics-bi": "compute", continuity: "resilience", "digital-workplace": "workplace", "iot-edge": "campus" };

export function DetailedTechnologyLinks() {
  const { navigate } = usePage();
  return <section className="vf-section vf-section--cream"><div className="vf-container"><div className="vf-section-lead"><span className="vf-eyebrow">LOOK CLOSER / TECHNOLOGY SCOPE</span><div className="vf-section-lead-grid"><h2>Explore the <em>technical detail.</em></h2><p>Read the capabilities, representative platforms and planning considerations behind each technology area.</p></div></div><div className="kc-technology-links">{SOLUTIONS.map(solution => <button key={solution.slug} onClick={() => navigate("solution-detail", solution.slug)}><span>{publicText(solution.shortTitle)}</span><ArrowUpRight size={18} /></button>)}</div></div></section>;
}

export function DetailedTechnologyPage({ slug }: { slug: string }) {
  const { navigate } = usePage();
  const solution = SOLUTIONS.find(item => item.slug === slug);
  if (!solution) return null;
  return <BusinessFrame eyebrow="SOLUTIONS / TECHNOLOGY IN DETAIL" title={<>{publicText(solution.title)}</>} description={publicText(solution.description)} action={<button className="vf-action vf-action--light" onClick={() => navigate("rfq", solution.slug)}>Discuss this solution <ArrowUpRight size={18} /></button>}>
    <section className="vf-section vf-section--light"><div className="vf-container"><div className="vf-detail-overview"><div><span className="vf-eyebrow">THE WORKLOAD / THE ENVIRONMENT</span><h2>{publicText(solution.shortTitle)}.<br /><em>In context.</em></h2></div><div><p>{publicText(solution.tagline)}</p><p className="vf-public-note">Platform examples explain the technology scope. Specifications, performance, licences, compatibility, OEM authorisation and availability require project-specific validation.</p></div></div><div className="vf-business-list">{solution.capabilities.map((capability, index) => <article key={capability.title}><span className="vf-eyebrow">0{index + 1} / CAPABILITY</span><h3>{publicText(capability.title)}</h3><p>{publicText(capability.spec)}</p></article>)}</div></div></section>
    <section className="vf-section vf-section--cream"><div className="vf-container"><div className="vf-section-lead"><span className="vf-eyebrow">PLATFORMS / INTEROPERABILITY</span><div className="vf-section-lead-grid"><h2>Technology selected<br /><em>for its role.</em></h2><p>These references describe relevant technology portfolios. They do not establish stock, a partnership tier or a committed design.</p></div></div><div className="kc-technical-tags">{solution.stack.map(platform => <span key={platform}>{platform}</span>)}</div><div className="vf-business-list"><article><span className="vf-eyebrow">PLANNING OBJECTIVES</span><h3>What to consider.</h3><ul>{solution.outcomes.map(outcome => <li key={outcome}>{publicText(outcome)}</li>)}</ul></article><article><span className="vf-eyebrow">THE CONNECTED VIEW</span><h3>See the environment.</h3><p>Explore an illustrative architecture and select its equipment layers to understand the connections, devices and planning decisions involved.</p><Link className="vf-text-link" href={`/studio/${STUDIOS[slug] || "campus"}`}>Enter Architecture Studio <ArrowUpRight size={17} /></Link><p className="vf-public-note">Illustrative environment, not a KABO customer installation or certified project design.</p></article></div><button className="vf-action vf-action--dark" onClick={() => navigate("rfq", solution.slug)}>Bring us your requirements <ArrowUpRight size={18} /></button></div></section>
  </BusinessFrame>;
}
