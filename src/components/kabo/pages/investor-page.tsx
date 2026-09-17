"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, PieChart, Globe, CheckCircle2, Send, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { VideoHero } from "../video-hero";
import { usePage } from "../page-context";
import { toast } from "sonner";

const PILLARS = [
  { icon: TrendingUp, title: "Growth Trajectory", desc: "KABO is positioned for sustained growth across South Africa's enterprise ICT market — driven by AI infrastructure demand, B-BBEE procurement acceleration and sovereign cloud adoption. The structural shift from capex to SLA-based consumption models plays directly to our integrated architecture and 24/7 operations capability." },
  { icon: PieChart, title: "Diversified Revenue", desc: "Revenue across twelve solution domains, fifteen strategic alliances and nine industry verticals. No single point of dependency. Hardware supply, solutions procurement, managed services and asset recovery under one roof — with recurring managed-services revenue growing as a proportion of total." },
  { icon: Globe, title: "Expansion Vision", desc: "Nationwide footprint across all nine South African provinces today. Strategic roadmap extends KABO's ecosystem orchestration model into SADC and the broader African continent — carrying the same architecture, the same partnerships and the same operational discipline that work in South Africa." },
];

const INVESTMENT_HIGHLIGHTS = [
  { value: "15", label: "Strategic Alliances", desc: "HPE, Dell, Microsoft, NVIDIA, Hikvision and more — vendor-neutral selection across the full stack." },
  { value: "12", label: "Solution Domains", desc: "From compute and AI infrastructure to managed services — a complete portfolio across the infrastructure lifecycle." },
  { value: "9", label: "Industries Served", desc: "Public sector, financial services, mining, healthcare, education, telecoms, manufacturing, retail and smart infrastructure." },
  { value: "L1", label: "B-BBEE · 135%", desc: "Level 1 contributor with maximum procurement recognition — a structural advantage in the South African market." },
];

const THESIS = [
  { num: "01", title: "AI changes the physics of the room", desc: "Density, power and cooling envelopes will re-architect the data centre — not just refresh it. KABO is positioned at the intersection of GPU infrastructure, sovereign cloud and 24/7 operations, capturing the spend that follows this shift." },
  { num: "02", title: "Security is the architecture", desc: "Zero-Trust will move from a capability to a precondition; the SOC becomes the system of record. KABO's converged cyber + physical security practice, anchored by Hikvision and a 24/7 Gauteng SOC, turns this regulatory shift into recurring managed-services revenue." },
  { num: "03", title: "Operations is the product", desc: "Infrastructure value will be measured in SLA performance, not in capex. Integrators who can't operate won't survive. KABO's model — the same engineers integrate and operate — is structurally designed for the SLA economy." },
];

