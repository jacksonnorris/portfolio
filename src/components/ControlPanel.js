import React, { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

import { Box, Paper, IconButton, Tooltip, ToggleButtonGroup, ToggleButton, Fab, Collapse, Typography, Divider } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ControlPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, toggleTheme, textSize, setTextSize } = useContext(ThemeContext);

  const handleTextSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setTextSize(newSize);
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Collapse in={isOpen} sx={{ mb: 2 }}>
        <Paper
          elevation={4}
          sx={{
            p: 2,
            borderRadius: 4,
            bgcolor: 'background.paper',
            opacity: 0.95,
            backdropFilter: 'blur(8px)',
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="overline" sx={{ minWidth: '50px', color: 'text.secondary' }}>
              Theme
            </Typography>
            <Tooltip title={`Toggle ${mode === 'dark' ? 'light' : 'dark'} mode`}>
              <IconButton onClick={toggleTheme} size="small">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Box>
          
          <Divider /> 
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="overline" sx={{ minWidth: '50px', color: 'text.secondary' }}>
              Text
            </Typography>
            <ToggleButtonGroup
              value={textSize}
              exclusive
              onChange={handleTextSizeChange}
              aria-label="text size"
              size="small"
            >
              <ToggleButton value="small" aria-label="small text" sx={{p: '4px 10px', fontWeight: 'bold'}}>S</ToggleButton>
              <ToggleButton value="medium" aria-label="medium text" sx={{p: '4px 10px', fontWeight: 'bold'}}>M</ToggleButton>
              <ToggleButton value="large" aria-label="large text" sx={{p: '4px 10px', fontWeight: 'bold'}}>L</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Paper>
      </Collapse>

      <Tooltip title={isOpen ? "Close Settings" : "Open Settings"}>
        <Fab color="primary" aria-label="settings" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon /> : <SettingsIcon />}
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default ControlPanel;