"use client";

import { cartAtom } from "@/commonAtoms/cartAtom";
import CommonButton from "@/components/button";
import { formatCurrency } from "@/utils/format-currency";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { isCompleteDetails } from "../atom/user-details-atom";
import { triggerToaster } from "@/utils/triggerLogin";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const PlaceOrderBox = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const isCompleteDetail = useAtomValue(isCompleteDetails);
  const router = useRouter();

  const getCartTotal = () => {
    return cart.reduce((accu, item) => {
      return (accu += item.cartTotal);
    }, 0);
  };

  const createOrderEndpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}order`;

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        createOrderEndpoint,
        {
          tax: 500,
          shippingFee: 100,
          items: cart.map((item) => ({
            amount: item.quantity,
            product: item.id,
          })),
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      triggerToaster({
        msg: "Successfully placed order!",
        action: "success",
      });

      setCart([]);
      router.replace(`/placeOrder/${data.order._id}`);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.msg || "Failed to place order!";
        toast.error(errorMessage);
      } else {
        toast.error("Failed to place order!");
      }
    },
  });

  const handlePlaceOrder = async () => {
    if (!isCompleteDetail) {
      triggerToaster({
        msg: "Please fill your complete details",
        action: "error",
      });
      return;
    }

    try {
      await mutation.mutateAsync();
    } catch (error) {
      console.error("Order placement failed:", error);
    }
  };

  return (
    <Box mt={8}>
      <Typography fontSize={"20px"} fontWeight={"medium"}>
        Cart Total:
      </Typography>
      <Divider />

      <Stack mt={3}>
        <Box display={"flex"} justifyContent={"space-between"} mb={1}>
          <Typography>Total Items:</Typography>
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
        onClick={handlePlaceOrder}
        disabled={mutation.isPending || cart.length === 0}
      >
        <Typography textTransform={"capitalize"}>
          {mutation.isPending ? "Placing Order..." : "Place Order"}
        </Typography>
      </CommonButton>
    </Box>
  );
};

export default PlaceOrderBox;
