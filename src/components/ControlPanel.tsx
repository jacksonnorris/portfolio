import React, { useState, useContext, MouseEvent } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import type { TextSize } from '../types/theme';

import { Box, Paper, IconButton, Tooltip, ToggleButtonGroup, ToggleButton, Fab, Typography, Divider } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { motion, AnimatePresence } from 'framer-motion';

// The panel pops from the FAB's corner with a springy overshoot, and its
// rows follow with a small stagger.
const panelVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 380,
      damping: 24,
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
  exit: { opacity: 0, scale: 0.85, y: 10, transition: { duration: 0.15 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 26 } },
};

const ControlPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, toggleTheme, textSize, setTextSize } = useContext(ThemeContext);

  const handleTextSizeChange = (_event: MouseEvent<HTMLElement>, newSize: TextSize | null) => {
    if (newSize !== null) {
      setTextSize(newSize);
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="settings-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin: 'bottom right', marginBottom: 16 }}
          >
            <Paper
              elevation={4}
              sx={{
                p: 2,
                borderRadius: 4,
                bgcolor: 'background.paper',
                opacity: 0.97,
                backdropFilter: 'blur(8px)',
                width: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Box component={motion.div} variants={rowVariants} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="overline" sx={{ minWidth: '50px', color: 'text.secondary' }}>
                  Theme
                </Typography>
                <Tooltip title={`Toggle ${mode === 'dark' ? 'light' : 'dark'} mode`}>
                  <IconButton
                    onClick={toggleTheme}
                    size="small"
                    sx={{
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'rotate(40deg) scale(1.15)' },
                    }}
                  >
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Tooltip>
              </Box>

              <Divider component={motion.hr} variants={rowVariants} />

              <Box component={motion.div} variants={rowVariants} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="overline" sx={{ minWidth: '50px', color: 'text.secondary' }}>
                  Text
                </Typography>
                <ToggleButtonGroup
                  value={textSize}
                  exclusive
                  onChange={handleTextSizeChange}
                  aria-label="text size"
                  size="small"
                  sx={{
                    bgcolor: 'action.hover',
                    borderRadius: 999,
                    p: 0.5,
                    '& .MuiToggleButtonGroup-grouped': {
                      border: 0,
                      borderRadius: '999px !important',
                      px: 1.75,
                      py: 0.5,
                      fontWeight: 700,
                      '&.Mui-selected': {
                        bgcolor: 'background.paper',
                        boxShadow: 2,
                        '&:hover': { bgcolor: 'background.paper' },
                      },
                    },
                  }}
                >
                  <ToggleButton value="small" aria-label="small text">S</ToggleButton>
                  <ToggleButton value="medium" aria-label="medium text">M</ToggleButton>
                  <ToggleButton value="large" aria-label="large text">L</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      <Tooltip title={isOpen ? 'Close Settings' : 'Open Settings'}>
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
          <Fab color="primary" aria-label="settings" onClick={() => setIsOpen(!isOpen)}>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ display: 'inline-flex' }}
            >
              {isOpen ? <CloseIcon /> : <SettingsIcon />}
            </motion.span>
          </Fab>
        </motion.div>
      </Tooltip>
    </Box>
  );
};

export default ControlPanel;
