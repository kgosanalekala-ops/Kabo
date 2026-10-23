# KABO cinematic website review — 23 October 2026

Review branch: `codex/kabo-cinematic-review-20261023`.

The supplied `CODEX_HANDOVER.md` and `PROJECT_STATE.md` were read completely before implementation. The current user's request supersedes the historical pause recorded in the attachment. Production promotion is not authorised.

## Review preview

Public review URL: https://ai7yue-ip-90-96-191-71.tunnelmole.net

This temporary review relay points to the production build in the running cloud workspace. The workspace and relay process must remain running; restarting them can change the URL. It is separate from the production domain. The existing Vercel project protects its preview deployments with SSO; its API currently has no usable Vercel authentication binding.

## Implemented

- Original Three.js laptop, live chapter screen, illuminated glass platform, blue architectural environment and adaptive camera. Lighting, silhouette and movement follow the primary `1000511288.mp4` reference. The pale blue sculptural reference informed the material restraint and mobile composition.
- Three coordinated compute, campus and security stories with explicit pause, accessible selectors and horizontal touch gestures. Vertical scrolling stays native. Reduced-motion and server-rendered WebGL fallback treatments are available.
- New connected homepage, detailed interior visual system and separate eight-environment Architecture Studio. Full scenes appear immediately; proportional equipment hotspots open explanations directly. Only the actual spherical campus concept has a 360° mode.
- Approved navigation and footer retained with keyboard containment, Escape dismissal and focus restoration. Company and Our Approach remain distinct.
- Original eleven detailed technology areas, ten product categories and sixteen industry perspectives retained alongside expanded company, services, procurement and enquiry content. Old technology deep links resolve to their own content rather than an unrelated default page.
- Configurator selections carry into an editable quotation brief. Contact, support and investor enquiries retain their separate API workflows. Unconfigured delivery returns an honest error. Public UI does not expose the private executive inbox or repeat the company address outside Contact.
- Search, legal dialogs, deep links, downloadable company profile and solutions overview. PDFs use the supplied KABO mark on white, embedded licensed fonts, searchable text, equipment/service details, A4 paper and laptops. No public prices were added.

## Original approved fallback

The clean original upload was compared by Git blob hashes: **all 89 source/configuration/asset files match commit `3bc49e1f2ab38cf4e88247d877036848d33701a5`**. Generated `.next` files were excluded from this comparison.

Named recovery tag: `kabo-original-approved-fallback-20261023`.

To inspect the original without resetting or overwriting review work, preserve any uncommitted changes and create a branch at the tag:

```bash
git switch -c review/original-approved kabo-original-approved-fallback-20261023
```

The exact uploaded archive is also retained in the cloud workspace. SHA-256: `2cc21c45240e22c15c740821bec5d2ec27c4f27628e0ee5b97605173daca1b0f`. A verified complete pre-change Git bundle is at `/workspace/reference/backups/kabo-before-codex-20261023.bundle`. No production reset or promotion was performed.

## Verification

- `npm run build`: passed, including Next.js TypeScript and route generation.
- `npm run lint`: passed with zero findings.
- 22 main browser cases passed: stories, pause, real CDP touch swipes, native scrolling, mobile navigation, focus containment, same-route dismissal, search, legal dialogs and detailed page routes.
- 17 Studio/form/fallback cases passed, exercising all 36 equipment hotspots across eight environments, short-phone dialogs, zoom, spherical campus rendering, all three forms' accepted/error UI states, RFQ prefill, contact-only location information, reduced motion and a JavaScript-disabled scene fallback.
- Seven API/PDF cases passed. Invalid submissions were rejected. Both documents downloaded and yielded searchable text; unknown pages/documents returned 404.
- Four responsive browser captures passed at 1440×1000, 768×1024, 360×800 and 360×640. The scene rendered as WebGL, changed between animation frames and produced no page errors, broken images or page overflow. Text/action bounds were checked separately at all four sizes.
- All 66 public sitemap routes returned rendered headings. Original technology deep links were checked on a phone viewport for their actual distinct content.

Evidence is in [review/](review/), including screenshots, structured outcomes and the PDF cover. Browser checks use Chromium; they are responsive browser simulations, not a claim of testing the user's physical devices. Initial failures exposed a short-phone dialog translation issue and stale location wording; these were corrected and affected checks rerun successfully.

Actual SMTP/WhatsApp message delivery was not exercised. Form success/error browser checks intercepted the outgoing requests, so no test messages were sent. The current local instance has neither delivery channel configured; deployment-specific bindings remain necessary for real delivery.

## Repeat the checks

Use the existing checkout; do not create a worktree unless explicitly requested. Dependencies and source are pinned by `package-lock.json`.

```bash
npm ci
npm run build
npm run start -- --hostname 0.0.0.0 --port 3001
```

From a separate terminal, with Chromium and Poppler utilities available:

```bash
export KABO_QA_URL=http://localhost:3001
npm run qa:browser
npm run qa:studio
npm run qa:api
npm run qa:capture
npm run qa:routes
```

Set `CHROMIUM_PATH` for a different installed Chromium executable, and `KABO_QA_OUTPUT` for a different evidence directory. Generated evidence under `artifacts/qa/` is ignored. Keep normal TLS verification enabled for any external checks.
