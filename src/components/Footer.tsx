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
      {/* Top divider strip with vertical year mark + 공식 사이트 배지 */}
      <div className="border-b border-paper/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <p className="font-display text-paper text-[28px] lg:text-[36px] tracking-tighter" style={{ fontWeight: 400 }}>
              Prugio <span className="text-rust">Lakecity</span>
            </p>
            <span className="text-mono text-[10px] tabular-nums text-rust tracking-[2px] uppercase border border-rust/40 px-1.5 py-px">
              Official Site
            </span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-mono text-[11px] tabular-nums text-paper/40 tracking-[2px] uppercase">
              UPSEONG · CHEONAN · 2026
            </p>
            <span className="text-paper/20">|</span>
            <p className="text-mono text-[11px] tabular-nums text-paper/40 tracking-wider">
              v.{SITE.lastUpdated.replace(/\./g, "")}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-16 lg:py-20">
        <div className="grid grid-cols-12 gap-10 lg:gap-12">

          {/* Address / Contact column */}
          <div className="col-span-12 lg:col-span-5">
            <p className="text-mono text-[10px] tabular-nums text-rust tracking-[3px] uppercase mb-5">— Contact</p>

            <div className="space-y-5">
              <div className="flex items-baseline gap-5">
                <span className="text-mono text-[10px] tabular-nums text-paper/40 w-[64px] tracking-wider uppercase">Tel</span>
                {hasPhone ? (
                  <a href={telHref} className="font-display text-paper text-[24px] lg:text-[28px] tabular-nums hover:text-rust transition-colors" style={{ fontWeight: 400 }}>
                    {displayPhone}
                  </a>
                ) : (
                  <span className="font-display text-paper/50 text-[24px] tracking-tight" style={{ fontWeight: 400 }}>{placeholder}</span>
                )}
              </div>
              <div className="flex items-baseline gap-5">
                <span className="text-mono text-[10px] tabular-nums text-paper/40 w-[64px] tracking-wider uppercase">Hours</span>
                <span className="text-[13px] text-paper/60 font-light">{hours}</span>
              </div>
              <div className="flex items-baseline gap-5">
                <span className="text-mono text-[10px] tabular-nums text-paper/40 w-[64px] tracking-wider uppercase">Mail</span>
                <span className="text-[13px] text-paper/60 font-light">{email}</span>
              </div>
              <div className="flex items-baseline gap-5">
                <span className="text-mono text-[10px] tabular-nums text-paper/40 w-[64px] tracking-wider uppercase mt-0.5">Site</span>
                <span className="text-[13px] text-paper/60 font-light leading-relaxed">{showroom}</span>
              </div>
            </div>
          </div>

          {/* Project info */}
          <div className="col-span-12 sm:col-span-7 lg:col-span-4">
            <p className="text-mono text-[10px] tabular-nums text-rust tracking-[3px] uppercase mb-5">— Project</p>
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

          {/* Quick links */}
          <div className="col-span-12 sm:col-span-5 lg:col-span-3">
            <p className="text-mono text-[10px] tabular-nums text-rust tracking-[3px] uppercase mb-5">— Sitemap</p>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-3">
              {[
                { id: "home", num: "00", label: "Home" },
                { id: "business", num: "01", label: "사업개요" },
                { id: "location", num: "02", label: "입지환경" },
                { id: "premium", num: "03", label: "프리미엄" },
                { id: "register", num: "04", label: "관심고객등록" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="group flex items-center gap-3 text-[13px] text-paper/60 hover:text-paper transition-colors"
                  >
                    <span className="text-mono text-[10px] tabular-nums text-paper/30 group-hover:text-rust transition-colors">{item.num}</span>
                    <span>{item.label}</span>
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

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-mono text-[10.5px] tabular-nums tracking-wider uppercase">
            <a href={SITE.links.cheongyakHome} target="_blank" rel="noopener noreferrer" className="text-paper/55 hover:text-paper transition-colors inline-flex items-center gap-1">
              청약Home <span className="text-rust">↗</span>
            </a>
            <a href={SITE.links.daewooEnc} target="_blank" rel="noopener noreferrer" className="text-paper/55 hover:text-paper transition-colors inline-flex items-center gap-1">
              대우건설 <span className="text-rust">↗</span>
            </a>
            <a href={SITE.links.prugioOfficial} target="_blank" rel="noopener noreferrer" className="text-paper/55 hover:text-paper transition-colors inline-flex items-center gap-1">
              푸르지오 <span className="text-rust">↗</span>
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
          <p className="text-mono text-[10.5px] tabular-nums text-paper/30 tracking-wider">
            © {SITE.copyrightYear} {SITE.projectName.toUpperCase()} — ALL RIGHTS RESERVED.
          </p>
          <p className="text-mono text-[10.5px] tabular-nums text-paper/30 tracking-wider">
            UNOFFICIAL INFORMATION SITE · UPDATED {SITE.lastUpdated}
          </p>
        </div>
      </div>
    </footer>
  );
}
