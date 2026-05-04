"use client";

import { useEffect, useRef, useState } from "react";
import ContactCTA from "@/components/ContactCTA";
import { SUPPLY_DETAIL } from "@/lib/site";

const types = [
  { id: "72A", img: "/images/crawled/type_info_72a.jpg", area: "72.7578㎡" },
  { id: "72B", img: "/images/crawled/type_info_72b.jpg", area: "72.8526㎡" },
  { id: "72C", img: "/images/crawled/type_info_72c.jpg", area: "72.8920㎡" },
  { id: "72D", img: "/images/crawled/type_info_72d.jpg", area: "72.8938㎡" },
  { id: "84A", img: "/images/crawled/type_info_84a.jpg", area: "84.9631㎡" },
  { id: "84B", img: "/images/crawled/type_info_84b.jpg", area: "84.9637㎡" },
  { id: "84C", img: "/images/crawled/type_info_84c.jpg", area: "84.9789㎡" },
  { id: "84D", img: "/images/crawled/type_info_84d.jpg", area: "84.9924㎡" },
  { id: "95A", img: "/images/crawled/type_info_95a.jpg", area: "95.7927㎡" },
  { id: "95B", img: "/images/crawled/type_info_95b.jpg", area: "95.7890㎡" },
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
      <div className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Type Info</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              세대 안내
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/65 text-[13.5px] font-light leading-[1.95]">
              전용 72㎡ A·B·C·D / 84㎡ A·B·C·D / 95㎡ A·B — 3개 평형 10개 타입의 평면안내입니다.
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

      {/* ── FLOOR PLAN ── */}
      <div ref={content.ref} className={`bg-paper transition-opacity duration-500 ${content.visible ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-20">

          <div className="grid grid-cols-12 gap-10 lg:gap-12">
            {/* meta */}
            <div className="col-span-12 lg:col-span-3 lg:sticky lg:top-[140px] self-start">
              <p className="text-rust text-[11px] tracking-[3px] uppercase mb-3">Type {current.id}</p>
              <p className="text-ink text-[44px] lg:text-[56px] leading-none tracking-tight tabular-nums" style={{ fontWeight: 300 }}>
                {current.id.replace(/[A-D]/, "")}㎡
              </p>
              <p className="text-stone text-[13px] font-light mt-3">전용 {current.area}</p>

              {supplyData && (
                <div className="mt-8 border-t border-ink/15 pt-6 space-y-4">
                  <div>
                    <p className="text-stone-light text-[10.5px] tracking-[2px] uppercase mb-1.5">총 공급</p>
                    <p className="text-ink text-[20px] tabular-nums" style={{ fontWeight: 400 }}>{supplyData.total}세대</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <div>
                      <p className="text-stone-light text-[10px] tracking-wider mb-1">특별</p>
                      <p className="text-stone text-[14.5px] tabular-nums font-light">{supplyData.special}</p>
                    </div>
                    <div>
                      <p className="text-stone-light text-[10px] tracking-wider mb-1">일반</p>
                      <p className="text-stone text-[14.5px] tabular-nums font-light">{supplyData.general}</p>
                    </div>
                    <div>
                      <p className="text-stone-light text-[10px] tracking-wider mb-1">최하층</p>
                      <p className="text-stone text-[14.5px] tabular-nums font-light">{supplyData.bottom}</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-stone-light text-[11px] mt-8 font-light leading-relaxed">
                * 본 평면도는 소비자의 이해를 돕기 위해 제작된 것으로 인·허가 과정이나 실제 시공 시 현장 여건에 따라 상이할 수 있습니다.
              </p>
            </div>

            {/* image */}
            <div className="col-span-12 lg:col-span-9">
              <div className="border border-ink/10 bg-paper p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={current.img} alt={`${current.id} 평면도`} className="w-full h-auto block" />
              </div>
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
              평형별 썸네일을 클릭하시면 해당 타입의 평면도를 확인하실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveType(t.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`group text-left border transition-all ${
                  activeType === t.id ? "border-rust bg-paper" : "border-ink/10 bg-paper hover:border-ink/30"
                }`}
              >
                <div className="aspect-[1100/1077] bg-paper overflow-hidden border-b border-ink/[0.06]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.img} alt={`${t.id} 미리보기`} className="w-full h-full object-cover" />
                </div>
                <div className="px-4 py-3 flex items-baseline justify-between">
                  <span className="text-ink text-[14px] tabular-nums" style={{ fontWeight: 500 }}>{t.id}</span>
                  <span className="text-stone-light text-[10.5px] tabular-nums">{t.area.replace("㎡", "")}㎡</span>
                </div>
              </button>
            ))}
          </div>
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
