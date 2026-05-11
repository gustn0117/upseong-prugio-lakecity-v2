"use client";

import { useState } from "react";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";

const subTabs = [
  { id: "landscape", label: "단지조경" },
  { id: "community", label: "커뮤니티" },
  { id: "skylounge", label: "스카이라운지" },
  { id: "layout", label: "단지배치도" },
];

interface ComplexSectionProps {
  initialSubTab?: string;
}

const headerCopy: Record<string, { tag: string; title: string; subtitle: string }> = {
  landscape: {
    tag: "Landscape",
    title: "단지 조경",
    subtitle: "수공간을 품은 초대형 광장과 다채롭고 예술적인 힐링조경. 수목원만큼 푸르른 단지 공원.",
  },
  community: {
    tag: "Community",
    title: "커뮤니티",
    subtitle: "리조트보다 즐거운 홈캉스. 25m 4레인 실내수영장·사우나·피트니스 등 풍요로운 입주민 시설.",
  },
  skylounge: {
    tag: "Sky Lounge",
    title: "스카이라운지 & 게스트하우스",
    subtitle: "파노라마로 펼쳐진 명품 전망. 성성호수가 한눈에 들어오는 39층 최상층 라운지.",
  },
  layout: {
    tag: "Block Layout",
    title: "단지배치도",
    subtitle: "지하 2층 ~ 지상 39층, 11개동 1,460세대. 최대 125m 동간거리로 누리는 막힘없는 조망.",
  },
};

/* SVG icons — landscape & layout 용 (해당 컨셉의 CG가 없어 아이콘 유지) */
const Icon = {
  Water: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M24 6c-6 8-12 14-12 22a12 12 0 0024 0c0-8-6-14-12-22z" />
      <path d="M30 28c0 3-2 5-5 5" opacity="0.6" />
    </svg>
  ),
  Leaf: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M10 38c0-14 10-28 28-28-2 18-12 28-28 28z" />
      <path d="M10 38l16-16" opacity="0.5" />
    </svg>
  ),
  Tree: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M24 6l-9 14h5l-7 11h7l-5 7h18l-5-7h7l-7-11h5z" />
      <path d="M24 38v6" />
    </svg>
  ),
  Walk: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="28" cy="9" r="3" />
      <path d="M16 42l6-12 4-6 6 4 4 8M22 24l-2-8 6-2 6 6" />
    </svg>
  ),
  Buildings: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="6" y="14" width="14" height="28" />
      <rect x="20" y="6" width="14" height="36" />
      <rect x="34" y="18" width="8" height="24" />
      <path d="M10 20h2M16 20h2M10 28h2M16 28h2M10 36h2M16 36h2M24 14h2M30 14h2M24 22h2M30 22h2M24 30h2M30 30h2M37 24h2M37 32h2" opacity="0.5" />
    </svg>
  ),
  Tower: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="14" y="6" width="20" height="36" />
      <path d="M20 14h2M26 14h2M20 22h2M26 22h2M20 30h2M26 30h2M20 38h2M26 38h2" />
      <path d="M24 6V2" opacity="0.6" />
    </svg>
  ),
  Distance: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M6 24h36" />
      <path d="M10 20l-4 4 4 4M38 20l4 4-4 4" />
      <rect x="3" y="32" width="6" height="10" opacity="0.5" />
      <rect x="39" y="32" width="6" height="10" opacity="0.5" />
    </svg>
  ),
  Grid: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="8" y="8" width="10" height="10" /><rect x="20" y="8" width="10" height="10" /><rect x="32" y="8" width="8" height="10" />
      <rect x="8" y="20" width="10" height="10" /><rect x="20" y="20" width="10" height="10" /><rect x="32" y="20" width="8" height="10" />
      <rect x="8" y="32" width="10" height="8" /><rect x="20" y="32" width="10" height="8" /><rect x="32" y="32" width="8" height="8" />
    </svg>
  ),
};

const landscapeFeatures = [
  { num: "01", icon: <Icon.Water />, title: "초대형 수공간 광장", desc: "단지 중심에 자리한 대형 수경 시설. 잔잔한 수면이 일상에 여유와 정서적 안정감을 더합니다." },
  { num: "02", icon: <Icon.Leaf />, title: "다채롭고 예술적인 힐링조경", desc: "사계절 변화를 느낄 수 있는 다층 식재 구조. 교목·관목·하층 식재가 어우러진 입체적 그린 스케이프." },
  { num: "03", icon: <Icon.Tree />, title: "수목원급 단지 공원", desc: "수목원만큼 푸르른 단지 공원. 입주민이 일상 속에서 자연을 가까이 누릴 수 있는 산책 동선을 갖춥니다." },
  { num: "04", icon: <Icon.Walk />, title: "휴식과 산책의 보행 동선", desc: "단지 곳곳을 잇는 안전한 보행로와 휴식 거점. 단지 내부 어디에서나 자연스럽게 자연과 마주합니다." },
];

