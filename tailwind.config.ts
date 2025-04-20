import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
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
        // Palette de couleurs exceptionnelles pour DocFinder
        docfinder: {
          // Couleur principale - un violet-bleu élégant
          primary: "#7c5cff",
          "primary-light": "#9d85ff",
          "primary-dark": "#6247cc",

          // Couleur secondaire - un turquoise apaisant
          secondary: "#3ecfaf",
          "secondary-light": "#6eeacf",
          "secondary-dark": "#2ba58c",

          // Couleur d'accentuation - un rose doux
          accent: "#ff7eb6",
          "accent-light": "#ffa5cd",
          "accent-dark": "#e05c94",

          // Couleurs de fond
          "bg-gradient-start": "#f0f4ff",
          "bg-gradient-end": "#f9f4ff",

          // Couleurs pour les états
          success: "#4ade80",
          warning: "#fbbf24",
          error: "#f87171",
          info: "#60a5fa",

          // Couleurs neutres
          "neutral-50": "#f8fafc",
          "neutral-100": "#f1f5f9",
          "neutral-200": "#e2e8f0",
          "neutral-300": "#cbd5e1",
          "neutral-400": "#94a3b8",
          "neutral-500": "#64748b",
          "neutral-600": "#475569",
          "neutral-700": "#334155",
          "neutral-800": "#1e293b",
          "neutral-900": "#0f172a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      boxShadow: {
        elegant: "0 10px 25px -3px rgba(124, 92, 255, 0.1), 0 4px 6px -2px rgba(124, 92, 255, 0.05)",
        "card-hover": "0 20px 25px -5px rgba(124, 92, 255, 0.1), 0 10px 10px -5px rgba(124, 92, 255, 0.04)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-elegant": "linear-gradient(135deg, #7c5cff 0%, #3ecfaf 100%)",
        "gradient-soft": "linear-gradient(135deg, #f0f4ff 0%, #f9f4ff 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
