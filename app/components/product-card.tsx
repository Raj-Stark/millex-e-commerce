import { FavoriteBorder, VisibilityRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import ProductCardBtn from "./product-card-btn";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
}

const ProductCard = ({
  image,
  title,
  price,
  rating,
  reviewCount,
  id,
}: ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, my: 7, position: "relative" }}>
      <Box
        position={"absolute"}
        top={10}
        right={10}
        display={"flex"}
        flexDirection={"column"}
        gap={1}
      >
        <IconButton sx={{ backgroundColor: "#fff" }}>
          <FavoriteBorder />
        </IconButton>
        <IconButton sx={{ backgroundColor: "#fff" }}>
          <VisibilityRounded />
        </IconButton>
      </Box>

      <Link href={`/${id}`}>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={title}
          sx={{ objectFit: "contain" }}
        />
      </Link>

      <CardContent>
        <Grid>
          <Typography variant="h6" sx={{ height: "50px" }}>
            {title}
          </Typography>
          <Box display={"flex"} alignItems={"center"} mt={1} gap={1}>
            <Typography color={"#DB4444"} fontSize={"16px"} fontWeight={"500"}>
              ${price}
            </Typography>
            <Rating value={rating} readOnly />
            <Typography fontSize={"12px"} fontWeight={"500"}>
              ({reviewCount})
            </Typography>
          </Box>
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
        }}
      >
        <ProductCardBtn />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
