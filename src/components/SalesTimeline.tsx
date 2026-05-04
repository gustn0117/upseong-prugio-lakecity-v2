"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * 분양 일정 타임라인 — 7단계 milestone 횡스크롤(데스크톱) / 세로 스택(모바일).
 * 공식 분양 홈페이지의 진행 단계 안내 톤.
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
    <div ref={ref} className="bg-paper-deep border-y border-ink/[0.08]">
      <div className={`max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12 lg:mb-16">
          <div>
            <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-3">N°07 — SCHEDULE</p>
            <h2 className="font-display text-ink text-[32px] lg:text-[46px] leading-[1.05] tracking-tight" style={{ fontWeight: 400 }}>
              분양 일정
            </h2>
            <p className="text-stone text-[13px] font-light leading-[1.9] mt-4 max-w-[480px]">
              사업 진행 단계별 일정 안내입니다. 정확한 일정은 인허가 진행에 따라 공식 채널을 통해 발표됩니다.
            </p>
          </div>

          <div className="flex items-center gap-5 text-mono text-[10px] tabular-nums tracking-[2px] uppercase">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rust" /> 진행</span>
            <span className="flex items-center gap-1.5 text-stone"><span className="w-2 h-2 rounded-full bg-stone/40" /> 예정</span>
          </div>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* connecting line */}
            <div className="absolute top-[18px] left-0 right-0 h-px bg-ink/15" />

            <div className="grid grid-cols-7 gap-0">
              {SITE.salesSchedule.map((s, i) => {
                const isCurrent = s.status === "current";
                return (
                  <div key={s.step} className="relative pt-[10px] pl-1 pr-3">
                    {/* node */}
                    <div className={`relative w-4 h-4 rounded-full flex items-center justify-center mb-5 ${
                      isCurrent ? "bg-rust" : "bg-paper border border-ink/20"
                    }`}>
                      {isCurrent && <div className="absolute inset-0 rounded-full bg-rust animate-ping opacity-50" />}
                    </div>

                    <p className="text-mono text-[10px] tabular-nums text-rust tracking-wider mb-2">/ {s.step}</p>
                    <p className={`text-[14px] tracking-tight mb-2 leading-tight ${isCurrent ? "text-ink font-medium" : "text-ink/80 font-light"}`}>
                      {s.label}
                    </p>
                    <p className={`text-mono text-[11px] tabular-nums tracking-wider ${
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

        {/* Mobile: vertical stack */}
        <div className="lg:hidden">
          <div className="relative pl-6">
            <div className="absolute top-2 left-2 bottom-2 w-px bg-ink/15" />
            <div className="space-y-7">
              {SITE.salesSchedule.map((s) => {
                const isCurrent = s.status === "current";
                return (
                  <div key={s.step} className="relative">
                    <div className={`absolute -left-[20px] top-1 w-4 h-4 rounded-full ${
                      isCurrent ? "bg-rust" : "bg-paper border border-ink/20"
                    }`} />
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-mono text-[10px] tabular-nums text-rust tracking-wider">/ {s.step}</span>
                      <span className={`text-mono text-[11px] tabular-nums tracking-wider ${
                        isCurrent ? "text-rust" : "text-stone-light"
                      }`}>
                        {s.date}
                      </span>
                    </div>
                    <p className={`text-[15px] tracking-tight ${isCurrent ? "text-ink font-medium" : "text-ink/80 font-light"}`}>
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-stone-light text-[11px] mt-12 font-light">
          * 본 일정은 사업 진행 상황에 따라 변경될 수 있으며, 정식 일정은 입주자 모집공고를 통해 안내됩니다.
        </p>
      </div>
    </div>
  );
}
