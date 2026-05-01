"use client";

import { displayPhone, hasPhone, telHref } from "@/lib/site";

interface ContactCTAProps {
  /** CTA 위 작은 안내 문구 */
  heading?: string;
  /** 추가 안내 문구 (heading 아래) — 줄바꿈은 \n 으로 작성 가능 */
  subheading?: React.ReactNode;
  /** 컨테이너 배경 / 여백 등 외부에서 제어 */
  variant?: "navy" | "image" | "gold";
}

/**
 * 분양문의 CTA — 전화번호 등록 여부에 따라 표시 방식이 달라짐.
 *
 * - 전화번호가 등록된 경우: 클릭 가능한 tel: 링크 버튼
 * - 미등록인 경우: "분양문의 추후공지" 안내 + 관심고객등록 유도 (정적 박스)
 */
export default function ContactCTA({
  heading = "분양문의",
  subheading,
  variant = "navy",
}: ContactCTAProps) {
  const isImage = variant === "image";
  const isGold = variant === "gold";

  const buttonClass = isGold
    ? "inline-block px-12 py-4 bg-gold text-white text-[15px] font-semibold tracking-widest hover:bg-gold-light transition-all duration-300"
    : isImage
      ? "inline-block px-16 py-5 border border-gold/30 text-white text-[20px] font-extralight tracking-[6px] hover:bg-gold/10 hover:border-gold/50 transition-all duration-300 text-shadow-subtle"
      : "inline-block px-12 py-4 bg-white text-navy text-[15px] font-semibold tracking-widest hover:bg-off-white transition-all duration-300";

  const labelClass = isImage
    ? "text-gold/50 text-[10px] tracking-[5px] uppercase mb-6"
    : "text-white/20 text-[10px] tracking-[5px] uppercase mb-4";

  const headingClass = isImage
    ? "text-white text-[32px] lg:text-[46px] font-extralight tracking-tight mb-3 text-shadow-hero"
    : "text-white text-[24px] font-extralight tracking-tight mb-6";

  return (
    <>
      <p className={labelClass}>Contact</p>
      <h3 className={headingClass}>{heading}</h3>
      {isImage && <div className="w-10 h-[1px] bg-gold/30 mx-auto mb-8" />}
      {subheading && (
        <p className={`text-white/45 text-[13px] font-light leading-[1.9] whitespace-pre-line ${isImage ? "mb-14 text-shadow-subtle" : "mb-8"}`}>
          {subheading}
        </p>
      )}

      {hasPhone ? (
        <a href={telHref} className={buttonClass}>
          {displayPhone}
        </a>
      ) : (
        <div className="inline-flex flex-col items-center gap-3">
          <span className={`${buttonClass} cursor-default opacity-80 pointer-events-none`}>
            추후공지
          </span>
          <p className="text-white/40 text-[11.5px] tracking-[2px] font-light">
            대표번호는 정식 분양 시 안내됩니다. 관심고객 등록 시 가장 먼저 연락드립니다.
          </p>
        </div>
      )}
    </>
  );
}
