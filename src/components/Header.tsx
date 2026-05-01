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
  { id: "register", label: "관심고객등록", num: "04" },
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
      {/* ============ TOP BAR ============ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          onDark ? "bg-transparent" : "bg-paper/90 backdrop-blur-md border-b border-ink/[0.08]"
        }`}
      >
        <div className="relative px-5 lg:px-8">
          <div className="flex items-center justify-between h-[56px]">
            {/* Logo wordmark */}
            <button
              onClick={() => { setMobileOpen(false); onTabChange("home"); }}
              className="flex items-baseline gap-2 cursor-pointer flex-shrink-0"
            >
              <span className={`font-display text-[20px] tracking-[-0.01em] ${onDark ? "text-paper" : "text-ink"}`} style={{ fontWeight: 500 }}>
                Prugio
              </span>
              <span className={`text-[10px] tracking-[3px] uppercase font-light ${onDark ? "text-paper/50" : "text-stone"}`}>
                Lakecity
              </span>
            </button>

            {/* Center nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {topNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className="group flex items-center gap-2"
                  >
                    <span className={`text-mono text-[10px] tabular-nums ${
                      isActive
                        ? onDark ? "text-rust" : "text-rust"
                        : onDark ? "text-paper/40" : "text-stone-light"
                    }`}>
                      {item.num}
                    </span>
                    <span className={`text-[12.5px] tracking-[1.5px] transition-colors ${
                      isActive
                        ? onDark ? "text-paper font-medium" : "text-ink font-medium"
                        : onDark ? "text-paper/60 hover:text-paper" : "text-stone hover:text-ink"
                    }`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-3">
              {hasPhone ? (
                <a
                  href={telHref}
                  className={`hidden md:inline-flex text-mono text-[12px] tabular-nums tracking-wider transition-colors ${
                    onDark ? "text-paper/70 hover:text-paper" : "text-stone hover:text-ink"
                  }`}
                >
                  {displayPhone}
                </a>
              ) : null}
              <button
                onClick={() => onTabChange("register")}
                className={`hidden lg:inline-flex items-center gap-2 px-4 py-2 text-[12px] tracking-[1.5px] transition-all ${
                  onDark
                    ? "border border-paper/30 text-paper hover:bg-paper hover:text-ink"
                    : "bg-ink text-paper hover:bg-rust"
                }`}
              >
                <span>관심고객등록</span>
                <span className="text-[10px]">→</span>
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

        {/* Section progress bar (4 segments) */}
        <div className={`h-[2px] flex transition-opacity ${scrolled ? "opacity-100" : "opacity-0"}`}>
          {topNavItems.map((item) => (
            <div
              key={item.id}
              className={`flex-1 transition-colors ${
                activeTab === item.id ? "bg-rust" : "bg-ink/10"
              }`}
            />
          ))}
        </div>
      </header>

      {/* ============ LEFT VERTICAL RAIL (desktop) ============ */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 z-40 w-[56px] flex-col items-center justify-between py-6 pointer-events-none">
        {/* Top: vertical brand label */}
        <div className="pointer-events-auto pt-[60px]">
          <div className={`vertical-rl text-[9px] tracking-[5px] uppercase ${onDark ? "text-paper/40" : "text-stone-light"}`}>
            Upseong · 2026
          </div>
        </div>

        {/* Middle: section dots */}
        <div className="pointer-events-auto flex flex-col items-center gap-5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="group relative flex items-center"
                aria-label={item.label}
              >
                <span
                  className={`block w-[6px] h-[6px] rounded-full transition-all ${
                    isActive
                      ? "bg-rust scale-150"
                      : onDark ? "bg-paper/30 group-hover:bg-paper/60" : "bg-ink/20 group-hover:bg-ink/50"
                  }`}
                />
                {/* Floating label on hover */}
                <span className={`absolute left-5 whitespace-nowrap text-[10px] tracking-[2px] uppercase opacity-0 group-hover:opacity-100 transition-opacity ${
                  onDark ? "text-paper/80" : "text-ink/80"
                }`}>
                  {item.num} · {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom: scroll hint */}
        <div className="pointer-events-auto">
          <div className={`vertical-rl text-[9px] tracking-[5px] uppercase ${onDark ? "text-paper/40" : "text-stone-light"}`}>
            Scroll ↓
          </div>
        </div>
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
            <span className="font-display text-[22px] text-ink" style={{ fontWeight: 500 }}>Prugio</span>
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
                  className={`w-full flex items-baseline gap-4 py-4 border-b border-ink/[0.06] text-left ${
                    isActive ? "text-ink" : "text-stone"
                  }`}
                >
                  <span className="text-mono text-[11px] tabular-nums text-rust w-7">{item.num}</span>
                  <span className={`text-[16px] tracking-[1px] ${isActive ? "font-medium" : "font-light"}`}>
                    {item.label}
                  </span>
                  {isActive && <span className="ml-auto text-rust">●</span>}
                </button>
              );
            })}
          </nav>

          <div className="px-7 mt-4 space-y-2">
            <p className="text-[10px] tracking-[3px] uppercase text-stone-light">분양문의</p>
            {hasPhone ? (
              <a href={telHref} className="text-mono text-[20px] tabular-nums text-ink">{displayPhone}</a>
            ) : (
              <p className="text-[15px] text-stone font-light">추후공지</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
