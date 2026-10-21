import { NextRequest, NextResponse } from "next/server";
import { deliverFormSubmission, sendMail } from "@/lib/email";

/**
 * POST /api/contact
 *
 * Handles general enquiries — emails the enquiry to info@kaboitgroup.co.za
 * and sends an auto-reply to the customer.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      organisation,
      phone,
      enquiryType,
      message,
    } = body ?? {};

    if (!firstName || !lastName || !email || !enquiryType || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Defensive validation: avoid oversized payloads and malformed addresses.
    const fields = [firstName, lastName, email, organisation, phone, enquiryType, message];
    if (fields.some(v => v !== undefined && (typeof v !== "string" || v.length > 8000)) ||
        String(firstName).length > 150 || String(lastName).length > 150 ||
        String(email).length > 254 || String(enquiryType).length > 150 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ ok: false, error: "Please check your contact details and message length." }, { status: 400 });
    }

    const now = new Date();

    const autoReply = {
      routeTo: "info@kaboitgroup.co.za",
      enquiryType,
      acknowledgement:
        "Your enquiry has been routed to the KABO general enquiries desk at info@kaboitgroup.co.za. A KABO representative can follow up using your supplied contact details. For urgent support enquiries, contact support@kaboitgroup.co.za.",
      nextSteps: [
        `Your enquiry category: ${enquiryType}.`,
        "A representative will review the enquiry and contact you where appropriate.",
        "For urgent technical issues, contact support@kaboitgroup.co.za.",
        "To follow up, reply to the acknowledgement email or email info@kaboitgroup.co.za.",
      ],
      contact: {
        email: "info@kaboitgroup.co.za",
        support: "support@kaboitgroup.co.za",
      },
      createdAt: now.toISOString(),
    };

    // ---- Email the enquiry to the KABO team ----
    const teamText = [
      `NEW GENERAL ENQUIRY`,
      ``,
      `Enquiry type: ${enquiryType}`,
      `Logged:       ${now.toISOString()}`,
      ``,
      `--- CONTACT ---`,
      `Name:         ${firstName} ${lastName}`,
      `Email:        ${email}`,
      `Phone:        ${phone || "—"}`,
      `Organisation: ${organisation || "—"}`,
      ``,
      `--- MESSAGE ---`,
      message,
      ``,
      `--- META ---`,
      `Source:        KABO website contact page`,

    ].join("\n");

    const teamHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #001E3C;">
        <div style="background: linear-gradient(135deg, #0071C5, #00C7FD); padding: 20px 24px; border-radius: 12px 12px 0 0; color: white;">
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.85;">New General Enquiry</div>
          <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">${escapeHtml(enquiryType)}</div>
        </div>
        <div style="border: 1px solid #DCE6EF; border-top: none; border-radius: 0 0 12px 12px; padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
            <tr><td style="padding: 4px 0; color: #5A6B7C; width: 130px;">Name</td><td style="padding: 4px 0; font-weight: 600;">${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Email</td><td style="padding: 4px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #0071C5;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Phone</td><td style="padding: 4px 0;">${escapeHtml(phone || "—")}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Organisation</td><td style="padding: 4px 0;">${escapeHtml(organisation || "—")}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Logged</td><td style="padding: 4px 0;">${now.toISOString()}</td></tr>
          </table>
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0071C5; font-weight: 600; margin: 16px 0 8px;">Message</div>
          <div style="font-size: 14px; line-height: 1.6; padding: 12px 16px; background: #F5F9FC; border-radius: 6px; white-space: pre-wrap;">${escapeHtml(message)}</div>
        </div>
      </div>
    `;

    const delivery = await deliverFormSubmission(
      {
        to: "info@kaboitgroup.co.za",
        replyTo: email,
        subject: `[Enquiry] ${enquiryType} — ${firstName} ${lastName}`,
        text: teamText,
        html: teamHtml,
      },
      {
        kind: "General Enquiry",
        headline: `${enquiryType} — ${firstName} ${lastName}`,
        fields: [
          { label: "Email", value: email },
          { label: "Phone", value: phone || "—" },
          { label: "Organisation", value: organisation || "—" },
          { label: "Enquiry type", value: enquiryType },
          { label: "Routed to", value: "info@kaboitgroup.co.za" },
          { label: "Logged", value: now.toISOString() },
        ],
        body: message,
      }
    );

    // Only acknowledge a request accepted by at least one transport.
    if (!delivery.accepted) {
      return NextResponse.json(
        { ok: false, error: "Your message was not sent. Please email info@kaboitgroup.co.za directly." },
        { status: 503 }
      );
    }

    // ---- Email auto-reply to the customer (SMTP only — customer doesn't have WhatsApp to KABO) ----
    const customerText = [
      `KABO IT Group — Enquiry Acknowledgement`,
      ``,
      `Thank you for contacting KABO IT Group.`,
      ``,
      `Your enquiry has been routed to: ${autoReply.routeTo}`,
      `Enquiry type: ${enquiryType}`,
      `Logged:       ${now.toISOString()}`,
      ``,
      `${autoReply.acknowledgement}`,
      ``,
      `What happens next:`,
      ...autoReply.nextSteps.map((s, i) => `  ${i + 1}. ${s}`),
      ``,
      `Contact:`,
      `  Email:   ${autoReply.contact.email}`,
      `  Support: ${autoReply.contact.support}`,
      ``,
      `—`,
      `KABO IT Group`,
      `Intelligent infrastructure, engineered to perform.`,
      `https://www.kaboitgroup.co.za`,
    ].join("\n");

    const customerHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #001E3C;">
        <div style="background: linear-gradient(135deg, #001E3C, #003865); padding: 24px; border-radius: 12px 12px 0 0; color: white;">
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #00C7FD; font-weight: 600;">KABO IT Group</div>
          <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">Enquiry Acknowledgement</div>
        </div>
        <div style="border: 1px solid #DCE6EF; border-top: none; border-radius: 0 0 12px 12px; padding: 24px;">
          <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px;">${escapeHtml(autoReply.acknowledgement)}</p>
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0071C5; font-weight: 600; margin: 16px 0 8px;">What happens next</div>
          <ol style="font-size: 14px; line-height: 1.6; padding-left: 20px; margin: 0 0 16px;">
            ${autoReply.nextSteps.map((s) => `<li style="margin-bottom: 4px;">${escapeHtml(s)}</li>`).join("")}
          </ol>
          <div style="border-top: 1px solid #DCE6EF; padding-top: 16px; font-size: 13px; color: #5A6B7C;">
            <div><strong style="color: #001E3C;">Email:</strong> ${autoReply.contact.email}</div>
            <div><strong style="color: #001E3C;">Support:</strong> ${autoReply.contact.support}</div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 16px; font-size: 11px; color: #5A6B7C;">
          KABO IT Group · Intelligent infrastructure, engineered to perform.
        </div>
      </div>
    `;

    if (delivery.email.sent) await sendMail({
      to: email,
      // Reply-To routes customer replies to a monitored inbox (info@) instead
      // of bouncing off the noreply@ sender. This is critical because the
      // auto-reply comes FROM noreply@kaboitgroup.co.za — without Reply-To,
      // a customer who hits "Reply" to the auto-reply would get a bounce.
      replyTo: "info@kaboitgroup.co.za",
      subject: `[KABO] We've received your enquiry`,
      text: customerText,
      html: customerHtml,
    });

    return NextResponse.json({ ok: true, enquiry: autoReply, deliveryChannel: delivery.channel });
  } catch (err) {
    console.error("[POST /api/contact] error:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to submit enquiry. Please email info@kaboitgroup.co.za directly.",
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
