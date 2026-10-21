"use client";

import { useEffect } from "react";

/**
 * Lightweight deterrent for casual republishing of KABO's original material.
 * Does not constitute digital-rights management or prevent screenshots/devtools.
 * Never intercepts typing, selection or clipboard use inside user-editable fields.
 */
export function ContentRightsGuard() {
  useEffect(() => {
    const editable = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      return Boolean(element?.closest("input, textarea, select, [contenteditable='true'], [role='textbox']"));
    };
    const onContextMenu = (event: MouseEvent) => {
      if (!editable(event.target) && (event.target as Element | null)?.closest("main")) event.preventDefault();
    };
    const onCopy = (event: ClipboardEvent) => {
      if (!editable(event.target) && (event.target as Element | null)?.closest("main")) event.preventDefault();
    };
    const onDrag = (event: DragEvent) => {
      if ((event.target as Element | null)?.closest("main img, main svg")) event.preventDefault();
    };
    const onKey = (event: KeyboardEvent) => {
      if (editable(event.target) || event.altKey) return;
      const combo = event.ctrlKey || event.metaKey;
      if (!combo) return;
      if (["s", "p"].includes(event.key.toLowerCase())) event.preventDefault();
    };
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopy);
    document.addEventListener("dragstart", onDrag);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("dragstart", onDrag);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}
