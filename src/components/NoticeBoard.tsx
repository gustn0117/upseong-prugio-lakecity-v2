"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * 공지사항 보드 — 정렬된 공식 안내 리스트 형식.
 * 행정 사이트 / 분양 공식 홈페이지 톤을 의도한 표 형태.
 */
export default function NoticeBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-paper">
      <div className={`max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-24 lg:py-32 grid grid-cols-12 gap-10 lg:gap-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

        <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32 self-start">
          <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-3">N°06 — NOTICES</p>
          <h2 className="font-display text-ink text-[36px] lg:text-[48px] leading-[1.05] tracking-tight" style={{ fontWeight: 400 }}>
            공지사항
          </h2>
          <p className="text-stone text-[13px] font-light leading-[1.9] mt-6 max-w-[320px]">
            본 사이트의 공식 안내사항입니다. 정식 분양 정보는 입주자 모집공고와 청약Home을 통해 확인해 주시기 바랍니다.
          </p>

          <a
            href={SITE.links.cheongyakHome}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-[12px] tracking-[2px] uppercase text-stone hover:text-ink transition-colors border-b border-stone/30 hover:border-ink pb-1"
          >
            청약Home 바로가기
            <span className="text-rust">↗</span>
          </a>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="border-t-2 border-ink">
            {SITE.notices.map((notice, i) => (
                <article
                  key={i}
                  className="grid grid-cols-12 gap-3 lg:gap-6 items-start py-7 border-b border-ink/10 group cursor-default"
                >
                  <div className="col-span-2 lg:col-span-1">
                    <p className="text-mono text-[10px] tabular-nums text-stone-light">No.{String(SITE.notices.length - i).padStart(2, "0")}</p>
                  </div>

                  <div className="col-span-10 lg:col-span-2 flex items-center gap-2">
                    <span className="inline-flex text-mono text-[10px] tabular-nums text-rust border border-rust/40 px-1.5 py-px tracking-[2px] uppercase">
                      {notice.tag}
                    </span>
                  </div>

                  <div className="col-span-12 lg:col-span-7">
                    <h3 className="text-ink text-[15px] lg:text-[16px] font-medium tracking-tight mb-2 group-hover:text-rust transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-stone text-[13px] font-light leading-[1.9]">
                      {notice.body}
                    </p>
                  </div>

                  <div className="col-span-12 lg:col-span-2 lg:text-right">
                    <p className="text-mono text-[11px] tabular-nums text-stone tracking-wider">{notice.date}</p>
                  </div>
                </article>
            ))}
          </div>

          <p className="text-mono text-[10px] tabular-nums text-stone-light mt-6 tracking-[2px] uppercase">
            — Last updated {SITE.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
}
