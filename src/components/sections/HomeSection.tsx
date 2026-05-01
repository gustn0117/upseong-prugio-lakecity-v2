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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
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
  const hero = useInView(0.1);
  const about = useInView();
  const features = useInView(0.1);
  const stats = useInView();
  const cta = useInView();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToContent = () => {
    const el = document.getElementById("home-content");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section>
      {/* ══════════ INTRO SPLASH ══════════ */}
      <div className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden bg-[#070b12]">

        {/* Lake photo background */}
        <Image src="/images/lake-view.jpg" alt="" fill className="object-cover opacity-35" sizes="100vw" priority />

        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b12]/70 via-transparent to-[#070b12]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b12]/30 via-transparent to-[#070b12]/30" />
        {/* Radial vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(7,11,18,0.6) 100%)" }} />

        {/* Decorative circle — outer (gold) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div
            className="w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] lg:w-[580px] lg:h-[580px] rounded-full"
            style={{ border: "1px solid rgba(184,151,106,0.12)" }}
          />
        </div>
        {/* Decorative circle — inner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div
            className="w-[350px] h-[350px] sm:w-[410px] sm:h-[410px] lg:w-[480px] lg:h-[480px] rounded-full"
            style={{ border: "1px solid rgba(255,255,255,0.04)" }}
          />
        </div>

        {/* Gold corner accents */}
        <div className="absolute top-8 right-8 lg:top-14 lg:right-14 pointer-events-none">
          <div className="w-10 h-10 lg:w-14 lg:h-14 border-t border-r border-gold/20" />
        </div>
        <div className="absolute bottom-24 left-8 lg:bottom-28 lg:left-14 pointer-events-none">
          <div className="w-10 h-10 lg:w-14 lg:h-14 border-b border-l border-gold/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Eyebrow */}
          <p
            className={`text-gold/60 text-[10px] sm:text-[11px] tracking-[6px] uppercase font-light mb-6 text-shadow-subtle transition-all duration-[1400ms] delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Upseong · Daewoo E&amp;C
          </p>

          {/* Title */}
          <h1
            className={`text-white text-[38px] sm:text-[52px] lg:text-[64px] tracking-[12px] sm:tracking-[16px] lg:tracking-[22px] leading-none text-shadow-hero transition-all duration-[1400ms] delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ fontWeight: 200, paddingLeft: "22px" }}
          >
            PRUGIO
          </h1>

          {/* Subtitle */}
          <div className={`flex items-center gap-4 sm:gap-5 mt-5 mb-8 transition-all duration-[1400ms] delay-[400ms] ${loaded ? "opacity-100" : "opacity-0"}`}>
            <span className="w-10 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-white/70 text-[13px] sm:text-[15px] tracking-[8px] sm:tracking-[12px] font-extralight text-shadow-subtle" style={{ paddingLeft: "12px" }}>
              레 이 크 시 티
            </span>
            <span className="w-10 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          {/* Description */}
          <p className={`text-white/50 text-[12px] sm:text-[14px] tracking-[2px] font-light mb-1 text-shadow-subtle transition-all duration-[1400ms] delay-[600ms] ${loaded ? "opacity-100" : "opacity-0"}`}>
            호수공원 앞 · 프리미엄 주거단지
          </p>
          <p className={`text-white/30 text-[10px] tracking-[3px] uppercase font-light mb-16 text-shadow-subtle transition-all duration-[1400ms] delay-[700ms] ${loaded ? "opacity-100" : "opacity-0"}`}>
            Lake Park · Premium Residence
          </p>

          {/* Enter Button */}
          <button
            onClick={scrollToContent}
            className={`group relative px-16 sm:px-20 py-4 border border-white/20 text-white/70 text-[11px] tracking-[5px] uppercase font-light hover:bg-white hover:text-[#0a0f18] hover:border-white transition-all duration-500 cursor-pointer overflow-hidden ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: loaded ? "900ms" : "0ms" }}
          >
            <span className="relative z-10">ENTER</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-[80px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-[1400ms] delay-[1200ms] ${loaded ? "opacity-100" : "opacity-0"}`}>
          <span className="text-white/20 text-[9px] tracking-[3px] uppercase font-light">Scroll</span>
          <div className="w-[1px] h-5 relative overflow-hidden">
            <div className="absolute w-full h-full bg-gradient-to-b from-gold/40 to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Bottom Nav */}
        <div className={`absolute bottom-0 left-0 right-0 border-t border-white/[0.08] py-5 bg-black/20 backdrop-blur-sm transition-all duration-[1400ms] delay-[1100ms] ${loaded ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap px-6">
            {[
              { id: "business", en: "OVERVIEW" },
              { id: "location", en: "LOCATION" },
              { id: "premium", en: "PREMIUM" },
              { id: "register", en: "REGISTER" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => onTabChange?.(item.id)}
                className="text-white/35 hover:text-gold transition-colors duration-300"
              >
                <span className="text-[10px] sm:text-[11px] tracking-[3px] uppercase font-light">{item.en}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ BELOW THE FOLD ══════════ */}
      <div id="home-content">

        {/* HERO CINEMATIC — fades from splash dark */}
        <div ref={hero.ref} className="relative h-[80vh] min-h-[550px]">
          <Image src="/images/hero-lake.jpg" alt="호수공원 전경" fill className="object-cover" sizes="100vw" />
          {/* Stronger gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1020]/90 via-navy/40 to-navy/25" />
          {/* Top fade from dark — seamless from splash */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#070b12] to-transparent" />

          <div className={`absolute inset-0 flex items-end transition-all duration-[1000ms] ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-16 pb-16 lg:pb-24">
              <p className="text-gold/70 text-[10px] tracking-[5px] uppercase mb-4 text-shadow-subtle">Upseong Prugio Lakecity</p>
              <h2 className="text-white text-[36px] sm:text-[48px] lg:text-[60px] font-extralight leading-[1.1] tracking-tight mb-6 text-shadow-hero">
                호수 위의<br />새로운 라이프
              </h2>
              <p className="text-white/60 text-[13px] sm:text-[15px] font-light leading-relaxed max-w-[420px] text-shadow-subtle">
                천안 업성동, 호수공원 바로 앞<br />
                대우건설이 선보이는 프리미엄 주거
              </p>
            </div>
          </div>

          {/* Stats — bottom right */}
          <div className="absolute bottom-0 right-0 hidden lg:flex">
            {[
              { num: "1,908", label: "총 세대", suffix: "" },
              { num: "39", label: "최고층", suffix: "F" },
              { num: "72·84·95", label: "전용면적", suffix: "㎡" },
            ].map((s, i) => (
              <div key={i} className="w-[160px] py-8 text-center border-l border-white/10 bg-navy/50 backdrop-blur-md">
                <p className="text-white text-[24px] font-extralight tracking-tight text-shadow-subtle">{s.num}<span className="text-gold/70 text-[14px] ml-0.5">{s.suffix}</span></p>
                <p className="text-white/40 text-[10px] tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bottom fade to white — seamless into About */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* ABOUT */}
        <div ref={about.ref} className="bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 min-h-[70vh]">

              {/* Text */}
              <div className={`flex flex-col justify-center px-8 lg:px-20 py-20 lg:py-28 transition-all duration-[900ms] ${about.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <p className="text-gold text-[10px] tracking-[5px] font-medium uppercase mb-6">About the Project</p>
                <h2 className="text-[30px] lg:text-[42px] font-extralight text-charcoal leading-[1.25] tracking-tight mb-6">
                  일상이<br />새로워지다
                </h2>
                <div className="w-10 h-[1px] bg-gold/40 mb-8" />
                <p className="text-cool-gray text-[14px] leading-[2.2] font-light mb-14 max-w-[440px]">
                  업성 푸르지오 레이크시티는 호수공원 바로 앞에 위치하여
                  탁 트인 호수 조망과 쾌적한 자연환경을 누릴 수 있습니다.
                  대우건설 푸르지오 브랜드로 새로운 라이프스타일과
                  프리미엄 주거 가치를 제공합니다.
                </p>

                <div className="flex items-start gap-10 lg:gap-14">
                  {[
                    { num: "1,908", label: "세대" },
                    { num: "11", label: "개 동" },
                    { num: "39", label: "최고층" },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="text-navy text-[32px] lg:text-[36px] font-extralight tracking-tight leading-none">{s.num}</p>
                      <p className="text-cool-gray/50 text-[10px] tracking-wider mt-2 font-light">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className={`relative min-h-[400px] lg:min-h-0 transition-all duration-[900ms] delay-200 ${about.visible ? "opacity-100" : "opacity-0"}`}>
                <Image src="/images/about-lobby.jpg" alt="프리미엄 주거" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold/40 via-gold/10 to-transparent hidden lg:block" />
              </div>
            </div>
          </div>
        </div>

        {/* About → Features transition */}
        <div className="h-20 lg:h-28 bg-gradient-to-b from-white to-[#F8F7F4]" />

        {/* FEATURES */}
        <div ref={features.ref} className="bg-[#F8F7F4]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-8 lg:pt-12 pb-24 lg:pb-36">

            {/* Section header */}
            <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-24 transition-all duration-700 ${features.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div>
                <p className="text-gold text-[10px] tracking-[5px] font-medium uppercase mb-4">Premium Value</p>
                <h2 className="text-[28px] lg:text-[40px] font-extralight text-charcoal tracking-tight leading-tight">
                  걸어서 누리는<br className="lg:hidden" /> 완성된 프리미엄
                </h2>
              </div>
              <p className="text-cool-gray text-[13px] font-light mt-4 lg:mt-0 lg:max-w-[300px] leading-relaxed">
                자연, 교통, 교육, 생활 — 모든 프리미엄이 도보 생활권 안에 완성됩니다.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid lg:grid-cols-12 gap-3">

              {/* Feature 1: Nature */}
              <div className={`lg:col-span-7 group relative min-h-[420px] lg:min-h-[560px] overflow-hidden transition-all duration-700 delay-100 ${features.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <Image src="/images/premium-lakeview.jpg" alt="자연중심" fill className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]" sizes="(max-width: 1024px) 100vw, 58vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gold text-[28px] font-extralight text-shadow-subtle">01</span>
                    <div className="w-8 h-[1px] bg-gold/40" />
                    <span className="text-gold/70 text-[10px] tracking-[4px] uppercase font-medium">Nature</span>
                  </div>
                  <h3 className="text-white text-[26px] lg:text-[34px] font-extralight tracking-tight mb-3 text-shadow-hero">호수공원 도보 1분</h3>
                  <p className="text-white/60 text-[13px] font-light max-w-[420px] leading-[1.8] text-shadow-subtle">
                    호수공원 바로 앞! 탁 트인 호수 조망과 사계절 수변 산책로가 일상의 쉼터가 됩니다.
                  </p>
                </div>
              </div>

              {/* Right column: stacked 2 & 3 */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                {[
                  { img: "/images/premium-highway.jpg", num: "02", tag: "Transport", title: "멀티 교통망", desc: "번영로, 삼성대로, 1호선 부성역 인접" },
                  { img: "/images/premium-infra.jpg", num: "03", tag: "Living", title: "풍부한 생활 인프라", desc: "이마트, 코스트코 등 대형마트 인접" },
                ].map((f, i) => (
                  <div
                    key={i}
                    className={`group relative min-h-[200px] lg:min-h-0 lg:flex-1 overflow-hidden transition-all duration-700 ${features.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${250 + i * 150}ms` }}
                  >
                    <Image src={f.img} alt={f.title} fill className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]" sizes="(max-width: 1024px) 100vw, 42vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gold text-[20px] font-extralight text-shadow-subtle">{f.num}</span>
                        <div className="w-5 h-[1px] bg-gold/30" />
                        <span className="text-gold/60 text-[9px] tracking-[3px] uppercase">{f.tag}</span>
                      </div>
                      <h3 className="text-white text-[20px] lg:text-[22px] font-extralight tracking-tight mb-1 text-shadow-hero">{f.title}</h3>
                      <p className="text-white/55 text-[12px] font-light text-shadow-subtle">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 4: Education */}
            <div className={`mt-3 group relative h-[280px] lg:h-[320px] overflow-hidden transition-all duration-700 delay-[500ms] ${features.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <Image src="/images/premium-school.jpg" alt="교육중심" fill className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center p-8 lg:p-14">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gold text-[28px] font-extralight text-shadow-subtle">04</span>
                    <div className="w-8 h-[1px] bg-gold/40" />
                    <span className="text-gold/70 text-[10px] tracking-[4px] uppercase font-medium">Education</span>
                  </div>
                  <h3 className="text-white text-[26px] lg:text-[34px] font-extralight tracking-tight mb-3 text-shadow-hero">우수한 교육 환경</h3>
                  <p className="text-white/55 text-[13px] font-light max-w-[420px] leading-[1.8] text-shadow-subtle">
                    천안업성초·중학교 인접, 도보 통학권. 공주대·단국대 등 대학 인프라도 풍부합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features → Stats transition */}
        <div className="h-16 lg:h-20 bg-gradient-to-b from-[#F8F7F4] to-white" />

        {/* STATS STRIP */}
        <div ref={stats.ref} className="bg-white">
          <div className={`max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${stats.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              { value: "1,908", unit: "세대", desc: "대단지 프리미엄" },
              { value: "39", unit: "층", desc: "최고층 랜드마크" },
              { value: "11", unit: "개동", desc: "대규모 단지" },
              { value: "1,460", unit: "세대", desc: "금회 공급" },
            ].map((s, i) => (
              <div key={i} className={`py-14 lg:py-20 text-center ${i < 3 ? "border-r border-gray-100" : ""}`}>
                <p className="text-navy text-[32px] lg:text-[38px] font-extralight tracking-tight leading-none">
                  {s.value}<span className="text-gold text-[16px] ml-1 font-light">{s.unit}</span>
                </p>
                <p className="text-cool-gray/50 text-[11px] tracking-wider mt-3 font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats → CTA transition */}
        <div className="relative h-24 lg:h-32 overflow-hidden">
          <Image src="/images/lake-view.jpg" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-navy/60 to-navy/85" />
        </div>

        {/* CTA */}
        <div ref={cta.ref} className="relative py-28 lg:py-36 overflow-hidden">
          <Image src="/images/lake-view.jpg" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-navy/85" />
          <div className={`relative z-10 max-w-[600px] mx-auto px-6 text-center transition-all duration-700 ${cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <ContactCTA
              variant="image"
              heading="분양문의"
              subheading={`${SITE.projectName}에 대해\n자세한 상담을 받아보세요.`}
            />
            <p className="text-white/15 text-[10px] mt-12 tracking-[3px] uppercase">시공 · {SITE.builder}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
