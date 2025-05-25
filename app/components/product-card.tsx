"use client";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import WishListBtn from "./wishlist-btn";
import { ProductType } from "@/types/product-types";
import { userAtom } from "@/commonAtoms/userAtom";
import { cartAtom } from "@/commonAtoms/cartAtom";
import { wishListAtom } from "@/commonAtoms/wishListAtom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { triggerToaster } from "@/utils/triggerLogin";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    _id,
    name,
    slug,
    price,
    images,
    numOfReviews,
    averageRating,
    inventory,
  } = product;

  const user = useAtomValue(userAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const setWishList = useSetAtom(wishListAtom);

  const isInCart = cart.some((item) => item.id === _id);

  const handleAddToCart = () => {
    if (!user.isLoggedIn) {
      triggerToaster({ msg: "Please Login First !!!", action: "error" });
      return;
    }

    if (inventory === 0) {
      triggerToaster({ msg: "Item is out of stock", action: "error" });
      return;
    }

    if (isInCart) {
      triggerToaster({
        msg: "Item already present in the Cart",
        action: "error",
      });
      return;
    }

    setWishList((prev) => prev.filter((item) => item._id !== _id));

    const newCartItem = {
      id: _id,
      title: name,
      image: images[0],
      price,
      inventory,
      quantity: 1,
      cartTotal: price,
    };

    setCart((prev) => [...prev, newCartItem]);
    triggerToaster({
      msg: "Item added to cart successfully",
      action: "success",
    });
  };

  return (
    <Card
      sx={{
        minWidth: 250,
        maxWidth: 350,
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box>
        <WishListBtn product={product} />
        <Link href={`/${slug}`}>
          <CardMedia
            component="img"
            height="250"
            image={images[0]}
            alt={name}
            sx={{ objectFit: "cover" }}
          />
        </Link>
        <CardContent sx={{ paddingBottom: "0px !important" }}>
          <Typography variant="h6">{name}</Typography>
        </CardContent>
      </Box>

      <Box>
        <CardContent>
          <Grid>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
              gap={1}
            >
              <Typography color="#DB4444" fontSize="16px" fontWeight="500">
                ₹ {price}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Rating value={averageRating} readOnly />
                <Typography fontSize="14px" fontWeight="500">
                  ({numOfReviews})
                </Typography>
              </Box>
            </Box>
          </Grid>
        </CardContent>
        <CardActions>
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
            <Typography
              variant="h6"
              fontWeight="500"
              textTransform="capitalize"
            >
              Add To Cart
            </Typography>
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default ProductCard;
