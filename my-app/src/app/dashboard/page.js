'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function CustomerPage() {
  const [products, setProducts] = React.useState([]);
  const [cartCount, setCartCount] = React.useState(0);
  const [weather, setWeather] = React.useState(null);
  const [loadingWeather, setLoadingWeather] = React.useState(true);

  // ---------------- ADD TO CART ----------------
  async function putInCart(product) {
    const username = localStorage.getItem("email");

    if (!username) {
      alert("You must be logged in to add items to cart.");
      return;
    }

    const url = `/api/putInCart?pname=${encodeURIComponent(
      product.name
    )}&price=${product.price}&username=${encodeURIComponent(username)}`;

    console.log("Calling:", url);

    const res = await fetch(url);
    const json = await res.json();

    console.log("Cart API response:", json);

    // Update cart display count
    setCartCount((prev) => prev + 1);

    // Removed Alerts 👇
    if (json.data === "quantity_increased") {
      console.log(`Quantity increased for ${product.name}`);
    } else {
      console.log(`${product.name} added to cart`);
    }
  }

  // ---------------- GET PRODUCTS ----------------
  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        setProducts(json.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // ---------------- WEATHER ----------------
  React.useEffect(() => {
    async function fetchWeather() {
      try {
        const city = "New York";
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`
        );
        const data = await res.json();

        if (data?.main) {
          setWeather(`${data.name} — ${data.main.temp}°C`);
        }
      } catch (err) {
        console.error("Weather error:", err);
      } finally {
        setLoadingWeather(false);
      }
    }
    fetchWeather();
  }, []);

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      {/* ---------- HEADER ---------- */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Products
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => (window.location.href = "/view_cart")}
        >
          View Cart ({cartCount})
        </Button>
      </Box>

      {/* ---------- WEATHER ---------- */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        {loadingWeather ? (
          <CircularProgress />
        ) : (
          <Typography sx={{ fontWeight: "bold" }}>
            {weather ?? "Weather unavailable"}
          </Typography>
        )}
      </Box>

      {/* ---------- PRODUCT GRID ---------- */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="160"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: "contain", background: "#fafafa" }}
              />

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {product.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>

                <Typography sx={{ mt: 2, fontWeight: "bold", fontSize: 18 }}>
                  €{product.price}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => putInCart(product)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
