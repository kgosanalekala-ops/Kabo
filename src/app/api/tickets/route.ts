import { NextRequest, NextResponse } from "next/server";
import { deliverFormSubmission, sendMail } from "@/lib/email";

/**
 * POST /api/tickets
 *
 * Creates a support ticket, emails the full ticket to the KABO support desk
 * (with a CC to info@ so the whole team has visibility), and emails an
 * auto-reply to the customer with their ticket number and SLA details.
 *
 * "Everyone must see tickets lodged" → tickets are sent to:
 *   - support@kaboitgroup.co.za (primary TAC inbox)
 *   - info@kaboitgroup.co.za (CC — general visibility for the team)
 *   - WhatsApp silent notification to KABO team mobile (backup channel,
 *     visitor never sees this)
 *
 * No database — the email inbox IS the system of record.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      category,
      priority,
      subject,
      description,
      fullName,
      email,
      phone,
      organisation,
      contractRef,
    } = body ?? {};

    // ---- Basic validation ----
    if (!category || !subject || !description || !fullName || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // ---- Resolve priority (P3 default — the form no longer asks the user) ----
    const resolvedPriority = priority || "P3";
    const slaMap: Record<
      string,
      { responseMins: number; label: string; hours: string }
    > = {
      P1: { responseMins: 15, label: "P1 — Critical", hours: "24/7" },
      P2: { responseMins: 60, label: "P2 — High", hours: "Business hours" },
      P3: { responseMins: 240, label: "P3 — Medium", hours: "Next business day" },
      P4: { responseMins: 1440, label: "P4 — Low", hours: "Within 24 hours" },
    };
    const sla = slaMap[resolvedPriority] ?? slaMap.P3;

    // ---- Generate ticket number: KABO-YYYY-NNNNN ----
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    const ticketNumber = `KABO-${year}-${random}`;
    const now = new Date();

    // ---- Build the customer-facing auto-reply payload ----
    const slaText =
      sla.responseMins < 60
        ? `${sla.responseMins} minutes`
        : sla.responseMins < 1440
        ? `${Math.round(sla.responseMins / 60)} hour(s)`
        : `${Math.round(sla.responseMins / 1440)} business day(s)`;

    const autoReply = {
      ticketNumber,
      priority: sla.label,
      slaResponse: slaText,
      slaWindow: sla.hours,
      category,
      acknowledgement:
        resolvedPriority === "P1"
          ? "Your ticket has been flagged as P1 — Critical. The KABO Gauteng SOC has been paged and an engineer will acknowledge within 15 minutes, 24/7."
          : resolvedPriority === "P2"
          ? "Your ticket has been queued as P2 — High. An engineer will acknowledge within 1 business hour."
          : resolvedPriority === "P3"
          ? "Your ticket has been logged as P3 — Medium. An engineer will acknowledge by the next business day."
          : "Your ticket has been logged as P4 — Low. An engineer will respond within 24 business hours.",
      nextSteps: [
        "You will receive an acknowledgement from the KABO TAC within the SLA window above.",
        "An engineer will be assigned and reach out using the contact details you provided.",
        "All updates, RCA notes and resolution evidence will be tracked against this ticket number.",
        "To follow up, reply to the acknowledgement email or email support@kaboitgroup.co.za with your ticket number in the subject line.",
      ],
      escalationPath: [
        { tier: "TAC L1", role: "First response, triage, workaround", window: slaText },
        { tier: "TAC L2", role: "Engineering escalation, RCA", window: "Within 4h of L1 acknowledgement" },
        { tier: "TAC L3", role: "Vendor escalation (HPE, Dell, NVIDIA, Fortinet, etc.)", window: "Per vendor SLA" },
        { tier: "Service Delivery Manager", role: "SLA & commercial escalation", window: "On request" },
      ],
      contact: {
        email: "support@kaboitgroup.co.za",
        noc: "Gauteng SOC · 24/7",
        portal: "KABO Support Portal",
      },
      createdAt: now.toISOString(),
    };

    // ---- Email the ticket to the KABO team (support@ + CC info@) ----
    const teamText = [
      `NEW SUPPORT TICKET — ${ticketNumber}`,
      ``,
      `Priority:    ${sla.label}`,
      `Category:    ${category}`,
      `Logged:      ${now.toISOString()}`,
      `SLA target:  First response within ${slaText} (${sla.hours})`,
      ``,
      `--- CUSTOMER ---`,
      `Name:         ${fullName}`,
      `Email:        ${email}`,
      `Phone:        ${phone || "—"}`,
      `Organisation: ${organisation || "—"}`,
      `Contract ref: ${contractRef || "—"}`,
      ``,
      `--- SUBJECT ---`,
      subject,
      ``,
      `--- DESCRIPTION ---`,
      description,
      ``,
      `--- META ---`,
      `Source:        KABO website support portal`,
      `Customer IP:   ${req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown"}`,
      `User-Agent:    ${req.headers.get("user-agent") || "unknown"}`,
    ].join("\n");

    const teamHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #001E3C;">
        <div style="background: linear-gradient(135deg, #0071C5, #00C7FD); padding: 20px 24px; border-radius: 12px 12px 0 0; color: white;">
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.85;">New Support Ticket</div>
          <div style="font-size: 22px; font-weight: 700; margin-top: 4px; font-family: monospace;">${ticketNumber}</div>
        </div>
        <div style="border: 1px solid #DCE6EF; border-top: none; border-radius: 0 0 12px 12px; padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #5A6B7C; width: 130px;">Priority</td><td style="padding: 6px 0; font-weight: 600;">${sla.label}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6B7C;">Category</td><td style="padding: 6px 0; font-weight: 600;">${category}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6B7C;">SLA target</td><td style="padding: 6px 0; font-weight: 600; color: #0071C5;">First response within ${slaText} (${sla.hours})</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6B7C;">Logged</td><td style="padding: 6px 0;">${now.toISOString()}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #DCE6EF; margin: 16px 0;" />
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0071C5; font-weight: 600; margin-bottom: 8px;">Customer</div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 4px 0; color: #5A6B7C; width: 130px;">Name</td><td style="padding: 4px 0;">${escapeHtml(fullName)}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Email</td><td style="padding: 4px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #0071C5;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Phone</td><td style="padding: 4px 0;">${escapeHtml(phone || "—")}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Organisation</td><td style="padding: 4px 0;">${escapeHtml(organisation || "—")}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Contract ref</td><td style="padding: 4px 0;">${escapeHtml(contractRef || "—")}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #DCE6EF; margin: 16px 0;" />
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0071C5; font-weight: 600; margin-bottom: 8px;">Subject</div>
          <div style="font-size: 15px; font-weight: 600; padding: 8px 12px; background: #F5F9FC; border-radius: 6px;">${escapeHtml(subject)}</div>
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0071C5; font-weight: 600; margin: 16px 0 8px;">Description</div>
          <div style="font-size: 14px; line-height: 1.6; padding: 12px 16px; background: #F5F9FC; border-radius: 6px; white-space: pre-wrap;">${escapeHtml(description)}</div>
        </div>
        <div style="text-align: center; margin-top: 16px; font-size: 11px; color: #5A6B7C;">
          This ticket was submitted via the KABO IT Group support portal.
        </div>
      </div>
    `;

    await deliverFormSubmission(
      {
        to: "support@kaboitgroup.co.za",
        cc: "info@kaboitgroup.co.za",
        replyTo: email,
        subject: `[${ticketNumber}] ${sla.label} — ${subject}`,
        text: teamText,
        html: teamHtml,
      },
      {
        kind: `Support Ticket ${ticketNumber}`,
        headline: `${sla.label} — ${subject}`,
        fields: [
          { label: "Ticket", value: ticketNumber },
          { label: "Priority", value: sla.label },
          { label: "Category", value: category },
          { label: "SLA", value: `First response within ${slaText} (${sla.hours})` },
          { label: "Customer", value: fullName },
          { label: "Email", value: email },
          { label: "Phone", value: phone || "—" },
          { label: "Organisation", value: organisation || "—" },
          { label: "Routed to", value: "support@kaboitgroup.co.za" },
          { label: "Logged", value: now.toISOString() },
        ],
        body: description,
      }
    );

    // ---- Email auto-reply to the customer (SMTP only — customer-facing) ----
    const customerText = [
      `KABO IT Group — Support Ticket Acknowledgement`,
      ``,
      `Ticket number: ${ticketNumber}`,
      `Priority:      ${sla.label}`,
      `SLA target:    First response within ${slaText} (${sla.hours})`,
      `Category:      ${category}`,
      `Logged:        ${now.toISOString()}`,
      ``,
      `${autoReply.acknowledgement}`,
      ``,
      `What happens next:`,
      ...autoReply.nextSteps.map((s, i) => `  ${i + 1}. ${s}`),
      ``,
      `Escalation path:`,
      ...autoReply.escalationPath.map((e) => `  • ${e.tier} — ${e.role} (${e.window})`),
      ``,
      `Contact:`,
      `  Email:  support@kaboitgroup.co.za`,
      `  Portal: KABO Support Portal`,
      `  NOC:    Gauteng SOC · 24/7`,
      ``,
      `Subject: ${subject}`,
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
          <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">Support Ticket Acknowledgement</div>
        </div>
        <div style="border: 1px solid #DCE6EF; border-top: none; border-radius: 0 0 12px 12px; padding: 24px;">
          <div style="background: #F5F9FC; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0071C5; font-weight: 600;">Ticket Number</div>
            <div style="font-size: 20px; font-weight: 700; font-family: monospace; color: #001E3C; margin-top: 4px;">${ticketNumber}</div>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
            <tr><td style="padding: 4px 0; color: #5A6B7C; width: 120px;">Priority</td><td style="padding: 4px 0; font-weight: 600;">${sla.label}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">SLA target</td><td style="padding: 4px 0; font-weight: 600; color: #0071C5;">First response within ${slaText}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Window</td><td style="padding: 4px 0;">${sla.hours}</td></tr>
            <tr><td style="padding: 4px 0; color: #5A6B7C;">Category</td><td style="padding: 4px 0;">${escapeHtml(category)}</td></tr>
          </table>
          <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px;">${escapeHtml(autoReply.acknowledgement)}</p>
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0071C5; font-weight: 600; margin: 16px 0 8px;">What happens next</div>
          <ol style="font-size: 14px; line-height: 1.6; padding-left: 20px; margin: 0 0 16px;">
            ${autoReply.nextSteps.map((s) => `<li style="margin-bottom: 4px;">${escapeHtml(s)}</li>`).join("")}
          </ol>
          <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0071C5; font-weight: 600; margin: 16px 0 8px;">Escalation path</div>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px;">
            ${autoReply.escalationPath.map((e) => `<tr><td style="padding: 4px 0; font-weight: 600; width: 100px;">${escapeHtml(e.tier)}</td><td style="padding: 4px 0; color: #5A6B7C;">${escapeHtml(e.role)}</td><td style="padding: 4px 0; color: #0071C5; text-align: right; white-space: nowrap;">${escapeHtml(e.window)}</td></tr>`).join("")}
          </table>
          <div style="border-top: 1px solid #DCE6EF; padding-top: 16px; font-size: 13px; color: #5A6B7C;">
            <div><strong style="color: #001E3C;">Email:</strong> support@kaboitgroup.co.za</div>
            <div><strong style="color: #001E3C;">Portal:</strong> KABO Support Portal</div>
            <div><strong style="color: #001E3C;">NOC:</strong> Gauteng SOC · 24/7</div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 16px; font-size: 11px; color: #5A6B7C;">
          KABO IT Group · Intelligent infrastructure, engineered to perform.
        </div>
      </div>
    `;

    await sendMail({
      to: email,
      // Reply-To routes customer replies to a monitored inbox (support@) instead
      // of bouncing off the noreply@ sender. The auto-reply comes FROM
      // noreply@kaboitgroup.co.za — without Reply-To, a customer who hits
      // "Reply" to the ticket acknowledgement would get a bounce.
      // For support tickets specifically, replies should go to support@ so
      // they're tracked against the ticket number in the subject line.
      replyTo: "support@kaboitgroup.co.za",
      subject: `[${ticketNumber}] Your KABO support ticket is logged`,
      text: customerText,
      html: customerHtml,
    });

    return NextResponse.json({ ok: true, ticket: autoReply });
  } catch (err) {
    console.error("[POST /api/tickets] error:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to create ticket. Please email support@kaboitgroup.co.za directly.",
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
