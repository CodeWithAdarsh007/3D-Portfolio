import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode base
        'bg-base': '#05060A',
        'bg-surface': '#0B0F1A',
        'bg-elevated': '#141A2B',
        // Text
        'text-primary': '#E8EDF7',
        'text-secondary': '#8A94AD',
        'text-tertiary': '#4A5470',
        // Border
        'border': 'rgba(232, 237, 247, 0.08)',
        'border-strong': 'rgba(232, 237, 247, 0.16)',
        // Accents
        'accent-primary': '#00D9FF',
        'accent-secondary': '#7C5CFF',
        'accent-tertiary': '#22FF88',
        'accent-warm': '#FFB84D',
        // Accent soft
        'accent-primary-soft': 'rgba(0, 217, 255, 0.12)',
        'accent-secondary-soft': 'rgba(124, 92, 255, 0.12)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
