"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal]:not([data-revealed])";

/**
 * Marks [data-reveal] elements as revealed when they enter the viewport.
 * Watches the DOM for elements added later (filters, route changes).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    // Anything already on screen reveals at once; the trigger margin above is
    // only for elements scrolled into view later. Without this, elements
    // pinned to the bottom edge of the first screen would never appear.
    const track = (el: Element) => {
      const rect = el.getBoundingClientRect();
      const visible = rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
      if (visible) el.setAttribute("data-revealed", "");
      else io.observe(el);
    };
    const scan = (root: ParentNode) => root.querySelectorAll(SELECTOR).forEach(track);
    scan(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(SELECTOR)) track(node);
          scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
