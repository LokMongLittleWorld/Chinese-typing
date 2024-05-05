/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hanyi: "Hanyi",
        seaSpray: "SeaSpray",
        test: "Test",
        nunito: "Nunito",
        glyph: "Glyph",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        typing: {
          "0": { opacity: 1 },
          "50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        typing: "typing 0.7s step-start infinite alternate",
      },
    },
  },
  plugins: [flowbite],
};
