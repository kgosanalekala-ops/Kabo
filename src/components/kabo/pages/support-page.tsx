"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  LifeBuoy,
  Ticket,
  BookOpen,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  Cpu,
  Network,
  Cloud,
  HardDrive,
  Monitor,
  Send,
  ChevronRight,
  ChevronLeft,
  Copy,
  Mail,
  MapPin,
  Activity,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { VideoHero } from "../video-hero";
import { usePage } from "../page-context";
import { toast } from "sonner";

// ============================================================================
// Static config
// ============================================================================

const PORTAL_OPTIONS = [
  { icon: Ticket, title: "Log a Support Ticket", desc: "Open a ticket with the KABO TAC. SLA-backed response from the Gauteng SOC, tracked end-to-end with milestone visibility.", cta: "Open a Ticket" },
  { icon: BookOpen, title: "Knowledge Base", desc: "Self-service articles, reference architectures, deployment guides and troubleshooting for the platforms KABO supports.", cta: "Browse Articles" },
  { icon: LifeBuoy, title: "Managed Services Portal", desc: "Real-time NOC and SOC monitoring, capacity dashboards, incident history and SLA reporting for managed services customers.", cta: "Access Portal" },
];

const SLA_TIERS = [
  { tier: "P1 — Critical", response: "15 minutes", desc: "Production down. Business impact. 24/7 escalation.", color: "from-red-500 to-rose-600" },
  { tier: "P2 — High", response: "1 hour", desc: "Severe degradation. Workaround available. Business hours.", color: "from-orange-500 to-amber-600" },
  { tier: "P3 — Medium", response: "4 hours", desc: "Limited impact. Next-business-day acceptable.", color: "from-yellow-500 to-amber-500" },
  { tier: "P4 — Low", response: "24 hours", desc: "Informational, request, or non-urgent issue.", color: "from-emerald-500 to-teal-600" },
];

const CATEGORIES = [
  { id: "hardware", label: "Hardware / Compute", icon: Cpu, desc: "Servers, storage arrays, GPU appliances, network switches" },
  { id: "network", label: "Network & Fabric", icon: Network, desc: "LAN, WAN, SD-WAN, InfiniBand, wireless, firewalls" },
  { id: "security", label: "Security / SOC", icon: Shield, desc: "SOC alerts, SIEM, EDR, IAM, zero-trust, surveillance" },
  { id: "cloud", label: "Cloud & Hybrid", icon: Cloud, desc: "Sovereign cloud, hybrid, migration, backup-as-a-service" },
  { id: "workplace", label: "Digital Workplace", icon: Monitor, desc: "End-user compute, MDM, contact centre, document mgmt" },
  { id: "data", label: "Data & Resilience", icon: HardDrive, desc: "Backup, DR, storage tiers, data platform, replication" },
];

type AutoReply = {
  ticketNumber: string;
  priority: string;
  slaResponse: string;
  slaWindow: string;
  category: string;
  acknowledgement: string;
  nextSteps: string[];
  escalationPath: { tier: string; role: string; window: string }[];
  contact: { email: string; noc: string; portal: string };
  createdAt: string;
};

// ============================================================================
// Main page
// ============================================================================

