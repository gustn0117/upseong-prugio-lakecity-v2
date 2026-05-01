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
        "navy": "#0F1B2D",
        "navy-light": "#1A2A42",
        "navy-dark": "#080F1A",
        "gold": "#B8976A",
        "gold-light": "#CEAD82",
        "gold-dark": "#9A7D56",
        "off-white": "#F8F9FA",
        "light-gray": "#F1F3F5",
        "mid-gray": "#E5E7EB",
        "cool-gray": "#6B7280",
        "dark-gray": "#374151",
        "charcoal": "#1F2937",
      },
      fontFamily: {
        sans: ["Pretendard", "Noto Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
