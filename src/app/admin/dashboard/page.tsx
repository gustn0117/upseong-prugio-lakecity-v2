"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Registration, StatsResponse } from "@/lib/types";

/* ───────── 타입 ───────── */
interface ListResponse {
  data: Registration[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/* ───────── 대시보드 페이지 ───────── */
export default function AdminDashboardPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  // 통계
  const [stats, setStats] = useState<StatsResponse | null>(null);

  // 테이블
  const [list, setList] = useState<ListResponse | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filterInterest, setFilterInterest] = useState("");
  const [filterAge, setFilterAge] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // 모달
  const [detailItem, setDetailItem] = useState<Registration | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Registration | null>(null);
  const [deleting, setDeleting] = useState(false);

  // 인증 확인
  useEffect(() => {
    fetch("/api/admin/verify")
      .then((r) => {
        if (!r.ok) router.replace("/admin");
        else setAuthChecked(true);
      })
      .catch(() => router.replace("/admin"));
  }, [router]);

  // 통계 로드
  const loadStats = useCallback(() => {
    fetch("/api/registrations/stats")
      .then((r) => r.json())
      .then((d) => { if (d.success) setStats(d.data); });
  }, []);

  // 목록 로드
  const loadList = useCallback(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("pageSize", "20");
    if (search) params.set("search", search);
    if (filterInterest) params.set("interestType", filterInterest);
    if (filterAge) params.set("age", filterAge);
    if (filterCity) params.set("city", filterCity);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);

