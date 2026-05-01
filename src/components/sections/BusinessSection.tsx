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
    <section className="pt-[72px]">
      {/* ══════════ HERO BANNER ══════════ */}
      <div className="relative h-[50vh] min-h-[340px]">
        <Image src="/images/banner-business.jpg" alt="" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold/80 text-[10px] tracking-[5px] font-medium uppercase mb-4 text-shadow-subtle">Project Overview</p>
            <h1 className="text-white text-[36px] lg:text-[52px] font-extralight tracking-tight text-shadow-banner">사업개요</h1>
          </div>
        </div>
      </div>

      {/* ══════════ BIG NUMBERS ══════════ */}
      <div ref={hero.ref} className="bg-white border-b border-gray-100">
        <div className={`max-w-[1200px] mx-auto px-6 lg:px-16 py-20 transition-all duration-700 ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
            {[
              { num: "39", unit: "층", label: "최고 층수" },
              { num: "11", unit: "개동", label: "동 수" },
              { num: "1,908", unit: "세대", label: "총 세대수" },
              { num: "1,460", unit: "세대", label: "금회 공급" },
            ].map((item, i) => (
              <div key={i} className={`transition-all duration-500 ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-baseline gap-1">
                  <span className="text-[48px] lg:text-[64px] font-extralight text-charcoal leading-none tracking-tight">{item.num}</span>
                  <span className="text-gold text-[14px] font-medium">{item.unit}</span>
                </div>
                <p className="text-cool-gray text-[12px] tracking-wider mt-2 font-light">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ PROJECT INFO ══════════ */}
      <div ref={info.ref} className="bg-off-white">
        <div className={`max-w-[1200px] mx-auto px-6 lg:px-16 py-20 lg:py-28 transition-all duration-700 ${info.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left */}
            <div>
              <p className="text-gold text-[10px] tracking-[5px] font-medium uppercase mb-6">Details</p>
              <h2 className="text-[28px] lg:text-[36px] font-extralight text-charcoal tracking-tight leading-tight mb-8">
                성성호수 새도시의
                <br />
                새로운 랜드마크
              </h2>
              <div className="w-10 h-[1px] bg-gold/40 mb-8" />
              <p className="text-cool-gray text-[14px] leading-[2.2] font-light">
                총 1,908세대의 대규모 주거단지가 업성3 도시개발지구에 완성됩니다.
                금회 공급 1블록 1,460세대, 지하2층~지상39층 11개동 규모로
                대우건설의 기술력과 푸르지오 브랜드 가치가 만나
                새로운 주거 라이프를 선사합니다.
              </p>
            </div>

            {/* Right — Data Table */}
            <div>
              <div className="divide-y divide-gray-200">
                {[
                  { label: "현장명", value: "업성 푸르지오 레이크시티" },
                  { label: "대지위치", value: "천안 업성3 도시개발지구 내 공동주택 부지(1BL)" },
                  { label: "건축규모", value: "총 1,908세대 중 금회공급 1블록 1,460세대\n지하2층~지상39층 11개동" },
                  { label: "주택형", value: "전용 72㎡A·B·C·D / 84㎡A·B·C·D / 95㎡A·B" },
                  { label: "시공사", value: "대우건설" },
                ].map((row, i) => (
                  <div key={i} className="flex py-5 first:pt-0">
                    <span className="w-[90px] flex-shrink-0 text-gold text-[11px] tracking-wider font-medium pt-0.5">{row.label}</span>
                    <span className="text-dark-gray text-[14px] font-light whitespace-pre-line">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ UNIT TYPES ══════════ */}
      <div ref={types.ref} className="bg-white">
        <div className={`max-w-[1200px] mx-auto px-6 lg:px-16 py-20 lg:py-28 transition-all duration-700 ${types.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-gold text-[10px] tracking-[5px] font-medium uppercase mb-4">Unit Types</p>
          <h2 className="text-[28px] lg:text-[36px] font-extralight text-charcoal tracking-tight mb-16">타입별 안내</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
            {typeInfo.map((t, i) => (
              <div key={i} className="bg-white p-8 lg:p-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-navy text-[32px] lg:text-[38px] font-extralight tracking-tight">전용 {t.type}</span>
                </div>
                <p className="text-gold text-[12px] tracking-wider mt-2 font-medium">{t.variants}</p>
                <div className="w-8 h-[1px] bg-gray-200 mt-6 mb-4" />
                <p className="text-cool-gray text-[13px] font-light leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-cool-gray text-[11px] mt-12 font-light">
            * 상기 내용은 인허가 과정에서 변경될 수 있습니다.
          </p>
        </div>
      </div>

      {/* ══════════ CTA ══════════ */}
      <div className="bg-navy py-20">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <ContactCTA variant="navy" heading="분양 상담 문의" />
        </div>
      </div>
    </section>
  );
}
