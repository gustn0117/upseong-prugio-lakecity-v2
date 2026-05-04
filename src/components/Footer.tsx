"use client";

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

  const placeholder = "추후공지";
  const developer = SITE.company.developer || placeholder;
  const salesAgency = SITE.company.salesAgency || placeholder;
  const trust = SITE.company.trust || placeholder;
  const showroom = SITE.contact.showroomAddress || placeholder;
  const hours = SITE.contact.hours || placeholder;
  const email = SITE.contact.email || placeholder;

  return (
    <footer className="bg-ink text-paper/70">
      {/* Top divider — brand wordmark */}
      <div className="border-b border-paper/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-paper text-[20px] lg:text-[22px] tracking-tight" style={{ fontWeight: 500 }}>
            업성 푸르지오 레이크시티
          </p>
          <p className="text-[11px] tabular-nums text-paper/40 tracking-wider">
            업성 · 천안 · 2026
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-16">
        <div className="grid grid-cols-12 gap-10 lg:gap-12">

          {/* Contact */}
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-5">Contact</p>

            <div className="space-y-3.5">
              <div className="flex items-baseline gap-4">
                <span className="text-[11.5px] text-paper/40 w-[60px] tracking-wider">대표번호</span>
                {hasPhone ? (
                  <a href={telHref} className="text-paper text-[20px] lg:text-[22px] tabular-nums tracking-tight hover:text-rust transition-colors" style={{ fontWeight: 400 }}>
                    {displayPhone}
                  </a>
                ) : (
                  <span className="text-paper/50 text-[18px] tracking-tight" style={{ fontWeight: 300 }}>{placeholder}</span>
                )}
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-[11.5px] text-paper/40 w-[60px] tracking-wider">운영시간</span>
                <span className="text-[13px] text-paper/65 font-light">{hours}</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-[11.5px] text-paper/40 w-[60px] tracking-wider">이메일</span>
                <span className="text-[13px] text-paper/65 font-light">{email}</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-[11.5px] text-paper/40 w-[60px] tracking-wider">주소</span>
                <span className="text-[13px] text-paper/65 font-light leading-relaxed">{showroom}</span>
              </div>
            </div>
          </div>

          {/* Project info */}
          <div className="col-span-12 sm:col-span-7 lg:col-span-4">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-5">Project</p>
            <dl className="space-y-3 text-[12.5px]">
              {[
                { k: "사업명", v: SITE.projectName },
                { k: "위치", v: SITE.siteAddress },
                { k: "시공", v: SITE.builder },
                { k: "시행", v: developer },
                { k: "분양", v: salesAgency },
                { k: "신탁", v: trust },
              ].map((row) => (
                <div key={row.k} className="flex gap-4">
                  <dt className="text-paper/40 w-[40px] flex-shrink-0">{row.k}</dt>
                  <dd className="text-paper/75 font-light leading-relaxed flex-1">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Sitemap */}
          <div className="col-span-12 sm:col-span-5 lg:col-span-3">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-5">Sitemap</p>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-2.5">
              {[
                { id: "home", label: "홈" },
                { id: "business", label: "사업개요" },
                { id: "location", label: "입지환경" },
                { id: "premium", label: "프리미엄" },
                { id: "register", label: "관심고객등록" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="text-[13px] text-paper/60 hover:text-paper transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Legal links + official channels */}
      <div className="border-t border-paper/[0.07]">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-6 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "이용약관", href: "#terms" },
              { label: "개인정보처리방침", href: "#privacy", strong: true },
              { label: "위치기반서비스 이용약관", href: "#location-terms" },
              { label: "이메일무단수집거부", href: "#anti-spam" },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={`text-[11.5px] hover:text-paper transition-colors ${
                    l.strong ? "text-paper/85 font-medium" : "text-paper/55"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] tracking-wide">
            <a href={SITE.links.cheongyakHome} target="_blank" rel="noopener noreferrer" className="text-paper/55 hover:text-paper transition-colors inline-flex items-center gap-1">
              청약Home <span className="text-rust text-[10px]">↗</span>
            </a>
            <a href={SITE.links.daewooEnc} target="_blank" rel="noopener noreferrer" className="text-paper/55 hover:text-paper transition-colors inline-flex items-center gap-1">
              대우건설 <span className="text-rust text-[10px]">↗</span>
            </a>
            <a href={SITE.links.prugioOfficial} target="_blank" rel="noopener noreferrer" className="text-paper/55 hover:text-paper transition-colors inline-flex items-center gap-1">
              푸르지오 <span className="text-rust text-[10px]">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-paper/[0.07] bg-ink-soft">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-7">
          <p className="text-[11.5px] text-paper/45 leading-[1.95] font-light">
            <span className="text-paper/70 font-medium mr-1">[ 유의사항 ]</span>
            본 홈페이지에 게재된 모든 내용 및 이미지·CG·문구 등은 소비자의 이해를 돕기 위해 제작·표기된 것으로
            실제와 차이가 있을 수 있으며, 인허가 및 사업 진행 상황에 따라 변경될 수 있습니다.
            정확한 분양 정보는 입주자 모집공고 및 정식 분양 안내문을 반드시 확인해 주시기 바랍니다.
            본 사이트의 모든 정보는 사전 안내 목적이며, 법적 효력을 갖지 않습니다.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-paper/[0.07]">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] tabular-nums text-paper/35 tracking-wider">
            © {SITE.copyrightYear} {SITE.projectName} — All rights reserved.
          </p>
          <p className="text-[11px] tabular-nums text-paper/35 tracking-wider">
            본 사이트는 분양 정보 안내를 위한 비공식 홍보 페이지입니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
