/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(180, 75%, 40%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(30, 85%, 55%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        background: "hsl(240, 60%, 95%)",
        text: "hsl(210, 50%, 20%)",
        foreground: "hsl(210, 50%, 20%)",
        card: {
          DEFAULT: "hsl(30, 100%, 96%)",
          foreground: "hsl(210, 50%, 20%)",
        },
        popover: {
          DEFAULT: "hsl(180, 75%, 95%)",
          foreground: "hsl(210, 50%, 20%)",
        },
        muted: {
          DEFAULT: "hsl(0, 0%, 85%)",
          foreground: "hsl(0, 0%, 40%)",
        },
        accent: {
          DEFAULT: "hsl(120, 50%, 70%)",
          foreground: "hsl(210, 50%, 20%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 65%, 55%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        border: "hsl(0, 0%, 80%)",
        input: "hsl(0, 0%, 98%)",
        ring: "hsl(180, 75%, 50%)",
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
