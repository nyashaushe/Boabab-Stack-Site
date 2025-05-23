/** @type {import('tailwindcss').Config} */
module.exports = { // Changed from export default to module.exports for CommonJS compatibility with Next.js
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Added for potential app router usage
    "./src/**/*.{js,ts,jsx,tsx}", // Kept existing src path for now, can be reviewed later
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}