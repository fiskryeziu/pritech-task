/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: "#E5E5EA",
        "border-strong": "#C7C7CC",
        brand: "#111111",
        success: "#34C759",
        warning: "#FFCC00",
        danger: "#FF3B30",
        info: "#5AC8FA",
      },
    },
  },
  plugins: [],
};
