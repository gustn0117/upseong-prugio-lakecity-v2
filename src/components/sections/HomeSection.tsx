"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import NoticeBoard from "@/components/NoticeBoard";
import SalesTimeline from "@/components/SalesTimeline";
import BrandIdentityStrip from "@/components/BrandIdentityStrip";
import { SITE, FOUR_UP } from "@/lib/site";

function useInView(threshold = 0.1) {
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

interface HomeSectionProps {
  onTabChange?: (tabId: string) => void;
}

export default function HomeSection({ onTabChange }: HomeSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const vision = useInView();
  const features = useInView(0.05);
  const numbers = useInView(0.2);
  const map = useInView();
  const cta = useInView();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-paper">

      {/* ─────── HERO ─────── */}
      <div className="relative h-[100svh] min-h-[680px] lg:min-h-[720px] overflow-hidden">
        <Image
          src="/images/hero-main.png"
          alt="업성 푸르지오 레이크시티"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-[1.02]"
        />

        {/* Layered gradients — directional darkness for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/35" />

        {/* Top-right meta — hidden on small mobile to avoid header overlap */}
        <div className={`hidden sm:block absolute top-[150px] lg:top-[100px] right-6 lg:right-10 text-right transition-opacity duration-1000 delay-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <p className="text-paper/55 text-[10px] tracking-[3px] uppercase mb-1">36.85°N · 127.15°E</p>
          <p className="text-paper/35 text-[10px] tabular-nums tracking-wider">UPDATED · {SITE.lastUpdated}</p>
        </div>

        {/* Subtle vertical accent line on left edge of content */}
        <div className={`hidden lg:block absolute top-[120px] left-[88px] w-px bg-rust transition-all duration-[1400ms] ${loaded ? "h-16 opacity-100" : "h-0 opacity-0"}`} />

        <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 flex flex-col justify-end pb-12 lg:pb-20 pt-[144px] lg:pt-32">

          {/* Eyebrow with brand + year */}
          <div className={`flex items-center gap-3 mb-6 transition-all duration-1000 delay-100 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <span className="text-paper/65 text-[10.5px] tracking-[3px] uppercase">대우건설 푸르지오</span>
            <span className="w-8 h-px bg-paper/35" />
            <span className="text-paper/45 text-[10.5px] tracking-[3px] uppercase tabular-nums">est. 2026</span>
          </div>

          {/* Main heading */}
          <h1 className={`text-paper text-[36px] sm:text-[56px] lg:text-[80px] leading-[1.05] tracking-tight max-w-[900px] transition-all duration-[1100ms] delay-150 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              style={{ fontWeight: 500 }}>
            업성 푸르지오<br />레이크시티
          </h1>

          <p className={`text-paper/80 text-[13.5px] lg:text-[16px] leading-[1.85] font-light mt-5 lg:mt-7 max-w-[560px] transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            푸르지오가 완성하는 성성호수 앞 프리미엄 도시.<br className="hidden sm:block" />
            성성호수 새도시가 기다린 업성의 새중심, 천안의 주거명작.
          </p>

          {/* CTA buttons */}
          <div className={`mt-7 lg:mt-10 flex flex-wrap gap-2.5 lg:gap-3 transition-all duration-1000 delay-[450ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <button
              onClick={() => onTabChange?.("register")}
              className="group inline-flex items-center gap-2 px-5 lg:px-6 py-3 lg:py-3.5 bg-paper text-ink text-[12.5px] lg:text-[13px] tracking-wider hover:bg-rust hover:text-paper transition-colors"
            >
              관심고객 등록
              <span className="text-rust group-hover:text-paper transition-colors">→</span>
            </button>
            <button
              onClick={() => onTabChange?.("business")}
              className="inline-flex items-center gap-2 px-5 lg:px-6 py-3 lg:py-3.5 border border-paper/35 text-paper text-[12.5px] lg:text-[13px] tracking-wider hover:bg-paper/10 hover:border-paper/60 transition-colors"
            >
              사업개요 자세히
              <span className="text-paper/60">↓</span>
            </button>
          </div>

          {/* Stat strip */}
          <div className={`mt-10 lg:mt-16 grid grid-cols-4 max-w-[820px] divide-x divide-paper/15 border-t border-paper/15 transition-all duration-1000 delay-[600ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {[
              { v: "1,908", l: "총 세대", note: "Households" },
              { v: "39", l: "최고 층수", note: "Top Floor" },
              { v: "11", l: "동", note: "Buildings" },
              { v: "72·84·95", l: "전용 (㎡)", note: "Type" },
            ].map((s, i) => (
              <div key={s.l} className={`pt-3 lg:pt-4 ${i === 0 ? "pl-0 pr-2 sm:pr-5" : "px-2 sm:px-5"}`}>
                <p className="text-paper text-[18px] sm:text-[22px] lg:text-[28px] tabular-nums tracking-tight leading-none" style={{ fontWeight: 300 }}>
                  {s.v}
                </p>
                <p className="text-paper/65 text-[10.5px] sm:text-[11.5px] tracking-wider mt-2">{s.l}</p>
                <p className="hidden sm:block text-paper/30 text-[9.5px] tabular-nums tracking-[2px] uppercase mt-0.5">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Animated scroll cue — desktop only (mobile uses sticky phone CTA) */}
        <div className={`hidden lg:flex absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2.5 transition-opacity duration-1000 delay-[800ms] ${loaded ? "opacity-100" : "opacity-0"}`}>
          <span className="text-paper/45 text-[9.5px] tracking-[4px] uppercase">Scroll</span>
          <div className="relative w-px h-10 bg-paper/15 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-3 bg-paper/70 scroll-line origin-top" />
          </div>
        </div>
      </div>

      {/* ─────── VISION ─────── */}
      <div ref={vision.ref} className="bg-paper border-b border-ink/[0.08]">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32 grid grid-cols-12 gap-10 lg:gap-16 transition-all duration-700 ${vision.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          <div className="col-span-12 lg:col-span-4">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Vision</p>
            <h2 className="text-ink text-[28px] lg:text-[36px] leading-[1.25] tracking-tight" style={{ fontWeight: 300 }}>
              전망 좋은 레이크뷰,<br />
              선망 받는 푸르지오
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10">
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
              <p className="text-stone text-[14px] leading-[2] font-light">
                충청남도 천안시 서북구 업성동, 업성3 도시개발지구에 들어서는 1,460세대 규모의 푸르지오 주거단지.
                성성호수공원과 맞닿은 입지 위에 호수 조망과 도시 인프라가 균형 있게 자리 잡습니다.
              </p>
              <p className="text-stone text-[14px] leading-[2] font-light">
                지하 2층 ~ 지상 39층, 11개동의 단지 구성. 전용 72·84·95㎡ 3개 평형 10개 타입이
                가족 구성에 따라 선택의 폭을 제공하며, 39층 스카이라운지와 25m 4레인 실내수영장 등
                푸르지오 특유의 특화 설계가 함께합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─────── FEATURES — minimal grid ─────── */}
      <div ref={features.ref} className="bg-paper border-b border-ink/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32">

          <div className={`grid grid-cols-12 gap-6 mb-14 lg:mb-20 transition-all duration-700 ${features.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">4 UP</p>
              <h2 className="text-ink text-[28px] lg:text-[36px] leading-[1.25] tracking-tight" style={{ fontWeight: 300 }}>
                네 가지 가치로<br />업그레이드되는 일상
              </h2>
            </div>
            <p className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10 text-stone text-[14px] leading-[2] font-light max-w-[560px]">
              호수뷰로 클래스, 학교로 스마트, 생활로 라이프, 교통으로 스피드 —
              네 가지 코어 가치가 한 단지 안에서 동시에 완성됩니다.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 transition-all duration-1000 ${features.visible ? "opacity-100" : "opacity-0"}`}>
            {FOUR_UP.map((f, i) => {
              const imgs = [
                "/images/lakefront-bldg.jpg",
                "/images/classroom.jpg",
                "/images/skyline-residential.jpg",
                "/images/highway-aerial.jpg",
              ];
              return (
                <article key={f.label} className="relative aspect-[4/3] overflow-hidden bg-ink group">
                  <Image
                    src={imgs[i]}
                    alt={f.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="absolute bottom-7 left-7 right-7">
                    <p className="text-paper/65 text-[10px] tracking-[3px] uppercase mb-3">{f.label}</p>
                    <h3 className="text-paper text-[20px] lg:text-[24px] tracking-tight leading-tight" style={{ fontWeight: 400 }}>
                      {f.title}
                    </h3>
                    <p className="text-paper/65 text-[12.5px] font-light mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─────── DATA ─────── */}
      <div ref={numbers.ref} className="bg-ink text-paper">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24 transition-all duration-700 ${numbers.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-baseline justify-between mb-12">
            <div>
              <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Data</p>
              <h2 className="text-paper text-[24px] lg:text-[30px] tracking-tight" style={{ fontWeight: 300 }}>
                숫자로 보는 단지
              </h2>
            </div>
            <p className="hidden sm:block text-[10.5px] tabular-nums text-paper/35 tracking-wider">
              UPDATED · 2026.05
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-paper/10 lg:divide-y-0 lg:divide-x lg:divide-paper/10">
            {[
              { value: "1,908", unit: "세대", label: "총 세대수" },
              { value: "1,460", unit: "세대", label: "금회 공급" },
              { value: "39", unit: "층", label: "최고 층수" },
              { value: "11", unit: "동", label: "건축 동수" },
            ].map((s, i) => (
              <div key={i} className={`px-2 lg:px-8 py-7 lg:py-2 ${i < 2 ? "border-r border-paper/10 lg:border-r-0" : ""}`}>
                <p className="text-paper tabular-nums text-[40px] lg:text-[52px] leading-none tracking-tight" style={{ fontWeight: 300 }}>
                  {s.value}<span className="text-paper/55 text-[16px] lg:text-[18px] ml-2 align-baseline">{s.unit}</span>
                </p>
                <p className="text-paper/55 text-[12.5px] mt-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────── SALES SCHEDULE ─────── */}
      <SalesTimeline />

      {/* ─────── NOTICES ─────── */}
      <NoticeBoard />

      {/* ─────── MAP TEASER ─────── */}
      <div ref={map.ref} className="bg-paper border-y border-ink/[0.08]">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32 grid grid-cols-12 gap-8 lg:gap-12 transition-all duration-700 ${map.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 self-start">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Location</p>
            <h2 className="text-ink text-[28px] lg:text-[36px] leading-[1.25] tracking-tight" style={{ fontWeight: 300 }}>
              호수와 도시,<br />사이의 좌표
            </h2>
            <p className="text-stone text-[14px] leading-[2] font-light mt-6 max-w-[420px]">
              {SITE.siteAddress}. 호수공원·교통·교육·생활 인프라가 도보 생활권 안에서 만납니다.
            </p>
            <button
              onClick={() => onTabChange?.("location")}
              className="mt-8 inline-flex items-center gap-2 text-[12px] tracking-[1.5px] text-ink border-b border-ink/40 pb-1 hover:border-ink transition-colors"
            >
              입지환경 자세히 보기
              <span className="text-rust">→</span>
            </button>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="border border-ink/10 bg-paper-deep p-2 lg:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/crawled/map.jpg"
                alt="업성 푸르지오 레이크시티 입지 안내도"
                className="w-full h-auto block"
              />
            </div>
            <p className="text-stone-light text-[10.5px] mt-3 font-light">
              * 본 이미지는 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* ─────── BRAND IDENTITY ─────── */}
      <BrandIdentityStrip />

      {/* ─────── CTA ─────── */}
      <div ref={cta.ref} className="bg-ink text-paper">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24 transition-all duration-700 ${cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <ContactCTA
            variant="slab"
            heading="분양문의"
            subheading={`${SITE.projectName}에 대한 자세한 안내를 받아보실 수 있습니다.`}
            secondaryCta={{ label: "관심고객 사전등록", onClick: () => onTabChange?.("register") }}
          />
        </div>
      </div>
    </section>
  );
}
