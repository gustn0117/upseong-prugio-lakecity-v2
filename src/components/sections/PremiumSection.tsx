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
  },
  {
    num: "02",
    tag: "Landmark",
    title: "푸르지오 랜드마크 프리미엄",
    desc: "총 6,723세대 규모의 푸르지오 브랜드 타운. 대우건설이 만드는 대규모 랜드마크 주거단지의 프리미엄을 누리세요.",
    img: "/images/premium-landmark.jpg",
  },
  {
    num: "03",
    tag: "Design",
    title: "차별화된 대단지 특화설계",
    desc: "실내수영장, 스카이라운지, 힐링 단지조경 등 대단지만의 차별화된 특화설계로 입주민의 삶의 질을 높입니다.",
    img: "/images/premium-amenity.jpg",
  },
  {
    num: "04",
    tag: "Education",
    title: "학교를 품은 안심 교육환경",
    desc: "1블록 바로 옆 고등학교, 2블록 앞 초·중학교 배치. 도보 통학이 가능한 안심 교육환경과 학원가가 가까이 있습니다.",
    img: "/images/premium-school.jpg",
  },
  {
    num: "05",
    tag: "Infrastructure",
    title: "삶이 편리한 새도시 인프라",
    desc: "이마트, 코스트코 등 대형마트와 중심 생활상권이 인접. 새도시의 풍부한 인프라가 편리한 일상을 완성합니다.",
    img: "/images/premium-infra.jpg",
  },
  {
    num: "06",
    tag: "Transport",
    title: "빠르고 다양한 멀티 교통망",
    desc: "번영로, 삼성대로, 천안대로 등 광역 도로망과 1호선 부성역이 인접하여 서울과 전국을 빠르게 연결합니다.",
    img: "/images/premium-highway.jpg",
  },
  {
    num: "07",
    tag: "Future",
    title: "불당 너머 성성호수 새도시",
    desc: "2만 5천여 세대 규모의 신주거타운. 불당을 넘어 성성호수 새도시가 만드는 미래 비전과 성장 가치를 선점하세요.",
    img: "/images/premium-future.jpg",
  },
];

export default function PremiumSection() {
  const intro = useInView();

  return (
    <section className="pt-[72px]">
      {/* ══════════ HERO BANNER ══════════ */}
      <div className="relative h-[50vh] min-h-[340px]">
        <Image src="/images/banner-premium.jpg" alt="" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold/80 text-[10px] tracking-[5px] font-medium uppercase mb-4 text-shadow-subtle">Premium</p>
            <h1 className="text-white text-[36px] lg:text-[52px] font-extralight tracking-tight text-shadow-banner">PREMIUM 7</h1>
            <div className="w-10 h-[1px] bg-gold/40 mx-auto mt-5" />
          </div>
        </div>
      </div>

      {/* ══════════ INTRO ══════════ */}
      <div ref={intro.ref} className="bg-white">
        <div className={`max-w-[900px] mx-auto px-6 lg:px-16 py-20 lg:py-28 text-center transition-all duration-700 ${intro.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-[26px] lg:text-[38px] font-extralight text-charcoal leading-snug tracking-tight">
            업성 푸르지오 레이크시티
            <br />
            7가지 프리미엄
          </h2>
          <div className="w-10 h-[1px] bg-gold/40 mx-auto mt-8 mb-8" />
          <p className="text-cool-gray text-[14px] leading-[2] font-light max-w-[520px] mx-auto">
            호수뷰, 랜드마크, 특화설계, 교육, 인프라, 교통, 미래가치까지
            <br />
            7가지 프리미엄이 하나의 단지에서 완성됩니다.
          </p>
        </div>
      </div>

      {/* ══════════ PREMIUM 7 — Alternating Blocks ══════════ */}
      {premium7.map((item, i) => {
        const sec = useInView(0.1);
        const isEven = i % 2 === 0;

        return (
          <div
            key={i}
            ref={sec.ref}
            className={`${i % 2 === 0 ? "bg-white" : "bg-off-white"}`}
          >
            <div className={`max-w-[1400px] mx-auto transition-all duration-[800ms] ${sec.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="grid lg:grid-cols-2 min-h-[480px] lg:min-h-[520px]">
                {/* Image */}
                <div className={`relative min-h-[300px] lg:min-h-0 overflow-hidden group ${isEven ? "order-1" : "order-1 lg:order-2"}`}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Text */}
                <div className={`flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-14 lg:py-20 ${isEven ? "order-2" : "order-2 lg:order-1"}`}>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-gold text-[36px] lg:text-[42px] font-extralight leading-none">{item.num}</span>
                    <div className="w-8 h-[1px] bg-gold/30" />
                    <span className="text-gold/60 text-[10px] tracking-[4px] font-medium uppercase">{item.tag}</span>
                  </div>

                  <h3 className="text-[24px] lg:text-[30px] font-extralight text-charcoal tracking-tight leading-snug mb-4">
                    {item.title}
                  </h3>

                  <div className="w-10 h-[1px] bg-gray-200 mb-6" />

                  <p className="text-cool-gray text-[14px] leading-[2] font-light max-w-[420px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ══════════ CTA ══════════ */}
      <div className="bg-navy py-20">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <ContactCTA variant="gold" heading="프리미엄 상담 문의" />
        </div>
      </div>
    </section>
  );
}
