import React, { useState, MouseEvent } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Map', to: '/map' },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const menuDesktop = (
    <Box>
      {NAV_ITEMS.map(({ label, to }) => (
        <Button
          key={to}
          color="inherit"
          component={RouterLink}
          to={to}
          sx={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            px: 2,
            color: pathname === to ? 'primary.main' : 'inherit',
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );

  const menuMobile = (
    <Box>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="open navigation menu"
        onClick={handleMenuOpen}
      >
        <MenuIcon sx={{ fontSize: '2rem' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{ '& .MuiMenuItem-root': { fontSize: '1.1rem' } }}
      >
        {NAV_ITEMS.map(({ label, to }) => (
          <MenuItem key={to} selected={pathname === to} onClick={() => handleMenuItemClick(to)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={(t) => ({
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: alpha(t.palette.background.default, 0.8),
        backdropFilter: 'blur(12px)',
      })}
    >
      <Toolbar sx={{ height: '80px' }}>
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'text.primary',
          }}
        >
          Jack Norris
        </Typography>

        {isMobile ? menuMobile : menuDesktop}

      </Toolbar>
    </AppBar>
  );
};

export default Header;
