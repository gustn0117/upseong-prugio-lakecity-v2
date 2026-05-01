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
  const hero = useInView();
  const adv = useInView();
  const map = useInView();
  const infra = useInView();

  return (
    <section className="pt-[72px]">
      {/* ══════════ HERO ══════════ */}
      <div className="relative h-[50vh] min-h-[340px]">
        <Image src="/images/banner-location.jpg" alt="" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold/80 text-[10px] tracking-[5px] font-medium uppercase mb-4 text-shadow-subtle">Location</p>
            <h1 className="text-white text-[36px] lg:text-[52px] font-extralight tracking-tight text-shadow-banner">입지환경</h1>
          </div>
        </div>
      </div>

      {/* ══════════ HEADLINE ══════════ */}
      <div ref={hero.ref} className="bg-white">
        <div className={`max-w-[900px] mx-auto px-6 lg:px-16 py-20 lg:py-28 text-center transition-all duration-700 ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-[26px] lg:text-[38px] font-extralight text-charcoal leading-snug tracking-tight">
            호수공원을 품은 프리미엄,
            <br />
            주거의 품격을 새롭게 세우다
          </h2>
          <div className="w-10 h-[1px] bg-gold/40 mx-auto mt-8 mb-8" />
          <p className="text-cool-gray text-[14px] leading-[2] font-light max-w-[480px] mx-auto">
            호수공원과 교육, 산업단지를 아우르는 입지 위에
            주거의 가치가 균형 있게 완성됩니다.
          </p>
        </div>
      </div>

      {/* ══════════ ADVANTAGES — Horizontal List ══════════ */}
      <div ref={adv.ref} className="bg-off-white border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
          <div className="divide-y divide-gray-200">
            {advantages.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 py-8 sm:py-10 transition-all duration-500 ${adv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-gold text-[10px] tracking-[4px] font-medium uppercase w-[120px] flex-shrink-0">{item.tag}</span>
                <h3 className="text-charcoal text-[20px] lg:text-[24px] font-light tracking-tight w-[200px] flex-shrink-0">{item.title}</h3>
                <p className="text-cool-gray text-[13px] font-light flex-1">{item.desc}</p>
                <span className="text-navy text-[13px] font-medium tracking-wider flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ MAP ══════════ */}
      <div ref={map.ref} className="bg-white">
        <div className={`max-w-[1200px] mx-auto px-6 lg:px-16 py-20 lg:py-28 transition-all duration-700 ${map.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <div>
              <p className="text-gold text-[10px] tracking-[5px] font-medium uppercase mb-4">Location Map</p>
              <h2 className="text-[28px] lg:text-[36px] font-extralight text-charcoal tracking-tight">입지 안내</h2>
            </div>
            <p className="text-cool-gray text-[11px] font-light">* 본 이미지는 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있습니다.</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/location.jpg"
            alt="업성 푸르지오 레이크시티 입지 안내도"
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* ══════════ INFRASTRUCTURE — Clean Grid ══════════ */}
      <div ref={infra.ref} className="bg-off-white border-t border-gray-100">
        <div className={`max-w-[1200px] mx-auto px-6 lg:px-16 py-20 lg:py-28 transition-all duration-700 ${infra.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-gold text-[10px] tracking-[5px] font-medium uppercase mb-4">Infrastructure</p>
          <h2 className="text-[28px] lg:text-[36px] font-extralight text-charcoal tracking-tight mb-16">주변 인프라</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {nearbySpots.map((group, gi) => (
              <div key={gi}>
                <h4 className="text-navy text-[14px] font-semibold tracking-wider mb-5 pb-3 border-b border-navy/20">{group.category}</h4>
                <ul className="space-y-3">
                  {group.items.map((item, ii) => (
                    <li key={ii} className="text-cool-gray text-[13px] font-light leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-cool-gray text-[11px] mt-14 font-light">
            * 거리 및 소요시간은 네이버 지도 기준이며, 교통 상황에 따라 달라질 수 있습니다.
          </p>
        </div>
      </div>

      {/* ══════════ CTA ══════════ */}
      <div className="bg-navy py-20">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <ContactCTA variant="navy" heading="입지 관련 상담 문의" />
        </div>
      </div>
    </section>
  );
}
