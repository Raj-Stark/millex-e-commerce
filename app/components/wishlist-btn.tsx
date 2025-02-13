"use client";
import { cartAtom } from "@/commonAtoms/cartAtom";
import { userAtom } from "@/commonAtoms/userAtom";
import { wishListAtom } from "@/commonAtoms/wishListAtom";
import { ProductType } from "@/types/product-types";
import { triggerToaster } from "@/utils/triggerLogin";
import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React from "react";

interface Props {
  product: ProductType;
}

const WishListBtn = ({ product }: Props) => {
  const [wishlist, setWishlist] = useAtom(wishListAtom);
  const user = useAtomValue(userAtom);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!user.isLoggedIn) {
        setWishlist((prev) => prev.filter((item) => item._id !== product._id));
        return;
      }
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}user/wishlist/toggle`;
      const response = await axios.post<{ data: boolean; message: string }>(
        endpoint,
        {
          productId: product._id,
        },
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        if (response.data.data) {
          setWishlist((prev) => [
            ...prev,
            {
              ...product,
            },
          ]);
          showToast("Item added to wishlist successfully", "success");
        } else {
          showToast("Item removed from the wishlist", "success");
          setWishlist((prev) =>
            prev.filter((item) => item._id !== product._id),
          );
        }
      } else {
        showToast("Error in adding item to wishlist", "error");
      }
    },
  });

  const cart = useAtomValue(cartAtom);

  const isInCart = cart.some((item) => item.id === product._id);
  const isInWishlist = wishlist?.some((item) => item._id === product._id);

  const handleWishlistToggle = () => {
    // if (isInCart) {
    //   showToast("Item already present inside Cart", "error");
    //   return;
    // }
    // if (isInWishlist) {
    //   setWishlist((prev) => prev.filter((item) => item._id !== product._id));
    //   showToast("Item removed from Wishlist", "success");
    // } else {
    //   showToast("Item added to Wishlist", "success");
    // }
    if (!user.isLoggedIn) {
      setWishlist((prev) => [...prev, product]);
    } else {
      mutate();
    }
  };

  const showToast = (msg: string, action: "success" | "error") => {
    triggerToaster({ msg, action });
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
        <CircularProgress />
      ) : (
        <IconButton
          disableFocusRipple
          sx={{ color: isInWishlist ? "#F43F5E" : "#000" }}
          onClick={() => {
            handleWishlistToggle();
          }}
        >
          {isInWishlist ? <FavoriteIcon /> : <FavoriteBorder />}
        </IconButton>
      )}
    </Box>
  );
};

export default WishListBtn;
