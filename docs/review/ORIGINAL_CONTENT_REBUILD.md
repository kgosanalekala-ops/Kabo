# KABO original-content redesign — 23 October 2026

The latest user instruction supersedes the October handover and both rejected redesigns. Final 5 Clean supplies **business content and original branding only**. All active layouts, navigation, typography, visual composition and motion are new. Architecture Studio is removed.

## Source and fallback

- Uploaded archive: `kabo-website-deploy Final 5 Clean.zip`.
- SHA256: `2cc21c45240e22c15c740821bec5d2ec27c4f27628e0ee5b97605173daca1b0f`.
- Exact original source commit: `3bc49e1f2ab38cf4e88247d877036848d33701a5` (89/89 non-generated ZIP files matched).
- Recovery tag: `kabo-original-approved-fallback-20261023`.
- New branch starts at that exact original commit. Rejected cinematic implementation remains safely on its separate branch; none of its design components are active here.

## Active implementation

- `src/components/elevated/`: entirely new homepage, navigation, footer, editorial catalogues, company pages, contact/support pages and enquiry forms.
- Original `data.ts`, `products-data.ts`, `industries-data.ts` supply the detailed technical/business content. Original legacy presentation files remain for source history, but the new app does not render them.
- Twelve solution domains, ten product categories, nine industry briefs, fifteen strategic partners and six extended vendors retain their detailed content.
- Company mission, values, journey, ten services, full case-study records, delivery methodology and investor narrative remain available.
- Real Three.js cobalt glass sculpture: closed thick curved shells, refractive materials, environment reflections, pointer and scroll response. Visibility/pause/reduced-motion handling and static fallback are included.
- Browser URLs, Back/Forward and direct reload work across the business pages. Unknown routes, including Studio, return 404.
- Separate Contact, Support and Investor APIs retain their original response contracts and now require provider acceptance before success. Browser failure retains typed data and offers a complete draft in the visitor’s email app.

## Review only

Do not merge or deploy to the production domain without the user’s explicit approval. Use a separate temporary public preview. The original tag is available for restoration; neither `main` nor the production domain is changed by this branch.

Outbound form delivery requires the existing SMTP or WhatsApp environment configuration. Do not invent credentials or return false submission success. Put secrets in environment settings, never in source or chat. Public contact links and a prefilled email fallback work independently of a configured server transport.
