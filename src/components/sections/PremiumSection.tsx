"use client";

import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";

const premium7 = [
  {
    num: "01",
    tag: "Lake View",
    title: "명품 레이크 뷰 + 남향 배치",
    desc: "성성호수공원을 품은 새도시. 남향으로 펼쳐지는 힐링 라이프와 사계절 수변 조망(일부세대 제외).",
    img: "/images/cg/skylounge-hero.jpg",
  },
  {
    num: "02",
    tag: "Sky Lounge",
    title: "39층 최상층 스카이라운지",
    desc: "파노라마로 펼쳐진 명품 전망. 성성호수가 한눈에 들어오는 39층 스카이라운지 & 게스트하우스.",
    img: "/images/cg/skylounge-night1.jpg",
  },
  {
    num: "03",
    tag: "Pool & Spa",
    title: "25m 4레인 실내수영장",
    desc: "리조트보다 즐거운 홈캉스. 유아 풀장과 사우나까지 갖춘 25m, 4레인 규모 실내수영장.",
    img: "/images/cg/pool.jpg",
  },
  {
    num: "04",
    tag: "Landscape",
    title: "수목원급 단지조경",
    desc: "수공간을 품은 초대형 광장과 다채롭고 예술적인 힐링조경. 수목원만큼 푸르른 단지 공원.",
    img: "/images/cg/entrance.jpg",
  },
  {
    num: "05",
    tag: "Distance",
    title: "최대 125m 동간거리",
    desc: "막힘없이 탁 트인 창밖 풍경. 최대 125m 동간거리로 누리는 레이크 뷰 그 이상의 특급조망.",
    img: "/images/cg/site-plan.jpg",
  },
  {
    num: "06",
    tag: "Transport",
    title: "1호선 부성역(예정) 광역교통",
    desc: "수도권전철 1호선 부성역(예정) 신설 협약 체결. 번영로·삼성대로·천안대로·천안IC 쾌속교통.",
    img: "/images/highway-aerial.jpg",
  },
  {
    num: "07",
    tag: "Education",
    title: "원스톱 교육환경",
    desc: "1블록 옆 고교(예정), 2블록 앞 초·중교(예정), 성성지구 학원가 — 한 번에 누리는 학군 인프라.",
    img: "/images/classroom.jpg",
  },
];

export default function PremiumSection() {
  return (
    <section className="pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="relative bg-ink text-paper overflow-hidden">
        <Image src="/images/cg/skylounge-hero.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/35" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Premium</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              7가지 프리미엄
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/75 text-[13.5px] font-light leading-[1.95]">
              호수뷰·스카이라운지·실내수영장·단지조경·동간거리·교통·교육까지,
              일곱 가지 프리미엄이 하나의 단지에서 완성됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── PREMIUM GRID — photo cards ── */}
      <div className="bg-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {premium7.map((p) => (
              <article key={p.num} className="relative aspect-[4/3] overflow-hidden bg-ink group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute top-5 left-5 lg:top-7 lg:left-7 flex items-center gap-3">
                  <span className="text-rust text-[12px] tabular-nums tracking-wider">{p.num}</span>
                  <span className="w-6 h-px bg-rust/60" />
                  <span className="text-paper/70 text-[10px] tracking-[3px] uppercase">{p.tag}</span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 lg:bottom-7 lg:left-7 lg:right-7">
                  <h3 className="text-paper text-[19px] lg:text-[22px] tracking-tight leading-tight mb-2" style={{ fontWeight: 500 }}>
                    {p.title}
                  </h3>
                  <p className="text-paper/65 text-[12px] lg:text-[12.5px] font-light leading-[1.85]">
                    {p.desc}
                  </p>
                </div>
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
