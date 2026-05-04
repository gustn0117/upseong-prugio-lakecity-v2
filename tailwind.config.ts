import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // — Editorial palette (institutional neutral) —
        ink: "#141414",          // primary dark
        "ink-soft": "#1F1F1F",
        paper: "#F5F5F4",        // neutral off-white (stone-100 base)
        "paper-deep": "#E7E5E4", // stone-200, subtle depth
        // 액센트 — 푸르지오 브랜드 톤의 딥 틸 (변수명은 'rust' 유지하지만 청록색)
        rust: "#1A6F66",
        "rust-deep": "#0E5751",
        stone: "#57534E",        // stone-600
        "stone-light": "#A8A29E", // stone-400
        forest: "#2D4034",

        // — Legacy palette (kept for sections still using navy/gold) —
        navy: "#0F1B2D",
        "navy-light": "#1A2A42",
        "navy-dark": "#080F1A",
        gold: "#B8976A",
        "gold-light": "#CEAD82",
        "gold-dark": "#9A7D56",
        "off-white": "#F8F9FA",
        "light-gray": "#F1F3F5",
        "mid-gray": "#E5E7EB",
        "cool-gray": "#6B7280",
        "dark-gray": "#374151",
        charcoal: "#1F2937",
      },
      fontFamily: {
        sans: ["Pretendard", "Noto Sans KR", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        serif: ["'Playfair Display'", "'Noto Serif KR'", "serif"],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
    },
  },
  plugins: [],
};
export default config;
