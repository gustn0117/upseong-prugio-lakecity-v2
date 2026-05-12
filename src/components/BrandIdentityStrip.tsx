"use client";

import { SITE } from "@/lib/site";

/**
 * 사업주체 정보 — 시공 / 신탁만 표기.
 */
export default function BrandIdentityStrip() {
  const placeholder = "추후공지";

  const items: { label: string; value: string }[] = [
    { label: "시공", value: SITE.builder },
    { label: "신탁", value: SITE.company.trust || placeholder },
  ];

  return (
    <div className="bg-paper-deep border-y border-ink/[0.08]">
      <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-20">

        <div className="mb-10">
          <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Stakeholders</p>
          <h2 className="text-ink text-[24px] lg:text-[28px] tracking-tight" style={{ fontWeight: 300 }}>
            사업 정보
          </h2>
        </div>

        <div className="grid grid-cols-2 divide-x divide-ink/10 border-t border-ink/15">
          {items.map((it) => (
            <div key={it.label} className="px-3 lg:px-7 py-6 lg:py-2 first:pl-0">
              <p className="text-stone text-[11.5px] tracking-wider mb-2">{it.label}</p>
              <p className={`text-[18px] lg:text-[22px] leading-tight tracking-tight ${
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
