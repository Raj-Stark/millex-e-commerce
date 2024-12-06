import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import axios from "axios";
import Image from "next/image";
import AddToCartSection from "./components/add-to-cart-section";
import AddReviewForm from "./components/add-review-form";
import ReviewList from "./components/review-list";
import { formatCurrency } from "@/utils/format-currency";
import { ProductType } from "@/types/product-types";
import { Review } from "@/types/review-types";
import ProductRatings from "./components/product-ratings";

interface SingleProductPageProps {
  params: {
    singleProductId: string;
  };
}

export interface SingleProductType extends ProductType {
  reviews: Review[];
}

async function getProductById(
  singleProductId: string
): Promise<SingleProductType | null> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}product/${singleProductId}`
    );
    return response.data.product;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const { singleProductId } = params;

  let product: SingleProductType | null = null;
  let error: string | null = null;

  try {
    product = await getProductById(singleProductId);
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred";
  }

  if (error) {
    return <Typography>Something went wrong !!!</Typography>;
  }

  if (!product) {
    return <Typography>No ProductType found !!!</Typography>;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        marginBottom: 10
      }}
    >
      <Grid
        container
        columns={{ xs: 1, lg: 2.5 }}
        columnSpacing={{ xs: 4, lg: 8 }}
        mt={{ xs: 4, md: 12 }}
        rowSpacing={{ xs: 2, lg: 0 }}
      >
        <Grid
          item
          xs={1}
        >
          <Paper sx={{ position: "relative", height: { xs: "200px", sm: "300px", md: '400px', lg: "600px" }, width: "100%" }}>
            <Image
              fill={true}
              alt="product-image"
              src={product.image}
              style={{ objectFit: "cover" }}
            />
          </Paper>
        </Grid>
        <Grid
          item
          xs={1}
          lg={1.5}
        >
          <Typography sx={{ fontWeight: "bold" }} fontSize={{ xs: 20, sm: 24 }}>
            {product.name}
          </Typography>
          <Box display={"flex"} justifyContent={"flex-start"} mt={2} alignItems={"center"}>
            <ProductRatings rating={product.averageRating} />
            <Typography
              fontSize={{ xs: 12, sm: 16 }}
              sx={{ ml: 1 }}
            >{`${product.numOfReviews} reviews`}</Typography>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ border: "1px solid red", mx: { xs: 1, sm: 3 } }}
            />

            <Typography
              sx={{ color: product.inventory !== 0 ? "#00FF66" : "#F43F5E", fontSize: { xs: 12, sm: 16 } }}
            >
              {product.inventory === 0 ? "Out Of Stock" : "In Stock"}
            </Typography>
          </Box>
          <Typography mt={2} fontSize={{ xs: "20px", sm: "24px" }} variant="h6">
            {formatCurrency(product.price)}
          </Typography>
          <Typography mt={2}>{product.description}</Typography>

          <Divider sx={{ mt: { xs: 2, md: 4 } }} />
          <AddToCartSection
            id={product._id}
            title={product.name}
            image={product.image}
            price={product.price}
            inventory={product.inventory}
            averageRating={product.averageRating}
            numOfReviews={product.numOfReviews}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mt: { xs: 4, md: 8 } }} />

      <AddReviewForm productId={singleProductId} />
      <ReviewList reviews={product.reviews} />
    </Container>
  );
};

export default SingleProductPage;
