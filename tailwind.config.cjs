/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#E0DFDD",
        primary: "#0E0E0E",
        secondary: "#7000FF",
        secondaryContrast: "#B08CEC",
      },
      borderRadius: 0,
      fontFamily: {
        title: "Merriweather-sans",
        text: "Raleway-regular",
        button: "Raleway-semibold",
      },
      fontSize: {
        h1: "3rem",
        h2: "2rem",
        h3: "0.9",
        Xlh1: "5rem",
        Xlh2: "4.5rem",
        Xlh3: "1.5rem",
      },
      spacing: {
        container: "4rem",
      },
    },
  },
  plugins: [],
};
