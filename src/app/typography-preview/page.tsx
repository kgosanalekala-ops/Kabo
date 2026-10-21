"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Choice = { name: string; description: string; css: string; characteristic: string };
const faces: Choice[] = [
  { name: "Outfit", description: "Recommended · geometric, rounded, quietly confident", css: "var(--font-outfit)", characteristic: "Closest balance of geometric forms and restrained authority" },
  { name: "Urbanist", description: "Refined · open, modernist, architectural", css: "var(--font-urbanist)", characteristic: "Lightest editorial feeling, more generous letter shapes" },
  { name: "Sora", description: "Technical · precise, compact, contemporary", css: "var(--font-sora)", characteristic: "Structured and clean, with a more digital character" },
  { name: "Space Grotesk", description: "Current font · included for before-and-after comparison", css: "var(--font-space-grotesk)", characteristic: "Sharper personality; previously paired with weight-700 accents" },
];

export default function TypographyPreview() {
  const [selected, setSelected] = useState(0);
  const [weight, setWeight] = useState<500 | 600>(500);
  const face = faces[selected];
  return (
    <main className="min-h-screen bg-[#F4F8FB] text-[#0A263F]">
      <header className="bg-[#03182D] px-5 py-5 text-white sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <Image src="/logos/kabo-logo-white.png" alt="KABO IT Group original wordmark" width={144} height={42} priority className="h-9 w-auto" />
          <Link href="/" className="rounded-full border border-white/25 px-4 py-2 text-xs font-medium text-white/85 hover:border-[#55DCF5]">View KABO website preview ↗</Link>
        </div>
      </header>
      <section className="bg-[#03182D] px-5 pb-10 pt-9 text-white sm:px-10 lg:px-16 lg:pt-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6DDAF7]"><span className="h-[2px] w-7 bg-[#50D7F4]" /> Brand typography study</div>
          <h1 className="mt-5 max-w-[850px] text-[clamp(2rem,4vw,3.75rem)] leading-[1.12] tracking-[-0.03em]" style={{fontFamily:"var(--font-outfit)",fontWeight:500}}>A softer voice. <span className="intel-text-gradient-bright">The same authority.</span></h1>
          <p className="mt-4 max-w-[740px] text-sm leading-relaxed text-[#BAD2E5] sm:text-base">Four real display faces, compared against the original KABO wordmark. Select a typeface and weight to judge the hero, heading hierarchy and card typography. No new logo, colours or site layout.</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-8 sm:px-10 lg:grid-cols-[315px_minmax(0,1fr)] lg:gap-8 lg:px-16">
        <aside className="self-start rounded-2xl border border-[#D5E2EB] bg-white p-5 shadow-sm lg:sticky lg:top-6">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#0071C5]">Compare typefaces</p>
          <div className="mt-4 flex flex-col gap-2">
            {faces.map((item,i)=>(
              <button key={item.name} type="button" onClick={()=>setSelected(i)} aria-pressed={selected===i}
                className={"rounded-xl border px-4 py-3 text-left transition-colors "+(selected===i?"border-[#00BFEF] bg-[#EBFAFF]":"border-[#E1EAF0] bg-white hover:border-[#7CBEDB]")}>
                <span className="block text-[18px] text-[#062846]" style={{fontFamily:item.css,fontWeight:600}}>{item.name}</span>
                <span className="mt-1 block text-xs leading-relaxed text-[#547085]">{item.description}</span>
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.17em] text-[#0071C5]">Headline weight</p>
          <div className="mt-3 grid grid-cols-2 gap-2" role="group" aria-label="Heading font weight">
            {([500,600] as const).map(v=><button type="button" key={v} onClick={()=>setWeight(v)} aria-pressed={weight===v} className={"rounded-lg border px-3 py-2 text-sm "+(weight===v?"border-[#00BFEF] bg-[#DDF7FF]":"border-[#D5E2EB]")}>{v===500?"Medium 500":"SemiBold 600"}</button>)}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#60788A]">A matching font is not the same as reproducing custom logo lettering. The supplied wordmark remains the exact original.</p>
        </aside>
        <div className="space-y-5">
          <section className="relative overflow-hidden rounded-2xl bg-[#03182D] text-white">
            <div className="pointer-events-none absolute inset-0 opacity-30" style={{backgroundImage:"url('/images/sol_datacenter.jpg')",backgroundPosition:"center right",backgroundSize:"cover"}} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#03182D] via-[#03182D]/95 to-[#03182D]/45"/>
            <div className="relative z-10 p-6 sm:p-10 lg:p-14">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#91E6FA]">Homepage hero / {face.name}</p>
              <h2 className="mt-7 max-w-[820px] text-[clamp(2rem,5vw,3.65rem)] leading-[1.13] tracking-[-0.028em] text-white" style={{fontFamily:face.css,fontWeight:weight}}>
                Intelligence begins with <span className="block intel-text-gradient-bright">infrastructure.</span>
              </h2>
              <p className="mt-7 max-w-[530px] text-sm leading-[1.8] text-[#C5DCEB] sm:text-base">From data centres and networks to AI-ready computing and secure environments, KABO brings the technology foundations together.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="inline-flex min-h-11 items-center bg-[#55D8F5] px-5 text-sm font-semibold text-[#03182D]">Explore solutions ↗</span>
                <span className="text-sm font-medium text-white">Start a project →</span>
              </div>
            </div>
          </section>
          <section className="rounded-2xl border border-[#D5E2EB] bg-white p-6 sm:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0071C5]">Body headings / {face.name}</p>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.75rem)] tracking-[-0.025em] leading-[1.2]" style={{fontFamily:face.css,fontWeight:600}}>Solutions engineered for <span className="text-[#0071C5]">Africa’s reality.</span></h2>
            <p className="mt-3 max-w-[700px] text-sm leading-[1.8] text-[#5B7082] sm:text-base">A consistent hierarchy across products, industries and services. Ordinary body copy stays in Poppins for clear, comfortable reading.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                ["AI-ready infrastructure","Resilient foundations for modern workloads."],
                ["Enterprise networking","Secure connectivity across your organisation."]
              ].map(([title,description])=><article key={title} className="rounded-xl border border-[#DCE6EF] bg-[#F7FAFC] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0071C5]">Solution capability</p>
                <h3 className="mt-3 text-[22px] text-[#0A2944]" style={{fontFamily:face.css,fontWeight:600}}>{title}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-[#64798C]">{description}</p>
              </article>)}
            </div>
          </section>
          <p className="px-1 text-xs text-[#62798B]">Selected: {face.name} · {weight} · {face.characteristic}. Compare this specimen with the real website preview from the header link.</p>
        </div>
      </div>
    </main>
  );
}
