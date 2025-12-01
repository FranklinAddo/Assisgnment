'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Home() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const pass = data.get('pass');

    runDBCallAsync(`/api/login?email=${email}&pass=${pass}`);
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    console.log("Login API Response:", data);

    if (data.data === "valid") {
      // Save user info to localStorage for later use
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);

      console.log("Login valid, role:", data.role);

      // Redirect based on role
      if (data.role === "manager") {
        window.location.href = "/manager";
      } else {
        window.location.href = "/dashboard";
      }
    } else {
      alert("Invalid email or password.");
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: 'black', mb: 3 }}>
          LOG IN
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Password"
            type="password"
            id="pass"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Button
            type="button"
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={() => (window.location.href = "/newregister")}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
