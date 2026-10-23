import { NextRequest, NextResponse } from "next/server";
import { deliverFormSubmission, sendMail } from "@/lib/email";

/**
 * POST /api/investor
 *
 * Handles investor enquiries — emails the enquiry directly to
 * kenny@kaboitgroup.co.za (with CC to info@ for team visibility) and
 * silently fires a WhatsApp notification to the KABO team as a backup
 * delivery channel. The visitor sees only the email-style acknowledgement
 * — neither kenny@kaboitgroup.co.za nor the WhatsApp number is exposed
 * in the UI or the JSON response.
 *
 * Sends an auto-reply to the investor.
 */
export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try { body = await req.json(); } catch {
      return NextResponse.json({ ok: false, error: "Please submit valid JSON." }, { status: 400 });
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ ok: false, error: "Please submit an enquiry object." }, { status: 400 });
    }
    const form = body as Record<string, unknown>;
    const limits: Record<string, number> = {fullName: 300, organisation: 300, email: 254, phone: 80, investorType: 150, fundSize: 150, timeline: 150, message: 8000};
    const required = ["fullName", "organisation", "email", "investorType", "message"];
    if (required.some(key => typeof form[key] !== "string" || !(form[key] as string).trim()) ||
        Object.entries(limits).some(([key, limit]) => form[key] !== undefined && (typeof form[key] !== "string" || (form[key] as string).length > limit))) {
      return NextResponse.json({ ok: false, error: "Please check the required investor details and field lengths." }, { status: 400 });
    }
    const fields: Record<string, string> = {};
    for (const key of Object.keys(limits)) fields[key] = typeof form[key] === "string" ? (form[key] as string).trim() : "";
    const { fullName, organisation, email, phone, investorType, fundSize, timeline, message } = fields;
    if (!/^[^\s@<>,;:"]+@[^\s@<>,;:"]+\.[^\s@<>,;:"]+$/.test(email) || Object.entries(fields).some(([key, value]) => value.includes("\0") || key !== "message" && /[\r\n]/.test(value))) {
      return NextResponse.json({ ok: false, error: "Please check your email address and investor details." }, { status: 400 });
    }

    const now = new Date();

    const autoReply = {
      routeTo: "KABO Executive Team",
      acknowledgement:
        "Thank you for your interest in KABO. Your investor enquiry has been sent to our executive team for review. We’ll use your supplied contact details to follow up.",
      nextSteps: [
        "Your enquiry has been accepted for delivery to the KABO executive team.",
        "A representative can follow up using your supplied contact details; no response deadline is confirmed by this acknowledgement.",
        "Request a confidentiality agreement before sharing confidential documents or deal information.",
        "For follow-up, reply to the acknowledgement email or email info@kaboitgroup.co.za.",
      ],
      contact: {
        email: "info@kaboitgroup.co.za",
        general: "info@kaboitgroup.co.za",
      },
      createdAt: now.toISOString(),
    };

    // ---- Email the enquiry to Kenny (CC info@) ----
    const teamText = [
      `NEW INVESTOR ENQUIRY`,
      ``,
      `Investor type: ${investorType}`,
      `Logged:        ${now.toISOString()}`,
      ``,
      `--- CONTACT ---`,
      `Name:          ${fullName}`,
      `Email:         ${email}`,
      `Phone:         ${phone || "—"}`,
      `Organisation:  ${organisation}`,
      `Fund size:     ${fundSize || "—"}`,
      `Timeline:      ${timeline || "—"}`,
      ``,
      `--- MESSAGE ---`,
      message,
      ``,
      `--- META ---`,
      `Source:        KABO website investor page`,
      `Customer IP:   ${req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown"}`,
      `User-Agent:    ${req.headers.get("user-agent") || "unknown"}`,
    ].join("\n");

    const teamHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #001E3C;">
        <div style="background: linear-gradient(135deg, #001E3C, #0071C5); padding: 20px 24px; border-radius: 12px 12px 0 0; color: white;">
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.85;">New Investor Enquiry · Confidential</div>
          <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">${escapeHtml(investorType)}</div>
        </div>
        <div style="border: 1px solid #DCE6EF; border-top: none; border-radius: 0 0 12px 12px; padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
            <tr><td style="padding: 4px 0; color: #5A6B7C; width: 130px;">Name</td><td style="padding: 4px 0; font-weight: 600;">${escapeHtml(fullName)}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Organisation</td><td style="padding: 4px 0;">${escapeHtml(organisation)}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Email</td><td style="padding: 4px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #0071C5;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Phone</td><td style="padding: 4px 0;">${escapeHtml(phone || "—")}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Investor type</td><td style="padding: 4px 0;">${escapeHtml(investorType)}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Fund size</td><td style="padding: 4px 0;">${escapeHtml(fundSize || "—")}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Timeline</td><td style="padding: 4px 0;">${escapeHtml(timeline || "—")}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Logged</td><td style="padding: 4px 0;">${now.toISOString()}</td></tr>
          </table>
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0071C5; font-weight: 600; margin: 16px 0 8px;">Message</div>
          <div style="font-size: 14px; line-height: 1.6; padding: 12px 16px; background: #F5F9FC; border-radius: 6px; white-space: pre-wrap;">${escapeHtml(message)}</div>
        </div>
      </div>
    `;

    const delivery = await deliverFormSubmission(
      {
        to: "kenny@kaboitgroup.co.za",
        cc: "info@kaboitgroup.co.za",
        replyTo: email,
        subject: `[Investor Enquiry · Confidential] ${investorType} — ${fullName} (${organisation})`,
        text: teamText,
        html: teamHtml,
      },
      {
        kind: "Investor Enquiry · Confidential",
        headline: `${investorType} — ${fullName} (${organisation})`,
        fields: [
          { label: "Email", value: email },
          { label: "Phone", value: phone || "—" },
          { label: "Organisation", value: organisation },
          { label: "Fund size", value: fundSize || "—" },
          { label: "Timeline", value: timeline || "—" },
          { label: "Routed to", value: "KABO Executive Team" },
          { label: "Logged", value: now.toISOString() },
        ],
        body: message,
      }
    );

    if (!delivery.accepted) {
      return NextResponse.json({ ok: false, error: "Your investor enquiry could not be delivered. Please email info@kaboitgroup.co.za directly." }, { status: 503 });
    }

    // ---- Email auto-reply to the investor (SMTP only — customer-facing) ----
    const customerText = [
      `KABO IT Group — Investor Enquiry Acknowledgement`,
      ``,
      `Thank you for your interest in KABO IT Group.`,
      ``,
      `Your enquiry has been routed directly to: ${autoReply.routeTo}`,
      `Logged: ${now.toISOString()}`,
      ``,
      `${autoReply.acknowledgement}`,
      ``,
      `What happens next:`,
      ...autoReply.nextSteps.map((s, i) => `  ${i + 1}. ${s}`),
      ``,
      `Contact:`,
      `  Email (executive): ${autoReply.contact.email}`,
      `  Email (general):   ${autoReply.contact.general}`,
      ``,
      `—`,
      `KABO IT Group`,
      `Intelligent infrastructure, engineered to perform.`,
      `https://www.kaboitgroup.co.za`,
    ].join("\n");

    const customerHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #001E3C;">
        <div style="background: linear-gradient(135deg, #001E3C, #003865); padding: 24px; border-radius: 12px 12px 0 0; color: white;">
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #00C7FD; font-weight: 600;">KABO IT Group · Executive Office</div>
          <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">Investor Enquiry Acknowledgement</div>
        </div>
        <div style="border: 1px solid #DCE6EF; border-top: none; border-radius: 0 0 12px 12px; padding: 24px;">
          <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px;">${escapeHtml(autoReply.acknowledgement)}</p>
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0071C5; font-weight: 600; margin: 16px 0 8px;">What happens next</div>
          <ol style="font-size: 14px; line-height: 1.6; padding-left: 20px; margin: 0 0 16px;">
            ${autoReply.nextSteps.map((s) => `<li style="margin-bottom: 4px;">${escapeHtml(s)}</li>`).join("")}
          </ol>
          <div style="border-top: 1px solid #DCE6EF; padding-top: 16px; font-size: 13px; color: #5A6B7C;">
            <div><strong style="color: #001E3C;">Executive:</strong> ${autoReply.contact.email}</div>
            <div><strong style="color: #001E3C;">General:</strong> ${autoReply.contact.general}</div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 16px; font-size: 11px; color: #5A6B7C;">
          KABO IT Group · Intelligent infrastructure, engineered to perform.
        </div>
      </div>
    `;

    const acknowledgement = delivery.email.sent ? await sendMail({
      to: email,
      // Reply-To routes customer replies to a monitored inbox (info@) instead
      // of bouncing off the noreply@ sender. The auto-reply comes FROM
      // noreply@kaboitgroup.co.za — without Reply-To, a customer who hits
      // "Reply" would get a bounce.
      replyTo: "info@kaboitgroup.co.za",
      subject: `[KABO] Your investor enquiry was accepted for delivery`,
      text: customerText,
      html: customerHtml,
    }) : { sent: false };

    return NextResponse.json({ ok: true, enquiry: autoReply, deliveryChannel: delivery.channel, acknowledgementSent: acknowledgement.sent });
  } catch (err) {
    console.error("[POST /api/investor] Unable to process the submission.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to submit investor enquiry. Please try again or email info@kaboitgroup.co.za.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
