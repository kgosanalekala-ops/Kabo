# PROJECT_STATE — KABO Next.js original-flow restoration

Updated: 23/10/2026 (Africa/Johannesburg)
Repository: kgosanalekala-ops/Kabo
Review branch: codex/kabo-original-flow-motion-review-20261023
Base: main
Original flow reference: historical commit 3bc49e1f2ab3 (22/09/2026)

## Locked design and content decisions
- Original Next.js homepage workflow and all 12 sections in their original order: Hero, About, Framework, Solutions, AI Infrastructure, Core Services, Procurement Advantage, Why KABO, Thought Leadership, Resources, Investor, Contact.
- Use all existing original KABO section/page components and their existing content; preserve normal page routes.
- Retain the newer flagship header/navigation interaction and footer, including governance pop-ups.
- Preserve the approved KABO logo assets: /logos/kabo-logo-white.png, /logos/kabo-logo-dark.png. No new logo.
- Approved colour system: Deep Navy #001E3C; Enterprise Blue #0071C5; Deep Blue #003865; Cyan #00C7FD; white backgrounds, soft blue surfaces, readable dark text.
- Avoid muted grey/green, very small fonts, and overlay/floating statistic cards.
- Maintain Framer Motion hero transitions, original section animations, route transitions, scroll progress. Respect reduced-motion preferences.
- No 3D compass, Blender scene, interactive Architecture Studio, or architecture-studio navigation in this review.
- Include dedicated original page content for About, Solutions, Products, Industries, Services, Partners, Case Studies, Procurement, Investor, Support, Contact, RFQ, etc.
- Company detail is concentrated on Contact page as previously preferred.

## Implemented on review branch
- Added src/components/kabo/original-router.tsx to compose 12-section homepage and route to the original dedicated pages.
- Switched src/components/flagship/vision-site.tsx to OriginalRouter while retaining NextHeader, SiteFooter, MotionDirector and BottomTools; updated navigation and search to source original solutions.
- Removed the two floating stat overlays from src/components/kabo/about.tsx; retained the content and imagery below.
- Updated src/app/vision.css theme overrides to KABO blues, increased nav/footer/popup typography, and fixed broad paragraph margin reset that interfered with original Tailwind spacing.
- Preserved production branch main unchanged.

## Verification
- GitHub connector accepted five commits; compare main..review reports 5 commits ahead, 0 behind, exactly five changed files.
- GitHub commit status for 9c3f33966e8f37ad831d6ec8b56636c8b20dbd44 reports Vercel=success (the remote build pipeline completed). This is CI-status evidence only, not a manually inspected preview.
- Static inspection confirmed named components and route imports on source branch.
- NOT YET VERIFIED: Next.js build, lint, real-browser responsive visuals, overlay keyboard behavior, API submissions, deployment.
- Direct preview inspection BLOCKED: existing Vercel kabo project prj_QaHo6R5wMS8XY1FQrdgYYZjKqsni is under team kabo2 and the Vercel connector returned 403 requiring team-level authorization. Do not use another team/account to bypass.
- Previous reference videos are not present in this workspace; precise frame-by-frame comparison must wait for an accessible upload/source.

## Pre-publication risk
- Some retained original website content includes claims about B-BBEE status, OEM alliances, nationwide availability, technical support operations and partner authorization. Verify supporting documentation before publishing. Do not silently rewrite content in a design review.

## Next steps
1. Restore Vercel team authorization or use a user-approved alternative preview environment.
2. Build and lint this exact branch; fix errors from captured logs.
3. Visually inspect desktop, tablet and mobile; compare with original and liked header/footer.
4. Verify keyboard/mouse/touch navigation, search, clean legal modals, reduced motion, and contact/RFQ functions.
5. Share review preview, gather approval; only then merge/deploy to live KABO domain.
