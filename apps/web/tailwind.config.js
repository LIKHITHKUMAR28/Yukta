/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Yukta EduOS Design System Color Palette
        navy: {
          DEFAULT: '#f9f9fc', // Base background / Surface
          dark: '#f3f3f6',    // Surface Container Low
        },
        violet: {
          DEFAULT: '#00694F', // Primary Deep Emerald Green
          dark: '#00694F',    // Primary Container
        },
        lavender: {
          DEFAULT: '#00A37B', // Secondary Emerald Tint
          light: '#7cf9cb',   // Secondary Container (Mint)
        },
        midnight: {
          DEFAULT: '#ffffff', // Surface Container Lowest (Base Card bg)
          card: '#ffffff',
          border: '#eeeef0',  // Surface Container border
        },
        ghost: '#f3f3f6',
        steel: '#6f7a74',     // Muted Text / Outline
        success: '#00A37B',
        warning: '#fbecc0',
        danger: '#ba1a1a',    // Error color
        charcoal: '#1A1C1E',  // On-Surface (Main Text)

        // Uploaded Design System Tokens
        "on-secondary-fixed": "#002116",
        "primary": "#004f3a",
        "primary-fixed-dim": "#83d7b6",
        "surface-container-highest": "#e2e2e5",
        "on-secondary-container": "#007255",
        "error": "#ba1a1a",
        "background": "#f9f9fc",
        "outline-variant": "#bec9c2",
        "surface-dim": "#dadadc",
        "on-primary-fixed-variant": "#00513c",
        "surface": "#f9f9fc",
        "on-primary": "#ffffff",
        "secondary-fixed": "#7cf9cb",
        "surface-container-low": "#f3f3f6",
        "on-primary-fixed": "#002116",
        "on-background": "#1A1C1E",
        "tertiary-fixed-dim": "#bdcac1",
        "inverse-surface": "#2f3133",
        "on-error": "#ffffff",
        "inverse-on-surface": "#f0f0f3",
        "on-primary-container": "#92e5c4",
        "surface-container": "#eeeef0",
        "tertiary-container": "#535f58",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e8e8ea",
        "on-tertiary-container": "#cbd8d0",
        "on-tertiary": "#ffffff",
        "secondary": "#006c50",
        "on-surface-variant": "#3f4944",
        "secondary-container": "#7cf9cb",
        "on-secondary": "#ffffff",
        "secondary-fixed-dim": "#5ddcb0",
        "on-error-container": "#93000a",
        "on-tertiary-fixed": "#131e19",
        "on-secondary-fixed-variant": "#00513c",
        "inverse-primary": "#83d7b6",
        "on-tertiary-fixed-variant": "#3e4943",
        "error-container": "#ffdad6",
        "tertiary": "#3c4741",
        "outline": "#6f7a74",
        "surface-variant": "#e2e2e5",
        "primary-container": "#00694f",
        "surface-bright": "#f9f9fc",
        "on-surface": "#1A1C1E",
        "surface-tint": "#066b51",
        "tertiary-fixed": "#d9e6dd",
        "primary-fixed": "#9ff3d2"
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],    // Outfit across all levels
        display: ['Outfit', 'sans-serif'], // Outfit across all levels
        mono: ['JetBrains Mono', 'monospace'],
        "headline-md": ["Outfit"],
        "body-md": ["Outfit"],
        "display-lg-mobile": ["Outfit"],
        "display-lg": ["Outfit"],
        "label-md": ["Outfit"],
        "headline-sm": ["Outfit"],
        "button": ["Outfit"],
        "body-lg": ["Outfit"],
        "body-sm": ["Outfit"]
      },
      borderRadius: {
        'sm': '0.25rem', // 4px
        'md': '0.375rem',
        'lg': '0.75rem',
        'xl': '1.5rem',
        'DEFAULT': '0.5rem', // 8px (Standard Components)
        'container': '1rem', // 16px (Containers, Modals, Section blocks)
        'card': '1rem',      // 16px (Course Cards & general cards)
      },
      spacing: {
        "container-max": "1440px",
        "unit": "8px",
        "margin-desktop": "40px",
        "margin-mobile": "16px",
        "gutter": "24px"
      },
      fontSize: {
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
        "button": ["16px", {"lineHeight": "24px", "fontWeight": "600"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}]
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-subtle': 'pulse-subtle 3s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
