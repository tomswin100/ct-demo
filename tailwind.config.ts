import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "var(--font-sans)",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          bg: "#f6f2eb",
          surface: "#fffdf8",
          ink: "#111111",
          muted: "#625b52",
          line: "#ddd3c6",
          soft: "#efe7dc",
          accent: "#111111",
          "accent-hover": "#2b2b2b",
          "accent-muted": "#7a7065",
        },
      },
      boxShadow: {
        "brand-card": "0 28px 64px -42px rgba(17, 17, 17, 0.18)",
        "brand-float": "0 18px 42px -30px rgba(17, 17, 17, 0.14)",
      },
      borderRadius: {
        duna: "0",
        "duna-lg": "0",
        "duna-xl": "0",
      },
    },
  },
  plugins: [],
} satisfies Config;
