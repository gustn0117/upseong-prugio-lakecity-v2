"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeSection from "@/components/sections/HomeSection";
import BusinessSection from "@/components/sections/BusinessSection";
import LocationSection from "@/components/sections/LocationSection";
import PremiumSection from "@/components/sections/PremiumSection";
import RegisterSection from "@/components/sections/RegisterSection";
import { hasPhone, telHref } from "@/lib/site";

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
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="flex-1">
        {activeTab === "home" && <HomeSection onTabChange={handleTabChange} />}
        {activeTab === "business" && <BusinessSection />}
        {activeTab === "location" && <LocationSection />}
        {activeTab === "premium" && <PremiumSection />}
        {activeTab === "register" && <RegisterSection />}
      </main>

      <Footer onTabChange={handleTabChange} />

      {/* Floating Buttons */}
      <div
        className={`fixed bottom-8 right-8 z-40 flex flex-col items-center gap-3 transition-all duration-500 ${
          showFloatingBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Scroll to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-11 h-11 bg-white text-cool-gray rounded-sm shadow-md border border-gray-100 flex items-center justify-center hover:bg-off-white hover:text-navy transition-all duration-300"
          title="맨 위로"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* Register CTA */}
        <button
          onClick={() => handleTabChange("register")}
          className="w-12 h-12 bg-gold text-white rounded-sm shadow-lg flex items-center justify-center hover:bg-gold-light transition-all duration-300"
          title="관심고객등록"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </div>

      {/* Phone Floating Button (Mobile) — only if phone is configured */}
      {hasPhone && (
        <a
          href={telHref}
          className={`fixed bottom-8 left-6 z-40 lg:hidden flex items-center gap-2 px-5 py-3 bg-navy text-white rounded-sm shadow-lg transition-all duration-500 ${
            showFloatingBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-[13px] font-medium tracking-wider">분양문의</span>
        </a>
      )}
    </div>
  );
}
