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
  const [cartItems, setCartItems] = React.useState([
    { id: 1, name: 'Sample Product 1', quantity: 2, price: 19.99 },
    { id: 2, name: 'Sample Product 2', quantity: 1, price: 24.99 },
    { id: 3, name: 'Sample Product 3', quantity: 3, price: 9.99 },
  ]);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
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
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    // Example API call to save order
    runDBCallAsync('http://localhost:3000/api/orders', cartItems);
  };

  async function runDBCallAsync(url, cartData) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData),
      });
      const data = await res.json();
      console.log('Order response:', data);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 6,
          mb: 4,
          bgcolor: '#121212',
          p: 4,
          borderRadius: 2,
          boxShadow: 4,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: 'white', textAlign: 'center', mb: 3 }}
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
                        style: { textAlign: 'center', width: '60px' },
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    ${(item.price * item.quantity).toFixed(2)}
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 3,
            color: 'white',
          }}
        >
          <Typography variant="h6">Total: ${getTotal()}</Typography>
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
