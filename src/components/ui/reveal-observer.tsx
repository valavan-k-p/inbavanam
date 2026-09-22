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

    // Safety net. If the observer misses an element for any reason, nothing
    // would ever show it again, so a scroll pass reveals anything that is
    // measurably inside the viewport. It only looks at elements still hidden.
    let queued = false;
    const sweep = () => {
      queued = false;
      const pending = document.querySelectorAll(SELECTOR);
      if (!pending.length) return;
      pending.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight) {
          el.setAttribute("data-revealed", "");
          io.unobserve(el);
        }
      });
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
