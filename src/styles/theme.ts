/**
 * AUDIAW Theme System
 * Professional DAW color palette and design tokens
 * Aligned with AUDIAW-DESIGN.md specifications
 */

export const theme = {
  colors: {
    // Surface colors - HSL-based neutral scale for consistent depth hierarchy
    surfaces: {
      void: 'hsl(240, 10%, 6%)',      // #0D0D0F - Deepest background
      level1: 'hsl(240, 9%, 8%)',     // #111115 - Primary background
      level2: 'hsl(240, 10%, 11%)',   // #1A1A21 - Secondary surfaces
      level3: 'hsl(240, 10%, 14%)',   // #22222C - Tertiary surfaces
      level4: 'hsl(240, 10%, 17%)',   // #2C2C39 - Elevated surfaces
      level5: 'hsl(240, 9%, 20%)',    // #363645 - Highest surfaces
      overlay: 'rgba(0, 0, 0, 0.75)', // Modal overlays
      highest: 'hsl(240, 8%, 24%)',   // #3A3A47 - Tooltips, popovers
    },
    // Text colors - Opacity-based for consistent hierarchy
    text: {
      primary: 'rgba(255, 255, 255, 0.92)',   // High emphasis text
      secondary: 'rgba(255, 255, 255, 0.58)', // Medium emphasis text
      tertiary: 'rgba(255, 255, 255, 0.35)',  // Low emphasis text
      ghost: 'rgba(255, 255, 255, 0.18)',     // Disabled/placeholder text
    },
    // Accent color - Primary brand color (corrected from #3b82f6)
    accent: {
      primary: '#3B8BF5',      // Primary accent (NOT #3b82f6)
      primaryHover: '#2563eb', // Hover state
      primaryActive: '#1d4ed8', // Active state
    },
    // Status colors - Semantic feedback colors (corrected values)
    status: {
      success: '#22C55E',  // Success state (NOT #10b981)
      warning: '#F59E0B',  // Warning state
      error: '#EF4444',    // Error state
      record: '#EF4444',   // Recording indicator
      recordDim: '#8B2020', // Dimmed recording state
    },
    // Track type colors
    track: {
      audio: '#3B8BF5',
      midi: '#8b5cf6',
      group: '#22C55E',
      return: '#F59E0B',
      master: '#EF4444',
    },
    // Border colors - Subtle borders for UI separation
    border: {
      default: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(255, 255, 255, 0.12)',
      active: '#3B8BF5',
      focus: '#3B8BF5',
    },
    // Meter colors - Audio level visualization
    meter: {
      low: '#22C55E',
      mid: '#F59E0B',
      high: '#EF4444',
      peak: '#dc2626',
    },
  },
  // Spacing scale - 4px-based system for consistent rhythm
  spacing: {
    // Base spacing units (4px increments)
    xs: 4,    // 4px
    sm: 8,    // 8px
    md: 12,   // 12px
    base: 16, // 16px
    lg: 20,   // 20px
    xl: 24,   // 24px
    '2xl': 32, // 32px
    '3xl': 40, // 40px
    '4xl': 48, // 48px
    
    // Layout-specific dimensions (corrected values)
    trackHeight: 64,
    trackHeightCompact: 48,
    trackHeightExpanded: 96,
    trackHeaderWidth: 216,  // NOT 240px
    transportHeight: 52,    // NOT 56px
    timelineHeight: 32,
    mixerStripWidth: 80,
    browserWidth: 280,
    scrollbarSize: 8,
  },
  // Typography - Inter Variable and Geist Mono with precise scale
  typography: {
    fontFamily: {
      sans: '"Inter Variable", Inter, system-ui, -apple-system, sans-serif',
      mono: '"Geist Mono", "JetBrains Mono", Consolas, monospace',
    },
    // Font size scale (precise px values)
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
      normal: 400,
      medium: 500,
      semibold: 600,
    },
    // Line heights
    lineHeight: {
      tight: 1.2,    // Compact UI elements
      snug: 1.35,    // Dense text blocks
      normal: 1.5,   // Standard text
      relaxed: 1.65, // Comfortable reading
    },
  },
  // Border radius - Consistent rounding (corrected xl value)
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.5rem',    // 8px (NOT 12px)
    full: '9999px',
  },
  // Shadows - Depth and elevation
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
  },
  // Motion - Animation durations and easing functions
  motion: {
    // Durations (precise timing)
    duration: {
      micro: '60ms',    // Instant feedback
      fast: '90ms',     // Quick transitions
      standard: '120ms', // Standard transitions
      moderate: '180ms', // Moderate animations
      slow: '240ms',    // Slow, deliberate animations
    },
    // Easing functions
    easing: {
      out: 'cubic-bezier(0.33, 1, 0.68, 1)',      // Ease-out (decelerating)
      in: 'cubic-bezier(0.32, 0, 0.67, 0)',       // Ease-in (accelerating)
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',   // Standard easing
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring-like bounce
    },
  },
  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 1000,
    modal: 2000,
    tooltip: 3000,
    notification: 4000,
  },
} as const;

export type Theme = typeof theme;

// Helper function to get color with opacity
export const withOpacity = (color: string, opacity: number): string => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

// Made with Bob