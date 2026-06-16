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
        // Warm ivory canvas + ink — Christie's / Sotheby's restraint
        ivory: {
          DEFAULT: "#F7F4EE",
          50: "#FBF9F5",
          100: "#F7F4EE",
          200: "#EFEAE0",
          300: "#E3DBCB",
        },
        ink: {
          DEFAULT: "#161410",
          800: "#211E18",
          700: "#2E2A22",
          600: "#4A453B",
          500: "#6B6557",
          400: "#928B7B",
        },
        // Bright amber-gold accent (#FFAA28) — single brand accent.
        // 600/700 giữ cùng hue (~38°) với 500, chỉ giảm luminance để dùng cho text mà vẫn đồng nhất visually.
        gold: {
          DEFAULT: "#FFAA28",
          50: "#FFF6E6",
          100: "#FFE9C2",
          200: "#FFD891",
          300: "#FFC766",
          400: "#FFB840",
          500: "#FFAA28",
          600: "#F09518",
          700: "#C97400",
        },
        // Deep heritage green for dark sections
        forest: {
          DEFAULT: "#15231E",
          700: "#1C2F28",
          600: "#274038",
        },
        // ── Supporting palette ──────────────────────────────────────
        // Teal (#056C5C): "còn trống" / success / verified
        teal: {
          DEFAULT: "#056C5C",
          50: "#E7F3F1",
          100: "#C3E3DD",
          500: "#0A8A76",
          600: "#056C5C",
          700: "#044C41",
        },
        // Rose (#FF98BB → #BA1650): bold accent, alerts, "giữ chỗ"
        rose: {
          DEFAULT: "#BA1650",
          100: "#FFE4EE",
          200: "#FFC9DD",
          300: "#FF98BB",
          500: "#E1336F",
          600: "#BA1650",
          700: "#8E0F3D",
        },
        // Mist (#CCCCCC): neutral grey — muted states, dividers
        mist: {
          DEFAULT: "#CCCCCC",
          light: "#E4E4E4",
          dark: "#A6A6A6",
        },
      },
      fontFamily: {
        // Be Vietnam Pro cho text lớn (heading/display)
        serif: ["var(--font-be-vietnam)", "system-ui", "sans-serif"],
        // Plus Jakarta Sans cho body và UI nhỏ
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
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
