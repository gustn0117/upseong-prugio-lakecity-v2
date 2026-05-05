"use client";

import { useState, useEffect } from "react";
import { displayPhone, hasPhone, telHref } from "@/lib/site";

interface MenuItem {
  id: string;
  label: string;
  num: string;
}

const menuItems: MenuItem[] = [
  { id: "home", label: "Home", num: "00" },
  { id: "business", label: "사업개요", num: "01" },
  { id: "location", label: "입지환경", num: "02" },
  { id: "premium", label: "프리미엄", num: "03" },
  { id: "complex", label: "단지안내", num: "04" },
  { id: "unit", label: "세대안내", num: "05" },
  { id: "press", label: "홍보센터", num: "06" },
  { id: "register", label: "관심고객등록", num: "07" },
];

interface HeaderProps {
  activeTab: string;
  onTabChange: (tabId: string, subTabId?: string) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [activeTab]);

  const isHome = activeTab === "home";
  const onDark = isHome && !scrolled;

  const topNavItems = menuItems.filter((m) => m.id !== "home" && m.id !== "register");

  return (
    <>
      {/* ============ TOP BAR (rendered inside fixed wrapper from page.tsx) ============ */}
      <header
        className={`relative transition-all duration-500 ${
          onDark ? "bg-transparent" : "bg-paper/90 backdrop-blur-md border-b border-ink/[0.08]"
        }`}
      >
        <div className="relative px-5 lg:px-8">
          <div className="flex items-center justify-between h-[56px]">
            {/* Logo wordmark */}
            <button
              onClick={() => { setMobileOpen(false); onTabChange("home"); }}
              className="flex items-baseline gap-2.5 cursor-pointer flex-shrink-0"
            >
              <span className={`text-[16px] tracking-[-0.01em] font-semibold ${onDark ? "text-paper" : "text-ink"}`}>
                업성 푸르지오
              </span>
              <span className={`text-[11px] tracking-[2px] font-light ${onDark ? "text-paper/55" : "text-stone"}`}>
                레이크시티
              </span>
            </button>

            {/* Center nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-9">
              {topNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className="relative py-1"
                  >
                    <span className={`text-[13px] tracking-[1px] transition-colors ${
                      isActive
                        ? onDark ? "text-paper" : "text-ink"
                        : onDark ? "text-paper/55 hover:text-paper" : "text-stone hover:text-ink"
                    }`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-px left-0 right-0 h-px bg-rust" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-3">
              {hasPhone ? (
                <a
                  href={telHref}
                  className={`hidden md:inline-flex text-[12.5px] tabular-nums tracking-wider transition-colors ${
                    onDark ? "text-paper/70 hover:text-paper" : "text-stone hover:text-ink"
                  }`}
                >
                  {displayPhone}
                </a>
              ) : null}
              <button
                onClick={() => onTabChange("register")}
                className={`hidden lg:inline-flex items-center px-4 py-2 text-[12px] tracking-[1px] transition-all ${
                  onDark
                    ? "border border-paper/30 text-paper hover:bg-paper hover:text-ink"
                    : "bg-ink text-paper hover:bg-stone"
                }`}
              >
                관심고객등록
              </button>
              {/* Mobile hamburger */}
              <button
                className={`lg:hidden p-1.5 ${onDark ? "text-paper" : "text-ink"}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="메뉴"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M4 7h16M4 17h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ============ MOBILE SECONDARY NAV (always visible) ============ */}
        <nav className={`lg:hidden border-t ${onDark ? "border-paper/20 bg-ink/60 backdrop-blur-md" : "border-ink/[0.08] bg-paper/95 backdrop-blur-sm"}`}>
          <div className="flex items-center gap-6 overflow-x-auto px-5 h-11 no-scrollbar">
            {menuItems.filter((m) => m.id !== "home").map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative whitespace-nowrap text-[13.5px] tracking-tight py-2 transition-colors ${
                    isActive
                      ? onDark ? "text-paper font-medium" : "text-ink font-medium"
                      : onDark ? "text-paper/70 hover:text-paper" : "text-stone hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-px left-0 right-0 h-[1.5px] bg-rust" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* ============ LEFT MINIMAL DOT RAIL (desktop) ============ */}
      <aside className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 px-4 pointer-events-none">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="group relative flex items-center pointer-events-auto py-1"
              aria-label={item.label}
            >
              <span
                className={`block w-[5px] h-[5px] rounded-full transition-all ${
                  isActive
                    ? "bg-rust scale-[1.6]"
                    : onDark ? "bg-paper/25 group-hover:bg-paper/55" : "bg-ink/15 group-hover:bg-ink/40"
                }`}
              />
              <span className={`absolute left-5 whitespace-nowrap text-[11px] tracking-wide opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                onDark ? "text-paper/80" : "text-ink/80"
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </aside>

      {/* ============ MOBILE PANEL ============ */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-ink/40"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-[320px] max-w-[85vw] h-full bg-paper shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-7 pt-7 pb-6 flex items-center justify-between border-b border-ink/10">
            <span className="text-[16px] text-ink" style={{ fontWeight: 600 }}>업성 푸르지오</span>
            <button onClick={() => setMobileOpen(false)} className="p-1 text-ink">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="px-7 py-6">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); setMobileOpen(false); }}
                  className={`w-full flex items-center justify-between py-4 border-b border-ink/[0.06] text-left ${
                    isActive ? "text-ink" : "text-stone"
                  }`}
                >
                  <span className={`text-[15px] tracking-tight ${isActive ? "font-medium" : "font-light"}`}>
                    {item.label}
                  </span>
                  {isActive && <span className="text-rust text-xs">●</span>}
                </button>
              );
            })}
          </nav>

          <div className="px-7 mt-4 space-y-2">
            <p className="text-[10px] tracking-[3px] uppercase text-stone-light">분양문의</p>
            {hasPhone ? (
              <a href={telHref} className="text-[20px] tabular-nums text-ink tracking-tight" style={{ fontWeight: 400 }}>{displayPhone}</a>
            ) : (
              <p className="text-[15px] text-stone font-light">추후공지</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
