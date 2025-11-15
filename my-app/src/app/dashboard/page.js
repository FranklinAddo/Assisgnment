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

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:3000/api/product");
        const json = await res.json();
        setProducts(json.data);    // <-- FIXED
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  // Weather API
  React.useEffect(() => {
    async function fetchWeather() {
      try {
        const city = "New York";
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`
        );

        const data = await res.json();

        if (data?.main) {
          setWeather({
            temp: data.main.temp,
            city: data.name,
            condition: data.weather[0].description,
          });
        } else {
          setWeather(null);
        }
      } catch (err) {
        console.error("Weather error:", err);
      } finally {
        setLoadingWeather(false);
      }
    }

    fetchWeather();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added:", product);
    setCartCount((prev) => prev + 1);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 4,
          mb: 4,
          bgcolor: "#121212",
          p: 3,
          borderRadius: 2,
          boxShadow: 4,
        }}
      >
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Products
          </Typography>

          {loadingWeather ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : weather ? (
            <Typography>
              🌤 {weather.city}: {weather.temp}°C — {weather.condition}
            </Typography>
          ) : (
            <Typography>Weather unavailable</Typography>
          )}

          <Button variant="contained" color="secondary">
            View Cart ({cartCount})
          </Button>
        </Box>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia component="img" height="160" image={product.image} />

                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                    ${product.price}
                  </Typography>
                </CardContent>

                <CardActions sx={{ mt: "auto", p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
