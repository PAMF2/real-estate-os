import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        "bg-canvas": "#f5f5f7",
        "bg-surface": "#ffffff",
        "bg-elevated": "#fafafa",
        "ink-primary": "#1d1d1f",
        "ink-secondary": "#6e6e73",
        "ink-muted": "#86868b",
        "border-hair": "#d2d2d7",
        accent: "#1c69d4",
        "accent-hover": "#0a5cc4",
        "accent-tint": "#e8f0fb",
        success: "#1d8348",
        warning: "#b07a00",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["56px", { lineHeight: "60px", letterSpacing: "-0.022em", fontWeight: "600" }],
        "display-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.020em", fontWeight: "600" }],
        h1: ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "600" }],
        h2: ["22px", { lineHeight: "28px", letterSpacing: "-0.010em", fontWeight: "600" }],
        h3: ["17px", { lineHeight: "24px", letterSpacing: "-0.005em", fontWeight: "600" }],
        "body-lg": ["17px", { lineHeight: "26px" }],
        body: ["15px", { lineHeight: "22px" }],
        "body-sm": ["13px", { lineHeight: "20px" }],
        caption: ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "500" }],
      },
      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "16px",
        "space-5": "24px",
        "space-6": "32px",
        "space-7": "48px",
        "space-8": "64px",
        "space-9": "96px",
        "space-10": "128px",
      },
      maxWidth: { content: "1280px", "content-narrow": "1040px", marketing: "1080px" },
      transitionTimingFunction: {
        "ease-out-soft": "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-spring": "cubic-bezier(0.32, 0.72, 0, 1)",
        "ease-carousel": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        instant: "120ms",
        quick: "200ms",
        base: "320ms",
        slow: "480ms",
        carousel: "600ms",
      },
      borderRadius: { card: "12px" },
      boxShadow: { hairline: "0 1px 2px rgba(0,0,0,0.04)" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
