import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(255,255,255,0.92)",
        secondary: "rgba(255,255,255,0.58)",
        tertiary: "rgba(255,255,255,0.35)",
        ghost: "rgba(255,255,255,0.18)",
        surface: {
          void: "hsl(240, 10%, 6%)",
          1: "hsl(240, 9%, 8%)",
          2: "hsl(240, 10%, 11%)",
          3: "hsl(240, 10%, 14%)",
          4: "hsl(240, 10%, 17%)",
          5: "hsl(240, 9%, 20%)",
        },
        accent: {
          DEFAULT: "#3B8BF5",
          hover: "#2563eb",
          active: "#1d4ed8",
        },
        status: {
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "Consolas", "monospace"],
      },
      boxShadow: {
        "studio": "0 40px 120px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.08)",
        "signal": "0 0 48px rgba(59,139,245,0.32)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.33, 1, 0.68, 1)",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
