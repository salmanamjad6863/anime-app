/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./HomeScreen.tsx",
    "./Auth.tsx",
    "./UsersPage.tsx",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#111827",
        foreground: "#f9fafb",
        "gray-900": "#111827",
        "gray-800": "#1f2937",
        "gray-700": "#374151",
        "gray-600": "#4b5563",
        "gray-500": "#6b7280",
        "gray-400": "#9ca3af",
        "gray-300": "#d1d5db",
        "blue-600": "#2563eb",
        "blue-500": "#3b82f6",
        "blue-400": "#60a5fa",
        "yellow-500": "#eab308",
      },
    },
  },
  plugins: [],
};
