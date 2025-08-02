import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // iOS Design System
        "ios-surface1": "hsl(var(--ios-surface-1))",
        "ios-surface2": "hsl(var(--ios-surface-2))",
        "ios-surface3": "hsl(var(--ios-surface-3))",
        "ios-glass": "hsl(var(--ios-glass))",
        // Piet Colors
        "piet-red": "hsl(var(--piet-red))",
        "piet-yellow": "hsl(var(--piet-yellow))",
        "piet-green": "hsl(var(--piet-green))",
        "piet-cyan": "hsl(var(--piet-cyan))",
        "piet-blue": "hsl(var(--piet-blue))",
        "piet-magenta": "hsl(var(--piet-magenta))",
        "piet-black": "hsl(var(--piet-black))",
        "piet-white": "hsl(var(--piet-white))",
        "piet-light-red": "hsl(var(--piet-light-red))",
        "piet-light-yellow": "hsl(var(--piet-light-yellow))",
        "piet-light-green": "hsl(var(--piet-light-green))",
        "piet-light-cyan": "hsl(var(--piet-light-cyan))",
        "piet-light-blue": "hsl(var(--piet-light-blue))",
        "piet-light-magenta": "hsl(var(--piet-light-magenta))",
        "piet-dark-red": "hsl(var(--piet-dark-red))",
        "piet-dark-yellow": "hsl(var(--piet-dark-yellow))",
        "piet-dark-green": "hsl(var(--piet-dark-green))",
        "piet-dark-cyan": "hsl(var(--piet-dark-cyan))",
        "piet-dark-blue": "hsl(var(--piet-dark-blue))",
        "piet-dark-magenta": "hsl(var(--piet-dark-magenta))",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          from: {
            opacity: "0",
            transform: "scale(0.9)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "slide-up": {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "spring": {
          from: {
            opacity: "0",
            transform: "scale(0.8) translateY(40px)",
          },
          to: {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "spring": "spring 0.6s var(--spring)",
      },
      boxShadow: {
        "ios-1": "var(--shadow-ios-1)",
        "ios-2": "var(--shadow-ios-2)",
        "ios-3": "var(--shadow-ios-3)",
        "canvas": "var(--shadow-canvas)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
