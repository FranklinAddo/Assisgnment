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
import TextField from '@mui/material/TextField';

export default function CartPage() {
  const [cartItems, setCartItems] = React.useState([]);

  // Load the cart from the database for the logged-in user
  React.useEffect(() => {
    async function loadCart() {
      const email = localStorage.getItem("email");

      if (!email) {
        alert("You must be logged in to view your cart.");
        window.location.href = "/";
        return;
      }

      const res = await fetch(`/api/view_cart?username=${email}`);
      const json = await res.json();

      console.log("Loaded cart:", json);

      setCartItems(json.data);
    }

    loadCart();
  }, []);

  // Total calculation
  const getTotal = () =>
    cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

  // Redirect to checkout
  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 5,
          p: 4,
          bgcolor: "#111",
          borderRadius: 2,
          color: "white",
          boxShadow: 4,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
          Cart Summary
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Product</strong></TableCell>
                <TableCell align="center"><strong>Quantity</strong></TableCell>
                <TableCell align="center"><strong>Price</strong></TableCell>
                <TableCell align="center"><strong>Total</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cartItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>

                  <TableCell align="center">{item.quantity}</TableCell>

                  <TableCell align="center">€{item.price.toFixed(2)}</TableCell>

                  <TableCell align="center">
                    €{(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}

              {cartItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Your cart is empty.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">
            Total: €{getTotal()}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7b1fa2",
              fontWeight: "bold",
              px: 3,
              "&:hover": { backgroundColor: "#6a1b9a" },
            }}
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </Button>
        </Box>

         <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#7b1fa2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = "/dashboard")}
      >
        Back to Dashboard
      </button>
      </Box>
    </Container>
  );
}
