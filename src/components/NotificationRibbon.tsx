"use client";

import { SITE } from "@/lib/site";

/**
 * 상단 공지 리본 — 헤더 위 슬림 안내 바.
 * 미니멀: 단일 라인, 장식 없음.
 */
export default function NotificationRibbon() {
  return (
    <div className="bg-ink/95 text-paper/85 border-b border-paper/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 h-9 flex items-center justify-between gap-4">
        <p className="text-[11.5px] sm:text-[12px] truncate font-light tracking-wide">
          현재 {SITE.currentPhase} 단계 — 정확한 분양 일정 및 가격은 입주자 모집공고를 통해 정식 안내됩니다.
        </p>
        <p className="hidden md:block text-[11px] tabular-nums text-paper/40 tracking-wider flex-shrink-0">
          UPDATED · {SITE.lastUpdated}
        </p>
      </div>
    </div>
  );
}
