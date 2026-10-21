"use client";

import { ArrowUpRight, Building2, Mail, MapPin, Phone } from "lucide-react";
import { COMPANY_PROFILE as company } from "./company-profile";
import { WhatsAppMark } from "./whatsapp-mark";

export function CompanyContacts() {
  return (
    <section className="vf-company-contact" aria-label="Company information and direct contact">
      <div className="vf-company-contact-kicker"><Building2 size={17} aria-hidden="true" /> COMPANY INFORMATION</div>
      <h3>{company.legalName}</h3>
      <p className="vf-company-contact-location">Based in {company.locality}, {company.country}</p>
      <div className="vf-company-contact-list">
        <div className="vf-company-contact-item">
          <MapPin size={20} aria-hidden="true" />
          <div><span>OFFICE ADDRESS</span><address>{company.streetAddress}<br />{company.suburb}, {company.city}<br />{company.postalCode}, {company.country}</address></div>
        </div>
        <a className="vf-company-contact-item" href={company.telephoneHref}>
          <Phone size={20} aria-hidden="true" />
          <div><span>CALL KABO</span><strong>{company.telephoneDisplay}</strong></div>
          <ArrowUpRight className="vf-company-contact-arrow" size={16} aria-hidden="true" />
        </a>
        <a className="vf-company-contact-item" href={`mailto:${company.generalEmail}`}>
          <Mail size={20} aria-hidden="true" />
          <div><span>GENERAL ENQUIRIES</span><strong>{company.generalEmail}</strong></div>
          <ArrowUpRight className="vf-company-contact-arrow" size={16} aria-hidden="true" />
        </a>
        <a className="vf-company-contact-item" href={`mailto:${company.supportEmail}`}>
          <Mail size={20} aria-hidden="true" />
          <div><span>SUPPORT</span><strong>{company.supportEmail}</strong></div>
          <ArrowUpRight className="vf-company-contact-arrow" size={16} aria-hidden="true" />
        </a>
      </div>
      <a className="vf-company-contact-whatsapp" href={company.whatsAppHref} target="_blank" rel="noopener noreferrer">
        <WhatsAppMark size={19} /> Chat with KABO <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
