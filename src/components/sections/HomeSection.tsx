"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import { SITE } from "@/lib/site";

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

interface HomeSectionProps {
  onTabChange?: (tabId: string) => void;
}

const marqueeTags = [
  "성성호수공원 도보 1분",
  "총 1,908세대",
  "지상 39층",
  "11개동",
  "전용 72·84·95㎡",
  "푸르지오 브랜드",
  "대우건설 시공",
  "2026 분양",
];

const visionParagraphs = [
  "충청남도 천안시 서북구 업성동에 들어서는 1,908세대 규모의 푸르지오 주거단지. 성성호수공원과 맞닿은 입지 위에 호수 조망과 도시 인프라가 균형 있게 자리 잡습니다.",
  "11개 동, 최고 39층의 단지 구성. 전용 72·84·95㎡ 의 다양한 평형이 가족 구성에 따라 선택의 폭을 제공하며, 푸르지오 특유의 단지 조경과 커뮤니티 시설이 함께 설계됩니다.",
];

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

      {/* ═══════════════════════════════════════════════
          HERO — Editorial Split (text left, image right)
          ═══════════════════════════════════════════════ */}
      <div className="relative h-screen min-h-[680px] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">

        {/* LEFT — Dark editorial panel */}
        <div className="relative lg:col-span-7 bg-ink text-paper flex flex-col justify-between px-6 sm:px-10 lg:pl-[88px] lg:pr-12 pt-24 pb-10 lg:py-20">

          {/* Top meta line */}
          <div className={`flex items-center gap-3 transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0 translate-y-2"}`}>
            <span className="text-mono text-[10px] tabular-nums tracking-wider text-paper/50">N°01</span>
            <span className="w-8 h-[1px] bg-paper/20" />
            <span className="text-[10px] tracking-[3px] uppercase text-paper/50">Upseong District · Cheonan</span>
          </div>

          {/* Massive typography */}
          <div className={`mt-12 lg:mt-0 transition-all duration-[1200ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h1 className="font-display text-paper leading-[0.92] tracking-[-0.02em] text-[14vw] sm:text-[12vw] lg:text-[8.5vw] xl:text-[140px]" style={{ fontWeight: 400 }}>
              호수<br />
              위에<br />
              <span className="italic text-rust" style={{ fontWeight: 400 }}>새기다.</span>
            </h1>
            <p className="text-paper/55 text-[13.5px] lg:text-[14px] font-light leading-[1.9] mt-10 max-w-[440px]">
              성성호수공원과 맞닿은 1,908세대 규모의 단지.<br />
              대우건설 푸르지오 브랜드가 천안 업성동 위에 그리는<br />
              새로운 주거의 좌표.
            </p>
          </div>

          {/* Bottom row — stats + cta */}
          <div className={`mt-12 lg:mt-0 grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 transition-all duration-[1200ms] delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {[
              { num: "1,908", label: "Households" },
              { num: "39", label: "Floors" },
              { num: "11", label: "Buildings" },
            ].map((s) => (
              <div key={s.label} className="border-t border-paper/15 pt-3">
                <p className="font-display text-paper text-[28px] lg:text-[34px] tabular-nums leading-none" style={{ fontWeight: 400 }}>
                  {s.num}
                </p>
                <p className="text-mono text-[10px] tabular-nums text-paper/40 tracking-[2px] uppercase mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Image with overlay caption */}
        <div className="relative lg:col-span-5 min-h-[280px] lg:min-h-0 group">
          <Image
            src="/images/hero-lake.jpg"
            alt="성성호수공원 전경"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" />

          {/* Caption — bottom right */}
          <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 text-right">
            <p className="text-paper/70 text-[10px] tracking-[3px] uppercase mb-1">Site Photography</p>
            <p className="text-mono text-[10px] tabular-nums text-paper/50">36.8541° N · 127.1518° E</p>
          </div>

          {/* Vertical text on left edge of image */}
          <div className="hidden lg:block absolute top-1/2 left-4 -translate-y-1/2 vertical-rl text-paper/40 text-[10px] tracking-[6px] uppercase">
            Lake Park View
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MARQUEE — scrolling tags
          ═══════════════════════════════════════════════ */}
      <div className="bg-ink-soft border-y border-paper/10 overflow-hidden">
        <div className="flex marquee-track w-max py-5">
          {[...marqueeTags, ...marqueeTags].map((tag, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className="font-display text-paper/80 text-[22px] tracking-tight" style={{ fontWeight: 400 }}>
                {tag}
              </span>
              <span className="text-rust text-[18px]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          VISION — Editorial 12-col grid
          ═══════════════════════════════════════════════ */}
      <div ref={vision.ref} className="relative">
        <div className={`max-w-[1320px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-36 grid grid-cols-12 gap-6 lg:gap-10 transition-all duration-1000 ${vision.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left: section eyebrow + huge index */}
          <div className="col-span-12 lg:col-span-4">
            <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px]">N°02 — VISION</p>
            <p className="font-display text-ink text-[120px] lg:text-[180px] leading-none tracking-tighter mt-4" style={{ fontWeight: 400 }}>
              02
            </p>
          </div>

          {/* Right: heading + body, asymmetric */}
          <div className="col-span-12 lg:col-span-8 lg:pl-10 lg:border-l lg:border-ink/10">
            <h2 className="font-display text-ink text-[36px] lg:text-[54px] leading-[1.05] tracking-tight text-balance" style={{ fontWeight: 400 }}>
              일상이 머무는 곳에<br />
              <span className="italic text-rust">자연이 먼저 이어집니다.</span>
            </h2>
            <div className="mt-12 grid sm:grid-cols-2 gap-8 lg:gap-14">
              {visionParagraphs.map((p, i) => (
                <div key={i}>
                  <p className="text-mono text-[10px] tabular-nums text-stone-light mb-3">— 0{i + 1}</p>
                  <p className="text-ink/75 text-[14px] leading-[2] font-light">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative grid backdrop */}
        <div className="absolute inset-0 pointer-events-none grid-lines opacity-50" />
      </div>

      {/* ═══════════════════════════════════════════════
          FEATURES — Bento mosaic
          ═══════════════════════════════════════════════ */}
      <div ref={features.ref} className="bg-paper-deep">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32">

          <div className={`flex items-end justify-between mb-12 lg:mb-16 transition-all duration-700 ${features.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div>
              <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-3">N°03 — FEATURES</p>
              <h2 className="font-display text-ink text-[32px] lg:text-[46px] tracking-tight leading-tight" style={{ fontWeight: 400 }}>
                네 가지 좌표,<br className="hidden lg:block" /> <span className="italic">하나의 일상.</span>
              </h2>
            </div>
            <p className="hidden lg:block text-stone text-[12.5px] font-light max-w-[260px] text-right leading-relaxed">
              자연 · 교통 · 교육 · 생활 인프라가 도보 생활권에서 만납니다.
            </p>
          </div>

          {/* Bento grid: 12 cols, mixed sizes */}
          <div className={`grid grid-cols-12 gap-3 lg:gap-4 transition-all duration-1000 ${features.visible ? "opacity-100" : "opacity-0"}`}>

            {/* Big — Nature (col-span-7, row-span-2) */}
            <article className="col-span-12 lg:col-span-7 lg:row-span-2 relative min-h-[440px] lg:min-h-[640px] overflow-hidden group bg-ink">
              <Image src="/images/premium-lakeview.jpg" alt="자연 환경" fill className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04] opacity-90" sizes="(max-width: 1024px) 100vw, 58vw" />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-ink/30 to-transparent" />
              <div className="absolute top-6 left-6 lg:top-8 lg:left-8 flex items-center gap-3">
                <span className="text-mono text-[10px] tabular-nums text-rust">F.01</span>
                <span className="w-6 h-[1px] bg-rust/60" />
                <span className="text-paper/70 text-[10px] tracking-[3px] uppercase">Lake Park</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10">
                <h3 className="font-display text-paper text-[32px] lg:text-[52px] leading-[1.05] tracking-tight" style={{ fontWeight: 400 }}>
                  호수공원<br />
                  <span className="italic text-rust">도보 1분.</span>
                </h3>
                <p className="text-paper/65 text-[13px] lg:text-[14px] font-light leading-[1.9] max-w-[420px] mt-5">
                  성성호수공원과 맞닿은 입지. 사계절 수변 산책로와 탁 트인 호수 조망이 일상의 풍경이 됩니다.
                </p>
              </div>
            </article>

            {/* Med — Transport (col-span-5) */}
            <article className="col-span-12 sm:col-span-6 lg:col-span-5 relative min-h-[300px] overflow-hidden group bg-ink">
              <Image src="/images/premium-highway.jpg" alt="교통" fill className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04] opacity-85" sizes="(max-width: 1024px) 50vw, 36vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <span className="text-mono text-[10px] tabular-nums text-rust">F.02</span>
                <span className="text-paper/70 text-[10px] tracking-[3px] uppercase">Transport</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-paper text-[24px] lg:text-[30px] leading-[1.1] tracking-tight" style={{ fontWeight: 400 }}>멀티 교통망</h3>
                <p className="text-paper/55 text-[12.5px] font-light mt-2">번영로·삼성대로·1호선 부성역</p>
              </div>
            </article>

            {/* Med — Education (col-span-5, sits next to Nature lower row) */}
            <article className="col-span-12 sm:col-span-6 lg:col-span-5 relative min-h-[300px] overflow-hidden group bg-ink">
              <Image src="/images/premium-school.jpg" alt="교육" fill className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04] opacity-85" sizes="(max-width: 1024px) 50vw, 36vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <span className="text-mono text-[10px] tabular-nums text-rust">F.03</span>
                <span className="text-paper/70 text-[10px] tracking-[3px] uppercase">Education</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-paper text-[24px] lg:text-[30px] leading-[1.1] tracking-tight" style={{ fontWeight: 400 }}>학세권 교육환경</h3>
                <p className="text-paper/55 text-[12.5px] font-light mt-2">천안업성초·중학교 도보 통학권</p>
              </div>
            </article>

            {/* Wide bottom — Living (col-span-12) */}
            <article className="col-span-12 relative min-h-[260px] lg:min-h-[300px] overflow-hidden group bg-ink">
              <Image src="/images/premium-infra.jpg" alt="생활 인프라" fill className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03] opacity-90" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8 lg:px-14">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-mono text-[10px] tabular-nums text-rust">F.04</span>
                    <span className="w-6 h-[1px] bg-rust/60" />
                    <span className="text-paper/70 text-[10px] tracking-[3px] uppercase">Living</span>
                  </div>
                  <h3 className="font-display text-paper text-[28px] lg:text-[40px] leading-[1.1] tracking-tight" style={{ fontWeight: 400 }}>
                    풍부한 생활 인프라
                  </h3>
                  <p className="text-paper/60 text-[13px] font-light leading-[1.9] max-w-[480px] mt-4">
                    이마트·코스트코 등 대형마트 인접. 새도시 중심 상권의 풍부한 인프라가 가까이 있습니다.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          DATA SHEET — Big numbers strip (full-bleed dark)
          ═══════════════════════════════════════════════ */}
      <div ref={numbers.ref} className="relative bg-ink text-paper py-20 lg:py-28 overflow-hidden">
        {/* Faint background image */}
        <Image src="/images/lake-view.jpg" alt="" fill className="object-cover opacity-[0.12]" sizes="100vw" />
        <div className="absolute inset-0 bg-ink/70" />

        <div className="relative max-w-[1320px] mx-auto px-6 lg:pl-[88px] lg:pr-10">
          <div className={`flex items-end justify-between mb-12 transition-all duration-700 ${numbers.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div>
              <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-3">N°04 — DATA SHEET</p>
              <h2 className="font-display text-paper text-[28px] lg:text-[40px] tracking-tight" style={{ fontWeight: 400 }}>
                숫자로 읽는 단지.
              </h2>
            </div>
            <p className="hidden lg:block text-paper/40 text-mono text-[10px] tabular-nums">
              UPDATED · 2026.05
            </p>
          </div>

          <div className={`grid grid-cols-2 lg:grid-cols-4 divide-y divide-paper/10 lg:divide-y-0 lg:divide-x lg:divide-paper/10 transition-all duration-1000 ${numbers.visible ? "opacity-100" : "opacity-0"}`}>
            {[
              { value: "1,908", unit: "세대", label: "총 세대수", note: "Households" },
              { value: "1,460", unit: "세대", label: "금회 공급", note: "This phase" },
              { value: "39", unit: "F", label: "최고 층수", note: "Top floor" },
              { value: "11", unit: "동", label: "건축 동수", note: "Buildings" },
            ].map((s, i) => (
              <div key={i} className={`px-2 lg:px-8 py-8 ${i < 2 ? "border-r border-paper/10 lg:border-r-0" : ""}`}>
                <p className="font-display tabular-nums text-paper text-[56px] lg:text-[88px] leading-none tracking-tighter" style={{ fontWeight: 400 }}>
                  {s.value}<span className="text-rust text-[24px] lg:text-[32px] font-light ml-2">{s.unit}</span>
                </p>
                <p className="text-paper/70 text-[13px] mt-4 tracking-wide">{s.label}</p>
                <p className="text-mono text-[9px] tabular-nums text-paper/30 tracking-[2px] uppercase mt-1">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MAP TEASER — Location entry
          ═══════════════════════════════════════════════ */}
      <div ref={map.ref} className="bg-paper">
        <div className={`max-w-[1320px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32 grid grid-cols-12 gap-6 lg:gap-10 transition-all duration-1000 ${map.visible ? "opacity-100" : "opacity-0"}`}>

          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 self-start">
            <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-3">N°05 — LOCATION</p>
            <h2 className="font-display text-ink text-[36px] lg:text-[52px] leading-[1.05] tracking-tight" style={{ fontWeight: 400 }}>
              호수와 도시,<br />
              <span className="italic text-rust">사이의 좌표.</span>
            </h2>
            <p className="text-stone text-[14px] leading-[2] font-light mt-8 max-w-[420px]">
              {SITE.siteAddress}. 호수공원·교통·교육·생활 인프라가 도보 생활권 안에서 만납니다.
            </p>

            <button
              onClick={() => onTabChange?.("location")}
              className="mt-10 group inline-flex items-center gap-3 text-ink"
            >
              <span className="text-[12.5px] tracking-[2px] uppercase border-b border-ink pb-1">
                입지환경 자세히 보기
              </span>
              <span className="text-rust transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-ink">
              <Image src="/images/about-lobby.jpg" alt="단지 개요" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              {/* Coordinate label */}
              <div className="absolute top-6 right-6 text-right">
                <p className="text-mono text-[10px] tabular-nums text-paper/80 tracking-wider">36.8541° N</p>
                <p className="text-mono text-[10px] tabular-nums text-paper/80 tracking-wider">127.1518° E</p>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-paper/60 text-[10px] tracking-[3px] uppercase mb-1">Plan</p>
                  <p className="font-display text-paper text-[22px] lg:text-[28px] leading-tight" style={{ fontWeight: 400 }}>
                    업성3 도시개발지구<br />
                    공동주택 부지 (1BL)
                  </p>
                </div>
                <span className="text-mono text-[10px] tabular-nums text-paper/50 hidden sm:block">/ 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          CTA SLAB — Horizontal contact bar
          ═══════════════════════════════════════════════ */}
      <div ref={cta.ref} className="bg-ink text-paper">
        <div className={`max-w-[1320px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-28 transition-all duration-1000 ${cta.visible ? "opacity-100" : "opacity-0"}`}>
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
