import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { deliverFormSubmission, sendMail } from "@/lib/email";

/** Support ENQUIRY intake, not a persistent service-desk ticket or SLA platform. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, subject, description, fullName, email, phone, organisation, contractRef } = body || {};
    const fields = [category, subject, description, fullName, email, phone, organisation, contractRef];
    if (!category || !subject || !description || !fullName || !email || fields.some(v=>v!==undefined && (typeof v!=="string" || v.length>8000)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ok:false,error:"Please complete the required support details."},{status:400});
    }
    const reference = "KABO-ENQ-" + randomUUID().split("-")[0].toUpperCase();
    const createdAt = new Date().toISOString();
    const text = ["KABO support enquiry", "Reference: " + reference, "Received by API: " + createdAt, "Category: " + category, "Subject: " + subject, "Name: " + fullName, "Email: " + email, "Phone: " + (phone || "—"), "Organisation: " + (organisation || "—"), "Contract reference: " + (contractRef || "—"), "Description:", description].join("\n");
    const result = await deliverFormSubmission(
      { to:"support@kaboitgroup.co.za", cc:"info@kaboitgroup.co.za", replyTo:email, subject:`[${reference}] ${subject}`, text },
      {kind:"Support enquiry",headline:`${reference} · ${subject}`, fields:[{label:"Contact",value:fullName},{label:"Email",value:email},{label:"Category",value:category}],body:description}
    );
    if(!result.accepted) return NextResponse.json({ok:false,error:"Support request could not be sent. Please email support@kaboitgroup.co.za directly."},{status:503});
    if(result.email.sent) await sendMail({to:email,replyTo:"support@kaboitgroup.co.za",subject:`[${reference}] KABO support enquiry received`,text:`Thank you for contacting KABO IT Group. Your support enquiry reference is ${reference}. This acknowledgement does not confirm an SLA, active support contract, or service-desk ticket assignment. For urgent issues, call KABO on +27 61 285 4418 or email support@kaboitgroup.co.za.`});
    return NextResponse.json({ok:true,ticket:{ticketNumber:reference,category,acknowledgement:"Your support enquiry was accepted for delivery to KABO. A response timeframe depends on the agreed support arrangement.",contact:{email:"support@kaboitgroup.co.za"}},deliveryChannel:result.channel});
  } catch (err) {
    console.error("[support] request error", err);
    return NextResponse.json({ok:false,error:"Unable to process the support enquiry."},{status:500});
  }
}
