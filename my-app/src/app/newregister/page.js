'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [accountType, setAccountType] = React.useState("Customer");
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();

  const handleAccountTypeChange = (event, newType) => {
    if (newType !== null) {
      setAccountType(newType);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const pass = data.get('password');
    const confirm = data.get('confirm');
    const address = data.get('address');
    const dob = data.get('dob');

    if (pass !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    const url = `/api/register?email=${email}&pass=${pass}&type=${accountType}&address=${address}&dob=${dob}`;

    const res = await fetch(url);
    const result = await res.json();

    if (result.data === "valid") {
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else if (result.data === "exists") {
      alert("Email already registered.");
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          bgcolor: "white",
          p: 4,
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
        >
          REGISTER
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registration successful!!!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" name="email" required margin="normal" />

          <TextField fullWidth label="Address" name="address" margin="normal" />

          <TextField fullWidth label="Date of Birth" name="dob" margin="normal" />

          <TextField
            fullWidth
            label="Password"
            name="password"
            required
            type="password"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirm"
            required
            type="password"
            margin="normal"
          />

          <Typography sx={{ mt: 3, mb: 1, fontWeight: "bold"}}>
            Select Account Type:
          </Typography>

          <ToggleButtonGroup
            value={accountType}
            exclusive
            onChange={handleAccountTypeChange}
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton value="Manager">MANAGER</ToggleButton>
            <ToggleButton value="Customer">CUSTOMER</ToggleButton>
          </ToggleButtonGroup>

          <Button fullWidth variant="contained" type="submit">
            REGISTER
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
