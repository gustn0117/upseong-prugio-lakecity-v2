"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * 사업주체 정보 — 미니멀 4-column.
 */
export default function BrandIdentityStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const placeholder = "추후공지";

  const items = [
    { label: "시공", value: SITE.builder },
    { label: "시행", value: SITE.company.developer || placeholder },
    { label: "분양", value: SITE.company.salesAgency || placeholder },
    { label: "신탁", value: SITE.company.trust || placeholder },
  ];

  return (
    <div ref={ref} className="bg-paper-deep border-y border-ink/[0.08]">
      <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

        <div className="mb-10">
          <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Stakeholders</p>
          <h2 className="text-ink text-[24px] lg:text-[28px] tracking-tight" style={{ fontWeight: 300 }}>
            사업 정보
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-ink/10 lg:divide-y-0 lg:divide-x lg:divide-ink/10 border-t border-ink/15 lg:border-0">
          {items.map((it, i) => (
            <div key={it.label} className={`px-2 lg:px-7 py-6 lg:py-1 ${i % 2 === 0 ? "border-r border-ink/10 lg:border-r-0" : ""}`}>
              <p className="text-stone text-[11.5px] tracking-wider mb-2">{it.label}</p>
              <p className={`text-[18px] lg:text-[20px] leading-tight tracking-tight ${
                it.value === placeholder ? "text-stone-light font-light" : "text-ink"
              }`} style={{ fontWeight: it.value === placeholder ? 300 : 500 }}>
                {it.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
