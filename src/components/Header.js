import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

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

// Icons
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger Icon

const Header = () => {
  // --- RESPONSIVE LOGIC ---
  const theme = useTheme();
  // `isMobile` will be `true` if the screen width is less than the 'md' breakpoint (900px by default)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };
  
  // --- DESKTOP MENU ---
  const menuDesktop = (
    <Box>
      <Button color="inherit" component={RouterLink} to="/">Home</Button>
      <Button color="inherit" component={RouterLink} to="/map">Map</Button>
    </Box>
  );

  // --- MOBILE MENU ---
  const menuMobile = (
    <Box>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="open navigation menu"
        onClick={handleMenuOpen}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('/')}>Home</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/map')}>Map</MenuItem>
      </Menu>
    </Box>
  );

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'text.primary',
          }}
        >
          Jack Norris | Portfolio
        </Typography>

        {/* If it's a mobile screen, show the hamburger menu. Otherwise, show the desktop menu. */}
        {isMobile ? menuMobile : menuDesktop}

      </Toolbar>
    </AppBar>
  );
};

export default Header;