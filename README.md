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

# 2. Copy environment variables (optional — site runs without SMTP)
cp .env.example .env.local

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

## Email Configuration

The site has three forms that send emails:

| Form | Recipient | CC | Auto-reply to customer |
|------|-----------|----|----------------------|
| Support Ticket | support@kaboitgroup.co.za | info@kaboitgroup.co.za | ✓ |
| General Enquiry | info@kaboitgroup.co.za | — | ✓ |
| Investor Enquiry | kenny@kaboitgroup.co.za | info@kaboitgroup.co.za | ✓ |

**"Everyone sees tickets lodged"** — support tickets are CC'd to info@ so the whole team has visibility.

### SMTP Setup

Configure SMTP in your `.env.local` (development) or Vercel project settings (production):

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@kaboitgroup.co.za
SMTP_PASSWORD=your-app-specific-password-here
SMTP_FROM="KABO IT Group <noreply@kaboitgroup.co.za>"
```

**Without SMTP configured**, the site still works — form submissions are logged to the server console and the UI shows the auto-reply. Emails just don't actually get delivered until SMTP is set up.

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

3. **Set Environment Variables**
   - In Vercel: Project → Settings → Environment Variables
   - Add all variables from `.env.example` (SMTP_HOST, SMTP_PORT, etc.)
   - Redeploy after adding variables

4. **Configure DNS**
   - In Vercel: Project → Settings → Domains
   - Add your domain (e.g. `www.kaboitgroup.co.za`)
   - Add the DNS records Vercel shows you at your domain registrar

5. **Verify Email Domain**
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
│   │   ├── tickets/route.ts    # Support ticket endpoint
│   │   ├── contact/route.ts    # General enquiry endpoint
│   │   └── investor/route.ts   # Investor enquiry endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── kabo/                   # KABO-specific components
│   │   ├── pages/              # Page-level components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   └── ...
│   └── ui/                     # shadcn/ui components
└── lib/
    ├── email.ts                # SMTP email utility
    └── utils.ts
```

## Support

For questions about this codebase, contact the developer. For KABO business enquiries, use the website's contact form.
