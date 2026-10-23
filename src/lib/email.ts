import nodemailer, { type Transporter } from "nodemailer";

/** Outbound provider acceptance, not a guarantee of inbox delivery or review. */
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
  error?: string;
}

export async function sendMail(input: SendMailInput): Promise<SendMailResult> {
  try {
    const transport = getTransport();
    if (!transport) {
      console.warn("[email] SMTP is not configured; no email was sent.");
      return { sent: false, error: "Email delivery is not configured." };
    }
    const info = await transport.sendMail({
      from: process.env.SMTP_FROM || "KABO IT Group <noreply@kaboitgroup.co.za>",
      to: input.to,
      cc: input.cc,
      replyTo: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });
    // A resolved send or a message ID alone does not establish recipient acceptance.
    // The SMTP transport reports the envelope recipients accepted by its server.
    if (!Array.isArray(info.accepted) || info.accepted.length === 0) {
      console.warn("[email] SMTP did not accept any recipient.");
      return { sent: false, error: "Email was not accepted by the mail service." };
    }
    return { sent: true, messageId: typeof info.messageId === "string" ? info.messageId : undefined };
  } catch {
    // Provider exceptions can contain recipient details, credentials or message text.
    console.error("[email] The mail service did not accept the message.");
    return { sent: false, error: "Email delivery failed." };
  }
}

const DEFAULT_WHATSAPP_TO = "27612854418";

export interface SendWhatsAppInput {
  kind: string;
  headline: string;
  fields: { label: string; value: string }[];
  body?: string;
}

export interface SendWhatsAppResult {
  sent: boolean;
  messageId?: string;
  error?: string;
}

/** Optional server-side team notification through the existing Meta Cloud API. */
export async function sendWhatsAppNotification(input: SendWhatsAppInput): Promise<SendWhatsAppResult> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) {
    console.warn("[whatsapp] The notification service is not configured; no notification was sent.");
    return { sent: false, error: "WhatsApp delivery is not configured." };
  }
  const toNumber = (process.env.WHATSAPP_TO_NUMBER || DEFAULT_WHATSAPP_TO).replace(/[^0-9]/g, "");
  if (!/^\d+$/.test(phoneNumberId) || !/^\d{8,15}$/.test(toNumber)) {
    console.error("[whatsapp] Notification destination configuration is invalid.");
    return { sent: false, error: "WhatsApp delivery configuration is invalid." };
  }
  const lines = [`*KABO · ${input.kind}*`, input.headline, "", ...input.fields.map(field => `${field.label}: ${field.value}`)];
  if (input.body) lines.push("", input.body);
  try {
    const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: toNumber,
        type: "text",
        text: { body: lines.join("\n").slice(0, 4000) },
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      console.error(`[whatsapp] The notification service rejected the request (HTTP ${response.status}).`);
      return { sent: false, error: `WhatsApp delivery failed (HTTP ${response.status}).` };
    }
    const result = await response.json() as { messages?: { id?: string }[] };
    const messageId = result.messages?.[0]?.id;
    if (typeof messageId !== "string" || !messageId.trim()) {
      console.warn("[whatsapp] The notification service did not confirm message acceptance.");
      return { sent: false, error: "WhatsApp acceptance was not confirmed." };
    }
    return { sent: true, messageId };
  } catch {
    console.error("[whatsapp] The notification service did not accept the message.");
    return { sent: false, error: "WhatsApp delivery failed." };
  }
}

export interface DeliveryResult {
  accepted: boolean;
  email: SendMailResult;
  whatsapp: SendWhatsAppResult;
  channel: "email" | "whatsapp" | "both" | "none";
}

/** Both configured channels are attempted; at least one must accept the lead. */
export async function deliverFormSubmission(mail: SendMailInput, whatsapp: SendWhatsAppInput): Promise<DeliveryResult> {
  const [email, notification] = await Promise.all([sendMail(mail), sendWhatsAppNotification(whatsapp)]);
  const channel = email.sent && notification.sent ? "both" : email.sent ? "email" : notification.sent ? "whatsapp" : "none";
  if (channel === "none") console.warn("[delivery] No outbound service accepted the submission.");
  return { accepted: channel !== "none", email, whatsapp: notification, channel };
}
