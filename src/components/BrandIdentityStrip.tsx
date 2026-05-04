"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * 시공·시행·분양·신탁 등 사업주체 정보 패널.
 * 정식 분양 사이트의 "사업 정보 공시" 톤.
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
    { label: "시공", value: SITE.builder, note: "Construction" },
    { label: "시행", value: SITE.company.developer || placeholder, note: "Developer" },
    { label: "분양", value: SITE.company.salesAgency || placeholder, note: "Sales Agency" },
    { label: "신탁", value: SITE.company.trust || placeholder, note: "Trust" },
  ];

  return (
    <div ref={ref} className="bg-ink text-paper">
      <div className={`max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end mb-10">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-mono text-[10px] tabular-nums text-rust tracking-[3px] uppercase mb-3">N°09 — Stakeholders</p>
            <h2 className="font-display text-paper text-[28px] lg:text-[36px] leading-[1.1] tracking-tight" style={{ fontWeight: 400 }}>
              사업 정보 공시
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/55 text-[12.5px] font-light leading-[1.9]">
              본 사업의 시공·시행·분양·신탁 등 사업 주체 정보입니다. 미정 항목은 정식 분양 시 안내됩니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-paper/10 lg:divide-y-0 lg:divide-x lg:divide-paper/10">
          {items.map((it, i) => (
            <div key={it.label} className={`px-2 lg:px-8 py-7 lg:py-2 ${i % 2 === 0 ? "border-r border-paper/10 lg:border-r-0" : ""}`}>
              <p className="text-mono text-[10px] tabular-nums text-rust tracking-[2px] uppercase mb-3">/ {String(i + 1).padStart(2, "0")} {it.note}</p>
              <p className={`text-mono text-[10px] tabular-nums text-paper/40 tracking-[3px] uppercase mb-1.5`}>{it.label}</p>
              <p className={`font-display text-[24px] lg:text-[28px] leading-tight tracking-tight ${
                it.value === placeholder ? "text-paper/40" : "text-paper"
              }`} style={{ fontWeight: 400 }}>
                {it.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
