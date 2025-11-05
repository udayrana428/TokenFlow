/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "Delius", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#6366F1", // Light Indigo
          DEFAULT: "#4F46E5", // Main Indigo
          dark: "#4338CA", // Dark Indigo
        },
        secondary: {
          light: "#FFD966", // Light Yellow (Optimism & Energy)
          DEFAULT: "#FFC107", // Gold Yellow (Luxury & Value)
          dark: "#FFA000", // Dark Gold (Strength & Confidence)
        },
        accent: {
          light: "#73F9D2", // Teal (Highlight Features)
          DEFAULT: "#00E5A8", // Vibrant Teal (Modern Touch)
          dark: "#00B388", // Deep Teal (Calm & Stability)
        },
        background: {
          light: "#F4F9FF", // Light Blue Tint (Clean Background)
          DEFAULT: "#E3F2FD", // Very Light Blue (Focus & Simplicity)
          dark: "#10192A", // Midnight Navy (Dark Mode Background)
        },
        error: {
          DEFAULT: "#F44336", // Red for error states
        },
        success: {
          DEFAULT: "#4CAF50", // Green for success states
        },
        warning: {
          DEFAULT: "#FFC107", // Yellow for warnings
        },
        neutral: {
          light: "#F5F5F5", // Light Gray
          DEFAULT: "#9E9E9E", // Medium Gray
          dark: "#616161", // Dark Gray
        },
      },
    },
  },
  plugins: [],
};
