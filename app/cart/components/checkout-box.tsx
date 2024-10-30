"use client";
import { cartAtom } from "@/commonAtoms/cartAtom";
import CommonButton from "@/components/button";
import { formatCurrency } from "@/utils/format-currency";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import React from "react";

const CheckoutBox = () => {
  const cart = useAtomValue(cartAtom);

  const getCartTotal = () => {
    return cart.reduce((accu, item) => {
      return (accu += item.cartTotal);
    }, 0);
  };
  return (
    <Paper sx={{ maxWidth: "560px", my: 8, p: 2 }}>
      <Typography fontSize={"20px"} fontWeight={"medium"}>
        Cart Total :
      </Typography>
      <Divider />

      <Stack mt={3}>
        <Box display={"flex"} justifyContent={"space-between"} mb={1}>
          <Typography>Total Item:</Typography>
          <Typography>{cart.length}</Typography>
        </Box>
        <Divider />
        <Box display={"flex"} justifyContent={"space-between"} my={1}>
          <Typography>Shipping Fee:</Typography>
          <Typography>Free</Typography>
        </Box>
        <Divider />
        <Box display={"flex"} justifyContent={"space-between"} mt={1}>
          <Typography>Total:</Typography>
          <Typography>{formatCurrency(getCartTotal())}</Typography>
        </Box>
      </Stack>

      <CommonButton sx={{ width: "100%", mt: 4 }}>
        <Typography>Checkout !!</Typography>
      </CommonButton>
    </Paper>
  );
};

export default CheckoutBox;
