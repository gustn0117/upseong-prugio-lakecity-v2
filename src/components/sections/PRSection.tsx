"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import { PRESS } from "@/lib/site";

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

interface PRSectionProps {
  initialSubTab?: string;
}

export default function PRSection({ initialSubTab }: PRSectionProps) {
  const list = useInView();
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab || "news");

  return (
    <section className="pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="relative bg-ink text-paper overflow-hidden">
        <Image src="/images/exterior-balconies.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/55 to-ink/35" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">News</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              홍보센터
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/70 text-[13.5px] font-light leading-[1.95]">
              업성 푸르지오 레이크시티의 최신 소식과 언론보도를 한곳에서 확인하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── SUB NAV ── */}
      <div className="bg-paper border-b border-ink/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 flex items-center gap-8">
          {[
            { id: "news", label: "언론보도" },
            { id: "video", label: "홍보영상" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`relative py-5 text-[12px] tracking-[2px] uppercase transition-colors ${
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
      {activeSubTab === "news" ? (
        <div ref={list.ref} className="bg-paper">
          <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24 transition-all duration-700 ${list.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="border-t border-ink/15">
              {PRESS.map((item, i) => (
                <article
                  key={i}
                  className="grid grid-cols-12 gap-3 sm:gap-6 items-start py-8 sm:py-10 border-b border-ink/[0.08]"
                >
                  <span className="col-span-12 sm:col-span-2 text-[10.5px] tracking-[3px] uppercase text-rust pt-1">
                    {item.outlet}
                  </span>
                  <div className="col-span-12 sm:col-span-10 lg:col-span-9">
                    <h3 className="text-ink text-[16px] lg:text-[19px] tracking-tight leading-[1.45] mb-3" style={{ fontWeight: 500 }}>
                      {item.title}
                    </h3>
                    <p className="text-stone text-[13.5px] font-light leading-[1.95]">
                      {item.excerpt}
                    </p>
                  </div>
                  <span className="hidden lg:block lg:col-span-1 text-stone-light text-[10.5px] tracking-wider text-right tabular-nums pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </article>
              ))}
            </div>

            <p className="text-stone-light text-[11px] mt-8 font-light">
              * 발췌 자료는 공식 홈페이지(prugio-lakecity.com) 언론보도 섹션을 기준으로 정리되었습니다.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-paper">
          <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-32 text-center">
            <p className="text-stone-light text-[12px] tracking-[3px] uppercase mb-3">Coming Soon</p>
            <p className="text-stone text-[14px] font-light">홍보영상은 추후 공개됩니다.</p>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24">
          <ContactCTA variant="slab" heading="분양문의" subheading="언론보도 외 자세한 안내가 필요하신 경우 분양 상담을 통해 확인하실 수 있습니다." />
        </div>
      </div>
    </section>
  );
}
