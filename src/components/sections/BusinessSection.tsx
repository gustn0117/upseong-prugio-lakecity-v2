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
    <section className="pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Overview</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              사업개요
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/65 text-[13.5px] font-light leading-[1.95]">
              총 1,908세대, 지하 2층 ~ 지상 39층, 11개동.
              성성호수 새도시의 새로운 랜드마크.
            </p>
          </div>
        </div>
      </div>

      {/* ── BIG NUMBERS ── */}
      <div ref={hero.ref} className="bg-paper-deep border-b border-ink/[0.08]">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-16 transition-all duration-700 ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-ink/10 lg:divide-y-0 lg:divide-x lg:divide-ink/10">
            {[
              { num: "39", unit: "층", label: "최고 층수" },
              { num: "11", unit: "동", label: "동 수" },
              { num: "1,908", unit: "세대", label: "총 세대수" },
              { num: "1,460", unit: "세대", label: "금회 공급" },
            ].map((item, i) => (
              <div key={i} className={`px-2 lg:px-8 py-5 lg:py-2 ${i < 2 ? "border-r border-ink/10 lg:border-r-0" : ""}`}>
                <p className="text-ink tabular-nums text-[34px] lg:text-[44px] leading-none tracking-tight" style={{ fontWeight: 300 }}>
                  {item.num}<span className="text-stone text-[14px] lg:text-[16px] ml-2 align-baseline">{item.unit}</span>
                </p>
                <p className="text-stone text-[12px] mt-3">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROJECT INFO ── */}
      <div ref={info.ref} className="bg-paper">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-28 grid grid-cols-12 gap-10 lg:gap-12 transition-all duration-700 ${info.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32 self-start">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Details</p>
            <h2 className="text-ink text-[26px] lg:text-[32px] leading-[1.25] tracking-tight" style={{ fontWeight: 300 }}>
              사업 개요
            </h2>
            <p className="text-stone text-[13.5px] leading-[2] font-light mt-5 max-w-[400px]">
              업성3 도시개발지구에 들어서는 대규모 주거단지의 정식 개요입니다.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <table className="w-full text-[14px]">
              <tbody>
                {[
                  { label: "현장명", value: "업성 푸르지오 레이크시티" },
                  { label: "대지위치", value: "천안 업성3 도시개발지구 내 공동주택 부지 (1BL)" },
                  { label: "건축규모", value: "총 1,908세대 중 금회공급 1블록 1,460세대\n지하 2층 ~ 지상 39층, 11개동" },
                  { label: "주택형", value: "전용 72㎡ (A·B·C·D) / 84㎡ (A·B·C·D) / 95㎡ (A·B)" },
                  { label: "시공사", value: "대우건설" },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-ink/[0.08]">
                    <th className="text-left text-stone text-[12.5px] font-normal py-5 pr-6 align-top w-[120px] lg:w-[140px]">
                      {row.label}
                    </th>
                    <td className="text-ink text-[14px] font-light whitespace-pre-line leading-[1.9] py-5">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── UNIT TYPES ── */}
      <div ref={types.ref} className="bg-paper-deep border-t border-ink/[0.08]">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-28 transition-all duration-700 ${types.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Units</p>
              <h2 className="text-ink text-[26px] lg:text-[32px] tracking-tight" style={{ fontWeight: 300 }}>타입별 안내</h2>
            </div>
            <p className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10 text-stone text-[13.5px] leading-[2] font-light max-w-[480px]">
              3개 평형 · 10개 타입으로 구성된 주택형 안내입니다. 정확한 규격은 정식 분양 시 안내됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
            {typeInfo.map((t) => (
              <div key={t.type} className="bg-paper p-7 lg:p-8 min-h-[200px] flex flex-col justify-between">
                <div>
                  <p className="text-stone text-[11px] tracking-[2px] uppercase mb-3">전용</p>
                  <p className="text-ink text-[36px] lg:text-[42px] tracking-tight leading-none tabular-nums" style={{ fontWeight: 300 }}>
                    {t.type}
                  </p>
                  <p className="text-stone text-[12px] mt-3">{t.variants}</p>
                </div>
                <p className="text-stone text-[12.5px] font-light leading-relaxed mt-6">{t.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-stone-light text-[11px] mt-8 font-light">
            * 상기 내용은 인허가 과정에서 변경될 수 있습니다.
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24">
          <ContactCTA variant="slab" heading="분양 상담" subheading="사업 개요·평형 정보·일정에 관한 자세한 안내를 받아보실 수 있습니다." />
        </div>
      </div>
    </section>
  );
}
