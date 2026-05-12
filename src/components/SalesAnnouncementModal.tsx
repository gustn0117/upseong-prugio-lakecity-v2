"use client";

import { useEffect, useState } from "react";
import { displayPhone, hasPhone, telHref } from "@/lib/site";

const STORAGE_KEY = "sales_announcement_dismissed_until";

/**
 * 메인 페이지 진입 시 노출되는 분양 안내 팝업.
 * "오늘 하루 열지 않기" 체크 시 24시간 동안 다시 표시되지 않음.
 */
export default function SalesAnnouncementModal() {
  const [open, setOpen] = useState(false);
  const [hideToday, setHideToday] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissedUntil = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (Date.now() < dismissedUntil) return;
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    if (hideToday) {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
    }
    setOpen(false);
  };

  if (!open) return null;

  const points = [
    { n: "01", text: "1차 계약금 1천만원" },
    { n: "02", text: "입주 시까지 계약금 5%" },
    { n: "03", text: "중도금 이자 후불제" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-[contentFadeIn_300ms_ease-out]">
      {/* Backdrop — 옅게 */}
      <button onClick={close} aria-label="팝업 닫기" className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" />

      {/* Modal — 컴팩트 */}
      <div className="relative w-full max-w-[360px] bg-paper shadow-2xl border border-ink/10">

        {/* Close × */}
        <button onClick={close} aria-label="닫기" className="absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center text-stone hover:text-ink transition-colors">
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header — rust 톤 배경 */}
        <div className="bg-rust text-paper px-6 pt-7 pb-6 text-center">
          <p className="text-[10px] tracking-[3px] uppercase text-paper/75 mb-2">업성 푸르지오 레이크시티</p>
          <h2 className="text-[20px] lg:text-[22px] leading-[1.3] tracking-tight" style={{ fontWeight: 600 }}>
            무순위 선착순<br />계약 체결 안내
          </h2>
          <p className="text-paper/80 text-[11.5px] mt-3 tracking-wide">천안 성성호수공원뷰 · 39층 랜드마크</p>
        </div>

        <div className="px-6 pt-5 pb-2">
          {/* POINT 3 checks */}
          <div className="border border-ink/10 divide-y divide-ink/[0.08] mb-4">
            {points.map((p) => (
              <div key={p.n} className="flex items-center gap-3 px-4 py-3">
                <span className="text-rust text-[11px] tabular-nums tracking-wider">{p.n}</span>
                <span className="text-ink text-[13.5px] tracking-tight" style={{ fontWeight: 500 }}>{p.text}</span>
              </div>
            ))}
          </div>

          {/* 계약 기간 */}
          <div className="bg-paper-deep border border-ink/10 mb-3">
            <div className="text-center text-[11px] py-1.5 border-b border-ink/10 text-stone tracking-wider">계약 기간</div>
            <p className="text-ink text-[16px] tabular-nums tracking-tight text-center py-3" style={{ fontWeight: 500 }}>26.05.11(월) ~</p>
          </div>

          {/* 계약 체결 문의 — 클릭 시 바로 전화 */}
          <div className="bg-paper-deep border border-ink/10 mb-4">
            <div className="text-center text-[11px] py-1.5 border-b border-ink/10 text-stone tracking-wider">계약 체결 문의</div>
            {hasPhone ? (
              <a href={telHref} className="block text-ink text-[20px] lg:text-[22px] tabular-nums tracking-tight text-center py-3 hover:text-rust transition-colors" style={{ fontWeight: 600 }}>
                {displayPhone}
              </a>
            ) : (
              <p className="text-ink text-[18px] tracking-tight text-center py-3" style={{ fontWeight: 600 }}>추후공지</p>
            )}
          </div>

          <p className="text-stone text-[11px] leading-[1.7] text-center mb-4">
            ※ 계약금 납부는 금융거래의 투명성을 위하여 온라인 수납만을<br />
            인정하며, 견본주택에서 일체의 현금/수표수납은 불가합니다.
          </p>

          {/* CTA — 클릭 시 바로 전화 */}
          <a
            href={hasPhone ? telHref : "#"}
            className="block w-full bg-ink text-paper text-center py-3.5 text-[13px] tracking-wider hover:bg-rust transition-colors"
          >
            계약 및 상품문의 바로가기 <span className="ml-1">›</span>
          </a>
        </div>

        {/* Bottom */}
        <div className="border-t border-ink/[0.08] px-6 py-3 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={hideToday} onChange={(e) => setHideToday(e.target.checked)} className="w-3.5 h-3.5 accent-rust" />
            <span className="text-stone text-[12px]">오늘 하루 열지 않기</span>
          </label>
          <button onClick={close} className="text-stone text-[12px] tracking-wider hover:text-ink transition-colors">닫기</button>
        </div>
      </div>
    </div>
  );
}
