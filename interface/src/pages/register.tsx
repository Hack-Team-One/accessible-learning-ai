import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Joi from 'joi';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$')).required(),
  });

  const handleRegister = async () => {
    const { error } = schema.validate({ email, password });
    setEmailError(!!error?.details.find(d => d.path.includes('email')));
    setPasswordError(!!error?.details.find(d => d.path.includes('password')));

    if (!error) {
      try {
        const response = await axios.post('/api/register', { email, password });
        console.log('User registered:', response.data);
        // Handle success (e.g., navigate to login page or dashboard)
      } catch (error) {
        console.error('Registration error:', error);
        // Handle error (e.g., show error message)
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Create your account</Typography>
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
        error={passwordError}
        helperText={passwordError ? "Invalid password" : ""}
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
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
}
