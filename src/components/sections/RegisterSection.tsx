"use client";

import { useState } from "react";
import Image from "next/image";
import { displayPhone, hasPhone, telHref } from "@/lib/site";

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

  const inputBase = "w-full px-0 py-3 bg-transparent border-0 border-b border-gray-200 text-[14px] text-charcoal focus:outline-none focus:border-gold transition-colors duration-200 placeholder:text-gray-300";

  return (
    <section className="pt-[72px]">
      {/* ══════════ HERO ══════════ */}
      <div className="relative h-[50vh] min-h-[340px]">
        <Image src="/images/banner-register.jpg" alt="" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold/80 text-[10px] tracking-[5px] font-medium uppercase mb-4 text-shadow-subtle">Register</p>
            <h1 className="text-white text-[36px] lg:text-[52px] font-extralight tracking-tight text-shadow-banner">관심고객등록</h1>
          </div>
        </div>
      </div>

      {/* ══════════ FORM — Modern Single Column ══════════ */}
      <div className="bg-white">
        <div className="max-w-[640px] mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-14">
            <h2 className="text-[26px] font-extralight text-charcoal tracking-tight mb-4">사전등록 신청</h2>
            <p className="text-cool-gray text-[13px] font-light">아래 양식을 작성하시면 담당자가 연락드리겠습니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Privacy Toggle */}
            <div className="border border-gray-200">
              <button
                type="button"
                onClick={() => setPrivacyOpen(!privacyOpen)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-off-white transition-colors"
              >
                <span className="text-[13px] text-charcoal font-medium">개인정보 수집 및 이용 동의</span>
                <svg className={`w-4 h-4 text-cool-gray transition-transform ${privacyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {privacyOpen && (
                <div className="px-6 pb-5 max-h-[240px] overflow-y-auto text-[12px] text-cool-gray leading-[1.9] space-y-3 border-t border-gray-100">
                  <p className="pt-4">
                    본 사이트 운영자(이하 &quot;회사&quot;)는 고객님의 개인정보를 중요시하며, 「개인정보 보호법」 및 관련 법률을 준수합니다.
                  </p>
                  <p><strong className="text-dark-gray">수집항목:</strong> 이름, 연락처, 관심유형, 생년월일, 주소</p>
                  <p><strong className="text-dark-gray">이용목적:</strong> 분양 정보 안내, 고객 상담, 사전 마케팅</p>
                  <p><strong className="text-dark-gray">보유기간:</strong> 분양 종료 시까지 (철회 요청 시 즉시 파기)</p>
                  <p><strong className="text-dark-gray">수탁업체:</strong> 분양대행사, 홈페이지 운영업체, 문자 발송업체</p>
                  <p className="text-[11px]">동의를 거부할 권리가 있으며, 미동의 시 등록이 제한됩니다.</p>
                </div>
              )}
              <div className="flex items-center gap-6 px-6 py-4 border-t border-gray-100 bg-off-white">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="agreement" checked={agreed === true} onChange={() => setAgreed(true)} className="w-4 h-4 text-navy border-gray-300" />
                  <span className={`text-[13px] ${agreed === true ? "text-navy font-medium" : "text-cool-gray"}`}>동의</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="agreement" checked={agreed === false} onChange={() => setAgreed(false)} className="w-4 h-4 text-navy border-gray-300" />
                  <span className={`text-[13px] ${agreed === false ? "text-red-500 font-medium" : "text-cool-gray"}`}>미동의</span>
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-gold text-[10px] tracking-[3px] font-medium uppercase">
                성명 <span className="text-red-400">*</span>
              </label>
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
              <label className="text-gold text-[10px] tracking-[3px] font-medium uppercase">
                연락처 <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-3 mt-1">
                <select
                  value={form.phone1}
                  onChange={(e) => handleChange("phone1", e.target.value)}
                  className="py-3 bg-transparent border-0 border-b border-gray-200 text-[14px] text-charcoal focus:outline-none focus:border-gold transition-colors cursor-pointer"
                >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                </select>
                <span className="text-gray-300">—</span>
                <input
                  type="text"
                  maxLength={4}
                  value={form.phone2}
                  onChange={(e) => handleChange("phone2", e.target.value.replace(/\D/g, ""))}
                  className="w-[80px] py-3 bg-transparent border-0 border-b border-gray-200 text-[14px] text-center text-charcoal focus:outline-none focus:border-gold transition-colors"
                />
                <span className="text-gray-300">—</span>
                <input
                  type="text"
                  maxLength={4}
                  value={form.phone3}
                  onChange={(e) => handleChange("phone3", e.target.value.replace(/\D/g, ""))}
                  className="w-[80px] py-3 bg-transparent border-0 border-b border-gray-200 text-[14px] text-center text-charcoal focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            {/* Interest Type */}
            <div>
              <label className="text-gold text-[10px] tracking-[3px] font-medium uppercase">관심유형</label>
              <div className="flex flex-wrap gap-3 mt-3">
                {["특별공급", "1순위", "2순위"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange("interestType", type)}
                    className={`px-5 py-2.5 text-[13px] border transition-all duration-200 ${
                      form.interestType === type
                        ? "border-navy bg-navy text-white"
                        : "border-gray-200 text-cool-gray hover:border-gray-400"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Birth */}
            <div>
              <label className="text-gold text-[10px] tracking-[3px] font-medium uppercase">생년월일</label>
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
              <label className="text-gold text-[10px] tracking-[3px] font-medium uppercase">주소</label>
              <div className="flex flex-wrap gap-3 mt-1">
                <select
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="py-3 bg-transparent border-0 border-b border-gray-200 text-[14px] text-charcoal focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="">시/도</option>
                  {["서울","경기","인천","충남","충북","대전","세종","강원","전북","전남","경북","경남","부산","대구","울산","광주","제주"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={form.district}
                  onChange={(e) => handleChange("district", e.target.value)}
                  placeholder="시/구/군"
                  className="w-[100px] py-3 bg-transparent border-0 border-b border-gray-200 text-[14px] text-charcoal focus:outline-none focus:border-gold placeholder:text-gray-300"
                />
                <input
                  type="text"
                  value={form.dong}
                  onChange={(e) => handleChange("dong", e.target.value)}
                  placeholder="읍/면/동"
                  className="w-[100px] py-3 bg-transparent border-0 border-b border-gray-200 text-[14px] text-charcoal focus:outline-none focus:border-gold placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 bg-navy text-white text-[14px] font-semibold tracking-wider hover:bg-navy-light transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "등록 중..." : "등록하기"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-4 border border-gray-200 text-cool-gray text-[14px] hover:bg-off-white transition-all duration-300"
              >
                초기화
              </button>
            </div>
          </form>

          {/* Phone */}
          <div className="mt-16 pt-10 border-t border-gray-100 text-center">
            <p className="text-cool-gray text-[11px] tracking-[3px] uppercase mb-3 font-light">분양문의</p>
            {hasPhone ? (
              <a href={telHref} className="text-navy text-[24px] font-extralight tracking-widest hover:text-gold transition-colors">
                {displayPhone}
              </a>
            ) : (
              <>
                <p className="text-navy text-[22px] font-extralight tracking-widest">추후공지</p>
                <p className="text-cool-gray text-[12px] mt-3 font-light leading-relaxed">
                  대표번호는 정식 분양 시 안내됩니다.<br />
                  관심고객 등록 시 분양 일정 및 정보를 가장 먼저 안내드립니다.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
