import nodemailer, { type Transporter } from "nodemailer";

/**
 * Delivery utility for form submissions.
 *
 * Two delivery channels are supported and BOTH are attempted in parallel:
 *
 *   1. SMTP email (Nodemailer)        — primary, customer-facing auto-reply
 *   2. WhatsApp Cloud API (Meta)       — silent server-side notification to
 *                                       the KABO team's WhatsApp number
 *
 * Why two channels?
 *   - SMTP delivers the polished HTML auto-reply to the customer.
 *   - WhatsApp guarantees the KABO team actually sees the submission even
 *     if SMTP is misconfigured, the inbox is full, or a spam filter eats
 *     the message. The visitor never sees that WhatsApp was used — the UI
 *     always shows the email-style acknowledgement.
 *
 * Configuration (set in .env.local or Vercel project settings):
 *
 *   # SMTP (customer-facing auto-reply + team email)
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD, SMTP_FROM
 *
 *   # WhatsApp Cloud API (silent team notification)
 *   WHATSAPP_TOKEN           — Meta Cloud API permanent access token
 *   WHATSAPP_PHONE_NUMBER_ID — Meta-issued phone number ID (sender)
 *   WHATSAPP_TO_NUMBER       — destination MSISDN, e.g. 27612854418
 *                              (defaults to 27612854418 = KABO mobile)
 *
 * If a channel is not configured, it silently no-ops (logged to server
 * console). The site still works — the form just doesn't actually deliver
 * until at least one channel is configured.
 */

let cachedTransport: Transporter | null = null;

function getTransport(): Transporter | null {
  if (!process.env.SMTP_HOST) return null;
  if (cachedTransport) return cachedTransport;

  cachedTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD || "" }
      : undefined,
    // Office 365 / Gmail sometimes need a moment for the TLS handshake.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return cachedTransport;
}

export interface SendMailInput {
  to: string;
  cc?: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}

export interface SendMailResult {
  sent: boolean;
  messageId?: string;
  preview?: string;
  error?: string;
}

