"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * FAQ 아코디언 — 정식 분양 사이트 톤의 자주 묻는 질문.
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
      <div className={`max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32 grid grid-cols-12 gap-10 lg:gap-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

        <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32 self-start">
          <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-3">N°08 — FAQ</p>
          <h2 className="font-display text-ink text-[36px] lg:text-[48px] leading-[1.05] tracking-tight" style={{ fontWeight: 400 }}>
            자주 묻는 질문
          </h2>
          <p className="text-stone text-[13px] font-light leading-[1.9] mt-6 max-w-[320px]">
            분양·청약·등록과 관련된 자주 묻는 질문에 대한 안내입니다.
            추가 문의는 분양 상담을 통해 안내받으실 수 있습니다.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="border-t border-ink/15">
            {SITE.faq.map((item, i) => {
              const open = openIdx === i;
              return (
                <div key={i} className="border-b border-ink/[0.08]">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full grid grid-cols-12 gap-3 lg:gap-6 items-start py-6 lg:py-7 text-left group"
                  >
                    <div className="col-span-1">
                      <p className="text-mono text-[11px] tabular-nums text-rust tracking-wider mt-0.5">Q.{String(i + 1).padStart(2, "0")}</p>
                    </div>
                    <h3 className={`col-span-10 text-[15px] lg:text-[16px] tracking-tight leading-snug ${
                      open ? "text-ink font-medium" : "text-ink/80 font-light group-hover:text-ink"
                    }`}>
                      {item.q}
                    </h3>
                    <div className="col-span-1 flex justify-end mt-1">
                      <span className={`text-stone transition-transform duration-300 ${open ? "rotate-45 text-rust" : ""}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16M4 12h16" />
                        </svg>
                      </span>
                    </div>
                  </button>

                  <div className={`grid transition-all duration-500 ease-out ${
                    open ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"
                  }`}>
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-12 gap-3 lg:gap-6">
                        <div className="col-span-1">
                          <p className="text-mono text-[11px] tabular-nums text-stone tracking-wider">A.{String(i + 1).padStart(2, "0")}</p>
                        </div>
                        <p className="col-span-11 text-stone text-[13.5px] lg:text-[14px] font-light leading-[2] pr-4">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
