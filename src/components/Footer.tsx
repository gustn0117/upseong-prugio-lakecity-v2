"use client";

import PrugioLogo from "./PrugioLogo";
import { SITE, displayPhone, hasPhone, telHref } from "@/lib/site";

interface FooterProps {
  onTabChange?: (tabId: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const handleNav = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 비어있는 항목은 "추후공지"로 표시
  const placeholder = "추후공지";
  const developer = SITE.company.developer || placeholder;
  const salesAgency = SITE.company.salesAgency || placeholder;
  const trust = SITE.company.trust || placeholder;
  const showroom = SITE.contact.showroomAddress || placeholder;
  const hours = SITE.contact.hours || placeholder;

  return (
    <footer className="bg-[#111111] text-gray-400">
      {/* Top CTA Bar */}
      <div className="bg-navy">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-white text-[20px] font-light tracking-wide">관심고객 사전등록</p>
            <p className="text-white/30 text-[13px] mt-2 font-light">분양 일정 및 정보를 가장 먼저 안내드립니다.</p>
          </div>
          <button
            onClick={() => handleNav("register")}
            className="group flex items-center gap-3 px-8 py-3 border border-white/15 text-white/80 hover:bg-white hover:text-navy text-[13px] font-medium tracking-wider transition-all duration-300 rounded-sm"
          >
            등록하기
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <PrugioLogo white size="sm" className="opacity-60" />
            </div>
            <p className="text-[13px] leading-[1.8] text-gray-600 font-light">
              호수공원 앞,
              <br />
              자연과 함께하는 프리미엄 주거
            </p>

            {/* Contact (placeholder-aware) */}
            <div className="mt-7 space-y-2.5">
              <div className="flex items-start gap-3">
                <span className="text-[10px] tracking-[3px] uppercase text-white/30 mt-1.5 w-[64px] flex-shrink-0">Tel</span>
                {hasPhone ? (
                  <a href={telHref} className="text-[16px] font-semibold text-white/80 tracking-wider hover:text-gold transition-colors">
                    {displayPhone}
                  </a>
                ) : (
                  <span className="text-[15px] font-light text-white/40 tracking-wider">{placeholder}</span>
                )}
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[10px] tracking-[3px] uppercase text-white/30 mt-0.5 w-[64px] flex-shrink-0">Hours</span>
                <span className="text-[12.5px] text-gray-500 font-light">{hours}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[10px] tracking-[3px] uppercase text-white/30 mt-0.5 w-[64px] flex-shrink-0">Address</span>
                <span className="text-[12.5px] text-gray-500 font-light leading-relaxed">{showroom}</span>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="lg:col-span-4">
            <h4 className="text-[11px] font-medium text-white/30 tracking-[3px] uppercase mb-6">사업 정보</h4>
            <dl className="space-y-3 text-[12.5px]">
              {[
                { k: "사업명", v: SITE.projectName },
                { k: "위치", v: SITE.siteAddress },
                { k: "시공", v: SITE.builder },
                { k: "시행", v: developer },
                { k: "분양", v: salesAgency },
                { k: "신탁", v: trust },
              ].map((row) => (
                <div key={row.k} className="flex gap-3">
                  <dt className="text-gray-600 w-[44px] flex-shrink-0">{row.k}</dt>
                  <dd className="text-gray-400 font-light leading-relaxed flex-1">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-medium text-white/30 tracking-[3px] uppercase mb-6">바로가기</h4>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-3.5">
              {[
                { id: "business", label: "사업개요" },
                { id: "location", label: "입지환경" },
                { id: "premium", label: "프리미엄" },
                { id: "register", label: "관심고객등록" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="text-[13px] text-gray-500 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-6">
          <p className="text-[11.5px] text-gray-600 leading-[1.9] font-light">
            <span className="text-gray-500 font-medium mr-1">[유의사항]</span>
            본 홈페이지에 게재된 모든 내용 및 이미지, CG, 문구 등은 소비자의 이해를 돕기 위해 제작·표기된 것으로
            실제와 차이가 있을 수 있으며, 인허가 과정 및 사업 진행 상황에 따라 변경될 수 있습니다.
            정확한 분양 정보는 입주자 모집공고 및 정식 분양 안내문을 반드시 확인해 주시기 바랍니다.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-gray-700">
            &copy; {SITE.copyrightYear} {SITE.projectName}. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-700 tracking-wider">
            본 사이트는 분양 정보 안내를 위한 비공식 홍보 페이지입니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
