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
        page: "#d1d1d1",
        road: "#1c1c1c",
        grass: "#45dc7d",
        ink: "#111111",
        card: {
          lime: "#dff54b",
          dark: "#2f2f2f",
          sky: "#6ac9ff",
          orange: "#fb7328",
        },
      },
      fontFamily: {
        display: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
