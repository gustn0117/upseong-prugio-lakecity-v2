"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const typeInfo = [
  { type: "72㎡", variants: "A·B·C·D", desc: "효율적인 공간 구성의 실속형 타입" },
  { type: "84㎡", variants: "A·B·C·D", desc: "가장 인기 있는 국민 평형 타입" },
  { type: "95㎡", variants: "A·B", desc: "넉넉한 공간의 프리미엄 타입" },
];

export default function BusinessSection() {
  const hero = useInView();
  const info = useInView();
  const types = useInView();

  return (
    <section className="pt-[56px] bg-paper">

      {/* ── EDITORIAL HEADER ── */}
      <div className="bg-ink text-paper relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-24 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-4">N°01 — OVERVIEW</p>
            <h1 className="font-display text-paper text-[48px] lg:text-[88px] leading-[0.95] tracking-tight" style={{ fontWeight: 400 }}>
              사업개요<br />
              <span className="italic text-rust">Project Brief.</span>
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-12">
            <p className="text-paper/55 text-[14px] font-light leading-[2]">
              충청남도 천안시 서북구 업성동에 들어서는 1,908세대 규모의 푸르지오 단지.
              지하 2층 ~ 지상 39층, 11개동, 전용 72·84·95㎡ 의 다양한 평형을 갖춘
              성성호수 새도시의 새로운 랜드마크.
            </p>
          </div>
        </div>
      </div>

      {/* ── BIG NUMBERS ── */}
      <div ref={hero.ref} className="bg-paper-deep border-b border-ink/[0.08]">
        <div className={`max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-20 transition-all duration-700 ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-ink/10 lg:divide-y-0 lg:divide-x lg:divide-ink/10">
            {[
              { num: "39", unit: "F", label: "최고 층수", note: "Top floor" },
              { num: "11", unit: "동", label: "동 수", note: "Buildings" },
              { num: "1,908", unit: "세대", label: "총 세대수", note: "Households" },
              { num: "1,460", unit: "세대", label: "금회 공급", note: "This phase" },
            ].map((item, i) => (
              <div key={i} className={`px-2 lg:px-8 py-6 lg:py-2 ${i < 2 ? "border-r border-ink/10 lg:border-r-0" : ""}`}>
                <p className="font-display text-ink tabular-nums text-[44px] lg:text-[64px] leading-none tracking-tighter" style={{ fontWeight: 400 }}>
                  {item.num}<span className="text-rust text-[18px] lg:text-[22px] font-light ml-2">{item.unit}</span>
                </p>
                <p className="text-stone text-[12.5px] mt-3">{item.label}</p>
                <p className="text-mono text-[9px] tabular-nums text-stone-light mt-1 tracking-[2px] uppercase">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROJECT INFO ── */}
      <div ref={info.ref} className="bg-paper">
        <div className={`max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32 grid grid-cols-12 gap-10 lg:gap-12 transition-all duration-700 ${info.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 self-start">
              <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-3">N°02 — DETAILS</p>
              <h2 className="font-display text-ink text-[36px] lg:text-[52px] leading-[1.05] tracking-tight" style={{ fontWeight: 400 }}>
                성성호수의<br />
                <span className="italic text-rust">새로운 랜드마크.</span>
              </h2>
              <p className="text-stone text-[14px] leading-[2] font-light mt-8 max-w-[420px]">
                총 1,908세대의 대규모 주거단지가 업성3 도시개발지구에 들어섭니다.
                금회 공급 1블록 1,460세대, 지하 2층 ~ 지상 39층, 11개동.
                대우건설의 기술력과 푸르지오 브랜드 가치가 결합된 새로운 주거 라이프.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="divide-y divide-ink/10">
                {[
                  { label: "현장명", value: "업성 푸르지오 레이크시티" },
                  { label: "대지위치", value: "천안 업성3 도시개발지구 내 공동주택 부지(1BL)" },
                  { label: "건축규모", value: "총 1,908세대 중 금회공급 1블록 1,460세대\n지하 2층 ~ 지상 39층 11개동" },
                  { label: "주택형", value: "전용 72㎡A·B·C·D / 84㎡A·B·C·D / 95㎡A·B" },
                  { label: "시공사", value: "대우건설" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-12 gap-3 py-6 first:pt-0">
                    <div className="col-span-3 lg:col-span-3">
                      <span className="text-mono text-[10px] tabular-nums text-rust tracking-[2px] uppercase">/{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-stone text-[12px] mt-1">{row.label}</p>
                    </div>
                    <span className="col-span-9 lg:col-span-9 text-ink text-[14.5px] font-light whitespace-pre-line leading-[1.85]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      {/* ── UNIT TYPES ── */}
      <div ref={types.ref} className="bg-paper-deep">
        <div className={`max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32 transition-all duration-700 ${types.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-3">N°03 — UNITS</p>
              <h2 className="font-display text-ink text-[32px] lg:text-[46px] tracking-tight" style={{ fontWeight: 400 }}>타입별 안내.</h2>
            </div>
            <p className="hidden lg:block text-mono text-[10px] tabular-nums text-stone-light">3 TYPES · 10 PLANS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15">
            {typeInfo.map((t, i) => (
              <div key={i} className="bg-paper p-8 lg:p-10 min-h-[260px] flex flex-col justify-between">
                <div>
                  <p className="text-mono text-[10px] tabular-nums text-rust tracking-[3px] mb-2">TYPE / {String(i + 1).padStart(2, "0")}</p>
                  <p className="font-display text-ink text-[44px] lg:text-[56px] tracking-tight leading-none" style={{ fontWeight: 400 }}>
                    {t.type}
                  </p>
                  <p className="text-rust text-[12px] tracking-wider mt-3 font-medium">{t.variants}</p>
                </div>
                <p className="text-stone text-[13px] font-light leading-relaxed mt-8">{t.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-stone-light text-[11px] mt-10 font-light">
            * 상기 내용은 인허가 과정에서 변경될 수 있습니다.
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24">
          <ContactCTA variant="slab" heading="분양 상담" subheading="사업 개요·평형 정보·일정에 관한 자세한 안내를 받아보실 수 있습니다." />
        </div>
      </div>
    </section>
  );
}
