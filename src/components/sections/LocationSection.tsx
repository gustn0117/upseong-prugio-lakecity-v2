"use client";

import { useEffect, useRef, useState } from "react";
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

const advantages = [
  { tag: "Lake Park", title: "성성호수공원", time: "도보 1분", desc: "호수공원 바로 앞, 자연과 함께하는 프리미엄 생활" },
  { tag: "Education", title: "교육 인프라", time: "학세권", desc: "천안업성초·중 인접, 공주대 천안캠퍼스·단국대 근접" },
  { tag: "Transport", title: "광역 교통", time: "KTX 역세권", desc: "천안아산역 KTX/SRT, 경부고속도로·1호선 인접" },
  { tag: "Industry", title: "산업 · 생활", time: "직주근접", desc: "삼성SDI·삼성디스플레이 인접, 대형마트 등 생활 편의" },
];

const nearbySpots = [
  { category: "자연", items: ["성성호수공원 — 도보 1분", "노태근린공원 — 도보 5분", "어린이공원 — 도보 3분"] },
  { category: "교육", items: ["천안업성초등학교 — 도보 5분", "중학교(예정) — 도보 3분", "가람초·가람중 — 차량 5분"] },
  { category: "교통", items: ["천안아산역(KTX) — 차량 15분", "1호선(정차역) — 차량 10분", "경부고속도로 — 차량 10분"] },
  { category: "생활", items: ["삼성디스플레이시티 — 차량 5분", "이마트·롯데마트 — 차량 10분", "천안시청 — 차량 15분"] },
];

export default function LocationSection() {
  const adv = useInView();
  const map = useInView();
  const infra = useInView();

  return (
    <section className="pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Location</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              입지환경
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/65 text-[13.5px] font-light leading-[1.95]">
              호수공원 도보 1분, KTX 역세권, 직주근접의 산업 인프라.
              자연과 도시가 균형을 이루는 좌표 위에 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── ADVANTAGES TABLE ── */}
      <div ref={adv.ref} className="bg-paper border-b border-ink/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-20">
          <div className="border-t border-ink/15">
            {advantages.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-12 gap-3 sm:gap-6 items-center py-7 sm:py-8 border-b border-ink/[0.08] transition-all duration-500 ${adv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="col-span-2 sm:col-span-2 text-[10.5px] tracking-[3px] uppercase text-rust">{item.tag}</span>
                <h3 className="col-span-7 sm:col-span-3 text-ink text-[18px] lg:text-[20px] tracking-tight" style={{ fontWeight: 400 }}>{item.title}</h3>
                <p className="col-span-12 sm:col-span-5 text-stone text-[13px] font-light leading-relaxed">{item.desc}</p>
                <span className="col-span-3 sm:col-span-2 text-ink text-[12.5px] tabular-nums text-right tracking-wider">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAP ── */}
      <div ref={map.ref} className="bg-paper-deep border-b border-ink/[0.08]">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24 transition-all duration-700 ${map.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Map</p>
              <h2 className="text-ink text-[26px] lg:text-[32px] tracking-tight" style={{ fontWeight: 300 }}>입지 안내</h2>
            </div>
            <p className="text-stone-light text-[11px] font-light">
              * 본 이미지는 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있습니다.
            </p>
          </div>
          <div className="border border-ink/10 p-2 bg-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/location.jpg"
              alt="업성 푸르지오 레이크시티 입지 안내도"
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>

      {/* ── INFRASTRUCTURE ── */}
      <div ref={infra.ref} className="bg-paper">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-28 transition-all duration-700 ${infra.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-12 gap-6 mb-12">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Infra</p>
              <h2 className="text-ink text-[26px] lg:text-[32px] tracking-tight" style={{ fontWeight: 300 }}>주변 인프라</h2>
            </div>
            <p className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10 text-stone text-[13.5px] leading-[2] font-light max-w-[520px]">
              자연·교육·교통·생활 — 4개 카테고리로 정리한 주변 인프라 안내입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
            {nearbySpots.map((group) => (
              <div key={group.category} className="bg-paper p-6 lg:p-7 min-h-[220px]">
                <h4 className="text-ink text-[18px] tracking-tight mb-5 pb-3 border-b border-ink/10" style={{ fontWeight: 500 }}>
                  {group.category}
                </h4>
                <ul className="space-y-2.5">
                  {group.items.map((item, ii) => (
                    <li key={ii} className="text-stone text-[12.5px] font-light leading-relaxed">— {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-stone-light text-[11px] mt-8 font-light">
            * 거리 및 소요시간은 네이버 지도 기준이며, 교통 상황에 따라 달라질 수 있습니다.
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24">
          <ContactCTA variant="slab" heading="입지 안내" subheading="현장 위치 및 주변 인프라에 대해 자세한 안내를 받아보실 수 있습니다." />
        </div>
      </div>
    </section>
  );
}
