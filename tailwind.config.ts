import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canvas trắng - hồng rất nhạt (#FFF5F8 màu phụ), giữ tên "ivory"
        ivory: {
          DEFAULT: "#FFF5F8",
          50: "#FFFFFF",
          100: "#FFF5F8",
          200: "#F6E4EB",
          300: "#EBD3DC",
        },
        ink: {
          DEFAULT: "#1A1115",
          800: "#241A1E",
          700: "#3A2C31",
          600: "#5A4951",
          500: "#7C6A71",
          400: "#A493A0",
        },
        // Accent chính = hồng #FF4081, đậm #D6336C, nhạt #FFB6C1, tint #FFF5F8
        gold: {
          DEFAULT: "#FF4081",
          50: "#FFF5F8",
          100: "#FFE3EC",
          200: "#FFB6C1",
          300: "#FF8FAB",
          400: "#FF6593",
          500: "#FF4081",
          600: "#D6336C",
          700: "#B02356",
        },
        // Section nền tối — đen trung tính (không còn xanh)
        forest: {
          DEFAULT: "#0C0C0C",
          700: "#211E18",
          600: "#2E2A22",
        },
        // ── Supporting palette — grayscale ─────────────────────────
        teal: {
          DEFAULT: "#3A3A3A",
          50: "#F2F2F2",
          100: "#DEDEDE",
          500: "#555555",
          600: "#3A3A3A",
          700: "#222222",
        },
        rose: {
          DEFAULT: "#5C5C5C",
          100: "#F5F5F5",
          200: "#E2E2E2",
          300: "#C4C4C4",
          500: "#7A7A7A",
          600: "#5C5C5C",
          700: "#3D3D3D",
        },
        mist: {
          DEFAULT: "#CCCCCC",
          light: "#E4E4E4",
          dark: "#A6A6A6",
        },
      },
      fontFamily: {
        // Maven Pro cho toàn bộ (heading/display + body/UI)
        serif: ["var(--font-maven)", "system-ui", "sans-serif"],
        sans: ["var(--font-maven)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      maxWidth: {
        container: "100%",
      },
      boxShadow: {
        card: "0 1px 2px rgba(22,20,16,0.04), 0 12px 40px -16px rgba(22,20,16,0.18)",
        float: "0 24px 70px -24px rgba(22,20,16,0.32)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
