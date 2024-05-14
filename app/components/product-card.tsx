import { FavoriteBorder, VisibilityRounded } from "@mui/icons-material";
import {
  Box,
  Button,
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

const ProductCard = () => {
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
      <CardMedia
        component="img"
        height="250"
        image="https://shop.storiafoods.com/public/storage/product/Mixed_Fruit.jpg"
        alt="Mountain"
        sx={{ objectFit: "contain" }}
      />

      <CardContent>
        <Grid>
          <Typography variant="h6">Indian Bread</Typography>
          <Box display={"flex"} alignItems={"center"} mt={1} gap={1}>
            <Typography color={"#DB4444"} fontSize={"16px"} fontWeight={"500"}>
              $500
            </Typography>
            <Rating value={4} />
            <Typography fontSize={"12px"} fontWeight={"500"}>
              (55)
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
        <Button sx={{ color: "#fff" }}>
          <Typography
            variant="h6"
            fontWeight={"500"}
            textTransform={"capitalize"}
          >
            Add To Cart
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
