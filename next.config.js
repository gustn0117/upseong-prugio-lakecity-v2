/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3'],
  },
  // HTML 페이지는 항상 서버 재검증 (옛 버전이 브라우저에 1년간 박히는 문제 방지).
  // /_next/static/* 등 해시 파일명 자산은 영향 없음 (해당 경로는 source에 미포함).
  async headers() {
    return [
      {
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
