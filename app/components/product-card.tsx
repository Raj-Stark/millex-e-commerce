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
    <Card sx={{ minWidth: 250, maxWidth: 350, position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",width: "100%" }}>
      <Box>
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
            sx={{ objectFit: "cover" }}
          />
        </Link>
        <CardContent sx={{paddingBottom: "0px !important"}}>
          <Typography
              variant="h6"          
              //  sx={{ height: "50px" }}
              >
                {title}
          </Typography>
        </CardContent>
      </Box>
      
      <Box>
        <CardContent>
          <Grid>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mt={1} gap={1}>
              <Typography color={"#DB4444"} fontSize={"16px"} fontWeight={"500"}>
                ${price}
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
            id={id}
            title={title}
            image={image}
            price={price}
            inventory={inventory}
          />
        </CardActions>
      </Box>
    </Card>
    
  );
};

export default ProductCard;
