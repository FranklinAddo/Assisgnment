'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Home() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const pass = data.get("pass");

    runDBCallAsync(`/api/login?email=${email}&pass=${pass}`);
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data === "valid") {
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);

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
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>LOG IN</Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth required margin="normal" label="Email" name="email" />
          <TextField fullWidth required margin="normal" type="password" label="Password" name="pass" />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign In
          </Button>

          <Button fullWidth variant="outlined" sx={{ mt: 1 }} onClick={() => window.location.href = "/newregister"}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
