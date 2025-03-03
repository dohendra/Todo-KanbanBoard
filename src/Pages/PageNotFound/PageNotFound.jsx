// src/components/NotFound.jsx
import * as React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Go Home
        </Button>
      </Box>
    </Container>
  );
}
