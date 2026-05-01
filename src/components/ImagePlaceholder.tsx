"use client";

// 플레이스홀더 번호별 필요 이미지 정보
const imageInfo: Record<number, { fileName: string; pixel: string }> = {
  4: { fileName: "business-overview.jpg", pixel: "1200 x 450" },
  6: { fileName: "map-directions.jpg", pixel: "1200 x 500" },
  7: { fileName: "agreement-doc.jpg", pixel: "1200 x 600" },
  8: { fileName: "location-hero.jpg", pixel: "1920 x 800" },
  9: { fileName: "premium-nature.jpg", pixel: "800 x 500" },
  10: { fileName: "premium-life.jpg", pixel: "800 x 500" },
  11: { fileName: "premium-edu.jpg", pixel: "800 x 500" },
  12: { fileName: "premium-transport.jpg", pixel: "800 x 500" },
  23: { fileName: "site-plan.jpg", pixel: "1200 x 600" },
  24: { fileName: "community-01.jpg", pixel: "600 x 300" },
  25: { fileName: "community-02.jpg", pixel: "600 x 300" },
  26: { fileName: "community-03.jpg", pixel: "600 x 300" },
  27: { fileName: "community-04.jpg", pixel: "600 x 300" },
  28: { fileName: "floorplan-59.jpg", pixel: "800 x 600" },
  31: { fileName: "finish-01.jpg", pixel: "600 x 300" },
  32: { fileName: "finish-02.jpg", pixel: "600 x 300" },
  33: { fileName: "finish-03.jpg", pixel: "600 x 300" },
  34: { fileName: "finish-04.jpg", pixel: "600 x 300" },
  35: { fileName: "recruitment-notice.jpg", pixel: "1200 x 700" },
  36: { fileName: "housing-policy.jpg", pixel: "1200 x 600" },
  37: { fileName: "news-01.jpg", pixel: "360 x 240" },
  38: { fileName: "news-02.jpg", pixel: "360 x 240" },
  39: { fileName: "news-03.jpg", pixel: "360 x 240" },
  40: { fileName: "news-04.jpg", pixel: "360 x 240" },
  41: { fileName: "news-05.jpg", pixel: "360 x 240" },
  42: { fileName: "video-thumb-01.jpg", pixel: "600 x 300" },
  43: { fileName: "video-thumb-02.jpg", pixel: "600 x 300" },
};

interface ImagePlaceholderProps {
  number: number;
  gradient?: string;
  height?: string;
  className?: string;
  label?: string;
  dark?: boolean;
}

export default function ImagePlaceholder({
  number,
  gradient = "gradient-hero",
  height = "h-[500px]",
  className = "",
  label,
  dark = false,
}: ImagePlaceholderProps) {
  const info = imageInfo[number];

  return (
    <div
      className={`${gradient} ${height} flex flex-col items-center justify-center gap-2 relative overflow-hidden ${className}`}
    >
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, currentColor 20px, currentColor 21px)`,
      }} />

      {/* 아이콘 */}
      <div
        className={`w-14 h-14 rounded-xl border-2 border-dashed flex items-center justify-center mb-1 ${
          dark
            ? "border-black/15 text-black/30"
            : "border-white/25 text-white/50"
        }`}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* 라벨 */}
      {label && (
        <span
          className={`text-sm font-medium tracking-wide ${
            dark ? "text-black/40" : "text-white/70"
          }`}
        >
          {label}
        </span>
      )}

      {/* 파일 정보 박스 */}
      {info && (
        <div className={`mt-2 rounded-lg px-4 py-2.5 text-center ${
          dark ? "bg-black/5 border border-black/10" : "bg-white/10 border border-white/15"
        }`}>
          <p className={`text-xs font-mono font-semibold tracking-wide ${
            dark ? "text-black/50" : "text-white/80"
          }`}>
            /images/{info.fileName}
          </p>
          <p className={`text-[11px] font-mono mt-0.5 ${
            dark ? "text-black/30" : "text-white/50"
          }`}>
            {info.pixel} px
          </p>
        </div>
      )}
    </div>
  );
}
