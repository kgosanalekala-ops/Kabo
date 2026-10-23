"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, ClipboardList } from "lucide-react";
import { DOMAINS } from "@/components/flagship/vision-data";
import { usePage } from "../page-context";

const priorities = ["High availability", "Cybersecurity", "Scalability", "Cost efficiency", "Integration", "Remote management"];

/** A discovery brief, not an automated quotation or approved engineering design. */
export function ConfiguratorPage() {
  const { navigate } = usePage();
  const router = useRouter();
  const [solution, setSolution] = useState(DOMAINS[0].slug);
  const [sites, setSites] = useState("2-10");
  const [priority, setPriority] = useState(priorities[0]);
  const [deployment, setDeployment] = useState("New deployment");
  const selected = useMemo(() => DOMAINS.find(domain => domain.slug === solution) || DOMAINS[0], [solution]);

  const continueToRFQ = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams({ sites, priority, deployment });
    router.push(`/rfq/${encodeURIComponent(solution)}?${params.toString()}`);
  };

  return <>
    <section className="vf-interior-hero">
      <div className="vf-interior-image" style={{backgroundImage:"linear-gradient(110deg,#061322,rgba(4,29,51,.85)),url('/images/sol_noc.jpg')"}} />
      <div className="vf-interior-pattern" />
      <div className="vf-container vf-interior-content">
        <span className="vf-eyebrow"><span className="vf-eyebrow-line" /> DISCOVERY / BUILD YOUR BRIEF</span>
        <h1>A clearer brief.<br/><em>A better beginning.</em></h1>
        <p>Choose your infrastructure focus and project priorities. Carry an editable summary into your enquiry, ready for a practical conversation with KABO.</p>
      </div>
    </section>
    <section className="vf-section vf-section--light vf-discovery"><div className="vf-container">
      <div className="vf-form-grid">
        <form className="vf-form" onSubmit={continueToRFQ}>
          <div className="vf-form-top">01 / CHOOSE AN ENVIRONMENT <span>8 SOLUTION DOMAINS</span></div>
          <div className="vf-procurement-grid" role="group" aria-label="Solution domains">
            {DOMAINS.map(domain => <button key={domain.slug} type="button" aria-pressed={solution === domain.slug} onClick={() => setSolution(domain.slug)} className="vf-discovery-choice">
              <div><domain.icon size={22} />{solution === domain.slug ? <Check size={20} /> : <ArrowUpRight size={20} />}</div>
              <h3>{domain.title}</h3><p>{domain.summary}</p>
            </button>)}
          </div>
          <div className="vf-form-top">02 / DEFINE YOUR PRIORITIES <span>EDITABLE DISCOVERY</span></div>
          <div className="vf-form-row">
            <label>Sites / facilities<select value={sites} onChange={event => setSites(event.target.value)}>{["1", "2-10", "11-50", "51+", "To be determined"].map(value => <option key={value}>{value}</option>)}</select></label>
            <label>Deployment approach<select value={deployment} onChange={event => setDeployment(event.target.value)}>{["New deployment", "Upgrade / modernisation", "Expansion", "Assessment / design"].map(value => <option key={value}>{value}</option>)}</select></label>
          </div>
          <label>Primary objective<select value={priority} onChange={event => setPriority(event.target.value)}>{priorities.map(value => <option key={value}>{value}</option>)}</select></label>
          <button type="submit" className="vf-action vf-action--dark"><ClipboardList size={18} /> Continue to quotation <ArrowRight size={18}/></button>
        </form>
        <aside className="vf-business-body" aria-live="polite">
          <span className="vf-eyebrow"><span className="vf-eyebrow-line"/> YOUR DISCOVERY BRIEF</span>
          <h2 className="vf-display-heading">{selected.title}</h2>
          <p>{selected.description}</p>
          <dl className="vf-business-list">
            <div><dt>Scope</dt><dd>{sites} site(s)</dd></div>
            <div><dt>Approach</dt><dd>{deployment}</dd></div>
            <div><dt>Priority</dt><dd>{priority}</dd></div>
          </dl>
          <h3>What happens next?</h3>
          <p>Your selections will appear in the quotation form. Add your contact details, specifications and project context, then submit the enquiry through the configured channel.</p>
          <p>This brief does not determine product suitability, availability, price, a final design or an implementation commitment. KABO confirms those requirements privately for each opportunity.</p>
          <button type="button" className="vf-text-link" onClick={() => navigate("solutions")}>Explore the solution domains <ArrowUpRight size={16}/></button>
        </aside>
      </div>
    </div></section>
  </>;
}
