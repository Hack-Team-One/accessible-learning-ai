import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography } from '@mui/material';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', { email, password });
      console.log('User registered:', response.data);
      // Handle success (e.g., navigate to login page or dashboard)
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
}
