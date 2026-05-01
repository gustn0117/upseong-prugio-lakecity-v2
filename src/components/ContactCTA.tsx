"use client";

import { displayPhone, hasPhone, telHref } from "@/lib/site";

interface ContactCTAProps {
  heading?: string;
  subheading?: React.ReactNode;
  variant?: "navy" | "image" | "gold" | "slab";
  secondaryCta?: { label: string; onClick: () => void };
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
  secondaryCta,
}: ContactCTAProps) {
  // ── New editorial "slab" — horizontal layout for dark backgrounds ──
  if (variant === "slab") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
        <div className="lg:col-span-7">
          <p className="text-mono text-[11px] tabular-nums text-rust tracking-[3px] mb-4">N°06 — CONTACT</p>
          <h3 className="font-display text-paper text-[36px] lg:text-[60px] leading-[1.05] tracking-tight" style={{ fontWeight: 400 }}>
            {heading}
            <br />
            <span className="italic text-rust">언제든지.</span>
          </h3>
          {subheading && (
            <p className="text-paper/55 text-[13.5px] lg:text-[14px] font-light leading-[1.9] whitespace-pre-line mt-6 max-w-[540px]">
              {subheading}
            </p>
          )}
        </div>

        <div className="lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-12 space-y-7">
          <div>
            <p className="text-mono text-[10px] tabular-nums text-paper/40 tracking-[3px] uppercase mb-3">분양문의 대표번호</p>
            {hasPhone ? (
              <a
                href={telHref}
                className="font-display text-paper text-[40px] lg:text-[56px] tabular-nums leading-none hover:text-rust transition-colors"
                style={{ fontWeight: 400 }}
              >
                {displayPhone}
              </a>
            ) : (
              <>
                <p className="font-display text-paper text-[40px] lg:text-[56px] leading-none" style={{ fontWeight: 400 }}>추후공지</p>
                <p className="text-paper/40 text-[12px] mt-3 leading-relaxed">
                  대표번호는 정식 분양 시 안내됩니다.
                </p>
              </>
            )}
          </div>

          {secondaryCta && (
            <button
              onClick={secondaryCta.onClick}
              className="w-full inline-flex items-center justify-between gap-3 px-5 py-4 bg-paper text-ink hover:bg-rust hover:text-paper transition-colors"
            >
              <span className="text-[13px] tracking-[2px] uppercase">{secondaryCta.label}</span>
              <span className="text-[14px]">→</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const isImage = variant === "image";
  const isGold = variant === "gold";

  const buttonClass = isGold
    ? "inline-block px-12 py-4 bg-rust text-paper text-[15px] font-semibold tracking-widest hover:bg-rust-deep transition-all duration-300"
    : isImage
      ? "inline-block px-16 py-5 border border-rust/40 text-paper text-[20px] font-extralight tracking-[6px] hover:bg-rust/10 hover:border-rust/70 transition-all duration-300 text-shadow-subtle"
      : "inline-block px-12 py-4 bg-paper text-ink text-[15px] font-semibold tracking-widest hover:bg-rust hover:text-paper transition-all duration-300";

  const labelClass = isImage
    ? "text-rust/60 text-[10px] tracking-[5px] uppercase mb-6"
    : "text-paper/30 text-[10px] tracking-[5px] uppercase mb-4";

  const headingClass = isImage
    ? "font-display text-paper text-[32px] lg:text-[46px] tracking-tight mb-3 text-shadow-hero"
    : "font-display text-paper text-[28px] lg:text-[34px] tracking-tight mb-6";

  return (
    <>
      <p className={labelClass}>Contact</p>
      <h3 className={headingClass} style={{ fontWeight: 400 }}>{heading}</h3>
      {isImage && <div className="w-10 h-[1px] bg-rust/40 mx-auto mb-8" />}
      {subheading && (
        <p className={`text-paper/45 text-[13px] font-light leading-[1.9] whitespace-pre-line ${isImage ? "mb-14 text-shadow-subtle" : "mb-8"}`}>
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
          <p className="text-paper/40 text-[11.5px] tracking-[2px] font-light">
            대표번호는 정식 분양 시 안내됩니다. 관심고객 등록 시 가장 먼저 연락드립니다.
          </p>
        </div>
      )}
    </>
  );
}
