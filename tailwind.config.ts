import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14F195',
        secondary: '#1e1e1e',
      },
    },
  },
  plugins: [],
}
export default config
