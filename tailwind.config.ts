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
				ios: {
					surface1: 'hsl(var(--ios-surface-1))',
					surface2: 'hsl(var(--ios-surface-2))',
					surface3: 'hsl(var(--ios-surface-3))',
					glass: 'hsl(var(--ios-glass))',
					'glass-border': 'hsl(var(--ios-glass-border))'
				}
			},
			boxShadow: {
				'ios-1': 'var(--shadow-ios-1)',
				'ios-2': 'var(--shadow-ios-2)',
				'ios-3': 'var(--shadow-ios-3)',
				'canvas': 'var(--shadow-canvas)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
			},
			backdropBlur: {
				'ios': '20px'
			},
			animation: {
				'spring': 'spring 0.5s var(--spring)',
				'fade-up': 'fadeUp 0.5s var(--ease-ios)',
				'scale-in': 'scaleIn 0.3s var(--spring)',
				'slide-up': 'slideUp 0.4s var(--ease-ios)'
			},
			keyframes: {
				spring: {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				fadeUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
