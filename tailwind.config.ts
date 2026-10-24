import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        /* Body text - Inter */
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        /* Heading text - Space Grotesk */
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        grotesk: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        space: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      fontSize: {
        /* Hero H1 - Space Grotesk Bold 700 */
        "hero-name": [
          "clamp(3rem, 8vw, 7rem)",
          { lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "700" },
        ],
        /* Main display - Space Grotesk Bold 700 */
        "display-lg": [
          "clamp(2.75rem, 7vw, 6rem)",
          { lineHeight: "0.98", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        /* Section headings H2 - Space Grotesk Bold 700 */
        "display-md": [
          "clamp(2rem, 4.5vw, 3.5rem)",
          { lineHeight: "1.04", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        /* H3 section titles - Space Grotesk Semibold 600 */
        "display-sm": [
          "clamp(1.75rem, 3.5vw, 2.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.022em", fontWeight: "600" },
        ],
        /* Small section titles - Space Grotesk Semibold 600 */
        "display-xs": [
          "clamp(1.25rem, 2.5vw, 1.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        /* Section title H3 - Space Grotesk Semibold 600 */
        "section-title": [
          "clamp(1.5rem, 3vw, 2rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
      },
      fontWeight: {
        /* Body text weights */
        body: "400",
        /* Navigation and labels */
        medium: "500",
        /* Semibold for emphasis */
        semibold: "600",
        /* Bold for headings and buttons */
        bold: "700",
      },
      lineHeight: {
        body: "1.7",
        "body-relaxed": "1.8",
        heading: "0.98",
        "heading-tight": "1.05",
      },
      letterSpacing: {
        heading: "-0.03em",
        "heading-tight": "-0.02em",
        "heading-tighter": "-0.025em",
      },
      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.75" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
