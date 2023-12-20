// pages/login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Implement your login logic here
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      {/* Email and Password TextFields */}
      {/* Login Button */}
    </Container>
  );
}
