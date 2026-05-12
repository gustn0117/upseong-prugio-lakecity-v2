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
      <div className="relative w-full max-w-[300px] bg-paper shadow-2xl border border-ink/10">

        {/* Close × */}
        <button onClick={close} aria-label="닫기" className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center text-stone hover:text-ink transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header — rust 톤 배경 */}
        <div className="bg-rust text-paper px-5 pt-5 pb-4 text-center">
          <p className="text-[9px] tracking-[3px] uppercase text-paper/75 mb-1.5">업성 푸르지오 레이크시티</p>
          <h2 className="text-[17px] leading-[1.3] tracking-tight" style={{ fontWeight: 600 }}>
            무순위 선착순<br />계약 체결 안내
          </h2>
          <p className="text-paper/80 text-[10.5px] mt-2 tracking-wide">천안 성성호수공원뷰 · 39층 랜드마크</p>
        </div>

        <div className="px-5 pt-4 pb-1.5">
          {/* POINT 3 checks */}
          <div className="border border-ink/10 divide-y divide-ink/[0.08] mb-3">
            {points.map((p) => (
              <div key={p.n} className="flex items-center gap-2.5 px-3 py-2">
                <span className="text-rust text-[10px] tabular-nums tracking-wider">{p.n}</span>
                <span className="text-ink text-[12px] tracking-tight" style={{ fontWeight: 500 }}>{p.text}</span>
              </div>
            ))}
          </div>

          {/* 계약 기간 */}
          <div className="bg-paper-deep border border-ink/10 mb-2.5">
            <div className="text-center text-[10px] py-1 border-b border-ink/10 text-stone tracking-wider">계약 기간</div>
            <p className="text-ink text-[14px] tabular-nums tracking-tight text-center py-2" style={{ fontWeight: 500 }}>26.05.11(월) ~</p>
          </div>

          {/* 계약 체결 문의 — 클릭 시 바로 전화 */}
          <div className="bg-paper-deep border border-ink/10 mb-3">
            <div className="text-center text-[10px] py-1 border-b border-ink/10 text-stone tracking-wider">계약 체결 문의</div>
            {hasPhone ? (
              <a href={telHref} className="block text-ink text-[18px] tabular-nums tracking-tight text-center py-2 hover:text-rust transition-colors" style={{ fontWeight: 600 }}>
                {displayPhone}
              </a>
            ) : (
              <p className="text-ink text-[16px] tracking-tight text-center py-2" style={{ fontWeight: 600 }}>추후공지</p>
            )}
          </div>

          <p className="text-stone text-[10px] leading-[1.6] text-center mb-3">
            ※ 계약금 납부는 금융거래의 투명성을 위하여 온라인 수납만을 인정하며, 견본주택에서 현금/수표수납은 불가합니다.
          </p>

          {/* CTA — 클릭 시 바로 전화 */}
          <a
            href={hasPhone ? telHref : "#"}
            className="block w-full bg-ink text-paper text-center py-3 text-[12px] tracking-wider hover:bg-rust transition-colors"
          >
            계약 및 상품문의 바로가기 <span className="ml-1">›</span>
          </a>
        </div>

        {/* Bottom */}
        <div className="border-t border-ink/[0.08] px-5 py-2.5 flex items-center justify-between">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={hideToday} onChange={(e) => setHideToday(e.target.checked)} className="w-3 h-3 accent-rust" />
            <span className="text-stone text-[11px]">오늘 하루 열지 않기</span>
          </label>
          <button onClick={close} className="text-stone text-[11px] tracking-wider hover:text-ink transition-colors">닫기</button>
        </div>
      </div>
    </div>
  );
}
