"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sales_announcement_dismissed_until";
const PHONE = "1522-7347";
const PHONE_HREF = "tel:1522-7347";

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
    // small delay so it appears after hero loads
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    if (hideToday) {
      const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(tomorrow));
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-[contentFadeIn_300ms_ease-out]">
      {/* Backdrop */}
      <button
        onClick={close}
        aria-label="팝업 닫기"
        className="absolute inset-0 bg-ink/65 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[420px] bg-paper shadow-2xl border border-ink/10">

        {/* Close × */}
        <button
          onClick={close}
          aria-label="닫기"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-stone hover:text-ink transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-7 lg:px-8 pt-10 pb-2">
          <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-2.5 text-center">
            업성 푸르지오 레이크시티
          </p>
          <h2 className="text-ink text-[24px] lg:text-[26px] leading-[1.25] tracking-tight text-center mb-7" style={{ fontWeight: 600 }}>
            무순위 선착순<br />계약 체결 안내
          </h2>

          {/* 계약기간 */}
          <div className="bg-paper-deep border border-ink/10 mb-3">
            <div className="text-center text-[12px] py-2 border-b border-ink/10 text-stone tracking-wider">
              계약 기간
            </div>
            <p className="text-ink text-[18px] lg:text-[20px] tabular-nums tracking-tight text-center py-4" style={{ fontWeight: 500 }}>
              26.05.11(월) ~
            </p>
          </div>

          {/* 계약 체결 문의 */}
          <div className="bg-paper-deep border border-ink/10 mb-5">
            <div className="text-center text-[12px] py-2 border-b border-ink/10 text-stone tracking-wider">
              계약 체결 문의
            </div>
            <a
              href={PHONE_HREF}
              className="block text-ink text-[22px] lg:text-[26px] tabular-nums tracking-tight text-center py-4 hover:text-rust transition-colors"
              style={{ fontWeight: 500 }}
            >
              {PHONE}
            </a>
          </div>

          <p className="text-stone text-[11.5px] leading-[1.7] text-center mb-5">
            ※ 계약금 납부는 금융거래의 투명성을 위하여
            <br />온라인 수납만을 인정하며, 견본주택에서 일체의
            <br />현금/수표수납은 불가하므로 이점 유의하시기 바랍니다.
          </p>

          {/* CTA */}
          <a
            href={PHONE_HREF}
            className="block w-full bg-ink text-paper text-center py-3.5 text-[13px] tracking-wider hover:bg-rust transition-colors"
          >
            계약 및 상품문의 바로가기 <span className="ml-1">›</span>
          </a>
        </div>

        {/* Bottom — hide today */}
        <div className="border-t border-ink/[0.08] px-7 py-3 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hideToday}
              onChange={(e) => setHideToday(e.target.checked)}
              className="w-3.5 h-3.5 accent-rust"
            />
            <span className="text-stone text-[12px]">오늘 하루 열지 않기</span>
          </label>
          <button
            onClick={close}
            className="text-stone text-[12px] tracking-wider hover:text-ink transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
