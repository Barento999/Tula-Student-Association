/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0B141A",
        primary: "#E9EDEF",
        secondary: "#8696A0",
        muted: "#667781",
        "whatsapp-green": "#25D366",
        "unread-badge": "#00A884",
        icons: "#AEBAC1",
        card: "#111b21",
        border: "#2a3942",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 8s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        gradient: "gradient 3s ease infinite",
        bounce: "bounce 2s infinite",
        "scale-in": "scaleIn 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
