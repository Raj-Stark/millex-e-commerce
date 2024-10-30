"use client";
import { cartAtom } from "@/commonAtoms/cartAtom";
import { wishListAtom } from "@/commonAtoms/wishListAtom";
import { triggerToaster } from "@/utils/triggerLogin";
import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import React from "react";

interface Props {
  id: string;
  image: string;
  title: string;
  price: number;
  inventory: number;
  averageRating: number;
  numOfReviews: number;
}

const WishListBtn = ({
  id,
  title,
  image,
  price,
  inventory,
  averageRating,
  numOfReviews,
}: Props) => {
  const [wishList, setWishlist] = useAtom(wishListAtom);
  const cart = useAtomValue(cartAtom);

  const isInCart = cart.some((item) => item.id === id);
  const isInWishlist = wishList.some((item) => item.id === id);

  const handleWishlistToggle = () => {
    if (isInCart) {
      showToast("Item already present inside Cart", "error");
      return;
    }

    if (isInWishlist) {
      setWishlist((prev) => prev.filter((item) => item.id !== id));
      showToast("Item removed from Wishlist", "success");
    } else {
      setWishlist((prev) => [
        ...prev,
        {
          id,
          title,
          image,
          price,
          inventory,
          quantity: 1,
          cartTotal: price,
          averageRating,
          numOfReviews,
        },
      ]);
      showToast("Item added to Wishlist", "success");
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
      <IconButton
        disableFocusRipple
        sx={{ color: isInWishlist ? "#F43F5E" : "#000" }}
        onClick={handleWishlistToggle}
      >
        {isInWishlist ? <FavoriteIcon /> : <FavoriteBorder />}
      </IconButton>
    </Box>
  );
};

export default WishListBtn;
