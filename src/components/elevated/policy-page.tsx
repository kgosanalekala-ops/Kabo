"use client";

import { SiteLink } from "./site-link";

export function PolicyPage({ kind }: { kind: "privacy" | "terms" }) {
  return (
    <article className="e-policy">
      <div className="e-container">
        <span className="e-eyebrow">KABO IT Group / Legal</span>
        <h1>{kind === "privacy" ? "Privacy & POPIA." : "Terms of use."}</h1>
        <div className="e-policy-content">
          {kind === "privacy" ? (
            <>
              <p>
                KABO IT Group respects your privacy. This notice explains how
                information submitted through this website is used in connection
                with an enquiry, support request or investor conversation.
              </p>
              <h2>Information you provide</h2>
              <p>
                Our forms request contact details, an organisation and
                information relevant to your request. Please avoid submitting
                passwords, payment information, sensitive personal information
                or confidential technical credentials.
              </p>
              <h2>How we use your information</h2>
              <p>
                We use submitted details to assess and respond to your request,
                connect you with the appropriate team and maintain a record of
                the conversation. Service providers involved in website hosting
                and message delivery may process information for those purposes.
              </p>
              <h2>Your rights</h2>
              <p>
                Subject to applicable South African law, you may request access
                to, correction or deletion of your personal information, or
                object to its processing. Use the{" "}
                <SiteLink page="contact">Contact page</SiteLink> to reach KABO
                about a privacy request. You may also raise a concern with South
                Africa’s Information Regulator.
              </p>
              <h2>Website storage and external services</h2>
              <p>
                This website does not use advertising trackers. Essential
                browser functions support navigation and form interactions.
                Links to third-party services, including WhatsApp and email
                applications, are governed by those providers’ own privacy
                notices.
              </p>
              <h2>Retention and security</h2>
              <p>
                Enquiry records are retained for the purposes of responding,
                managing the relationship and meeting applicable legal
                requirements. Please contact KABO for information about your
                specific record.
              </p>
            </>
          ) : (
            <>
              <p>
                This website provides an overview of KABO IT Group’s company,
                technology portfolio and services. By using it, you agree to use
                the website lawfully and to respect the rights of KABO and its
                technology partners.
              </p>
              <h2>Portfolio information</h2>
              <p>
                Product specifications, availability, services and deployment
                options depend on the agreed scope and the relevant
                manufacturer. Website information is general guidance. A formal
                proposal or contract determines the specifications, pricing,
                deliverables, response times and terms of an engagement.
              </p>
              <h2>Enquiries and support</h2>
              <p>
                A website submission is a request to engage with KABO. A
                confirmation indicates that the configured delivery service
                accepted the message; it does not create a supply contract or a
                service-level agreement. Existing clients should follow the
                escalation arrangements in their signed support agreement.
              </p>
              <h2>Intellectual property</h2>
              <p>
                KABO branding and website content belong to their respective
                rights holders. Manufacturer names and marks identify their
                technologies and remain the property of the relevant
                manufacturers.
              </p>
              <h2>Third-party links and availability</h2>
              <p>
                External websites and communication services operate
                independently. KABO may update website information as its
                portfolio evolves. Technical information should be confirmed
                directly before making a procurement or implementation decision.
              </p>
              <h2>Contact</h2>
              <p>
                For questions about these terms or a proposed engagement, please
                use the <SiteLink page="contact">Contact page</SiteLink>.
              </p>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
