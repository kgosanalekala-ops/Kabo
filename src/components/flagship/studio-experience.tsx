"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Compass, Cpu, FileStack, Layers3, Monitor, Network, RotateCcw, Server, Shield, ShieldCheck, Waypoints, X, ZoomIn, ZoomOut } from "lucide-react";
import { findStudioScene, STUDIO_SCENES, type StudioSlug } from "./studio-data";
import { StudioPanorama } from "./studio-panorama";

const ICONS = { campus: Network, compute: Cpu, datacentre: Server, security: Shield, widearea: Waypoints, document: FileStack, resilience: ShieldCheck, workplace: Monitor } as const;

function SceneArtwork({ source, fallback, description }: { source: string; fallback: string; description: string }) {
  const [current, setCurrent] = useState(source);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setCurrent(source); setFailed(false); }, [source]);
  return <>
    <img className="ks-scene-image" src={current} width={1672} height={941} alt={description} fetchPriority="high" decoding="async" draggable={false} onError={() => { if (current !== fallback) setCurrent(fallback); else setFailed(true); }} />
    {failed && <div className="ks-scene-error"><Layers3 size={32}/><p>The scene image could not load.</p><span>You can still explore every system using the equipment list below.</span></div>}
  </>;
}

export function StudioExperience({ slug }: { slug: StudioSlug }) {
  const scene = findStudioScene(slug)!;
  const sceneIndex = STUDIO_SCENES.findIndex((entry) => entry.slug === slug);
  const [active, setActive] = useState(0);
  const [dialog, setDialog] = useState<"layer" | "panorama" | "environments" | null>(null);
  const [zoom, setZoom] = useState(1);
  const modal = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const imageViewport = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const selected = scene.hotspots[Math.min(active, scene.hotspots.length - 1)];
  const previous = STUDIO_SCENES[(sceneIndex - 1 + STUDIO_SCENES.length) % STUDIO_SCENES.length];
  const next = STUDIO_SCENES[(sceneIndex + 1) % STUDIO_SCENES.length];

  useEffect(() => { setActive(0); setDialog(null); setZoom(1); }, [slug]);
  useEffect(() => {
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); setDialog(null); }
      if (dialog === "layer" && (event.key === "ArrowRight" || event.key === "ArrowLeft") && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault();
        const offset = event.key === "ArrowRight" ? 1 : -1;
        setActive((index) => (index + offset + scene.hotspots.length) % scene.hotspots.length);
      }
      if (event.key === "Tab") {
        const elements = [...(modal.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),select,input,[tabindex]:not([tabindex="-1"])') ?? [])].filter((element) => element.getClientRects().length > 0);
        if (!elements.length) return;
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); previousFocus?.focus({ preventScroll: true }); };
  }, [dialog, scene.hotspots.length]);

  function openLayer(index: number) { setActive(index); setDialog("layer"); }
  function moveLayer(direction: number) { setActive((index) => (index + direction + scene.hotspots.length) % scene.hotspots.length); }
  function changeZoom(value: number) {
    const viewport = imageViewport.current;
    const leftRatio = viewport ? (viewport.scrollLeft + viewport.clientWidth / 2) / viewport.scrollWidth : .5;
    const nextZoom = Math.max(1, Math.min(2, value));
    setZoom(nextZoom);
    requestAnimationFrame(() => { if (viewport) viewport.scrollTo({ left: viewport.scrollWidth * leftRatio - viewport.clientWidth / 2, behavior: "instant" }); });
  }

  return <main className="ks-studio" aria-label={`${scene.title} interactive architecture studio`}>
    <a className="ks-skip" href="#ks-scene">Skip to the interactive scene</a>
    <header className="ks-header">
      <Link href="/" className="ks-brand" aria-label="KABO IT Group homepage"><img src="/logos/kabo-logo-white.png" width={122} height={42} alt="KABO IT Group"/></Link>
      <span className="ks-header-rule"/>
      <span className="ks-header-name">ARCHITECTURE <strong>STUDIO</strong></span>
      <Link href="/" className="ks-home"><ArrowLeft size={16}/><span>Back to KABO</span></Link>
    </header>

    <div className="ks-container">
      <div className="ks-environment-bar">
        <button className="ks-change-environment" onClick={() => setDialog("environments")} aria-haspopup="dialog"><span className="ks-live-dot"/><span>{String(sceneIndex + 1).padStart(2, "0")} / 08</span><strong>{scene.title}</strong><ChevronDown size={16}/></button>
        <div className="ks-environment-arrows"><Link href={`/studio/${previous.slug}`} aria-label={`Previous environment: ${previous.title}`}><ChevronLeft size={19}/></Link><Link href={`/studio/${next.slug}`} aria-label={`Next environment: ${next.title}`}><ChevronRight size={19}/></Link></div>
      </div>

      <section className="ks-introduction" aria-labelledby="ks-title">
        <div><p className="ks-eyebrow">THE SYSTEMS BEHIND THE EXPERIENCE</p><h1 id="ks-title">Explore the <em>{scene.title.toLowerCase()}.</em></h1></div>
        <div><p>{scene.subtitle}</p><a href="#ks-equipment" className="ks-explore-layers">{scene.hotspots.length} connected layers to discover <ArrowDown size={15}/></a></div>
      </section>

      <section className="ks-viewer" id="ks-scene" aria-label={`Interactive ${scene.title.toLowerCase()} scene`}>
        <div className="ks-viewer-toolbar"><span><Compass size={15}/> SELECT A NUMBER TO EXPLORE</span><div className="ks-zoom-controls"><button onClick={() => changeZoom(zoom - .5)} disabled={zoom === 1} aria-label="Zoom out scene"><ZoomOut size={17}/></button><span aria-live="polite">{Math.round(zoom * 100)}%</span><button onClick={() => changeZoom(zoom + .5)} disabled={zoom === 2} aria-label="Zoom into scene"><ZoomIn size={17}/></button>{zoom > 1 && <button onClick={() => changeZoom(1)} aria-label="Show complete scene"><RotateCcw size={15}/></button>}</div></div>
        <div className={`ks-scene-viewport ${zoom > 1 ? "is-zoomed" : ""}`} ref={imageViewport} tabIndex={zoom > 1 ? 0 : -1} aria-label={zoom > 1 ? "Enlarged scene. Scroll horizontally to inspect. All equipment is also available in the list below." : "Complete scene with numbered equipment hotspots"}>
          <div className="ks-scene-stage" style={{ width: `${zoom * 100}%` }}>
            <SceneArtwork source={scene.image} fallback={scene.fallback} description={`Concept illustration of ${scene.title.toLowerCase()}; not an actual KABO installation`}/>
            <svg className="ks-system-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points={scene.hotspots.map((spot) => `${spot.x},${spot.y}`).join(" ")} fill="none" stroke="currentColor" strokeWidth=".18" strokeDasharray=".7 .9"/></svg>
            {scene.hotspots.map((spot, index) => <button key={spot.number} className={`ks-hotspot ${index === active ? "is-selected" : ""}`} style={{ left: `${spot.x}%`, top: `${spot.y}%` }} onClick={() => openLayer(index)} aria-label={`Explore ${spot.number}: ${spot.name}`} aria-haspopup="dialog" data-hotspot={index}><span>{spot.number}</span><span className={`ks-hotspot-label ${spot.x > 70 ? "is-left" : ""}`}>{spot.name}<ArrowUpRight size={13}/></span></button>)}
          </div>
        </div>
        <div className="ks-viewer-caption"><span><span className="ks-caption-line"/> REPRESENTATIVE SOLUTION ENVIRONMENT</span><p>Concept visualisation. Not a customer installation or a product specification.</p></div>
      </section>

      <section className="ks-layers" id="ks-equipment" aria-labelledby="ks-layers-title">
        <div className="ks-layers-heading"><div><p className="ks-eyebrow">FOLLOW THE CONNECTIONS</p><h2 id="ks-layers-title">Every layer has a role.</h2></div><p>Choose a layer in the scene or below. Discover what it does, the equipment involved and the decisions that shape it.</p></div>
        <div className="ks-layer-list">{scene.hotspots.map((spot, index) => <button key={spot.number} onClick={() => openLayer(index)} className={index === active ? "is-selected" : ""} aria-haspopup="dialog"><span className="ks-layer-number">{spot.number}</span><span><small>{spot.kicker}</small><strong>{spot.name}</strong></span><ArrowUpRight size={21}/></button>)}</div>
      </section>

      <section className="ks-bottom-callout"><div><p className="ks-eyebrow">FROM A CONCEPT TO YOUR CONTEXT</p><h2>Every requirement<br/>changes the architecture.</h2><p>Locations, existing equipment, resilience and budget all matter. Tell KABO what your environment needs.</p></div><div><Link className="ks-primary-action" href={`/rfq/${slug}`}>Discuss this solution <ArrowUpRight size={19}/></Link>{slug === "campus" && <button className="ks-panorama-action" onClick={() => setDialog("panorama")}><Compass size={17}/> Inspect the concept in 360° <ArrowUpRight size={17}/></button>}</div></section>

      <div className="ks-next-environment"><span>CONTINUE EXPLORING / {String((sceneIndex + 1) % STUDIO_SCENES.length + 1).padStart(2, "0")}</span><Link href={`/studio/${next.slug}`}>{next.title}<ArrowRight size={30}/></Link></div>
    </div>

    <AnimatePresence>{dialog && <motion.div className={`ks-modal-backdrop ${dialog === "layer" ? "ks-detail-backdrop" : ""}`} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.currentTarget === event.target) setDialog(null); }}>
      <motion.div ref={modal} className={`ks-modal ks-modal--${dialog}`} role="dialog" aria-modal="true" aria-labelledby="ks-modal-title" initial={reduced ? false : { scale: .985, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={reduced ? { opacity: 0 } : { scale: .985, opacity: 0 }} transition={{ duration: .28, ease: [.22, 1, .36, 1] }}>
        <div className="ks-modal-top"><span>{dialog === "layer" ? `SYSTEM LAYER / ${selected.number}` : dialog === "panorama" ? "SPHERICAL CONCEPT VIEW" : "EIGHT CONNECTED ENVIRONMENTS"}</span><button ref={closeButton} onClick={() => setDialog(null)} aria-label={dialog === "layer" ? "Close equipment details" : dialog === "panorama" ? "Close panorama" : "Close environment selection"}><X size={21}/></button></div>
        {dialog === "layer" && <>
          <div className="ks-detail-content" key={`${slug}-${active}`}><p className="ks-eyebrow">{selected.kicker}</p><h2 id="ks-modal-title">{selected.name}</h2><p className="ks-detail-description">{selected.description}</p><div className="ks-design-note"><Layers3 size={17}/><div><h3>Why the design matters</h3><p>{selected.principle}</p></div></div><h3 className="ks-equipment-heading">Representative equipment</h3><ul className="ks-equipment-list">{selected.equipment.map((equipment) => <li key={equipment}><Check size={14}/><span>{equipment}</span></li>)}</ul><p className="ks-specification-note">Makes, models, capacity and quantities are confirmed against your requirements. This is an illustrative architecture.</p></div>
          <div className="ks-detail-footer"><div className="ks-detail-navigation"><button onClick={() => moveLayer(-1)} aria-label="Previous equipment layer"><ChevronLeft size={20}/></button><span>{selected.number} <small>/ {String(scene.hotspots.length).padStart(2, "0")}</small></span><button onClick={() => moveLayer(1)} aria-label="Next equipment layer"><ChevronRight size={20}/></button></div><Link href={`/rfq/${slug}`}>Discuss your requirements <ArrowUpRight size={17}/></Link></div>
        </>}
        {dialog === "environments" && <><div className="ks-environments-intro"><p className="ks-eyebrow">THE BIGGER PICTURE</p><h2 id="ks-modal-title">Choose your environment.</h2><p>Eight perspectives on infrastructure that works together.</p></div><nav className="ks-environment-list" aria-label="Choose architecture environment">{STUDIO_SCENES.map((entry, index) => { const Icon = ICONS[entry.slug]; return <Link key={entry.slug} href={`/studio/${entry.slug}`} aria-current={entry.slug === slug ? "page" : undefined} onClick={() => setDialog(null)}><span>{String(index + 1).padStart(2, "0")}</span><Icon size={21}/><strong>{entry.title}</strong><ArrowUpRight size={17}/></Link>; })}</nav></>}
        {dialog === "panorama" && <><div className="ks-panorama-heading"><h2 id="ks-modal-title">Look around the campus.</h2><p>A spherical conceptual environment. Drag, swipe or use the controls to inspect it.</p></div><div className="ks-panorama-frame"><StudioPanorama source="/images/studio/campus-360.webp"/></div><p className="ks-panorama-disclosure">Synthetic concept panorama, not a measured site scan or a KABO customer installation. <button onClick={() => setDialog(null)}>Return to interactive layers <ArrowRight size={15}/></button></p></>}
      </motion.div>
    </motion.div>}</AnimatePresence>
  </main>;
}
