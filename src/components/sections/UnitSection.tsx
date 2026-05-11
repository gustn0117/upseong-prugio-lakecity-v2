"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import { SUPPLY_DETAIL } from "@/lib/site";

const types = [
  { id: "72A", category: "72㎡", desc: "효율적인 공간 구성의 실속형. 가장 많은 484세대가 공급되는 핵심 평형." },
  { id: "72B", category: "72㎡", desc: "거주성과 채광을 균형 있게 살린 72㎡ B타입." },
  { id: "72C", category: "72㎡", desc: "공용면적이 다소 넉넉한 72㎡ C타입." },
  { id: "72D", category: "72㎡", desc: "거실 중심 동선을 살린 72㎡ D타입." },
  { id: "84A", category: "84㎡", desc: "가장 인기 있는 국민 평형 — 84㎡ A타입. 184세대 공급." },
  { id: "84B", category: "84㎡", desc: "거실과 침실 분리감을 살린 84㎡ B타입." },
  { id: "84C", category: "84㎡", desc: "공용면적이 가장 넓은 84㎡ C타입. 113세대 공급." },
  { id: "84D", category: "84㎡", desc: "효율과 채광 사이의 균형을 갖춘 84㎡ D타입." },
  { id: "95A", category: "95㎡", desc: "넉넉한 공간의 프리미엄 — 95㎡ A타입. 227세대로 95㎡ 평형 중 최다 공급." },
  { id: "95B", category: "95㎡", desc: "패밀리 라이프를 위한 95㎡ B타입." },
];

interface UnitSectionProps {
  initialSubTab?: string;
}

