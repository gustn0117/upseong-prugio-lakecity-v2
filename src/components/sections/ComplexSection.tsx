"use client";

import { useEffect, useRef, useState } from "react";
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

const landscapeFeatures = [
  {
    num: "01",
    title: "초대형 수공간 광장",
    desc: "단지 중심에 자리한 대형 수경 시설. 잔잔한 수면이 일상에 여유와 정서적 안정감을 더합니다.",
  },
  {
    num: "02",
    title: "다채롭고 예술적인 힐링조경",
    desc: "사계절 변화를 느낄 수 있는 다층 식재 구조. 교목·관목·하층 식재가 어우러진 입체적 그린 스케이프.",
  },
  {
    num: "03",
    title: "수목원급 단지 공원",
    desc: "수목원만큼 푸르른 단지 공원. 입주민이 일상 속에서 자연을 가까이 누릴 수 있는 산책 동선을 갖춥니다.",
  },
  {
    num: "04",
    title: "휴식과 산책의 보행 동선",
    desc: "단지 곳곳을 잇는 안전한 보행로와 휴식 거점. 단지 내부 어디에서나 자연스럽게 자연과 마주합니다.",
  },
];

const communityFacilities = [
  { tag: "Pool", title: "25m 4레인 실내수영장", desc: "유아 풀장과 사우나를 함께 갖춘 25m, 4레인 규모 실내수영장. 리조트보다 즐거운 홈캉스를 만끽." },
  { tag: "Sauna", title: "사우나", desc: "수영장과 연계된 사우나 시설로 운동 후의 피로 회복 동선까지 단지 안에서 완성." },
  { tag: "Fitness", title: "피트니스 클럽", desc: "유산소·웨이트·GX 공간을 갖춘 피트니스 클럽. 입주민 전용으로 쾌적한 운동 환경을 제공." },
  { tag: "Library", title: "도서관 · 스터디룸", desc: "독서·자기계발·아이의 학습이 가능한 조용한 라이브러리와 스터디 라운지." },
  { tag: "Kids", title: "키즈존", desc: "아이들이 안전하게 머무를 수 있는 실내 놀이 공간. 부모가 가까이서 함께 시간을 나눌 수 있습니다." },
  { tag: "Cafe", title: "카페테리아 · 라운지", desc: "이웃과 가볍게 만날 수 있는 카페 라운지. 단지의 일상 모임 거점." },
];

const skyloungeFeatures = [
  {
    num: "01",
    title: "39층 최상층 스카이라운지",
    desc: "성성호수공원이 한눈에 들어오는 단지 최상층의 라운지 공간. 파노라마로 펼쳐진 명품 전망.",
  },
  {
    num: "02",
    title: "게스트하우스",
    desc: "방문객을 위한 별도의 게스트하우스. 손님을 가까이서 모실 수 있는 단지 안의 호스피탈리티.",
  },
  {
    num: "03",
    title: "프라이빗 라운지 좌석",
    desc: "휴식·미팅·차 한잔을 위한 라운지 좌석. 입주민만이 누릴 수 있는 단지 안의 특별한 시간.",
  },
];

const layoutHighlights = [
  { num: "11", unit: "개동", label: "건축 동수" },
  { num: "39", unit: "층", label: "최고 층수" },
  { num: "125", unit: "m", label: "최대 동간거리" },
  { num: "1,460", unit: "세대", label: "1블록 공급" },
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
            <div>
              <div className="grid grid-cols-12 gap-6 mb-14">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
                {landscapeFeatures.map((f) => (
                  <article key={f.num} className="bg-paper p-8 lg:p-10 min-h-[200px]">
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-rust text-[12px] tabular-nums tracking-wider">{f.num}</span>
                      <span className="h-px flex-1 bg-ink/10" />
                    </div>
                    <h3 className="text-ink text-[20px] lg:text-[22px] tracking-tight leading-tight mb-3" style={{ fontWeight: 500 }}>
                      {f.title}
                    </h3>
                    <p className="text-stone text-[13.5px] font-light leading-[1.95]">
                      {f.desc}
                    </p>
                  </article>
                ))}
              </div>

              <p className="text-stone-light text-[11px] mt-8 font-light">
                * 본 내용은 분양 마케팅 컨셉 안내이며, 실제 시공 시 식재·시설물 위치는 다소 변경될 수 있습니다.
              </p>
            </div>
          )}

          {activeSubTab === "community" && (
            <div>
              <div className="grid grid-cols-12 gap-6 mb-14">
                <div className="col-span-12 lg:col-span-4">
                  <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Resort-like</p>
                  <h2 className="text-ink text-[26px] lg:text-[32px] leading-[1.25] tracking-tight" style={{ fontWeight: 300 }}>
                    리조트보다 즐거운<br />홈캉스를 만끽하다
                  </h2>
                </div>
                <p className="col-span-12 lg:col-span-8 lg:pl-12 lg:border-l lg:border-ink/10 text-stone text-[14px] leading-[2] font-light max-w-[560px]">
                  유아 풀장과 사우나까지 갖춘 25m, 4레인 규모 실내수영장을 비롯해
                  피트니스·도서관·키즈존·카페테리아 등 입주민 전용 커뮤니티가 단지 안에서 일상을 풍요롭게 합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
                {communityFacilities.map((f) => (
                  <article key={f.title} className="bg-paper p-7 lg:p-8 min-h-[200px] flex flex-col">
                    <p className="text-rust text-[10.5px] tracking-[3px] uppercase mb-3">{f.tag}</p>
                    <h3 className="text-ink text-[18px] lg:text-[19px] tracking-tight leading-tight mb-3" style={{ fontWeight: 500 }}>
                      {f.title}
                    </h3>
                    <p className="text-stone text-[13px] font-light leading-[1.9]">
                      {f.desc}
                    </p>
                  </article>
                ))}
              </div>

              <p className="text-stone-light text-[11px] mt-8 font-light">
                * 커뮤니티 시설 구성·규모·운영 방식은 인허가 진행 및 분양 단계에서 변경될 수 있습니다.
              </p>
            </div>
          )}

          {activeSubTab === "skylounge" && (
            <div>
              <div className="grid grid-cols-12 gap-6 mb-14">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
                {skyloungeFeatures.map((f) => (
                  <article key={f.num} className="bg-paper p-8 lg:p-10 min-h-[220px]">
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-rust text-[12px] tabular-nums tracking-wider">{f.num}</span>
                      <span className="h-px flex-1 bg-ink/10" />
                    </div>
                    <h3 className="text-ink text-[19px] lg:text-[20px] tracking-tight leading-tight mb-3" style={{ fontWeight: 500 }}>
                      {f.title}
                    </h3>
                    <p className="text-stone text-[13px] font-light leading-[1.95]">
                      {f.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

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

              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-ink/10 lg:divide-y-0 lg:divide-x lg:divide-ink/10 border border-ink/10">
                {layoutHighlights.map((s, i) => (
                  <div key={i} className="px-5 lg:px-8 py-7">
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
