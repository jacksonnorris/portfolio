import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createCustomTheme } from '../components/Theme';

export const ThemeContext = createContext({
  toggleTheme: () => {},
  setTextSize: (size) => {},
  mode: 'dark',
  textSize: 'medium',
});

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');
  const [textSize, setTextSize] = useState('medium');

  // Load saved settings from localStorage on initial mount
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) setMode(savedMode);
    const savedTextSize = localStorage.getItem('textSize');
    if (savedTextSize) setTextSize(savedTextSize);
  }, []);

  // Function to toggle the theme
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // Function to handle text size changes
  const handleSetTextSize = (size) => {
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