const communityFacilities = [
  { img: "/images/cg/pool.jpg", tag: "Pool", title: "25m 4레인 실내수영장", desc: "리조트보다 즐거운 홈캉스. 사계절 쾌적한 25m, 4레인 규모 실내수영장." },
  { img: "/images/cg/pool-kids.jpg", tag: "Kids Pool", title: "유아 풀장", desc: "아이들이 안전하게 물놀이를 즐길 수 있는 별도의 유아 전용 풀." },
  { img: "/images/cg/sauna.jpg", tag: "Sauna", title: "사우나", desc: "수영장과 연계된 사우나로 운동 후의 피로 회복까지 단지 안에서 완성." },
  { img: "/images/cg/fitness.jpg", tag: "Fitness", title: "피트니스 클럽", desc: "유산소·웨이트 공간을 갖춘 입주민 전용 피트니스. 쾌적한 운동 환경." },
  { img: "/images/cg/cafeteria.jpg", tag: "Cafeteria", title: "카페테리아 · 라운지", desc: "이웃과 가볍게 만날 수 있는 카페 라운지. 단지의 일상 모임 거점." },
  { img: "/images/cg/library.jpg", tag: "Library", title: "작은 도서관 · 스터디룸", desc: "독서·자기계발·아이의 학습이 가능한 조용한 라이브러리와 스터디 라운지." },
  { img: "/images/cg/kids-room.jpg", tag: "Kids", title: "실내 놀이터", desc: "아이들이 안전하게 머무를 수 있는 실내 놀이 공간. 부모와 함께하는 시간." },
  { img: "/images/cg/golf.jpg", tag: "Golf", title: "스크린 골프", desc: "단지 안에서 즐기는 스크린 골프. 날씨와 무관하게 라운딩을 만끽." },
];

const skyloungeFeatures = [
  { img: "/images/cg/skylounge-night1.jpg", tag: "Night View", title: "39층 스카이라운지 — 야경", desc: "성성호수공원이 한눈에 들어오는 단지 최상층의 라운지. 파노라마로 펼쳐진 명품 야경." },
  { img: "/images/cg/skylounge-day1.jpg", tag: "Day View", title: "스카이라운지 — 주경", desc: "낮에는 호수와 도시를 동시에 조망하는 탁 트인 전망의 라운지 공간." },
  { img: "/images/cg/skylounge-night2.jpg", tag: "Lounge", title: "프라이빗 라운지", desc: "휴식·미팅·차 한잔을 위한 라운지 좌석. 입주민만이 누릴 수 있는 특별한 시간." },
  { img: "/images/cg/guest-a.jpg", tag: "Guest Room", title: "게스트룸 A", desc: "방문객을 위한 별도의 게스트룸. 손님을 가까이서 모실 수 있는 호스피탈리티." },
  { img: "/images/cg/guest-b.jpg", tag: "Guest Room", title: "게스트룸 B", desc: "또 하나의 게스트룸 타입. 단지 안에서 누리는 프라이빗한 손님맞이." },
];

const layoutHighlights = [
  { num: "11", unit: "개동", label: "건축 동수", icon: <Icon.Buildings /> },
  { num: "39", unit: "층", label: "최고 층수", icon: <Icon.Tower /> },
  { num: "125", unit: "m", label: "최대 동간거리", icon: <Icon.Distance /> },
  { num: "1,460", unit: "세대", label: "1블록 공급", icon: <Icon.Grid /> },
];

function PhotoCard({ img, tag, title, desc }: { img: string; tag: string; title: string; desc: string }) {
  return (
    <article className="relative aspect-[4/3] overflow-hidden bg-ink group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
      <p className="absolute top-4 left-4 lg:top-5 lg:left-5 text-paper/65 text-[10px] tracking-[3px] uppercase">{tag}</p>
      <div className="absolute bottom-4 left-4 right-4 lg:bottom-5 lg:left-5 lg:right-5">
        <h3 className="text-paper text-[16px] lg:text-[18px] tracking-tight leading-tight mb-1.5" style={{ fontWeight: 500 }}>{title}</h3>
        <p className="text-paper/65 text-[11.5px] lg:text-[12.5px] font-light leading-[1.8]">{desc}</p>
      </div>
    </article>
  );
}

