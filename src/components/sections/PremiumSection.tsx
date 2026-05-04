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

const premium7 = [
  {
    num: "01",
    tag: "Lake View",
    title: "수려한 남향 호수뷰",
    desc: "성성호수공원의 탁 트인 수변 조망. 남향 배치로 사계절 풍경을 즐길 수 있습니다.",
    img: "/images/premium-nature.jpg",
  },
  {
    num: "02",
    tag: "Landmark",
    title: "푸르지오 랜드마크",
    desc: "총 6,723세대 규모의 푸르지오 브랜드 타운. 대규모 단지의 프리미엄.",
    img: "/images/premium-landmark.jpg",
  },
  {
    num: "03",
    tag: "Design",
    title: "특화 설계",
    desc: "실내수영장·스카이라운지·힐링 단지조경 등 대단지 차별화 설계.",
    img: "/images/premium-amenity.jpg",
  },
  {
    num: "04",
    tag: "Education",
    title: "안심 교육환경",
    desc: "도보 통학권 초·중학교 인접. 학원가 또한 가까운 거리에 위치합니다.",
    img: "/images/premium-edu.jpg",
  },
  {
    num: "05",
    tag: "Living",
    title: "생활 인프라",
    desc: "이마트·코스트코 등 대형마트 인접. 새도시 중심 상권의 풍부한 인프라.",
    img: "/images/premium-life.jpg",
  },
  {
    num: "06",
    tag: "Transport",
    title: "광역 교통망",
    desc: "번영로·삼성대로·천안대로 광역 도로망과 1호선 부성역 인접.",
    img: "/images/premium-transport-new.jpg",
  },
  {
    num: "07",
    tag: "Future",
    title: "미래 비전",
    desc: "2만 5천여 세대 신주거타운. 성성호수 새도시의 미래 가치.",
    img: "/images/premium-future.jpg",
  },
];

export default function PremiumSection() {
  const grid = useInView();

  return (
    <section className="pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Premium</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              7가지 프리미엄
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/65 text-[13.5px] font-light leading-[1.95]">
              호수뷰·랜드마크·특화설계·교육·인프라·교통·미래가치까지,
              7가지 프리미엄이 하나의 단지에서 완성됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── PREMIUM GRID — clean uniform layout ── */}
      <div ref={grid.ref} className="bg-paper">
        <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-28 transition-all duration-700 ${grid.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {premium7.map((p, i) => (
              <article key={p.num} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink mb-5">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-rust text-[11px] tabular-nums tracking-wider">{p.num}</span>
                  <span className="text-stone-light text-[10.5px] tracking-[2px] uppercase">{p.tag}</span>
                </div>
                <h3 className="text-ink text-[18px] lg:text-[20px] tracking-tight leading-tight mb-2.5" style={{ fontWeight: 500 }}>
                  {p.title}
                </h3>
                <p className="text-stone text-[13px] font-light leading-[1.85]">
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
