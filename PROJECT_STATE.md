# PROJECT_STATE — KABO IT Group Flagship Website

Updated: 22/10/2026 (Africa/Johannesburg)
Repository: `kgosanalekala-ops/Kabo`
Production branch: `main`
Integration branch: `kabo-3d-interactions-20261022`
Vercel project ID: `prj_QaHo6R5wMS8XY1FQrdgYYZjKqsni`

## Locked user decisions — authoritative
- Goal: a truly complete, premium corporate website. Deliver ONE integrated review, not successive incomplete proposals.
- User explicitly requests no further routine intervention or spoken progress reports; perform independent work and report a substantive verified result.
- Preserve the approved landing-page composition, navigation feel, motion, scrolled progress, privacy/rights/terms presentation, charcoal KABO logo with blue dot, overall KABO Blue #006197 palette, and highly regarded responsive mobile arrangement.
- Left/home visual and Architecture Studio were explicitly criticised as incomplete: replace generic hovering boxes with real, intelligible, illustrated infrastructure environments, buildings and specific equipment; provide connected topology/data paths and immediate click/tap contextual pop-ups; allow useful mobile exploration.
- Align all architecture artwork, cyan/blue lighting, text, focus/hover controls and overlays to approved KABO blue; remove legacy green/teal washes that distort the identity.
- Cover EIGHT major solution domains, consistent with procurement: connected campus, AI/accelerated compute, data centre, electronic security, WAN/SD-WAN, print/documents, cyber-resilience, and workplace equipment.
- All buttons, cards, links and drop-downs must actually work and clearly indicate their action. Close nav overlays upon selection, release scroll locking and make Company navigate to dedicated `/company` page, separate from `/about` (Our Approach).
- About KABO and other pages need genuinely informative, technically credible text for clients, OEMs and distributors; pages should be concise with supplementary detailed pop-ups rather than crowded layouts.
- No public prices, on website or PDFs; quotations are discussed upon enquiry.
- Two downloadable searchable PDFs: (1) detailed itemised KABO company profile stating actual equipment, supplies and services including A4 paper and laptops; (2) public solutions/approach overview without confidential implementation recipes. Print documents use charcoal KABO mark with blue dot on white, no ink-heavy dark top bands. Corporate profile still requires more sophisticated images/graphics and polish.
- Do not assert unsupported qualifications, projects, OEM authorisations, facilities, guaranteed delivery or stock levels. Treat illustrative environments as representative designs, not client implementations.
- Do not release or claim QA completeness without evidence. User wants the final, suitable release to go live, not the existing incomplete production.

## Implemented and committed on integration branch
- Eight domain-specific illustrated environment definitions and assets replace identical floating-box scenes; perspective/orbit, zoom, links and selectable components remain. Their quality is not yet visually approved.
- Hotspot selection opens the explanatory detail dialog immediately, with keyboard focus management and dismissal support.
- Expanded `/company` corporate content: company context, eight detailed capability domains, delivery process, client sectors and precise equipment/service descriptions in working pop-ups.
- Procurement cards now open itemised details instead of immediately sending visitors to RFQ. Ecosystem cards open contextual explanation with an explicit enquiry route.
- CSS aligns scene illustrations and studio accents to blue; explanatory dialogs and mobile tap targets received responsive styling.
- Eight-domain routing for Architecture Studio and quote contexts, including direct routes `/architectures/{slug}`; corrected older five-architecture page label.
- Company/about separate routes and nav-close work pre-existed on this branch.
- Search results expose company profile and solutions overview PDF routes; the PDF writer creates white, itemised printable pages and now includes eight distinct original vector infrastructure plates in the company profile. Photographic quality, exact supplied logo and PDF rendering still require separate visual verification.

