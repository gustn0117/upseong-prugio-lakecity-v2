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

const premium7 = [
  {
    num: "01",
    tag: "Lake View",
    title: "수려한 남향 호수뷰",
    desc: "남쪽으로 아름답게 펼쳐진 명품 레이크 뷰. 성성호수공원의 탁 트인 수변 조망이 일상 속 특별한 풍경이 됩니다.",
    img: "/images/premium-lakeview.jpg",
    span: "lg:col-span-7 lg:row-span-2", // big
    minH: "lg:min-h-[640px]",
  },
  {
    num: "02",
    tag: "Landmark",
    title: "푸르지오 랜드마크",
    desc: "총 6,723세대 규모의 푸르지오 브랜드 타운. 대우건설이 만드는 대규모 랜드마크 주거단지의 프리미엄.",
    img: "/images/premium-landmark.jpg",
    span: "lg:col-span-5",
    minH: "lg:min-h-[300px]",
  },
  {
    num: "03",
    tag: "Design",
    title: "특화 설계",
    desc: "실내수영장, 스카이라운지, 힐링 단지조경 등 대단지만의 차별화된 특화설계.",
    img: "/images/premium-amenity.jpg",
    span: "lg:col-span-5",
    minH: "lg:min-h-[300px]",
  },
  {
    num: "04",
    tag: "Education",
    title: "학교를 품은 안심 교육환경",
    desc: "1블록 바로 옆 고등학교, 2블록 앞 초·중학교 배치. 도보 통학이 가능한 안심 교육환경과 학원가가 함께합니다.",
    img: "/images/premium-school.jpg",
    span: "lg:col-span-12",
    minH: "lg:min-h-[360px]",
  },
  {
    num: "05",
    tag: "Living",
    title: "새도시 생활 인프라",
    desc: "이마트, 코스트코 등 대형마트와 중심 생활상권 인접. 새도시의 풍부한 인프라.",
    img: "/images/premium-infra.jpg",
    span: "lg:col-span-6",
    minH: "lg:min-h-[400px]",
  },
  {
    num: "06",
    tag: "Transport",
    title: "멀티 교통망",
    desc: "번영로, 삼성대로, 천안대로 등 광역 도로망과 1호선 부성역 인접.",
    img: "/images/premium-highway.jpg",
    span: "lg:col-span-6",
    minH: "lg:min-h-[400px]",
  },
  {
    num: "07",
    tag: "Future",
    title: "미래 비전",
    desc: "2만 5천여 세대 규모의 신주거타운. 불당을 넘어 성성호수 새도시가 만드는 미래 비전과 성장 가치.",
    img: "/images/premium-future.jpg",
    span: "lg:col-span-12",
    minH: "lg:min-h-[420px]",
  },
];

export default function PremiumSection() {
  const intro = useInView();
  const grid = useInView(0.05);

  return (
    <section className="pt-[56px] bg-paper">

      {/* ── EDITORIAL HEADER ── */}
      <div className="bg-ink text-paper relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-24 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-4">N°03 — PREMIUM</p>
            <h1 className="font-display text-paper text-[48px] lg:text-[88px] leading-[0.95] tracking-tight" style={{ fontWeight: 400 }}>
              프리미엄<br />
              <span className="italic text-rust">Seven Codes.</span>
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-12">
            <p className="text-paper/55 text-[14px] font-light leading-[2]">
              호수뷰, 랜드마크, 특화설계, 교육, 인프라, 교통, 미래가치까지.
              7가지 프리미엄이 하나의 단지에서 완성됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── INDEX TABLE ── */}
      <div ref={intro.ref} className={`bg-paper-deep border-b border-ink/[0.08] transition-all duration-700 ${intro.visible ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-12 lg:py-16">
          <p className="text-mono text-[10px] tabular-nums text-stone-light tracking-[3px] uppercase mb-5">— Index</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-3">
            {premium7.map((p) => (
              <a
                key={p.num}
                href={`#premium-${p.num}`}
                className="group flex items-baseline gap-2 text-ink hover:text-rust transition-colors"
              >
                <span className="text-mono text-[10px] tabular-nums text-stone-light group-hover:text-rust">{p.num}</span>
                <span className="text-[12.5px] font-light tracking-wide">{p.tag}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── BENTO MOSAIC ── */}
      <div ref={grid.ref} className="bg-paper">
        <div className={`max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-20 grid grid-cols-12 gap-3 lg:gap-4 transition-all duration-1000 ${grid.visible ? "opacity-100" : "opacity-0"}`}>
          {premium7.map((p) => (
            <article
              key={p.num}
              id={`premium-${p.num}`}
              className={`relative ${p.span} col-span-12 ${p.minH} min-h-[320px] overflow-hidden group bg-ink`}
            >
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover opacity-90 transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-ink/30 to-transparent" />

              {/* Top corner — number + tag */}
              <div className="absolute top-5 left-5 lg:top-7 lg:left-7 flex items-center gap-3">
                <span className="font-display text-rust text-[28px] lg:text-[36px] leading-none tabular-nums" style={{ fontWeight: 400 }}>{p.num}</span>
                <span className="w-6 h-[1px] bg-rust/60" />
                <span className="text-paper/70 text-[10px] tracking-[3px] uppercase">{p.tag}</span>
              </div>

              {/* Bottom — title + desc */}
              <div className="absolute bottom-5 left-5 right-5 lg:bottom-8 lg:left-8 lg:right-8">
                <h3 className="font-display text-paper text-[24px] lg:text-[34px] leading-[1.1] tracking-tight" style={{ fontWeight: 400 }}>
                  {p.title}
                </h3>
                <p className="text-paper/60 text-[12.5px] lg:text-[13px] font-light leading-[1.85] max-w-[460px] mt-3">
                  {p.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24">
          <ContactCTA variant="slab" heading="프리미엄 안내" subheading="단지 프리미엄·특화설계·미래가치에 대한 자세한 안내를 받아보실 수 있습니다." />
        </div>
      </div>
    </section>
  );
}
