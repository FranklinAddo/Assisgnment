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
import CircularProgress from '@mui/material/CircularProgress';

export default function ManagerPage() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('http://localhost:3000/api/orders');
        const data = await res.json();

        // Expecting data like: [{ orderId, customer, items, total, date }]
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);

        // Example fallback data
        setOrders([
          {
            orderId: 'A123',
            customer: 'John Doe',
            items: '3 Products',
            total: 59.97,
            date: '2025-11-10 14:35',
          },
          {
            orderId: 'B456',
            customer: 'Jane Smith',
            items: '2 Products',
            total: 42.5,
            date: '2025-11-10 15:10',
          },
          {
            orderId: 'C789',
            customer: 'Robert Brown',
            items: '5 Products',
            total: 129.99,
            date: '2025-11-10 17:45',
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    // Example: router.push('/login')
  };

  const handleViewGraph = () => {
    console.log('Navigating to graph page...');
    // Example: router.push('/manager/graph')
  };

  return (
    <Container maxWidth="lg">
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
        {/* Header */}
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
          Order List
        </Typography>

        {/* Orders Table */}
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Items</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Total
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell align="center">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">{order.date}</TableCell>
                  </TableRow>
                ))}

                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Footer Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#7b1fa2',
              borderRadius: 2,
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#6a1b9a' },
            }}
            onClick={handleViewGraph}
          >
            View Graph Data
          </Button>

          <Button
            variant="outlined"
            color="error"
            sx={{
              borderRadius: 2,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
