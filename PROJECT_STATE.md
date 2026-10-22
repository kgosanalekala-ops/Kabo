# PROJECT_STATE — KABO Future Flagship Website

Updated: 22/10/2026 (Africa/Johannesburg)
Workstream: approved website refinement, preview-first.

## Locked decisions
- Preserve the approved KABO Future page structure, layout, navigation, typography, original logo and KABO Blue (#006197) visual system.
- Keep detailed company information on Contact only. Preserve the restored compact footer.
- Floating WhatsApp button must retain its recognisable WhatsApp mark; back-to-top must remain distinct.
- Preserve existing architecture scene geometry and imagery until the user selects replacement images.
- Never change the production website during exploratory refinement; use a reviewable Vercel preview.

## Source of truth
- Repository: `kgosanalekala-ops/Kabo`
- Production branch: `main`
- Baseline production commit: `0474327a059b716f980c4c0cff72e476ba48ae49`
- Vercel project: `prj_QaHo6R5wMS8XY1FQrdgYYZjKqsni`
- Review branch: `kabo-flagship-polish-20261022`

## Implemented on review branch
- Architecture Studio: keyboard tab navigation, accessible tabpanel naming, focus-contained inspector dialogue, Escape to close, focus restoration, polite selected-layer updates.
- Homepage: pauses automatic editorial slide changes during hover, keyboard interaction and when the document is hidden; honours reduced-motion preferences on Discover More scrolling.
- Enquiry: maps internal architecture identifiers to clear customer-facing service descriptions and announces submission state accessibly.

## Verification status
- Source changes committed on review branch: implemented.
- Production website: unchanged by this branch.
- TypeScript/Next.js build: pending Vercel preview build.
- Browser, keyboard, reduced-motion and physical device QA: pending.
- Enquiry mail delivery / SMTP end-to-end: not tested here.
- Image replacements: deferred until reviewed assets are approved.

## Definition of done
- Vercel preview READY on the review branch, with no compile errors.
- QA confirms no footer or layout regressions, keyboard/ESC interactions work, enquiry context remains accurate, and reduced-motion/hero behaviour is stable.
- User visually approves preview before production promotion.

## User feedback received during review (22/10/2026)
- Architecture Studio's **scene graphics**, not the inspector box layout, need a significant upgrade from flat 2D to engaging, performant, genuine 3D (e.g. interactive camera/orbit, selectable devices, directional data paths, contextual overlays).
- Experts from enterprise OEMs and technical engineering disciplines are the audience; diagrams must be technically defensible and illustrative scenarios must not imply an actual customer installation.
- Preserve approved header styling but re-evaluate repeated primary menu items inside the expanded site index. Propose useful new content/pages without inventing projects or qualifications.
- Images should be brighter, natural-looking and consistent with KABO Blue; image selections are intentionally deferred until separate review.
- User reported inability to scroll the preview while reviewing. This may be a scroll-locking overlay or a viewer/browser issue; root cause is **not verified**.
- Mitigation committed to the preview branch: Escape/backdrop can dismiss site navigation or search overlays, restoring body scroll. Browser diagnosis and user confirmation remain outstanding.
- Avoid modifying production without review.
