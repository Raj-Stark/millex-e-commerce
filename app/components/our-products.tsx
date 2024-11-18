"use client";
import SectionHeader from "@/components/section-header";
import {
  CircularProgress,
  Container,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import ProductCard from "./product-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductType } from "@/types/product-types";

const OurProducts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}product`;
      const response = await axios.get(endpoint);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Something went wrong: Unable to load products.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <SectionHeader
        sectionName="Our Products"
        sectionTitle="Explore Our Products"
        category="scroll-btn"
      />
      <Grid container spacing={3}>
        {data &&
          data.products &&
          data.products
            .filter((item: ProductType) => item.featured)
            .map((product: ProductType) => (
              <Grid
                item
                xs={12} // Full width on extra-small screens
                sm={6} // Two cards per row on small screens
                md={4} // Three cards per row on medium screens
                lg={3} // Four cards per row on large screens
                key={product._id}
              >
                <ProductCard
                  id={product._id}
                  title={product.name}
                  image={product.image}
                  price={product.price}
                  inventory={product.inventory}
                  averageRating={product.averageRating}
                  numOfReviews={product.numOfReviews}
                />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default OurProducts;
