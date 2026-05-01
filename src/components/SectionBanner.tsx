"use client";

import Image from "next/image";

interface SectionBannerProps {
  title: string;
  subtitle: string;
  fallbackGradient: string;
  bgImage?: string;
}

export default function SectionBanner({
  title,
  subtitle,
  fallbackGradient,
  bgImage,
}: SectionBannerProps) {
  return (
    <div className={`relative h-[320px] lg:h-[380px] overflow-hidden flex items-center justify-center ${!bgImage ? fallbackGradient : ""}`}>
      {/* Background Image */}
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Stronger multi-layer overlay */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Label */}
        <p className="text-gold text-[11px] font-medium tracking-[4px] uppercase mb-5 opacity-80 text-shadow-subtle">
          PRUGIO LAKECITY
        </p>
        {/* Title */}
        <h2 className="text-white text-[28px] lg:text-[40px] font-extralight tracking-[8px] lg:tracking-[12px] text-shadow-banner">
          {title}
        </h2>
        {/* Line */}
        <div className="w-10 h-[1px] bg-gold/50 mx-auto mt-6 mb-5" />
        {/* Subtitle */}
        <p className="text-white/65 text-[13px] tracking-wider font-light text-shadow-subtle">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
