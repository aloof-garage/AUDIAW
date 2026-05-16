/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(255, 255, 255, 0.92)',
        secondary: 'rgba(255, 255, 255, 0.58)',
        tertiary: 'rgba(255, 255, 255, 0.35)',
        ghost: 'rgba(255, 255, 255, 0.18)',
        // Surface colors - HSL-based neutral scale
        surface: {
          void: 'hsl(240, 10%, 6%)',
          1: 'hsl(240, 9%, 8%)',
          2: 'hsl(240, 10%, 11%)',
          3: 'hsl(240, 10%, 14%)',
          4: 'hsl(240, 10%, 17%)',
          5: 'hsl(240, 9%, 20%)',
          level1: 'hsl(240, 9%, 8%)',
          level2: 'hsl(240, 10%, 11%)',
          level3: 'hsl(240, 10%, 14%)',
          level4: 'hsl(240, 10%, 17%)',
          level5: 'hsl(240, 9%, 20%)',
          overlay: 'rgba(0, 0, 0, 0.75)',
          highest: 'hsl(240, 8%, 24%)',
        },
        // Text colors - Opacity-based
        text: {
          primary: 'rgba(255, 255, 255, 0.92)',
          secondary: 'rgba(255, 255, 255, 0.58)',
          tertiary: 'rgba(255, 255, 255, 0.35)',
          ghost: 'rgba(255, 255, 255, 0.18)',
        },
        // Accent color
        accent: {
          DEFAULT: '#3B8BF5',
          primary: '#3B8BF5',
          hover: '#2563eb',
          active: '#1d4ed8',
        },
        // Status colors
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          record: '#EF4444',
          'record-dim': '#8B2020',
        },
        // Border colors
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.12)',
          active: '#3B8BF5',
          focus: '#3B8BF5',
        },
        // Track type colors
        track: {
          audio: '#3B8BF5',
          midi: '#8b5cf6',
          group: '#22C55E',
          return: '#F59E0B',
          master: '#EF4444',
        },
        // Meter colors
        meter: {
          low: '#22C55E',
          mid: '#F59E0B',
          high: '#EF4444',
          peak: '#dc2626',
        },
      },
      // Font families
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      // Font sizes - Precise scale
      fontSize: {
        '2xs': '0.5625rem',  // 9px
        xs: '0.625rem',      // 10px
        sm: '0.6875rem',     // 11px
        base: '0.75rem',     // 12px
        md: '0.8125rem',     // 13px
        lg: '0.875rem',      // 14px
        xl: '1rem',          // 16px
        '2xl': '1.25rem',    // 20px
        '3xl': '1.75rem',    // 28px
      },
      // Font weights (removed bold 700)
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      // Line heights
      lineHeight: {
        tight: '1.2',
        snug: '1.35',
        normal: '1.5',
        relaxed: '1.65',
      },
      // Spacing scale - 4px-based
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        base: '16px',
        lg: '20px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '40px',
        '4xl': '48px',
      },
      // Border radius (corrected xl value)
      borderRadius: {
        sm: '0.25rem',   // 4px
        md: '0.375rem',  // 6px
        lg: '0.5rem',    // 8px
        xl: '0.5rem',    // 8px (NOT 12px)
        full: '9999px',
      },
      // Animation durations
      transitionDuration: {
        micro: '60ms',
        fast: '90ms',
        standard: '120ms',
        moderate: '180ms',
        slow: '240ms',
      },
      // Animation timing functions
      transitionTimingFunction: {
        out: 'cubic-bezier(0.33, 1, 0.68, 1)',
        in: 'cubic-bezier(0.32, 0, 0.67, 0)',
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

// Made with Bob
