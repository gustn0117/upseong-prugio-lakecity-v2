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
        // — Editorial palette (new) —
        ink: "#141414",          // primary dark, replaces navy as default
        "ink-soft": "#1F1F1E",
        paper: "#F4F0E8",        // warm cream background
        "paper-deep": "#EAE3D6",
        rust: "#C25D3D",         // warm accent, replaces gold in some places
        "rust-deep": "#9E4A2F",
        stone: "#6B665E",        // mid neutral
        "stone-light": "#9A958C",
        forest: "#2D4034",       // alternative dark accent

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
