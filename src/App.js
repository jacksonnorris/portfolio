import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { CssBaseline, Container, Box } from '@mui/material';

import Header from './components/Header';
import HomePage from './components/HomePage';
import Map from './components/Map';
import ControlPanel from './components/ControlPanel';

function App() {
  return (
    <>
      <CssBaseline /> 
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Header />
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