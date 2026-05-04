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
  { tag: "Class UP", title: "성성호수공원 레이크뷰", time: "도보 1분", desc: "성성호수공원을 품은 새도시, 남향으로 펼쳐지는 명품 레이크 뷰" },
  { tag: "Smart UP", title: "원스톱 교육환경", time: "학세권", desc: "1블록 옆 고교(예정), 2블록 앞 초·중교(예정), 성성지구 학원가" },
  { tag: "Life UP", title: "멀티 생활 인프라", time: "직주근접", desc: "이마트·코스트코, 성성지구 중심상권, 삼성SDI 등 직주근접 생활권" },
  { tag: "Speed UP", title: "쾌속 광역교통", time: "역세권(예정)", desc: "1호선 부성역(예정), 번영로·삼성대로·천안대로, 경부고속도로 천안IC" },
];

const nearbySpots = [
  {
    category: "자연",
    items: [
      "성성호수공원 — 도보 1분 (남향 레이크뷰)",
      "노태근린공원 — 도보 5분",
      "단지 내 초대형 광장·힐링조경",
    ],
  },
  {
    category: "교육",
    items: [
      "고등학교(예정) — 1블록 옆",
      "초·중학교(예정) — 2블록 앞",
      "성성지구 학원가 인근",
    ],
  },
  {
    category: "교통",
    items: [
      "1호선 부성역(예정) — 신설 협약 체결",
      "번영로·삼성대로·천안대로 광역 도로망",
      "경부고속도로 천안IC 인접",
    ],
  },
  {
    category: "생활",
    items: [
      "이마트·코스트코 등 대형마트",
      "성성지구 내 중심상권",
      "삼성SDI 등 직주근접 산업단지",
    ],
  },
];

export default function LocationSection() {
  const adv = useInView();
  const map = useInView();
  const infra = useInView();

  return (
    <section className="pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="relative bg-ink text-paper overflow-hidden">
        <Image src="/images/office-monitor.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/55 to-ink/35" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Location</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              입지환경
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/70 text-[13.5px] font-light leading-[1.95]">
              성성호수공원 도보 1분, 1호선 부성역(예정) 인접, 직주근접의 산업 인프라.
              자연과 도시가 균형을 이루는 성성호수 새도시의 새중심.
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
              src="/images/crawled/map.jpg"
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

          <p className="text-stone-light text-[11px] mt-8 font-light leading-relaxed">
            * 부성역(예정)은 국가철도공단 [보도] 수도권전철 1호선 부성역 신설 위·수탁 협약 기준,
            교육시설(예정)은 충청남도천안교육지원청 고시 제2024-449호, 천안시 고시 제2024-962호·제2025-2386호 기준입니다.
            <br />
            * 상기 지역도 및 교통·각종 개발계획·학군 배정 등은 사업주체나 해당기관의 사정에 따라 변경 또는 연기·취소될 수 있습니다.
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
