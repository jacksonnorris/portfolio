import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { alpha } from '@mui/material/styles';

import { CssBaseline, Container, Box } from '@mui/material';

import Header from './components/Header';
import HomePage from './components/HomePage';
import Map from './components/Map';
import ControlPanel from './components/ControlPanel';

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={(theme) => ({
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
          // Full-bleed color wash at the top of the page, behind the header
          // and hero. It lives here rather than on the hero so it spans the
          // whole viewport instead of stopping at the container's edges.
          backgroundImage: `radial-gradient(1000px 540px at 12% -5%, ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === 'dark' ? 0.14 : 0.09
          )}, transparent 60%), radial-gradient(900px 500px at 88% -8%, ${alpha(
            theme.palette.secondary.main,
            theme.palette.mode === 'dark' ? 0.11 : 0.07
          )}, transparent 60%)`,
          backgroundRepeat: 'no-repeat',
        })}
      >
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </Container>
      </Box>
      <ControlPanel />
    </>
  );
}

export default App;
