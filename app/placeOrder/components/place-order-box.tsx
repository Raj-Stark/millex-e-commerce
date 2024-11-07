import { cartAtom } from "@/commonAtoms/cartAtom";
import CommonButton from "@/components/button";
import { formatCurrency } from "@/utils/format-currency";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";

const PlaceOrderBox = () => {
  const cart = useAtomValue(cartAtom);
  const router = useRouter();

  const getCartTotal = () => {
    return cart.reduce((accu, item) => {
      return (accu += item.cartTotal);
    }, 0);
  };
  return (
    <Box sx={{ maxWidth: "400px" }} mt={8}>
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

      <CommonButton
        sx={{ width: "100%", mt: 4 }}
        onClick={() => router.push("/placeOrder")}
      >
        <Typography textTransform={"capitalize"}>Place Order</Typography>
      </CommonButton>
    </Box>
  );
};

export default PlaceOrderBox;
