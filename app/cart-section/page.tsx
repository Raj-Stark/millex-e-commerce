"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "LCD Monitor",
      price: 650,
      quantity: 1,
      image: "/images/lcd-monitor.png",
    },
    {
      id: 2,
      name: "H1 Gamepad",
      price: 550,
      quantity: 2,
      image: "/images/h1-gamepad.png",
    },
  ]);
  const [coupon, setCoupon] = useState("");

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };

  const handleApplyCoupon = () => {
    // Apply coupon logic here
  };

  const handleUpdateCart = () => {
    // Update cart logic here
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Container>
      <Box mt={3} mb={3}>
        <nav>
          <Link href="/">Home</Link> / <Link href="/cart-section">Cart</Link>
        </nav>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 50, marginRight: 10 }}
                    />
                    {item.name}
                  </Box>
                </TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <Select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  >
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <MenuItem key={qty} value={qty}>
                        {qty}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>${item.price * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Link href="/" passHref>
          <Button
            variant="outlined"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Return To Shop
          </Button>
        </Link>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateCart}
          style={{ backgroundColor: "white", color: "black" }}
        >
          Update Cart
        </Button>
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Coupon Code"
            value={coupon}
            onChange={handleCouponChange}
            fullWidth
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleApplyCoupon}
            style={{
              marginTop: 16,
              backgroundColor: "rgba(219, 68, 68, 1)",
              color: "white",
            }}
          >
            Apply Coupon
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} style={{ padding: 16 }}>
            <Typography variant="h6">Cart Total</Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography>Subtotal:</Typography>
              <Typography>${subtotal}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Shipping:</Typography>
              <Typography>Free</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Total:</Typography>
              <Typography>${subtotal}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginTop: 16,
                backgroundColor: "rgba(219, 68, 68, 1)",
                color: "white",
              }}
            >
              Proceed to checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
