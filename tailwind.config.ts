import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#090a0f",
        road: "#101217",
        grass: "#10b981",
        ink: "#ffffff",
        apex: {
          orange: "#ff6a1a",
          amber: "#f59e0b",
          cyan: "#00e5ff",
          emerald: "#10b981",
          dark: "#0b0d13",
          surface: "rgba(18, 22, 33, 0.75)",
          border: "rgba(255, 255, 255, 0.08)",
        },
        card: {
          lime: "#dcf63e",
          dark: "#161a23",
          sky: "#38bdf8",
          orange: "#ff7020",
        },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(0, 229, 255, 0.3)",
        "glow-orange": "0 0 40px -5px rgba(255, 106, 26, 0.45)",
        "glow-emerald": "0 0 40px -5px rgba(16, 185, 129, 0.4)",
        glass: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};

export default config;

