"use client";

interface PrugioLogoProps {
  white?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  showSub?: boolean;
  className?: string;
}

const sizeMap = {
  sm: {
    main: "text-[15px]",
    sub: "text-[10px]",
    subKr: "text-[9px]",
    gap: "ml-2",
    divider: "mx-1.5 h-[10px]",
    tracking: "tracking-[5px]",
  },
  md: {
    main: "text-[20px]",
    sub: "text-[11px]",
    subKr: "text-[10px]",
    gap: "ml-2.5",
    divider: "mx-2 h-[12px]",
    tracking: "tracking-[6px]",
  },
  lg: {
    main: "text-[28px]",
    sub: "text-[12px]",
    subKr: "text-[11px]",
    gap: "ml-3",
    divider: "mx-2.5 h-[14px]",
    tracking: "tracking-[7px]",
  },
  xl: {
    main: "text-[40px] lg:text-[48px]",
    sub: "text-[13px] lg:text-[14px]",
    subKr: "text-[12px] lg:text-[13px]",
    gap: "ml-4",
    divider: "mx-3 h-[16px]",
    tracking: "tracking-[8px]",
  },
};

export default function PrugioLogo({
  white = false,
  size = "md",
  showSub = true,
  className = "",
}: PrugioLogoProps) {
  const s = sizeMap[size];
  const mainColor = white ? "text-white" : "text-navy";
  const dividerColor = white ? "bg-white/25" : "bg-gold/50";
  const subColor = white ? "text-white/70" : "text-navy/70";

  return (
    <div className={`flex items-center ${className}`}>
      <span
        className={`${s.main} font-extralight ${s.tracking} ${mainColor} leading-none`}
      >
        PRUGIO
      </span>
      {showSub && (
        <>
          <span className={`${s.divider} w-[1px] ${dividerColor} ${s.gap}`} />
          <span className={`${s.gap} flex flex-col`}>
            <span className={`${s.sub} ${subColor} tracking-[3px] font-light leading-none`}>
              LAKECITY
            </span>
            <span className={`${s.subKr} ${white ? "text-white/40" : "text-cool-gray/60"} tracking-[1px] font-light leading-none mt-[2px]`}>
              레이크시티
            </span>
          </span>
        </>
      )}
    </div>
  );
}
