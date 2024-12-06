"use client";
import { Container, Typography } from "@mui/material";

import React from "react";
import CartTable from "./components/cart-table";

import CheckoutBox from "./components/checkout-box";
import { useAtomValue } from "jotai";
import { cartAtom } from "@/commonAtoms/cartAtom";

const CartPage = () => {
  const cart = useAtomValue(cartAtom);
  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
      }}
    >
      {cart.length !== 0 ? (
        <>
          <CartTable />
          <CheckoutBox />
        </>
      ) : (
        <Typography fontSize={"24px"} textAlign={"center"} mt={16}>
          No Items in the Cart
        </Typography>
      )}
    </Container>
  );
};

export default CartPage;