    fetch(`/api/registrations?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setList(d.data); });
  }, [page, search, filterInterest, filterAge, filterCity, dateFrom, dateTo, sortBy, sortOrder]);

  useEffect(() => {
    if (authChecked) { loadStats(); loadList(); }
  }, [authChecked, loadStats, loadList]);

  // 로그아웃
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin");
  };

  // 삭제
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/registrations/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setDeleteTarget(null);
        loadList();
        loadStats();
      }
    } finally {
      setDeleting(false);
    }
  };

  // CSV 다운로드
  const handleExport = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filterInterest) params.set("interestType", filterInterest);
    if (filterAge) params.set("age", filterAge);
    if (filterCity) params.set("city", filterCity);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    window.open(`/api/registrations/export?${params.toString()}`, "_blank");
  };

  // 정렬 토글
  const toggleSort = (col: string) => {
    if (sortBy === col) setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    else { setSortBy(col); setSortOrder("desc"); }
    setPage(1);
  };

  // 검색
  const handleSearch = () => { setSearch(searchInput); setPage(1); };

  // 필터 초기화
  const clearFilters = () => {
    setSearch(""); setSearchInput("");
    setFilterInterest(""); setFilterAge(""); setFilterCity("");
    setDateFrom(""); setDateTo("");
    setPage(1);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <div className="text-gray-400 text-[14px]">인증 확인 중...</div>
      </div>
    );
  }

  const maxBarValue = (items: { count: number }[]) => Math.max(...items.map(i => i.count), 1);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* ===== 헤더 ===== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[18px] font-bold tracking-wider">
              <span className="text-navy">PU</span>
              <span className="text-gold">GIO</span>
            </span>
            <span className="text-[13px] text-gray-400 font-medium">관리자</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-[13px] text-gray-500 hover:text-red-500 transition-colors font-medium"
          >
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* ===== 통계 카드 ===== */}
        {stats && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label="전체 등록수" value={String(stats.totalRegistrations)} icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" color="navy" />
              <StatCard label="오늘 등록수" value={String(stats.todayRegistrations)} icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" color="blue-500" />
              <StatCard
                label="인기 관심유형"
                value={stats.byInterestType[0]?.type || "-"}
                icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                color="amber-500"
              />
              <StatCard
                label="인기 연령대"
                value={stats.byAge[0]?.age || "-"}
                icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                color="purple-500"
              />
            </div>

            {/* ===== 차트 ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* 관심유형별 */}
              <ChartCard title="관심유형별 분포">
                {stats.byInterestType.length === 0 ? (
                  <p className="text-[13px] text-gray-300 text-center py-6">데이터 없음</p>
                ) : (
                  <div className="space-y-3">
                    {stats.byInterestType.map((item) => (
                      <BarRow key={item.type} label={item.type} count={item.count} max={maxBarValue(stats.byInterestType)} color="bg-navy" />
                    ))}
                  </div>
                )}
              </ChartCard>

              {/* 연령대별 */}
              <ChartCard title="연령대별 분포">
                {stats.byAge.length === 0 ? (
                  <p className="text-[13px] text-gray-300 text-center py-6">데이터 없음</p>
                ) : (
                  <div className="space-y-3">
                    {stats.byAge.map((item) => (
                      <BarRow key={item.age} label={item.age} count={item.count} max={maxBarValue(stats.byAge)} color="bg-blue-500" />
                    ))}
                  </div>
                )}
              </ChartCard>

              {/* 지역별 */}
              <ChartCard title="지역별 분포 (상위 10)">
                {stats.byCity.length === 0 ? (
                  <p className="text-[13px] text-gray-300 text-center py-6">데이터 없음</p>
                ) : (
                  <div className="space-y-3">
                    {stats.byCity.map((item) => (
                      <BarRow key={item.city} label={item.city} count={item.count} max={maxBarValue(stats.byCity)} color="bg-amber-500" />
                    ))}
                  </div>
                )}
              </ChartCard>

              {/* 최근 7일 추이 */}
              <ChartCard title="최근 7일 등록 추이">
                {stats.recentTrend.length === 0 ? (
                  <p className="text-[13px] text-gray-300 text-center py-6">데이터 없음</p>
                ) : (
                  <div className="flex items-end gap-2 h-[140px] pt-4">
                    {stats.recentTrend.map((item) => {
                      const max = maxBarValue(stats.recentTrend);
                      const height = max > 0 ? (item.count / max) * 100 : 0;
                      return (
                        <div key={item.date} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[11px] text-gray-500 font-medium">{item.count}</span>
                          <div className="w-full bg-gray-100 rounded-t-md relative" style={{ height: "100px" }}>
                            <div
                              className="absolute bottom-0 w-full bg-navy rounded-t-md transition-all duration-500"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-400">{item.date.slice(5)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ChartCard>
            </div>
          </>
        )}

        {/* ===== 필터 + 테이블 ===== */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* 필터 바 */}
          <div className="p-5 border-b border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-gray-800">등록 목록</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={clearFilters}
                  className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors"
                >
                  필터 초기화
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-navy text-white text-[12px] font-semibold rounded-lg hover:bg-navy-light transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  CSV 다운로드
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* 검색 */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="이름 / 연락처 검색"
                  className="w-[200px] px-3 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                />
                <button
                  onClick={handleSearch}
                  className="px-3 py-2 bg-gray-100 rounded-lg text-[13px] text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  검색
                </button>
              </div>

              {/* 필터 */}
              <select
                value={filterInterest}
                onChange={(e) => { setFilterInterest(e.target.value); setPage(1); }}
                className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
              >
                <option value="">관심유형 전체</option>
                <option value="특별공급">특별공급</option>
                <option value="1순위">1순위</option>
                <option value="2순위">2순위</option>
              </select>

              <select
                value={filterAge}
                onChange={(e) => { setFilterAge(e.target.value); setPage(1); }}
                className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
              >
                <option value="">연령대 전체</option>
                <option value="20대">20대</option>
                <option value="30대">30대</option>
                <option value="40대">40대</option>
                <option value="50대">50대</option>
                <option value="60대 이상">60대 이상</option>
              </select>

              <select
                value={filterCity}
                onChange={(e) => { setFilterCity(e.target.value); setPage(1); }}
                className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
              >
                <option value="">지역 전체</option>
                {["서울","경기","인천","충남","충북","대전","세종","강원","전북","전남","경북","경남","부산","대구","울산","광주","제주"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
                className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
              />
              <span className="text-gray-300 text-[13px]">~</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
                className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
              />
            </div>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-4 py-3 text-left font-semibold text-gray-500 w-[60px]">No.</th>
                  <SortTh label="성명" col="name" current={sortBy} order={sortOrder} onClick={toggleSort} />
                  <SortTh label="연락처" col="phone" current={sortBy} order={sortOrder} onClick={toggleSort} />
                  <SortTh label="관심유형" col="interest_type" current={sortBy} order={sortOrder} onClick={toggleSort} />
                  <SortTh label="생년월일" col="age" current={sortBy} order={sortOrder} onClick={toggleSort} />
                  <th className="px-4 py-3 text-left font-semibold text-gray-500">지역</th>
                  <SortTh label="등록일시" col="created_at" current={sortBy} order={sortOrder} onClick={toggleSort} />
                  <th className="px-4 py-3 text-center font-semibold text-gray-500 w-[120px]">관리</th>
                </tr>
              </thead>
              <tbody>
                {list && list.data.length > 0 ? (
                  list.data.map((row, i) => (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-gray-400">{list.total - ((list.page - 1) * list.pageSize) - i}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{row.name}</td>
                      <td className="px-4 py-3 text-gray-600">{row.phone}</td>
                      <td className="px-4 py-3">
                        {row.interest_type ? (
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            row.interest_type === "특별공급" ? "bg-purple-50 text-purple-600" :
                            row.interest_type === "1순위" ? "bg-blue-50 text-blue-600" :
                            "bg-green-50 text-green-600"
                          }`}>
                            {row.interest_type}
                          </span>
                        ) : <span className="text-gray-300">-</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.age || <span className="text-gray-300">-</span>}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {[row.city, row.district, row.dong].filter(Boolean).join(" ") || <span className="text-gray-300">-</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-[12px]">{row.created_at}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setDetailItem(row)}
                            className="text-[12px] text-navy hover:text-navy-light font-medium transition-colors"
                          >
                            상세
                          </button>
                          <button
                            onClick={() => setDeleteTarget(row)}
                            className="text-[12px] text-red-400 hover:text-red-600 font-medium transition-colors"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-16 text-center text-gray-300 text-[14px]">
                      {list ? "등록된 데이터가 없습니다." : "로딩 중..."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {list && list.totalPages > 1 && (
            <div className="p-4 border-t border-gray-100 flex items-center justify-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 rounded-lg text-[13px] text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                이전
              </button>
              {Array.from({ length: list.totalPages }, (_, i) => i + 1)
                .filter(p => Math.abs(p - page) <= 2 || p === 1 || p === list.totalPages)
                .map((p, idx, arr) => (
                  <span key={p}>
                    {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-gray-300">...</span>}
                    <button
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-[13px] font-medium transition-colors ${
                        p === page
                          ? "bg-navy text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                ))}
              <button
                disabled={page >= (list?.totalPages || 1)}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 rounded-lg text-[13px] text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                다음
              </button>
            </div>
          )}

          {/* 총 건수 */}
          {list && (
            <div className="px-5 pb-4 text-[12px] text-gray-400">
              총 {list.total}건
            </div>
          )}
        </div>
      </main>

      {/* ===== 상세보기 모달 ===== */}
      {detailItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40" onClick={() => setDetailItem(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-navy px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold text-[15px]">등록 상세 정보</h3>
              <button onClick={() => setDetailItem(null)} className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <DetailRow label="No." value={String(detailItem.id)} />
              <DetailRow label="성명" value={detailItem.name} />
              <DetailRow label="연락처" value={detailItem.phone} />
              <DetailRow label="관심유형" value={detailItem.interest_type || "-"} />
              <DetailRow label="생년월일" value={detailItem.age || "-"} />
              <DetailRow label="시/도" value={detailItem.city || "-"} />
              <DetailRow label="시/구/군" value={detailItem.district || "-"} />
              <DetailRow label="읍/면/동" value={detailItem.dong || "-"} />
              <DetailRow label="등록일시" value={detailItem.created_at} />
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={() => setDetailItem(null)}
                className="w-full py-3 bg-gray-100 text-gray-600 text-[13px] font-medium rounded-xl hover:bg-gray-200 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 삭제 확인 모달 ===== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] mx-4 p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-[18px] font-bold text-gray-900 mb-2">삭제 확인</h3>
            <p className="text-[14px] text-gray-500 mb-1">
              <strong>{deleteTarget.name}</strong> ({deleteTarget.phone})
            </p>
            <p className="text-[13px] text-gray-400 mb-8">
              이 데이터를 삭제하시겠습니까? 삭제 후 복구할 수 없습니다.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 py-3 bg-gray-100 text-gray-600 text-[13px] font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 bg-red-500 text-white text-[13px] font-bold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────── 하위 컴포넌트 ───────── */

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl bg-${color}/10 flex items-center justify-center flex-shrink-0`}>
        <svg className={`w-5.5 h-5.5 text-${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
        </svg>
      </div>
      <div>
        <p className="text-[12px] text-gray-400 font-medium">{label}</p>
        <p className="text-[22px] font-bold text-gray-900 leading-tight">{value}</p>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-[14px] font-bold text-gray-700 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function BarRow({ label, count, max, color }: { label: string; count: number; max: number; color: string }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-[70px] text-[13px] text-gray-600 flex-shrink-0 text-right">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
        <div
          className={`h-full ${color} rounded-full flex items-center justify-end pr-2 transition-all duration-700`}
          style={{ width: `${Math.max(pct, 8)}%` }}
        >
          <span className="text-[11px] text-white font-medium">{count}</span>
        </div>
      </div>
    </div>
  );
}

function SortTh({ label, col, current, order, onClick }: {
  label: string; col: string; current: string; order: string;
  onClick: (col: string) => void;
}) {
  return (
    <th
      className="px-4 py-3 text-left font-semibold text-gray-500 cursor-pointer hover:text-gray-700 select-none transition-colors"
      onClick={() => onClick(col)}
    >
      <span className="flex items-center gap-1">
        {label}
        {current === col && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            {order === "desc"
              ? <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              : <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
            }
          </svg>
        )}
      </span>
    </th>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center border-b border-gray-50 pb-3">
      <span className="w-[80px] text-[12px] text-gray-400 font-medium flex-shrink-0">{label}</span>
      <span className="text-[14px] text-gray-800">{value}</span>
    </div>
  );
}
