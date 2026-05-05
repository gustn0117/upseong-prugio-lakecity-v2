"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import { SUPPLY_DETAIL } from "@/lib/site";

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
  { type: "72㎡", variants: "A·B·C·D", desc: "효율적인 공간 구성의 실속형 — 총 749세대 공급" },
  { type: "84㎡", variants: "A·B·C·D", desc: "가장 인기 있는 국민 평형 — 총 409세대 공급" },
  { type: "95㎡", variants: "A·B", desc: "넉넉한 공간의 프리미엄 — 총 302세대 공급" },
];

export default function BusinessSection() {
  const hero = useInView();
  const info = useInView();
  const types = useInView();
  const supply = useInView();

  return (
    <section className="pt-[140px] lg:pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="relative bg-ink text-paper overflow-hidden">
        <Image src="/images/office-blueprints.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/55 to-ink/35" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Overview</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              사업개요
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/70 text-[13.5px] font-light leading-[1.95]">
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
                  { label: "대지위치", value: "충청남도 천안시 서북구 업성동 업성3도시개발구역 A1BL" },
                  { label: "건축규모", value: "총 1,908세대 중 금회공급 1블록 1,460세대\n지하 2층 ~ 지상 39층, 11개동" },
                  { label: "주택형", value: "전용 72㎡ (A·B·C·D) / 84㎡ (A·B·C·D) / 95㎡ (A·B) — 3개 평형 10개 타입" },
                  { label: "공급세대", value: "특별공급 654세대 + 일반공급 806세대 (최하층 우선배정 39세대 포함)" },
                  { label: "주택관리번호", value: "2026000086" },
                  { label: "입주시기", value: "2029년 9월 예정" },
                  { label: "시행사", value: "교보자산신탁(주)" },
                  { label: "시공사", value: "(주)대우건설" },
                  { label: "분양문의", value: "1668-3535" },
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

      {/* ── SUPPLY DETAIL TABLE ── */}
      <div ref={supply.ref} className="bg-paper border-t border-ink/[0.08]">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-28 transition-all duration-700 ${supply.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Supply</p>
              <h2 className="text-ink text-[26px] lg:text-[32px] tracking-tight" style={{ fontWeight: 300 }}>공급세대 상세</h2>
            </div>
            <p className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10 text-stone text-[13.5px] leading-[2] font-light max-w-[560px]">
              주택형별 공급 세대수 및 특별공급·일반공급 배정 안내입니다.
              총 1,460세대 중 특별공급 654세대(기관추천 111 / 다자녀 140 / 신혼부부 262 / 노부모부양 40 / 생애최초 101), 일반공급 806세대로 구성됩니다.
            </p>
          </div>

          <div className="overflow-x-auto border border-ink/10">
            <table className="w-full text-[12.5px] tabular-nums">
              <thead className="bg-paper-deep">
                <tr className="text-stone text-[11px] tracking-wider">
                  <th className="text-left font-normal px-4 py-3 border-b border-ink/10">주택형</th>
                  <th className="text-right font-normal px-4 py-3 border-b border-ink/10">전용면적(㎡)</th>
                  <th className="text-right font-normal px-4 py-3 border-b border-ink/10">총공급</th>
                  <th className="text-right font-normal px-4 py-3 border-b border-ink/10">특별공급</th>
                  <th className="text-right font-normal px-4 py-3 border-b border-ink/10">일반공급</th>
                  <th className="text-right font-normal px-4 py-3 border-b border-ink/10">최하층</th>
                </tr>
              </thead>
              <tbody>
                {SUPPLY_DETAIL.units.map((u) => (
                  <tr key={u.code} className="border-b border-ink/[0.06]">
                    <td className="text-ink px-4 py-3 font-medium">{u.code}</td>
                    <td className="text-ink/80 px-4 py-3 text-right font-light">{u.area.toFixed(4)}</td>
                    <td className="text-ink px-4 py-3 text-right">{u.total}</td>
                    <td className="text-stone px-4 py-3 text-right font-light">{u.special}</td>
                    <td className="text-stone px-4 py-3 text-right font-light">{u.general}</td>
                    <td className="text-stone-light px-4 py-3 text-right font-light">{u.bottom}</td>
                  </tr>
                ))}
                <tr className="bg-paper-deep">
                  <td className="text-ink px-4 py-3 font-medium" colSpan={2}>합계</td>
                  <td className="text-ink px-4 py-3 text-right font-medium">{SUPPLY_DETAIL.total.toLocaleString()}</td>
                  <td className="text-ink px-4 py-3 text-right">{SUPPLY_DETAIL.specialTotal}</td>
                  <td className="text-ink px-4 py-3 text-right">{SUPPLY_DETAIL.generalTotal}</td>
                  <td className="text-ink px-4 py-3 text-right">{SUPPLY_DETAIL.reservedBottom}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-stone-light text-[11px] mt-6 font-light leading-relaxed">
            * 단위: ㎡, 세대 / 자료: 입주자 모집공고 (주택관리번호 2026000086) 기준 발췌. 정확한 사항은 공식 공고문을 확인해 주시기 바랍니다.
          </p>
        </div>
      </div>

      {/* ── SCHEDULE TABLE ── */}
      <div className="bg-paper-deep border-t border-ink/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24">
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Calendar</p>
              <h2 className="text-ink text-[26px] lg:text-[32px] tracking-tight" style={{ fontWeight: 300 }}>분양 일정</h2>
            </div>
            <p className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10 text-stone text-[13.5px] leading-[2] font-light max-w-[520px]">
              모델하우스 OPEN부터 입주까지의 핵심 일정을 한눈에. 정당계약은 5월 4일(월) ~ 5월 7일(목) 모델하우스에서 진행됩니다.
            </p>
          </div>

          <div className="border border-ink/10 bg-paper">
            <table className="w-full text-[13.5px]">
              <tbody>
                {[
                  { label: "모델하우스 OPEN", date: "2026.04.10 (금)", note: "그랜드 오픈" },
                  { label: "입주자 모집공고", date: "2026.04.07", note: "주택관리번호 2026000086" },
                  { label: "특별공급 청약", date: "2026.04.13 (월)", note: "기관추천·다자녀·신혼부부·노부모부양·생애최초" },
                  { label: "1순위 청약", date: "2026.04.14 (화)", note: "청약Home 인터넷 접수" },
                  { label: "2순위 청약", date: "2026.04.15 (수)", note: "청약Home 인터넷 접수" },
                  { label: "당첨자 발표", date: "2026.04.22 (수)", note: "청약Home" },
                  { label: "당첨자 서류접수", date: "2026.04.24 ~ 05.01", note: "모델하우스 방문 접수" },
                  { label: "정당계약 체결", date: "2026.05.04 ~ 05.07", note: "모델하우스" },
                  { label: "입주", date: "2029.09 예정", note: "정확한 입주일자 추후 통보" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-ink/[0.06] last:border-b-0">
                    <th className="text-left text-stone text-[12.5px] font-normal py-4 px-5 align-top w-[180px]">
                      {row.label}
                    </th>
                    <td className="text-ink text-[14px] py-4 px-5 align-top tabular-nums" style={{ fontWeight: 500 }}>
                      {row.date}
                    </td>
                    <td className="text-stone-light text-[12.5px] py-4 px-5 align-top font-light hidden md:table-cell">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
