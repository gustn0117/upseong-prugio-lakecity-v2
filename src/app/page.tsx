"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotificationRibbon from "@/components/NotificationRibbon";
import SalesAnnouncementModal from "@/components/SalesAnnouncementModal";
import HomeSection from "@/components/sections/HomeSection";
import BusinessSection from "@/components/sections/BusinessSection";
import LocationSection from "@/components/sections/LocationSection";
import PremiumSection from "@/components/sections/PremiumSection";
import ComplexSection from "@/components/sections/ComplexSection";
import UnitSection from "@/components/sections/UnitSection";
import RegisterSection from "@/components/sections/RegisterSection";
import { hasPhone, telHref, displayPhone } from "@/lib/site";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeSubTab, setActiveSubTab] = useState<string | undefined>();

  const handleTabChange = (tabId: string, subTabId?: string) => {
    setActiveTab(tabId);
    setActiveSubTab(subTabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Floating CTA button
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed top stack: notification ribbon + header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NotificationRibbon />
        <Header activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* 메인 페이지 진입 시 안내 팝업 */}
      {activeTab === "home" && <SalesAnnouncementModal />}

      <main className="flex-1">
        {activeTab === "home" && <HomeSection onTabChange={handleTabChange} />}
        {activeTab === "business" && <BusinessSection />}
        {activeTab === "location" && <LocationSection />}
        {activeTab === "premium" && <PremiumSection />}
        {activeTab === "complex" && <ComplexSection initialSubTab={activeSubTab} />}
        {activeTab === "unit" && <UnitSection initialSubTab={activeSubTab} />}
        {activeTab === "register" && <RegisterSection />}
      </main>

      <Footer onTabChange={handleTabChange} />

      {/* Floating cluster — bottom right */}
      <div
        className={`fixed bottom-6 right-6 z-40 flex flex-col items-stretch gap-2 transition-all duration-500 ${
          showFloatingBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-10 h-10 bg-paper text-stone border border-ink/10 hover:text-ink hover:border-ink/30 transition-all flex items-center justify-center"
          title="맨 위로"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={() => handleTabChange("register")}
          className="px-4 h-10 bg-ink text-paper hover:bg-rust transition-all flex items-center gap-2 text-[12px] tracking-wide"
        >
          관심고객 등록 <span className="text-rust">→</span>
        </button>
      </div>

      {/* Phone CTA — sticky on mobile, always visible (스크롤 따라다님) */}
      {hasPhone && (
        <a
          href={telHref}
          className="fixed bottom-5 left-5 z-40 lg:hidden inline-flex items-center gap-2.5 px-4 h-12 bg-ink text-paper shadow-xl border border-paper/10"
        >
          <svg className="w-4 h-4 text-rust" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-[12.5px] tabular-nums tracking-wider">분양문의 {displayPhone}</span>
        </a>
      )}
    </div>
  );
}
