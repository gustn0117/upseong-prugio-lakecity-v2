"use client";

import { useState, useEffect } from "react";
import PrugioLogo from "./PrugioLogo";
import { displayPhone, hasPhone, telHref } from "@/lib/site";

interface MenuItem {
  id: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { id: "business", label: "사업개요" },
  { id: "location", label: "입지환경" },
  { id: "premium", label: "프리미엄" },
];

interface HeaderProps {
  activeTab: string;
  onTabChange: (tabId: string, subTabId?: string) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(activeTab === "home");
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [activeTab]);

  const isDark = isHome && !scrolled;

  const headerBg = isDark
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur-md border-b border-gray-100";

  const textColor = isDark ? "text-white" : "text-gray-900";

  const navItemClass = (itemId: string) => {
    const isActive = activeTab === itemId;
    if (isActive) return isDark ? "text-white font-semibold" : "text-navy font-semibold";
    return isDark
      ? "text-white/50 hover:text-white"
      : "text-cool-gray hover:text-gray-900";
  };

  const PhoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  // 전화번호 표시 컴포넌트 (등록되어 있으면 링크, 아니면 "추후공지" 텍스트)
  const PhoneBlock = ({ wrapperClass, iconClass }: { wrapperClass: string; iconClass?: string }) => {
    const content = (
      <>
        <PhoneIcon className={`${iconClass ?? "w-5 h-5"} text-gold`} />
        <span>분양문의 {displayPhone}</span>
      </>
    );
    return hasPhone ? (
      <a href={telHref} className={wrapperClass}>
        {content}
      </a>
    ) : (
      <span className={wrapperClass}>{content}</span>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      {/* Hero readability gradient */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      )}

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <button
            onClick={() => { setMobileOpen(false); onTabChange("home"); }}
            className="flex items-center cursor-pointer flex-shrink-0"
          >
            <PrugioLogo white={isDark} size="sm" showSub={true} />
          </button>

          {/* Nav + CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative px-5 xl:px-6 py-2 text-[13px] tracking-[0.5px] transition-all duration-300 ${navItemClass(item.id)}`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-gold" />
                )}
              </button>
            ))}

            <div className="ml-6 flex items-center gap-5">
              <PhoneBlock
                wrapperClass={`hidden xl:flex items-center gap-2 text-[14px] font-semibold tracking-wider transition-colors duration-300 ${isDark ? "text-white" : "text-navy"}`}
              />
              <button
                onClick={() => onTabChange("register")}
                className={`px-6 py-2.5 text-[14px] font-semibold tracking-wider rounded-sm transition-all duration-300
                  ${isDark
                    ? "border border-white/40 text-white hover:bg-white/10"
                    : "bg-navy text-white hover:bg-navy-light"
                  }`}
              >
                관심고객등록
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            {hasPhone && (
              <a href={telHref} className={`p-1.5 ${textColor}`} aria-label="분양문의 전화">
                <PhoneIcon />
              </a>
            )}
            <button className={`p-1.5 ${textColor}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="메뉴 열기">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-[72px] z-50 transition-all duration-300 ${
        mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div className={`absolute top-0 right-0 w-[280px] max-w-[80vw] h-full bg-white transition-transform duration-300 ease-out overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-6">
            {/* CTA */}
            <button
              onClick={() => { onTabChange("register"); setMobileOpen(false); }}
              className="w-full py-3.5 bg-navy text-white text-[14px] font-semibold tracking-wider rounded-sm mb-6 hover:bg-navy-light transition-colors"
            >
              관심고객등록
            </button>

            {/* Menu Items */}
            {menuItems.map((item) => (
              <div key={item.id} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => { onTabChange(item.id); setMobileOpen(false); }}
                  className={`flex items-center justify-between w-full text-left py-4 text-[14px] transition-colors
                    ${activeTab === item.id ? "text-navy font-semibold" : "text-gray-500"}`}
                >
                  <span>{item.label}</span>
                  {activeTab === item.id && <span className="w-5 h-[2px] bg-gold" />}
                </button>
              </div>
            ))}

            {/* Phone */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <PhoneBlock
                wrapperClass="flex items-center gap-2 text-[14px] font-semibold text-navy tracking-wider"
                iconClass="w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
