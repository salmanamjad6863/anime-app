/**
 * Anime Village / anime-world color theme
 * Matches the website: dark gray background, blue accent
 */
export const theme = {
  colors: {
    background: '#111827',
    backgroundDark: '#0a0a0a',
    foreground: '#f9fafb',
    gray: {
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    blue: {
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
    },
    yellow: {
      500: '#eab308',
    },
  },
} as const;

export type Theme = typeof theme;
