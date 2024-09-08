/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ['"Plus Jakarta Sans"', "sans-serif"],
    },
    extend: {
      backgroundImage: {
        parallax: 'url("../../public/bgImg2.jgp")',
      },
      animation: {
        clouds: "clouds 8s infinite ease-in-out",
        sunshine: "sunshines 2s infinite",
        fadein: "fadein 1.5s ease-in-out",
        fadeinshow: "fadeinshow 1.5s ease-in-out forwards",
      },
      keyframes: {
        clouds: {
          "0%": { transform: "translateX(15px)" },
          "50%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(15px)" },
        },
        sunshines: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
