import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				piet: {
					red: 'hsl(var(--piet-red))',
					yellow: 'hsl(var(--piet-yellow))',
					green: 'hsl(var(--piet-green))',
					cyan: 'hsl(var(--piet-cyan))',
					blue: 'hsl(var(--piet-blue))',
					magenta: 'hsl(var(--piet-magenta))',
					black: 'hsl(var(--piet-black))',
					white: 'hsl(var(--piet-white))',
					'light-red': 'hsl(var(--piet-light-red))',
					'light-yellow': 'hsl(var(--piet-light-yellow))',
					'light-green': 'hsl(var(--piet-light-green))',
					'light-cyan': 'hsl(var(--piet-light-cyan))',
					'light-blue': 'hsl(var(--piet-light-blue))',
					'light-magenta': 'hsl(var(--piet-light-magenta))',
					'dark-red': 'hsl(var(--piet-dark-red))',
					'dark-yellow': 'hsl(var(--piet-dark-yellow))',
					'dark-green': 'hsl(var(--piet-dark-green))',
					'dark-cyan': 'hsl(var(--piet-dark-cyan))',
					'dark-blue': 'hsl(var(--piet-dark-blue))',
					'dark-magenta': 'hsl(var(--piet-dark-magenta))'
				},
				canvas: {
					background: 'hsl(var(--canvas-background))',
					grid: 'hsl(var(--grid-line))'
				}
			},
			boxShadow: {
				'canvas': 'var(--canvas-shadow)'
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'spring': 'var(--transition-spring)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
