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
  const [stats, setStats] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "manager") {
      window.location.href = "/login";
      return;
    }

    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        const json = await res.json();
        setOrders(json.orders);
        setStats(json.stats);
      } catch (err) {
        console.error("Error loading orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper sx={{ mt: 8, p: 4, borderRadius: 3 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
          Manager Dashboard
        </Typography>

        {/* Stats */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
          <Typography variant="h6">Total Orders: {stats.totalOrders}</Typography>
          <Typography variant="h6">Total Revenue: €{stats.totalRevenue?.toFixed(2)}</Typography>
        </Box>

        {/* Orders Table */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Order ID</b></TableCell>
                  <TableCell><b>Customer</b></TableCell>
                  <TableCell><b>Items</b></TableCell>
                  <TableCell align="center"><b>Total</b></TableCell>
                  <TableCell align="center"><b>Date</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((o, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{o.orderId}</TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell>{o.items}</TableCell>
                    <TableCell align="center">€{o.total.toFixed(2)}</TableCell>
                    <TableCell align="center">{o.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}
