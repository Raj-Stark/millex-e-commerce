"use client";
import { userAtom } from "@/commonAtoms/userAtom";
import { triggerToaster } from "@/utils/triggerLogin";
import { Button, Typography } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";

import { cartAtom } from "@/commonAtoms/cartAtom";
import { useAtom } from "jotai";
import { wishListAtom } from "@/commonAtoms/wishListAtom";

interface Props {
  id: string;
  image: string;
  title: string;
  price: number;
  inventory: number;
}

const ProductCardBtn = ({ id, title, image, price, inventory }: Props) => {
  const user = useAtomValue(userAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const setWishList = useSetAtom(wishListAtom);

  const isInCart = cart.some((item) => item.id === id);

  const handleAddToCart = () => {
    if (!user.isLoggedIn) {
      showToaster("Please Login First !!!", "error");
      return;
    }

    if (inventory === 0) {
      showToaster("Item is out of stock", "error");
      return;
    }

    if (isInCart) {
      showToaster("Item already present in the Cart", "error");
      return;
    }

    setWishList((prev) => prev.filter((item) => item.id !== id));

    const newCartItem = {
      id,
      title,
      image,
      price,
      inventory,
      quantity: 1,
      cartTotal: price,
    };

    setCart((prev) => [...prev, newCartItem]);
    showToaster("Item added to cart successfully", "success");
  };

  const showToaster = (msg: string, action: "success" | "error") => {
    triggerToaster({ msg, action });
  };

  return (
    <Button
      sx={{
        color: "#fff",
        width: "100%",
        background: "#000",
        "&:hover": {
          background: "#000",
        },
      }}
      onClick={handleAddToCart}
    >
      <Typography variant="h6" fontWeight={"500"} textTransform={"capitalize"}>
        Add To Cart
      </Typography>
    </Button>
  );
};

export default ProductCardBtn;
