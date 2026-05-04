"use client";

import { useEffect, useRef, useState } from "react";
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

const headerCopy: Record<string, { tag: string; title: string; subtitle: string }> = {
  landscape: {
    tag: "Landscape",
    title: "단지 조경",
    subtitle: "수공간을 품은 초대형 광장과 다채롭고 예술적인 힐링조경. 수목원만큼 푸르른 단지 공원.",
  },
  community: {
    tag: "Community",
    title: "커뮤니티",
    subtitle: "리조트보다 즐거운 홈캉스. 25m 4레인 실내수영장·사우나·피트니스·도서관 등 풍요로운 입주민 시설.",
  },
  skylounge: {
    tag: "Sky Lounge",
    title: "스카이라운지 & 게스트하우스",
    subtitle: "파노라마로 펼쳐진 명품 전망. 성성호수가 한눈에 들어오는 39층 스카이라운지.",
  },
  layout: {
    tag: "Block Layout",
    title: "단지배치도",
    subtitle: "지하 2층 ~ 지상 39층, 11개동 1,460세대 배치. 최대 125m 동간거리로 누리는 막힘없는 조망.",
  },
};

const landscapeImgs = [
  "/images/crawled/landscape_img_01.jpg",
  "/images/crawled/landscape_img_02.jpg",
  "/images/crawled/landscape_img_03.jpg",
  "/images/crawled/landscape_img_04.jpg",
];

const communityImgs = [
  "/images/crawled/sub_community_img_01.jpg",
  "/images/crawled/sub_community_img_03.jpg",
  "/images/crawled/sub_community_img_04.jpg",
  "/images/crawled/sub_community_img_05.jpg",
  "/images/crawled/sub_community_img_06.jpg",
  "/images/crawled/sub_community_img_07.jpg",
];

const skyloungeImgs = [
  "/images/crawled/sub_skylounge_img_01.jpg",
  "/images/crawled/sub_skylounge_img_03.jpg",
  "/images/crawled/sub_skylounge_img_04.jpg",
  "/images/crawled/sub_skylounge_img_06.jpg",
];

export default function ComplexSection({ initialSubTab }: ComplexSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab || "landscape");
  const content = useInView();
  const head = headerCopy[activeSubTab] || headerCopy.landscape;

  return (
    <section className="pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">{head.tag}</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              {head.title}
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/65 text-[13.5px] font-light leading-[1.95]">
              {head.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* ── SUB NAV ── */}
      <div className="bg-paper border-b border-ink/[0.08] sticky top-[56px] z-30 backdrop-blur-md bg-paper/95">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 flex items-center gap-7 overflow-x-auto">
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
      <div ref={content.ref} className={`bg-paper transition-all duration-700 ${content.visible ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-24">

          {activeSubTab === "landscape" && (
            <div className="space-y-16 lg:space-y-24">
              {landscapeImgs.map((src, i) => (
                <figure key={src} className="relative">
                  <div className="relative aspect-[16/10] lg:aspect-[16/8] overflow-hidden bg-ink">
                    <Image src={src} alt={`단지 조경 ${i + 1}`} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
                  </div>
                  <figcaption className="text-stone-light text-[11px] mt-3 font-light tracking-wide">
                    LANDSCAPE / {String(i + 1).padStart(2, "0")} — 이미지 컷 (실제와 다를 수 있음)
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {activeSubTab === "community" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
              {communityImgs.map((src, i) => (
                <figure key={src} className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <Image src={src} alt={`커뮤니티 시설 ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <figcaption className="text-stone-light text-[11px] mt-3 font-light tracking-wide">
                    COMMUNITY / {String(i + 1).padStart(2, "0")}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {activeSubTab === "skylounge" && (
            <div className="space-y-12 lg:space-y-16">
              {skyloungeImgs.map((src, i) => (
                <figure key={src} className="relative">
                  <div className={`relative ${i === 0 || i === 2 ? "aspect-[16/5]" : "aspect-[16/9]"} overflow-hidden bg-ink`}>
                    <Image src={src} alt={`스카이라운지 ${i + 1}`} fill sizes="100vw" className="object-cover" />
                  </div>
                  <figcaption className="text-stone-light text-[11px] mt-3 font-light tracking-wide">
                    SKY LOUNGE / {String(i + 1).padStart(2, "0")} — 39층 최상층
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {activeSubTab === "layout" && (
            <div className="space-y-10">
              <figure className="relative border border-ink/10 p-2 bg-paper">
                <div className="relative aspect-[1100/1201] overflow-hidden bg-paper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/crawled/danji_layout.jpg" alt="단지배치도" className="w-full h-auto" />
                </div>
              </figure>
              <ul className="text-stone text-[12.5px] leading-[2] font-light space-y-1.5 max-w-[820px]">
                <li>* 상기 이미지는 소비자의 이해를 돕기 위한 것으로 실제와 차이가 날 수 있습니다.</li>
                <li>* 시설물·식재의 위치는 실제 시공 시 다소 변경될 수 있습니다.</li>
                <li>* 지상 및 옥상에 기계설비(급배기 팬, 정화조 환기구, 제연 팬 실외기 등) 표현이 없으나 추후 공사 완료 시에는 설치됩니다.</li>
                <li>* 1층에 설치되는 생활 폐기물 보관소에 의해 냄새 및 해충 등 생활환경 불편이 있을 수 있습니다.</li>
                <li>* 근린생활시설 입점 업체는 미확정이며, 입점업종과 관련한 일체의 이의를 제기할 수 없습니다.</li>
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