## Confirmed verification evidence
- GitHub branch source exists and file updates are committed.
- Vercel preview at commit `92fff17f2e9799dc9a764fd88f28baba87b5c648` reported READY: `https://kabo-2ikw4fcmm-kabo2.vercel.app` (deployment `dpl_HgTUp5soRBBbgANxCBTwb5Mx2caa`). This verifies deployment/build readiness, **not** end-user browser QA.
- Commit `5930d9a888e0b729ae8e56420f0c293666cd976f` corrected deep-linked architecture and all eight enquiry context labels. The latest PDF-graphics commit above also passed the Vercel deployment state check.
- Vercel is configured with SSO protection on non-custom deployments; direct external visual/browser testing may be blocked. Do not claim a completed independent visual/browser smoke test without a recorded result.
- Production branch `main` has not been promoted from this branch.

## Outstanding / blockers
- Browser walkthrough on desktop and real mobile: navigation, same-route overlay dismissals, search, all 8 scenes/hotspots/pop-ups, focus trap, reduced motion, drag/orbit, viewport and scroll-lock regressions.
- Document PDF visual production-quality redesign with the true provided brand mark and tasteful graphical/images; confirm rendering, pagination, accessibility, downloads and wording.
- Confirm no unverified copy/OEM claims and no prices on public pages.
- Current PDF-graphics HEAD is confirmed READY, but browser access and build logs are restricted. A Vercel build-log request returned a 403 requiring team-level authorisation; do not request additional user interaction unless independently required for release.
- QA for enquiry form back-end mail delivery remains unconfirmed.
- Performance checks for long animated pages and low-powered mobile handsets remain outstanding.
- Full user visual approval and safe production promotion only after verified readiness.

## Definition of done
A complete coherent desktop/mobile website with premium legible, blue-consistent environment illustrations, 8 useful scenes, working pop-ups and navigation, complete publications, searchable resources, no public prices, verified browser/build/contact/PDF flows, and an approved preview promoted to production; production smoke-tested.

## Responsive navigation and equipment hero review — 22/10/2026
- User reconfirmed the existing navigation and logo are locked; only its sizing, animation and overlay usability may be refined. Mobile, tablet and desktop must each fit without a clipped menu.
- Added a compact CSS Grid site index (two columns when space allows, one at very narrow widths), dynamic-viewport scroll containment, smaller header and restrained hover/focus motion. The original eight destinations and header actions remain.
- Reworked the photo-first hero to group the HPE, H3C and Hikvision product photography with depth, restrained CSS movement and a grounded photographic scene. This is an **interim 2.5D presentation**, not a true rotating mesh or 360-degree product model. Never describe it as the promised real GLB 3D.
- The rotating headline states already cycle every 8.5 seconds and now carry a photographic equipment grouping per story.
- The existing image-based eight-domain architecture viewer and hotspots are preserved.
- Verified locally: `npm run build` passed (Next.js 16.3.5); `npm run lint` passed with one pre-existing internal navigation advisory in configurator-page.tsx.
- Figma authenticated successfully after reconnection, and a KABO responsive design-review file was created. Its actual design composition is still outstanding.
- Remaining: inspect responsive browser screenshots at phone/tablet/desktop sizes, real manufacturer 3D mesh sourcing, end-to-end overlay testing, final approval and production release.

## Static cross-file coverage audit — 22/10/2026
- GitHub source checks: 8/8 solution domains, 8/8 procurement catalogue sections, and 8 unique Architecture Studio scene definitions.
- Every solution domain maps to a defined scene; no unmapped architecture type.
- Company route, industry pop-up, procurement detail dialog, and direct architecture hotspot dialog handlers are present in the code.
- Four source links to two PDF download endpoints found across public search/company/about.
- No literal ZAR price-like strings detected in the main site component during this static audit.
- Preview for source commit `92fff17f2e9799dc9a764fd88f28baba87b5c648` and subsequent documentation commit `b9822dc6192de40113ad71c9ec5dce6ecf061765` both returned Vercel READY.
- These checks are **not** substitutes for real browser, mobile, PDF rendering, runtime API, mail and visual QA.
