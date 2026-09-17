import nodemailer, { type Transporter } from "nodemailer";

/**
 * SMTP-based email utility.
 *
 * Configuration (set in .env or Vercel project settings):
 *   SMTP_HOST     — e.g. smtp.office365.com, smtp.gmail.com, smtp.sendgrid.net
 *   SMTP_PORT     — 587 (STARTTLS, default) or 465 (TLS)
 *   SMTP_SECURE   — "true" for port 465, omit/blank for 587
 *   SMTP_USER     — username (usually the full email address)
 *   SMTP_PASSWORD — password or app-specific password
 *   SMTP_FROM     — From header, e.g. "KABO IT Group <noreply@kaboitgroup.co.za>"
 *
 * If SMTP_HOST is not set, emails are logged to the server console instead of
 * being sent. This lets the site run in development without an SMTP relay,
 * and fail soft in production if credentials are misconfigured.
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
