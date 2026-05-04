"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * FAQ 아코디언 — 미니멀 스타일.
 */
export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-paper border-t border-ink/[0.08]">
      <div className={`max-w-[920px] mx-auto px-6 py-20 lg:py-24 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

        <div className="mb-10">
          <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">FAQ</p>
          <h2 className="text-ink text-[26px] lg:text-[32px] tracking-tight" style={{ fontWeight: 300 }}>
            자주 묻는 질문
          </h2>
        </div>

        <div className="border-t border-ink/15">
          {SITE.faq.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={i} className="border-b border-ink/[0.08]">
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-5 text-left"
                >
                  <h3 className={`text-[14.5px] lg:text-[15px] tracking-tight leading-snug pr-4 ${
                    open ? "text-ink font-medium" : "text-ink/85 font-normal"
                  }`}>
                    {item.q}
                  </h3>
                  <span className={`flex-shrink-0 mt-0.5 text-stone transition-transform duration-300 ${open ? "rotate-180 text-rust" : ""}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <div className={`grid transition-all duration-400 ease-out ${
                  open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                }`}>
                  <div className="overflow-hidden">
                    <p className="text-stone text-[13.5px] font-light leading-[2] pr-8">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