export function InvestorPage() {
  const { navigate } = usePage();
  return (
    <>
      <VideoHero variant="abstract" tag="Investor Relations" title={<>{<>Building Africa&rsquo;s</>}<br /><span className="intel-text-gradient">ecosystem orchestrator</span>.</>} subtitle="KABO IT Group is building the integrated ICT platform that African enterprise needs for the AI era. We welcome conversations with strategic investors aligned with our mission to engineer intelligent infrastructure across the continent.">
        <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all">
          Request Investor Conversation
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </VideoHero>

      {/* Investment highlights */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Investment Highlights</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">
              A national integrator with <span className="intel-text-gradient">enterprise depth</span>.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
              KABO occupies a distinct position in the South African infrastructure market — the engineering depth of an enterprise integrator, the partnership credibility of a Tier-1 reseller and the B-BBEE profile of a Level 1 contributor with maximum procurement recognition.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {INVESTMENT_HIGHLIGHTS.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-6 sm:p-7 card-hover">
                <div className="text-3xl sm:text-4xl font-bold font-display bg-gradient-to-br from-[#5FE5FF] via-[#00C7FD] to-[#0071C5] bg-clip-text text-transparent">{h.value}</div>
                <div className="mt-2 text-sm font-bold text-[#001E3C] font-display uppercase tracking-wider">{h.label}</div>
                <p className="mt-3 text-xs sm:text-sm text-[#5A6B7C] leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth pillars */}
      <section className="py-20 sm:py-28 bg-[#F5F9FC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Why Invest in KABO</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">Three structural growth drivers.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
            {PILLARS.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group rounded-2xl border border-[#DCE6EF] bg-white p-6 sm:p-7 card-hover">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                  <p.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-[#001E3C] font-display mb-3">{p.title}</h3>
                <p className="text-sm text-[#5A6B7C] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment thesis */}
      <section className="py-20 sm:py-28 bg-[#001E3C] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00C7FD]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#0071C5]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1 mb-4">
              <TrendingUp className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
              <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold">Investment Thesis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight">
              Three theses for the <span className="intel-text-gradient-bright">AI era</span>.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed">
              KABO's investment thesis is grounded in three structural shifts re-architecting how African enterprise designs, buys and operates infrastructure. Each thesis maps directly to a revenue stream.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
            {THESIS.map((t, i) => (
              <motion.div key={t.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group relative rounded-2xl intel-glass p-6 sm:p-7 hover:border-[#00C7FD]/40 transition-all">
                <div className="text-4xl sm:text-5xl font-bold font-display bg-gradient-to-br from-[#00C7FD] to-[#0071C5] bg-clip-text text-transparent mb-4">{t.num}</div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display leading-tight mb-3">{t.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor contact */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="lg:col-span-5">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Investor Enquiries</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#001E3C] font-display leading-tight">Start a conversation.</h2>
              <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
                We welcome conversations with strategic investors, private equity and development finance institutions aligned with our mission to engineer intelligent infrastructure for African enterprise. All enquiries are treated in strict confidence and routed directly to the KABO executive team.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Mail, label: "Investor Enquiries", value: "info@kaboitgroup.co.za" },
                  { icon: MapPin, label: "Registered Address", value: "12886 Masemola Street, Mamelodi East, Pretoria, 0122" },
                ].map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-[#F1F6FB] text-[#0071C5] shrink-0">
                      <c.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display">{c.label}</div>
                      <div className="text-base text-[#003865] mt-0.5">{c.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-7">
              <div className="rounded-3xl border border-[#DCE6EF] bg-[#F5F9FC] p-6 sm:p-8 lg:p-10">
                <h3 className="text-xl sm:text-2xl font-bold text-[#001E3C] font-display mb-2">Investor Conversation Request</h3>
                <p className="text-sm text-[#5A6B7C] mb-6">Tell us about your investment focus and we&rsquo;ll route this directly to the KABO executive team. All enquiries are treated in strict confidence.</p>
                <InvestorForm key={"investor-form"} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function InvestorForm() {
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    routeTo: string;
    acknowledgement: string;
    nextSteps: string[];
    contact: { email: string; general: string; phone: string };
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get("fullName") || ""),
      organisation: String(formData.get("organisation") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      investorType: String(formData.get("investorType") || ""),
      fundSize: String(formData.get("fundSize") || ""),
      timeline: String(formData.get("timeline") || ""),
      message: String(formData.get("message") || ""),
    };

    if (!payload.fullName || !payload.organisation || !payload.email || !payload.investorType || !payload.message) {
      toast.error("Please complete all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) {
        toast.error(data.error || "Unable to submit investor enquiry.");
        return;
      }
      setConfirmation(data.enquiry);
      form.reset();
      toast.success("Investor enquiry submitted to the executive team");
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again or email info@kaboitgroup.co.za.");
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-[#00C7FD]/30 bg-[#00C7FD]/5 p-6">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle2 className="h-8 w-8 text-[#00C7FD] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <h4 className="text-lg font-bold text-[#001E3C] font-display">Request received</h4>
              <p className="text-sm text-[#5A6B7C] mt-1">Your investor enquiry has been routed directly to <span className="font-semibold text-[#0071C5]">{confirmation.routeTo}</span> and flagged for executive attention.</p>
            </div>
          </div>
          <div className="rounded-xl bg-white border border-[#DCE6EF] p-4 mb-4">
            <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold mb-2">Auto-reply from KABO Executive Office</div>
            <p className="text-sm text-[#003865] leading-relaxed">{confirmation.acknowledgement}</p>
          </div>
          <ol className="space-y-2 mb-4">
            {confirmation.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#001E3C]">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#00C7FD]/15 text-[#00C7FD] text-xs font-bold font-display shrink-0">{i + 1}</span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-4 text-xs text-[#5A6B7C] pt-3 border-t border-[#DCE6EF]">
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" strokeWidth={1.5} /> {confirmation.contact.email}</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" strokeWidth={1.5} /> General: {confirmation.contact.general}</span>
          </div>
        </div>
        <button
          onClick={() => setConfirmation(null)}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl transition-all"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Full Name *</label>
          <input name="fullName" type="text" required className="w-full rounded-lg border border-[#DCE6EF] bg-white px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20" />
        </div>
        <div>
          <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Organisation *</label>
          <input name="organisation" type="text" required className="w-full rounded-lg border border-[#DCE6EF] bg-white px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Work Email *</label>
          <input name="email" type="email" required className="w-full rounded-lg border border-[#DCE6EF] bg-white px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20" />
        </div>
        <div>
          <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Phone (optional)</label>
          <input name="phone" type="tel" className="w-full rounded-lg border border-[#DCE6EF] bg-white px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20" />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Investor Type *</label>
          <select name="investorType" required className="w-full rounded-lg border border-[#DCE6EF] bg-white px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20">
            <option value="">Select investor type</option>
            <option>Private Equity</option>
            <option>Development Finance Institution</option>
            <option>Strategic / Corporate Investor</option>
            <option>Family Office</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Fund Size (optional)</label>
          <input name="fundSize" type="text" placeholder="e.g. R500m–R1bn" className="w-full rounded-lg border border-[#DCE6EF] bg-white px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20" />
        </div>
        <div>
          <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Timeline (optional)</label>
          <input name="timeline" type="text" placeholder="e.g. Q3 2026" className="w-full rounded-lg border border-[#DCE6EF] bg-white px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20" />
        </div>
      </div>
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Message *</label>
        <textarea name="message" required rows={4} placeholder="Tell us about your investment focus, fund size, sector interest and timeline..." className="w-full rounded-lg border border-[#DCE6EF] bg-white px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20 resize-none" />
      </div>
      <div className="rounded-xl border border-[#DCE6EF] bg-[#F5F9FC] p-3 text-xs text-[#5A6B7C] flex items-start gap-2">
        <Mail className="h-4 w-4 text-[#0071C5] shrink-0 mt-0.5" strokeWidth={1.5} />
        <span>This enquiry will be routed directly to the KABO executive team and treated in strict confidence. You will receive a personal response within two business days.</span>
      </div>
      <button type="submit" disabled={submitting} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
        {submitting ? (
          <>
            <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            Submit Request
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </>
        )}
      </button>
    </form>
  );
}
