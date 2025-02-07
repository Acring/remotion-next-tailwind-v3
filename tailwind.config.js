/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: {
          unfocused: "var(--unfocused-border-color)",
          focused: "var(--focused-border-color)",
        },
        button: {
          disabled: "var(--button-disabled-color)",
        },
        text: {
          disabled: "var(--disabled-text-color)",
          subtitle: "var(--subtitle)",
        },
        error: "var(--geist-error)",
      },
      spacing: {
        "geist-quarter": "var(--geist-quarter-pad)",
        "geist-half": "var(--geist-half-pad)",
        geist: "var(--geist-pad)",
      },
      borderRadius: {
        geist: "var(--geist-border-radius)",
      },
      fontFamily: {
        geist: ["var(--geist-font)", "sans-serif"],
      },
      keyframes: {
        spinner: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0.15" },
        },
      },
      animation: {
        spinner: "spinner 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};
