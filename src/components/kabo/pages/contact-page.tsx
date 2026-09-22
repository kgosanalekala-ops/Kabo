"use client";

import { motion } from "framer-motion";
import { ArrowRight, Send, CheckCircle2, Mail, Phone, MapPin, Clock, ShieldCheck, MessageCircle } from "lucide-react";
import { useState } from "react";
import { VideoHero } from "../video-hero";
import { toast } from "sonner";

const ENQUIRY_TYPES = [
  "AI Infrastructure & GPU Compute",
  "Cloud & Hybrid Integration",
  "Data Centre Solutions",
  "Enterprise Storage & Resilience",
  "Intelligent Networking",
  "Integrated Security",
  "Contact Centre (CCaaS)",
  "Document Management",
  "Digital Workplace",
  "Procurement / RFP Response",
  "Partnership Enquiry",
  "Other",
];

export function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    routeTo: string;
    enquiryType: string;
    acknowledgement: string;
    nextSteps: string[];
    contact: { email: string; phone: string; support: string };
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      organisation: String(formData.get("organisation") || ""),
      phone: String(formData.get("phone") || ""),
      enquiryType: String(formData.get("enquiryType") || ""),
      message: String(formData.get("message") || ""),
    };

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.enquiryType || !payload.message) {
      toast.error("Please complete all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) {
        toast.error(data.error || "Unable to submit enquiry.");
        return;
      }
      setConfirmation(data.enquiry);
      form.reset();
      toast.success("Enquiry submitted to info@kaboitgroup.co.za");
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again or email info@kaboitgroup.co.za.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <VideoHero variant="abstract" tag="Contact" title={<>{<>Let&rsquo;s build something</>}<br /><span className="intel-text-gradient">resilient</span>.</>} subtitle="One conversation replaces a queue of vendors. Tell us about your workload, your estate, your RFP — we'll route it to the right architect and come back with a reference design, not a brochure." />
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="lg:col-span-7">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Start a Conversation</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#001E3C] font-display leading-tight">Tell us what you&rsquo;re building</h2>
              <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
                Whether you&rsquo;re scoping an AI infrastructure deployment, responding to a procurement requirement, or consolidating your ICT supply chain &mdash; we&rsquo;ll route your enquiry to the right KABO specialist. All general enquiries are delivered to <span className="font-semibold text-[#0071C5]">info@kaboitgroup.co.za</span> and acknowledged within one business day.
              </p>

              {confirmation ? (
                <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 rounded-2xl border border-[#00C7FD]/30 bg-[#00C7FD]/5 p-6 sm:p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-[#00C7FD] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h3 className="text-xl font-bold text-[#001E3C] font-display">Enquiry received</h3>
                      <p className="text-sm text-[#5A6B7C] mt-1">Your message has been routed to <span className="font-semibold text-[#0071C5]">{confirmation.routeTo}</span> under enquiry type <span className="font-semibold">{confirmation.enquiryType}</span>.</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white border border-[#DCE6EF] p-4 mb-4">
                    <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold mb-2">Auto-reply from KABO</div>
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
                    <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} /> Support: {confirmation.contact.support}</span>
                  </div>
                  <button
                    onClick={() => setConfirmation(null)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl transition-all"
                  >
                    Send Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">First Name *</label>
                      <input name="firstName" type="text" required className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Last Name *</label>
                      <input name="lastName" type="text" required className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Work Email *</label>
                      <input name="email" type="email" required className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Organisation *</label>
                      <input name="organisation" type="text" required className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Phone (optional)</label>
                      <input name="phone" type="tel" className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20" />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Enquiry Type *</label>
                      <select name="enquiryType" required className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20">
                        <option value="">Select an enquiry type</option>
                        {ENQUIRY_TYPES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Message *</label>
                    <textarea name="message" required rows={5} placeholder="Tell us about your workload, your estate, your timeline, your procurement requirement..." className="w-full rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-4 py-3 text-sm text-[#001E3C] focus:border-[#00C7FD] focus:outline-none focus:ring-2 focus:ring-[#00C7FD]/20 resize-none" />
                  </div>
                  <div className="rounded-xl border border-[#DCE6EF] bg-[#F5F9FC] p-3 text-xs text-[#5A6B7C] flex items-start gap-2">
                    <Mail className="h-4 w-4 text-[#0071C5] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>This enquiry will be routed to <span className="font-semibold text-[#0071C5]">info@kaboitgroup.co.za</span>. For investor enquiries use the <span className="font-semibold">Investors</span> page; for support tickets use the <span className="font-semibold">Support</span> page (SLA-backed).</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button type="submit" disabled={submitting} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
                      {submitting ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Enquiry
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-br from-[#001E3C] via-[#003865] to-[#001E3C] p-8 sm:p-10 overflow-hidden relative">
                <div className="absolute inset-0 grid-pattern-dark opacity-40" />
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl" />
                <div className="relative">
                  <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-3">The KABO Promise</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight mb-6">Unified contract. Single escalation path. The same engineering team from workshop to QBR.</h3>
                  <ul className="space-y-3">
                    {[
                      "No vendor sprawl — every layer under a single agreement",
                      "No finger pointing — a single accountable owner, end to end",
                      "No orphan SKUs — every product integrated into the reference architecture",
                      "No procurement gymnastics — B-BBEE Level 1, Treasury-ready",
                    ].map((item, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex items-start gap-3 text-white/85">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#00C7FD]/20 text-[#00C7FD] text-xs font-bold shrink-0 mt-0.5">&radic;</span>
                        <span className="text-sm sm:text-base leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                    <ContactLine icon={MapPin} label="Registered Address" lines={["12886 Masemola Street", "Mamelodi East, Pretoria, 0122", "South Africa"]} />
                    <ContactLine icon={Mail} label="General Enquiries" lines={["info@kaboitgroup.co.za"]} />
                    <ContactLine icon={ShieldCheck} label="Support (SLA-backed)" lines={["support@kaboitgroup.co.za", "via KABO portal or email"]} />
                    <ContactLine icon={Clock} label="Engineering & NOC" lines={["24/7 operations from", "Gauteng SOC"]} />
                    <ContactLine icon={Phone} label="Voice" lines={["+27 612 85 4418"]} />
                    {/* WhatsApp click-to-chat — direct engagement channel */}
                    <a
                      href={`https://wa.me/27612854418?text=${encodeURIComponent("Hello KABO IT Group, I'd like to start a conversation about your solutions.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#00C7FD]/10 border border-[#00C7FD]/40 px-4 py-2 text-sm font-semibold text-[#00C7FD] hover:bg-[#00C7FD]/20 hover:border-[#00C7FD]/60 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={2} />
                      Chat on WhatsApp · +27 612 85 4418
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactLine({ icon: Icon, label, lines }: { icon: React.ElementType; label: string; lines: string[] }) {
  return (
    <div className="flex items-start gap-3">
      <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white/5 border border-white/10 text-[#00C7FD] shrink-0">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold">{label}</div>
        <div className="text-sm text-white/80 mt-0.5 leading-relaxed">{lines.map((l, i) => <div key={i}>{l}</div>)}</div>
      </div>
    </div>
  );
}
