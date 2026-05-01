"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "로그인에 실패했습니다.");
        setPassword("");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1 text-[28px] font-bold tracking-wider">
            <span className="text-navy">PU</span>
            <span className="text-gold">GIO</span>
          </div>
          <p className="text-[12px] text-gray-400 tracking-[3px] mt-1">ADMIN</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h1
            className="text-[22px] font-light text-gray-900 text-center mb-2"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            관리자 <span className="font-bold">로그인</span>
          </h1>
          <p className="text-[13px] text-gray-400 text-center mb-8">
            관심고객 등록 관리 시스템
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-[12px] font-semibold text-gray-500 tracking-wider uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                autoFocus
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy focus:bg-white transition-all duration-200"
              />
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-[13px] text-red-600 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3.5 bg-navy text-white text-[14px] font-bold tracking-wider rounded-xl hover:bg-navy-light transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-gray-300 mt-6">
          업성 푸르지오 레이크시티 관리 시스템
        </p>
      </div>
    </div>
  );
}
