import React from 'react';

import { CssBaseline, Container, Box } from '@mui/material';

import Header from './components/Header';
import Projects from './components/Projects';
import ContactForm from './components/Contact';

function App() {
  return (
    <>
      <CssBaseline /> 
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Header />
          <main>
            <Projects />
            <ContactForm />
          </main>
        </Container>
      </Box>
    </>
  );
}

export default App;