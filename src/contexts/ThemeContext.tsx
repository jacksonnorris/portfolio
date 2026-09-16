import React, { createContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createCustomTheme } from '../components/Theme';
import type { ThemeMode, TextSize } from '../types/theme';

interface ThemeContextValue {
  toggleTheme: () => void;
  setTextSize: (size: TextSize) => void;
  mode: ThemeMode;
  textSize: TextSize;
}

export const ThemeContext = createContext<ThemeContextValue>({
  toggleTheme: () => {},
  setTextSize: () => {},
  mode: 'dark',
  textSize: 'medium',
});

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === 'light' || value === 'dark';

const isTextSize = (value: string | null): value is TextSize =>
  value === 'small' || value === 'medium' || value === 'large';

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [textSize, setTextSize] = useState<TextSize>('medium');

  // Load saved settings from localStorage on initial mount
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (isThemeMode(savedMode)) setMode(savedMode);
    const savedTextSize = localStorage.getItem('textSize');
    if (isTextSize(savedTextSize)) setTextSize(savedTextSize);
  }, []);

  // Function to toggle the theme
  const toggleTheme = () => {
    const newMode: ThemeMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // Function to handle text size changes
  const handleSetTextSize = (size: TextSize) => {
    setTextSize(size);
    localStorage.setItem('textSize', size);
  };

  // The theme is  dynamically created based on mode and textSize
  const theme = useMemo(
    () => createCustomTheme(mode, textSize),
    [mode, textSize]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode, setTextSize: handleSetTextSize, textSize }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
