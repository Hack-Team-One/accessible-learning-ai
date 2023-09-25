import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '2.5': '10px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Define button themes
      button: {
        primary: {
          backgroundColor: '#007bff', // Primary button color
          // Add other styles for primary button
        },
        secondary: {
          backgroundColor: '#6c757d', // Secondary button color
          // Add other styles for secondary button
        },
      },
      // Define input themes
      input: {
        default: {
          borderColor: '#ced4da', // Default input border color
          // Add other default styles for input
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
export default config;
