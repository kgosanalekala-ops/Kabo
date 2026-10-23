"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Download, Pause, Play } from "lucide-react";
import { usePage } from "@/components/kabo/page-context";
import { DOMAINS, ECOSYSTEMS, FLOW } from "./vision-data";
import CinematicScene from "./cinematic-scene";

const STORIES = [
  { category: "INTELLIGENT COMPUTE", title: ["The hardware", "behind every", "bold ambition."], description: "Enterprise servers, storage and AI-ready infrastructure. The right foundation for your workloads, your people and what comes next.", label: "COMPUTE / DATA / POSSIBILITY", link: "ai-infrastructure" },
  { category: "CONNECTED CAMPUS", title: ["Connection is", "the beginning", "of possibility."], description: "From the first access point to the campus backbone. Wireless, switching and secure connectivity, considered as one complete environment.", label: "PEOPLE / PLACES / NETWORKS", link: "campus-network" },
  { category: "ELECTRONIC SECURITY", title: ["Every space", "deserves a", "clearer view."], description: "IP surveillance, recording and access technology. An informed approach to protecting the spaces, assets and people that matter.", label: "VISIBILITY / CONTROL / CONFIDENCE", link: "surveillance" },
];

export default function CinematicLanding() {
  const { navigate } = usePage();
  const reduced = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const story = STORIES[slide];

  useEffect(() => {
    if (paused || focused || reduced) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      clearInterval(timer);
      if (!document.hidden) timer = setInterval(() => setSlide(value => (value + 1) % STORIES.length), 11000);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", sync); };
  }, [paused, focused, reduced]);

  return <div className="kc-site">
    <section className="kc-hero" aria-label="KABO technology stories" onTouchStart={event => {
      if (event.touches.length !== 1 || (event.target as Element).closest("button,a,input")) { touch.current = null; return; }
      touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }} onTouchCancel={() => { touch.current = null; }} onTouchEnd={event => {
      const start = touch.current; touch.current = null;
      if (!start || event.changedTouches.length !== 1) return;
      const dx = event.changedTouches[0].clientX - start.x, dy = event.changedTouches[0].clientY - start.y;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.35) setSlide(value => (value + (dx < 0 ? 1 : 2)) % 3);
    }}>
      <div className="kc-hero-atmosphere" aria-hidden="true" />
      <div className="kc-hero-inner">
        <div className="kc-hero-art" aria-label="Original dimensional technology concept: a laptop on an illuminated glass infrastructure platform">
          <CinematicScene slide={slide} />
          <span className="kc-scene-caption">KABO / A CONNECTED PERSPECTIVE</span>
        </div>
        <div className="kc-hero-copy">
          <div className="kc-eyebrow"><span className="kc-live-dot" /> SOUTH AFRICA. CONNECTED TO WHAT’S NEXT.</div>
          <div className="kc-story-content" aria-live={paused || reduced ? "polite" : "off"}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={slide} initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: reduced ? 0 : -12 }} transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}>
                <p className="kc-chapter-label">0{slide + 1} <span>/</span> {story.category}</p>
                <h1>{story.title.map((line, index) => <span key={line} style={{ display: "block" }}>{index === story.title.length - 1 ? <em>{line}</em> : line}</span>)}</h1>
                <p className="kc-hero-description">{story.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="kc-hero-actions"><button className="kc-button kc-button-light" onClick={() => navigate("solution-detail", story.link)}>Explore the possibilities <ArrowUpRight size={18} /></button><Link className="kc-link" href="/studio/campus">Enter the Studio <ArrowRight size={17} /></Link></div>
          <div className="kc-story-controls" onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}>
            <div className="kc-story-selectors" role="group" aria-label="Choose homepage story">{STORIES.map((item, index) => <button key={item.category} onClick={() => setSlide(index)} aria-label={`Show story ${index + 1}`} aria-pressed={slide === index} className={slide === index ? "is-active" : ""}><span>0{index + 1}</span><i key={`${slide}-${paused}`} className={paused || reduced ? "is-paused" : ""} /></button>)}</div>
            <button className="kc-play-control" aria-label={paused ? "Play homepage stories" : "Pause homepage stories"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>
          </div>
        </div>
      </div>
      <div className="kc-hero-baseline"><span>{story.label}</span><a href="#connected-thinking">SCROLL TO EXPLORE <ArrowDown size={14} /></a></div>
    </section>

    <section className="kc-platforms" aria-label="Technology portfolios"><div className="kc-wrap"><span className="kc-micro">BUILT AROUND THE RIGHT TECHNOLOGY</span><div className="kc-platform-names">{ECOSYSTEMS.slice(0, 6).map(item => <button key={item.name} onClick={() => navigate("partners")}>{item.name}</button>)}</div><p>Technology references describe relevant portfolios. Channel access, specifications and availability are confirmed per enquiry.</p></div></section>

    <section className="kc-thinking" id="connected-thinking"><div className="kc-wrap">
      <div className="kc-section-index"><span>01 / CONNECTED THINKING</span><span>THE IDEA. THE SYSTEM. THE IMPACT.</span></div>
      <div className="kc-thinking-grid"><h2>Technology is powerful.<br /><em>Connection is everything.</em></h2><div className="kc-editorial-copy"><p>KABO IT Group brings ICT equipment supply and integrated systems thinking together. We look at how compute, networks, security, people and place connect—because a collection of products is only the beginning.</p><p>From a single business laptop to the infrastructure behind a connected campus, we work from your requirements, constraints and operating environment.</p><button className="kc-link" onClick={() => navigate("company")}>Meet KABO <ArrowUpRight size={17} /></button></div></div>
      <div className="kc-principles">{[
        ["01", "The right foundation.", "Compute, storage and data platforms shaped around the workload—not the other way around."],
        ["02", "Every layer connected.", "Campus, branch and workplace technology considered as parts of one operating environment."],
        ["03", "Confidence built in.", "Visibility, protection and recoverability considered from the first conversation."],
      ].map(([number, title, description]) => <div key={number}><span className="kc-principle-number">{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
    </div></section>

    <section className="kc-systems"><div className="kc-wrap">
      <div className="kc-section-index"><span>02 / THE SYSTEMS BEHIND EVERYTHING</span><span>08 CONNECTED DOMAINS</span></div>
      <div className="kc-section-heading"><h2>Different disciplines.<br /><em>One connected view.</em></h2><p>Explore the technologies, equipment and practical considerations behind each part of your environment.</p></div>
      <div className="kc-domain-list">{DOMAINS.map(domain => <button key={domain.slug} className="kc-domain" onClick={() => navigate("solution-detail", domain.slug)}><span className="kc-domain-index">{domain.index}</span><span className="kc-domain-icon"><domain.icon size={27} strokeWidth={1.2} /></span><span className="kc-domain-text"><strong>{domain.title}</strong><small>{domain.summary}</small></span><ArrowUpRight size={21} /></button>)}</div>
      <div className="kc-supply-note"><span>EQUIPMENT, SUPPLIES & SERVICES</span><p>Servers and storage. Switching and wireless. Security and print. Business laptops, software, peripherals, stationery and A4 paper.</p><button className="kc-link" onClick={() => navigate("procurement")}>Explore procurement <ArrowRight size={17} /></button></div>
    </div></section>

    <section className="kc-studio-feature"><div className="kc-wrap"><div className="kc-section-index"><span>03 / ARCHITECTURE STUDIO</span><span>SEE HOW IT ALL CONNECTS</span></div><div className="kc-section-heading"><h2>Beyond the diagram.<br /><em>Inside the environment.</em></h2><p>Explore eight illustrative infrastructure environments. Select the equipment and discover what each layer does, how it connects and why it matters.</p></div><Link className="kc-studio-window" href="/studio/campus"><img src="/images/studio/campus.webp" alt="Conceptual connected campus with buildings, campus networks and infrastructure" width={1672} height={941} loading="lazy" /><div className="kc-studio-window-caption"><div><span>CONNECTED CAMPUS / INTERACTIVE EXPLORER</span><h3>Step into the system.</h3></div><span className="kc-circle-arrow"><ArrowUpRight size={28} /></span></div></Link><div className="kc-studio-bottom"><span>ILLUSTRATIVE ENVIRONMENTS · TECHNOLOGY EXPLAINED</span><Link className="kc-link" href="/studio/campus">Open Architecture Studio <ArrowUpRight size={17} /></Link></div></div></section>

    <section className="kc-approach"><div className="kc-wrap"><div className="kc-section-index"><span>FROM COMPLEXITY TO CLARITY</span><span>THE KABO APPROACH</span></div><div className="kc-section-heading"><h2>A better system starts<br />with a <em>better question.</em></h2><p>What needs to work? For whom, where and under which constraints? Clear answers lead to more useful technology decisions.</p></div><div className="kc-process">{FLOW.map(step => <div key={step.no}><span>{step.no}</span><h3>{step.title}</h3><p>{step.description}</p></div>)}</div><button className="kc-link" onClick={() => navigate("about")}>Explore our approach <ArrowUpRight size={17} /></button></div></section>

    <section className="kc-resources"><div className="kc-wrap"><div className="kc-section-index"><span>A CLOSER LOOK AT KABO</span><span>TAKE THE THINKING WITH YOU</span></div><div className="kc-resource-grid"><a href="/api/downloads/company-profile" download><div><span>01 / COMPANY PROFILE</span><h3>The company.<br />The capabilities.</h3><p>Our equipment, products, workplace supplies and professional services in one detailed publication.</p></div><Download size={22} /></a><a href="/api/downloads/solutions-overview" download><div><span>02 / SOLUTIONS OVERVIEW</span><h3>The possibilities.<br />The approach.</h3><p>A practical introduction to our connected solution domains and the way we think about systems.</p></div><Download size={22} /></a></div></div></section>

    <section className="kc-invitation"><div className="kc-wrap"><div className="kc-eyebrow"><span className="kc-live-dot" /> EVERY SYSTEM STARTS SOMEWHERE</div><h2>What comes next<br />starts <em>with you.</em></h2><p>Bring the challenge. Let’s find the connections.</p><button className="kc-button kc-button-light" onClick={() => navigate("rfq")}>Start a project <ArrowUpRight size={18} /></button><button className="kc-invitation-contact kc-link" onClick={() => navigate("contact")}>Talk to KABO <ArrowRight size={17} /></button><span className="kc-final-location">SOUTH AFRICA / FORWARD, TOGETHER.</span></div></section>
  </div>;
}
