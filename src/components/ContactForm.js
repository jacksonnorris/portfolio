import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';

function ContactForm() {
  const [state, handleSubmit] = useForm("xovwwzaa");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setOpenSnackbar(true);
    }
  }, [state.succeeded]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box component="section" id="contact" sx={{ py: 8, px: 2 }}>
      <Typography variant="h2" component="h2" align="center" gutterBottom>
        Contact Me
      </Typography>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ maxWidth: '600px', mx: 'auto' }}
      >
        <TextField
          fullWidth
          required
          id="email"
          type="email"
          name="email"
          label="Your Email"
          margin="normal"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        
        <TextField
          fullWidth
          required
          id="message"
          name="message"
          label="Message"
          multiline
          rows={4}
          margin="normal"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
        
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          disabled={state.submitting}
          sx={{ mt: 2 }}
        >
          Send Message
        </Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Thanks for reaching out! I'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactForm;