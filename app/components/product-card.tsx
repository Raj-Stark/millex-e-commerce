import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import ProductCardBtn from "./product-card-btn";
import Link from "next/link";
import WishListBtn from "./wishlist-btn";
import { ProductType } from "@/types/product-types";

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
          <Typography
            variant="h6"
            //  sx={{ height: "50px" }}
          >
            {name}
          </Typography>
        </CardContent>
      </Box>

      <Box>
        <CardContent>
          <Grid>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={1}
              gap={1}
            >
              <Typography
                color={"#DB4444"}
                fontSize={"16px"}
                fontWeight={"500"}
              >
                ₹ {price}
              </Typography>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Rating value={averageRating} readOnly />
                <Typography fontSize={"14px"} fontWeight={"500"}>
                  ({numOfReviews})
                </Typography>
              </Box>
            </Box>
          </Grid>
        </CardContent>
        <CardActions>
          <ProductCardBtn
            id={_id}
            title={name}
            image={product.images[0]}
            price={price}
            inventory={inventory}
          />
        </CardActions>
      </Box>
    </Card>
  );
};

export default ProductCard;
