"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Cpu, Brain, Cloud, Zap, Database, Network, Shield, GitBranch, Play, Pause, ChevronRight,
  Activity, Lock, Layers, Server, Cog, LineChart, HardDrive, Boxes, Workflow,
  HeartPulse, Building2, ShieldCheck, FileText, Microscope, BrainCircuit, Radar, ScanLine,
  type LucideIcon,
} from "lucide-react";

// ============================================================================
// AI CHAPTERS — each chapter has a unique topic-specific icon
// ============================================================================
const AI_CHAPTERS: { id: number; title: string; caption: string; accent: string; stat: { value: string; label: string }; icon: LucideIcon }[] = [
  { id: 0, title: "The AI Era", caption: "AI is rewriting how every enterprise computes, decides and competes. KABO builds the GPU fabric, storage tiers and MLOps plane that put African enterprise inside that era — not behind it.", accent: "#00C7FD", stat: { value: "10x", label: "AI compute density, 3 years" }, icon: BrainCircuit },
  { id: 1, title: "GPU Infrastructure", caption: "NVIDIA H100 and H200 clusters engineered for LLM training, inference and HPC. Liquid-cooled, high-density, built for scale — from single-node inference appliances to multi-rack HGX fabrics.", accent: "#00C7FD", stat: { value: "8x", label: "H100 GPUs per node" }, icon: Cpu },
  { id: 2, title: "InfiniBand Fabric", caption: "Lossless, low-latency 400G interconnects between GPU nodes. Distributed training across multi-node clusters with the bandwidth and determinism AI workloads demand.", accent: "#0071C5", stat: { value: "400G", label: "InfiniBand interconnect" }, icon: Network },
  { id: 3, title: "High-Bandwidth Storage", caption: "All-flash storage tiers tuned to GPU pipelines. GPUDirect integration eliminates storage bottlenecks in AI training — feeding data to the GPU at the speed it can consume.", accent: "#0071C5", stat: { value: "10 GB/s", label: "Read throughput per node" }, icon: Database },
  { id: 4, title: "Hybrid AI Cloud", caption: "Train on-premises with H100 clusters. Burst to Azure or HPE GreenLake when capacity demands. Keep sensitive data sovereign across a hybrid AI fabric.", accent: "#00C7FD", stat: { value: "Hybrid", label: "deployment model" }, icon: Cloud },
  { id: 5, title: "AI Security & Governance", caption: "Model governance, data lineage and secure MLOps. AI workloads protected by the KABO SOC with 24/7 monitoring — accountable from dataset to deployment.", accent: "#0071C5", stat: { value: "24/7", label: "SOC monitored" }, icon: Lock },
];

// ============================================================================
// AI CAPABILITIES — each card has a unique topic-specific icon
// ============================================================================
const AI_CAPABILITIES: { icon: LucideIcon; title: string; desc: string; stat: string; statLabel: string }[] = [
  { icon: Cpu, title: "GPU Compute Fabric", desc: "NVIDIA HGX H100/H200 multi-GPU platforms with NVLink, InfiniBand and high-bandwidth storage tiers.", stat: "8x H100", statLabel: "per node" },
  { icon: BrainCircuit, title: "AI Model Serving", desc: "ML/Ops platforms with distributed training, model serving, experiment tracking and pipeline automation.", stat: "Real-time", statLabel: "inference" },
  { icon: Database, title: "High-Bandwidth Storage", desc: "All-flash storage tiers tuned to GPU pipelines. GPUDirect eliminates storage bottlenecks in training workloads.", stat: "10 GB/s", statLabel: "read throughput" },
  { icon: Cloud, title: "Hybrid AI Cloud", desc: "GreenLake and Azure integration for elastic AI compute. Burst to cloud when on-prem capacity is exhausted.", stat: "Hybrid", statLabel: "deployment" },
  { icon: Network, title: "InfiniBand Fabric", desc: "Lossless, low-latency interconnects between GPU nodes. 400G InfiniBand for distributed training across multi-node clusters.", stat: "400G", statLabel: "interconnect" },
  { icon: Lock, title: "AI Security & Governance", desc: "Model governance, data lineage and secure MLOps. AI workloads protected by the KABO SOC with 24/7 monitoring.", stat: "24/7", statLabel: "SOC monitored" },
];

