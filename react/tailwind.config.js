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
    },
  },
  plugins: [flowbite],
};
