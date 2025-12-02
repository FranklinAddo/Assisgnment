'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadCart() {
      const email = localStorage.getItem("email");
      if (!email) {
        alert("Please login first.");
        window.location.href = "/";
        return;
      }

      const res = await fetch(`/api/view_cart?username=${email}`);
      const json = await res.json();
      setCartItems(json.data);
      setLoading(false);
    }

    loadCart();
  }, []);

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  // -------------------
  // CONFIRM ORDER
  // -------------------
  async function confirmOrder() {
    const email = localStorage.getItem("email");

    const payload = {
      username: email,
      items: cartItems,
      total: Number(totalPrice)
    };

    const res = await fetch("/api/confirm_order", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (json.status === "success") {
      alert("Order placed successfully!");

      // Clear cart
      await fetch(`/api/clear_cart?username=${email}`);

      window.location.href = "/success"; // redirect anywhere you want
    } else {
      alert("Order failed. Try again.");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth="md">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          mb: 6,
          p: 4,
          borderRadius: 3,
          backgroundColor: '#ffffff',
          border: '1px solid #e0dfe5',
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            textAlign: 'center',
            mb: 3,
            fontWeight: 'bold',
            color: '#4a148c',
          }}
        >
          Checkout
        </Typography>

        {/* CART TABLE */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Product</strong></TableCell>
                <TableCell align="center"><strong>Qty</strong></TableCell>
                <TableCell align="center"><strong>Price</strong></TableCell>
                <TableCell align="center"><strong>Total</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">€{item.price}</TableCell>
                  <TableCell align="center">
                    €{(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* TOTAL */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Total Amount: €{totalPrice}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={confirmOrder}
          >
            Confirm Order
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
