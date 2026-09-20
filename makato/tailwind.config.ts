import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* shadcn/ui tokens */
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* Makato palette - driven by the CSS variables in app/globals.css */
        canvas: "hsl(var(--canvas))",
        surface: "hsl(var(--surface))",
        ink: "hsl(var(--ink))",
        subtle: "hsl(var(--subtle))",
        faint: "hsl(var(--faint))",
        ghost: "hsl(var(--ghost))",
        slate2: "hsl(var(--slate2))",
        slate3: "hsl(var(--slate3))",
        slate4: "hsl(var(--slate4))",
        line: "hsl(var(--line))",
        line2: "hsl(var(--line2))",
        chip: "hsl(var(--chip))",
        chip2: "hsl(var(--chip2))",
        chipHover: "hsl(var(--chip-hover))",
        field: "hsl(var(--field))",
        fieldline: "hsl(var(--fieldline))",
        dash: "hsl(var(--dash))",
        dashBg: "hsl(var(--dash-bg))",
        hint: "hsl(var(--hint))",
        brand: "hsl(var(--brand))",
        brandText: "hsl(var(--brand-text))",
        brandDark: "hsl(var(--brand-dark))",
        brandSoft: "hsl(var(--brand-soft))",
        brandSoft2: "hsl(var(--brand-soft-2))",
        brandLine: "hsl(var(--brand-line))",
        good: "hsl(var(--good))",
        logoTile: "hsl(var(--logo-tile))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "3xl": "26px",
      },
      fontFamily: {
        display: ["var(--font-comfortaa)", "cursive"],
        sans: ["var(--font-quicksand)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        thumb: "var(--shadow-thumb)",
        pill: "var(--shadow-pill)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
