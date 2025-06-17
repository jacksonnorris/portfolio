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

import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const theme = useTheme();
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
  
  const menuDesktop = (
    <Box>
      <Button 
        color="inherit" 
        component={RouterLink} 
        to="/"
        sx={{ fontSize: '1.25rem', fontWeight: 'bold', px: 2 }}
      >
        Home
      </Button>
      <Button 
        color="inherit" 
        component={RouterLink} 
        to="/map"
        sx={{ fontSize: '1.25rem', fontWeight: 'bold', px: 2 }}
      >
        Map
      </Button>
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
        <MenuItem onClick={() => handleMenuItemClick('/')}>Home</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/map')}>Map</MenuItem>
      </Menu>
    </Box>
  );

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
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