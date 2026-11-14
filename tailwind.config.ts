import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#080808",
        ink: "#080808",
        body: "#626262",
        subtle: "#858585",
        yellow: {
          DEFAULT: "#A3D026",
          hover: "#8ab820",
        },
        card: "#F7F7F7",
        surface: "#FAFAFA",
        line: "#EAEAEA",
        ghost: "#F3F3F3",
        paper: "#FFFFFF",
        border: "#EAEAEA",
        input: "#EAEAEA",
        ring: "#A3D026",
        primary: {
          DEFAULT: "#080808",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F7F7F7",
          foreground: "#080808",
        },
        accent: {
          DEFAULT: "#A3D026",
          foreground: "#080808",
        },
        muted: {
          DEFAULT: "#F7F7F7",
          foreground: "#626262",
        },
        brand: {
          yellow: "#A3D026",
          ink: "#080808",
          card: "#F7F7F7",
          line: "#EAEAEA",
        },
        forest: "#080808",
        cream: "#FFFFFF",
        green: "#A3D026",
        grass: {
          DEFAULT: "#A3D026",
          deep: "#8ab820",
          soft: "#b8e030",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Bricolage Grotesque", "system-ui", "sans-serif"],
        body: ["Bricolage Grotesque", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "system-ui", "sans-serif"],
        heading: ["Bricolage Grotesque", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-name": [
          "clamp(4rem, 11vw, 9rem)",
          { lineHeight: "0.92", letterSpacing: "-0.055em", fontWeight: "800" },
        ],
        "section-title": [
          "clamp(2rem, 4.8vw, 3.6rem)",
          { lineHeight: "1", letterSpacing: "-0.045em", fontWeight: "800" },
        ],
        "display-lg": [
          "clamp(2.25rem, 6vw, 5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.05em", fontWeight: "800" },
        ],
        "display-md": [
          "clamp(2rem, 4.5vw, 3.5rem)",
          { lineHeight: "0.98", letterSpacing: "-0.04em", fontWeight: "800" },
        ],
      },
      boxShadow: {
        soft: "0 18px 50px -32px rgba(8, 8, 8, 0.22)",
        lift: "0 24px 60px -30px rgba(8, 8, 8, 0.28)",
        pill: "0 10px 24px -14px rgba(8, 8, 8, 0.35)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "soft-pulse": "soft-pulse 5s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
