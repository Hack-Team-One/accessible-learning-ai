import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Joi from 'joi';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const router = useRouter();

  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
  });

  const handleLogin = async () => {
    const { error } = schema.validate({ email });
    setEmailError(!!error);

    if (!error) {
      // API call to login endpoint
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        error={emailError}
        helperText={emailError ? "Invalid email address" : ""}
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body1" marginTop={2}>
        If you do not have an account yet, please 
        <Button 
          color="primary" 
          onClick={() => router.push('/register')}
        >
          Sign Up
        </Button>.
      </Typography>
    </Container>
  );
}
