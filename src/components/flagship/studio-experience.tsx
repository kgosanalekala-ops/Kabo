"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Cpu, FileStack, Layers3, Maximize2, Menu, Monitor, Network, Server, Shield, ShieldCheck, Waypoints, X } from "lucide-react";
import { findStudioScene, STUDIO_SCENES, type StudioSlug } from "./studio-data";
import { StudioPanorama } from "./studio-panorama";

const ICONS = { campus: Network, compute: Cpu, datacentre: Server, security: Shield, widearea: Waypoints, document: FileStack, resilience: ShieldCheck, workplace: Monitor } as const;

function SceneArtwork({ source, fallback, description, priority = false }: { source: string; fallback: string; description: string; priority?: boolean }) {
  const [current, setCurrent] = useState(source);
  useEffect(() => setCurrent(source), [source]);
  return <img className="ks-scene-image" src={current} alt={description} fetchPriority={priority ? "high" : "auto"} draggable={false} onError={() => { if (current !== fallback) setCurrent(fallback); }} />;
}

export function StudioExperience({ slug }: { slug: StudioSlug }) {
  const scene = findStudioScene(slug)!;
  const sceneIndex = STUDIO_SCENES.findIndex((item) => item.slug === slug);
  const [active, setActive] = useState(0);
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [mobileRailOpen, setMobileRailOpen] = useState(false);
  const [sceneHint, setSceneHint] = useState(true);
  const panoramaScroll = useRef<HTMLDivElement>(null);
  const activePin = useRef<HTMLButtonElement>(null);
  const tourClose = useRef<HTMLButtonElement>(null);
  const tourDialog = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const item = scene.hotspots[active];

  useEffect(() => { setActive(0); setEquipmentOpen(false); setMobileRailOpen(false); }, [slug]);
  useEffect(() => {
    if (!tourOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    tourClose.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); setTourOpen(false); }
      else if (event.key === "ArrowRight") { event.preventDefault(); setActive((index) => (index + 1) % scene.hotspots.length); }
      else if (event.key === "ArrowLeft") { event.preventDefault(); setActive((index) => (index - 1 + scene.hotspots.length) % scene.hotspots.length); }
      else if (event.key === "Tab") {
        const focusable = [...(tourDialog.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])') ?? [])];
        if (!focusable.length) return;
        if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable[focusable.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) { event.preventDefault(); focusable[0].focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); previousFocus?.focus(); };
  }, [tourOpen, scene.hotspots.length]);

  function selectHotspot(index: number) {
    setActive(index);
    setEquipmentOpen(false);
  }
  function revealHotspot(index: number) {
    selectHotspot(index);
    const surface = panoramaScroll.current;
    const pin = surface?.querySelector<HTMLButtonElement>(`[data-hotspot="${index}"]`);
    if (pin && surface) {
      const center = pin.offsetLeft + pin.offsetWidth / 2;
      surface.scrollTo({ left: center - surface.clientWidth / 2, behavior: reducedMotion ? "instant" : "smooth" });
      pin.focus({ preventScroll: true });
    }
  }
  function navigateHotspot(direction: number) { revealHotspot((active + direction + scene.hotspots.length) % scene.hotspots.length); }
  const iconCount = STUDIO_SCENES.length;

  return <main className="ks-studio" aria-label={`${scene.title} interactive architecture experience`}>
    <div className="ks-ambient" aria-hidden="true" />
    <header className="ks-header">
      <Link href="/" aria-label="KABO IT Group homepage" className="ks-brand"><img src="/logos/kabo-logo-white.png" alt="KABO" /></Link>
      <span className="ks-header-separator" aria-hidden="true" />
      <span className="ks-section-name">ARCHITECTURE <strong>STUDIO</strong></span>
      <span className="ks-header-center">EXPLORING INTELLIGENT INFRASTRUCTURE <span className="ks-header-orb" /></span>
      <span className="ks-header-count">{String(sceneIndex + 1).padStart(2, "0")} <small>/ {String(iconCount).padStart(2, "0")}</small></span>
      <Link href="/" className="ks-exit"><ArrowLeft size={16} strokeWidth={1.5} /><span>Back to KABO</span></Link>
    </header>

    <nav className={`ks-rail ${mobileRailOpen ? "ks-rail-open" : ""}`} aria-label="Architecture environments">
      <span className="ks-rail-label">EXPLORE <span>01 — 08</span></span>
      <div className="ks-rail-links">
        {STUDIO_SCENES.map((link, index) => {
          const Icon = ICONS[link.slug];
          return <Link key={link.slug} href={`/studio/${link.slug}`} title={link.title} className={`ks-rail-link ${link.slug === slug ? "is-selected" : ""}`} aria-label={`Explore ${link.title}`} aria-current={link.slug === slug ? "page" : undefined} onClick={() => setMobileRailOpen(false)}><Icon aria-hidden="true" size={20} strokeWidth={1.65} /><span className="ks-rail-tooltip">{String(index + 1).padStart(2, "0")} / {link.title}</span></Link>;
        })}
      </div>
      <span className="ks-rail-bottom">K<span aria-hidden="true">·</span>26</span>
    </nav>

    <div className="ks-mobile-environment"><button onClick={() => setMobileRailOpen(!mobileRailOpen)} aria-label="Choose an environment" aria-expanded={mobileRailOpen}><Menu size={16} /> {scene.title}<ChevronDown size={16} className={mobileRailOpen ? "is-open" : ""} /></button></div>
    {mobileRailOpen && <button className="ks-rail-dismiss" aria-label="Close environment selection" onClick={() => setMobileRailOpen(false)} />}

    <div className="ks-scene-scroller" ref={panoramaScroll} aria-label="Swipe horizontally to inspect the infrastructure panorama" onScroll={() => setSceneHint(false)}>
      <section className="ks-scene-stage" aria-label={`${scene.title} illustration with ${scene.hotspots.length} interactive hotspots`}>
        <SceneArtwork key={scene.slug} source={scene.image} fallback={scene.fallback} description={`Visualisation of ${scene.title.toLowerCase()} infrastructure and its built environment`} priority />
        <div className="ks-scene-tint" aria-hidden="true" />
        <div className="ks-topological-lines" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points={scene.hotspots.map(h => `${h.x},${h.y}`).join(" ")} fill="none" stroke="#59c3f6" strokeWidth=".18" vectorEffect="non-scaling-stroke" strokeDasharray="3 5" /><polyline points={scene.hotspots.map(h => `${h.x},${h.y}`).join(" ")} fill="none" stroke="#99deff" strokeWidth=".06" vectorEffect="non-scaling-stroke" /></svg></div>
        <div className="ks-scene-copy"><p className="ks-scene-eyebrow"><span className="ks-live-dot" /> KABO / INTERACTIVE ARCHITECTURES</p><h1>{scene.editorial.split("\n").map((line, index) => <span key={index}>{line}</span>)}</h1><p className="ks-scene-subtitle">{scene.subtitle}</p></div>
        {scene.hotspots.map((hotspot, index) => <button ref={index === active ? activePin : undefined} key={hotspot.number} className={`ks-hotspot ${active === index ? "is-active" : ""}`} style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }} data-hotspot={index} onClick={() => selectHotspot(index)} aria-label={`${hotspot.number}: ${hotspot.name}. ${hotspot.kicker}`} aria-pressed={active === index}><span className="ks-hotspot-halo"/><span className="ks-hotspot-number">{hotspot.number}</span><span className="ks-hotspot-caption">{hotspot.name}</span></button>)}
        <div className="ks-scene-footnote">CONCEPT VISUALISATION <span aria-hidden="true">/</span> ILLUSTRATIVE ARCHITECTURE — NOT A COMPLETED CUSTOMER INSTALLATION</div>
      </section>
    </div>

    <aside className="ks-inspector" aria-label="Selected infrastructure details">
      <div className="ks-inspector-upper"><span className="ks-inspector-status"><span className="ks-live-dot" /> SYSTEM LAYER / {item.number}</span><span className="ks-inspector-fraction">{String(active + 1).padStart(2, "0")} <span>/ {String(scene.hotspots.length).padStart(2, "0")}</span></span></div>
      <AnimatePresence mode="wait" initial={false}><motion.div key={`${slug}-${active}`} className="ks-inspector-body" initial={reducedMotion ? false : {opacity:0, y:14}} animate={{opacity:1,y:0}} exit={reducedMotion ? {opacity:0} : {opacity:0,y:-10}} transition={{duration:.25}}>
        <div className="ks-inspector-topline"><span className="ks-layer-index">{item.number}</span><span className="ks-layer-divider"/><span className="ks-layer-name">{item.kicker}</span></div>
        <h2>{item.name}</h2><p className="ks-layer-description">{item.description}</p>
        <div className="ks-architect-note"><span className="ks-note-label"><Layers3 size={14}/> DESIGN CONSIDERATION</span><p>{item.principle}</p></div>
      </motion.div></AnimatePresence>
      <div className="ks-inspector-bottom"><div className="ks-system-nav"><button onClick={() => navigateHotspot(-1)} aria-label="Previous hotspot"><ChevronLeft size={19}/></button><div className="ks-dots" aria-label="Hotspot position">{scene.hotspots.map((_, index) => <button key={index} onClick={() => revealHotspot(index)} aria-label={`View hotspot ${index + 1}`} aria-current={index === active ? "step" : undefined} className={index === active ? "is-active" : ""} />)}</div><button onClick={() => navigateHotspot(1)} aria-label="Next hotspot"><ChevronRight size={19}/></button></div>
        <div className="ks-inspector-actions"><button className="ks-equipment-cta" onClick={() => setEquipmentOpen(!equipmentOpen)} aria-expanded={equipmentOpen}><span>{equipmentOpen ? "Hide equipment" : "View equipment"}</span><ArrowUpRight size={17}/></button><button className="ks-tour-cta" onClick={() => setTourOpen(true)}><Maximize2 size={15} /><span>Explore walkthrough</span></button></div>
        {equipmentOpen && <div className="ks-equipment-list" aria-label={`Representative equipment for ${item.name}`}><p>RECOMMENDED EQUIPMENT CATEGORIES</p>{item.equipment.map((equipment, index) => <div key={equipment}><span>{String(index + 1).padStart(2, "0")}</span><span>{equipment}</span><Check size={14}/></div>)}<small>Final makes, models and quantities follow an approved project specification.</small></div>}
      </div>
    </aside>

    <div className="ks-corner-caption"><span className="ks-caption-bar"/> {scene.title.toUpperCase()} <span className="ks-caption-delimiter">/</span> {String(active + 1).padStart(2, "0")}</div>
    {sceneHint && <div className="ks-pan-hint" aria-hidden="true"><ArrowLeft size={14}/> SWIPE TO EXPLORE <ArrowRight size={14}/></div>}

    {tourOpen && <div className="ks-tour-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) setTourOpen(false); }}>
      <div className="ks-tour" ref={tourDialog} role="dialog" aria-modal="true" aria-labelledby="ks-tour-title">
        <div className="ks-tour-art">
          {scene.slug === "campus"
            ? <StudioPanorama source="/images/studio/campus-360.webp" />
            : <><SceneArtwork source={scene.image} fallback={scene.fallback} description={`Concept visualisation of ${scene.title}`} /><div className="ks-tour-hotspot" style={{left:`${item.x}%`,top:`${item.y}%`}}><span>{item.number}</span></div></>}
          <div className="ks-tour-art-overlay"/>
          <div className="ks-tour-title-block"><p>ARCHITECTURE STUDIO / {scene.slug === "campus" ? "CONCEPT CAMPUS 360° VIEW" : "GUIDED INSPECTION"}</p><h2 id="ks-tour-title">{scene.title}</h2></div>
        </div>
        <div className="ks-tour-info">
          <div className="ks-tour-top"><span>{scene.slug === "campus" ? "360° VIEW + LAYER GUIDE" : "GUIDED WALKTHROUGH"} <span className="ks-tour-index">{item.number} / {String(scene.hotspots.length).padStart(2,"0")}</span></span><button ref={tourClose} aria-label="Close walkthrough" onClick={() => setTourOpen(false)}><X size={21}/></button></div>
          <div><span className="ks-tour-kicker">{item.kicker}</span><h3>{item.name}</h3><p>{item.description}</p><h4>REPRESENTATIVE EQUIPMENT</h4><ul>{item.equipment.map(equipment => <li key={equipment}>{equipment}</li>)}</ul></div>
          <div className="ks-tour-controls"><button onClick={() => setActive((index) => (index - 1 + scene.hotspots.length) % scene.hotspots.length)}><ChevronLeft size={18}/> Previous</button><button onClick={() => setActive((index) => (index + 1) % scene.hotspots.length)}>Next layer <ChevronRight size={18}/></button></div>
          <small>{scene.slug === "campus" ? "Concept visualisation, not a real location or installed site. Drag/swipe the view and use the arrow buttons to inspect solution layers." : "This is a guided visual inspection, not a 360° camera scan. Use Previous/Next or the keyboard arrow keys."}</small>
        </div>
      </div>
    </div>}
  </main>;
}