// ============================================================================
// AI USE CASES — eight use cases, each with a unique, topic-specific icon
// ============================================================================
const AI_USE_CASES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: BrainCircuit, title: "LLM Training", desc: "Large language model training on GPU clusters" },
  { icon: ScanLine, title: "Computer Vision", desc: "Real-time video analytics and image recognition" },
  { icon: LineChart, title: "Predictive Analytics", desc: "Equipment failure prediction and maintenance" },
  { icon: Radar, title: "Edge AI Inference", desc: "On-device AI processing at remote sites" },
  { icon: HeartPulse, title: "Healthcare Diagnostics", desc: "AI-assisted radiology and medical imaging" },
  { icon: Building2, title: "Smart City Analytics", desc: "Traffic, safety and urban intelligence" },
  { icon: ShieldCheck, title: "Fraud Detection", desc: "Real-time financial transaction analysis" },
  { icon: FileText, title: "Document Intelligence", desc: "OCR, classification and workflow automation" },
];

const PIPELINE_STAGES = ["Data", "Train", "Validate", "Deploy", "Infer", "Monitor"];

export function AIInfrastructure() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["50px", "0px"]);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => setActiveChapter((c) => (c + 1) % AI_CHAPTERS.length), 5000);
    return () => clearTimeout(timer);
  }, [activeChapter, isPlaying]);

  const goToChapter = (idx: number) => { setActiveChapter(idx); setIsPlaying(true); };

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[#001E3C]">
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#001E3C] via-[#002B5C] to-[#001E3C]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00C7FD]/8 blur-3xl float-anim" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#0071C5]/8 blur-3xl float-anim" style={{ animationDelay: "3s" }} />
        <div className="scan-line" />
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-[#00C7FD]" style={{ top: `${10 + (i * 8) % 75}%`, left: `${5 + (i * 11) % 85}%`, opacity: 0.3, animation: `pulse-glow ${3 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.25}s` }} />
        ))}
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="ai-fabric-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,199,253,0)" />
              <stop offset="50%" stopColor="rgba(0,199,253,0.5)" />
              <stop offset="100%" stopColor="rgba(0,113,197,0)" />
            </linearGradient>
          </defs>
          <path d="M 100 200 Q 360 100 720 260 T 1340 220" fill="none" stroke="url(#ai-fabric-line)" strokeWidth="1.2" />
          <path d="M 160 500 Q 460 380 820 540 T 1380 480" fill="none" stroke="url(#ai-fabric-line)" strokeWidth="1.2" />
          <path d="M 80 360 Q 400 280 720 420 T 1360 360" fill="none" stroke="rgba(0,199,253,0.15)" strokeWidth="0.8" />
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div style={{ y: textY }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#00C7FD]/15 flex items-center justify-center pulse-glow">
              <Zap className="w-7 h-7 text-[#00C7FD]" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 font-display">
            Inside the <span className="intel-text-gradient-bright">AI Era</span>.
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            KABO builds the GPU infrastructure, storage tiers and AI platforms that power intelligent transformation across African enterprise — from LLM training to real-time inference at the edge.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-20">
          <div className="relative rounded-3xl overflow-hidden border border-[#00C7FD]/20 bg-gradient-to-br from-[#001E3C] via-[#002B5C] to-[#001E3C]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00C7FD] pulse-glow" />
                  <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold">KABO AI Series</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
                <span>{String(activeChapter + 1).padStart(2, "0")}</span><span>/</span><span>{String(AI_CHAPTERS.length).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="relative aspect-[16/9] sm:aspect-[16/7] overflow-hidden">
              <div className="absolute inset-0 grid-pattern-dark opacity-40" />
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl transition-colors duration-1000" style={{ backgroundColor: `${AI_CHAPTERS[activeChapter].accent}15` }} />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl transition-colors duration-1000" style={{ backgroundColor: `${AI_CHAPTERS[activeChapter].accent}10` }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none">
                <svg width="500" height="500" viewBox="0 0 500 500" className="spin-slow">
                  <circle cx="250" cy="250" r="230" fill="none" stroke={`${AI_CHAPTERS[activeChapter].accent}25`} strokeWidth="1" strokeDasharray="4 8" />
                  <circle cx="250" cy="250" r="170" fill="none" stroke={`${AI_CHAPTERS[activeChapter].accent}35`} strokeWidth="1" strokeDasharray="2 6" />
                  <circle cx="250" cy="250" r="110" fill="none" stroke={`${AI_CHAPTERS[activeChapter].accent}45`} strokeWidth="1" strokeDasharray="2 4" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div key={activeChapter} initial={{ opacity: 0, scale: 0.8, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.8, rotate: 10 }} transition={{ duration: 0.5 }} className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${AI_CHAPTERS[activeChapter].accent}30, ${AI_CHAPTERS[activeChapter].accent}10)`, border: `1px solid ${AI_CHAPTERS[activeChapter].accent}40`, boxShadow: `0 0 60px ${AI_CHAPTERS[activeChapter].accent}30` }}>
                      {(() => {
                        const Icon = AI_CHAPTERS[activeChapter].icon;
                        return <Icon className="w-12 h-12 sm:w-16 sm:h-16" style={{ color: AI_CHAPTERS[activeChapter].accent }} strokeWidth={1.2} />;
                      })()}
                    </div>
                    <div className="absolute inset-0 rounded-3xl animate-ping" style={{ backgroundColor: AI_CHAPTERS[activeChapter].accent, opacity: 0.1 }} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 bg-gradient-to-t from-[#001E3C] via-[#001E3C]/70 to-transparent">
                <div className="max-w-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeChapter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs tracking-[0.2em] uppercase font-display font-semibold" style={{ color: AI_CHAPTERS[activeChapter].accent }}>Chapter {String(activeChapter + 1).padStart(2, "0")}</span>
                        <span className="text-xs text-white/30">&middot;</span>
                        <span className="text-xs text-white/50 font-display">{AI_CHAPTERS[activeChapter].title}</span>
                      </div>
                      <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed font-medium">{AI_CHAPTERS[activeChapter].caption}</p>
                      <div className="mt-4 inline-flex items-center gap-3 rounded-xl bg-white/5 backdrop-blur border border-white/10 px-4 py-2">
                        <span className="text-xl sm:text-2xl font-bold font-display" style={{ color: AI_CHAPTERS[activeChapter].accent }}>{AI_CHAPTERS[activeChapter].stat.value}</span>
                        <span className="text-xs text-white/50 uppercase tracking-wider">{AI_CHAPTERS[activeChapter].stat.label}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <button onClick={() => setIsPlaying(!isPlaying)} className="absolute top-4 right-4 z-20 inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause className="h-4 w-4" strokeWidth={1.5} /> : <Play className="h-4 w-4 ml-0.5" strokeWidth={1.5} />}
              </button>
            </div>
            <div className="px-6 py-4 bg-black/30 border-t border-white/10">
              <div className="flex items-center gap-2 overflow-x-auto">
                {AI_CHAPTERS.map((chapter, idx) => {
                  const isActive = idx === activeChapter;
                  return (
                    <button key={chapter.id} onClick={() => goToChapter(idx)} className={`relative flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-all ${isActive ? "bg-white/10 text-white border border-white/20" : "text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent"}`}>
                      <span className="font-mono text-[10px]" style={{ color: isActive ? chapter.accent : undefined }}>{String(idx + 1).padStart(2, "0")}</span>
                      <span>{chapter.title}</span>
                      {isActive && isPlaying && (
                        <span className="flex items-center gap-0.5 ml-1">
                          <span className="w-0.5 h-2 bg-[#00C7FD] animate-pulse" style={{ animationDelay: "0ms" }} />
                          <span className="w-0.5 h-3 bg-[#00C7FD] animate-pulse" style={{ animationDelay: "150ms" }} />
                          <span className="w-0.5 h-2 bg-[#00C7FD] animate-pulse" style={{ animationDelay: "300ms" }} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div key={activeChapter} initial={{ width: "0%" }} animate={{ width: isPlaying ? "100%" : "0%" }} transition={{ duration: isPlaying ? 5 : 0, ease: "linear" }} className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${AI_CHAPTERS[activeChapter].accent}, #00C7FD)` }} />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: "H100/H200", label: "NVIDIA GPU Platforms" },
            { value: "400G", label: "InfiniBand Interconnect" },
            { value: "10 GB/s", label: "Storage Throughput" },
            { value: "24/7", label: "SOC Monitoring" },
          ].map((m, i) => (
            <div key={i} className="text-center p-6 rounded-2xl intel-glass">
              <div className="text-2xl md:text-3xl font-bold text-[#00C7FD] mb-2 font-display">{m.value}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="mb-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center justify-center gap-2 md:gap-4 flex-wrap mb-4">
            {PIPELINE_STAGES.map((step, i) => (
              <div key={step} className="flex items-center gap-2 md:gap-4">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.15 }} className="px-4 py-2 rounded-xl bg-[#0071C5]/15 border border-[#00C7FD]/20 text-sm font-medium text-white font-display">{step}</motion.div>
                {i < PIPELINE_STAGES.length - 1 && (
                  <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.15 + 0.1 }} className="text-[#00C7FD] text-lg">
                    <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                  </motion.span>
                )}
              </div>
            ))}
          </motion.div>
          <p className="text-center text-xs text-white/40 tracking-wider uppercase font-display">End-to-end MLOps pipeline — accountable from data to deployment</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_CAPABILITIES.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }} className="group p-8 rounded-2xl intel-glass hover:bg-white/8 transition-all duration-300 hover:border-[#00C7FD]/30">
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-xl bg-[#0071C5]/15 flex items-center justify-center transition-all duration-300 group-hover:bg-[#0071C5]/25 group-hover:scale-110">
                  <step.icon className="w-7 h-7 text-[#00C7FD]" strokeWidth={1.5} />
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#00C7FD] font-display">{step.stat}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">{step.statLabel}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight font-display">{step.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <GitBranch className="w-6 h-6 text-[#00C7FD]" strokeWidth={1.5} />
            <h3 className="text-2xl font-bold text-white font-display">AI Use Cases KABO Delivers</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AI_USE_CASES.map((uc, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: (i % 4) * 0.08 }} className="group p-5 rounded-xl intel-glass hover:border-[#00C7FD]/30 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-[#00C7FD]/15 flex items-center justify-center text-[#00C7FD] group-hover:bg-[#00C7FD]/25 group-hover:scale-110 transition-all duration-300">
                    <uc.icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">{uc.title}</h4>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12 p-10 rounded-3xl bg-gradient-to-r from-[#003865] to-[#002B5C] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C7FD]/10 blur-3xl rounded-full" />
          <div className="relative z-10">
            <Cloud className="w-10 h-10 text-[#00C7FD] mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-3xl font-bold text-white mb-4 font-display">Hybrid AI Cloud</h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
              Train on-premises with H100 clusters. Burst to Azure or GreenLake when capacity demands. Keep sensitive data sovereign. KABO engineers the hybrid AI fabric that gives you both.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["HPE GreenLake", "Microsoft Azure", "On-Prem GPU", "Edge Inference", "Sovereign Cloud"].map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
