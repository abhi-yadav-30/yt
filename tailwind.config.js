// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "420px", // Your custom 420px breakpoint
      },
    },
  },
  plugins: [],
};
