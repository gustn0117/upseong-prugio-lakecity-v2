"use client";

import { displayPhone, hasPhone, telHref } from "@/lib/site";

interface ContactCTAProps {
  heading?: string;
  subheading?: React.ReactNode;
  variant?: "navy" | "image" | "gold" | "slab";
  secondaryCta?: { label: string; onClick: () => void };
}

/**
 * 분양문의 CTA — 미니멀 + 정보형. 매거진 톤 제거.
 */
export default function ContactCTA({
  heading = "분양문의",
  subheading,
  variant = "navy",
  secondaryCta,
}: ContactCTAProps) {

  if (variant === "slab") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
        <div className="lg:col-span-7">
          <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-4">Contact</p>
          <h3 className="text-paper text-[28px] lg:text-[40px] leading-[1.2] tracking-tight" style={{ fontWeight: 300 }}>
            {heading}
          </h3>
          {subheading && (
            <p className="text-paper/60 text-[13.5px] lg:text-[14px] font-light leading-[1.95] whitespace-pre-line mt-5 max-w-[540px]">
              {subheading}
            </p>
          )}
        </div>

        <div className="lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-12 space-y-6">
          <div>
            <p className="text-[10.5px] tracking-[3px] uppercase text-paper/40 mb-3">분양문의 대표번호</p>
            {hasPhone ? (
              <a
                href={telHref}
                className="text-paper text-[32px] lg:text-[44px] tabular-nums leading-none tracking-tight hover:text-rust transition-colors"
                style={{ fontWeight: 300 }}
              >
                {displayPhone}
              </a>
            ) : (
              <>
                <p className="text-paper text-[28px] lg:text-[36px] leading-tight tracking-tight" style={{ fontWeight: 300 }}>
                  추후공지
                </p>
                <p className="text-paper/40 text-[12px] mt-3 leading-relaxed">
                  대표번호는 정식 분양 시 안내됩니다.
                </p>
              </>
            )}
          </div>

          {secondaryCta && (
            <button
              onClick={secondaryCta.onClick}
              className="w-full inline-flex items-center justify-between gap-3 px-5 py-4 bg-paper text-ink hover:bg-stone hover:text-paper transition-colors"
            >
              <span className="text-[13px] tracking-[1.5px]">{secondaryCta.label}</span>
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
    ? "inline-block px-12 py-4 bg-rust text-paper text-[14px] tracking-widest hover:bg-rust-deep transition-colors"
    : isImage
      ? "inline-block px-16 py-5 border border-paper/30 text-paper text-[18px] tracking-[5px] hover:bg-paper hover:text-ink transition-colors"
      : "inline-block px-12 py-4 bg-paper text-ink text-[14px] tracking-widest hover:bg-stone hover:text-paper transition-colors";

  return (
    <>
      <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-4">Contact</p>
      <h3 className="text-paper text-[26px] lg:text-[32px] tracking-tight mb-5" style={{ fontWeight: 300 }}>{heading}</h3>
      {subheading && (
        <p className="text-paper/55 text-[13px] font-light leading-[1.9] whitespace-pre-line mb-8">
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
          <p className="text-paper/40 text-[11.5px] font-light">
            대표번호는 정식 분양 시 안내됩니다.
          </p>
        </div>
      )}
    </>
  );
}
