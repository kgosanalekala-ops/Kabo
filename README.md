# KABO IT Group — Website

The official website for KABO IT Group — a Pretoria-headquartered systems integrator delivering enterprise-grade compute, data, networking, security and AI infrastructure across South Africa.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York) + Lucide icons
- **Animations**: Framer Motion
- **Email**: Nodemailer (SMTP)
- **Notifications**: Sonner (toast)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables (optional — site runs without SMTP/WhatsApp)
cp .env.example .env.local

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

## Form Submissions — How They Reach KABO

The site has three forms. Every submission is delivered to KABO via **two parallel channels** — at least one must be configured for the submission to actually reach the team:

| Form | API Route | Email Recipient | CC | WhatsApp |
|------|-----------|-----------------|----|----------|
| General Enquiry | `/api/contact` | info@kaboitgroup.co.za | — | ✓ |
| Support Ticket | `/api/tickets` | support@kaboitgroup.co.za | info@kaboitgroup.co.za | ✓ |
| Investor Enquiry | `/api/investor` | kenny@kaboitgroup.co.za | info@kaboitgroup.co.za | ✓ |

### Channel 1 — SMTP Email (primary, customer-facing)

Sends the polished HTML auto-reply to the customer AND the team notification email.

Configure in `.env.local` (development) or Vercel project settings (production):

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@kaboitgroup.co.za
SMTP_PASSWORD=your-app-specific-password-here
SMTP_FROM="KABO IT Group <noreply@kaboitgroup.co.za>"
```

### Channel 2 — WhatsApp Cloud API (silent team notification)

**Recommended as a backup** — guarantees the KABO team sees every submission even if SMTP is misconfigured or the inbox quarantines the message. Sends silently server-side; the visitor only ever sees the email-style acknowledgement in the UI.

```env
WHATSAPP_TOKEN=your-meta-permanent-access-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
WHATSAPP_TO_NUMBER=27612854418   # KABO SA mobile, +27 612 85 4418
```

**One-time setup (~10 min):**
1. Go to https://developers.facebook.com/ → My Apps → Create App → Business → Add product "WhatsApp"
2. In WhatsApp → API Setup, copy:
   - Permanent Access Token → `WHATSAPP_TOKEN`
   - Phone Number ID → `WHATSAPP_PHONE_NUMBER_ID`
3. From a phone that has the KABO WhatsApp number in its contacts, send any message to your WhatsApp Business number once — this opts in the recipient (Meta requires this for Cloud API sends).
4. Leave the three vars blank to disable WhatsApp delivery (SMTP-only).

### Visibility Rules

- **`kenny@kaboitgroup.co.za` is never shown to website visitors.** It only exists server-side in `/api/investor/route.ts`. The investor page publicly displays `info@kaboitgroup.co.za` as the executive contact.
- The WhatsApp silent notification is invisible to visitors — the form's confirmation screen always shows the email-style acknowledgement.
- The WhatsApp **click-to-chat link** in the footer ("Chat on WhatsApp") is a visible engagement channel for visitors who prefer to start a conversation directly. It opens WhatsApp on `+27 612 85 4418` with a pre-filled greeting.

### Common SMTP Providers

| Provider | Host | Port | User |
|----------|------|------|------|
| Microsoft 365 | smtp.office365.com | 587 | full email |
| Gmail (App Password) | smtp.gmail.com | 587 | full email |
| SendGrid | smtp.sendgrid.net | 587 | apikey |
| Postmark | smtp.postmarkapp.com | 587 | server API token |
| Brevo | smtp-relay.brevo.com | 587 | full email |

## Deployment (Vercel via GitHub)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit — KABO IT Group website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/kabo-website.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Framework preset: **Next.js** (auto-detected)
   - No build settings need to be changed

3. **Set Environment Variables** ← THIS IS THE STEP THAT MAKES FORMS ACTUALLY DELIVER
   - In Vercel: Project → Settings → Environment Variables
   - Add SMTP_* variables (Channel 1 — required for the customer to receive an auto-reply)
   - Add WHATSAPP_* variables (Channel 2 — recommended; guarantees KABO sees every submission)
   - **Redeploy** after adding variables (Deployments → ⋯ → Redeploy)

4. **Verify Deployment**
   - Submit a test enquiry via the Contact page
   - Check Vercel function logs: Deployments → ⋯ → Logs → filter for `[delivery]`
   - You should see one of:
     - `[delivery] Submission delivered via both email and WhatsApp.` ← both channels working
     - `[delivery] SMTP not configured — submission delivered via WhatsApp only.` ← only WhatsApp configured (customer doesn't get auto-reply)
     - `[delivery] Submission delivered via email; WhatsApp not configured.` ← only SMTP configured
     - `[delivery] Both SMTP and WhatsApp failed to deliver.` ← neither channel configured

5. **Configure DNS**
   - In Vercel: Project → Settings → Domains
   - Add your domain (e.g. `www.kaboitgroup.co.za`)
   - Add the DNS records Vercel shows you at your domain registrar

6. **Verify Email Domain**
   - Make sure your SMTP provider allows sending from `noreply@kaboitgroup.co.za`
   - For Microsoft 365: the SMTP user must be a licensed mailbox
   - For Gmail: use an App Password (not your account password)
   - For SendGrid/Postmark/Brevo: verify the sending domain first

## Build Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run start    # Start production server (after build)
npm run lint     # ESLint check
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── tickets/route.ts    # Support ticket endpoint (→ support@ + WhatsApp)
│   │   ├── contact/route.ts    # General enquiry endpoint (→ info@ + WhatsApp)
│   │   └── investor/route.ts   # Investor enquiry endpoint (→ kenny@ + WhatsApp)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── kabo/                   # KABO-specific components
│   │   ├── pages/              # Page-level components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx          # ← WhatsApp click-to-chat link lives here
│   │   ├── hero.tsx
│   │   └── ...
│   └── ui/                     # shadcn/ui components
└── lib/
    ├── email.ts                # SMTP + WhatsApp delivery utility
    └── utils.ts
```

## Support

For questions about this codebase, contact the developer. For KABO business enquiries, use the website's contact form or WhatsApp +27 612 85 4418.
