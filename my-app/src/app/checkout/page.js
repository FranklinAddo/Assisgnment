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
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: value > 0 ? value : 1 }
          : item
      )
    );
  };

  const getTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    // router.push('/checkout') if using Next.js routing
  };

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
        {/* Title */}
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
          Cart Summary
        </Typography>

        {/* Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Quantity
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Price
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Remove
                </TableCell>
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
                      sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                      }}
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

        {/* Total and Checkout */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: '#333' }}
          >
            Total: ${getTotal()}
          </Typography>

          <Button
            variant="contained"
            onClick={handleCheckout}
            sx={{
              backgroundColor: '#7b1fa2',
              borderRadius: 2,
              fontWeight: 'bold',
              px: 3,
              '&:hover': { backgroundColor: '#6a1b9a' },
            }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
