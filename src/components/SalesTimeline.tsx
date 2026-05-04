"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * 분양 일정 단계 — 7-step horizontal timeline (no animation).
 */
export default function SalesTimeline() {
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

  return (
    <div ref={ref} className="bg-paper-deep border-b border-ink/[0.08]">
      <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Schedule</p>
            <h2 className="text-ink text-[26px] lg:text-[32px] tracking-tight" style={{ fontWeight: 300 }}>
              분양 일정
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] tracking-wider">
            <span className="flex items-center gap-1.5 text-ink"><span className="w-1.5 h-1.5 rounded-full bg-rust" /> 진행</span>
            <span className="flex items-center gap-1.5 text-stone"><span className="w-1.5 h-1.5 rounded-full bg-stone/40" /> 예정</span>
          </div>
        </div>

        {/* Desktop horizontal */}
        <div className="hidden lg:block">
          <div className="relative pt-3">
            <div className="absolute top-[15px] left-0 right-0 h-px bg-ink/15" />
            <div className="grid grid-cols-7 gap-0">
              {SITE.salesSchedule.map((s) => {
                const isCurrent = s.status === "current";
                return (
                  <div key={s.step} className="relative pr-4">
                    <div className={`relative w-[7px] h-[7px] rounded-full mb-5 ${
                      isCurrent ? "bg-rust" : "bg-paper-deep border border-ink/25"
                    }`} />
                    <p className={`text-[13.5px] tracking-tight mb-1.5 leading-tight ${isCurrent ? "text-ink font-medium" : "text-ink/75"}`}>
                      {s.label}
                    </p>
                    <p className={`text-[11.5px] tabular-nums tracking-wider ${
                      isCurrent ? "text-rust" : "text-stone-light"
                    }`}>
                      {s.date}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="lg:hidden">
          <div className="relative pl-5">
            <div className="absolute top-2 left-1.5 bottom-2 w-px bg-ink/15" />
            <div className="space-y-5">
              {SITE.salesSchedule.map((s) => {
                const isCurrent = s.status === "current";
                return (
                  <div key={s.step} className="relative">
                    <div className={`absolute -left-[18px] top-1.5 w-[7px] h-[7px] rounded-full ${
                      isCurrent ? "bg-rust" : "bg-paper-deep border border-ink/25"
                    }`} />
                    <p className={`text-[14.5px] tracking-tight ${isCurrent ? "text-ink font-medium" : "text-ink/75"}`}>
                      {s.label}
                    </p>
                    <p className={`text-[11.5px] tabular-nums tracking-wider mt-1 ${
                      isCurrent ? "text-rust" : "text-stone-light"
                    }`}>
                      {s.date}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-stone-light text-[11px] mt-10 font-light">
          * 본 일정은 사업 진행 상황에 따라 변경될 수 있으며, 정식 일정은 입주자 모집공고를 통해 안내됩니다.
        </p>
      </div>
    </div>
  );
}
