"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiteLink } from "./site-link";
import type { Page } from "@/components/kabo/page-context";

const columns: {
  label: string;
  links: { title: string; page: Page; detail?: string }[];
}[] = [
  {
    label: "Expertise",
    links: [
      { title: "Solutions", page: "solutions" },
      {
        title: "AI infrastructure",
        page: "solution-detail",
        detail: "ai-infrastructure",
      },
      { title: "Products & technologies", page: "products" },
      { title: "Services", page: "services" },
      { title: "Industries", page: "industries" },
    ],
  },
  {
    label: "KABO",
    links: [
      { title: "Our company", page: "about" },
      { title: "Our partners", page: "partners" },
      { title: "Case studies", page: "case-studies" },
      { title: "Investors", page: "investors" },
    ],
  },
  {
    label: "Connect",
    links: [
      { title: "Start a conversation", page: "contact" },
      { title: "Request a proposal", page: "contact" },
      { title: "Support portal", page: "support" },
    ],
  },
];

export function ElevatedFooter() {
  return (
    <footer className="e-footer">
      <div className="e-container">
        <div className="e-footer-invitation">
          <div>
            <span className="e-eyebrow">The next chapter is yours</span>
            <h2>
              Let’s build
              <br />
              what’s next.
            </h2>
          </div>
          <SiteLink
            page="contact"
            className="e-footer-circle"
            aria-label="Start a conversation with KABO"
          >
            <ArrowUpRight strokeWidth={1} />
            <span>Start a conversation</span>
          </SiteLink>
        </div>
        <div className="e-footer-links">
          <div className="e-footer-brand">
            <Image
              src="/logos/kabo-emblem-white-blue.png"
              alt="KABO emblem"
              width={68}
              height={68}
            />
            <p>
              Intelligent infrastructure.
              <br />
              Engineered to perform.
            </p>
            <span>
              B-BBEE Level 1 · 135% recognition
              <br />
              100% Black-owned · South Africa
            </span>
          </div>
          {columns.map((column) => (
            <div key={column.label}>
              <h3>{column.label}</h3>
              {column.links.map((link) => (
                <SiteLink
                  key={link.title}
                  page={link.page}
                  detail={link.detail}
                >
                  {link.title}
                </SiteLink>
              ))}
            </div>
          ))}
        </div>
        <div className="e-footer-wordmark" aria-hidden="true">
          <Image
            src="/logos/kabo-logo-white.png"
            alt=""
            width={824}
            height={237}
            sizes="(max-width:767px) 100vw, 90vw"
          />
        </div>
        <div className="e-footer-bottom">
          <span>© {new Date().getFullYear()} KABO IT Group</span>
          <div>
            <SiteLink page="privacy">Privacy & POPIA</SiteLink>
            <SiteLink page="terms">Terms of use</SiteLink>
            <a
              href="#main-content"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
