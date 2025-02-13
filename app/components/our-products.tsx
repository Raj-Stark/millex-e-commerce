"use client";
import SectionHeader from "@/components/section-header";
import {
  CircularProgress,
  Container,
  Grid,
  Box,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import React from "react";
import ProductCard from "./product-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductType } from "@/types/product-types";

interface IProps {
  sx?: SxProps<Theme>;
}

const OurProducts = (props: IProps) => {
  const sx = props.sx || {};
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
          ...sx,
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
          ...sx,
        }}
      >
        <Typography variant="h6" color="error">
          Something went wrong: Unable to load products.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={sx}>
      <SectionHeader
        sectionName="Our Products"
        sectionTitle="Explore Our Products"
        category="scroll-btn"
      />
      <Grid
        container
        spacing={{ xs: 2, sm: 4 }}
        sx={{ marginTop: "20px !important" }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      >
        {data &&
          data.products &&
          data.products
            .filter((item: ProductType) => item.featured)
            .map((product: ProductType) => (
              <Grid item xs={1} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default OurProducts;
