# Production review validation

23 October 2026. This evidence applies to the original-content redesign on `codex/kabo-original-elevated-20261023`, not the rejected cinematic build.

Public review URL: https://oti7c8-ip-90-96-191-71.tunnelmole.net

The temporary URL forwards to the actual Next.js production build. It is independent of the production domain and lasts only while the workspace and relay remain running. The relay sends a noindex header.

| Check | Result |
| --- | --- |
| `npm run build` (includes TypeScript) | Passed |
| `npm run lint` | Passed |
| Browser interactions | 22 passed; zero page errors |
| Responsive content and menu | 14 representative pages at 320×568, 360×640, 390×844, 768×1024 and 1440×1000; no horizontal overflow or broken images |
| Exact business/legal routes | All 65 valid routes returned 200 |
| Invalid and removed Studio routes | Five checked; all 404 |
| Actual API validation/unavailable delivery | 18 checks passed |
| Public HTTPS browser review | Desktop and phone: actual WebGL, navigation, full AI detail and Contact form; zero page/console errors |
| Public transport | 112 live HTTPS requests validated normally; no TLS verification disabled or certificate stores changed |
| Original assets and technical data | Byte-for-byte unchanged from the original upload commit |

Browser interaction coverage includes menu focus trapping and Escape/focus restoration, desktop mega-menu routing, portfolio search/reset, extended-vendor details, direct reload and Back/Forward, keyboard industry/method tabs, procurement disclosures, searchable support articles, all three enquiry failure/success/reset states, actual changing WebGL frames, pause and no-WebGL fallback.

Success responses in browser form checks are explicitly intercepted simulations, with no outbound messages. Actual backend invalid-input and unconfigured-delivery checks were exercised against the production server. SMTP and Meta WhatsApp credentials are absent in this cloud workspace. Therefore real outbound delivery is not verified or enabled here; unsuccessful delivery returns 503, retains the visitor’s input and offers a complete draft in their email app.

The public-browser test uses an isolated TLS-verified HTTP request relay for this cloud Chromium’s missing proxy CA. All responses are fetched live from the actual public HTTPS origin, with normal certificate validation. This does not modify the browser trust store.

Evidence files are in [evidence/](evidence/). The screenshots were captured from the public URL:

- [Desktop homepage](evidence/desktop-home.png)
- [Phone homepage](evidence/phone-home.png)

`main` remains at `0474327a059b716f980c4c0cff72e476ba48ae49`. The original fallback tag remains at `3bc49e1f2ab38cf4e88247d877036848d33701a5`. No production-domain deployment or merge has been performed.
