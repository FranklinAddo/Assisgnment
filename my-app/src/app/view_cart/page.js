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

  // Load cart items from database
  React.useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch("/api/view_cart");
        const json = await res.json();
        console.log("Loaded Cart Items:", json.data);
        setCartItems(json.data);
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    }

    loadCart();
  }, []);

  const handleRemove = async (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    await fetch(`/api/remove_from_cart?id=${id}`);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const getTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0)
      .toFixed(2);
  };

  // ✔ SAME STYLE AS LOGIN PAGE
  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    window.location = "/checkout";   // ← EXACT SAME APPROACH AS LOGIN
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 6,
          mb: 4,
          bgcolor: "#121212",
          p: 4,
          borderRadius: 2,
          boxShadow: 4,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: "white", textAlign: "center", mb: 3 }}
        >
          Cart Summary
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Product</strong></TableCell>
                <TableCell align="center"><strong>Quantity</strong></TableCell>
                <TableCell align="center"><strong>Price</strong></TableCell>
                <TableCell align="center"><strong>Remove</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>

                  <TableCell align="center">
                    <TextField
                      type="number"
                      size="small"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      inputProps={{
                        min: 1,
                        style: { textAlign: "center", width: "60px" },
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    €{(item.price || 0).toFixed(2)}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
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

        {/* Total + Checkout */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            color: "white",
          }}
        >
          <Typography variant="h6">Total: €{getTotal()}</Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