function useInView(threshold = 0.05) {
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

export default function UnitSection({ initialSubTab }: UnitSectionProps) {
  const [activeType, setActiveType] = useState(
    types.find((t) => t.id.toLowerCase() === (initialSubTab || "").toLowerCase())?.id || "72A"
  );
  const content = useInView();
  const current = types.find((t) => t.id === activeType) || types[0];
  const supplyData = SUPPLY_DETAIL.units.find((u) => u.code === activeType);

  return (
    <section className="pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="relative bg-ink text-paper overflow-hidden">
        <Image src="/images/office-blueprints.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/55 to-ink/35" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Type Info</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              세대 안내
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/70 text-[13.5px] font-light leading-[1.95]">
              전용 72㎡ A·B·C·D / 84㎡ A·B·C·D / 95㎡ A·B — 3개 평형 10개 타입의 면적·공급 안내입니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── TYPE SELECTOR ── */}
      <div className="bg-paper border-b border-ink/[0.08] sticky top-[56px] z-30 backdrop-blur-md bg-paper/95">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 flex items-center gap-1 overflow-x-auto py-3">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveType(t.id)}
              className={`relative px-4 py-2 text-[12.5px] tabular-nums tracking-wider whitespace-nowrap transition-all border ${
                activeType === t.id
                  ? "bg-ink text-paper border-ink"
                  : "bg-paper text-stone border-ink/15 hover:border-ink/40 hover:text-ink"
              }`}
            >
              {t.id}
            </button>
          ))}
        </div>
      </div>

      {/* ── CURRENT TYPE DETAIL ── */}
      <div ref={content.ref} className={`bg-paper transition-opacity duration-500 ${content.visible ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-20">

          {/* Floor plan image — 확장옵션 평면도 */}
          <div className="mb-12 lg:mb-16 grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 lg:col-span-3">
              <p className="text-rust text-[10.5px] tracking-[3px] uppercase mb-3">Floor Plan</p>
              <h3 className="text-ink text-[20px] tracking-tight" style={{ fontWeight: 500 }}>전용 {current.category} {current.id.slice(-1)}타입</h3>
              <p className="text-stone text-[12px] mt-1.5">확장옵션 적용 평면도</p>
              <p className="text-stone-light text-[11.5px] mt-3 font-light leading-relaxed">
                평면도는 입주자 모집공고 기준이며,<br />실제 시공 시 일부 다를 수 있습니다.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="border border-ink/10 bg-paper p-4 lg:p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/cg/plan-${current.id.toLowerCase()}.jpg`}
                  alt={`전용 ${current.category} ${current.id} 타입 확장옵션 평면도`}
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-10 lg:gap-16 border-t border-ink/[0.08] pt-12 lg:pt-16">

            {/* meta */}
            <div className="col-span-12 lg:col-span-5">
              <p className="text-rust text-[11px] tracking-[3px] uppercase mb-3">Type {current.id}</p>
              <p className="text-ink text-[60px] lg:text-[84px] leading-none tracking-tight tabular-nums" style={{ fontWeight: 300 }}>
                {current.category}
              </p>
              <p className="text-stone text-[14px] font-light mt-5 leading-[1.95] max-w-[380px]">
                {current.desc}
              </p>

              {supplyData && (
                <div className="mt-10 border-t border-ink/15 pt-8">
                  <p className="text-rust text-[10.5px] tracking-[3px] uppercase mb-5">Supply</p>
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    <div>
                      <p className="text-stone-light text-[10.5px] tracking-wider mb-1.5">총 공급</p>
                      <p className="text-ink text-[22px] tabular-nums" style={{ fontWeight: 400 }}>{supplyData.total}</p>
                    </div>
                    <div>
                      <p className="text-stone-light text-[10.5px] tracking-wider mb-1.5">특별</p>
                      <p className="text-stone text-[18px] tabular-nums font-light">{supplyData.special}</p>
                    </div>
                    <div>
                      <p className="text-stone-light text-[10.5px] tracking-wider mb-1.5">일반</p>
                      <p className="text-stone text-[18px] tabular-nums font-light">{supplyData.general}</p>
                    </div>
                    <div>
                      <p className="text-stone-light text-[10.5px] tracking-wider mb-1.5">최하층</p>
                      <p className="text-stone text-[18px] tabular-nums font-light">{supplyData.bottom}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* area spec table */}
            <div className="col-span-12 lg:col-span-7">
              <p className="text-rust text-[10.5px] tracking-[3px] uppercase mb-5">Area Spec</p>
              {supplyData && (
                <table className="w-full text-[13.5px]">
                  <tbody>
                    {[
                      { label: "주거전용면적", value: `${supplyData.area.toFixed(4)} ㎡` },
                      { label: "주거공용면적", value: `${supplyData.areaPub.toFixed(4)} ㎡` },
                      { label: "공급면적 소계", value: `${supplyData.areaSum.toFixed(4)} ㎡` },
                      { label: "기타공용면적", value: `${supplyData.areaOther.toFixed(4)} ㎡` },
                      { label: "계약면적", value: `${supplyData.areaContract.toFixed(4)} ㎡` },
                      { label: "세대별 대지지분", value: `${supplyData.landShare.toFixed(4)} ㎡` },
                    ].map((row) => (
                      <tr key={row.label} className="border-b border-ink/[0.08]">
                        <th className="text-left text-stone text-[12.5px] font-normal py-4 pr-6 align-top w-[160px]">
                          {row.label}
                        </th>
                        <td className="text-ink text-[14px] font-light tabular-nums py-4">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <p className="text-stone-light text-[11px] mt-6 font-light leading-relaxed">
                * 자료: 입주자 모집공고 공급대상 (주택관리번호 2026000086) 기준 발췌. 인·허가 과정이나 실제 시공 시 현장 여건에 따라 상이할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── ALL TYPES OVERVIEW ── */}
      <div className="bg-paper-deep border-y border-ink/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24">
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">All Types</p>
              <h2 className="text-ink text-[26px] lg:text-[32px] tracking-tight" style={{ fontWeight: 300 }}>10개 타입 한눈에</h2>
            </div>
            <p className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10 text-stone text-[13.5px] leading-[2] font-light max-w-[520px]">
              평형별 면적 및 공급세대수를 한 표에 정리했습니다. 행을 클릭하면 해당 타입 상세로 이동합니다.
            </p>
          </div>

          <div className="overflow-x-auto border border-ink/10 bg-paper">
            <table className="w-full text-[12.5px] tabular-nums">
              <thead className="bg-paper-deep">
                <tr className="text-stone text-[11px] tracking-wider">
                  <th className="text-left font-normal px-4 py-3 border-b border-ink/10">타입</th>
                  <th className="text-right font-normal px-4 py-3 border-b border-ink/10">전용면적</th>
                  <th className="text-right font-normal px-4 py-3 border-b border-ink/10">공급면적 소계</th>
                  <th className="text-right font-normal px-4 py-3 border-b border-ink/10">계약면적</th>
                  <th className="text-right font-normal px-4 py-3 border-b border-ink/10">총공급</th>
                  <th className="text-right font-normal px-4 py-3 border-b border-ink/10">특별</th>
                  <th className="text-right font-normal px-4 py-3 border-b border-ink/10">일반</th>
                </tr>
              </thead>
              <tbody>
                {SUPPLY_DETAIL.units.map((u) => (
                  <tr
                    key={u.code}
                    onClick={() => {
                      setActiveType(u.code);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`border-b border-ink/[0.06] cursor-pointer transition-colors ${
                      activeType === u.code ? "bg-paper-deep" : "hover:bg-paper-deep/60"
                    }`}
                  >
                    <td className="text-ink px-4 py-3 font-medium">
                      <span className={`inline-block px-2 py-0.5 ${activeType === u.code ? "bg-ink text-paper" : ""}`}>
                        {u.code}
                      </span>
                    </td>
                    <td className="text-ink/80 px-4 py-3 text-right font-light">{u.area.toFixed(4)}</td>
                    <td className="text-stone px-4 py-3 text-right font-light">{u.areaSum.toFixed(4)}</td>
                    <td className="text-stone px-4 py-3 text-right font-light">{u.areaContract.toFixed(4)}</td>
                    <td className="text-ink px-4 py-3 text-right">{u.total}</td>
                    <td className="text-stone-light px-4 py-3 text-right font-light">{u.special}</td>
                    <td className="text-stone-light px-4 py-3 text-right font-light">{u.general}</td>
                  </tr>
                ))}
                <tr className="bg-paper-deep">
                  <td className="text-ink px-4 py-3 font-medium" colSpan={4}>합계</td>
                  <td className="text-ink px-4 py-3 text-right font-medium">{SUPPLY_DETAIL.total.toLocaleString()}</td>
                  <td className="text-ink px-4 py-3 text-right">{SUPPLY_DETAIL.specialTotal}</td>
                  <td className="text-ink px-4 py-3 text-right">{SUPPLY_DETAIL.generalTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-stone-light text-[11px] mt-6 font-light">
            * 단위: ㎡, 세대 — 자료: 입주자 모집공고 (주택관리번호 2026000086) 기준 발췌.
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24">
          <ContactCTA variant="slab" heading="세대 안내" subheading="평면도·마감재·인테리어 등 자세한 안내를 받아보실 수 있습니다." />
        </div>
      </div>
    </section>
  );
}
