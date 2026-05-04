"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * 공지사항 보드 — 미니멀 표 형식.
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
    <div ref={ref} className="bg-paper border-b border-ink/[0.08]">
      <div className={`max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-20 lg:py-24 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Notices</p>
            <h2 className="text-ink text-[26px] lg:text-[32px] tracking-tight" style={{ fontWeight: 300 }}>
              공지사항
            </h2>
          </div>
          <a
            href={SITE.links.cheongyakHome}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-[12px] tracking-wide text-stone hover:text-ink transition-colors"
          >
            청약Home <span className="text-rust">↗</span>
          </a>
        </div>

        <div className="border-t border-ink/15">
          {SITE.notices.map((notice, i) => (
            <article
              key={i}
              className="grid grid-cols-12 gap-3 lg:gap-6 items-start py-5 border-b border-ink/[0.08]"
            >
              <span className="col-span-2 sm:col-span-2 text-[11px] tracking-wider text-stone">{notice.tag}</span>
              <div className="col-span-7 sm:col-span-7">
                <h3 className="text-ink text-[14.5px] lg:text-[15px] tracking-tight mb-1.5" style={{ fontWeight: 500 }}>
                  {notice.title}
                </h3>
                <p className="text-stone text-[12.5px] font-light leading-[1.85]">
                  {notice.body}
                </p>
              </div>
              <span className="col-span-3 sm:col-span-3 text-[11.5px] tabular-nums text-stone-light text-right">
                {notice.date}
              </span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
