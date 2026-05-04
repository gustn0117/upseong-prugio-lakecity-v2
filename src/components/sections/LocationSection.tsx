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

      {/* ── EDITORIAL HEADER ── */}
      <div className="bg-ink text-paper relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-24 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-4">N°02 — LOCATION</p>
            <h1 className="font-display text-paper text-[48px] lg:text-[88px] leading-[0.95] tracking-tight" style={{ fontWeight: 400 }}>
              입지환경<br />
              <span className="italic text-rust">Site Map.</span>
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-12">
            <p className="text-paper/55 text-[14px] font-light leading-[2]">
              호수공원 도보 1분, KTX 역세권, 직주근접의 산업 인프라.
              자연과 도시가 균형을 이루는 좌표 위에서 새로운 주거의 가능성이 시작됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── ADVANTAGES ── */}
      <div ref={adv.ref} className="bg-paper-deep border-y border-ink/[0.08]">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10">
          <div className="divide-y divide-ink/10">
            {advantages.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-12 gap-3 sm:gap-6 items-center py-7 sm:py-9 transition-all duration-500 ${adv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="col-span-2 sm:col-span-1 text-mono text-[11px] tabular-nums text-rust tracking-wider">/0{i + 1}</span>
                <span className="hidden sm:block sm:col-span-2 text-stone-light text-[10px] tracking-[3px] uppercase">{item.tag}</span>
                <h3 className="col-span-7 sm:col-span-3 font-display text-ink text-[20px] lg:text-[26px] tracking-tight" style={{ fontWeight: 400 }}>{item.title}</h3>
                <p className="col-span-12 sm:col-span-4 text-stone text-[13px] font-light leading-relaxed">{item.desc}</p>
                <span className="col-span-3 sm:col-span-2 text-mono text-[12px] tabular-nums text-ink text-right tracking-wider">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAP ── */}
      <div ref={map.ref} className="bg-paper">
        <div className={`max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32 transition-all duration-700 ${map.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <div>
              <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-3">N°03 — MAP</p>
              <h2 className="font-display text-ink text-[32px] lg:text-[46px] tracking-tight" style={{ fontWeight: 400 }}>입지 안내.</h2>
            </div>
            <p className="text-stone-light text-[11px] font-light">
              * 본 이미지는 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있습니다.
            </p>
          </div>
          <div className="border border-ink/10 p-2 bg-paper-deep">
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
      <div ref={infra.ref} className="bg-paper-deep border-t border-ink/[0.08]">
        <div className={`max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32 transition-all duration-700 ${infra.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-3">N°04 — INFRA</p>
          <h2 className="font-display text-ink text-[32px] lg:text-[46px] tracking-tight mb-16" style={{ fontWeight: 400 }}>주변 인프라.</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15">
            {nearbySpots.map((group, gi) => (
              <div key={gi} className="bg-paper p-7 lg:p-8 min-h-[240px]">
                <p className="text-mono text-[10px] tabular-nums text-rust tracking-[3px] mb-2">CATEGORY / {String(gi + 1).padStart(2, "0")}</p>
                <h4 className="font-display text-ink text-[24px] tracking-tight mb-6" style={{ fontWeight: 400 }}>{group.category}</h4>
                <ul className="space-y-3">
                  {group.items.map((item, ii) => (
                    <li key={ii} className="text-stone text-[12.5px] font-light leading-relaxed">— {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-stone-light text-[11px] mt-10 font-light">
            * 거리 및 소요시간은 네이버 지도 기준이며, 교통 상황에 따라 달라질 수 있습니다.
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24">
          <ContactCTA variant="slab" heading="입지 안내" subheading="현장 위치 및 주변 인프라에 대해 자세한 안내를 받아보실 수 있습니다." />
        </div>
      </div>
    </section>
  );
}
