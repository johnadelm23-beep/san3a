import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#080808',
          surface: '#111111',
          card: '#141414',
          border: '#1E1E1E',
          'border-light': '#2A2A2A',
          fg: '#F4F4F0',
          muted: '#8E8E8E',
          darkmuted: '#404040',
          accent: '#D94A26',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Space Mono', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        widest: '0.25em',
      },
      lineHeight: {
        heading: '0.95',
        tight: '1.1',
      }
    },
  },
  plugins: [],
}
export default config
