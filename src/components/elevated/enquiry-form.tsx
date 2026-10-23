"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  LoaderCircle,
  Mail,
  Send,
} from "lucide-react";

export type EnquiryKind = "contact" | "support" | "investor";

export const ENQUIRY_TYPES = [
  "AI Infrastructure & GPU Compute",
  "Cloud & Hybrid Integration",
  "Data Centre Solutions",
  "Enterprise Storage & Resilience",
  "Intelligent Networking",
  "Integrated Security",
  "Contact Centre (CCaaS)",
  "Document Management",
  "Digital Workplace",
  "Procurement / RFP Response",
  "Partnership Enquiry",
  "Other",
];
export const SUPPORT_CATEGORIES = [
  { value: "hardware", label: "Hardware / Compute" },
  { value: "network", label: "Network & Fabric" },
  { value: "security", label: "Security / SOC" },
  { value: "cloud", label: "Cloud & Hybrid" },
  { value: "workplace", label: "Digital Workplace" },
  { value: "data", label: "Data & Resilience" },
];
const INVESTOR_TYPES = [
  "Private Equity",
  "Development Finance Institution",
  "Strategic / Corporate Investor",
  "Family Office",
  "Other",
];
const EMPTY_FIELDS: Record<string, string> = {
  firstName: "",
  lastName: "",
  fullName: "",
  email: "",
  organisation: "",
  phone: "",
  enquiryType: "",
  message: "",
  category: "",
  subject: "",
  description: "",
  contractRef: "",
  investorType: "",
  fundSize: "",
  timeline: "",
};

type Acknowledgement = {
  acknowledgement: string;
  routeTo?: string;
  enquiryType?: string;
  ticketNumber?: string;
  priority?: string;
  slaResponse?: string;
  slaWindow?: string;
  nextSteps: string[];
  escalationPath: { tier: string; role: string; window: string }[];
  contactEmail?: string;
};
type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
};

function acknowledgementFrom(value: unknown): Acknowledgement {
  const data =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};
  const text = (key: string) =>
    typeof data[key] === "string" ? (data[key] as string) : undefined;
  const contact =
    data.contact && typeof data.contact === "object"
      ? (data.contact as Record<string, unknown>)
      : {};
  return {
    acknowledgement:
      text("acknowledgement") ||
      "Thank you. Your enquiry has been sent to the KABO team. We’ll follow up using the details you provided.",
    routeTo: text("routeTo"),
    enquiryType: text("enquiryType"),
    ticketNumber: text("ticketNumber"),
    priority: text("priority"),
    slaResponse: text("slaResponse"),
    slaWindow: text("slaWindow"),
    nextSteps: Array.isArray(data.nextSteps)
      ? data.nextSteps.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    escalationPath: Array.isArray(data.escalationPath)
      ? data.escalationPath.flatMap((item) => {
          if (!item || typeof item !== "object") return [];
          const entry = item as Record<string, unknown>;
          return typeof entry.tier === "string" &&
            typeof entry.role === "string" &&
            typeof entry.window === "string"
            ? [{ tier: entry.tier, role: entry.role, window: entry.window }]
            : [];
        })
      : [],
    contactEmail:
      typeof contact.email === "string" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
        ? contact.email
        : undefined,
  };
}

