"use client";

import { SITE } from "@/lib/site";

/**
 * 상단 공지 리본 — 헤더 위에 위치하는 슬림 안내 바.
 * 항상 표시되어 사이트의 공식성과 현재 진행 단계를 나타냅니다.
 */
export default function NotificationRibbon() {
  return (
    <div className="bg-ink text-paper border-b border-paper/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 h-9 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="hidden sm:inline-flex text-mono text-[10px] tabular-nums text-rust tracking-[2px] uppercase border border-rust/40 px-1.5 py-px">
            Notice
          </span>
          <span className="hidden md:inline text-mono text-[10.5px] tabular-nums text-paper/40 tracking-wider">
            UPDATED · {SITE.lastUpdated}
          </span>
          <span className="hidden md:inline text-paper/40">·</span>
          <p className="text-[11.5px] sm:text-[12px] text-paper/85 truncate font-light tracking-wide">
            현재 <span className="text-rust">{SITE.currentPhase}</span> 단계 — 정확한 분양 일정 및 가격은 입주자 모집공고를 통해 정식 안내됩니다.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          <span className="inline-flex w-1.5 h-1.5 rounded-full bg-rust animate-pulse" />
          <span className="text-mono text-[10px] tabular-nums text-paper/50 tracking-[2px] uppercase">
            Live
          </span>
        </div>
      </div>
    </div>
  );
}