export function SupportPage() {
  const { navigate } = usePage();
  const [activeTab, setActiveTab] = useState<"ticket" | "kb" | "managed">("ticket");

  // Scroll to the ticket panel when a portal card CTA is clicked.
  const scrollToPanel = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (typeof document !== "undefined") {
      const el = document.getElementById("support-panel");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <VideoHero
        variant="security"
        tag="Support Portal"
        title={<>{<>Support engineered</>}<br />for <span className="intel-text-gradient">your estate</span>.</>}
        subtitle="A single accountable owner when things break. The KABO Gauteng SOC monitors your estate 24/7, escalates through the TAC, and tracks every incident end-to-end with SLA-backed response."
      >
        <button
          onClick={() => scrollToPanel("ticket")}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all"
        >
          Open a Ticket
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </VideoHero>

      {/* Support channels */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Support Channels</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">Three ways to engage KABO support</h2>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
              The KABO Gauteng SOC operates 24/7. Every ticket is SLA-backed, tracked end-to-end and routed to the right engineer based on category.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {PORTAL_OPTIONS.map((opt, i) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-6 sm:p-7 card-hover flex flex-col"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                  <opt.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-[#001E3C] font-display mb-2">{opt.title}</h3>
                <p className="text-sm text-[#5A6B7C] leading-relaxed mb-5 flex-1">{opt.desc}</p>
                <button
                  onClick={() => scrollToPanel(["ticket", "kb", "managed"][i] as typeof activeTab)}
                  className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-[#0071C5] hover:text-[#00C7FD] transition-colors"
                >
                  {opt.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={1.5} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed panel — ticket / KB / managed */}
      <section id="support-panel" className="py-20 sm:py-28 bg-[#F5F9FC] scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Tab bar */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {[
              { id: "ticket" as const, label: "Open a Ticket", icon: Ticket },
              { id: "kb" as const, label: "Knowledge Base", icon: BookOpen },
              { id: "managed" as const, label: "Managed Services", icon: LifeBuoy },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#0071C5] to-[#00C7FD] text-white shadow-lg shadow-[#0071C5]/20"
                    : "bg-white text-[#0071C5] border border-[#DCE6EF] hover:border-[#00C7FD]/50"
                }`}
              >
                <tab.icon className="h-4 w-4" strokeWidth={1.5} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "ticket" && <TicketForm />}
              {activeTab === "kb" && <KnowledgeBase />}
              {activeTab === "managed" && <ManagedServices />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SLA tiers */}
      <section className="py-20 sm:py-28 bg-[#001E3C] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00C7FD]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#0071C5]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00C7FD] font-display">SLA-Backed Response</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight">Four priority tiers, one accountable owner</h2>
            <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed">
              Every ticket is triaged by the KABO TAC and assigned a priority based on business impact. SLAs are contractual — missed SLAs are credited against your monthly managed-services invoice.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SLA_TIERS.map((tier, i) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl intel-glass p-6 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.color}`} />
                <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-2">{tier.tier}</div>
                <div className="text-3xl font-bold text-white font-display mb-2">{tier.response}</div>
                <p className="text-sm text-white/60 leading-relaxed">{tier.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Escalation CTA — email / portal only, no phone per user request */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001E3C] font-display leading-tight">Need to escalate?</h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6B7C] max-w-2xl mx-auto">One escalation path. One accountable owner. The KABO TAC is reachable through the ticket form on this page, or by email to support@kaboitgroup.co.za — 24/7 for P1 issues.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToPanel("ticket")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all"
            >
              Open a Ticket
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
            <a
              href="mailto:support@kaboitgroup.co.za"
              className="group inline-flex items-center gap-2 rounded-full border border-[#DCE6EF] bg-white px-7 py-3.5 text-base font-semibold text-[#001E3C] hover:border-[#00C7FD]/50 hover:bg-[#F5F9FC] transition-all"
            >
              <Mail className="h-5 w-5 text-[#0071C5]" strokeWidth={1.5} />
              support@kaboitgroup.co.za
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================================
// Ticket form (multi-step — category → details → contact & submit)
// ============================================================================

function TicketForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [autoReply, setAutoReply] = useState<AutoReply | null>(null);

  // Form state
  const [category, setCategory] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [contractRef, setContractRef] = useState("");

  const canProceedStep1 = category && subject.trim().length >= 5 && description.trim().length >= 20;
  const canSubmit = canProceedStep1 && fullName.trim() && /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: CATEGORIES.find((c) => c.id === category)?.label ?? category,
          // Priority is now triaged by the TAC, not chosen by the user.
          // Default to P3 server-side; the TAC will re-prioritise on acknowledgement.
          subject,
          description,
          fullName,
          email,
          phone: phone || undefined,
          organisation: organisation || undefined,
          contractRef: contractRef || undefined,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        toast.error(data.error || "Unable to create ticket. Please try again.");
        return;
      }
      setAutoReply(data.ticket);
      toast.success(`Ticket ${data.ticket.ticketNumber} created`);
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again or email support@kaboitgroup.co.za.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setAutoReply(null);
    setStep(1);
    setCategory("");
    setSubject("");
    setDescription("");
    setFullName("");
    setEmail("");
    setPhone("");
    setOrganisation("");
    setContractRef("");
  };

  // ---- Auto-reply confirmation screen ----
  if (autoReply) {
    return <AutoReplyScreen reply={autoReply} onReset={resetForm} />;
  }

  const selectedCategory = CATEGORIES.find((c) => c.id === category);

  return (
    <div className="rounded-3xl bg-white border border-[#DCE6EF] shadow-xl overflow-hidden">
      {/* Progress header */}
      <div className="bg-gradient-to-br from-[#001E3C] via-[#003865] to-[#001E3C] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Ticket className="h-5 w-5 text-[#00C7FD]" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold">KABO TAC · Gauteng SOC</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">Open a Support Ticket</h3>
          <p className="text-sm text-white/70 mt-2">Routed to <span className="text-[#00C7FD] font-semibold">support@kaboitgroup.co.za</span> · SLA-backed · 24/7 for P1</p>

          {/* Stepper */}
          <div className="mt-6 flex items-center gap-2">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`h-8 w-8 rounded-full inline-flex items-center justify-center text-xs font-bold font-display transition-colors ${
                    step >= s
                      ? "bg-gradient-to-br from-[#00C7FD] to-[#0071C5] text-white"
                      : "bg-white/10 text-white/50 border border-white/20"
                  }`}
                >
                  {step > s ? <CheckCircle2 className="h-4 w-4" strokeWidth={2} /> : s}
                </div>
                <div className={`text-xs font-medium ${step >= s ? "text-white" : "text-white/40"} hidden sm:block`}>
                  {s === 1 ? "Category & Details" : "Contact & Submit"}
                </div>
                {s < 2 && <div className={`h-0.5 flex-1 ${step > s ? "bg-[#00C7FD]" : "bg-white/15"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step body */}
      <div className="p-6 sm:p-8">
        {/* STEP 1 — Category + Subject + Description (combined since priority was removed) */}
        {step === 1 && (
          <div className="space-y-7">
            <div>
              <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold mb-4">1. What needs support?</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CATEGORIES.map((c) => {
                  const selected = category === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`text-left rounded-2xl border p-4 transition-all ${
                        selected
                          ? "border-[#00C7FD] bg-[#00C7FD]/5 ring-2 ring-[#00C7FD]/20"
                          : "border-[#DCE6EF] bg-white hover:border-[#00C7FD]/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 ${selected ? "bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white" : "bg-[#F5F9FC] text-[#0071C5]"}`}>
                          <c.icon className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-[#001E3C] font-display">{c.label}</div>
                          <div className="text-xs text-[#5A6B7C] mt-0.5 leading-relaxed">{c.desc}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold mb-4">2. Tell us what&apos;s happening</div>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Production storage array — read errors on shelf 4"
                    className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20"
                  />
                  <div className="text-[10px] text-[#5A6B7C] mt-1">{subject.length}/120 · minimum 5 characters</div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Description *</label>
                  <textarea
                    required
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the symptoms, business impact, when it started, what you've already tried, and any error messages. The more context you provide, the faster the TAC can triage."
                    className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20 resize-none"
                  />
                  <div className="text-[10px] text-[#5A6B7C] mt-1">{description.length} characters · minimum 20</div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Contract / Service Tag (optional)</label>
                  <input
                    type="text"
                    value={contractRef}
                    onChange={(e) => setContractRef(e.target.value)}
                    placeholder="KABO-MSA-XXXX or vendor service tag (e.g. HPE care pack #)"
                    className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20"
                  />
                </div>
              </div>
            </div>

            {selectedCategory && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-[#00C7FD]/30 bg-[#00C7FD]/5 p-4 flex items-start gap-3">
                <Activity className="h-5 w-5 text-[#00C7FD] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="text-sm text-[#003865]">
                  <span className="font-semibold">TAC triages priority.</span> Your ticket in <span className="font-semibold">{selectedCategory.label}</span> will be acknowledged by the next business day. If the TAC determines the issue is P1 (production down) or P2 (severe degradation), the SLA window will be tightened on acknowledgement and you will be notified.
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* STEP 2 — Contact info + review */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold mb-2">Contact information</div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Organisation</label>
                <input
                  type="text"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                  className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 ..."
                  className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20"
                />
              </div>
            </div>

            {/* Review summary */}
            <div className="rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-5 space-y-2">
              <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold mb-2">Review your ticket</div>
              <ReviewRow label="Category" value={selectedCategory?.label ?? "—"} />
              <ReviewRow label="Priority" value="TAC triaged (P3 default)" />
              <ReviewRow label="SLA" value="Next business day (P3) · tightened on acknowledgement if P1/P2" />
              <ReviewRow label="Subject" value={subject || "—"} />
              <ReviewRow label="Description" value={description ? `${description.slice(0, 120)}${description.length > 120 ? "…" : ""}` : "—"} />
              <ReviewRow label="Route to" value="support@kaboitgroup.co.za" highlight />
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as 1 | 2)}
              className="inline-flex items-center gap-2 rounded-full border border-[#DCE6EF] bg-white px-5 py-2.5 text-sm font-semibold text-[#001E3C] hover:bg-[#F5F9FC] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              Back
            </button>
          ) : (
            <div className="text-xs text-[#5A6B7C]">All fields marked * are required.</div>
          )}

          {step < 2 ? (
            <button
              type="button"
              disabled={!canProceedStep1}
              onClick={() => setStep((s) => (s + 1) as 1 | 2)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Continue
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          ) : (
            <button
              type="button"
              disabled={!canSubmit || submitting}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Creating ticket…
                </>
              ) : (
                <>
                  Submit Ticket
                  <Send className="h-4 w-4" strokeWidth={1.5} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Inline progress hint — explains what's still required so the user
            doesn't think the Submit/Continue button is broken when it's greyed out. */}
        <div className="mt-3 text-xs text-[#5A6B7C] min-h-[1rem]">
          {step === 1 && !canProceedStep1 && (
            <span>
              {!category && "Select a category · "}
              {subject.trim().length < 5 && "Subject needs at least 5 characters · "}
              {description.trim().length < 20 && "Description needs at least 20 characters"}
            </span>
          )}
          {step === 1 && canProceedStep1 && (
            <span className="text-[#0071C5] font-medium">✓ Ready to continue — click Continue to enter your contact details.</span>
          )}
          {step === 2 && !canSubmit && (
            <span>
              {!fullName.trim() && "Enter your full name · "}
              {email && !/\S+@\S+\.\S+/.test(email) && "Enter a valid email address"}
              {!email && "Enter your email address"}
            </span>
          )}
          {step === 2 && canSubmit && (
            <span className="text-[#0071C5] font-medium">✓ Ready to submit — click Submit Ticket to log your ticket.</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="text-xs tracking-[0.18em] uppercase text-[#5A6B7C] font-display w-28 shrink-0 pt-0.5">{label}</div>
      <div className={`flex-1 ${highlight ? "text-[#0071C5] font-semibold" : "text-[#001E3C]"}`}>{value}</div>
    </div>
  );
}

// ============================================================================
// Auto-reply confirmation screen
// ============================================================================

function AutoReplyScreen({ reply, onReset }: { reply: AutoReply; onReset: () => void }) {
  const copyTicket = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(reply.ticketNumber);
      toast.success("Ticket number copied");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="rounded-3xl bg-white border border-[#DCE6EF] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-[#0071C5] p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern-dark opacity-30" />
          <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 mb-4">
              <CheckCircle2 className="h-4 w-4 text-white" strokeWidth={2} />
              <span className="text-xs tracking-[0.18em] uppercase text-white font-display font-semibold">Ticket Acknowledged</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">Your ticket is live</h3>
              <button
                onClick={copyTicket}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-mono font-semibold text-white hover:bg-white/25 transition-colors"
              >
                {reply.ticketNumber}
                <Copy className="h-3 w-3" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/85">
              <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4" strokeWidth={1.5} /> {reply.priority}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" strokeWidth={1.5} /> First response: {reply.slaResponse}</span>
              <span className="inline-flex items-center gap-1.5"><Activity className="h-4 w-4" strokeWidth={1.5} /> {reply.slaWindow}</span>
            </div>
          </div>
        </div>

        {/* Body — auto-reply message */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="rounded-2xl border border-[#00C7FD]/30 bg-[#00C7FD]/5 p-5">
            <div className="flex items-start gap-3">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white shrink-0">
                <Mail className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold mb-1">Auto-Reply · From KABO TAC</div>
                <div className="text-sm text-[#003865] leading-relaxed">{reply.acknowledgement}</div>
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div>
            <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold mb-3">What happens next</div>
            <ol className="space-y-2">
              {reply.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#001E3C]">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#00C7FD]/15 text-[#00C7FD] text-xs font-bold font-display shrink-0">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Escalation path */}
          <div>
            <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold mb-3">Escalation path</div>
            <div className="rounded-2xl border border-[#DCE6EF] divide-y divide-[#DCE6EF] overflow-hidden">
              {reply.escalationPath.map((e, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-4 py-3 text-sm hover:bg-[#F5F9FC] transition-colors">
                  <div className="font-bold text-[#001E3C] font-display">{e.tier}</div>
                  <div className="text-[#5A6B7C]">{e.role}</div>
                  <div className="text-[#0071C5] font-semibold sm:text-right">{e.window}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact bar — email + portal only, no phone */}
          <div className="grid sm:grid-cols-2 gap-3">
            <ContactCard icon={Mail} label="Email TAC" value={reply.contact.email} href={`mailto:${reply.contact.email}`} />
            <ContactCard icon={LifeBuoy} label="Support Portal" value={reply.contact.portal} />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all"
            >
              <Ticket className="h-4 w-4" strokeWidth={1.5} />
              Log Another Ticket
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactCard({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const inner = (
    <div className="rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-4 flex items-center gap-3 hover:border-[#00C7FD]/50 transition-colors">
      <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white text-[#0071C5] shrink-0">
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold">{label}</div>
        <div className="text-sm font-semibold text-[#001E3C] truncate">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
}

// ============================================================================
// Knowledge Base (placeholder)
// ============================================================================

function KnowledgeBase() {
  const articles = [
    { title: "P1 escalation runbook", category: "Operations", read: "5 min", desc: "What triggers a P1, who gets paged, and how the KABO SOC triages within the 15-minute SLA window." },
    { title: "HPE ProLiant — common POST errors", category: "Hardware", read: "8 min", desc: "Reference table for ProLiant POST codes, with KABO-recommended first response for each." },
    { title: "Fortinet HA failover — verification checklist", category: "Security", read: "6 min", desc: "Step-by-step verification of HA failover events on FortiGate clusters, including logging review." },
    { title: "Pure Storage FlashArray — capacity threshold alerts", category: "Storage", read: "4 min", desc: "How to interpret Pure capacity alerts and when to engage KABO for capacity planning." },
    { title: "NVIDIA HGX cluster — health monitoring basics", category: "AI Infrastructure", read: "10 min", desc: "DCGM metrics to watch, GPU telemetry interpretation, and known-good health baselines." },
    { title: "Veeam backup failure — top 10 root causes", category: "Resilience", read: "7 min", desc: "The ten most common Veeam backup failures and KABO-recommended remediation per pattern." },
  ];
  return (
    <div className="rounded-3xl bg-white border border-[#DCE6EF] shadow-xl overflow-hidden">
      <div className="bg-gradient-to-br from-[#001E3C] via-[#003865] to-[#001E3C] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-[#00C7FD]" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold">Knowledge Base</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">Self-service articles & runbooks</h3>
          <p className="text-sm text-white/70 mt-2">Curated by the KABO TAC. Browse by category or open a ticket if you need a human in the loop.</p>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {articles.map((a) => (
            <div key={a.title} className="rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-5 hover:border-[#00C7FD]/50 hover:bg-white transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold">{a.category}</span>
                <span className="text-[10px] text-[#5A6B7C] inline-flex items-center gap-1"><Clock className="h-3 w-3" strokeWidth={1.5} />{a.read}</span>
              </div>
              <h4 className="text-sm font-bold text-[#001E3C] font-display mb-1 group-hover:text-[#0071C5] transition-colors">{a.title}</h4>
              <p className="text-xs text-[#5A6B7C] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-[#00C7FD]/30 bg-[#00C7FD]/5 p-4 text-sm text-[#003865]">
          Looking for something specific? The full knowledge base is integrated into the KABO managed-services portal. Open a ticket above and the TAC will route the right article to you.
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Managed Services (placeholder)
// ============================================================================

function ManagedServices() {
  return (
    <div className="rounded-3xl bg-white border border-[#DCE6EF] shadow-xl overflow-hidden">
      <div className="bg-gradient-to-br from-[#001E3C] via-[#003865] to-[#001E3C] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <LifeBuoy className="h-5 w-5 text-[#00C7FD]" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold">Managed Services Portal</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">Real-time NOC + SOC</h3>
          <p className="text-sm text-white/70 mt-2">Capacity dashboards, incident history, SLA reporting and live status — for KABO managed-services customers.</p>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Active estates monitored", value: "24/7", icon: Activity },
            { label: "Avg. MTTR (P1/P2)", value: "47 min", icon: Clock },
            { label: "SLA attainment (YTD)", value: "99.4%", icon: Shield },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-5 text-center">
              <s.icon className="h-5 w-5 text-[#0071C5] mx-auto mb-2" strokeWidth={1.5} />
              <div className="text-2xl font-bold text-[#001E3C] font-display">{s.value}</div>
              <div className="text-xs text-[#5A6B7C] uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-[#00C7FD]/30 bg-[#00C7FD]/5 p-5 text-sm text-[#003865] leading-relaxed">
          The managed-services portal is accessed via secure SSO issued during onboarding. If you&apos;ve lost access, open a ticket above with category <span className="font-semibold">&quot;Cloud &amp; Hybrid&quot;</span> and the TAC will re-provision your credentials within one business day.
        </div>
      </div>
    </div>
  );
}
