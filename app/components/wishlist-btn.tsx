"use client";

import { useAtom, useAtomValue } from "jotai";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { wishListAtom } from "@/commonAtoms/wishListAtom";
import { userAtom } from "@/commonAtoms/userAtom";
import { cartAtom } from "@/commonAtoms/cartAtom";
import { ProductType } from "@/types/product-types";
import { triggerToaster } from "@/utils/triggerLogin";

interface Props {
  product: ProductType;
}

const WishListBtn = ({ product }: Props) => {
  const [wishlist, setWishlist] = useAtom(wishListAtom);
  const user = useAtomValue(userAtom);
  const cart = useAtomValue(cartAtom);

  const isInWishlist = wishlist?.some((item) => item._id === product._id);
  const isInCart = cart.some((item) => item.id === product._id);

  const showToast = (msg: string, type: "success" | "error") => {
    triggerToaster({ msg, action: type });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}user/wishlist/toggle`;
      const response = await axios.post<{ data: boolean; message: string }>(
        endpoint,
        { productId: product._id },
        { withCredentials: true },
      );

      if (response.status === 200) {
        const isAdded = response.data.data;
        setWishlist((prev) =>
          isAdded
            ? [...prev, product]
            : prev.filter((item) => item._id !== product._id),
        );
        showToast(
          isAdded
            ? "Item added to wishlist successfully"
            : "Item removed from the wishlist",
          "success",
        );
      } else {
        showToast("Error in updating wishlist", "error");
      }
    },
  });

  const handleWishlistToggle = () => {
    if (!user.isLoggedIn) {
      setWishlist((prev) => [...prev, product]); // optimistic add for guests
      return;
    }
    mutate();
  };

  return (
    <Box
      position="absolute"
      top={10}
      right={10}
      display="flex"
      flexDirection="column"
      gap={1}
    >
      {isPending ? (
        <CircularProgress size={24} />
      ) : (
        <IconButton
          disableFocusRipple
          onClick={handleWishlistToggle}
          sx={{ color: isInWishlist ? "#F43F5E" : "#000" }}
        >
          {isInWishlist ? <FavoriteIcon /> : <FavoriteBorder />}
        </IconButton>
      )}
    </Box>
  );
};

export default WishListBtn;
