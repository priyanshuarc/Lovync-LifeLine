module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
      },
       fontFamily: {
        jejugothic: ["Jeju Gothic", "sans-serif"],
        logo: ["GoboCapsItalic", "sans-serif"], // 👈 added font here 
       },
    },
  },
  plugins: [],
};
