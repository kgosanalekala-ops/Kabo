import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { deliverFormSubmission, sendMail } from "@/lib/email";

/** Support enquiry delivery; this route does not create a persistent service-desk ticket. */
export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try { body = await req.json(); } catch {
      return NextResponse.json({ ok: false, error: "Please submit valid JSON." }, { status: 400 });
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ ok: false, error: "Please submit a support enquiry object." }, { status: 400 });
    }
    const form = body as Record<string, unknown>;
    const limits: Record<string, number> = { category: 150, priority: 2, subject: 300, description: 8000, fullName: 300, email: 254, phone: 80, organisation: 300, contractRef: 250 };
    const required = ["category", "subject", "description", "fullName", "email"];
    if (required.some(key => typeof form[key] !== "string" || !(form[key] as string).trim()) ||
        Object.entries(limits).some(([key, limit]) => form[key] !== undefined && (typeof form[key] !== "string" || (form[key] as string).length > limit))) {
      return NextResponse.json({ ok: false, error: "Please check the required support details and field lengths." }, { status: 400 });
    }
    const fields: Record<string, string> = {};
    for (const key of Object.keys(limits)) fields[key] = typeof form[key] === "string" ? (form[key] as string).trim() : "";
    const { category, priority, subject, description, fullName, email, phone, organisation, contractRef } = fields;
    if (!/^[^\s@<>,;:"]+@[^\s@<>,;:"]+\.[^\s@<>,;:"]+$/.test(email) ||
        subject.length < 5 || description.length < 20 ||
        priority && !["P1", "P2", "P3", "P4"].includes(priority) ||
        Object.entries(fields).some(([key, value]) => value.includes("\0") || key !== "description" && /[\r\n]/.test(value))) {
      return NextResponse.json({ ok: false, error: "Please check your email, subject, issue description and support details." }, { status: 400 });
    }

    const now = new Date();
    const ticketNumber = `KABO-${now.getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;
    // Keep the original UI response fields, while describing only what this endpoint does.
    const autoReply = {
      ticketNumber,
      priority: priority ? `${priority} requested — awaiting triage` : "Awaiting triage",
      slaResponse: "Subject to your confirmed support agreement",
      slaWindow: "Coverage and response arrangements must be confirmed",
      category,
      acknowledgement: "Your support enquiry has been sent to the KABO support team. Keep this reference for follow-up. Your service agreement determines response times and escalation arrangements.",
      nextSteps: [
        "Keep this enquiry reference for follow-up correspondence.",
        "The team can review the issue details and request additional information where appropriate.",
        "Support entitlement, priority, escalation and response arrangements are confirmed against the agreed scope.",
        "To follow up, contact support@kaboitgroup.co.za and include your enquiry reference.",
      ],
      escalationPath: [
        { tier: "Support intake", role: "Review the enquiry and confirm scope", window: "Response arrangements to be confirmed" },
        { tier: "Technical review", role: "Engineering coordination where agreed", window: "Per support agreement" },
        { tier: "Manufacturer support", role: "Escalation where entitlement is confirmed", window: "Subject to manufacturer terms" },
        { tier: "Commercial review", role: "Contract and scope questions", window: "By arrangement" },
      ],
      contact: {
        email: "support@kaboitgroup.co.za",
        noc: "Support coverage confirmed per agreement",
        portal: "KABO Support Enquiries",
      },
      createdAt: now.toISOString(),
    };
    const teamText = [
      "KABO SUPPORT ENQUIRY", `Enquiry reference: ${ticketNumber}`, `Received by API: ${now.toISOString()}`,
      `Requested priority: ${priority || "Not specified"}`, `Category: ${category}`, `Subject: ${subject}`,
      "", `Name: ${fullName}`, `Email: ${email}`, `Phone: ${phone || "—"}`,
      `Organisation: ${organisation || "—"}`, `Contract reference: ${contractRef || "—"}`,
      "", "Description:", description,
      "", "This notification does not establish a contractual SLA or confirm a service-desk assignment.",
    ].join("\n");
    const delivery = await deliverFormSubmission(
      { to: "support@kaboitgroup.co.za", cc: "info@kaboitgroup.co.za", replyTo: email, subject: `[${ticketNumber}] ${subject}`, text: teamText, html: emailDocument("Support enquiry", teamText) },
      {
        kind: "Support enquiry", headline: `${ticketNumber} — ${subject}`,
        fields: [{ label: "Contact", value: fullName }, { label: "Email", value: email }, { label: "Category", value: category }, { label: "Contract reference", value: contractRef || "—" }],
        body: description,
      }
    );
    if (!delivery.accepted) {
      return NextResponse.json({ ok: false, error: "Your support enquiry could not be delivered. Please email support@kaboitgroup.co.za directly." }, { status: 503 });
    }

    const customerText = [
      "KABO IT Group — Support Enquiry Acknowledgement", `Enquiry reference: ${ticketNumber}`,
      "", autoReply.acknowledgement, "", ...autoReply.nextSteps,
      "", "Support: support@kaboitgroup.co.za", "https://www.kaboitgroup.co.za",
    ].join("\n");
    const acknowledgement = delivery.email.sent ? await sendMail({
      to: email, replyTo: "support@kaboitgroup.co.za", subject: `[${ticketNumber}] Your support enquiry was accepted for delivery`,
      text: customerText, html: emailDocument("Support enquiry acknowledgement", customerText),
    }) : { sent: false };
    return NextResponse.json({ ok: true, ticket: autoReply, deliveryChannel: delivery.channel, acknowledgementSent: acknowledgement.sent });
  } catch {
    console.error("[POST /api/tickets] Unable to process the submission.");
    return NextResponse.json({ ok: false, error: "Unable to submit your support enquiry. Please email support@kaboitgroup.co.za directly." }, { status: 500 });
  }
}

function emailDocument(title: string, text: string): string {
  return `<div style="font-family:system-ui,sans-serif;max-width:640px;margin:auto;padding:24px;color:#001e3c"><h1 style="font-size:22px;color:#0071c5">KABO IT Group — ${escapeHtml(title)}</h1><div style="white-space:pre-wrap;line-height:1.6;font-size:14px">${escapeHtml(text)}</div></div>`;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
