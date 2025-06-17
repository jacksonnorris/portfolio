import { createTheme } from '@mui/material/styles';

// Define the base font sizes for each setting
const fontSizes = {
  // We are adding a `body2` property to each size definition
  small: { h1: '3.5rem', h2: '2.5rem', h3: '1.75rem', body1: '0.875rem', body2: '0.75rem' },
  medium: { h1: '4rem', h2: '3rem', h3: '2.125rem', body1: '1rem', body2: '0.875rem' },
  large: { h1: '4.5rem', h2: '3.5rem', h3: '2.5rem', body1: '1.125rem', body2: '1rem' },
};

// This function creates the theme on the fly
export const createCustomTheme = (mode, textSize) => {
  const selectedSizes = fontSizes[textSize] || fontSizes.medium;

  // Base theme settings for light mode
  let theme = createTheme({
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
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700, fontSize: selectedSizes.h1 },
      h2: { fontWeight: 700, fontSize: selectedSizes.h2 },
      h3: { fontWeight: 600, fontSize: selectedSizes.h3 },
      body1: { fontSize: selectedSizes.body1 },
      body2: { fontSize: selectedSizes.body2 },
    },
    components: {
      MuiCard: { styleOverrides: { root: { borderRadius: 12, boxShadow: 'none', border: 'none' } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8, textTransform: 'none' },
          outlinedSecondary: ({ theme: t }) => ({
            '--mui-palette-secondary-main-rgb': t.palette.secondary.main.match(/\d+/g).join(','),
          }),
        },
      },
      MuiChip: { styleOverrides: { root: { borderRadius: 8 } } },
    },
  });
};