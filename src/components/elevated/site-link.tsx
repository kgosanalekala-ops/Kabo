"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { usePage, type Page } from "@/components/kabo/page-context";
import { hrefFor } from "@/lib/site-routes";

export function SiteLink({
  page,
  detail,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { page: Page; detail?: string }) {
  const { navigate } = usePage();
  function follow(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    navigate(page, detail);
  }
  return <a {...props} href={hrefFor(page, detail)} onClick={follow} />;
}
