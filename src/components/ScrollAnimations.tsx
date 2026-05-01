"use client";

import { useEffect, useRef } from "react";

export default function ScrollAnimations() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const scan = () => {
      document
        .querySelectorAll("[data-animate]:not(.is-visible), .stagger-children:not(.is-visible)")
        .forEach((el) => observerRef.current?.observe(el));
    };

    scan();

    // Re-scan when DOM changes (tab switches, dynamic content)
    const mutation = new MutationObserver(() => {
      requestAnimationFrame(scan);
    });

    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observerRef.current?.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
