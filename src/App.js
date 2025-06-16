import React from 'react';
import portfolioData from './data/portfolioData.json';

import Projects from './components/Projects';
import ContactForm from './components/Contact';

import { CssBaseline, Container, Box, Typography, Link } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        {/* HEADER */}
        <Box component="header" sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h1" component="h1">
            {portfolioData.name}
          </Typography>
          <Typography variant="h5" component="p" color="text.secondary">
            {portfolioData.title}
          </Typography>
        </Box>

        {/* MAIN CONTENT */}
        <main>
          <Projects />
          <ContactForm />
        </main>

        {/* FOOTER */}
        <Box component="footer" sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Connect with me: {' '}
            <Link href={portfolioData.contact.linkedin} target="_blank" rel="noopener">LinkedIn</Link> | {' '}
            <Link href={portfolioData.contact.github} target="_blank" rel="noopener">GitHub</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default App;