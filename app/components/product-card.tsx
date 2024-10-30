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

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  inventory: number;
  averageRating: number;
  numOfReviews: number;
}

const ProductCard = ({
  id,
  image,
  title,
  price,
  averageRating,
  numOfReviews,
  inventory,
}: ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, my: 7, position: "relative" }}>
      <WishListBtn
        id={id}
        title={title}
        image={image}
        price={price}
        inventory={inventory}
        numOfReviews={numOfReviews}
        averageRating={averageRating}
      />
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
            <Rating value={averageRating} readOnly />
            <Typography fontSize={"12px"} fontWeight={"500"}>
              ({numOfReviews})
            </Typography>
          </Box>
        </Grid>
      </CardContent>
      <CardActions>
        <ProductCardBtn
          id={id}
          title={title}
          image={image}
          price={price}
          inventory={inventory}
        />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
