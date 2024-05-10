/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-red": {
          100: "#ffcad2",
          200: "#f1959a",
          300: "#e76b72",
          400: "#e85c6b",
          500: "#f82b35",
          600: "#e91e34",
        },
        "primary-black": "#313131",
      },
    },
  },
  plugins: [],
};
