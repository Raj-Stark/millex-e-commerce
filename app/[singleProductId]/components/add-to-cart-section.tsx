"use client";
import CommonButton from "@/components/button";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAtom } from "jotai";
import { cartAtom } from "@/commonAtoms/cartAtom";
import { wishListAtom } from "@/commonAtoms/wishListAtom";
import { triggerToaster } from "@/utils/triggerLogin";
import { useRouter } from "next/navigation";
import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import { BUSINESS_WHATSAPP_NUMBER, DOMAIN_NAME } from "@/constants";
import { getWhatsappLink } from "@/utils";

interface Props {
  id: string;
  image: string;
  title: string;
  price: number;
  inventory: number;
  averageRating: number;
  numOfReviews: number;
}

const AddToCartSection = ({
  id,
  title,
  image,
  price,
  inventory,
  averageRating,
  numOfReviews,
}: Props) => {
  const [cartData, setCartData] = useAtom(cartAtom);
  const [localQuantity, setLocalQuantity] = useState(1);
  const router = useRouter();
  const [wishList, setWishList] = useAtom(wishListAtom);

  const isInCart = cartData.some((item) => item.id === id);
  const isInWishlist = wishList.some((item) => item.id === id);

  const showToaster = (msg: string, action: "success" | "error") => {
    triggerToaster({ msg, action });
  };

  const handleCartQuantity = (action: "inc" | "dec") => {
    if (action === "inc") {
      if (localQuantity < inventory) {
        setLocalQuantity((prev) => prev + 1);
      } else {
        showToaster("Cannot exceed available inventory", "error");
      }
    } else {
      if (localQuantity > 1) {
        setLocalQuantity((prev) => prev - 1);
      } else {
        showToaster("Quantity cannot be less than 1", "error");
      }
    }
  };

  const handleCartUpdate = () => {
    if (isInCart) {
      showToaster("Item already present in the cart", "error");
      return;
    }

    const newCartItem = {
      id: id,
      title: title,
      image: image,
      price: price,
      inventory: inventory,
      quantity: localQuantity,
      cartTotal: price * localQuantity,
    };

    setCartData((prev) => [...prev, newCartItem]);
    setWishList((prev) => prev.filter((item) => item.id !== id));
    router.push("/cart");
    showToaster("Item added to cart successfully", "success");
  };
  const handleWishlistToggle = () => {
    if (isInCart) {
      showToast("Item already present inside Cart", "error");
      return;
    }

    if (isInWishlist) {
      setWishList((prev) => prev.filter((item) => item.id !== id));
      showToast("Item removed from Wishlist", "success");
    } else {
      setWishList((prev) => [
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
    <Stack
      direction={"column"}
      spacing={2}
      mt={4}
      maxWidth={{ xs: "500px", md: "300px" }}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box
          border={"2px solid #000"}
          display={"flex"}
          justifyContent={"space-between"}
          borderRadius={"6px"}
          width={"180px"}
        >
          <IconButton
            onClick={() => handleCartQuantity("dec")}
            sx={{
              borderRight: "2px solid #000",
              borderRadius: 0,
              color: "#000",
            }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {localQuantity}
          </Typography>
          <IconButton
            onClick={() => handleCartQuantity("inc")}
            sx={{
              borderLeft: "2px solid #000",
              borderRadius: 0,
              color: "#000",
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <IconButton
          onClick={handleWishlistToggle}
          sx={{
            border: "2px solid #000",
            borderRadius: "6px",
            width: "60px",
            color: isInWishlist ? "#F43F5E" : "#000",
          }}
        >
          {isInWishlist ? <FavoriteIcon /> : <FavoriteBorder />}
        </IconButton>
      </Box>
      <Box>
        <a
          style={{
            display: "flex",
          }}
          href={getWhatsappLink(BUSINESS_WHATSAPP_NUMBER, {
            text: `Hello, I would like to enquire about the ${title}. ${DOMAIN_NAME}/${id}`,
          })}
          target="_blank"
        >
          <Image
            src="/assets/chat-on-whatsapp.png"
            width={150}
            height={32}
            alt="chat on whatsapp image"
          />
        </a>
      </Box>

      <CommonButton sx={{ py: 1.6 }} onClick={handleCartUpdate}>
        <Typography>Buy Now !!</Typography>
      </CommonButton>
    </Stack>
  );
};

export default AddToCartSection;
