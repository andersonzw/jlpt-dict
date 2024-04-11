/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-red": {
          400: "#9C1A28",
          300: "#ce6c76",
        },
      },
    },
  },
  plugins: [],
};