export function EnquiryForm({ kind }: { kind: EnquiryKind }) {
  const id = useId().replace(/:/g, "");
  const [values, setValues] = useState<Record<string, string>>({
    ...EMPTY_FIELDS,
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState<Acknowledgement | null>(null);
  const errorPanel = useRef<HTMLDivElement>(null);
  const successPanel = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const inbox =
    kind === "support" ? "support@kaboitgroup.co.za" : "info@kaboitgroup.co.za";
  const endpoint =
    kind === "support"
      ? "/api/tickets"
      : kind === "investor"
        ? "/api/investor"
        : "/api/contact";
  const emailDraft = `mailto:${inbox}?subject=${encodeURIComponent(`KABO ${kind} enquiry${values.subject ? `: ${values.subject}` : ""}`)}&body=${encodeURIComponent(
    Object.entries(values)
      .filter(([, value]) => value.trim())
      .map(([key, value]) => `${key.replace(/([A-Z])/g, " $1")}: ${value}`)
      .join("\n\n"),
  )}`;
  const title =
    kind === "support"
      ? "Support enquiry"
      : kind === "investor"
        ? "Investor enquiry"
        : "Project enquiry";
  const required =
    kind === "contact"
      ? [
          "firstName",
          "lastName",
          "email",
          "organisation",
          "enquiryType",
          "message",
        ]
      : kind === "support"
        ? ["category", "subject", "description", "fullName", "email"]
        : ["fullName", "organisation", "email", "investorType", "message"];

  useEffect(() => {
    if (error) errorPanel.current?.focus();
  }, [error]);
  useEffect(() => {
    if (accepted) successPanel.current?.focus();
  }, [accepted]);
  useEffect(() => () => request.current?.abort(), []);

  function edit(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }
  function input({
    name,
    label,
    type = "text",
    required: isRequired = false,
    autoComplete,
    placeholder,
    minLength,
    maxLength = 300,
  }: Field) {
    return (
      <label className="ef-field" htmlFor={`${id}-${name}`} key={name}>
        <span>
          {label}
          {isRequired && (
            <span className="ef-required" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </span>
        <input
          id={`${id}-${name}`}
          name={name}
          type={type}
          required={isRequired}
          autoComplete={autoComplete}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          value={values[name]}
          onChange={(event) => edit(name, event.target.value)}
        />
      </label>
    );
  }
  function select(
    name: string,
    label: string,
    options: { value: string; label: string }[],
  ) {
    return (
      <label className="ef-field" htmlFor={`${id}-${name}`}>
        <span>
          {label}
          <span className="ef-required" aria-hidden="true">
            {" "}
            *
          </span>
        </span>
        <select
          id={`${id}-${name}`}
          name={name}
          required
          value={values[name]}
          onChange={(event) => edit(name, event.target.value)}
        >
          <option value="" disabled>
            Select {label.toLowerCase()}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError("");
    const form = event.currentTarget;
    const missing = required.find((name) => !values[name]?.trim());
    if (missing) {
      setError(
        "Please complete all required fields before sending your enquiry.",
      );
      form.querySelector<HTMLElement>(`[name="${missing}"]`)?.focus();
      return;
    }
    const names =
      kind === "contact"
        ? [
            "firstName",
            "lastName",
            "email",
            "organisation",
            "phone",
            "enquiryType",
            "message",
          ]
        : kind === "support"
          ? [
              "category",
              "subject",
              "description",
              "fullName",
              "email",
              "phone",
              "organisation",
              "contractRef",
            ]
          : [
              "fullName",
              "organisation",
              "email",
              "phone",
              "investorType",
              "fundSize",
              "timeline",
              "message",
            ];
    const payload = Object.fromEntries(
      names.map((name) => [name, values[name].trim()]),
    );
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    setPending(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => ({}))) as Record<
        string,
        unknown
      >;
      if (!response.ok || data.ok !== true)
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Your enquiry could not be delivered. Please try again or use the email option below.",
        );
      setAccepted(
        acknowledgementFrom(kind === "support" ? data.ticket : data.enquiry),
      );
    } catch (cause) {
      setError(
        cause instanceof Error && cause.name !== "AbortError"
          ? cause.message
          : "The connection timed out before delivery could be confirmed. Your details are still here. Please retry or email the team directly.",
      );
    } finally {
      window.clearTimeout(timeout);
      setPending(false);
      request.current = null;
    }
  }

  if (accepted)
    return (
      <div
        className="ef-confirmation"
        ref={successPanel}
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        <span className="ef-confirmation-icon">
          <CheckCircle2 size={30} strokeWidth={1.4} />
        </span>
        <span className="e-eyebrow">Message sent</span>
        <h3>
          {kind === "support"
            ? "Your support enquiry is in."
            : "Thank you for starting the conversation."}
        </h3>
        {accepted.ticketNumber && (
          <div className="ef-reference">
            <span>Your reference</span>
            <code>{accepted.ticketNumber}</code>
          </div>
        )}
        <p>{accepted.acknowledgement}</p>
        {(accepted.priority || accepted.slaResponse || accepted.slaWindow) && (
          <dl className="ef-ack-meta">
            {accepted.priority && (
              <div>
                <dt>Priority</dt>
                <dd>{accepted.priority}</dd>
              </div>
            )}
            {accepted.slaResponse && (
              <div>
                <dt>Response window</dt>
                <dd>{accepted.slaResponse}</dd>
              </div>
            )}
            {accepted.slaWindow && (
              <div>
                <dt>Coverage</dt>
                <dd>{accepted.slaWindow}</dd>
              </div>
            )}
          </dl>
        )}
        {accepted.nextSteps.length > 0 && (
          <div className="ef-next">
            <h4>What happens next</h4>
            <ol>
              {accepted.nextSteps.map((step, index) => (
                <li key={`${index}-${step}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
        {accepted.escalationPath.length > 0 && (
          <div className="ef-escalation">
            <h4>Escalation pathway</h4>
            {accepted.escalationPath.map((step, index) => (
              <div key={`${step.tier}-${index}`}>
                <strong>{step.tier}</strong>
                <span>{step.role}</span>
                <small>{step.window}</small>
              </div>
            ))}
          </div>
        )}
        <p className="ef-confirmation-note">
          {kind === "support"
            ? "Your reference acknowledges the enquiry. Active coverage, priority and service commitments follow your support agreement."
            : "This acknowledgement does not confirm a quotation, order, investment offer or service agreement."}
        </p>
        <div className="ef-confirmation-actions">
          <button
            className="e-button"
            type="button"
            onClick={() => {
              setAccepted(null);
              setValues({ ...EMPTY_FIELDS });
              setError("");
            }}
          >
            Send another enquiry <ArrowUpRight size={17} />
          </button>
          <a href={`mailto:${accepted.contactEmail || inbox}`}>
            Email the team <Mail size={16} />
          </a>
        </div>
      </div>
    );

  return (
    <form
      className="ef-form"
      onSubmit={submit}
      aria-label={title}
      aria-busy={pending}
    >
      <div className="ef-form-heading">
        <span className="e-eyebrow">
          {kind === "support"
            ? "Tell us what’s happening"
            : kind === "investor"
              ? "Introduce your investment focus"
              : "Tell us what you’re building"}
        </span>
        <p>
          Fields marked <span aria-hidden="true">*</span>
          <span className="ef-sr-only">with an asterisk</span> are required.
        </p>
      </div>
      {kind === "contact" ? (
        <>
          <div className="ef-field-row">
            {input({
              name: "firstName",
              label: "First name",
              required: true,
              autoComplete: "given-name",
              maxLength: 150,
            })}
            {input({
              name: "lastName",
              label: "Last name",
              required: true,
              autoComplete: "family-name",
              maxLength: 150,
            })}
          </div>
          <div className="ef-field-row">
            {input({
              name: "email",
              label: "Work email",
              type: "email",
              required: true,
              autoComplete: "email",
              maxLength: 254,
            })}
            {input({
              name: "organisation",
              label: "Organisation",
              required: true,
              autoComplete: "organization",
            })}
          </div>
          <div className="ef-field-row">
            {input({
              name: "phone",
              label: "Phone (optional)",
              type: "tel",
              autoComplete: "tel",
              maxLength: 60,
            })}
            {select(
              "enquiryType",
              "Enquiry type",
              ENQUIRY_TYPES.map((value) => ({ value, label: value })),
            )}
          </div>
        </>
      ) : (
        <>
          <div className="ef-field-row">
            {input({
              name: "fullName",
              label: "Full name",
              required: true,
              autoComplete: "name",
              maxLength: 150,
            })}
            {input({
              name: "organisation",
              label:
                kind === "investor"
                  ? "Organisation"
                  : "Organisation (optional)",
              required: kind === "investor",
              autoComplete: "organization",
            })}
          </div>
          <div className="ef-field-row">
            {input({
              name: "email",
              label: "Work email",
              type: "email",
              required: true,
              autoComplete: "email",
              maxLength: 254,
            })}
            {input({
              name: "phone",
              label: "Phone (optional)",
              type: "tel",
              autoComplete: "tel",
              maxLength: 60,
            })}
          </div>
          {kind === "support" ? (
            <>
              <div className="ef-field-row">
                {select("category", "Issue category", SUPPORT_CATEGORIES)}
                {input({
                  name: "contractRef",
                  label: "Service / contract reference (optional)",
                })}
              </div>
              {input({
                name: "subject",
                label: "Subject",
                required: true,
                minLength: 5,
                maxLength: 250,
                placeholder: "A short description of the issue",
              })}
              <p className="ef-field-hint">
                At least 5 characters. Your support team assigns priority from
                the business impact.
              </p>
            </>
          ) : (
            <>
              {select(
                "investorType",
                "Investor type",
                INVESTOR_TYPES.map((value) => ({ value, label: value })),
              )}
              <div className="ef-field-row">
                {input({
                  name: "fundSize",
                  label: "Fund size (optional)",
                  placeholder: "Your investment range",
                })}
                {input({
                  name: "timeline",
                  label: "Timeline (optional)",
                  placeholder: "Your proposed timeframe",
                })}
              </div>
            </>
          )}
        </>
      )}
      <label
        className="ef-field"
        htmlFor={`${id}-${kind === "support" ? "description" : "message"}`}
      >
        <span>
          {kind === "support" ? "Issue description" : "Message"}
          <span className="ef-required" aria-hidden="true">
            {" "}
            *
          </span>
        </span>
        <textarea
          id={`${id}-${kind === "support" ? "description" : "message"}`}
          name={kind === "support" ? "description" : "message"}
          required
          minLength={kind === "support" ? 20 : undefined}
          maxLength={6000}
          rows={6}
          placeholder={
            kind === "support"
              ? "Affected platform, symptoms, business impact and when the issue began…"
              : kind === "investor"
                ? "Your investment focus, sector interests and proposed relationship…"
                : "Your workload, existing estate, timeline or procurement requirement…"
          }
          value={values[kind === "support" ? "description" : "message"]}
          onChange={(event) =>
            edit(
              kind === "support" ? "description" : "message",
              event.target.value,
            )
          }
        />
      </label>
      {kind === "support" && (
        <p className="ef-field-hint">
          At least 20 characters. Include error messages and recent changes, but
          no passwords or sensitive customer data.
        </p>
      )}
      <div className="ef-routing">
        <Mail size={17} strokeWidth={1.5} />
        <p>
          {kind === "investor" ? (
            "Routed privately to the KABO executive team. General correspondence uses info@kaboitgroup.co.za."
          ) : (
            <>
              Routed to <strong>{inbox}</strong>.{" "}
              {kind === "support"
                ? "Response arrangements follow your support agreement."
                : "Investor conversations and support requests have their own enquiry forms."}
            </>
          )}
        </p>
      </div>
      {error && (
        <div className="ef-error" role="alert" ref={errorPanel} tabIndex={-1}>
          <strong>Delivery could not be confirmed.</strong>
          <p>{error}</p>
          <p>
            Your form details have been kept.{" "}
            <a href={emailDraft}>
              Continue in your email app <ArrowUpRight size={14} />
            </a>
          </p>
        </div>
      )}
      <div className="ef-submit-row">
        <button type="submit" className="e-button ef-submit" disabled={pending}>
          {pending ? (
            <>
              <LoaderCircle size={17} className="ef-spinner" /> Sending…
            </>
          ) : (
            <>
              {kind === "support"
                ? "Send support enquiry"
                : kind === "investor"
                  ? "Request an investor conversation"
                  : "Send enquiry"}
              <Send size={16} />
            </>
          )}
        </button>
        <span>
          <Check size={14} /> Your enquiry goes directly to KABO.
        </span>
      </div>
      <p className="ef-privacy">
        Your information is used to assess and respond to this enquiry. Please
        avoid confidential credentials and unnecessary sensitive personal
        information.
      </p>
    </form>
  );
}
