import { createTheme, Theme } from '@mui/material/styles';
import type { ThemeMode, TextSize } from '../types/theme';

interface FontSizeSet {
  h1: string;
  h2: string;
  h3: string;
  body1: string;
  body2: string;
}

// Define the base font sizes for each setting
const fontSizes: Record<TextSize, FontSizeSet> = {
  // We are adding a `body2` property to each size definition
  small: { h1: '3.5rem', h2: '2.5rem', h3: '1.75rem', body1: '0.875rem', body2: '0.75rem' },
  medium: { h1: '4rem', h2: '3rem', h3: '2.125rem', body1: '1rem', body2: '0.875rem' },
  large: { h1: '4.5rem', h2: '3.5rem', h3: '2.5rem', body1: '1.125rem', body2: '1rem' },
};

// The two-font system: an expressive modern display face for the big moments
// (wordmark, section headings) and a clean grotesque for everything else.
const BODY_FONT = '"Instrument Sans", "Helvetica", "Arial", sans-serif';
const DISPLAY_FONT = '"Syne", "Instrument Sans", sans-serif';

// This function creates the theme on the fly
export const createCustomTheme = (mode: ThemeMode, textSize: TextSize): Theme => {
  const selectedSizes = fontSizes[textSize] ?? fontSizes.medium;

  // Base theme settings for light mode. The font family must be set here:
  // createTheme computes every typography variant's styles in this first
  // call, so a fontFamily merged in later never reaches body1, button, etc.
  let theme = createTheme({
    typography: { fontFamily: BODY_FONT },
    palette: {
      mode: 'light',
      primary: { main: '#007BFF' },
      secondary: { main: '#F50057' },
      background: { default: '#f4f6f8', paper: '#ffffff' },
      text: { primary: '#172b4d', secondary: '#5e6c84' },
      action: { hover: 'rgba(0, 0, 0, 0.04)' }
    },
  });

  // If dark mode is selected, merge in the dark mode palette
  if (mode === 'dark') {
    theme = createTheme(theme, {
      palette: {
        mode: 'dark',
        primary: { main: '#00D5FF' },
        secondary: { main: '#FF00A0' },
        background: { default: '#161c24', paper: '#212b36' },
        text: { primary: '#e3e3e3', secondary: '#a9a9a9' },
        divider: 'rgba(145, 158, 171, 0.24)',
        action: { hover: 'rgba(255, 255, 255, 0.08)' }
      },
    });
  }

  // merge in the dynamic typography and common component styles
  return createTheme(theme, {
    typography: {
      h1: { fontFamily: DISPLAY_FONT, fontWeight: 800, fontSize: selectedSizes.h1 },
      h2: { fontFamily: DISPLAY_FONT, fontWeight: 800, fontSize: selectedSizes.h2 },
      h3: { fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: selectedSizes.h3 },
      h4: { fontFamily: DISPLAY_FONT, fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 500 },
      button: { fontWeight: 600 },
      body1: { fontSize: selectedSizes.body1 },
      body2: { fontSize: selectedSizes.body2 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: 'none',
            border: `1px solid ${theme.palette.divider}`,
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          // lineHeight 1.2 removes the tall line box that made labels sit
          // high; zeroing startIcon's default -4px margin removes the left
          // lean. Together they keep icon + label optically centered.
          root: { borderRadius: 999, textTransform: 'none', lineHeight: 1.2 },
          startIcon: { marginLeft: 0 },
          // Padding is 1px heavier on top: most labels have no descenders,
          // so the reserved space under the baseline reads as bottom padding
          // and the label looks high in the pill without this.
          sizeMedium: { padding: '11px 20px 9px' },
          sizeSmall: { padding: '8px 14px 6px' },
          outlined: { borderWidth: '1.5px', '&:hover': { borderWidth: '1.5px' } },
          outlinedSecondary: ({ theme: t }: { theme: Theme }) => ({
            '--mui-palette-secondary-main-rgb': t.palette.secondary.main.match(/\d+/g)?.join(',') ?? '',
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 999 },
          // Same optical correction as the buttons, as a pure visual nudge.
          label: { transform: 'translateY(1px)' },
        },
      },
    },
  });
};
