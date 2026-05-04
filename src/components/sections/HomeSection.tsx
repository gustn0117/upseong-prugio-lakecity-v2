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
      <div className="relative h-screen min-h-[640px]">
        <Image
          src="/images/hero-lake-blue.jpg"
          alt="업성 푸르지오 레이크시티"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/70" />

        <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 flex flex-col justify-end pb-16 lg:pb-24 pt-32">

          {/* Top eyebrow */}
          <p className={`text-[11px] tracking-[3px] uppercase text-paper/65 mb-6 transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
            대우건설 · 푸르지오
          </p>

          {/* Main heading */}
          <h1 className={`text-paper text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.1] tracking-tight max-w-[820px] transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              style={{ fontWeight: 300 }}>
            업성 푸르지오 레이크시티
          </h1>
          <p className={`text-paper/75 text-[14px] lg:text-[16px] leading-[1.95] font-light mt-6 max-w-[560px] transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            푸르지오가 완성하는 성성호수 앞 프리미엄 도시.<br className="hidden sm:block" />
            성성호수 새도시가 기다린 업성의 새중심, 천안의 주거명작.
          </p>

          {/* Bottom row — quick facts strip */}
          <div className={`mt-12 lg:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-12 max-w-[820px] transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {[
              { v: "1,908", l: "총 세대" },
              { v: "39", l: "최고 층수" },
              { v: "11", l: "동" },
              { v: "72·84·95", l: "전용 (㎡)" },
            ].map((s) => (
              <div key={s.l} className="border-t border-paper/25 pt-3">
                <p className="text-paper text-[24px] lg:text-[28px] tabular-nums tracking-tight" style={{ fontWeight: 300 }}>
                  {s.v}
                </p>
                <p className="text-paper/55 text-[11.5px] tracking-wider mt-1.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className={`absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 text-paper/45 text-[10px] tracking-[3px] uppercase transition-opacity duration-1000 delay-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <span>Scroll</span>
          <span className="w-6 h-px bg-paper/30" />
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
                "/images/nature-park.jpg",
                "/images/premium-education.jpg",
                "/images/premium-living.jpg",
                "/images/premium-transport-new.jpg",
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
            <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden bg-ink">
              <Image src="/images/about-nature.jpg" alt="단지 주변 환경" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-paper/65 text-[10px] tracking-[3px] uppercase mb-1.5">사업 위치</p>
                <p className="text-paper text-[16px] lg:text-[18px] leading-tight" style={{ fontWeight: 400 }}>
                  업성3 도시개발지구 공동주택 부지 (1BL)
                </p>
              </div>
            </div>
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
