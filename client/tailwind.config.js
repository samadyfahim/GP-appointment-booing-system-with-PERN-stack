const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", flowbite.content()],

  theme: {
    extend: {},
    colors: {
      primary: "#075985",
      secondary: "#60a5fa",
      transparent: "transparent",
      current: "currentColor",
      blue: {
        light: "#85d7ff",
        DEFAULT: "#1fb6ff",
        dark: "#009eeb",
      },
      green: {
        light: "#34D399",
        DEFAULT: "#059669",
        dark: "#065F46",
      },
      gray: {
        darkest: "#1f2d3d",
        dark: "#3c4858",
        DEFAULT: "#c0ccda",
        light: "#e5e7eb",
        lightest: "#f3f4f6",
      },
      cyan: {
        darkest: "#164e63",
        dark: "#0e7490",
        DEFAULT: "#06b6d4",
        light: "#67e8f9",
        lightest: "#cffafe",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