export default function ComplexSection({ initialSubTab }: ComplexSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab || "landscape");
  const head = headerCopy[activeSubTab] || headerCopy.landscape;

  return (
    <section className="pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="relative bg-ink text-paper overflow-hidden">
        <Image src="/images/cg/site-plan.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/45" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">{head.tag}</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              {head.title}
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/75 text-[13.5px] font-light leading-[1.95]">
              {head.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* ── SUB NAV ── */}
      <div className="bg-paper border-b border-ink/[0.08] sticky top-[56px] z-30 backdrop-blur-md bg-paper/95">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 flex items-center gap-7 overflow-x-auto no-scrollbar">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`relative py-5 text-[12px] tracking-[2px] uppercase whitespace-nowrap transition-colors ${
                activeSubTab === tab.id ? "text-ink" : "text-stone-light hover:text-stone"
              }`}
            >
              {tab.label}
              {activeSubTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-rust" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="bg-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-24">

          {/* ── LANDSCAPE ── */}
          {activeSubTab === "landscape" && (
            <div>
              <div className="grid grid-cols-12 gap-6 mb-10">
                <div className="col-span-12 lg:col-span-4">
                  <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Theme</p>
                  <h2 className="text-ink text-[26px] lg:text-[32px] leading-[1.25] tracking-tight" style={{ fontWeight: 300 }}>
                    수목원만큼 푸르른<br />단지 공원을 소유하다
                  </h2>
                </div>
                <p className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10 text-stone text-[14px] leading-[2] font-light max-w-[560px]">
                  수공간을 품은 초대형 광장과 다채롭고 예술적인 힐링조경.
                  업성만의 유려한 명품 레이크 뷰를 누리며, 단지 안에서도 자연과의 거리가 가까워집니다.
                </p>
              </div>

              {/* 공식 CG — 단지 출입구 */}
              <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-ink mb-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/cg/entrance.jpg" alt="단지 출입구 조감 CG" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
                <p className="absolute bottom-5 left-5 lg:bottom-7 lg:left-7 text-paper text-[13px] lg:text-[15px] tracking-tight" style={{ fontWeight: 500 }}>
                  단지 출입구 — 사계절 힐링조경
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
                {landscapeFeatures.map((f) => (
                  <article key={f.num} className="bg-paper p-8 lg:p-10 min-h-[220px] flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-rust text-[12px] tabular-nums tracking-wider">{f.num}</span>
                      <div className="w-12 h-12 lg:w-14 lg:h-14 text-rust">{f.icon}</div>
                    </div>
                    <h3 className="text-ink text-[20px] lg:text-[22px] tracking-tight leading-tight mb-3" style={{ fontWeight: 500 }}>{f.title}</h3>
                    <p className="text-stone text-[13.5px] font-light leading-[1.95]">{f.desc}</p>
                  </article>
                ))}
              </div>

              <p className="text-stone-light text-[11px] mt-8 font-light">
                * 본 CG는 분양 마케팅 컨셉 안내이며, 실제 시공 시 식재·시설물 위치는 다소 변경될 수 있습니다.
              </p>
            </div>
          )}

          {/* ── COMMUNITY ── */}
          {activeSubTab === "community" && (
            <div>
              <div className="grid grid-cols-12 gap-6 mb-12">
                <div className="col-span-12 lg:col-span-4">
                  <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Resort-like</p>
                  <h2 className="text-ink text-[26px] lg:text-[32px] leading-[1.25] tracking-tight" style={{ fontWeight: 300 }}>
                    리조트보다 즐거운<br />홈캉스를 만끽하다
                  </h2>
                </div>
                <p className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10 text-stone text-[14px] leading-[2] font-light max-w-[560px]">
                  유아 풀장과 사우나까지 갖춘 25m, 4레인 규모 실내수영장을 비롯해
                  피트니스·도서관·키즈존·카페테리아·스크린골프 등 입주민 전용 커뮤니티가 단지 안에서 일상을 풍요롭게 합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                {communityFacilities.map((f) => <PhotoCard key={f.img} {...f} />)}
              </div>

              <p className="text-stone-light text-[11px] mt-8 font-light">
                * 본 CG는 분양 마케팅 컨셉 안내이며, 커뮤니티 시설 구성·규모·운영 방식은 인허가 진행 및 분양 단계에서 변경될 수 있습니다.
              </p>
            </div>
          )}

          {/* ── SKYLOUNGE ── */}
          {activeSubTab === "skylounge" && (
            <div>
              <div className="grid grid-cols-12 gap-6 mb-12">
                <div className="col-span-12 lg:col-span-4">
                  <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">39F Premium</p>
                  <h2 className="text-ink text-[26px] lg:text-[32px] leading-[1.25] tracking-tight" style={{ fontWeight: 300 }}>
                    파노라마로 펼쳐진<br />명품 전망을 즐기다
                  </h2>
                </div>
                <p className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10 text-stone text-[14px] leading-[2] font-light max-w-[560px]">
                  성성호수가 한눈에 들어오는 단지 최상층 39층의 스카이라운지와 게스트하우스.
                  단지 안에서만 누릴 수 있는 또 하나의 프리미엄 라이프 거점입니다.
                </p>
              </div>

              {/* 야경 와이드 + 4-card */}
              <div className="relative aspect-[16/9] sm:aspect-[5/2] overflow-hidden bg-ink mb-3 lg:mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/cg/skylounge-hero.jpg" alt="39층 스카이라운지 석양 CG" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                <p className="absolute bottom-5 left-5 lg:bottom-7 lg:left-7 text-paper text-[13px] lg:text-[15px] tracking-tight" style={{ fontWeight: 500 }}>
                  39층 스카이라운지 — 석양 조망
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                {skyloungeFeatures.map((f) => <PhotoCard key={f.img} {...f} />)}
              </div>

              <p className="text-stone-light text-[11px] mt-8 font-light">
                * 본 CG는 분양 마케팅 컨셉 안내이며, 실제 시공 시 마감·배치·구성은 변경될 수 있습니다.
              </p>
            </div>
          )}

          {/* ── LAYOUT ── */}
          {activeSubTab === "layout" && (
            <div>
              <div className="grid grid-cols-12 gap-6 mb-14">
                <div className="col-span-12 lg:col-span-4">
                  <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Block</p>
                  <h2 className="text-ink text-[26px] lg:text-[32px] leading-[1.25] tracking-tight" style={{ fontWeight: 300 }}>
                    막힘없이 탁 트인<br />창밖 풍경을 간직하다
                  </h2>
                </div>
                <p className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10 text-stone text-[14px] leading-[2] font-light max-w-[560px]">
                  최대 125m 동간거리로 누리는 레이크 뷰 그 이상의 특급조망.
                  지하 2층 ~ 지상 39층, 11개동의 단지 구성으로 11개동 1,460세대가 자리 잡습니다.
                </p>
              </div>

              <div className="border border-ink/10 bg-paper-deep p-3 lg:p-4 mb-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/cg/site-plan.jpg" alt="업성 푸르지오 레이크시티 단지배치도" className="w-full h-auto block" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
                {layoutHighlights.map((s) => (
                  <div key={s.label} className="bg-paper px-5 lg:px-7 py-7 flex flex-col">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 text-rust mb-5">{s.icon}</div>
                    <p className="text-ink tabular-nums text-[36px] lg:text-[44px] leading-none tracking-tight" style={{ fontWeight: 300 }}>
                      {s.num}<span className="text-stone text-[14px] lg:text-[16px] ml-2 align-baseline">{s.unit}</span>
                    </p>
                    <p className="text-stone text-[12px] mt-3">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-16">
                <div>
                  <p className="text-rust text-[10.5px] tracking-[3px] uppercase mb-3">Site</p>
                  <h3 className="text-ink text-[20px] tracking-tight mb-4" style={{ fontWeight: 500 }}>대지 위치</h3>
                  <p className="text-stone text-[13.5px] leading-[2] font-light">
                    충청남도 천안시 서북구 업성동 업성3도시개발구역 A1BL.
                    성성호수공원과 맞닿은 도시 중심 입지 위, 남향으로 펼쳐지는 단지.
                  </p>
                </div>
                <div>
                  <p className="text-rust text-[10.5px] tracking-[3px] uppercase mb-3">Composition</p>
                  <h3 className="text-ink text-[20px] tracking-tight mb-4" style={{ fontWeight: 500 }}>건축 구성</h3>
                  <ul className="text-stone text-[13.5px] leading-[2] font-light space-y-1">
                    <li>· 지하 2층 ~ 지상 37~39층, 11개동</li>
                    <li>· 전용 72·84·95㎡ 3개 평형 10개 타입</li>
                    <li>· 부대복리시설 (커뮤니티·스카이라운지·게스트하우스)</li>
                    <li>· 1층 근린생활시설 (입점업종 미확정)</li>
                  </ul>
                </div>
              </div>

              <ul className="text-stone-light text-[11px] mt-12 font-light leading-relaxed space-y-1">
                <li>* 시설물·식재의 위치는 실제 시공 시 다소 변경될 수 있습니다.</li>
                <li>* 지상·옥상 기계설비(급배기 팬, 정화조 환기구, 제연 팬 실외기 등)는 추후 공사 완료 시 설치됩니다.</li>
                <li>* 1층 생활 폐기물 보관소에 의해 냄새·해충 등의 생활환경 불편이 있을 수 있습니다.</li>
                <li>* 근린생활시설 입점 업체는 미확정이며, 입점업종 관련 일체의 이의를 제기할 수 없습니다.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24">
          <ContactCTA variant="slab" heading="단지 안내" subheading="단지 조경·커뮤니티·배치도 등에 관한 자세한 안내를 받아보실 수 있습니다." />
        </div>
      </div>
    </section>
  );
}
