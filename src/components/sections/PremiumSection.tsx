"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";

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

/* ──────────────────────────────────────────────
   SVG ICONS — stroke 기반 라인 아이콘
   ────────────────────────────────────────────── */
const Icon = {
  LakeView: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="48" cy="16" r="6" />
      <path d="M6 36l10-12 8 8 12-14 10 10 12-8" />
      <path d="M4 46c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2" opacity="0.6" />
      <path d="M4 54c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2" opacity="0.4" />
    </svg>
  ),
  SkyLounge: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="22" y="8" width="20" height="48" />
      <path d="M22 16h20M22 24h20M22 32h20M22 40h20M22 48h20" opacity="0.5" />
      <rect x="6" y="32" width="14" height="24" />
      <rect x="44" y="28" width="14" height="28" />
      <path d="M32 8V4" opacity="0.6" />
    </svg>
  ),
  Pool: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M4 40c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3 5-3 10-3 5 3 10 3" />
      <path d="M4 50c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3 5-3 10-3 5 3 10 3" opacity="0.6" />
      <path d="M16 40V14c0-3 2-6 6-6M48 40V14c0-3-2-6-6-6" />
      <path d="M16 22h32" opacity="0.5" />
    </svg>
  ),
  Landscape: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M20 8l-8 14h5l-7 12h7l-5 8h16l-5-8h7l-7-12h5z" />
      <path d="M20 50v6" />
      <path d="M48 22a8 8 0 010 16M44 22c-4 0-4 4-4 8s0 8 4 8" />
      <path d="M44 38v12" />
      <path d="M4 56h56" opacity="0.4" />
    </svg>
  ),
  Distance: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="6" y="20" width="14" height="36" />
      <rect x="44" y="14" width="14" height="42" />
      <path d="M10 28h2M16 28h2M10 36h2M16 36h2M10 44h2M16 44h2M48 22h2M54 22h2M48 30h2M54 30h2M48 38h2M54 38h2M48 46h2M54 46h2" opacity="0.4" />
      <path d="M22 36h20" stroke="currentColor" strokeDasharray="3 3" />
      <path d="M26 32l-4 4 4 4M38 32l4 4-4 4" />
    </svg>
  ),
  Transport: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="14" y="10" width="36" height="36" rx="4" />
      <path d="M14 30h36" />
      <circle cx="22" cy="38" r="2.5" />
      <circle cx="42" cy="38" r="2.5" />
      <path d="M22 16h20M22 22h20" opacity="0.5" />
      <path d="M18 46l-4 8M46 46l4 8" />
      <path d="M4 56h56" opacity="0.4" />
    </svg>
  ),
  Education: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M4 22l28-12 28 12-28 12L4 22z" />
      <path d="M14 26v14c0 4 8 8 18 8s18-4 18-8V26" />
      <path d="M58 22v14" />
      <path d="M32 34v8" opacity="0.5" />
    </svg>
  ),
};

const premium7 = [
  {
    num: "01",
    tag: "Lake View",
    title: "명품 레이크 뷰 + 남향 배치",
    desc: "성성호수공원을 품은 새도시. 남향으로 펼쳐지는 힐링 라이프와 사계절 수변 조망(일부세대 제외).",
    icon: <Icon.LakeView />,
  },
  {
    num: "02",
    tag: "Sky Lounge",
    title: "39층 최상층 스카이라운지",
    desc: "파노라마로 펼쳐진 명품 전망. 성성호수가 한눈에 들어오는 39층 스카이라운지 & 게스트하우스.",
    icon: <Icon.SkyLounge />,
  },
  {
    num: "03",
    tag: "Pool & Spa",
    title: "25m 4레인 실내수영장",
    desc: "리조트보다 즐거운 홈캉스. 유아 풀장과 사우나까지 갖춘 25m, 4레인 규모 실내수영장.",
    icon: <Icon.Pool />,
  },
  {
    num: "04",
    tag: "Landscape",
    title: "수목원급 단지조경",
    desc: "수공간을 품은 초대형 광장과 다채롭고 예술적인 힐링조경. 수목원만큼 푸르른 단지 공원.",
    icon: <Icon.Landscape />,
  },
  {
    num: "05",
    tag: "Distance",
    title: "최대 125m 동간거리",
    desc: "막힘없이 탁 트인 창밖 풍경. 최대 125m 동간거리로 누리는 레이크 뷰 그 이상의 특급조망.",
    icon: <Icon.Distance />,
  },
  {
    num: "06",
    tag: "Transport",
    title: "1호선 부성역(예정) 광역교통",
    desc: "수도권전철 1호선 부성역(예정) 신설 협약 체결. 번영로·삼성대로·천안대로·천안IC 쾌속교통.",
    icon: <Icon.Transport />,
  },
  {
    num: "07",
    tag: "Education",
    title: "원스톱 교육환경",
    desc: "1블록 옆 고교(예정), 2블록 앞 초·중교(예정), 성성지구 학원가 — 한 번에 누리는 학군 인프라.",
    icon: <Icon.Education />,
  },
];

export default function PremiumSection() {
  const grid = useInView();

  return (
    <section className="pt-[140px] lg:pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="relative bg-ink text-paper overflow-hidden">
        <Image src="/images/office-interior.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/55 to-ink/35" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Premium</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              7가지 프리미엄
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/70 text-[13.5px] font-light leading-[1.95]">
              호수뷰·스카이라운지·실내수영장·단지조경·동간거리·교통·교육까지,
              일곱 가지 프리미엄이 하나의 단지에서 완성됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── PREMIUM GRID — SVG + text cards ── */}
      <div ref={grid.ref} className="bg-paper">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-28 transition-all duration-700 ${grid.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
            {premium7.map((p) => (
              <article key={p.num} className="bg-paper p-7 lg:p-9 min-h-[260px] lg:min-h-[300px] flex flex-col">
                <div className="flex items-start justify-between mb-7">
                  <div className="flex items-baseline gap-3">
                    <span className="text-rust text-[12px] tabular-nums tracking-wider">{p.num}</span>
                    <span className="text-stone-light text-[10.5px] tracking-[3px] uppercase">{p.tag}</span>
                  </div>
                  <div className="w-12 h-12 lg:w-14 lg:h-14 text-rust">
                    {p.icon}
                  </div>
                </div>
                <h3 className="text-ink text-[19px] lg:text-[21px] tracking-tight leading-tight mb-3" style={{ fontWeight: 500 }}>
                  {p.title}
                </h3>
                <p className="text-stone text-[13px] font-light leading-[1.95]">
                  {p.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24">
          <ContactCTA variant="slab" heading="프리미엄 안내" subheading="단지 프리미엄·특화설계·미래가치에 대한 자세한 안내를 받아보실 수 있습니다." />
        </div>
      </div>
    </section>
  );
}
