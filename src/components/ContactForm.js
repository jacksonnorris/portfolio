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
    <Box component="section" id="contact" sx={{ py: 8 }}>
      <Typography variant="h2" component="h2" align="center" gutterBottom>
        Contact Me
      </Typography>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          maxWidth: '600px', 
          mx: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        
        <Box sx={{ width: '100%', mb: 3 }}>
          <TextField 
            fullWidth 
            required 
            id="email" 
            type="email" 
            name="email" 
            label="Your Email" 
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  transition: 'border-color 0.3s ease',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& label.Mui-focused': {
                color: 'primary.main',
              },
            }}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </Box>
        <Box sx={{ width: '100%', mb: 3 }}>
          <TextField 
            fullWidth 
            required 
            id="message" 
            name="message" 
            label="Message" 
            multiline 
            rows={4} 
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  transition: 'border-color 0.3s ease',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& label.Mui-focused': {
                color: 'primary.main',
              },
            }}
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </Box>
        <Button 
          type="submit" 
          variant="outlined"
          color="secondary"
          size="large"
          disabled={state.submitting}
          sx={{
            border: '2px solid',
            borderColor: 'secondary.main',
            color: 'secondary.main',
            fontWeight: 'bold',
            padding: '10px 24px',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              backgroundColor: theme => `${theme.palette.secondary.main}33`,
              boxShadow: theme => `0px 0px 15px 0px ${theme.palette.secondary.main}`,
            }
          }}
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