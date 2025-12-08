/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        maritime: {
          blue: "#1e40af",
          lightBlue: "#60a5fa",
          darkBlue: "#1e3a8a",
          teal: "#0d9488",
        },
      },
    },
  },
  plugins: [],
};
