/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(223.39, 100%, 52.55%)",
      },
      borderRadius: {
        sm: "0.5rem",
        DEFAULT: "1rem",
        lg: "1.5rem",
      },
    },
  },
  plugins: [],
};
