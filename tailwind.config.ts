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
        // Original space-portfolio colors
        'bg-base': '#030014',
        'bg-surface': '#0d0620',
        'bg-elevated': '#1a0b3a',
        'text-primary': '#ffffff',
        'text-secondary': '#c7c3d3',
        'border': '#2A0E61',
        'accent-primary': '#7042f8',
        'accent-secondary': '#a855f7',
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