export async function sendMail(input: SendMailInput): Promise<SendMailResult> {
  const transport = getTransport();

  // No SMTP configured — log to console and return soft-success.
  // The API route still returns the auto-reply payload to the UI, so the
  // user-facing experience is unaffected. The email just doesn't actually
  // get delivered until SMTP env vars are set.
  if (!transport) {
    console.log(
      "\n[email] SMTP not configured — would have sent:\n" +
        `  To: ${input.to}\n` +
        (input.cc ? `  Cc: ${input.cc}\n` : "") +
        (input.replyTo ? `  Reply-To: ${input.replyTo}\n` : "") +
        `  Subject: ${input.subject}\n` +
        `  ---\n${input.text.slice(0, 500)}\n  ---\n`
    );
    return { sent: false, preview: "logged-to-console" };
  }

  try {
    const info = await transport.sendMail({
      from: process.env.SMTP_FROM || "KABO IT Group <noreply@kaboitgroup.co.za>",
      to: input.to,
      cc: input.cc,
      replyTo: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error("[email] sendMail error:", err);
    return { sent: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ---------------------------------------------------------------------------
// WhatsApp Cloud API — silent server-side team notification
// ---------------------------------------------------------------------------

/**
 * Destination WhatsApp number for ALL silent team notifications.
 * Defaults to the KABO SA mobile: 27 612 85 4418 → 27612854418.
 *
 * Override per-environment with WHATSAPP_TO_NUMBER (e.g. for staging you
 * might want notifications routed to a test number).
 */
const DEFAULT_WHATSAPP_TO = "27612854418";

export interface SendWhatsAppInput {
  /** Short human label, e.g. "New General Enquiry". */
  kind: string;
  /** Headline — e.g. "Cloud & Hybrid Integration — Jane Doe". */
  headline: string;
  /** Key/value pairs to render as a WhatsApp-formatted list. */
  fields: { label: string; value: string }[];
  /** Optional longer free-text body (truncated to ~900 chars by Meta). */
  body?: string;
}

export interface SendWhatsAppResult {
  sent: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Silently sends a WhatsApp Cloud API template-less text message to the
 * KABO team. The visitor never sees this — it's a server-side notification
 * channel only.
 *
 * Requires a WhatsApp Business Account with the recipient having opted-in
 * (sent at least one message to the business) — Meta's Cloud API rule.
 * For internal KABO numbers (where the owner has already messaged the
 * business), this works out of the box.
 *
 * Env vars:
 *   WHATSAPP_TOKEN           — permanent access token from Meta App Dashboard
 *   WHATSAPP_PHONE_NUMBER_ID — from WhatsApp Manager → Phone Numbers
 *   WHATSAPP_TO_NUMBER       — optional override (default 27612854418)
 *
 * If env vars are missing, the function silently logs and returns
 * { sent: false }. The API route treats this as best-effort — the
 * customer-facing response is not affected.
 */
export async function sendWhatsAppNotification(
  input: SendWhatsAppInput
): Promise<SendWhatsAppResult> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.log(
      `[whatsapp] Not configured — would have sent:\n` +
        `  Kind: ${input.kind}\n` +
        `  Headline: ${input.headline}\n` +
        `  Fields: ${input.fields.map((f) => `${f.label}=${f.value}`).join(", ")}\n` +
        (input.body ? `  Body: ${input.body.slice(0, 200)}\n` : "")
    );
    return { sent: false };
  }

  const toNumber = (process.env.WHATSAPP_TO_NUMBER || DEFAULT_WHATSAPP_TO).replace(
    /[^0-9]/g,
    ""
  );

  // Build a WhatsApp-friendly plain-text body.
  // WhatsApp supports *bold* and _italic_ but we keep it plain for max
  // compatibility with the Cloud API's text message type.
  const lines: string[] = [
    `*KABO · ${input.kind}*`,
    input.headline,
    "",
    ...input.fields.map((f) => `${f.label}: ${f.value}`),
  ];
  if (input.body) {
    lines.push("", input.body);
  }
  const messageText = lines.join("\n").slice(0, 4000); // Meta hard limit is 4096

  const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: toNumber,
    type: "text",
    text: { body: messageText },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      // Don't hang the request pipeline if WhatsApp is slow.
      // Vercel function timeout is 10s on Hobby, 60s on Pro.
      // We give WhatsApp 8s max — if it can't deliver in that window,
      // the SMTP email is still the customer-facing source of truth.
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(
        `[whatsapp] Cloud API error ${res.status}: ${errText.slice(0, 400)}`
      );
      return { sent: false, error: `HTTP ${res.status}` };
    }

    const data = (await res.json()) as { messages?: { id?: string }[] };
    const messageId = data.messages?.[0]?.id;
    return { sent: true, messageId };
  } catch (err) {
    console.error("[whatsapp] send error:", err);
    return { sent: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Convenience wrapper: attempts both SMTP and WhatsApp in parallel.
 * Returns the SMTP result (the customer-facing channel). WhatsApp is
 * fire-and-forget — its result is logged but does not affect the HTTP
 * response, so the visitor never sees whether WhatsApp was used.
 *
 * This is the function the API routes should call.
 */
export async function deliverFormSubmission(
  mail: SendMailInput,
  whatsapp: SendWhatsAppInput
): Promise<SendMailResult> {
  // Fire both in parallel — neither blocks the other.
  const [mailResult, waResult] = await Promise.all([
    sendMail(mail),
    sendWhatsAppNotification(whatsapp),
  ]);

  if (!mailResult.sent && !waResult.sent) {
    console.warn(
      "[delivery] Both SMTP and WhatsApp failed to deliver. " +
        "At least one channel must be configured (SMTP_* or WHATSAPP_*)."
    );
  } else if (!mailResult.sent && waResult.sent) {
    console.log(
      "[delivery] SMTP not configured — submission delivered via WhatsApp only."
    );
  } else if (mailResult.sent && !waResult.sent) {
    console.log("[delivery] Submission delivered via email; WhatsApp not configured.");
  } else {
    console.log("[delivery] Submission delivered via both email and WhatsApp.");
  }

  // The HTTP response always reflects the SMTP/email channel — that's the
  // customer-facing one. The WhatsApp send is invisible to the visitor.
  return mailResult;
}
