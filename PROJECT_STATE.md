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
