"use client";

import { useState } from "react";
import Image from "next/image";
import { displayPhone, hasPhone, telHref } from "@/lib/site";
import FAQ from "@/components/FAQ";

export default function RegisterSection() {
  const [agreed, setAgreed] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    interestType: "",
    age: "",
    city: "",
    district: "",
    dong: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }
    if (!form.name || !form.phone2 || !form.phone3) {
      alert("성명과 연락처를 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, agreed: true }),
      });
      const data = await res.json();
      if (data.success) {
        handleReset();
        alert("관심고객 등록이 완료되었습니다.\n담당자가 빠른 시일 내에 연락드리겠습니다.");
      } else {
        alert("등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } catch {
      alert("등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setAgreed(null);
    setPrivacyOpen(false);
    setForm({ name: "", phone1: "010", phone2: "", phone3: "", interestType: "", age: "", city: "", district: "", dong: "" });
  };

  const inputBase =
    "w-full px-0 py-3 bg-transparent border-0 border-b border-ink/15 text-[15px] text-ink focus:outline-none focus:border-rust transition-colors duration-200 placeholder:text-stone-light";

  return (
    <section className="pt-[140px] lg:pt-[92px] bg-paper">

      {/* ── PAGE HEADER ── */}
      <div className="relative bg-ink text-paper overflow-hidden">
        <Image src="/images/office-desk.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/55 to-ink/35" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:pl-[88px] lg:pr-10 py-14 lg:py-20 grid grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">Register</p>
            <h1 className="text-paper text-[34px] lg:text-[52px] leading-[1.15] tracking-tight" style={{ fontWeight: 300 }}>
              관심고객 사전등록
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-paper/15 lg:pl-10">
            <p className="text-paper/70 text-[13.5px] font-light leading-[1.95]">
              사전 등록하시는 고객님께 분양 일정·평형·청약 정보를 가장 먼저 안내드립니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── FORM ── */}
      <div className="bg-paper">
        <div className="max-w-[680px] mx-auto px-6 py-20 lg:py-24">

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Privacy */}
            <div className="border border-ink/10 bg-paper-deep">
              <button
                type="button"
                onClick={() => setPrivacyOpen(!privacyOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-paper transition-colors"
              >
                <span className="text-[13px] text-ink font-medium">개인정보 수집 및 이용 동의</span>
                <svg className={`w-4 h-4 text-stone transition-transform ${privacyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {privacyOpen && (
                <div className="px-6 pb-5 max-h-[240px] overflow-y-auto text-[12px] text-stone leading-[1.9] space-y-3 border-t border-ink/[0.08]">
                  <p className="pt-4">
                    본 사이트 운영자(이하 &quot;회사&quot;)는 고객님의 개인정보를 중요시하며, 「개인정보 보호법」 및 관련 법률을 준수합니다.
                  </p>
                  <p><strong className="text-ink">수집항목:</strong> 이름, 연락처, 관심유형, 생년월일, 주소</p>
                  <p><strong className="text-ink">이용목적:</strong> 분양 정보 안내, 고객 상담, 사전 마케팅</p>
                  <p><strong className="text-ink">보유기간:</strong> 분양 종료 시까지 (철회 요청 시 즉시 파기)</p>
                  <p><strong className="text-ink">수탁업체:</strong> 분양대행사, 홈페이지 운영업체, 문자 발송업체</p>
                  <p className="text-[11px]">동의를 거부할 권리가 있으며, 미동의 시 등록이 제한됩니다.</p>
                </div>
              )}
              <div className="flex items-center gap-6 px-6 py-4 border-t border-ink/[0.08]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="agreement" checked={agreed === true} onChange={() => setAgreed(true)} className="w-4 h-4 accent-rust" />
                  <span className={`text-[13px] ${agreed === true ? "text-ink font-medium" : "text-stone"}`}>동의</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="agreement" checked={agreed === false} onChange={() => setAgreed(false)} className="w-4 h-4 accent-stone" />
                  <span className={`text-[13px] ${agreed === false ? "text-rust font-medium" : "text-stone"}`}>미동의</span>
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-[12.5px] text-stone mb-2 block">성명 <span className="text-rust">*</span></label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="이름을 입력해 주세요"
                className={inputBase}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-[12.5px] text-stone mb-2 block">연락처 <span className="text-rust">*</span></label>
              <div className="flex items-center gap-3">
                <select
                  value={form.phone1}
                  onChange={(e) => handleChange("phone1", e.target.value)}
                  className="py-3 bg-transparent border-0 border-b border-ink/15 text-[15px] text-ink focus:outline-none focus:border-rust transition-colors cursor-pointer"
                >
                  {["010", "011", "016", "017", "018", "019"].map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <span className="text-stone-light">—</span>
                <input
                  type="text"
                  maxLength={4}
                  value={form.phone2}
                  onChange={(e) => handleChange("phone2", e.target.value.replace(/\D/g, ""))}
                  className="w-[90px] py-3 bg-transparent border-0 border-b border-ink/15 text-[15px] text-center text-ink focus:outline-none focus:border-rust transition-colors"
                />
                <span className="text-stone-light">—</span>
                <input
                  type="text"
                  maxLength={4}
                  value={form.phone3}
                  onChange={(e) => handleChange("phone3", e.target.value.replace(/\D/g, ""))}
                  className="w-[90px] py-3 bg-transparent border-0 border-b border-ink/15 text-[15px] text-center text-ink focus:outline-none focus:border-rust transition-colors"
                />
              </div>
            </div>

            {/* Interest Type */}
            <div>
              <label className="text-[12.5px] text-stone mb-3 block">관심유형</label>
              <div className="flex flex-wrap gap-2">
                {["특별공급", "1순위", "2순위"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange("interestType", type)}
                    className={`px-5 py-2.5 text-[13px] border transition-all ${
                      form.interestType === type
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/15 text-stone hover:border-ink/40"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Birth */}
            <div>
              <label className="text-[12.5px] text-stone mb-2 block">생년월일</label>
              <input
                type="text"
                maxLength={6}
                value={form.age}
                onChange={(e) => handleChange("age", e.target.value.replace(/\D/g, ""))}
                placeholder="생년월일 6자리 (예: 901225)"
                className={inputBase}
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-[12.5px] text-stone mb-2 block">주소</label>
              <div className="flex flex-wrap gap-3">
                <select
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="py-3 bg-transparent border-0 border-b border-ink/15 text-[15px] text-ink focus:outline-none focus:border-rust cursor-pointer"
                >
                  <option value="">시/도</option>
                  {["서울", "경기", "인천", "충남", "충북", "대전", "세종", "강원", "전북", "전남", "경북", "경남", "부산", "대구", "울산", "광주", "제주"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={form.district}
                  onChange={(e) => handleChange("district", e.target.value)}
                  placeholder="시/구/군"
                  className="w-[120px] py-3 bg-transparent border-0 border-b border-ink/15 text-[15px] text-ink focus:outline-none focus:border-rust placeholder:text-stone-light"
                />
                <input
                  type="text"
                  value={form.dong}
                  onChange={(e) => handleChange("dong", e.target.value)}
                  placeholder="읍/면/동"
                  className="w-[120px] py-3 bg-transparent border-0 border-b border-ink/15 text-[15px] text-ink focus:outline-none focus:border-rust placeholder:text-stone-light"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 bg-ink text-paper text-[13.5px] tracking-wider hover:bg-stone transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "등록 중..." : "등록하기"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-4 border border-ink/15 text-stone text-[13.5px] tracking-wider hover:border-ink/40 transition-colors"
              >
                초기화
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── PHONE BLOCK ── */}
      <div className="bg-paper-deep border-t border-ink/[0.08]">
        <div className="max-w-[920px] mx-auto px-6 py-12 text-center">
          <p className="text-[10.5px] tracking-[3px] uppercase text-rust mb-3">분양문의</p>
          {hasPhone ? (
            <a href={telHref} className="text-ink text-[32px] lg:text-[40px] tabular-nums tracking-tight hover:text-rust transition-colors" style={{ fontWeight: 300 }}>
              {displayPhone}
            </a>
          ) : (
            <>
              <p className="text-ink text-[28px] lg:text-[32px] tracking-tight" style={{ fontWeight: 300 }}>추후공지</p>
              <p className="text-stone text-[12.5px] mt-3 font-light leading-relaxed">
                대표번호는 정식 분양 시 안내됩니다.<br />
                관심고객 등록 시 분양 일정 및 정보를 가장 먼저 안내드립니다.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
